---
name: ui-ux-pro-max
description: UI and UX design guidance for websites, dashboards, product surfaces, and marketing pages. Use when Codex needs to design or improve layout, hierarchy, spacing, typography, color usage, responsive behavior, interaction states, accessibility, or polish in React, Next.js, Tailwind, or general frontend work.
---

# UI/UX Pro Max

Use this skill to turn vague design requests into clear interface decisions without drifting into generic or low-quality UI.

## Use Bundled Tools

- Run `python scripts/search.py "<query>" --design-system -p "<project>"` to generate a quick design-system recommendation from the bundled CSV data.
- Run `python scripts/search.py "<query>" --domain <domain>` for focused searches across `style`, `color`, `landing`, `product`, `ux`, `typography`, `chart`, `prompt`, or `icons`.
- Run `python scripts/search.py "<query>" --stack <stack>` for implementation guidance tailored to `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, or `shadcn`.
- If Python is unavailable, read the relevant files under `data/` directly and apply the same workflow manually.

## Start Here

- Identify the surface first: marketing page, dashboard, form flow, settings screen, blog, portfolio, or mobile-style component.
- Identify the goal: conversion, clarity, trust, speed, readability, exploration, or operational efficiency.
- Match the visual direction to the product and audience instead of reusing the same layout pattern everywhere.
- Prefer a small number of strong decisions over many decorative ones.

## Core Workflow

1. Define the page purpose and primary action.
2. Define the visual density: calm, editorial, data-dense, premium, playful, or utilitarian.
3. Build hierarchy with layout, spacing, scale, and contrast before adding decorative effects.
4. Make responsive behavior intentional, not compressed desktop UI.
5. Check accessibility, interaction feedback, and empty/loading/error states before shipping.

## Design Rules

### Layout

- Give every section one job.
- Alternate dense and airy sections to control scroll rhythm.
- Use consistent container widths and spacing steps.
- Avoid unnecessary nested cards and boxed layouts.
- Prefer alignment and grouping to extra borders.

### Typography

- Use a clear heading/body relationship.
- Keep body text readable with comfortable line height.
- Limit line length for long-form reading.
- Use large type sparingly for emphasis, not everywhere.

### Color And Surfaces

- Use semantic tokens for background, foreground, accent, muted, border, and surface roles.
- Keep contrast strong enough for readable text and visible controls.
- Use accent color to guide attention, not to decorate everything.
- Avoid off-brand color additions unless the user explicitly asks for a brand refresh.

### Interaction

- Make interactive elements visibly interactive.
- Keep hover, focus, active, loading, and disabled states distinct.
- Avoid hover effects that shift layout or reduce readability.
- Use motion to reinforce structure, not as filler.

### Responsive Behavior

- Redesign stacking and spacing for mobile instead of shrinking desktop compositions.
- Protect reading order, CTA visibility, and form usability on small screens.
- Avoid horizontal scroll unless the content explicitly requires it.

### Accessibility

- Preserve visible focus states.
- Use semantic HTML before ARIA.
- Ensure icon-only actions have accessible names.
- Never rely on color alone to communicate state.
- Keep touch targets comfortably large.

## Product-Specific Guidance

### Marketing Pages

- Lead with message clarity and one strong CTA.
- Use editorial flow, proof, outcomes, and a decisive closing section.
- Keep supporting sections distinct so they do not repeat the same promise.

### Dashboards And Admin UI

- Prioritize information hierarchy and scan speed.
- Use spacing and type scale to separate summary, detail, and action layers.
- Keep filters, tables, and charts visually stable during loading and refresh.

### Forms

- Group fields by user intent.
- Put help text and errors close to the field.
- Keep submission states obvious and reassuring.

## Frontend Implementation Guidance

- In React and Next.js, keep presentation components small and composable.
- In Tailwind, prefer reusable semantic patterns over long one-off utility blobs repeated everywhere.
- Push styling consistency into shared primitives when the same patterns repeat.
- If a screen needs complex polish, define the layout and state model first, then apply visual treatment.

## Bundled Data Map

- Read `data/products.csv` when choosing patterns by product type.
- Read `data/styles.csv`, `data/colors.csv`, and `data/typography.csv` when defining the visual system.
- Read `data/landing.csv` when structuring marketing pages and CTA flow.
- Read `data/ux-guidelines.csv` when reviewing accessibility, interaction, and polish.
- Read `data/stacks/*.csv` when translating design direction into framework-specific implementation choices.

## Review Checklist

- Is the primary action obvious within a few seconds?
- Does the page feel intentionally structured rather than template-generated?
- Are spacing, type, and surface treatments consistent?
- Do mobile and desktop each feel designed?
- Are focus, hover, loading, empty, and error states covered?
- Is the interface accessible enough to use confidently with keyboard and assistive technology?
