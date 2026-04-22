*Kontext:*
Du erstellst eine neue "Reports" Seite für das Riso Arbeitgeber-Portal, basierend auf dem bestehenden Design-System (siehe Berichtebersicht.png). Diese Seite soll die erstellten Reports als Tabelle anzeigen mit Download-/Ansicht-Optionen.

*Seiten-Titel:*
"Meine Berichte" (oder "Reports")

*Layout-Struktur:*
┌─────────────────────────────────────────┐
│ HEADER (Navigation + Breadcrumb)        │
├─────────────────────────────────────────┤
│ FILTER AREA (links):                    │
│ - Suchfeld "Nach Dateiname suchen..."   │
│ - Filter Buttons: "Alle", "PDF", "Excel" │
├─────────────────────────────────────────┤
│ TABLE (Tabellen-Liste):                 │
│ ┌──┬────────┬────────┬────────┬────────┐│
│ │☐ │Datum   │Monat   │Version │...    ││
│ ├──┼────────┼────────┼────────┼────────┤│
│ │☐ │01.04.  │April   │v2.3    │...    ││
│ │☐ │31.03.  │März    │v2.2    │...    ││
│ └──┴────────┴────────┴────────┴────────┘│
├─────────────────────────────────────────┤
│ PAGINATION (unten)                      │
│ Previous  [1] [2] [3] Next              │
└─────────────────────────────────────────┘

*Tabellen-Spalten (in dieser Reihenfolge):*
1. Checkbox (☐) — zur Mehrfachauswahl
2. Datum — Format: TT.MM (z.B. "01.04.")
3. Monat — Name (z.B. "April", "März")
4. Erstellungsdatum — Format: TT.MM.YYYY (z.B. "01.04.2026")
5. Version — Format: "v1.0", "v2.1", etc.
6. Dateityp — Icons oder Text (PDF, Excel, CSV)
7. Dateiname — Name der Report-Datei
8. Aktion — 2 Buttons nebeneinander:
   - "👁 Ansehen" (grau, outline)
   - "⬇ Herunterladen" (Riso Blue, gefüllt)

*Design Details:*

*Header-Bereich:*
- Titel: "Meine Berichte" (Roboto Bold, 28px, Schwarz #000000)
- Untertitel: "Hier findest du alle deine generierten Reports zum Download" (Roboto Regular, 14px, Grau #666666)

*Filter-Bereich:*
- Suchfeld:
  - Placeholder: "Nach Dateiname suchen..."
  - Border: 1px #E0E0E0
  - Radius: 8px
  - Padding: 12px 16px
  - Icon: Lupe (links)
- Filter-Buttons (optional, rechts neben Suchfeld):
  - "Alle" (aktiv: Riso Blue #0F429F bg, white text)
  - "PDF" (inaktiv: outline, grau)
  - "Excel" (inaktiv: outline, grau)

*Tabelle:*
- Header-Zeile:
  - Background: Hellblau #F0F4FF (oder #EEF2FF)
  - Text: Roboto Medium 12px, Grau #666666, UPPERCASE
  - Padding: 16px
  - Spalten-Breite: flexibel, responsive

- Daten-Zeilen:
  - Background (gerade): #FFFFFF
  - Background (ungerade): #F8F9FB (sehr helles Grau)
  - Hover-State: #EEF2FF (hellblaues Highlight)
  - Text: Roboto Regular 14px, Schwarz #000000
  - Border: 1px #E8E8E8 (unten)
  - Padding: 16px
  - Höhe pro Zeile: 56px

- Checkbox:
  - Grösse: 20×20px
  - Border: 2px Riso Blue #0F429F
  - Checked: Riso Blue bg mit weisser Häkchen
  - Margin-right: 12px

- Dateityp-Icons:
  - PDF: Rotes Icon (oder 🔴 + "PDF" Text)
  - Excel: Grünes Icon (oder 🟢 + "XLS" Text)
  - CSV: Graues Icon
  - Größe: 20×20px oder nur Text-Label

- Aktion-Buttons:
  - "Ansehen": Secondary Button
    - Background: Transparent oder #F0F0F0
    - Border: 1px #0F429F
    - Text: Riso Blue #0F429F, Roboto Medium 12px
    - Radius: 24px
    - Padding: 8px 16px
    - Icon: 👁 (links vom Text)
  
  - "Herunterladen": Primary Button
    - Background: Riso Blue #0F429F
    - Text: White, Roboto Medium 12px
    - Radius: 24px
    - Padding: 8px 16px
    - Icon: ⬇ (links vom Text)
    - Hover: Darker Blue #0A2E7A

*Pagination:*
- Buttons: "Previous", Seitenzahlen, "Next"
- Aktive Seite: Riso Blue bg (#0F429F) mit white text
- Inaktive Seiten: Outline, Border #D0D0D0
- Disabled State: Grau #CCCCCC, cursor: not-allowed
- Spacing: 8px zwischen Buttons

*Responsive:*
- Desktop (>1024px): Alle Spalten sichtbar
- Tablet (768-1024px): Dateityp-Spalte kann ausgeblendet werden
- Mobile (<768px): Nur wichtigste Spalten (Dateiname, Aktion)

*Riso CI Compliance:*
✓ Primärfarbe: Riso Blue #0F429F (Buttons, Headers)
✓ Font: Roboto (Bold, Regular, Medium)
✓ Button-Radius: 24px (für kleinere Buttons) / 32px (für größere)
✓ Spacing: 8px Grid (8, 16, 24, 32, 48px)
✓ Icons: Einfache, minimale Design (oder Emoji für Quick Mockup)

*Beispiel-Daten (5 Zeilen):*
- 01.04. | April | 01.04.2026 | v2.3 | PDF | "Monatsbericht April" | [Ansehen] [Herunterladen]
- 31.03. | März | 31.03.2026 | v2.2 | Excel | "Quartalsübersicht Q1" | [Ansehen] [Herunterladen]
- 28.02. | Februar | 28.02.2026 | v2.1 | PDF | "Monatsbericht Februar" | [Ansehen] [Herunterladen]
- 31.01. | Januar | 31.01.2026 | v2.0 | Excel | "Jahresübersicht 2025" | [Ansehen] [Herunterladen]
- 15.01. | Januar | 15.01.2026 | v1.9 | CSV | "Mitarbeiter-Export 2025" | [Ansehen] [Herunterladen]

*Zusätzliche Details:*
- Wenn keine Reports vorhanden: Empty State mit Illustration + "Noch keine Reports erstellt" + Button "Report erstellen"
- Loading State: Skeleton Table mit Grau-Balken (3 Sekunden Animation)
- Success Toast: "Report erfolgreich heruntergeladen" (grüner Toast oben rechts)