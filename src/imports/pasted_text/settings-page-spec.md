🎨 FIGMA DESIGN SPECIFICATION: Einstellungen-Seite

KONTEXT: Settings-Seite im AG-Portal. Zwei Hauptbereiche: Allgemeine Infos + Reporter-Einstellungen.

PAGE-SETUP:
- Page-Name: "Einstellungen"
- Viewport: Desktop 1440px
- Background: #FAFAFA

═══════════════════════════════════════════════════════════════

HEADER / NAVIGATION (Höhe: 64px)
- Background: White #FFFFFF
- Border-bottom: 1px #E0E0E0
- Padding: 0 32px
- Nav-Items (aktiv: "Einstellungen" mit Riso Blue #0F429F + Border-bottom)

═══════════════════════════════════════════════════════════════

CONTENT AREA
- Max-Width: 1200px
- Margin: 0 auto
- Padding: 32px
- Display: flex, gap 32px (Sidebar + Main)

SIDEBAR (Width: 280px)
Background: White
Border: 1px #E0E0E0
Border-Radius: 8px
Padding: 0

SECTION-NAVIGATION (Sticky):
- Überschrift: "Einstellungen" (Roboto Bold 14px, #273A5F, padding 16px)
- Items (Roboto Regular 13px):
  - Allgemeine Infos (aktiv: bg #F0F4FF, text #0F429F, left border 3px #0F429F)
  - Reporter-Einstellungen
- Padding pro Item: 12px 16px
- Hover: bg #F9FAFB
- Cursor: pointer

═══════════════════════════════════════════════════════════════

MAIN CONTENT AREA (Flex: 1)

SECTION 1: ALLGEMEINE INFOS

SECTION-TITLE
- Text: "Allgemeine Infos"
- Font: Roboto Bold 20px
- Color: #273A5F
- Margin-bottom: 24px

CARD-GROUP 1: Unternehmensinfos
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px
- Margin-bottom: 24px

FORM-GROUP 1:
- Label: "Unternehmensname" (Roboto Medium 12px, #333333, margin-bottom 8px)
- Input: "Riso GmbH" (Roboto Regular 13px, #333333, read-only style, bg #F9FAFB)
- Border: 1px #E0E0E0
- Padding: 12px 16px
- Border-Radius: 6px

FORM-GROUP 2:
- Label: "Unternehmens-ID" (Roboto Medium 12px, #333333)
- Input: "FIN2345" (read-only, same styling as above)

FORM-GROUP 3:
- Label: "E-Mail des AG-Admins" (Roboto Medium 12px, #333333)
- Input: "admin@riso-gmbh.de" (read-only)

FORM-GROUP 4:
- Label: "Telefon" (Roboto Medium 12px, #333333)
- Input: "+49 621 123456" (read-only)

FORM-GROUP 5:
- Label: "Adresse" (Roboto Medium 12px, #333333)
- Input: "Hauptstraße 42, 68219 Mannheim" (read-only)

GAP BETWEEN GROUPS: 16px (vertical)

CARD-GROUP 2: Abonnement & Lizenzinfos
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px
- Margin-bottom: 24px

FORM-GROUP 1:
- Label: "Riso Paket" (Roboto Medium 12px, #333333)
- Value: "Premium" (Badge: bg #E8F5E9, text #4CAF50, radius 12px, padding 6px 12px)

FORM-GROUP 2:
- Label: "Anzahl Mitarbeiterlizenzen" (Roboto Medium 12px, #333333)
- Value: "87 aktive Lizenzen / 100 verfügbar" (Roboto Regular 13px, #333333)
- Progress-Bar: width 100%, height 8px, bg #E0E0E0, fill #4CAF50 (87%), border-radius 4px

FORM-GROUP 3:
- Label: "Vertrag gültig bis" (Roboto Medium 12px, #333333)
- Value: "31. Dezember 2026" (Roboto Regular 13px, #333333)

FORM-GROUP 4:
- Label: "Nächste Abrechnung" (Roboto Medium 12px, #333333)
- Value: "1. Januar 2026" (Roboto Regular 13px, #333333)

═══════════════════════════════════════════════════════════════

SECTION 2: REPORTER-EINSTELLUNGEN

SECTION-TITLE (margin-top 48px)
- Text: "Reporter-Einstellungen"
- Font: Roboto Bold 20px
- Color: #273A5F
- Margin-bottom: 24px

CARD: Reporter-Konfiguration
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 8px
- Padding: 24px

SETTING 1: Automatische Reports
- Display: flex, justify-content space-between, align-items center
- Margin-bottom: 24px

LEFT SIDE:
- Title: "Automatische Reports" (Roboto Medium 13px, #333333)
- Description: "Monatliche Berichte automatisch erstellen" (Roboto Regular 12px, #999999, margin-top 4px)

RIGHT SIDE:
- Toggle-Switch: ON/OFF (checked state: bg #4CAF50, unchecked: bg #CCCCCC)
- Size: 48x24px
- Radius: 12px
- Circle: 20px, white, transition 0.3s

SETTING 2: Report-Empfänger (conditional, nur wenn Toggle ON)
- Padding-top: 16px
- Border-top: 1px #E0E0E0

Label: "Report-Empfänger" (Roboto Medium 12px, #333333, margin-bottom 12px)

EMAIL-LIST (scrollbar bei Bedarf):
- Background: #F9FAFB
- Border: 1px #E0E0E0
- Border-Radius: 6px
- Padding: 12px
- Max-Height: 200px
- Overflow-Y: auto

Items:
- Text: "admin@riso-gmbh.de" (Roboto Regular 12px, #333333)
- Plus Button: "+ Weitere E-Mail hinzufügen" (Roboto Regular 12px, #0F429F, cursor pointer)

SETTING 3: Report-Format
- Margin-top: 24px
- Padding-top: 24px
- Border-top: 1px #E0E0E0

Label: "Report-Format" (Roboto Medium 12px, #333333, margin-bottom 12px)

Radio-Buttons:
- Option 1: "PDF" (selected, Roboto Regular 12px, #333333)
- Option 2: "Excel" (Roboto Regular 12px, #333333)
- Option 3: "Beide Formate" (Roboto Regular 12px, #333333)
- Gap zwischen Optionen: 16px

SETTING 4: Report-Häufigkeit
- Margin-top: 24px
- Padding-top: 24px
- Border-top: 1px #E0E0E0

Label: "Report-Häufigkeit" (Roboto Medium 12px, #333333, margin-bottom 12px)

Dropdown:
- Text: "Monatlich" (Roboto Regular 12px)
- Background: White
- Border: 1px #E0E0E0
- Padding: 12px 16px
- Border-Radius: 6px
- Options: Monatlich, Wöchentlich, Täglich, Nach Bedarf
- Width: 200px

═══════════════════════════════════════════════════════════════

BUTTONS (am Ende Main Content)
- Display: flex, gap 16px, margin-top 32px
- Button 1: "Abbrechen" (Secondary, transparent, border #0F429F, text #0F429F, radius 24px, padding 12px 32px)
- Button 2: "Speichern" (Primary, bg #246AFF, text white, radius 24px, padding 12px 32px)

═══════════════════════════════════════════════════════════════

RESPONSIVE:
- Tablet (1024px): Sidebar wird Tab-Navigation (oben), Main content full-width
- Mobile (768px): Single column, kein Sidebar, Tab-Navigation horizontal scrollbar

SPACING:
- Card Padding: 24px
- Form Gap: 16px
- Section Gap: 48px
- Input Height: 40px

FARBEN (Riso CI):
- Primary Blue: #0F429F
- Light Blue: #246AFF
- Hellblau: #F0F4FF
- Dark Text: #273A5F
- Gray Text: #666666
- Light BG: #F9FAFB
- Success: #4CAF50
- Border: #E0E0E0
- Page BG: #FAFAFA

FONT: Roboto
- Seiten-Titel: 20px Bold
- Section-Title: 13px Medium
- Body: 12px Regular
- Input: 13px Regular

STATES:
- Toggle ON: bg #4CAF50
- Toggle OFF: bg #CCCCCC
- Read-only Input: bg #F9FAFB, text #999999
- Radio Selected: circle filled #0F429F
- Hover Button: Opacity 0.9
