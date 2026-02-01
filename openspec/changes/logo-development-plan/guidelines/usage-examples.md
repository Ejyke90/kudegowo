# Logo Usage Examples

## Overview

This document provides comprehensive examples of proper logo usage across various applications and contexts. These examples serve as reference guides for implementing the KudiKlass logo system correctly and consistently.

## Table of Contents
1. [Digital Applications](#digital-applications)
2. [Print Applications](#print-applications)
3. [Social Media Applications](#social-media-applications)
4. [Mobile Applications](#mobile-applications)
5. [Brand Collateral](#brand-collateral)
6. [Signage Applications](#signage-applications)
7. [Partnership Applications](#partnership-applications)
8. [Common Usage Patterns](#common-usage-patterns)

---

## Digital Applications

### Website Header

#### Primary Logo Usage
```html
<!-- Website Header - Primary Logo -->
<header class="site-header">
  <div class="header-container">
    <div class="logo-container">
      <img 
        src="/assets/logos/svg/cultural-shield-primary.svg"
        alt="KudiKlass Logo"
        class="logo-primary"
        width="120"
        height="120"
      />
    </div>
    <nav class="main-navigation">
      <!-- Navigation items -->
    </nav>
  </div>
</header>

<style>
.logo-primary {
  width: 120px;
  height: auto;
  max-width: 100%;
  transition: transform 0.2s ease;
}

.logo-primary:hover {
  transform: scale(1.05);
}

.logo-container {
  padding: 16px;
  min-width: 120px;
}

@media (max-width: 768px) {
  .logo-primary {
    width: 80px;
  }
}
</style>
```

#### Requirements
- **Logo Size**: 120px height (desktop), 80px height (mobile)
- **Clear Space**: 16px minimum around logo
- **Background**: Clean, uncluttered background
- **Color**: Full brand colors
- **Variation**: Primary logo

### Website Footer

#### Monochrome Logo Usage
```html
<!-- Website Footer - Monochrome Logo -->
<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-logo">
      <img 
        src="/assets/logos/svg/cultural-shield-monochrome.svg"
        alt="KudiKlass Logo"
        class="logo-monochrome"
        width="64"
        height="64"
      />
    </div>
    <div class="footer-content">
      <!-- Footer content -->
    </div>
  </div>
</footer>

<style>
.logo-monochrome {
  width: 64px;
  height: auto;
  opacity: 0.8;
}

.footer-logo {
  padding: 24px;
  text-align: center;
}

@media (max-width: 768px) {
  .logo-monochrome {
    width: 48px;
  }
}
</style>
```

#### Requirements
- **Logo Size**: 64px height (desktop), 48px height (mobile)
- **Clear Space**: 24px minimum around logo
- **Background**: Footer background color
- **Color**: Monochrome (single color)
- **Variation**: Monochrome logo

### Favicon Implementation

#### Icon Logo Usage
```html
<!-- HTML Head - Favicon -->
<head>
  <link rel="icon" type="image/svg+xml" href="/assets/logos/svg/cultural-shield-icon.svg">
  <link rel="icon" type="image/png" href="/assets/logos/png/cultural-shield/cultural-shield-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/assets/logos/png/cultural-shield/cultural-shield-16x16.png" sizes="16x16">
  <link rel="apple-touch-icon" href="/assets/logos/png/cultural-shield/cultural-shield-180x180.png">
</head>
```

#### Requirements
- **Logo Size**: 32px × 32px (standard), 16px × 16px (small)
- **Clear Space**: Built into icon design
- **Background**: Browser default (transparent)
- **Color**: Simplified brand colors
- **Variation**: Icon logo

---

## Print Applications

### Business Card

#### Front Side - Primary Logo
```html
<!-- Business Card Front -->
<div class="business-card-front">
  <div class="card-header">
    <img 
      src="/assets/logos/svg/cultural-shield-primary.svg"
      alt="KudiKlass Logo"
      class="business-card-logo"
      width="48"
      height="48"
    />
  </div>
  <div class="card-content">
    <h1>KudiKlass</h1>
    <p>Africa's Leading Digital Payment Platform</p>
    <div class="contact-info">
      <!-- Contact information -->
    </div>
  </div>
</div>

<style>
.business-card-front {
  width: 90mm;
  height: 50mm;
  padding: 8mm;
  background: white;
  border: 1px solid #ccc;
}

.business-card-logo {
  width: 48px;
  height: auto;
  margin-bottom: 8mm;
}

.card-header {
  text-align: left;
  margin-bottom: 8mm;
}
</style>
```

#### Back Side - Monochrome Logo
```html
<!-- Business Card Back -->
<div class="business-card-back">
  <div class="card-back-header">
    <img 
      src="/assets/logos/svg/cultural-shield-monochrome.svg"
      alt="KudiKlass Logo"
      class="business-card-logo-back"
      width="32"
      height="32"
    />
  </div>
  <div class="card-back-content">
    <!-- Back content -->
  </div>
</div>

<style>
.business-card-back {
  width: 90mm;
  height: 50mm;
  padding: 8mm;
  background: white;
  border: 1px solid #ccc;
}

.business-card-logo-back {
  width: 32px;
  height: auto;
  opacity: 0.6;
}
</style>
```

#### Requirements
- **Front Logo**: 48px height, full colors
- **Back Logo**: 32px height, monochrome
- **Clear Space**: 8mm minimum
- **Background**: White card stock
- **Print Quality**: 300 DPI

### Letterhead

#### Header Implementation
```html
<!-- Letterhead Header -->
<div class="letterhead-header">
  <div class="letterhead-container">
    <div class="letterhead-logo">
      <img 
        src="/assets/logos/svg/cultural-shield-primary.svg"
        alt="KudiKlass Logo"
        class="letterhead-logo-main"
        width="96"
        height="96"
      />
    </div>
    <div class="letterhead-info">
      <h1>KudiKlass</h1>
      <p>Secure Educational Payments</p>
    </div>
  </div>
</div>

<style>
.letterhead-header {
  width: 210mm;
  height: 30mm;
  padding: 10mm 20mm;
  border-bottom: 2px solid #0066CC;
}

.letterhead-logo-main {
  width: 96px;
  height: auto;
  float: left;
  margin-right: 15mm;
}

.letterhead-info {
  padding-top: 20px;
}
</style>
```

#### Footer Implementation
```html
<!-- Letterhead Footer -->
<div class="letterhead-footer">
  <div class="footer-container">
    <div class="footer-logo">
      <img 
        src="/assets/logos/svg/cultural-shield-monochrome.svg"
        alt="KudiKlass Logo"
        class="letterhead-logo-footer"
        width="48"
        height="48"
      />
    </div>
    <div class="footer-contact">
      <!-- Contact information -->
    </div>
  </div>
</div>

<style>
.letterhead-footer {
  width: 210mm;
  height: 20mm;
  padding: 5mm 20mm;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 0;
}

.letterhead-logo-footer {
  width: 48px;
  height: auto;
  opacity: 0.7;
}
</style>
```

#### Requirements
- **Header Logo**: 96px height, full colors
- **Footer Logo**: 48px height, monochrome
- **Clear Space**: 10mm minimum
- **Background**: White paper stock
- **Print Quality**: 300 DPI

---

## Social Media Applications

### Facebook Profile

#### Profile Picture
```html
<!-- Facebook Profile Picture -->
<div class="facebook-profile">
  <div class="profile-picture-container">
    <img 
      src="/assets/social/facebook/facebook-profile-400x400.png"
      alt="KudiKlass"
      class="facebook-profile-pic"
      width="400"
      height="400"
    />
  </div>
</div>

<style>
.facebook-profile-pic {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #0066CC;
}

.profile-picture-container {
  width: 400px;
  height: 400px;
  margin: 0 auto;
}
</style>
```

#### Cover Photo
```html
<!-- Facebook Cover Photo -->
<div class="facebook-cover">
  <div class="cover-container">
    <img 
      src="/assets/social/facebook/facebook-cover-851x315.png"
      alt="KudiKlass Cover"
      class="facebook-cover-photo"
      width="851"
      height="315"
    />
  </div>
</div>

<style>
.facebook-cover-photo {
  width: 851px;
  height: 315px;
  object-fit: cover;
}

.cover-container {
  width: 851px;
  height: 315px;
  overflow: hidden;
}
</style>
```

#### Requirements
- **Profile Picture**: 400px × 400px, circular
- **Cover Photo**: 851px × 315px, horizontal
- **Clear Space**: Built into design
- **Background**: Platform-specific
- **Variation**: Social media optimized

### Instagram Profile

#### Profile Picture
```html
<!-- Instagram Profile Picture -->
<div class="instagram-profile">
  <div class="instagram-profile-container">
    <img 
      src="/assets/social/instagram/instagram-profile-320x320.png"
      alt="KudiKlass"
      class="instagram-profile-pic"
      width="320"
      height="320"
    />
  </div>
</div>

<style>
.instagram-profile-pic {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #E6A500;
}

.instagram-profile-container {
  width: 320px;
  height: 320px;
  margin: 0 auto;
}
</style>
```

#### Post Template
```html
<!-- Instagram Post -->
<div class="instagram-post">
  <div class="post-container">
    <img 
      src="/assets/social/instagram/instagram-post-1080x1080.png"
      alt="KudiKlass Post"
      class="instagram-post-image"
      width="1080"
      height="1080"
    />
  </div>
</div>

<style>
.instagram-post-image {
  width: 1080px;
  height: 1080px;
  object-fit: cover;
}

.post-container {
  width: 1080px;
  height: 1080px;
  overflow: hidden;
}
</style>
```

#### Requirements
- **Profile Picture**: 320px × 320px, circular
- **Post Image**: 1080px × 1080px, square
- **Clear Space**: Built into design
- **Background**: Platform-specific
- **Variation**: Social media optimized

---

## Mobile Applications

### App Icon

#### iOS App Icon
```html
<!-- iOS App Icon -->
<div class="ios-app-icon">
  <div class="app-icon-container">
    <img 
      src="/assets/icons/ios/Icon-1024.png"
      alt="KudiKlass App"
      class="ios-icon"
      width="1024"
      height="1024"
    />
  </div>
</div>

<style>
.ios-icon {
  width: 1024px;
  height: 1024px;
  border-radius: 20%;
  object-fit: cover;
}

.app-icon-container {
  width: 1024px;
  height: 1024px;
  margin: 0 auto;
}
</style>
```

#### Android App Icon
```html
<!-- Android App Icon -->
<div class="android-app-icon">
  <div class="android-icon-container">
    <img 
      src="/assets/icons/android/ic_launcher.png"
      alt="KudiKlass App"
      class="android-icon"
      width="192"
      height="192"
    />
  </div>
</div>

<style>
.android-icon {
  width: 192px;
  height: 192px;
  border-radius: 25%;
  object-fit: cover;
}

.android-icon-container {
  width: 192px;
  height: 192px;
  margin: 0 auto;
}
</style>
```

#### Requirements
- **iOS Icon**: 1024px × 1024px, 20% corner radius
- **Android Icon**: 192px × 192px, 25% corner radius
- **Clear Space**: Built into design
- **Background**: Platform-specific
- **Variation**: App icon optimized

### Splash Screen

#### Implementation
```html
<!-- Splash Screen -->
<div class="splash-screen">
  <div class="splash-container">
    <img 
      src="/assets/logos/svg/cultural-shield-primary.svg"
      alt="KudiKlass"
      class="splash-logo"
      width="240"
      height="240"
    />
    <div class="splash-text">
      <h1>KudiKlass</h1>
      <p>Secure Educational Payments</p>
    </div>
  </div>
</div>

<style>
.splash-screen {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0066CC, #003366);
  display: flex;
  align-items: center;
  justify-content: center;
}

.splash-logo {
  width: 240px;
  height: auto;
  margin-bottom: 24px;
}

.splash-text {
  text-align: center;
  color: white;
}

.splash-text h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}

.splash-text p {
  font-size: 16px;
  opacity: 0.8;
}
</style>
```

#### Requirements
- **Logo Size**: 240px height
- **Clear Space**: 24px minimum
- **Background**: Brand gradient
- **Color**: Full brand colors
- **Variation**: Primary logo

---

## Brand Collateral

### Marketing Brochure

#### Front Cover
```html
<!-- Brochure Front Cover -->
<div class="brochure-cover">
  <div class="cover-container">
    <div class="cover-header">
      <img 
        src="/assets/logos/svg/cultural-shield-primary.svg"
        alt="KudiKlass Logo"
        class="brochure-logo"
        width="120"
        height="120"
      />
    </div>
    <div class="cover-content">
      <h1>KudiKlass</h1>
      <p>Secure Educational Payments for Nigerian Schools</p>
    </div>
  </div>
</div>

<style>
.brochure-cover {
  width: 210mm;
  height: 297mm;
  padding: 20mm;
  background: linear-gradient(135deg, #0066CC, #E6A500);
  color: white;
}

.brochure-logo {
  width: 120px;
  height: auto;
  margin-bottom: 20mm;
}

.cover-header {
  text-align: center;
  margin-bottom: 30mm;
}
</style>
```

#### Inside Panel
```html
<!-- Brochure Inside Panel -->
<div class="brochure-inside">
  <div class="inside-container">
    <div class="inside-header">
      <img 
        src="/assets/logos/svg/cultural-shield-simplified.svg"
        alt="KudiKlass Logo"
        class="brochure-logo-small"
        width="80"
        height="80"
      />
    </div>
    <div class="inside-content">
      <!-- Brochure content -->
    </div>
  </div>
</div>

<style>
.brochure-inside {
  width: 210mm;
  height: 297mm;
  padding: 20mm;
  background: white;
}

.brochure-logo-small {
  width: 80px;
  height: auto;
  margin-bottom: 15mm;
}
</style>
```

#### Requirements
- **Cover Logo**: 120px height, full colors
- **Inside Logo**: 80px height, simplified
- **Clear Space**: 20mm minimum
- **Background**: Cover gradient, inside white
- **Print Quality**: 300 DPI

### Presentation Template

#### Title Slide
```html
<!-- Presentation Title Slide -->
<div class="presentation-title">
  <div class="title-container">
    <div class="title-header">
      <img 
        src="/assets/logos/svg/cultural-shield-primary.svg"
        alt="KudiKlass Logo"
        class="presentation-logo"
        width="180"
        height="180"
      />
    </div>
    <div class="title-content">
      <h1>KudiKlass</h1>
      <h2>Secure Educational Payments</h2>
      <p>Transforming School Payments in Nigeria</p>
    </div>
  </div>
</div>

<style>
.presentation-title {
  width: 1920px;
  height: 1080px;
  padding: 60px;
  background: linear-gradient(135deg, #0066CC, #003366);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.presentation-logo {
  width: 180px;
  height: auto;
  margin-bottom: 40px;
}

.title-header {
  text-align: center;
  margin-bottom: 60px;
}
</style>
```

#### Content Slide
```html
<!-- Presentation Content Slide -->
<div class="presentation-content">
  <div class="content-container">
    <div class="content-header">
      <img 
        src="/assets/logos/svg/cultural-shield-simplified.svg"
        alt="KudiKlass Logo"
        class="presentation-logo-small"
        width="60"
        height="60"
      />
    </div>
    <div class="content-body">
      <!-- Slide content -->
    </div>
  </div>
</div>

<style>
.presentation-content {
  width: 1920px;
  height: 1080px;
  padding: 40px;
  background: white;
  color: #003366;
}

.presentation-logo-small {
  width: 60px;
  height: auto;
  margin-bottom: 30px;
}
</style>
```

#### Requirements
- **Title Logo**: 180px height, full colors
- **Content Logo**: 60px height, simplified
- **Clear Space**: 40px minimum
- **Background**: Title gradient, content white
- **Digital Quality**: 1920px × 1080px

---

## Signage Applications

### Office Signage

#### Exterior Sign
```html
<!-- Exterior Office Sign -->
<div class="exterior-sign">
  <div class="sign-container">
    <div class="sign-logo">
      <img 
        src="/assets/logos/svg/cultural-shield-primary.svg"
        alt="KudiKlass"
        class="exterior-logo"
        width="300"
        height="300"
      />
    </div>
    <div class="sign-text">
      <h1>KudiKlass</h1>
      <p>Headquarters</p>
    </div>
  </div>
</div>

<style>
.exterior-sign {
  width: 1200px;
  height: 600px;
  padding: 50px;
  background: #0066CC;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exterior-logo {
  width: 300px;
  height: auto;
  margin-right: 50px;
}

.sign-logo {
  margin-right: 50px;
}
</style>
```

#### Reception Sign
```html
<!-- Reception Sign -->
<div class="reception-sign">
  <div class="reception-container">
    <div class="reception-logo">
      <img 
        src="/assets/logos/svg/cultural-shield-primary.svg"
        alt="KudiKlass"
        class="reception-logo-main"
        width="200"
        height="200"
      />
    </div>
    <div class="reception-info">
      <h1>Welcome to KudiKlass</h1>
      <p>Secure Educational Payments</p>
    </div>
  </div>
</div>

<style>
.reception-sign {
  width: 800px;
  height: 400px;
  padding: 40px;
  background: white;
  border: 2px solid #0066CC;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reception-logo-main {
  width: 200px;
  height: auto;
  margin-right: 40px;
}
</style>
```

#### Requirements
- **Exterior Logo**: 300px height, full colors
- **Reception Logo**: 200px height, full colors
- **Clear Space**: 50px minimum
- **Background**: Exterior blue, reception white
- **Print Quality**: 150 DPI for large format

### Event Signage

#### Conference Banner
```html
<!-- Conference Banner -->
<div class="conference-banner">
  <div class="banner-container">
    <div class="banner-logo">
      <img 
        src="/assets/logos/svg/cultural-shield-primary.svg"
        alt="KudiKlass"
        class="banner-logo-main"
        width="250"
        height="250"
      />
    </div>
    <div class="banner-content">
      <h1>KudiKlass</h1>
      <p>Education Technology Conference 2026</p>
    </div>
  </div>
</div>

<style>
.conference-banner {
  width: 2400px;
  height: 1200px;
  padding: 80px;
  background: linear-gradient(135deg, #0066CC, #E6A500);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-logo-main {
  width: 250px;
  height: auto;
  margin-right: 80px;
}
</style>
```

#### Requirements
- **Banner Logo**: 250px height, full colors
- **Clear Space**: 80px minimum
- **Background**: Brand gradient
- **Print Quality**: 150 DPI for large format

---

## Partnership Applications

### Co-branding

#### Partner Logo Usage
```html
<!-- Co-branded Header -->
<div class="co-branded-header">
  <div class="partner-container">
    <div class="partner-logos">
      <img 
        src="/assets/logos/svg/cultural-shield-primary.svg"
        alt="KudiKlass"
        class="partner-logo-kudiklass"
        width="120"
        height="120"
      />
      <div class="partnership-symbol">+</div>
      <img 
        src="/partner-logo.svg"
        alt="Partner Logo"
        class="partner-logo-other"
        width="120"
        height="120"
      />
    </div>
    <div class="partner-text">
      <h1>Partnership Announcement</h1>
    </div>
  </div>
</div>

<style>
.co-branded-header {
  width: 100%;
  padding: 40px;
  background: white;
  text-align: center;
}

.partner-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.partnership-symbol {
  font-size: 48px;
  font-weight: bold;
  color: #0066CC;
  margin: 0 30px;
}

.partner-logo-kudiklass {
  width: 120px;
  height: auto;
}

.partner-logo-other {
  width: 120px;
  height: auto;
}
</style>
```

#### Requirements
- **Logo Size**: Equal height for both logos
- **Clear Space**: 30px between logos
- **Background**: White or neutral
- **Partnership Symbol**: Clear visual connection
- **Balance**: Equal visual weight

### Sponsored Content

#### Sponsored By
```html
<!-- Sponsored Content -->
<div class="sponsored-content">
  <div class="sponsored-header">
    <div class="sponsored-by">
      <span>Sponsored by:</span>
      <img 
        src="/assets/logos/svg/cultural-shield-simplified.svg"
        alt="KudiKlass"
        class="sponsored-logo"
        width="80"
        height="80"
      />
    </div>
  </div>
  <div class="content-body">
    <!-- Content -->
  </div>
</div>

<style>
.sponsored-content {
  width: 100%;
  padding: 20px;
}

.sponsored-header {
  margin-bottom: 20px;
  text-align: right;
}

.sponsored-by {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.sponsored-logo {
  width: 80px;
  height: auto;
}

.sponsored-by span {
  color: #6C757D;
  font-size: 14px;
}
</style>
```

#### Requirements
- **Logo Size**: 80px height
- **Clear Space**: 10px minimum
- **Background**: Content background
- **Color**: Simplified colors
- **Placement**: Bottom right or top right

---

## Common Usage Patterns

### Responsive Logo Implementation

#### Breakpoint-Based Sizing
```html
<!-- Responsive Logo -->
<div class="responsive-logo-container">
  <img 
    src="/assets/logos/svg/cultural-shield-primary.svg"
    alt="KudiKlass Logo"
    class="responsive-logo"
    width="240"
    height="240"
  />
</div>

<style>
.responsive-logo {
  width: 240px;
  height: auto;
  max-width: 100%;
  transition: all 0.3s ease;
}

/* Desktop */
@media (min-width: 1200px) {
  .responsive-logo {
    width: 240px;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) {
  .responsive-logo {
    width: 180px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .responsive-logo {
    width: 120px;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .responsive-logo {
    width: 80px;
  }
}
</style>
```

### Dark Mode Implementation

#### Theme-Aware Logo
```html
<!-- Theme-Aware Logo -->
<div class="theme-logo-container">
  <img 
    src="/assets/logos/svg/cultural-shield-primary.svg"
    alt="KudiKlass Logo"
    class="theme-logo"
    width="120"
    height="120"
  />
</div>

<style>
.theme-logo {
  width: 120px;
  height: auto;
  transition: filter 0.3s ease;
}

/* Light Mode */
.light-theme .theme-logo {
  filter: none;
}

/* Dark Mode */
.dark-theme .theme-logo {
  filter: brightness(1.2) contrast(1.1);
}
</style>
```

### Loading State Implementation

#### Logo Loading Animation
```html
<!-- Loading State -->
<div class="logo-loading-container">
  <div class="logo-loading-placeholder">
    <div class="loading-spinner"></div>
  </div>
  <img 
    src="/assets/logos/svg/cultural-shield-primary.svg"
    alt="KudiKlass Logo"
    class="logo-loading"
    width="120"
    height="120"
    style="display: none;"
  />
</div>

<style>
.logo-loading-container {
  width: 120px;
  height: 120px;
  position: relative;
}

.logo-loading-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e9ecef;
  border-top: 3px solid #0066CC;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.logo-loading.loaded {
  display: block !important;
}

.logo-loading-placeholder.hidden {
  display: none;
}
</style>
```

### Error State Implementation

#### Logo Fallback
```html
<!-- Error State -->
<div class="logo-error-container">
  <div class="logo-error-fallback">
    <div class="error-icon">⚠️</div>
    <span>Logo</span>
  </div>
</div>

<style>
.logo-error-container {
  width: 120px;
  height: 120px;
  background: #f8f9fa;
  border: 2px dashed #dc3545;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-error-fallback {
  text-align: center;
  color: #dc3545;
  font-weight: bold;
}

.error-icon {
  font-size: 32px;
  margin-bottom: 8px;
}
</style>
```

---

## Quality Assurance Checklist

### Pre-Use Verification

#### Logo Quality
- [ ] Logo file is approved and current
- [ ] Logo resolution is appropriate for use
- [ ] Logo colors match brand standards
- [ ] Logo proportions are correct
- [ ] Logo clear space is maintained

#### Technical Requirements
- [ ] File format is correct for application
- [ ] File size is optimized
- [ ] Color mode is appropriate (RGB/CMYK)
- [ ] Accessibility requirements are met
- [ ] Performance requirements are met

#### Context Requirements
- [ ] Background is appropriate
- [ ] Size meets minimum requirements
- [ ] Placement follows guidelines
- [ ] Usage context is appropriate
- [ ] Legal requirements are met

### Common Issues to Avoid

#### Visual Issues
- ❌ Logo stretched or distorted
- ❌ Logo pixelated or blurry
- ❌ Logo colors incorrect
- ❌ Logo placed on busy background
- ❌ Logo too small or too large

#### Technical Issues
- ❌ Wrong file format
- ❌ File size too large
- ❌ Color mode incorrect
- ❌ Accessibility violations
- ❌ Performance issues

#### Context Issues
- ❌ Inappropriate usage context
- ❌ Competing visual elements
- ❌ Insufficient clear space
- ❌ Incorrect logo variation
- ❌ Legal or trademark violations

---

## Resources

### Asset Downloads
- **Logo Files**: All approved logo variations
- **Templates**: Pre-designed templates
- **Guidelines**: Complete usage guidelines
- **Examples**: Additional usage examples

### Support
- **Brand Manager**: brand@kudiklass.com
- **Design Team**: design@kudiklass.com
- **Technical Support**: tech@kudiklass.com

### Training
- **Brand Guidelines**: Complete documentation
- **Usage Training**: Regular training sessions
- **Best Practices**: Industry best practices
- **Updates**: Regular guideline updates

---

*These examples provide comprehensive guidance for proper logo usage across all applications. Always follow these examples to maintain brand consistency and integrity.*
