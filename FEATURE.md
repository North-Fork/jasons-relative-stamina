# Feature Notes

This file is a running place to capture feature ideas and implementation notes.

## Duke Reporters' Lab Fact-Check Insights (Enemy Text Source)

### Goal
Replace the current enemy text source pipeline (currently based on `projects.thestar.com`) with data from the Duke Reporters' Lab Fact-Check Insights database.

### Initial Filtering Rules (from discussion)
- `itemReviewed.author.name` is "Donald Trump" (or canonicalized equivalent).
- `itemReviewed.datePublished >= 2025-01-20` (start of term 2).
- Optional lie-only filter:
  - `reviewRating.alternateName in ["False", "Pants on Fire"]`

### Canonicalization Notes
- Normalize author name before match:
  - lowercase
  - trim punctuation
  - collapse whitespace
- Accept aliases such as:
  - `donald trump`
  - `donald j trump`
  - `president donald trump`

### Planned Integration
1. Pull Duke data from API/CSV endpoint (TBD URL).
2. Apply filters above.
3. Transform selected claims to line-based plain text.
4. Write to `data/ABDBody.txt`.
5. Sync local fallback in `data/stamina_local_data.js`.

### Open Items
- Confirm Duke endpoint/export URL.
- Confirm output strategy for enemy text:
  - first claim per topic
  - latest N claims
  - all filtered claims
- Confirm refresh cadence:
  - manual update only
  - or scripted periodic refresh

## Enemy Lasers Stream Cadence (Spacing Consistency)

### Current Challenge
Enemy lasers sometimes appear unevenly spaced (some bunch together, some spread apart), even when spawn delay is configured.

### Likely Cause
- Spawn timing uses `setTimeout` cadence.
- Enemy movement advances per frame step, not elapsed time.
- Frame-rate variation and/or max-enemy caps introduce visible cadence jitter.

### Follow-up Direction
- Move enemy motion to time-based updates (delta-time) so travel distance is tied to elapsed milliseconds.
- Keep spawn cadence and movement on compatible timing assumptions.
- Re-check spacing under both desktop and mobile performance conditions.

## Session Notes (2026-03-03 / 2026-03-04)

### Current Baseline
- Assets directory was renamed from `Jasons_Relative_Stamina_files` to `data`.
- Enemy text source (`data/ABDBody.txt`) is now implemented as **Enemy lasers** stream behavior:
  - words in the same sentence stay in the same lane
  - lane changes occur at sentence boundaries
  - stream cadence is currently controlled by spawn delay only
- Current enemy spawn delay function:
  - `getEnemySpawnDelay() = enemyInterval * 0.6`
- Mobile compatibility updates:
  - mobile context detection mode added
  - touch interaction on canvas added (touch drag/shoot)
  - canvas uses `touch-action: none`
- Cache-busting URL behavior:
  - `index.html` auto-appends `?v=1` if missing

### Tagged Baseline
- Git tag created and pushed:
  - `V.01-Functioning-Original-Enemy-Drops`
  - points to commit `5884075`

### Next Session Plan (Requested)
1. Change Enemy lasers trajectory:
   - add slight arc
   - angle descent toward bottom (not purely vertical)
2. Run all three Enemy laser lanes simultaneously:
   - each lane should be active at the same time
   - each lane should feed from different lines in `politician/institutional_corruption_phrases`
   - avoid the current sequential sentence-lane behavior
3. Preserve mobile usability and desktop performance while implementing the above.

---

## Feature Template

### Feature
Short title.

### Goal
What user-visible behavior should change.

### Requirements
- Requirement 1
- Requirement 2

### Constraints
- Technical/UX/data constraints.

### Files Likely Affected
- `path/to/file`

### Validation
- Manual checks
- Automated checks

### Notes
Freeform notes and links.
