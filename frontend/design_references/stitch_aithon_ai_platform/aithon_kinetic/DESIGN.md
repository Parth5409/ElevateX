# Design System Specification: The Kinetic Intelligence Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Neon Curator"**

This design system is built to bridge the gap between high-stakes enterprise management and the cutting-edge fluidity of Artificial Intelligence. We are moving away from the "standard SaaS dashboard" (flat, gray, boxed-in) and toward a **High-End Editorial** experience. 

The aesthetic is characterized by **Organic Brutalism**—the structure is rigorous and professional, but the execution is ethereal. By utilizing intentional asymmetry, overlapping glass surfaces, and high-contrast typography, we create an environment that feels less like a database and more like a curated intelligence suite. We don't just display data; we stage it.

---

## 2. Colors & Surface Philosophy
The palette utilizes a sophisticated mix of deep obsidian tones, warmth, and high-energy accents.

### Color Roles (Material Design Mapping)
*   **Primary (`#ffb4a1` / `#fa5b31`):** Used for critical calls to action and momentum-driven elements.
*   **Secondary (`#cfc5ba`):** The "Human" element. Used for grounding the UI with organic, stone-like neutrals.
*   **Tertiary (`#c2c7cb`):** Reserved for utility and supporting data visualizations.
*   **Background (`#141311`):** A deep, rich "Ink" that provides the canvas for glass effects.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Traditional borders create visual noise and "trap" the eye. Instead:
*   **Tonal Definition:** Use background shifts (e.g., a `surface-container-low` card nested within a `surface` background).
*   **Negative Space:** Use generous whitespace (24px, 32px, or 48px) to imply boundaries.

### The Glass & Gradient Rule
To achieve the premium AI aesthetic, all cards and floating panels must use **Glassmorphism**:
*   **Surface:** `surface-container` at 60-80% opacity.
*   **Effect:** `backdrop-blur: 24px`.
*   **AI Glow:** For AI-specific features, use a `1px` inner stroke of `tertiary` at 15% opacity and a subtle outer glow using the primary container color to simulate "Neon Teal" energy through the prism of our warm palette.

---

## 3. Typography
We utilize a bold, editorial hierarchy to ensure the platform feels authoritative yet modern.

*   **Display & Headline (Inter):** High-impact, heavy weights (Bold/Extra Bold). These should feel like magazine headlines—tight letter spacing (-2%) and large scales (`display-lg` at 3.5rem).
*   **Title & Body (Inter):** Designed for maximum readability. Titles use Medium weight to provide a clear anchor, while Body text remains at `body-md` (0.875rem) for density without clutter.
*   **The Contrast Rule:** Pair a very large `display-md` headline with a very small, uppercase `label-md` for a sophisticated, "asymmetric" layout that breaks the monotony of standard text blocks.

---

## 4. Elevation & Depth: Tonal Layering
In this design system, depth is a physical property, not a visual trick.

*   **The Layering Principle:** 
    *   **Base:** `surface` (#141311)
    *   **Sectioning:** `surface-container-low` (#1c1b19)
    *   **Interactive Cards:** `surface-container` (#21201c)
    *   **Floating Modals:** `surface-container-highest` (#363531)
*   **Ambient Shadows:** Use shadows only for "High Float" elements (Modals, Tooltips). 
    *   *Shadow Config:* `Y: 20px, Blur: 40px, Color: rgba(0, 0, 0, 0.4)`. No hard edges.
*   **Ghost Borders:** If a boundary is strictly required for accessibility, use `outline-variant` at **15% opacity**. This creates a "suggestion" of a line rather than a hard barrier.

---

## 5. Components

### Buttons
*   **Primary:** Fill using `primary_container` (#fa5b31). High-contrast white text. 12px rounded corners. Use a subtle linear gradient (Top: +10% brightness) to give it "soul."
*   **Secondary:** Ghost style. No fill, `ghost-border` (15% opacity `outline`), and `on-surface` text.
*   **States:** Hover states should involve a "lift" (slight scale up 1.02x) and an increase in backdrop-blur rather than just a color change.

### Input Fields
*   **Style:** Minimalist. No bottom line or full border. Use `surface-container-low` as a subtle background fill.
*   **Focus:** Transition the background to `surface-container-high` and add the "AI Glow" (1px soft primary-tinted outer glow).

### Cards & Lists
*   **Anti-Pattern:** Never use divider lines.
*   **Correct Pattern:** Separate list items with `8px` of vertical space or a `2%` shift in background lightness between alternating items. 
*   **Edge Radius:** Strictly `12px` (`md`) for standard cards; `1rem` (`lg`) for major hero containers.

### AI Activity Chips
*   **Visual:** Small, semi-transparent capsules using `primary` at 10% fill and `primary` 100% text.
*   **Purpose:** To tag AI-generated insights, placement matches, or automated training paths.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Align a small label to the far right while the headline stays left. 
*   **Use Generous Whitespace:** If it feels like "too much" space, it's likely just enough for this system.
*   **Layer with Purpose:** Think of the UI as a stack of physical materials.
*   **Color as Information:** Use the vibrant `primary_container` (#fa5b31) strictly for action and focus.

### Don't:
*   **Don't use pure black (#000000):** It kills the glassmorphism effect. Always use the specified `surface` colors.
*   **Don't use 1px solid borders:** They look cheap and "templated."
*   **Don't crowd the content:** This platform manages careers and training; it needs breathing room to reduce cognitive load.
*   **Don't use standard drop shadows:** Use the Ambient Shadow config to maintain the premium, soft aesthetic.