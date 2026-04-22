CREATE MASS IMPORT PAGE FOR AG-PORTAL (RISO-899)

================================================================================
NAVIGATION & MENU
================================================================================

1. Add "Massenimport" menu item to sidebar:
   - Position: Between "Mitarbeiter" and "Berichte"
   - Icon: 📤 (upload icon)
   - Route: /mass-import
   - Text: "Massenimport"
   - Color: Primary Blue #0F429F on hover

================================================================================
PAGE STRUCTURE (Based on Mockups)
================================================================================

PAGE TITLE:
- "Massenimport"
- Font: Roboto Bold 24px, Dark Blue #273A5F

BUTTONS (Top Right):
- [Vorlage herunterladen] - Secondary/Outline button (white bg, blue border)
- [Import starten] - Primary Blue button (#0F429F)

================================================================================
SECTION 1: DATEN HOCHLADEN (Upload Area)
================================================================================

Section Title: "Daten hochladen"
Font: Roboto Bold 16px, Dark Blue #273A5F

Upload Box:
- Background: Light Blue #F0F9FF
- Border: 2px dashed Primary Blue #0F429F
- Padding: 48px
- Height: ~200px

Upload Icon: 📄 or 📤 (48px)

Main Text: "Datei hier ablegen oder klicken zum Hochladen"
Font: Roboto Regular 16px, Black #000000

Sub Text: "Maximal 10 MB, CSV-Format"
Font: Roboto Regular 12px, Gray #6B7280

File Input: Click to select file

After file selected → show:
- Filename: "employees.csv"
- File size: "245 KB"
- Row count: "25 Zeilen"
- [Ändern] button

================================================================================
SECTION 2: VALIDIERUNGSERGEBNISSE (Results Table)
================================================================================

Section Title: "Validierungsergebnisse"
Font: Roboto Bold 16px, Dark Blue #273A5F

SUMMARY (above table):
- ✅ X Mitarbeiter können importiert werden (Green)
- ❌ X Zeilen haben Fehler (Red)

TABLE STRUCTURE:
┌─────────────────────────────────────────────────────────┐
│ Zeile | Alle | Aktion      | Status                      │
├─────────────────────────────────────────────────────────┤
│ 12    | Keller, Anna    | Neu anlegen | ✅ Erfolgreich │
│ 13    | Meier, Jonas    | Aktualisieren | ✅ Erfolgreich│
│ 21    | Nguyen, Linh    | Neu anlegen | ❌ Fehler       │
│ 22    | Schmidt, Lara   | Aktualisieren | ❌ Fehler     │
│ ...   | ...             | ...         | ...            │
└─────────────────────────────────────────────────────────┘

Table Styling:
- Header: Dark Blue background #273A5F, white text, Roboto Bold 500
- Rows: alternating white / light gray #F9FAFB
- Row height: 48px
- Borders: light gray 1px
- Font: Roboto Regular 14px

Status Badges:
- ✅ Erfolgreich = Green badge #10B981
- ❌ Fehler = Red badge #EF4444

Action Column Options:
- "Neu anlegen" (create)
- "Aktualisieren" (update)

Pagination: [Prev] [1] [2] [Next]

================================================================================
SECTION 3: FEHLERDETAILS (Expandable Error Details)
================================================================================

Section Title: "Fehlerdetails"
Font: Roboto Bold 16px, Dark Blue #273A5F

TABLE STRUCTURE:
┌────────────────────────────────────────────────────────────┐
│ Zeile | Feld          | Problem           | Vorschlag      │
├────────────────────────────────────────────────────────────┤
│ 21    | E-Mail        | Ungültiges Format | Müller: name@firma.de │
│ 21    | Geburtsdatum  | Ungültig (Format) | TT.MM.JJJJ     │
│ 22    | Budget        | Wert zu hoch      | 0–2000         │
└────────────────────────────────────────────────────────────┘

Table Styling:
- Same as Validierungsergebnisse table
- Font: Roboto Regular 12px (smaller)
- Collapsed by default, expandable per error row

================================================================================
BOTTOM ACTION BUTTONS
================================================================================

[Vorlage herunterladen] - White/Outline button
  → Downloads CSV template with required columns

[Import starten] - Primary Blue button (#0F429F)
  → Calls POST /api/v1/portal/import/execute
  → Only enables if validation shows at least 1 OK row

================================================================================
RESPONSIVE BEHAVIOR
================================================================================

Desktop (1440px+):
- Full table layout
- All 3 sections visible
- 2 columns for file info

Tablet (1024px):
- Table becomes scrollable horizontally
- Sections stack vertically
- Buttons stack vertically

Mobile (< 768px):
- Single column layout
- Table scrolls horizontally
- Simplified view (show row + status only, expand for details)

================================================================================
RISO CI COMPLIANCE
================================================================================

Colors:
- Primary Blue: #0F429F (buttons, highlights)
- Secondary Blue: #246AFF (hover states)
- Dark Blue: #273A5F (titles, headers)
- Light Blue: #F0F9FF (backgrounds)
- Success Green: #10B981 (✅)
- Error Red: #EF4444 (❌)
- Light Gray: #F9FAFB (alternating rows)
- Dark Gray: #6B7280 (subtext)

Typography:
- Titles: Roboto Bold 700, 24px or 16px
- Labels: Roboto Medium 500, 14px
- Body: Roboto Regular 400, 14px
- Table: Roboto Regular 400, 12–14px

Spacing:
- Base unit: 8px
- Padding: 16px, 24px, 32px
- Button radius: 32px

================================================================================
API INTEGRATION
================================================================================

On file upload (after selecting file):
  POST /api/v1/portal/import/validate
  Body: { file: <CSV file> }
  
  Response:
  {
    "total_rows": 25,
    "valid_rows": 21,
    "invalid_rows": 4,
    "results": [
      {
        "row_number": 12,
        "name": "Keller, Anna",
        "action": "create",
        "status": "ok",
        "errors": []
      },
      {
        "row_number": 21,
        "name": "Nguyen, Linh",
        "action": "create",
        "status": "error",
        "errors": [
          {
            "field": "email",
            "problem": "Ungültiges Format",
            "suggestion": "max@firma.de"
          }
        ]
      }
    ]
  }

On "Import starten" click:
  POST /api/v1/portal/import/execute
  Body: { skip_invalid: true }
  
  Response:
  {
    "imported": 21,
    "skipped": 4,
    "message": "21 Mitarbeiter erfolgreich importiert. 4 Zeilen übersprungen."
  }

  → Show success modal + redirect to /employees

================================================================================
FORM VALIDATION (Before Upload)
================================================================================

CSV Requirements:
- Required columns: Vorname, Nachname, [others as per spec]
- Separator: Semicolon (;)
- Max file size: 10 MB
- Format: CSV only

================================================================================
