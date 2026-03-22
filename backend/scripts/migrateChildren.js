/**
 * Migration Script: Extract User.children[] → standalone Child + SchoolProfile documents.
 *
 * This script is idempotent — safe to re-run. It checks for an existing
 * "Legacy School (auto-migrated)" SchoolProfile before creating a new one.
 *
 * Usage:
 *   MONGODB_URI=<your-uri> node scripts/migrateChildren.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const SchoolProfile = require('../models/SchoolProfile');
const Child = require('../models/Child');

dotenv.config();

const LEGACY_SCHOOL_NAME = 'Legacy School (auto-migrated)';

async function migrate() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI environment variable is required');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const usersWithChildren = await User.find({
    'children.0': { $exists: true }
  });

  console.log(`Found ${usersWithChildren.length} users with embedded children`);

  let totalMigrated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const user of usersWithChildren) {
    try {
      // Check for existing legacy school profile (idempotency)
      let legacySchool = await SchoolProfile.findOne({
        createdBy: user._id,
        name: LEGACY_SCHOOL_NAME
      });

      if (!legacySchool) {
        legacySchool = new SchoolProfile({
          name: LEGACY_SCHOOL_NAME,
          schoolType: 'combined',
          createdBy: user._id,
          metadata: { migratedAt: new Date().toISOString() }
        });
        await legacySchool.save();
        console.log(`  Created legacy school profile for user ${user.email}`);
      }

      for (const embeddedChild of user.children) {
        // Parse name — try to split into first/last
        const nameParts = (embeddedChild.name || 'Unknown').trim().split(/\s+/);
        const firstName = nameParts[0] || 'Unknown';
        const lastName = nameParts.slice(1).join(' ') || user.lastName || 'Unknown';

        // Check if child already migrated (idempotency)
        const existing = await Child.findOne({
          parent: user._id,
          firstName,
          lastName,
          schoolProfile: legacySchool._id
        });

        if (existing) {
          totalSkipped++;
          continue;
        }

        const child = new Child({
          firstName,
          lastName,
          parent: user._id,
          schoolProfile: legacySchool._id,
          grade: embeddedChild.class || undefined,
          studentId: embeddedChild.studentId || undefined
        });

        await child.save();
        totalMigrated++;
      }

      console.log(`  User ${user.email}: ${user.children.length} children processed`);
    } catch (error) {
      totalErrors++;
      console.error(`  Error migrating user ${user.email}:`, error.message);
    }
  }

  console.log('\n--- Migration Summary ---');
  console.log(`Users processed: ${usersWithChildren.length}`);
  console.log(`Children migrated: ${totalMigrated}`);
  console.log(`Children skipped (already migrated): ${totalSkipped}`);
  console.log(`Errors: ${totalErrors}`);

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
