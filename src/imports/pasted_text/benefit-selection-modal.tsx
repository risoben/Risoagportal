Trigger: Button "+ Benefit hinzufügen" auf Benefits verwalten Seite

MODAL / OVERLAY
Title: "Welches Benefit möchte du aktivieren?"

Subtitle:

Font: Roboto Regular 13px
Color: #666666
Text: "Wähle ein inaktives Benefit aus der Liste"
BENEFIT-CARDS GRID
Container:

Display: Grid
Columns: 2 (auf Desktop), 1 (auf Mobile/Tablet)
Gap: 24px
Padding: 24px
Background: white (oder Modal-Hintergrund)
Jede Card:

┌──────────────────────────┐
│   [Icon 48x48]           │
│                          │
│   Benefit-Name           │
│   Beschreibung/Info      │
│                          │
│   [Wählen] Button        │
└──────────────────────────┘

Card Styling:

Background: white
Border: 1px #E0E0E0
Border-Radius: 12px
Padding: 24px
Min-Width: 240px
Hover: Shadow 0 4px 12px rgba(0,0,0,0.08), Border-Color #0F429F
Transition: 0.2s
Cursor: pointer
Icon Area:

Size: 48x48px
Original SVG-Farbe (Mittagessen #F4B860, Internet #4CAF50, etc.)
KEINE #F0F4FF Overlay!
Asset-Path: /assets/benefit-icons/[name].svg
Margin-bottom: 16px
Text-align: center
Title:

Font: Roboto Medium 14px
Color: #273A5F
Margin-bottom: 8px
Text-align: center
Description/Info:

Font: Roboto Regular 12px
Color: #666666
Margin-bottom: 16px
Text-align: center
Beispiel: "Essenszuschuss für Mitarbeiter"
Wählen-Button:

Text: "Wählen"
Style: Primary
Background: #0F429F
Text-Color: white
Padding: 10px 20px
Radius: 20px
Font: Roboto Medium 12px
Hover: Background #246AFF
Width: 100%
Action: Card als "selected" markieren + [Weiter] Button aktivieren
AUSGEWÄHLTE CARD (nach Klick auf Wählen)
Visual Feedback:

Border-Color: #0F429F (2px statt 1px)
Background: #F0F4FF (sehr hell)
Shadow: 0 4px 12px rgba(15, 66, 159, 0.2)
Wählen-Button (nach Auswahl):

Text ändert sich zu: "✓ Ausgewählt"
Background: #4CAF50 (grün)
Disabled State (visuell, aber interaktiv)
BEISPIEL-DATEN (nur inaktive Benefits)
Inaktive Benefits anzeigen:

[Icon] Kindergarten
"Kinderbetreuungs-Zuschuss"
[Wählen]

[Icon] Erholung
"Erholungsbudget für Mitarbeiter"
[Wählen]

[Icon] ÖPNV
"Öffentliche Verkehrsmittel"
[Wählen]

[Icon] BAV
"Betriebliche Altersversorgung"
[Wählen]

[Icon] Sachbezug
"Sachleistungen & Gutscheine"
[Wählen]

[Icon] BKV
"Betriebliche Krankenversicherung"
[Wählen]

(Nur Benefits mit Status ⚪ Inaktiv angezeigt!)

BOTTOM BUTTONS (Modal-Footer)
Position: Unten im Modal, rechts ausgerichtet

Button Container:

Display: flex
Gap: 12px
Justify-Content: flex-end
Padding: 24px
Background: #FAFAFA
Border-top: 1px #E0E0E0
[Abbrechen] Button:

Text: "Abbrechen"
Style: Secondary
Background: transparent
Border: 1px #0F429F
Text-Color: #0F429F
Padding: 12px 24px
Radius: 24px
Font: Roboto Medium 14px
Hover: Background #F0F4FF
Action: Schließt Modal, zurück zu Benefits verwalten
[Weiter] Button:

Text: "Weiter"
Style: Primary
Background: #0F429F
Text-Color: white
Padding: 12px 24px
Radius: 24px
Font: Roboto Medium 14px
Hover: Background #246AFF
Disabled: Background #CCCCCC (bis kein Benefit ausgewählt)
Action: → SCHRITT 2 (Standorte wählen)
FLOW NAVIGATION
Nach [Wählen] auf Card:

Card wird "selected" (visuell markiert)
[Weiter] Button wird aktiviert (nicht mehr disabled)
User kann [Weiter] klicken oder andere Cards durchschauen
Nach [Weiter] Button:

Modal schließt oder wechselt zu SCHRITT 2
Ausgewähltes Benefit wird weitergegeben
Nächster Schritt: Standorte wählen (SCHRITT 2)
Nach [Abbrechen]:

Modal schließt
Zurück zu Benefits verwalten Seite
Keine Aktion durchgeführt
FARBEN & TOKENS
Primary Blue: #0F429F
Light Blue: #246AFF
Dark Text: #273A5F
Gray Text: #666666
Light BG: #F0F4FF
Border: #E0E0E0
Success: #4CAF50
Typography:

Title: 20px Bold #273A5F
Subtitle: 13px Regular #666666
Card Title: 14px Medium #273A5F
Card Description: 12px Regular #666666
Button: 14px Medium white (Primary) oder #0F429F (Secondary)
RESPONSIVE LAYOUT
Desktop (1200px+):

Grid: 2 Spalten
Card Width: ~240-280px
Tablet (768px-1199px):

Grid: 2 Spalten (enger)
Card Width: ~180-220px
Mobile (<768px):

Grid: 1 Spalte
Card Width: 100% (mit Padding)
Button: full-width
DELIVERY CHECKLIST
Modal Structure:
☐ Title: "Welches Benefit möchte du aktivieren?"
☐ Subtitle: "Wähle ein inaktives Benefit aus..."
☐ Benefit-Cards Grid (2 Spalten auf Desktop)

Benefit-Cards:
☐ Icon (48x48px, original Farbe, kein Overlay)
☐ Benefit-Name (14px Medium)
☐ Description/Info (12px Regular)
☐ [Wählen] Button (Primary #0F429F)
☐ Hover-State mit Shadow + Border-Color #0F429F

Selected State:
☐ Card Border: 2px #0F429F
☐ Background: #F0F4FF
☐ Button Text: "✓ Ausgewählt" (grün #4CAF50)

Bottom Buttons:
☐ [Abbrechen] Button (Secondary transparent)
☐ [Weiter] Button (Primary #0F429F)
☐ [Weiter] disabled bis Benefit ausgewählt

Icons:
☐ Alle inaktiven Benefits mit original Farben
☐ Asset-Path: /assets/benefit-icons/[name].svg
☐ KEINE #F0F4FF Overlays!

Data Filtering:
☐ Nur Benefits mit Status ⚪ Inaktiv anzeigen
☐ Aktive Benefits NICHT anzeigen
☐ Dynamisches Laden basierend auf Datenbasis

Navigation:
☐ [Abbrechen] → zurück zu Benefits verwalten
☐ [Weiter] → zu SCHRITT 2 (Standorte wählen)
☐ Selected Benefit wird an SCHRITT 2 übergeben

Responsive:
☐ Desktop: 2 Spalten
☐ Tablet: 2 Spalten (angepasst)
☐ Mobile: 1 Spalte, full-width

FERTIG FÜR FIGMA-IMPLEMENTIERUNG

Key Design Decisions:

Nur inaktive Benefits werden angezeigt (Datenbasis-Filter)
Grid-Layout mit visueller Auswahl
Clear Call-to-Action: [Wählen] und [Weiter]
Visual Feedback bei Auswahl (Border + Background + Button Color)
Nahtlose Navigation zu SCHRITT 2