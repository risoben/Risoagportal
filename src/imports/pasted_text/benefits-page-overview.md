CREATE/UPDATE BENEFITS PAGE (mit Übersicht + Einzelne Benefits + Mitarbeiter-Zuweisung)

================================================================================
PAGE TITLE & TABS
================================================================================

PAGE TITLE:
- "Benefits Übersicht"
- Font: Roboto Bold 700, 24px, Dark Blue #273A5F

TABS (Top Right):
- [Gesamtübersicht] (default/active)
- [Mitarbeiterübersicht]
- Font: Roboto Medium 500, 14px

Toggle between tabs (content updates accordingly)

================================================================================
SECTION 1: KPI-KARTEN (Overview Stats)
================================================================================

4 Cards in a row (responsive: 2 on tablet, 1 on mobile):

┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Gesamtbudget │  │ Verwendet    │  │ Aktive       │  │ Ø Nutzung/MA │
│              │  │ (YTD)        │  │ Mitarbeiter  │  │              │
│              │  │              │  │              │  │              │
│ € 1.200.000  │  │ € 684.320    │  │ 1.024        │  │ € 668        │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘

CARD STYLING:
- Background: White #FFFFFF
- Border: 1px light gray #E5E7EB
- Padding: 24px
- Border-radius: 8px
- Label (top): Roboto Regular 400, 12px, Gray #6B7280
- Value (big): Roboto Bold 700, 32px, Dark Blue #273A5F
- Shadow: subtle

================================================================================
SECTION 2: BUDGET DONUT + VERWENDUNG CHART (From Probonio Learning)
================================================================================

LAYOUT: 2 columns (left: donut, right: chart)

LEFT COLUMN: BUDGET DONUT CHART
────────────────────────────────

Großes Donut-Chart (400px diameter) mit Riso Primary Blue

Center Label:
- Top: "70% genutzt"
- Bottom: "30% frei"
- Font: Roboto Bold 700, 20px, Primary Blue #0F429F

Legend below Donut:
- € 10.000 Total | € 7.000 Verwendet | € 3.000 Frei
- Font: Roboto Regular 12px, Dark Gray #4B5563

Color Coding:
- Verwendet: Primary Blue #0F429F
- Frei: Light Gray #E5E7EB

RIGHT COLUMN: NUTZUNGSVERLAUF CHART
──────────────────────────────────

Bar Chart (letzte 12 Monate):
- X-Axis: Monatskürzel (Jan, Feb, Mär, Apr, Mai, Jun, Jul, Aug, Sep, Okt, Nov, Dez)
- Y-Axis: Betrag in €
- Bars: Primary Blue #0F429F
- Grid lines: Light gray

Chart Title: "Nutzungsverlauf"
Font: Roboto Regular 12px, Dark Gray #6B7280

Legend: "Benefit-Nutzung (monatlich)"
Description: "Die Grafik zeigt aggregierte Ausgaben über alle Benefit-Kategorien."

================================================================================
SECTION 3: ACTION BUTTONS
================================================================================

[Letzte 12 Monate ▼] - Filter/Dropdown
[Export] - White/outline button
[Bericht öffnen] - Primary Blue button

Spacing: 16px between buttons
Position: Top right above chart

================================================================================
SECTION 4: EINZELNE BENEFITS (Below the charts)
================================================================================

LAYOUT: Grid/Card layout (3 columns on desktop, 2 on tablet, 1 on mobile)

Each Benefit Card:

┌──────────────────────────────────┐
│ Icon [Essenszuschuss] ✅ Aktiv  │
├──────────────────────────────────┤
│                                  │
│ 1.024 Mitarbeiter                │
│ € 5.000 Budget                   │
│ € 3.500 verwendet (70%)          │
│                                  │
├──────────────────────────────────┤
│ [Bearbeiten] [Deaktivieren]      │
│ [Mitarbeiter hinzufügen] ← NEW!  │
└──────────────────────────────────┘

CARD STYLING:
- Background: White #FFFFFF
- Border: 1px light gray #E5E7EB
- Padding: 24px
- Border-radius: 8px
- Box-shadow: subtle

HEADER (Icon + Name + Status):
- Icon: 48px, benefit-specific color (e.g., Essenszuschuss = Gold #FFD700)
- Name: Roboto Bold 700, 16px, Dark Blue #273A5F
- Status Badge: Green ✅ for active, Gray for inactive

METRICS (3 rows):
- "1.024 Mitarbeiter" - Roboto Regular 400, 14px
- "€ 5.000 Budget" - Roboto Regular 400, 14px
- "€ 3.500 verwendet (70%)" - Roboto Regular 400, 14px, Primary Blue #0F429F

BUTTONS (bottom of card):
- [Bearbeiten] - Secondary Blue #246AFF
- [Deaktivieren] - Gray outline
- [Mitarbeiter hinzufügen] ← NEW BUTTON!
  - Color: Green #10B981
  - On click: Opens modal to assign this benefit to specific employees

RESPONSIVE:
- Desktop: 3 columns
- Tablet (1024px): 2 columns
- Mobile: 1 column, full width

================================================================================
MODAL: MITARBEITER ZUM BENEFIT HINZUFÜGEN (NEW!)
================================================================================

Modal Title: "Mitarbeiter hinzufügen — [Benefit Name]"

CONTENT:

Search/Filter Section:
- [Suche nach Mitarbeitername, Nummer]
- [Abteilung: Alle ▼]
- [Status: Alle ▼]

Employee List (Scrollable, max 500px height):
┌────────────────────────────────────┐
│ ☐ Anna Keller (EMP-10234)          │
│ ☐ Jonas Richter (EMP-10081)        │
│ ☐ Lea Hoffmann (EMP-10977)         │
│ ☐ Mert Yilmaz (EMP-10542)          │
│ ☐ Sofia Bauer (EMP-11109)          │
│ ...                                 │
└────────────────────────────────────┘

Checkboxes:
- Allow multi-select
- Selected employees highlighted in light blue #F0F9FF

Quick Actions:
- [Alle auswählen]
- [Keine auswählen]

BOTTOM BUTTONS:
[Hinzufügen] (Primary Blue, disabled if no employees selected)
[Abbrechen] (Gray outline)

API Call on "Hinzufügen":
  POST /api/v1/portal/benefits/{benefit_id}/assign-employees
  Body: { employee_ids: ["emp_001", "emp_002", ...] }
  
  Response: { assigned: X, already_assigned: Y, message: "..." }

================================================================================
RESPONSIVE BEHAVIOR
================================================================================

Desktop (1440px+):
- KPI cards: 4 in row
- Donut + Chart: 2 columns side-by-side
- Benefit cards: 3 columns grid

Tablet (1024px):
- KPI cards: 2 in row
- Donut + Chart: Stack vertically
- Benefit cards: 2 columns

Mobile (< 768px):
- KPI cards: 1 per row
- Donut: Full width, Chart below
- Benefit cards: 1 per row, full width

================================================================================
RISO CI COMPLIANCE
================================================================================

Colors:
- Primary Blue: #0F429F (charts, CTA buttons)
- Secondary Blue: #246AFF (hover, secondary actions)
- Dark Blue: #273A5F (titles, headers)
- Light Blue: #F0F9FF (backgrounds, highlights)
- Success Green: #10B981 (active status, add buttons)
- Gold: #FFD700 (Essenszuschuss icon)
- Warning Orange: #F59E0B (inaktiv status)
- Light Gray: #F9FAFB (card backgrounds)
- Dark Gray: #4B5563 (body text)

Typography:
- Page title: Roboto Bold 700, 24px
- Section title: Roboto Bold 600, 16px
- Labels: Roboto Medium 500, 12px
- Body: Roboto Regular 400, 14px

Spacing: 8px base unit
Button radius: 32px
Border radius: 8px (cards, inputs)

================================================================================
API INTEGRATION
================================================================================

Load Benefits Overview:
  GET /api/v1/portal/benefits/overview
  
  Response:
  {
    "kpis": {
      "total_budget": 1200000,
      "used_ytd": 684320,
      "active_employees": 1024,
      "avg_budget_per_employee": 668
    },
    "budget_chart": {
      "labels": ["Jan", "Feb", ..., "Dec"],
      "data": [54000, 62000, ...],
      "colors": ["#0F429F"] (same blue repeated)
    },
    "usage_percentage": 57,
    "benefits": [
      {
        "id": "essenszuschuss",
        "name": "Essenszuschuss",
        "icon": "🍽️",
        "icon_color": "#FFD700",
        "status": "active",
        "employee_count": 1024,
        "total_budget": 5000,
        "used": 3500,
        "usage_percentage": 70
      },
      ...
    ]
  }

Assign employees to benefit:
  POST /api/v1/portal/benefits/{benefit_id}/assign-employees
  Body: { employee_ids: ["emp_001", "emp_002", ...] }
  
  Response: { assigned: 5, already_assigned: 2, message: "5 Mitarbeiter hinzugefügt. 2 waren bereits zugewiesen." }

Get employees available for benefit assignment:
  GET /api/v1/portal/employees/available?benefit_id={benefit_id}
  
  Response:
  {
    "employees": [
      {
        "id": "emp_001",
        "name": "Anna Keller",
        "employee_number": "EMP-10234",
        "department": "Vertrieb",
        "already_assigned": false
      },
      ...
    ]
  }

================================================================================
FUTURE: MITARBEITERÜBERSICHT TAB
================================================================================

When user clicks "Mitarbeiterübersicht" tab:
- Show same layout but filtered per employee
- Donut shows "Budget für [Employee Name]"
- Benefits cards show only benefits assigned to this employee
- Action: Per benefit → [Bearbeiten Budget] [Entfernen]

(Implementation in next iteration)

================================================================================
