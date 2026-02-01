# Social Media Profile Versions

## Social Media Icon Specifications

### Platform Requirements
**Common Sizes**:
- **Profile Pictures**: 64px × 64px to 800px × 800px
- **Cover Photos**: 851px × 315px to 2048px × 1152px
- **Story/Temporary**: 1080px × 1920px
- **Post Images**: 1080px × 1080px (square)

**Platform Specifications**:
- **Facebook**: 180px × 180px profile, 851px × 315px cover
- **Twitter**: 400px × 400px profile, 1500px × 500px cover
- **Instagram**: 110px × 110px profile, 1080px × 1080px posts
- **LinkedIn**: 300px × 300px profile, 1584px × 396px cover
- **YouTube**: 800px × 800px profile, 2560px × 1440px banner

## Cultural Security Shield - Social Media Variations

### Profile Pictures
**Standard Profile Picture (400px × 400px)**:
- **Elements**: Shield with cultural pattern and educational symbol
- **Color**: Full brand palette
- **Style**: Clean, professional appearance
- **Recognition**: Strong brand recognition

**Circular Profile Picture (400px × 400px)**:
- **Elements**: Same as standard, with circular mask
- **Color**: Full brand palette
- **Style**: Modern, social media friendly
- **Recognition**: Excellent brand recognition

#### Technical Implementation
**SVG Source**:
```xml
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Circular Mask -->
  <defs>
    <clipPath id="circularMask">
      <circle cx="200" cy="200" r="200"/>
    </clipPath>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="400" fill="#0066CC" clip-path="url(#circularMask)"/>
  
  <!-- Shield Icon -->
  <g transform="translate(200, 200)" clip-path="url(#circularMask)">
    <path d="M0,-80 L70,-40 L70,40 L0,80 L-70,40 L-70,-40 Z" 
          fill="#E6A500" stroke="#FFFFFF" stroke-width="3"/>
    
    <!-- Cultural Pattern -->
    <g opacity="0.8">
      <path d="..." fill="#28A745"/>
      <circle cx="-20" cy="-20" r="12" fill="#28A745"/>
      <path d="..." fill="#28A745"/>
    </g>
    
    <!-- Educational Symbol -->
    <g transform="translate(0, 10)">
      <path d="..." fill="#FFFFFF"/>
      <path d="..." fill="#FFFFFF"/>
    </g>
  </g>
</svg>
```

### Cover Photos
**Facebook Cover (851px × 315px)**:
- **Layout**: Logo left, brand message right
- **Elements**: Primary logo with typography
- **Color**: Full brand palette
- **Style**: Professional, engaging

**Twitter Header (1500px × 500px)**:
- **Layout**: Logo centered, brand message
- **Elements**: Logo with tagline
- **Color**: Full brand palette
- **Style**: Professional, clean

#### Facebook Cover Implementation
**SVG Source**:
```xml
<svg width="851" height="315" viewBox="0 0 851 315" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="851" height="315" fill="#0066CC"/>
  
  <!-- Cultural Pattern Background -->
  <g opacity="0.1">
    <pattern id="socialPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="..." fill="#E6A500"/>
    </pattern>
    <rect width="851" height="315" fill="url(#socialPattern)"/>
  </g>
  
  <!-- Logo -->
  <g transform="translate(100, 157)">
    <path d="M0,-60 L50,-30 L50,30 L0,60 L-50,30 L-50,-30 Z" 
          fill="#E6A500" stroke="#FFFFFF" stroke-width="2"/>
    
    <!-- Simplified Elements -->
    <circle cx="0" cy="-15" r="8" fill="#FFFFFF"/>
    <path d="M-12,8 L12,8 L10,18 L-10,18 Z" fill="#FFFFFF"/>
  </g>
  
  <!-- Brand Message -->
  <text x="200" y="180" font-family="Inter Modified" font-size="36" 
        font-weight="700" fill="#FFFFFF">Secure Educational Payments</text>
  <text x="200" y="220" font-family="Inter" font-size="24" 
        font-weight="400" fill="#E6A500">Trusted by Nigerian Schools & Parents</text>
</svg>
```

### Post Templates
**Square Post (1080px × 1080px)**:
- **Layout**: Logo centered, message below
- **Elements**: Full logo with brand messaging
- **Color**: Full brand palette
- **Style**: Professional, engaging

**Story Template (1080px × 1920px)**:
- **Layout**: Logo top, content middle, CTA bottom
- **Elements**: Logo with brand colors
- **Color**: Full brand palette
- **Style**: Modern, mobile-first

---

## Shielded Achievement - Social Media Variations

### Profile Pictures
**Standard Profile Picture (400px × 400px)**:
- **Elements**: Shield with achievement symbol
- **Color**: Full brand palette
- **Style**: Professional, achievement-focused
- **Recognition**: Strong brand recognition

**Circular Profile Picture (400px × 400px)**:
- **Elements**: Same as standard, with circular mask
- **Color**: Full brand palette
- **Style**: Modern, professional
- **Recognition**: Excellent brand recognition

#### Technical Implementation
**SVG Source**:
```xml
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Circular Mask -->
  <defs>
    <clipPath id="circularMask">
      <circle cx="200" cy="200" r="200"/>
    </clipPath>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="400" fill="#0066CC" clip-path="url(#circularMask)"/>
  
  <!-- Achievement Icon -->
  <g transform="translate(200, 200)" clip-path="url(#circularMask)">
    <path d="M0,-80 L70,-40 L70,40 L0,80 L-70,40 L-70,-40 Z" 
          fill="#E6A500" stroke="#FFFFFF" stroke-width="3"/>
    
    <!-- Graduation Cap -->
    <path d="M-25,-20 L25,-20 L22,5 L-22,5 Z" fill="#FFFFFF"/>
    <circle cx="0" cy="-22" r="6" fill="#FFFFFF"/>
    
    <!-- Cultural Accent -->
    <line x1="-15" y1="5" x2="15" y2="5" stroke="#28A745" stroke-width="3"/>
  </g>
</svg>
```

### Cover Photos
**LinkedIn Cover (1584px × 396px)**:
- **Layout**: Logo left, professional message right
- **Elements**: Logo with professional messaging
- **Color**: Full brand palette
- **Style**: Corporate, professional

**YouTube Banner (2560px × 1440px)**:
- **Layout**: Logo centered, brand message
- **Elements**: Logo with channel information
- **Color**: Full brand palette
- **Style**: Professional, engaging

#### LinkedIn Cover Implementation
**SVG Source**:
```xml
<svg width="1584" height="396" viewBox="0 0 1584 396" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1584" height="396" fill="#0066CC"/>
  
  <!-- Professional Pattern -->
  <g opacity="0.05">
    <pattern id="professionalPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="..." fill="#E6A500"/>
    </pattern>
    <rect width="1584" height="396" fill="url(#professionalPattern)"/>
  </g>
  
  <!-- Logo -->
  <g transform="translate(120, 198)">
    <path d="M0,-60 L50,-30 L50,30 L0,60 L-50,30 L-50,-30 Z" 
          fill="#E6A500" stroke="#FFFFFF" stroke-width="2"/>
    
    <!-- Achievement Symbol -->
    <path d="M-15,-15 L15,-15 L13,5 L-13,5 Z" fill="#FFFFFF"/>
    <circle cx="0" cy="-17" r="4" fill="#FFFFFF"/>
  </g>
  
  <!-- Professional Message -->
  <text x="220" y="185" font-family="Inter Modified" font-size="42" 
        font-weight="700" fill="#FFFFFF">Educational Payment Excellence</text>
  <text x="220" y="230" font-family="Inter" font-size="28" 
        font-weight="400" fill="#E6A500">Secure • Professional • Trusted</text>
</svg>
```

## Platform-Specific Guidelines

### Facebook
**Profile Picture**:
- **Size**: 180px × 180px minimum, 400px × 400px recommended
- **Format**: PNG or JPG
- **Style**: Circular display
- **Guidelines**: Professional, brand-consistent

**Cover Photo**:
- **Size**: 851px × 315px desktop, 640px × 360px mobile
- **Format**: PNG or JPG
- **Style**: Horizontal layout
- **Guidelines**: Brand messaging, professional appearance

### Twitter
**Profile Picture**:
- **Size**: 400px × 400px recommended
- **Format**: PNG or JPG
- **Style**: Circular display
- **Guidelines**: Clear, recognizable

**Header Photo**:
- **Size**: 1500px × 500px recommended
- **Format**: PNG or JPG
- **Style**: Wide horizontal layout
- **Guidelines**: Brand messaging, professional

### Instagram
**Profile Picture**:
- **Size**: 110px × 110px minimum, 320px × 320px recommended
- **Format**: PNG or JPG
- **Style**: Circular display
- **Guidelines**: High-quality, professional

**Post Images**:
- **Size**: 1080px × 1080px square
- **Format**: PNG or JPG
- **Style**: Square layout
- **Guidelines**: Brand-consistent, engaging

### LinkedIn
**Profile Picture**:
- **Size**: 300px × 300px minimum, 400px × 400px recommended
- **Format**: PNG or JPG
- **Style**: Circular display
- **Guidelines**: Professional, business-appropriate

**Cover Photo**:
- **Size**: 1584px × 396px recommended
- **Format**: PNG or JPG
- **Style**: Wide horizontal layout
- **Guidelines**: Professional, corporate messaging

### YouTube
**Profile Picture**:
- **Size**: 800px × 800px recommended
- **Format**: PNG or JPG
- **Style**: Circular display
- **Guidelines**: High-quality, recognizable

**Channel Banner**:
- **Size**: 2560px × 1440px recommended
- **Format**: PNG or JPG
- **Style**: Wide horizontal layout
- **Guidelines**: Brand messaging, professional

## Content Templates

### Educational Content Posts
**Template Structure**:
- **Header**: Logo + brand colors
- **Content**: Educational message
- **Footer**: Logo + call-to-action
- **Style**: Professional, informative

**Color Scheme**:
- **Primary**: Professional Blue (#0066CC)
- **Accent**: Cultural Gold (#E6A500)
- **Text**: White (#FFFFFF) and Dark Blue (#003366)
- **Background**: Blue with subtle pattern

### Security-Focused Posts
**Template Structure**:
- **Header**: Security-focused logo variation
- **Content**: Security message
- **Footer**: Trust indicators
- **Style**: Professional, trustworthy

**Color Scheme**:
- **Primary**: Dark Blue (#003366)
- **Accent**: Cultural Gold (#E6A500)
- **Text**: White (#FFFFFF)
- **Background**: Dark blue with security pattern

### Achievement Posts
**Template Structure**:
- **Header**: Achievement-focused logo
- **Content**: Success stories
- **Footer**: Achievement indicators
- **Style**: Celebratory, professional

**Color Scheme**:
- **Primary**: Professional Blue (#0066CC)
- **Accent**: Cultural Gold (#E6A500)
- **Text**: White (#FFFFFF)
- **Background**: Blue with achievement pattern

## Implementation Guidelines

### File Organization
```
assets/
├── social-media/
│   ├── profile-pictures/
│   │   ├── facebook-profile-400x400.png
│   │   ├── twitter-profile-400x400.png
│   │   ├── instagram-profile-320x320.png
│   │   ├── linkedin-profile-400x400.png
│   │   └── youtube-profile-800x800.png
│   ├── cover-photos/
│   │   ├── facebook-cover-851x315.png
│   │   ├── twitter-header-1500x500.png
│   │   ├── linkedin-cover-1584x396.png
│   │   └── youtube-banner-2560x1440.png
│   ├── post-templates/
│   │   ├── square-post-1080x1080.png
│   │   ├── story-template-1080x1920.png
│   │   ├── educational-post-1080x1080.png
│   │   ├── security-post-1080x1080.png
│   │   └── achievement-post-1080x1080.png
│   └── brand-assets/
│       ├── color-palette.png
│       ├── typography-guide.png
│       └── usage-guidelines.pdf
```

### React Component
```jsx
import React from 'react';

const SocialMediaIcon = ({ platform = 'facebook', size = 400 }) => {
  const getIconSrc = () => {
    const sizeStr = `${size}x${size}`;
    switch (platform) {
      case 'facebook':
        return `/social-media/profile-pictures/facebook-profile-${sizeStr}.png`;
      case 'twitter':
        return `/social-media/profile-pictures/twitter-profile-${sizeStr}.png`;
      case 'instagram':
        return `/social-media/profile-pictures/instagram-profile-${sizeStr}.png`;
      case 'linkedin':
        return `/social-media/profile-pictures/linkedin-profile-${sizeStr}.png`;
      case 'youtube':
        return `/social-media/profile-pictures/youtube-profile-${sizeStr}.png`;
      default:
        return `/social-media/profile-pictures/facebook-profile-${sizeStr}.png`;
    }
  };

  return (
    <img
      src={getIconSrc()}
      alt={`KudiKlass ${platform} Profile`}
      style={{ width: size, height: size }}
      className={`social-media-icon social-media-${platform}`}
    />
  );
};

export default SocialMediaIcon;
```

### CSS Implementation
```css
.social-media-icon {
  display: block;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.social-media-icon:hover {
  transform: scale(1.05);
}

.social-media-facebook {
  border: 3px solid #1877F2;
}

.social-media-twitter {
  border: 3px solid #1DA1F2;
}

.social-media-instagram {
  border: 3px solid #E4405F;
}

.social-media-linkedin {
  border: 3px solid #0077B5;
}

.social-media-youtube {
  border: 3px solid #FF0000;
}
```

## Quality Assurance

### Visual Testing
**Platform Testing**:
- **Facebook**: Profile and cover photo testing
- **Twitter**: Profile and header testing
- **Instagram**: Profile and post testing
- **LinkedIn**: Profile and cover testing
- **YouTube**: Profile and banner testing

**Device Testing**:
- **Desktop**: Various screen resolutions
- **Mobile**: iOS and Android devices
- **Tablet**: iPad and Android tablets
- **Cross-Platform**: Consistent appearance

### Performance Testing
**Load Time Testing**:
- **Profile Pictures**: < 500ms load time
- **Cover Photos**: < 1 second load time
- **Post Templates**: < 750ms load time
- **Mobile Performance**: Optimized for mobile

**File Size Testing**:
- **Profile Pictures**: < 100KB file size
- **Cover Photos**: < 500KB file size
- **Post Templates**: < 250KB file size
- **Compression**: Optimized compression

## Success Metrics

### Technical Success
- **File Size**: < 500KB for all social media assets
- **Load Time**: < 1 second for all assets
- **Recognition**: 85%+ brand recognition
- **Compatibility**: 100% platform compatibility

### Brand Success
- **Consistency**: Perfect brand consistency
- **Recognition**: Strong social media recognition
- **Professionalism**: Professional appearance
- **Engagement**: Increased user engagement

### User Success
- **Clarity**: Clear visual communication
- **Usability**: Easy to recognize and engage
- **Accessibility**: Full accessibility compliance
- **Preference**: Positive user feedback

## Maintenance Guidelines

### Regular Updates
**Platform Updates**:
- **Guideline Changes**: Platform guideline monitoring
- **Size Requirements**: Regular size requirement updates
- **Format Changes**: Format compatibility updates
- **Best Practices**: Industry best practice updates

**Quality Control**:
- **Monthly Testing**: Regular asset quality checks
- **Performance Monitoring**: Load time tracking
- **User Feedback**: Regular user testing
- **Engagement Analysis**: Social media engagement tracking

### Evolution Strategy
**Content Strategy**:
- **Template Updates**: Regular template refresh
- **Message Updates**: Brand message evolution
- **Visual Updates**: Design element updates
- **Strategy Alignment**: Brand strategy alignment

**Technology Updates**:
- **Format Support**: New format support
- **Performance**: Enhanced performance optimization
- **Accessibility**: Improved accessibility features
- **User Experience**: Enhanced user interaction
