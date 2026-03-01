## DUST Perk Planner

Fallout: New Vegas DUST mod character builder. Two-panel layout with character sheet (SPECIAL + skills) and perk browser.

## Architecture

- Pure vanilla JS, no frameworks. IIFE pattern in app.js.
- `skills.js` - 13 FNV skill definitions with governing SPECIAL stats
- `perks.js` - ~100+ DUST perks with flexible requirements (SPECIAL, skills, sanity, perks, rads)
- `app.js` - Core logic: state management, rendering, filtering, tooltips
- `styles.css` - Desert amber theme (warm dark palette)

## Key Differences from FROST Planner

- FNV has 13 skills (FROST/FO4 has none)
- SPECIAL pool is 40 (7 base of 5 each + 5 distributable), not 28
- Perks every 2 levels (not every level)
- Perks have mixed requirements (not just SPECIAL stat columns)
- No bobbleheads
- Sanity is a key mechanic gating perks

## Environment

- Running in WSL/Git Bash on Windows
- Use Unix commands, not Windows commands
- Use forward slashes `/` in paths
