# DESIGN.md — UKK TKJ Paket 2 Documentation (Mintlify + Supabase Style)

## 1. Visual Theme & Atmosphere
- **Mood:** Technical, authoritative, terminal-native, reading-optimized documentation.
- **Density:** Balanced whitespace for step-by-step hardware/network configuration guides.
- **Philosophy:** Code-first and screenshot-clarity first. Zero marketing fluff, zero hero banners, zero neon AI gradients.

## 2. Color Palette & Roles
- **Canvas Primary (`--bg-primary`):** `#0B0F17` (Deep Void Slate - main reading surface)
- **Surface / Sidebar (`--bg-secondary`):** `#111827` (Dark Gray Slate - navigation & step cards)
- **Code Block Surface (`--bg-code`):** `#030712` (Pure Terminal Black)
- **Text Primary (`--text-primary`):** `#F9FAFB` (Crisp White for headings and body)
- **Text Muted (`--text-muted`):** `#9CA3AF` (Neutral Gray for image captions and metadata)
- **Brand Accent (`--accent`):** `#10B981` (Mintlify/Supabase Emerald Green for active nav, step badges, and highlights)
- **Border Token (`--border`):** `#1F2937` (Subtle structural hairlines)

## 3. Typography Rules
- **Sans Font (`--font-sans`):** `'Inter'`, `-apple-system`, `system-ui`, `sans-serif`
- **Mono Font (`--font-mono`):** `'JetBrains Mono'`, `'Fira Code'`, `monospace`
- **Hierarchy:**
  - `H1` (Page Title): `1.875rem` (30px), `font-weight: 700`, `letter-spacing: -0.025em`
  - `H2` (Bagian 1–7): `1.5rem` (24px), `font-weight: 600`, bottom border `1px solid var(--border)`, `padding-bottom: 0.5rem`
  - `H3` (Sub-bagian): `1.125rem` (18px), `font-weight: 600`, color `var(--accent)`
  - `Body`: `1rem` (16px), `line-height: 1.65`, max reading width `840px`

## 4. Component Stylings
- **Step Badge:** Pill-shaped badge (`background: rgba(16, 185, 129, 0.15)`, `color: #10B981`, `border: 1px solid rgba(16, 185, 129, 0.3)`, `font-family: var(--font-mono)`, `font-size: 0.75rem`).
- **Terminal Code Block:**
  - Header bar with language badge (`bash`, `sql`, `php`) on the left and a **`Copy`** button on the right.
  - Clicking `Copy` copies content and changes label to `Copied!` in `#10B981` for 2 seconds.
- **Screenshot Frame (`figure` & `img`) — Adaptive Aspect Ratio (MANDATORY):**
  - Container `figure`: `background: #030712`, `border: 1px solid var(--border)`, `border-radius: 8px`, `padding: 12px`, `display: flex`, `flex-direction: column`, `align-items: center`.
  - Image rule (prevents stretching thin CLI crops or oversized portrait phone photos):
    ```css
    figure img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 420px;
      object-fit: contain;
      border-radius: 4px;
      cursor: zoom-in;
    }
    ```
  - **Lightbox Modal:** Clicking any screenshot opens a full-viewport dark overlay (`max-width: 95vw; max-height: 92vh`) and closes on click or `Esc`. Use `loading="lazy"` on all images.

## 5. Layout Principles
- **Two-Column Docs Layout (`>= 1024px`):** Fixed left sidebar (`280px` width) listing Bagian 1 to Bagian 7 with scroll-spy active state; scrollable main content area on the right (`padding: 2.5rem 3.5rem`).
- **Spacing Scale:** `1.75rem` vertical gap between numbered steps; `3rem` gap between major sections.

## 6. Depth & Elevation
- Rely on crisp `1px solid var(--border)` structural borders rather than heavy drop shadows.

## 7. Do's and Don'ts
- **DO** start immediately with the technical title, topology summary table, and Bagian 1.
- **DO** keep all CLI commands inside copyable `<pre><code>` blocks at the exact positions defined in `mapping.md`.
- **DON'T** generate marketing landing pages, hero sections, testimonials, or decorative emojis.
- **DON'T** force `width: 100%` on `<img>` tags.

## 8. Responsive Behavior
- Below `1024px`, collapse the left sidebar into an off-canvas slide-out drawer triggered by a top-left menu button.

## 9. Agent Prompt Guide
- Follow this `DESIGN.md` strictly alongside `mapping.md` using vanilla HTML, CSS, and minimal JS.