# 🎨 Dashboard Design System & Style Guide

## Color Palette

### Primary Colors
```
Purple (Primary): #6C4CF1
- Usage: Main actions, buttons, focus states, links
- RGB: 108, 76, 241
- Dark Mode: Slightly lighter for contrast

Teal (Secondary): #00C2A8
- Usage: Positive actions, success, secondary buttons, accents
- RGB: 0, 194, 168
- Dark Mode: Lighter teal

Amber (Accent): #FFD166
- Usage: Warnings, highlights, important notices
- RGB: 255, 209, 102
- Dark Mode: Orange-amber

Red (Danger): #EF4444
- Usage: Destructive actions, errors, delete
- RGB: 239, 68, 68
- Dark Mode: Lighter red

Green (Success): #10B981
- Usage: Confirmations, completions, approved
- RGB: 16, 185, 129
- Dark Mode: Lighter green
```

### Grayscale
```
Light Mode:
- 50:  #F9FAFB (Near white, backgrounds)
- 100: #F3F4F6 (Light gray, sections)
- 200: #E5E7EB (Borders, dividers)
- 300: #D1D5DB (Disabled, secondary)
- 400: #9CA3AF (Tertiary text)
- 500: #6B7280 (Secondary text)
- 600: #4B5563 (Primary text)
- 700: #374151 (Dark text)
- 800: #1F2937 (Very dark text)
- 900: #111827 (Almost black)

Dark Mode:
- 50:  #F9FAFB (White text on dark)
- 100: #0F172A (Very dark background)
- 200: #1E293B (Dark background)
- 300: #334155 (Borders/dividers)
- 400: #475569 (Tertiary text)
- 500: #64748B (Secondary text)
```

---

## Typography System

### Font Weights
```
Regular:  400
Medium:   500
Semibold: 600
Bold:     700
Black:    900
```

### Font Sizes & Uses
```
Heading 1 (H1): 30px / 3rem / font-black
- Usage: Page titles
- Example: "لوحة التحكم"

Heading 2 (H2): 24px / 1.5rem / font-bold
- Usage: Section titles
- Example: "الإحصائيات الرئيسية"

Heading 3 (H3): 20px / 1.25rem / font-bold
- Usage: Card titles
- Example: "نمو المستخدمين"

Heading 4 (H4): 18px / 1.125rem / font-semibold
- Usage: Subsection titles

Body (Default): 16px / 1rem / font-normal
- Usage: Body text, descriptions

Body Small: 14px / 0.875rem / font-normal
- Usage: Secondary text, captions

Label: 12px / 0.75rem / font-semibold uppercase
- Usage: Form labels, table headers

Caption: 12px / 0.75rem / font-normal
- Usage: Help text, timestamps
```

---

## Spacing System

### Scale (8px base)
```
xs:  8px  (1 * 8)   - Smallest gaps
sm:  12px (1.5 * 8) - Small spacing
md:  16px (2 * 8)   - Standard spacing
lg:  24px (3 * 8)   - Large spacing
xl:  32px (4 * 8)   - Extra large spacing
2xl: 48px (6 * 8)   - Huge spacing
```

### Application
```
Padding:
- Cards: 16-24px
- Sections: 24-32px
- Container: 16-32px depending on breakpoint

Margins:
- Between sections: 24-32px
- Between cards: 12-16px
- Between items: 8-12px

Gaps:
- Grid gaps: 16-24px depending on breakpoint
- Flex gaps: 12-16px
- List gaps: 8-12px
```

---

## Shadows (Elevation System)

### Shadow Levels
```
No Shadow (Level 0):
- Flat design
- Use for: Backgrounds, non-interactive elements

Small Shadow (Level 1):
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
- Use for: Subtle elevation, borders

Medium Shadow (Level 2):
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
- Use for: Cards, interactive elements, hover states

Large Shadow (Level 3):
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
- Use for: Modals, overlays, important components

Extra Large Shadow (Level 4):
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
- Use for: Modal backdrops, full-page overlays
```

---

## Border & Radius System

### Border Radius
```
None:  0px      (Sharp corners)
sm:    6px      (Slightly rounded)
md:    8px      (Standard - use this most)
lg:    12px     (Rounded)
xl:    16px     (Very rounded)
full:  9999px   (Pills, avatars)
```

### Border Width
```
Light:   1px  (Default for cards, inputs)
Medium:  2px  (Focus states, active)
Bold:    4px  (Large interactive areas)
```

### Border Color
```
Light Mode: rgb(229, 231, 235) - gray-200
Dark Mode:  rgb(51, 65, 85) - gray-700
Focus:      Use primary color with 2px width
```

---

## Interactive Elements

### Buttons

#### Sizes
```
Extra Small (XS): 8px 12px, text-xs
Small (SM):       12px 16px, text-sm
Medium (MD):      16px 20px, text-sm
Large (LG):       16px 24px, text-base
```

#### Variants
```
Primary:
- Background: Primary color
- Text: White
- Hover: Darker primary
- Active: Even darker
- Disabled: Gray with reduced opacity

Secondary:
- Background: Primary color at 10% opacity
- Text: Primary color
- Hover: 15% opacity
- Border: Primary color border

Ghost:
- Background: Transparent
- Text: Primary color
- Hover: Primary color at 5% opacity
- Border: Optional

Danger:
- Background: Red
- Text: White
- Hover: Darker red
- Confirms: Additional modal
```

### Hover States
```
- Scale: +2% on interactive elements
- Shadow: Increase elevation by 1 level
- Background: Slight color shift
- Duration: 200ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Focus States
```
- Outline: 2px solid primary color
- Offset: 2px
- Visible on: Tab key press (keyboard navigation)
```

### Disabled States
```
- Opacity: 50%
- Cursor: not-allowed
- Background: Gray-200 (light) / Gray-700 (dark)
- Text: Gray-400
- No hover effects
```

---

## Animation & Transitions

### Timing Functions
```
Fast:   150ms cubic-bezier(0.4, 0, 0.2, 1)
- Use for: Hover effects, small transitions

Base:   200ms cubic-bezier(0.4, 0, 0.2, 1)
- Use for: Component animations, visibility changes

Slow:   300ms cubic-bezier(0.4, 0, 0.2, 1)
- Use for: Page transitions, complex animations
```

### Common Animations
```
Fade In:      opacity: 0 → 1 (200ms)
Slide Down:   transform: translateY(-10px) → 0 (200ms)
Scale Grow:   transform: scale(0.95) → 1 (200ms)
Pulse:        opacity: 1 → 0.5 → 1 (repeat)
Shimmer:      Background gradient shift (loading)
```

---

## Component Specifications

### Stat Cards
```
Dimensions:
- Padding: 16px (sm), 20px (md), 24px (lg)
- Border: 1px gray-200
- Border Radius: 8px

Colors (Light Mode):
- Background: White
- Text: Gray-900
- Label: Gray-600
- Icon Background: Primary color at 10%

Colors (Dark Mode):
- Background: Gray-800
- Text: White
- Label: Gray-400
- Icon Background: Primary color at 5%

Hover:
- Shadow: +1 level
- Scale: 1.02x
- Duration: 200ms
```

### Data Tables
```
Header:
- Background: Gray-50 (light) / Gray-900 (dark)
- Text: Gray-700 (light) / Gray-300 (dark)
- Border: 1px bottom gray-200
- Padding: 12px 16px
- Font: font-semibold text-sm

Rows:
- Height: 64px minimum
- Padding: 16px
- Border: 1px bottom gray-200
- Hover: Background color +2%
- Selected: Background primary color at 10%

Alternating:
- No alternating backgrounds (keep clean)
- Use hover for selection feedback
```

### Modals
```
Overlay:
- Background: rgba(0, 0, 0, 0.5)
- Animation: Fade in 200ms

Modal:
- Border Radius: 12px
- Shadow: Level 4
- Max Width: 
  - SM: 400px
  - MD: 600px (default)
  - LG: 800px
- Padding: 32px

Animation:
- Entrance: Scale from center (200ms)
- Exit: Scale to center (150ms)
```

### Forms
```
Inputs:
- Height: 40px (md, standard)
- Padding: 12px 16px
- Border: 1px gray-200
- Border Radius: 8px
- Font Size: 14px
- Focus: 2px primary border, shadow level 1

Errors:
- Border: red-500 2px
- Text: red-600
- Icon: Red with exclamation
- Animation: Shake 200ms

Success:
- Border: green-500 1px
- Icon: Checkmark
- Text: green-600
```

---

## Responsive Breakpoints

```
Mobile First Approach:

Default (Mobile):  320px - 639px
- Single column layouts
- Full-width cards
- Stacked navigation
- Touch-friendly (44×44px+ targets)

Tablet (md):       640px - 1023px
- 2-column layouts where applicable  
- Partial sidebar
- Adjusted spacing

Desktop (lg):      1024px - 1279px
- 3-4 column layouts
- Full sidebar
- Optimal spacing

Large (xl):        1280px+
- Maximum efficiency
- Full use of space
- Large visualizations
```

---

## Dark Mode

### General Rules
```
- All grays shift to dark equivalents
- Use gray-700 to gray-900 for backgrounds
- Use white/gray-100 for text
- Reduce shadow opacity
- Slightly lighten colors for contrast
- Borders become less opaque

Light → Dark Mapping:
- white → gray-800-900
- gray-50 → gray-900
- gray-100 → gray-800
- gray-200 → gray-700
- gray-900 → white
- black → gray-100
```

### Component Colors (Dark Mode)
```
Card:
- Background: #1E293B (not black)
- Border: #334155 with 50% opacity
- Text: white

Input:
- Background: #0F172A (darker for depth)
- Border: #334155
- Text: white
- Placeholder: gray-400

Button (dark variant):
- Primary: Lighter primary color
- Hover: Even lighter
- Text: white

Separator/Border:
- Color: #334155 (25% opacity usually best)
```

---

## Accessibility Guidelines

### Color Contrast
```
WCAG AA Minimum:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- UI components: 3:1 contrast ratio

Design Priority:
- Don't rely on color alone for meaning
- Use patterns, icons, labels
- High contrast mode support
```

### Focus Indicators
```
Keyboard Focus:
- 2px solid primary color outline
- 2px offset
- Visible on all interactive elements
- High contrast (not disappear)
- Test with Tab key
```

### Touch Targets
```
Minimum Size: 44×44px
- All buttons
- All links
- All interactive areas
- Spacing: 8px minimum between targets
```

### Text Sizing
```
Minimum: 12px (captions only)
    Recommended: 14px+ for body text
- Allow 200% zoom without loss
- Support browser text sizing
- Line height: 1.5+ for readability
```

---

## Implementation Checklist

When building new components or pages:

- [ ] Use DesignTokens for colors, spacing, shadows
- [ ] Apply consistent border-radius (8px default)
- [ ] Use typography scale (don't create custom sizes)
- [ ] Add hover states with 200ms transition
- [ ] Include focus indicators for accessibility
- [ ] Support dark mode
- [ ] Test at 200% zoom
- [ ] Verify color contrast (WCAG AA)
- [ ] Test keyboard navigation
- [ ] Check mobile responsiveness
- [ ] Smooth animations (60 FPS)
- [ ] RTL supported if needed

---

## Resources

- **Figma File**: [Link to design file if available]
- **Component Library**: `/src/components/dashboard/components/`
- **Color Reference**: `DesignTokens.js`
- **Examples**: `EnhancedAdminDashboard.jsx`

---

**Last Updated**: March 21, 2026
**Version**: 1.0
**Status**: Production Ready
