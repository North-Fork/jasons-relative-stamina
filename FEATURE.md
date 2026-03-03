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

