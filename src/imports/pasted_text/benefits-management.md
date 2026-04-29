URL: /ag-portal/benefits-management

PAGE LAYOUT
Page Title:

Text: "Benefits verwalten" (32px Bold #273A5F)
Position: Top-left
Padding: 24px
Button oben rechts:

Text: "+ Benefit hinzufügen"
Style: Primary Button
Background: #0F429F
Text-Color: white
Padding: 12px 24px
Radius: 24px
Font: Roboto Medium 14px
Hover: Background #246AFF
Action: Startet Benefits Management Flow (SCHRITT 1 — Benefit wählen)
BENEFITS-TABELLE
Table Header:

Background: #F0F4FF
Padding: 12px 16px
Height: 40px
Font: Roboto Regular 11px
Color: #666666
Text-Transform: UPPERCASE
Spalten:

NAME (200px) — Icon (32x32px) + Name
LIMIT (120px) — Format: "100€/Monat"
STATUS (100px) — Badge: "✅ Aktiv" oder "⚪ Inaktiv"
STANDORTE (250px) — Standort-Liste (z.B. "München, Heddesheim")
AKTION (200px) — Buttons: [Bearbeiten] [⋮ Menü]
Table Body:

Height: 40px pro Zeile
Padding: 8px 16px
Font: Roboto Regular 12px
Color: #333333
Border-bottom: 1px #F0F0F0
Row Alternation:

Odd: white
Even: #FAFAFA
Row Hover:

Background: #F0F4FF
Transition: 0.2s
Cursor: pointer
BENEFIT NAME SPALTE
Icon Style:

Size: 32x32px
Original SVG-Farbe (Mittagessen #F4B860, Internet #4CAF50, etc.)
KEINE #F0F4FF Overlay!
Asset-Path: /assets/benefit-icons/[name].svg
Margin-right: 12px
Name:

Font: Roboto Regular 12px
Color: #273A5F
Vertical-align: center mit Icon
STATUS BADGE
Badge Style (Aktiv):

Background: #4CAF50
Text: "✅ Aktiv"
Color: white
Padding: 4px 12px
Radius: 12px
Font: Roboto Medium 11px
Badge Style (Inaktiv):

Background: #9E9E9E
Text: "⚪ Inaktiv"
Color: white
Padding: 4px 12px
Radius: 12px
Font: Roboto Medium 11px
STANDORTE SPALTE
Text Format:

Font: Roboto Regular 12px
Color: #666666
Text: Komma-getrennte Liste (z.B. "München, Heddesheim")
Wenn > 2 Standorte: Truncate mit "..." und Tooltip zeigt alle
Beispiel:

"München, Heddesheim" (voll angezeigt)
"München, Heddesheim, Berlin, ..." (gekürzt, Tooltip: alle 4)
AKTION-SPALTE
Button 1: [Bearbeiten]

Text: "Bearbeiten"
Style: Link-Button
Color: #0F429F
Font: Roboto Regular 12px
Hover: Color #246AFF, Underline
Action: Navigiert zu /ag-portal/benefits-management/edit/[benefit-id] (Benefit-Bearbeitungsseite)
Button 2: [⋮ Menü]

Style: Icon Button (drei Punkte vertikal)
Color: #666666
Size: 24x24px
Hover: Background #F0F4FF
Action: Öffnet Dropdown-Menü mit:
"Details anzeigen"
"Duplizieren"
"Löschen"
DROPDOWN-MENÜ (pro Zeile)
Position: Rechts oben bei Hover über [⋮]

Background: white
Border: 1px #E0E0E0
Border-Radius: 4px
Shadow: 0 2px 8px rgba(0,0,0,0.1)
Min-Width: 180px

Menu Items:

Details anzeigen

Font: Roboto Regular 13px
Color: #273A5F
Padding: 12px 16px
Hover: Background #F0F4FF
Action: Öffnet Details-Modal
Duplizieren

Font: Roboto Regular 13px
Color: #273A5F
Padding: 12px 16px
Hover: Background #F0F4FF
Action: Öffnet "Benefit duplizieren" Modal
Löschen

Font: Roboto Regular 13px
Color: #F44336 (rot)
Padding: 12px 16px
Hover: Background #FFEBEE
Action: Öffnet Bestätigungsmodal
BEISPIEL-DATEN (Tabelle)
| [Icon] Mittagessen | 100€/Monat | ✅ Aktiv | München, Heddesheim | [Bearbeiten] [⋮] |
| [Icon] Internet | 50€/Monat | ✅ Aktiv | München | [Bearbeiten] [⋮] |
| [Icon] Kindergarten | 150€/Monat | ⚪ Inaktiv | München, Berlin, Heddesheim | [Bearbeiten] [⋮] |
| [Icon] Commuting | 80€/Monat | ✅ Aktiv | München, Viernheim | [Bearbeiten] [⋮] |
| [Icon] Danke-Bonus | 100€/Monat | ✅ Aktiv | Alle | [Bearbeiten] [⋮] |

HINWEIS UNTER TABELLE
Container:

Background: #F0F4FF
Border-left: 4px #0F429F
Padding: 12px 16px
Radius: 4px
Margin-top: 24px
Text:

Font: Roboto Regular 12px
Color: #333333
Text: "Hinweis: Benefits können pro Standort aktiviert und konfiguriert werden. Änderungen gelten ab 1. nächsten Monat."
MODAL 1: BENEFIT DETAILS
Title: "[Benefit-Name] — Details"

Layout (zweispaltig oder Card-Layout):

Card 1: Grundinformationen

Benefit-Name
Beschreibung
Icon (48x48px)
Status
Card 2: Konfiguration

Verfügbare Standorte (Checkboxes)
Limits pro Standort (Tabelle)
Buttons:

[Schließen]
[Bearbeiten] → Navigiert zu Benefit-Bearbeitungsseite
MODAL 2: BENEFIT DUPLIZIEREN
Title: "Benefit duplizieren"

Label:

Font: Roboto Medium 13px
Color: #273A5F
Text: "Neuer Benefit-Name"
Margin-bottom: 8px
Input Field:

Width: 100%
Max-Width: 400px
Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular 14px
Placeholder: "z.B. Mittagessen — [Company]"
Hinweis:

Font: Roboto Regular 12px
Color: #666666
Margin-top: 16px
Text: "Das Benefit wird mit den gleichen Limits und Standorten dupliziert. Du kannst dies danach bearbeiten."
Buttons:

[Abbrechen] (Secondary)
[Duplizieren] (Primary #0F429F)
MODAL 3: BENEFIT LÖSCHEN
Icon: ⚠️ (orange, 48x48px)

Title: "Benefit löschen?"

Text:

Font: Roboto Regular 14px
Color: #333333
Text: "Möchtest du [Benefit-Name] wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
Warnung:

Font: Roboto Regular 12px
Color: #F44336
Background: #FFEBEE
Padding: 12px
Border-Radius: 4px
Margin-top: 16px
Icon: ⚠️
Text: "Mitarbeiter verlieren ab 1. nächsten Monat Zugriff auf dieses Benefit"
Buttons:

[Abbrechen] (Secondary)
[Löschen] (Danger, #F44336)
FARBEN & TOKENS
Primary Blue: #0F429F
Light Blue: #246AFF
Dark Text: #273A5F
Gray Text: #666666
Light BG: #F0F4FF
Border: #E0E0E0
Error: #F44336
Success: #4CAF50
Typography:

Page Title: 32px Bold #273A5F
Label: 13px Medium #273A5F
Table Header: 11px Regular #666666 UPPERCASE
Table Body: 12px Regular #333333
Button: 12px Regular #0F429F (Link) oder white (Primary)
RESPONSIVE LAYOUT
Desktop (1200px+):

Tabelle full-width, 5 Spalten
Tablet (768px-1199px):

Tabelle: horizontal scrollbar bei Bedarf
Spalten können schmäler werden
Mobile (<768px):

Tabelle: Card-View oder horizontal scrollbar
Buttons: volle Breite
NAVIGATION & INTEGRATION
Button "Benefit hinzufügen" (oben rechts):

Action: → Startet SCHRITT 1 des Benefits Management Flows
Flow: Benefit wählen → Standorte → Limits → Bestätigung
Button "Bearbeiten" (pro Zeile):

Action: → /ag-portal/benefits-management/edit/[benefit-id]
Ziel: Benefit-Bearbeitungsseite (separate Seite)
Dropdown Menu "Löschen":

Action: → Öffnet Bestätigungsmodal
Nach Löschen: Tabelle wird aktualisiert, Zeile verschwindet
DELIVERY CHECKLIST
Page Structure:
☐ Page Title: "Benefits verwalten"
☐ "+ Benefit hinzufügen" Button (oben rechts, Primary #0F429F)
☐ Benefits-Tabelle mit 5 Spalten

Table Columns:
☐ NAME: Icon (32x32px, original Farbe) + Name
☐ LIMIT: Format "100€/Monat"
☐ STATUS: Badges (grün Aktiv / grau Inaktiv)
☐ STANDORTE: Komma-getrennte Liste
☐ AKTION: [Bearbeiten] Link + [⋮] Menü Button

Table Styling:
☐ Header: #F0F4FF Background
☐ Row Height: 40px
☐ Alternation: white / #FAFAFA
☐ Hover: #F0F4FF Background

Icons:
☐ Alle 11 Benefits mit original SVG-Farben
☐ Asset-Path: /assets/benefit-icons/[name].svg
☐ KEINE #F0F4FF Overlays!

Buttons & Interactions:
☐ [Bearbeiten] → navigiert zu /ag-portal/benefits-management/edit/[benefit-id]
☐ [⋮ Menü] → Dropdown mit Details, Duplizieren, Löschen
☐ "+ Benefit hinzufügen" → startet Flow SCHRITT 1

Modals:
☐ Details Modal
☐ Duplizieren Modal
☐ Löschen Modal (mit Warnung)

Hinweis:
☐ "Änderungen gelten ab 1. nächsten Monat" wird angezeigt

Responsive:
☐ Desktop: full-width Tabelle
☐ Tablet: horizontal scrollbar
☐ Mobile: Card-View oder Scrollbar

FERTIG FÜR FIGMA-IMPLEMENTIERUNG

Key Integration Points:

[Bearbeiten] Link → /ag-portal/benefits-management/edit/[benefit-id] (zur Benefit-Bearbeitungsseite)
"+ Benefit hinzufügen" → Benefits Management Flow SCHRITT 1
Dropdown Menü mit Duplizieren + Löschen Optionen
Alle Icons mit original Farben (KRITISCH!)