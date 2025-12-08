# Brian The Tree Guy - Design Guidelines

## Design Approach
**Reference-Based:** Local service business website with focus on conversion and mobile usability. Drawing inspiration from modern service-oriented sites with clean layouts and prominent CTAs.

## Brand Colors
- **Primary Orange:** #FF7F00 (buttons, highlights, section headings)
- **Charcoal Gray:** #222222 (body text, footer background)
- **Light Gray:** #F4F4F4 (page background)
- **White:** #FFFFFF (card backgrounds, button text)

## Typography
**Font Stack:** "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif

**Hierarchy:**
- Hero Headlines: 32-40px, weight 700
- Section Headings: 22-28px, weight 700
- Body Text: 16-18px, weight 400-500, line-height 1.5-1.6
- Button Text: weight 600, letter-spacing 0.5px

## Layout System
**Spacing Units:** Use consistent padding/margins - 16px (small), 24px (medium), 40px (large), 64px (section spacing)

**Container Max-Width:** 1200px centered for main content areas

**Grid Systems:**
- Services: 3 columns desktop → 2 columns tablet → 1 column mobile
- Gallery: Auto-fit grid with 200px minimum column width

## Header & Navigation
**Desktop:**
- Fixed sticky header at top
- Left: Business name/logo
- Center/Right: Navigation links (Home, Services, Gallery, Contact)
- Right corner: Prominent phone number "Call Now: 941-277-2154" in orange

**Mobile:**
- Hamburger menu icon replacing navigation
- Full-width slide-down menu with stacked links
- Phone number remains visible in header

## Hero Section
**Layout:**
- Full-width section, minimum height 500px
- Centered content alignment
- White background (or subtle tree imagery if available)

**Content Hierarchy:**
1. Business name (largest, bold, charcoal gray)
2. Tagline (medium size, regular weight)
3. Orange CTA button: "Call Now – 941-277-2154" (14px padding, 6px border-radius)

## Services Section
**Card Design:**
- White background with subtle shadow (0 2px 8px rgba(0,0,0,0.1))
- 24px internal padding
- 8px border-radius
- Service title in orange or charcoal
- Description text below title
- Icons above titles (simple, minimal)

**Grid:** Responsive 3→2→1 column layout with 24px gaps

## Gallery Page
**Grid Layout:**
- Responsive grid: auto-fit, minmax(200px, 1fr)
- 12px gaps between images
- Images maintain aspect ratio with object-fit: cover

**Lightbox Modal:**
- Dark overlay background (rgba(0,0,0,0.9))
- Centered image display
- Close button (X) in top-right corner
- Click outside image to close

## Contact Page
**Layout:**
- Centered content, max-width 600px
- Large click-to-call button (orange, full-width on mobile)
- Contact information below button
- Service area details in regular text
- Clean white background with ample spacing

## Footer
**Design:**
- Dark background (#222222)
- White text throughout
- Centered alignment
- Three sections: Business name | Phone number | Navigation links
- Copyright text below, smaller size (14px)
- 40px vertical padding

## Component Specifications

**Buttons:**
- Primary: Orange background, white text, 12px vertical / 24px horizontal padding
- Border-radius: 6px
- Font weight: 600
- Letter-spacing: 0.5px
- Hover: Darken orange by 10%

**Cards (Services):**
- White background
- Box-shadow: 0 2px 8px rgba(0,0,0,0.1)
- Border-radius: 8px
- Padding: 24px
- Hover: Lift shadow (0 4px 12px rgba(0,0,0,0.15))

## Mobile Optimization
**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile-Specific:**
- Stack all multi-column layouts to single column
- Increase touch target sizes (minimum 44px height for buttons)
- Full-width buttons and form elements
- Larger text sizes for readability (18px body minimum)

## Interactions
- Smooth scroll behavior for anchor links
- Mobile menu slide-down animation (300ms)
- Lightbox fade-in animation (200ms)
- Button hover states with smooth transitions
- No complex animations or scroll effects

## Images
**Hero Section:** Optional subtle tree-related background image (low opacity overlay if text is placed on top)

**Gallery:** Use existing images only - display in responsive grid with consistent aspect ratios

**Placeholders:** For missing images, use light gray boxes with "Image Coming Soon" centered text