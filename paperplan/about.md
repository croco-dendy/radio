# Project Planning Methodology

A comprehensive guide to the planning system used for managing complex refactoring and feature development projects.

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Folder Structure](#folder-structure)
3. [Plan Naming Convention](#plan-naming-convention)
4. [Plan Document Structure](#plan-document-structure)
5. [Implementation Workflow](#implementation-workflow)
6. [Status Tracking](#status-tracking)
7. [Dependencies Between Plans](#dependencies-between-plans)
8. [Time Estimation](#time-estimation)
9. [Documentation Files](#documentation-files)

---

## Philosophy

### Why Plan?

Complex projects fail not from lack of skill, but from:
- **Context loss** — forgetting why decisions were made
- **Scope creep** — uncontrolled growth of work
- **Dependency confusion** — unclear what must happen first
- **Progress blindness** — not knowing what's done vs. remaining

### Core Principles

1. **One Plan = One Goal** — Each plan addresses a single, coherent objective
2. **Sequential Numbers** — Plans are ordered by execution priority
3. **Dependency Graph** — Later plans can depend on earlier ones
4. **Immutable History** — Completed plans document what was done
5. **Living Document** — Pending plans can evolve as requirements change

---

## Folder Structure

```
plan/
├── plans.md              # Index of all plans with status
├── log.md       # History of completed work
├── ideas.md                   # Raw ideas and notes
└── XXX-DESCRIPTIVE_NAME_PLAN.md     # Individual plan files
```

## Plan Naming Convention

### Format

```
XXX-DESCRIPTIVE_NAME_PLAN.md
```

### Components

| Component | Description | Example |
|-----------|-------------|---------|
| `XXX` | Zero-padded sequence number (001-999) | `008`, `042` |
| `DESCRIPTIVE_NAME` | Upper snake case describing the goal | `CODE_STYLE_AUDIT` |
| `PLAN` | Suffix indicating this is a plan document | Always `PLAN` |
| `.md` | Markdown format for readability | `.md` |

### Examples

```
001-REFACTORING_PLAN.md
002-RESTRUCTURING_PLAN.md
008-CODE_STYLE_AUDIT_PLAN.md
009-TAILWIND_MIGRATION_PLAN.md
010-ENVIRONMENT_PROXY_PLAN.md
```

### Why This Format?

1. **Numeric prefix** — Natural sorting in file explorers
2. **Descriptive name** — Quick understanding without opening
3. **Upper snake case** — Visible, consistent, works in URLs
4. `_PLAN` suffix** — Clear file type identification

---

## Plan Document Structure

Every plan document follows this standard template:

```markdown
# Plan XXX: Descriptive Title

## Goal

One-sentence description of what this plan achieves.

**Status: PENDING | IN_PROGRESS | COMPLETED**

---

## Current State

### What's Already Done
- ✅ Completed prerequisite work
- ✅ Previous plan results

### What Needs to Change
- Problem being solved
- Current limitations
- Technical debt being addressed

---

## Target State

### Key Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Architecture | Option A | Why not B |
| Tool | Tool X | Requirements match |

### Expected Outcome
- Concrete deliverable 1
- Concrete deliverable 2
- Success criteria

---

## Implementation Phases

### Phase 1: Phase Name

**Objective:** What this phase accomplishes

**Tasks:**

**Task 1.1: Task Name**
**File:** `path/to/file.ts`

Description of what to do.

```typescript
// Example code or pseudocode showing the approach
```

**Task 1.2: Next Task**
...

---

### Phase 2: Next Phase
...

---

## Files Summary

### New Files
| File | Purpose |
|------|---------|
| `path/to/new-file.ts` | What it does |

### Modified Files
| File | Changes |
|------|---------|
| `path/to/existing.ts` | What changes |

### Deleted Files
| File | Reason |
|------|--------|
| `old-file.ts` | Consolidated into X |

---

## Estimated Effort

| Phase | Complexity | Estimate |
|-------|------------|----------|
| 1. Name | Low/Medium/High | X hours |
| 2. Name | Low/Medium/High | X hours |

**Total: ~X hours**

---

## Progress Summary

| Date | Phase | Status | Notes |
|------|-------|--------|-------|
| YYYY-MM-DD | Phase 1 | ⏳ Pending | |
| YYYY-MM-DD | Phase 2 | ✅ Completed | Blocker resolved |

---

## Notes

- Important context
- Decisions made during planning
- Risks or concerns
- Dependencies on other plans
```

---

## Implementation Workflow

### Step 1: Create Plan Document

When a new need is identified:

1. Determine the next sequence number
2. Create `XXX-DESCRIPTIVE_NAME_PLAN.md`
3. Fill in goal, current state, target state
4. Break into phases and tasks
5. Estimate effort

### Step 2: Update PLAN_README.md

Add the new plan to the index:

```markdown
| Plan | Status | Description |
|------|--------|-------------|
| [XXX-NAME_PLAN.md](./XXX-NAME_PLAN.md) | ⏳ Pending | Brief description |
```

### Step 3: Implementation

When starting work:

1. Change status to **IN_PROGRESS**
2. Update `PLAN_README.md` status
3. Work through phases sequentially
4. Update progress in plan's Progress Summary table

### Step 4: Completion

When finished:

1. Change status to **COMPLETED**
2. Update `PLAN_README.md` status
3. Move details to `IMPLEMENTATION_LOG.md`
4. Update `IMPLEMENTATION_SUMMARY.md` (if it was there)
5. Archive any obsolete information

---

## Status Tracking

### Status Values

| Status | Icon | Meaning |
|--------|------|---------|
| Pending | ⏳ | Not started, waiting |
| In Progress | 🔄 | Currently being worked |
| Completed | ✅ | Done, verified, merged |
| Cancelled | ❌ | Will not be done |
| Blocked | 🚫 | Cannot proceed (add reason) |

### Where to Update Status

1. **PLAN_README.md** — Master index (always current)
2. **Individual plan file** — Status line at top
3. **IMPLEMENTATION_SUMMARY.md** — If plan is pending
4. **IMPLEMENTATION_LOG.md** — When completed

---

## Dependencies Between Plans

### Visual Dependency Graph

```
Plan 001: Foundation
    ↓
Plan 002: Structure
    ↓
Plan 003: Features
    ↓
Plan 004: Polish
```

### Documenting Dependencies

In each plan's **Notes** section:

```markdown
## Notes

- **Must complete Plan X first** — Reason why
- Blocks Plan Y — This must finish before Y starts
- Independent — Can be done in parallel with others
```

### Complex Dependencies

For projects with multiple tracks:

```
Track A: Infrastructure
    Plan 001 → Plan 002 → Plan 003

Track B: Features
    Plan 004 → Plan 005 → Plan 006

Cross-Dependency:
    Plan 003 (Infrastructure) must complete before
    Plan 005 (Feature) starts
```

---

## Time Estimation

### Estimation Levels

| Level | Accuracy | Use For |
|-------|----------|---------|
| Rough | ±50% | Initial planning, feasibility |
| Refinement | ±25% | After task breakdown |
| Confident | ±10% | After spike/prototype |

### Estimation Table Template

```markdown
| Phase | Complexity | Estimate | Uncertainty |
|-------|------------|----------|-------------|
| 1. Setup | Low | 30 min | Low |
| 2. Core | Medium | 3 hours | Medium |
| 3. Polish | Low | 1 hour | Low |

**Total: ~4.5 hours** (±1 hour)
```

### Complexity Definitions

| Complexity | Characteristics | Typical Time |
|------------|-----------------|--------------|
| Low | Well-understood, no new patterns | 15-60 min |
| Medium | Some unknowns, minor decisions | 1-4 hours |
| High | Significant unknowns, architecture decisions | 4+ hours |

### Estimation Factors

Multiply base estimate by:
- **New technology** ×1.5
- **Integration with external systems** ×2.0
- **Refactoring existing code** ×1.3
- **No tests exist** ×1.4
- **Urgent deadline** ÷1.2 (rushing adds risk)

---

## Documentation Files

### PLAN_README.md

The dashboard. Keep it concise:

```markdown
# Project Plans

| Plan | Status | Description |
|------|--------|-------------|
| [001-...](./001-...) | ✅ Completed | What it did |
| [002-...](./002-...) | ⏳ Pending | What it will do |

## Current Focus

Plan 002: Description

## Upcoming

1. Plan 003
2. Plan 004
```

### IMPLEMENTATION_SUMMARY.md

For pending multi-plan work:

```markdown
# Implementation Summary

## Overview

Brief description of the initiative.

```
Plan X: Foundation
    ↓
Plan Y: Migration
    ↓
Plan Z: Feature
```

## Plan X: Title

**Goal:** What it does

**Key Points:**
- Important decision 1
- Important decision 2

**Phases:**
1. Phase 1 (30 min)
2. Phase 2 (2 hours)

**Estimated Time:** X hours
```

### IMPLEMENTATION_LOG.md

Chronological history of completed work:

```markdown
# Implementation Log

## Completed: Plan Title

Date: YYYY-MM-DD

### Phase 1: Name

- [x] Task completed
- [x] Another task done

### Files Created

- `path/to/file.ts` - Purpose

### Files Modified

- `path/to/file.ts` - What changed

---

## Completed: Next Plan

...
```

---

## Best Practices

### Do

✅ Write plans before starting complex work  
✅ Break plans into small, verifiable phases  
✅ Update status immediately when things change  
✅ Document decisions and their rationale  
✅ Include code examples in task descriptions  
✅ Estimate conservatively — complexity hides  
✅ Review completed plans to improve estimation  

### Don't

❌ Skip planning for "simple" changes (they rarely are)  
❌ Have plans depend on plans that aren't completed  
❌ Delete completed plans (they're your history)  
❌ Let plans grow beyond ~500 lines (split them)  
❌ Forget to update status in all locations  
❌ Commit implementation without updating the log  

---

## Example: Complete Lifecycle

### Day 1: Planning

```bash
# Create plan document
touch plan/005-STYLE_REFACTORING_PLAN.md
# Fill in template...

# Update index
vim plan/PLAN_README.md
# Add: | [005-...](...) | ⏳ Pending | ... |
```

### Day 5: Starting Work

```markdown
<!-- In plan/005-... -->
**Status: IN_PROGRESS**

## Progress Summary

| Date | Phase | Status | Notes |
|------|-------|--------|-------|
| 2026-04-05 | Phase 1 | 🔄 In Progress | |
```

### Day 7: Completed

```markdown
<!-- In plan/PLAN_README.md -->
| Plan | Status | Description |
|------|--------|-------------|
| 005-... | ✅ Completed | ... |
```

```markdown
<!-- In plan/IMPLEMENTATION_LOG.md -->
## Completed: Style Refactoring

Date: 2026-04-07

### Phase 1: Arrow Functions

- [x] Converted all functions in src/handlers
- [x] Verified with typecheck

### Files Modified

- `src/handlers/*.ts` - Converted to arrow functions
```

---

## Adapting for Other Projects

This methodology works for:

- **Software development** — Refactoring, migrations, features
- **Infrastructure** — Server setup, CI/CD, monitoring
- **Documentation** — Writing, organizing, translating
- **Research** — Experiments, prototypes, evaluations

### Minimal Setup

For smaller projects, you only need:

1. One `PLAN.md` file with the template
2. Status tracking (Pending → In Progress → Completed)
3. Progress updates as you work

## Summary

This planning system provides:

1. **Clarity** — Everyone knows what's happening and why
2. **Traceability** — History of decisions and changes
3. **Predictability** — Better estimates through tracking
4. **Coordination** — Clear dependencies and priorities
5. **Completion** — Satisfying checkboxes and documented success

Start small. One plan file. Expand as needed.

---

*Document Version: 1.0*  
*Last Updated: 2026-04-06*
