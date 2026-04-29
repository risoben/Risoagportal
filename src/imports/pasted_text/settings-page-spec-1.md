🎨 FIGMA DESIGN SPECIFICATION: Einstellungen-Seite (Revised)

KONTEXT: Einstellungen-Seite im AG-Portal. Sidebar-Navigation mit 2 Tabs: Allgemeine Infos & Reports.
Backend-Fields: Exakt nach Mockups (AllgemeineInfos.png + ReportsEinstellungen.png)

PAGE-SETUP:
- Page-Name: "Einstellungen"
- Viewport: Desktop 1440px
- Background: #FAFAFA

═══════════════════════════════════════════════════════════════

HEADER / NAVIGATION (Höhe: 64px)
- Background: White #FFFFFF
- Border-bottom: 1px #E0E0E0
- Padding: 0 32px
- Navigation Items: Riso Arbeitgeber-Portal, Benefits, Mitarbeiter, Berichte, Massenimport, Verwaltung (ACTIVE: blue), Hilfe, Kontakt

═══════════════════════════════════════════════════════════════

CONTENT AREA (Padding: 32px)
- Max-Width: 1200px
- Margin: 0 auto
- Display: flex, gap 32px (Sidebar + Main)

SIDEBAR (Width: 280px)
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 0

TAB-NAVIGATION (sticky):
- Item 1: "Allgemeine Infos" (ACTIVE: bg #F0F4FF, text #0F429F, left border 3px #0F429F)
- Item 2: "Standorte"
- Item 3: "Reports"
- Padding pro Item: 12px 16px
- Hover: bg #F9FAFB
- Font: Roboto Regular 13px

═══════════════════════════════════════════════════════════════

MAIN CONTENT AREA (Flex: 1)

TAB 1: ALLGEMEINE INFOS

SECTION 1: Unternehmensformationen
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px
- Margin-bottom: 24px

TITLE: "Unternehmensformationen" (Roboto Bold 13px, #333333, margin-bottom 16px)

FORM-LAYOUT: 2-Column Grid (gap 24px)

FORM-GROUP 1:
- Label: "Firmenname" (Roboto Medium 12px, #333333)
- Input: (z.B. "Riso GmbH") - editable, Roboto Regular 13px
- Border: 1px #E0E0E0, Padding 12px 16px, Border-Radius 6px

FORM-GROUP 2 (rechts):
- Label: "Stadt" (Roboto Medium 12px, #333333)
- Input: (z.B. "Mannheim") - editable
- Same styling as above

FORM-GROUP 3 (full width):
- Label: "Unternehmensadresse" (Roboto Medium 12px, #333333)
- Input: (z.B. "Hauptstraße 42, 68219 Mannheim") - editable, full width
- Same styling

FORM-GROUP 4 (left):
- Label: "Postleitzahl" (Roboto Medium 12px, #333333)
- Input: (z.B. "68219") - editable

FORM-GROUP 5 (right):
- Label: "Umsatzsteuer-ID / VAT Nummer" (Roboto Medium 12px, #333333)
- Input: (z.B. "DE123456789") - editable

FORM-GROUP 6 (full width):
- Label: "Ansprechpartner im Unternehmen" (Roboto Medium 12px, #333333)
- Input: (z.B. "Max Müller") - editable

GAP zwischen Groups: 16px

SECTION 2: Benutzerinformationen
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px
- Margin-bottom: 24px

TITLE: "Benutzerinformationen" (Roboto Bold 13px, #333333, margin-bottom 16px)

FORM-GROUP 1 (left):
- Label: "Vorname" (Roboto Medium 12px, #333333)
- Input: (z.B. "Santiago") - editable

FORM-GROUP 2 (right):
- Label: "Nachname" (Roboto Medium 12px, #333333)
- Input: (z.B. "Tellez") - editable

FORM-GROUP 3 (full width):
- Label: "E-Mail-Adresse" (Roboto Medium 12px, #333333)
- Input: (z.B. "santiago@riso-app.de") - editable

FORM-GROUP 4 (left):
- Label: "Telefonnummer" (Roboto Medium 12px, #333333)
- Input: (z.B. "+49 621 123456") - editable

FORM-GROUP 5 (right):
- Label: "Rolle im Portal" (Roboto Medium 12px, #333333)
- Dropdown/Select: (z.B. "Admin", "Editor", "Viewer")
- Placeholder: "z.B. Admin"

FORM-GROUP 6 (full width):
- Link: "Passwort ändern" (Roboto Regular 12px, color #0F429F, cursor pointer, no underline normally, underline on hover)

SECTION 3: Vertrag & Lizenzen
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px
- Margin-bottom: 24px

TITLE: "Vertrag & Lizenzen" (Roboto Bold 13px, #333333, margin-bottom 16px)

FORM-GROUP 1 (left):
- Label: "Anzahl aktive Mitarbeiter" (Roboto Medium 12px, #333333)
- Value: (z.B. "87 von 100 Lizenzen aktiv") - read-only style (bg #F9FAFB)
- Roboto Regular 13px, #333333

FORM-GROUP 2 (right):
- Label: "Vertrag abgeschlossen" (Roboto Medium 12px, #333333)
- Value: (z.B. "1. Januar 2026") - read-only style

FORM-GROUP 3 (left):
- Label: "Vertrag gültig bis" (Roboto Medium 12px, #333333)
- Value: (z.B. "31. Dezember 2026") - read-only style

FORM-GROUP 4 (right):
- Label: "Nächste Abrechnung" (Roboto Medium 12px, #333333)
- Value: (z.B. "7. Mai 2026") - read-only style

═══════════════════════════════════════════════════════════════

TAB 2: REPORTS

LAYOUT: 2-Column (Links: Basic + Locations + Format, Rechts: Column Data)

SECTION 1: Basic Configurations (LEFT)
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px

TITLE: "Basic configurations" (Roboto Bold 13px, #333333)
SUBTITLE: "Report types exported" (Roboto Regular 11px, #999999)

RADIO-GROUP:
- Option 1: "Both – Overview & Full report" (selected)
  - Circle: checked #0F429F
  - Text: Roboto Regular 12px, #333333
- Option 2: "Only Overview report"
  - Circle: unchecked #CCCCCC
  - Text: same
- Option 3: "Only Full report"
  - Circle: unchecked
  - Text: same
- Gap zwischen Options: 12px

DIVIDER: 1px #E0E0E0, margin 16px 0

SUBTITLE: "Locations included in exports" (Roboto Regular 11px, #999999)

CHECKBOX-GROUP:
- Option 1: "All" (checked, checkbox #0F429F)
  - Text: Roboto Regular 12px, #333333
- Option 2: "München" (checked)
- Other Locations möglich...
- Gap: 8px

DIVIDER: 1px #E0E0E0, margin 16px 0

SUBTITLE: "Export type concerning locations" (Roboto Regular 11px, #999999)

RADIO-GROUP:
- Option 1: "All locations in one report" (selected)
  - Circle: checked
  - Text: Roboto Regular 12px, #333333
- Option 2: "Single report for each location"
  - Circle: unchecked

DIVIDER: 1px #E0E0E0, margin 16px 0

SUBTITLE: "Data Type" (Roboto Regular 11px, #999999)

OPTION-BUTTONS (inline):
- "PDF" (selectable, not checked style)
- "Excel" (selectable)
- "CSV" (selectable)
- Spacing: 12px, Border 1px #E0E0E0, Padding 8px 16px, Radius 6px

═══════════════════════════════════════════════════════════════

SECTION 2: Columnar Data Configurations (RIGHT)
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px

TITLE: "Columnar data configurations" (Roboto Bold 13px, #333333, margin-bottom 16px)

CHECKBOX-GROUP (vertical):
- Option 1: "Vorname" (checked, checkbox #0F429F)
  - Text: Roboto Regular 12px, #333333
- Option 2: "Nachname" (checked)
- Option 3: "Personalnr" (checked)
- Option 4: "Mittagessen" (checked)
- Option 5: "Erholung" (checked)
- Gap: 12px

═══════════════════════════════════════════════════════════════

SECTION 3: Kommentare (FULL WIDTH, unter den 2 Columns)
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px
- Margin-top: 24px

TITLE: "Kommentare" (Roboto Bold 13px, #333333, margin-bottom 12px)

TEXTAREA:
- Placeholder: "Freitext für zusätzliche Hinweise..."
- Font: Roboto Regular 13px, #999999
- Height: 120px
- Border: 1px #E0E0E0
- Padding: 12px 16px
- Border-Radius: 6px
- Resize: none

═══════════════════════════════════════════════════════════════

BUTTONS (am Ende)
- Display: flex, gap 16px, margin-top 32px
- Button 1: "Abbrechen" (Secondary, transparent, border #0F429F, text #0F429F, radius 24px, padding 12px 32px)
- Button 2: "Absenden und Speichern" (Primary, bg #246AFF, text white, radius 24px, padding 12px 32px)

═══════════════════════════════════════════════════════════════

RESPONSIVE:
- Tablet (1024px): Sidebar becomes Tab-Navigation, Main full-width, 2-Column Layout → 1-Column
- Mobile (768px): Single column everything, Buttons full-width stapelweise

SPACING:
- Card Padding: 24px
- Form Gap: 16px
- Section Gap: 24px
- Column Gap: 24px

FARBEN (Riso CI):
- Primary Blue: #0F429F
- Light Blue: #246AFF
- Hellblau: #F0F4FF
- Dark Text: #273A5F
- Gray Text: #666666
- Light BG: #F9FAFB
- Border: #E0E0E0
- Page BG: #FAFAFA

FONT: Roboto
- Tab/Title: 13px Bold
- Label: 12px Medium
- Body/Input: 13px Regular
- Helper: 11px Regular

STATES:
- Editable Input: White bg, #E0E0E0 border
- Read-only Input: #F9FAFB bg, #999999 text
- Checkbox Checked: #0F429F
- Radio Checked: #0F429F circle filled
- Hover Button: Opacity 0.9
