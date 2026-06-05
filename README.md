# RBT Roofing — Project Portfolio Dashboard (V1)

A premium, state-of-the-art project portfolio dashboard for a commercial roofing
contractor. Opens directly in Chrome — **no server or install required.**

## Open it

```
open "/Users/andy/Desktop/roofingdashboard/index.html"
```

(Double-click `index.html` also works. Internet connection recommended — the Job
Map uses CARTO map tiles and the UI uses the Inter web font. Everything else,
including all charts, works fully offline.)

## What's inside

Seven views, all driven by one dataset (the modern "one dataset, many views"
pattern used by Procore / Fieldwire / Roofr):

| View | What it shows |
|------|---------------|
| **Overview** | 4 KPI cards w/ sparklines, status donut, "Needs Attention" feed, value-by-region & roof-system mix, active-project health table |
| **Projects** | Sortable / filterable register of all 81 projects with status, progress bars, value, PM, timeline. Click any row → detail drawer |
| **Production Board** | Kanban of every job by stage (Pre-Con → In Progress → Demobilized → Postponed → Close Out) |
| **Job Map** | Geographic map of all job sites, color-coded by status, sized by contract value |
| **Schedule** | Gantt timeline of active & upcoming work with crew counts and a TODAY line |
| **Crews & Teams** | Workload leaderboards for project managers, field supervisors, and subcontractors |
| **Cost Control** | Phase-code job cost report per project (pick a job): Original/Revised/Adjusted budget · To-Date Actual/Earned/Gain-Loss · Projected Cost-to-Complete/Cost-at-Completion/Gain-Loss · Unit costs · % complete, grouped by division with subtotals and a job total. Subcontract lines show the awarded vendor + buyout status. |
| **Contract Buyout** | Subcontractor/vendor commitments across the portfolio — scope, unit price, committed value, and Bought-Out / Pending / Open status |
| **Financials** | Contract value, cost-to-date, backlog, weighted margin, cost-vs-budget bullet charts, WIP over/under billing, retainage, change orders |

Project locations are geocoded to real city coordinates (matched from the site
address), so jobs land on the correct city on the map — not a state centroid.

Click any project row, Kanban card, map pin, or Gantt bar to open a full project
**detail drawer** (progress, budget, scope, team).

## Importing your own data

Click **Import** (top bar) to load projects from a CSV:
- Drag-and-drop or browse to a `.csv` file
- Click **Download template** to get the exact column format
- Headers are matched flexibly (e.g. "Contract", "Contract Value", "Amount" all map)
- Any missing financial/date fields are auto-filled so every view stays populated
- Imported data loads for the current session; to make it permanent, replace
  `data.js` (or ask Claude to wire it in)

To import from Excel: open your spreadsheet, **File → Save As → CSV**, then upload.

## Design — built by a 10-lens design panel

The visual system was defined by a 10-perspective design review (brand/color, UX
architecture, data-viz, typography, an anti-"AI-aesthetic" critic, a roofing
operations director, motion, iconography, executive trust, and finishing/QA),
then consolidated into one spec and implemented.

Brand-matched to **rbtroofing.com**:
- **Navy `#031b52`** (exact, from RBT's official logo) as the workhorse color
- **White** surfaces + a single surgical **red `#c8102e`** = "needs action" only
- Real RBT logo (navy + white SVGs) in the sidebar, drawer, and print header
- **Inter** for UI/data + **Saira Condensed** for display numbers (blueprint feel)
- Real **Lucide** iconography at a consistent 1.75 stroke
- Hairline borders over soft shadows, tight 6/8/10px radii, tabular numerics
- Restrained motion: KPI count-ups, chart draw-ins, gantt bar reveal, drawer stagger

Roofing-credibility metrics added: **$/sq ft**, **roof squares**, **retainage held**,
**change orders**, **WIP over/under billing**, **crew load by supervisor**, and a
**$-at-risk triage** in Needs Attention.

## Data provenance — please read

The **real** data comes from your file
`~/Downloads/RBT Current Projects as of May 29 2026.xlsx` (81 projects). That file
contains **genuine**: project ID, name, status, site address, roof system, project
manager, field supervisor, and roofing subcontractor.

The spreadsheet did **not** contain budgets, % complete, dates, crew sizes, roof
area, or billing. To demonstrate the full dashboard, those fields are
**simulated** — generated deterministically from each project (so they're stable
and internally consistent, but they are *not* your actual financials):

> contract value · cost-to-date · % complete · margin · change orders · crew size ·
> roof area · start/end dates · billed-vs-earned · map coordinates (state-level)

When you're ready to wire in real numbers, replace the synthesized fields in
`generator.py` (or just hand me a richer export) and rebuild `data.js`.

## Files

```
index.html      UI shell + all styling
app.js          all views, charts (hand-built SVG), map, drawer logic
data.js         the 81 projects (real + simulated fields), inlined so it runs on file://
projects.json   same data as JSON
rbt_raw.json    the raw real data extracted from your spreadsheet
```

## Rebuilding the data

Real fields are extracted from the xlsx and simulated fields are layered on by the
Python used during the build. To refresh from a new spreadsheet, re-run the
extraction + enrichment and regenerate `data.js`.
