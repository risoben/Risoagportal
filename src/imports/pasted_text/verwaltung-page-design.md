FIGMA DESIGN PROMPT: Verwaltung-Seite (Modernized) — Alle Felder vom Mockup

PART 1: PAGE STRUKTUR

Page Title:

Text: "Verwaltung" (32px Bold #273A5F)
Position: Top-left
Padding: 24px
Layout: 2 Sections (Card-Style)

PART 2: SECTION 1 — ALLGEMEINE INFORMATIONEN

Card:

Background: white
Border: 1px #E0E0E0
Border-Radius: 12px
Padding: 24px
Margin-bottom: 24px
Section Title:

Font: Roboto Bold 18px
Color: #273A5F
Margin-bottom: 20px
Form Fields (2 Spalten auf Desktop, 1 auf Mobile):

Row 1:

Firmenname: [Text, read-only]
Stadt: [Text, read-only]
Row 2:

Unternehmensadresse: [Text, read-only, full-width]
Row 3:

Postleitzahl: [Text, read-only]
Umsatzsteuer-ID / VAT: [Text, read-only]
Row 4:

Ansprechpartner (Vorname): [Text, read-only]
Ansprechpartner (Nachname): [Text, read-only]
Row 5:

E-Mail: [Text, read-only]
Telefonnummer: [Text, read-only]
Row 6:

Rolle im Portal: [Text, read-only]
Label Styling:

Font: Roboto Medium 13px
Color: #273A5F
Margin-bottom: 8px
Input Field Styling (read-only):

Background: #F9FAFB (sehr helles Grau)
Border: 1px #E0E0E0
Border-Radius: 4px
Padding: 10px 12px
Font: Roboto Regular 14px
Color: #666666 (read-only Farbe)
Cursor: default
Field Gap:

Horizontal: 16px (zwischen Spalten)
Vertikal: 16px (zwischen Zeilen)
PART 3: SECTION 2 — BERICHTE & EXPORTS (MODERNIZED!)

Card:

Background: white
Border: 1px #E0E0E0
Border-Radius: 12px
Padding: 24px
Section Title:

Font: Roboto Bold 18px
Color: #273A5F
Margin-bottom: 20px
SUBSECTION A: BENEFITS SELECTION

Title:

Font: Roboto Medium 14px
Color: #273A5F
Margin-bottom: 16px
Text: "Welche Benefits sollen in den Berichten enthalten sein?"
Checkboxes (MODERN DESIGN):

Size: 18x18px
Border: 2px #0F429F (nicht 1px!)
Border-Radius: 4px
Background (unchecked): white
Background (checked): #0F429F (komplett gefüllt)
Checkmark: white SVG/Icon
Padding: 4px

Checkbox-Items:

☐ Mittagessen
☐ Internet
☐ Kindergarten
☐ Commuting
☐ Erholung
☐ Sachbezug
☐ Danke-Bonus
☐ Geburtstag
☐ ÖPNV
☐ BKV
☐ BAV

Item Layout:

Display: flex, gap 12px, align-items: center
Font: Roboto Regular 14px
Color: #333333
Line-height: 1.5
Container:

Display: grid (2 Spalten auf Desktop, 1 auf Mobile)
Gap: 12px
Margin-bottom: 24px
Hover State:

Checkbox-Border: Color zu #246AFF
Text: Color zu #0F429F
Background: #F0F4FF
SUBSECTION B: STANDORTE IN EXPORTEN

Title:

Font: Roboto Medium 14px
Color: #273A5F
Margin-bottom: 16px
Text: "Standorte in Exporten enthalten"
Checkboxes (gleiche moderne Stilisierung):

☐ Alle
☐ München
☐ Berlin
☐ Heddesheim
☐ Viernheim

Container:

Display: flex, gap 12px, flex-direction: column
Margin-bottom: 24px
SUBSECTION C: EXPORT-TYP (Radio-Buttons — MODERNISIERT!)

Title:

Font: Roboto Medium 14px
Color: #273A5F
Margin-bottom: 16px
Text: "Exporttyp bezüglich Standorte"
Radio Button Style (modern):

Radio Size: 18x18px
Border: 2px #0F429F
Border-Radius: 50% (perfekter Kreis!)
Background (unchecked): white
Background (selected): white (nur Ring)
Inner Circle (selected): 8x8px, Background: #0F429F (filled)
Padding: 4px
Radio Items:

◉ Alle Standorte in einem Report
○ Einzelnen Report pro Standort

Item Layout:

Display: flex, gap 12px, align-items: center
Font: Roboto Regular 14px
Color: #333333
Container:

Display: flex, gap 16px, flex-direction: column
Margin-bottom: 24px
Hover State:

Radio-Border: Color zu #246AFF
Text: Color zu #0F429F
Background: #F0F4FF
PART 4: ACTION BUTTON

Button Position: unten in der Section 2

Button:

Text: "Einstellungen speichern"
Style: Primary
Background: #0F429F
Text-Color: white
Padding: 12px 32px
Border-Radius: 24px
Font: Roboto Medium 14px
Hover: Background zu #246AFF
Disabled State: Background zu #CCCCCC
Action: Speichert Einstellungen + Toast-Notification

PART 5: MODERN CHECKBOX STYLING

Checkbox Default State:
┌─────────┐
│         │  ← 18x18px, Border: 2px #0F429F
│         │
└─────────┘

Checkbox Checked State:
┌─────────┐
│ ✓       │  ← 18x18px, Background: #0F429F, Checkmark white
│         │
└─────────┘

Checkbox Hover State:
┌─────────┐  ← Border: 2px #246AFF
│         │     Shadow: 0 0 0 3px rgba(36, 106, 255, 0.1)
│         │
└─────────┘

PART 6: MODERN RADIO STYLING

Radio Button Default State:
◯  ← 18x18px, Border: 2px #0F429F

Radio Button Selected State:
◉  ← 18x18px, Border: 2px #0F429F
Inner circle: 8x8px, Background: #0F429F (filled)

Radio Button Hover State:
◯  ← Border: 2px #246AFF
Shadow: 0 0 0 3px rgba(36, 106, 255, 0.1)

PART 7: COLOR & TYPOGRAPHY

Colors:

Primary Blue: #0F429F
Light Blue: #246AFF
Light BG: #F0F4FF
Light Gray BG: #F9FAFB
Dark Text: #273A5F
Gray Text: #666666
Border: #E0E0E0
Typography:

Page Title: 32px Bold #273A5F
Section Title: 18px Bold #273A5F
Subsection Title: 14px Medium #273A5F
Label: 13px Medium #273A5F
Input Text: 14px Regular #666666
Checkbox/Radio Label: 14px Regular #333333
Button: 14px Medium white
PART 8: RESPONSIVE LAYOUT

Desktop (1200px+):

2 Sections vertikal oder horizontal
Allgemeine Infos: 2 Spalten für Fields
Benefits: 2 Spalten für Checkboxes
Radio Buttons: flex column
Tablet (768px-1199px):

Sections: vertikal gestapelt
Allgemeine Infos: 1-2 Spalten
Benefits: 1-2 Spalten
Mobile (<768px):

Sections: full-width vertikal
Allgemeine Infos: 1 Spalte
Benefits: 1 Spalte
Radio Buttons: full-width
DELIVERY CHECKLIST

Section 1 — Allgemeine Informationen:
☐ Firmenname (read-only)
☐ Stadt (read-only)
☐ Unternehmensadresse (read-only)
☐ Postleitzahl (read-only)
☐ Umsatzsteuer-ID / VAT (read-only)
☐ Ansprechpartner (Vorname, Nachname)
☐ E-Mail (read-only)
☐ Telefonnummer (read-only)
☐ Rolle im Portal (read-only)
☐ 2 Spalten Layout (Desktop)

Section 2 — Berichte & Exports:
☐ Benefits: 11 Checkboxes (2 Spalten Grid)
☐ Standorte: 5 Checkboxes (1 Spalte)
☐ Export-Typ: 2 Radio Buttons (1 Spalte)

Styling — Modern:
☐ Checkboxes: 18x18px, Border 2px #0F429F, Checkmark SVG white
☐ Radio Buttons: 18x18px, Border 2px #0F429F, Inner circle filled
☐ Hover-States: Border #246AFF, Background #F0F4FF, Shadow
☐ Focus/Accessibility: 3px Shadow outline

Button:
☐ "Einstellungen speichern" Button (Primary #0F429F)
☐ Hover: Background #246AFF

FERTIG FÜR FIGMA-IMPLEMENTIERUNG

Key Changes:

Alle Mockup-Felder: Firmenname, Stadt, Adresse, PLZ, USt-ID, Ansprechpartner, Email, Telefon, Rolle
Moderne Checkboxes: 18x18px, 2px Border #0F429F, SVG Checkmark white
Moderne Radio Buttons: 18x18px, 2px Border #0F429F, filled inner circle
Benefits: 2-Spalten Grid
Hover/Focus: #246AFF Border + Shadow
"Einstellungen speichern" Button