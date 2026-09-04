# Bulk Working Page Overrides

> **PROJECT:** GRIMOIRE
> **Generated:** 2026-09-04 11:08:57
> **Page Type:** Product Detail

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1200px (standard)
- **Layout:** Full-width sections, centered content
- **Sections:** 1. Prompt/Input Hero, 2. Generated Result Preview, 3. How it Works, 4. Value Prop

### Spacing Overrides

- No overrides — use Master spacing

### Typography Overrides

- No overrides — use Master typography

### Color Overrides

- **Strategy:** Adaptive to user input. Dark mode for compute feel. Neon accents.

### Component Overrides

- Avoid: Single row actions only
- Avoid: Icon buttons without labels
- Avoid: Keyboard traps or illogical tab order

---

## Page-Specific Components

- No unique components for this page

---

## Recommendations

- Effects: Expo.out Bezier(0.16,1,0.3,1) easing; spring modals (damping:20 stiffness:90); haptic-linked press (Impact Light/Medium); animated ambient light blobs (Reanimated translateX/Y slow oscillation); BlurView glassmorphism headers/nav (intensity 20); scale press 0.97 → 1.0; avoid pure #000000 (OLED smear)
- Data Entry: Allow multi-select and bulk edit
- Accessibility: Add aria-label for icon-only buttons
- Accessibility: Tab order matches visual order
- CTA Placement: Input Field (Hero) + 'Try it' Buttons
