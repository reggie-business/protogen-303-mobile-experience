# BRIEF.md — Rounds

*A mobile-first check-in tool for a wind-farm field technician on inspection rounds.*

## The one task

Let a technician **check in at a turbine — set status, optionally add a photo + note, submit —
in under 30 seconds, one-handed.** If it needs an "and also," it's two things. It's one.

## The user & context

A field tech walking a row of turbines on daily inspection. Outside, often wearing gloves,
bright sun on the screen, patchy signal, one hand free (the other's on a ladder rail or a tool),
moving from unit to unit. Every design rule below is forced by this context — not style for its
own sake.

## The flow

1. **Route (home).** Today's assigned turbines as a tappable list: which are done, which remain,
   a progress count ("4 of 12 checked"). The next turbine is obvious.
2. **Tap a turbine ->** its check-in screen: turbine ID, last status, three big status choices.
3. **Pick status:** **OK** / **Watch** / **Down**. One tap.
4. **If Watch or Down:** optional photo (camera/upload) + a short note. Skippable -- minimal typing.
5. **Confirm ->** submit. Return to the route; that turbine is marked done; the next is queued.

## Glanceable home

Status of the round at a glance: progress count, remaining turbines, any flagged units surfaced
to the top. Assume a five-second glance in sunlight between tasks.

## Data

Invented/simplified. A small JSON of ~12 turbines: { id, name, lastStatus, lastChecked }.
Check-ins update state in-session (no backend). Realistic IDs (e.g., "T-07"), believable statuses.

## Mobile non-negotiables (these are the graded "does it work")

- **Single column.** Content stacks; never a desktop side-by-side.
- **Thumb reach.** The primary action (Submit / Next) is a large button anchored at the **bottom**,
  where a thumb lands -- never top-right.
- **Big touch targets.** Buttons and list rows >= 44px tall; generous spacing for gloved taps.
- **Minimal typing.** Taps, big selectable status cards, a stepper -- free text only for the note.
- **Glanceable.** 16px+ body, high contrast, status visible instantly.
- **No hover-only behavior.** Touch has no hover; every action is tap-driven.
- **Viewport meta present** so it renders true mobile width.

## Design (grounded in sun + gloves, not a default look)

- **High-contrast LIGHT theme.** Dark mode washes out in direct sunlight; a job-site tool reads
  light. Near-white surface, near-black ink.
- **Status carries the color.** OK #1B8A5A (green), Watch #E8A13C (amber), Down #D64545 (red) --
  used semantically, never decoratively. One calm accent for nav/primary (#0E7C86 teal, or
  Slalom Blue #0C62FB).
- **Signature element:** the status pick -- three big, tactile, full-width cards a gloved thumb
  can't miss. That's the moment the whole app exists for; spend the polish there, keep the rest quiet.
- **Type:** large and legible; a clean sans, generous weight on the status labels.

## Tech

Vue 3 + Vuetify 3 + Vite + TypeScript + Vue Router (a task flow = a few routed screens).
No Pinia/testing/jsx/eslint/prettier. Deploy on Vercel with a vercel.json SPA rewrite so deep-link
refreshes don't 404.

## Rubric map

- **Does it work?** Live, mobile-first, the check-in flow runs end to end on a phone.
- **Repo right?** BRIEF.md + /docs + README + LICENSE in root; staged, descriptive commits.
- **Looks right / shows thinking?** Design fits the field-service context and mobile constraints;
  the BRIEF's task matches what got built. Go-further: empty/edge states, works across sizes.