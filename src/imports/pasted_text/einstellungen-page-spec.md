🎨 FIGMA DESIGN SPECIFICATION: Einstellungen-Seite (Deutsch + Locations-Fix)

KONTEXT: Einstellungen-Seite im AG-Portal. Tabs: Allgemeine Infos & Reports.
Backend-Fields: Exakt nach Mockups, VOLLSTÄNDIG AUF DEUTSCH, mit Locations-Sektion in Reports.

PAGE-SETUP:
- Page-Name: "Einstellungen"
- Viewport: Desktop 1440px
- Background: #FAFAFA

═══════════════════════════════════════════════════════════════

HEADER / NAVIGATION (Höhe: 64px)
- Background: White #FFFFFF
- Border-bottom: 1px #E0E0E0
- Padding: 0 32px
- Navigation Items: Riso Arbeitgeber-Portal, Benefits, Mitarbeiter, Berichte, Massenimport, Verwaltung (ACTIVE: blue #0F429F), Hilfe, Kontakt

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
- Item 2: "Berichte"
- Padding pro Item: 12px 16px
- Hover: bg #F9FAFB
- Font: Roboto Regular 13px, cursor pointer

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
- Label: "Firmenname" (Roboto Medium 12px, #333333, margin-bottom 8px)
- Input: editable, Roboto Regular 13px, #333333
- Placeholder: "z.B. Riso GmbH"
- Border: 1px #E0E0E0, Padding 12px 16px, Border-Radius 6px, Height 40px
- Hover: Border #0F429F

FORM-GROUP 2 (rechts):
- Label: "Stadt" (Roboto Medium 12px, #333333)
- Input: editable
- Placeholder: "z.B. Mannheim"
- Same styling as above

FORM-GROUP 3 (full width):
- Label: "Unternehmensadresse" (Roboto Medium 12px, #333333)
- Input: editable, full width
- Placeholder: "z.B. Hauptstraße 42, 68219 Mannheim"
- Same styling

FORM-GROUP 4 (left):
- Label: "Postleitzahl" (Roboto Medium 12px, #333333)
- Input: editable
- Placeholder: "z.B. 68219"

FORM-GROUP 5 (right):
- Label: "Umsatzsteuer-ID / VAT Nummer" (Roboto Medium 12px, #333333)
- Input: editable
- Placeholder: "z.B. DE123456789"

FORM-GROUP 6 (full width):
- Label: "Ansprechpartner im Unternehmen" (Roboto Medium 12px, #333333)
- Input: editable, full width
- Placeholder: "z.B. Max Müller"

Gap zwischen Groups: 16px

SECTION 2: Benutzerinformationen
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px
- Margin-bottom: 24px

TITLE: "Benutzerinformationen" (Roboto Bold 13px, #333333, margin-bottom 16px)

FORM-GROUP 1 (left):
- Label: "Vorname" (Roboto Medium 12px, #333333)
- Input: editable
- Placeholder: "z.B. Santiago"

FORM-GROUP 2 (right):
- Label: "Nachname" (Roboto Medium 12px, #333333)
- Input: editable
- Placeholder: "z.B. Tellez"

FORM-GROUP 3 (full width):
- Label: "E-Mail-Adresse" (Roboto Medium 12px, #333333)
- Input: editable
- Placeholder: "z.B. santiago@riso-app.de"

FORM-GROUP 4 (left):
- Label: "Telefonnummer" (Roboto Medium 12px, #333333)
- Input: editable
- Placeholder: "z.B. +49 621 123456"

FORM-GROUP 5 (right):
- Label: "Rolle im Portal" (Roboto Medium 12px, #333333)
- Dropdown: editable
- Options: Admin, Editor, Viewer
- Placeholder: "z.B. Admin"

FORM-GROUP 6 (full width):
- Link: "Passwort ändern" (Roboto Regular 12px, color #0F429F, cursor pointer, underline on hover)

SECTION 3: Vertrag
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px
- Margin-bottom: 24px

TITLE: "Vertrag" (Roboto Bold 13px, #333333, margin-bottom 16px)

FORM-GROUP 1 (left):
- Label: "Anzahl aktive Mitarbeiter" (Roboto Medium 12px, #333333)
- Value: (z.B. "87") - read-only (bg #F9FAFB, border #E0E0E0)
- Roboto Regular 13px, #333333, Padding 12px 16px, Border-Radius 6px

FORM-GROUP 2 (right):
- Label: "Vertrag abgeschlossen" (Roboto Medium 12px, #333333)
- Value: (z.B. "1. Januar 2026") - read-only

FORM-GROUP 3 (left):
- Label: "Vertrag gültig bis" (Roboto Medium 12px, #333333)
- Value: (z.B. "31. Dezember 2026") - read-only

FORM-GROUP 4 (right):
- Label: "Nächste Abrechnung" (Roboto Medium 12px, #333333)
- Value: (z.B. "7. Mai 2026") - read-only

═══════════════════════════════════════════════════════════════

TAB 2: BERICHTE

LAYOUT: 2-Column (Links: Basic + Locations, Rechts: Columnar Data + Benefits)

SECTION 1: Basiskonfigurationen (LEFT)
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px

TITLE: "Basiskonfigurationen" (Roboto Bold 13px, #333333, margin-bottom 12px)
SUBTITLE: "Report-Typen exportieren" (Roboto Regular 11px, #999999, margin-bottom 12px)

RADIO-GROUP:
- Option 1: "Beide – Übersicht & Vollständiger Bericht" (selected, circle #0F429F)
  - Text: Roboto Regular 12px, #333333
  - Spacing: 8px bottom
- Option 2: "Nur Übersichtsbericht"
  - Circle: unchecked
  - Spacing: 8px bottom
- Option 3: "Nur Vollständiger Bericht"
  - Circle: unchecked
  - Spacing: 8px bottom

DIVIDER: 1px #E0E0E0, margin 16px 0

SUBTITLE: "Standorte in Exporten enthalten" (Roboto Regular 11px, #999999, margin-bottom 12px)

CHECKBOX-GROUP:
- Option 1: "Alle" (checked, checkbox #0F429F)
  - Text: Roboto Regular 12px, #333333
  - Spacing: 8px
- Option 2: "München" (checked)
  - Spacing: 8px
- Additional locations möglich...

DIVIDER: 1px #E0E0E0, margin 16px 0

SUBTITLE: "Exporttyp bezüglich Standorte" (Roboto Regular 11px, #999999, margin-bottom 12px)

RADIO-GROUP:
- Option 1: "Alle Standorte in einem Report" (selected, circle #0F429F)
  - Text: Roboto Regular 12px, #333333
  - Spacing: 8px bottom
- Option 2: "Einzelnen Report pro Standort"
  - Circle: unchecked
  - Spacing: 8px bottom

DIVIDER: 1px #E0E0E0, margin 16px 0

SUBTITLE: "Datentyp" (Roboto Regular 11px, #999999, margin-bottom 12px)

OPTION-BUTTONS (inline):
- Button 1: "PDF" (selectable, Border 1px #E0E0E0, Padding 8px 16px, Radius 6px, Roboto Regular 12px)
- Button 2: "Excel" (same styling)
- Button 3: "CSV" (same styling)
- Gap: 12px
- Hover: Border #0F429F, bg #F0F4FF

═══════════════════════════════════════════════════════════════

SECTION 2: Spaltendaten-Konfigurationen (RIGHT)
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px

TITLE: "Spaltendaten-Konfigurationen" (Roboto Bold 13px, #333333, margin-bottom 16px)

SUBSECTION A: Mitarbeiterdaten
- Subtitle: "Mitarbeiterdaten" (Roboto Regular 11px, #999999, margin-bottom 8px)

CHECKBOX-GROUP (vertical):
- "Vorname" (unchecked, checkbox #CCCCCC)
  - Text: Roboto Regular 12px, #333333
  - Spacing: 8px
- "Nachname" (unchecked)
  - Spacing: 8px
- "Personalnr" (checked, checkbox #0F429F)
  - Spacing: 8px

DIVIDER: 1px #E0E0E0, margin 12px 0

SUBSECTION B: Benefits (CRITICAL - ALLE 11 BENEFITS)
- Subtitle: "Benefits" (Roboto Regular 11px, #999999, margin-bottom 8px)

CHECKBOX-GROUP (vertical):
- "Essenszuschuss" (unchecked)
  - Text: Roboto Regular 12px, #333333
  - Spacing: 8px
- "Sachbezug" (unchecked)
  - Spacing: 8px
- "Danke-Bonus" (unchecked)
  - Spacing: 8px
- "BKV" (unchecked)
  - Spacing: 8px
- "Internetzuschuss" (unchecked)
  - Spacing: 8px
- "Kindergartenzuschuss" (unchecked)
  - Spacing: 8px
- "Geburtstagsgutschein" (unchecked)
  - Spacing: 8px
- "BAV" (unchecked)
  - Spacing: 8px
- "Erholungsbeihilfe" (checked, checkbox #0F429F)
  - Spacing: 8px
- "Fahrtkostenzuschuss" (unchecked)
  - Spacing: 8px
- "ÖPNV-Ticket-Zuschuss" (unchecked)
  - Spacing: 8px

═══════════════════════════════════════════════════════════════

SECTION 3: Kommentare (FULL WIDTH)
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
- Focus: Border #0F429F

═══════════════════════════════════════════════════════════════

BUTTONS (am Ende, margin-top 32px)
- Display: flex, gap 16px, justify-content flex-end

Button 1: "Abbrechen"
- Style: Secondary (outline)
- Background: transparent
- Border: 1px #0F429F
- Text-Color: #0F429F
- Font: Roboto Medium 14px
- Padding: 12px 32px
- Border-Radius: 24px
- Hover: Background #F0F4FF

Button 2: "Speichern"
- Style: Primary
- Background: #246AFF
- Text-Color: white
- Font: Roboto Medium 14px
- Padding: 12px 32px
- Border-Radius: 24px
- Hover: Background #0F429F

═══════════════════════════════════════════════════════════════

RESPONSIVE:
- Tablet (1024px): Sidebar → Tab-Navigation, Main full-width, 2-Column → 1-Column
- Mobile (768px): Single column, Buttons full-width stapelweise

SPACING:
- Card Padding: 24px
- Form Gap: 16px
- Section Gap: 24px
- Column Gap: 32px
- Input Height: 40px

FARBEN (Riso CI):
- Primary Blue: #0F429F
- Light Blue: #246AFF
- Hellblau: #F0F4FF
- Dark Text: #273A5F
- Gray Text: #666666
- Light BG: #F9FAFB
- Border: #E0E0E0

FONT: Roboto
- Title: 13px Bold
- Label: 12px Medium
- Body: 13px Regular
- Helper: 11px Regular
