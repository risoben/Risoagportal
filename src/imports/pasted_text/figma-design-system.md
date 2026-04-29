FIGMA DESIGN SYSTEM: AG-Portal — Navigation, Tabellen, Icons, Locations, Workflows

PART 1: NAVIGATION MENU (DEUTSCH — KORRIGIERT)

Top Bar (Weiß — unverändert)

Height: 64px
Background: White #FFFFFF
Border-bottom: 1px #E0E0E0
Padding: 0 24px
Display: flex, Align-Items: center, Justify-Content: space-between
Logo: Riso_Blue_Logo.svg

Size: 32x32px
Color: #0F429F (original SVG)
Margin-right: 16px
Clickable: ja → Links zur Übersicht
Text: "Arbeitgeber-Portal"

Font: Roboto Bold 16px
Color: #273A5F
Right Section: User Initials Badge (40x40px, Background #0F429F, Text white)

Navigation Menu Sidebar (Dunkelblau)

Background: #273A5F
Width: 260px
Height: calc(100vh - 64px)
Padding: 24px 12px
Font: Roboto Regular 14px
Menu Items (KEINE SUBMENÜS):

📊 Übersicht
👥 Mitarbeiter
💰 Benefits
📍 Standorte
📋 Berichte
⚙️ Verwaltung
❓ Hilfe

Menu Item States:

Inactive: Color #FFFFFF, Background transparent
Active: Color white, Background #0F429F, Bold
Hover: Background rgba(255,255,255,0.1)
Icon Sizes: 16x16px, Margin-right: 12px

PART 2: EINHEITLICHE TABELLENFORMATIERUNG

Table Container:

Border: 1px #E0E0E0
Border-Radius: 8px
Background: white
Overflow: hidden
Table Header:

Background: #F0F4FF
Border-bottom: 1px #E0E0E0
Padding: 12px 16px
Height: 40px
Font: Roboto Regular 11px
Color: #666666
Text-Transform: UPPERCASE
Letter-Spacing: 0.5px
Table Body Rows:

Height: 40px
Padding: 8px 16px
Font: Roboto Regular 12px
Color: #333333
Border-bottom: 1px #F0F0F0
Row Alternation:

Odd Rows (1, 3, 5...): Background white
Even Rows (2, 4, 6...): Background #FAFAFA
Row Hover:

Background: #F0F4FF
Transition: smooth 0.2s
Text Overflow (lange Namen):

text-overflow: ellipsis
white-space: nowrap
Tooltip on hover mit vollständigem Text
Euro-Format in Tabellen:

Rechts-aligniert
Punkt als Tausender: 4.200,50€
2 Dezimalstellen
PART 3: BENEFIT ICONS — IMPLEMENTATION MATRIX

Icon Assets & Original Colors:

Mittagessen: Mittagessen.svg → #F4B860 (Orange)
Sachbezug: Sachbezug.svg → #E91E63 (Pink)
Danke-Bonus: Danke-Bonus.svg → #4CAF50 (Grün)
Internet: Internet.svg → #4CAF50 (Grün)
Kindergarten: Kindergarten.svg → #FF6B6B (Orange-Rot)
Geburtstag: Geburtstag.svg → #FFC107 (Gold)
Erholung: Erholung.svg → #2196F3 (Blau)
Commuting: Commuting.svg → #4CAF50 (Grün)
ÖPNV: ÖPNV.svg → #2196F3 (Blau)
BKV: BKV.svg → #0F429F (Riso Blue) [zu erstellen]
BAV: BAV.svg → #8E44AD (Lila) [zu erstellen]
Icon Sizing Rules:

Benefits Overview Cards: 48x48px, white BG (no overlay)
Dashboard KPI Cards: 48x48px, #F0F4FF container
Benefit Management List: 32x32px, white BG (no overlay)
Reports Tab Checkboxes: 24x24px, white BG (no overlay)
Benefit Creation Modal: 32x32px, white BG (no overlay)
Inline (Breadcrumbs, Tags): 16x16px, white BG (no overlay)
WICHTIG: KEINE #F0F4FF OVERLAYS außer Dashboard KPI Cards
Alle Icons zeigen Original-SVG-Farben, nie umgefärbt

PART 4: LOCATIONS-SEITE INTEGRIEREN

Ebene 1: Locations-Übersicht

Title: "Standorte" (32px Bold #273A5F)
Button oben rechts: "Standort erstellen" (Primary, Radius 24px, #0F429F)

Tabelle mit Spalten:

NAME (Links-aligniert)
TYP (Standort / Tochterunternehmen)
MITARBEITER (Rechts-aligniert, Zahl)
BUDGET/MONAT (Rechts-aligniert, 4.200€ Format)
GENUTZT DIESE MONAT (Rechts-aligniert, Euro)
STATUS (Center, Badge: grün "Aktiv" / grau "Inaktiv")
AKTION (Button "Öffnen")
Tabelle Formatierung: wie PART 2 (Header #F0F4FF, Rows white/#FAFAFA, Hover #F0F4FF)

Beispiel-Daten:
| Heddesheim | Standort | 34 | 4.200€ | 3.100€ | ✅ Aktiv | [Öffnen] |
| GmbH A | Tochterunternehmen | 15 | 1.800€ | 900€ | ✅ Aktiv | [Öffnen] |
| Viernheim | Standort | 12 | 2.500€ | 1.200€ | ✅ Aktiv | [Öffnen] |

Ebene 2: Location-Details (Modal oder separate Seite)

Header:

Back Button "← Standorte"
Location-Name (20px Bold #273A5F)
Typ-Badge (grau, klein)
Aktiv/Inaktiv Toggle (rechts)
3 Tabs (Roboto Regular 14px):
[Benefits] [Mitarbeiter] [Übersicht]

TAB 1: Benefits

Title: "Benefits für [Location-Name]"
Button: "Benefit hinzufügen" (Primary #0F429F)

List mit Benefits:

[Icon 32x32] Mittagessen | Limit: 100€/Monat | Toggle: ON | [Bearbeiten] [⋮]
[Icon 32x32] Internet | Limit: 50€/Monat | Toggle: ON | [Bearbeiten] [⋮]
[Icon 32x32] Kindergarten | Limit: 150€/Monat | Toggle: OFF | [Bearbeiten] [⋮]
Hinweis: "Neue Benefits gelten ab 1. nächsten Monat für alle Mitarbeiter dieser Location."

TAB 2: Mitarbeiter

Title: "Mitarbeiter in [Location-Name]"
Button: "Mitarbeiter zuordnen" (Primary #0F429F)
Search Field: "Nach Name oder Personennummer suchen"

Tabelle:

PERSONENNUMMER (Links)
NAME (Links)
ABTEILUNG (Links)
STATUS (Center, Badge)
AKTION (Button "Entfernen")
Tabelle Formatierung: wie PART 2

Hinweis: "Mitarbeiter-Änderungen gelten ab 1. nächsten Monat. Location-Wechsel werden als weiche Migration durchgeführt."

TAB 3: Übersicht

Title: "Budget-Übersicht [Location-Name]"

3 KPI-Cards (nebeneinander):

Gesamtbudget: "4.200€"
Genutzt (diese Monat): "3.100€"
Übrig: "1.100€"
Auslastung: "73.8%"
Icons (48x48px in #F0F4FF Containern):

Geldbeutel (#0F429F)
Grüner Haken (#4CAF50)
Grauer Punkt (#999999)
Prozent-Diagramm (#0F429F)
Chart: Stacked Columns (12 Monate, rollierend)

Dunkelblau: Verfügbares Budget
Hellblau: Genutztes Budget
Hover-Tooltip mit Werten + Prozent
PART 5: BENEFIT HINZUFÜGEN — LOCATION SELECTION WORKFLOW

Ausgangspunkt: User klickt "Benefit hinzufügen" in Location-Details

SCHRITT 1: BENEFIT WÄHLEN

Title: "Welches Benefit möchte du hinzufügen?"

Grid von Benefit-Cards (2 Spalten):
┌──────────────────┐ ┌──────────────────┐
│ [Icon 48x48]     │ │ [Icon 48x48]     │
│ Mittagessen      │ │ Internet         │
│ [Wählen]         │ │ [Wählen]         │
└──────────────────┘ └──────────────────┘

Buttons unten:
[Abbrechen] [Weiter]

SCHRITT 2: STANDORTE WÄHLEN (FALLS GLOBAL BENEFIT)

Title: "Für welche Standorte soll [Benefit] verfügbar sein?"

Checkboxes:
☐ München (8 Mitarbeiter)
☐ Berlin (5 Mitarbeiter)
☐ Heddesheim (34 Mitarbeiter)
☐ Viernheim (12 Mitarbeiter)

Button: [Alle wählen]

Hinweis: "Neue Benefits gelten ab 1. nächsten Monat für alle zugeordneten Mitarbeiter dieser Standorte."

Buttons:
[Zurück] [Weiter] (Weiter disabled bis ≥1 ausgewählt)

SCHRITT 3: LIMITS KONFIGURIEREN

Title: "Limits pro Standort"
Subtitle: "Benefit: [Benefit-Name]"

Input Fields pro ausgewählter Location:
München: [] € / Monat
Heddesheim: [] € / Monat

Input-Feld Style:

Width: 200px
Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular 14px
Placeholder: "z.B. 100"
Suffix: "€ / Monat"
Validation:

Leer: Error "Feld erforderlich"
Negativ: Error "Betrag kann nicht negativ sein"
9999: Warning "Sehr hoher Betrag — OK?"

Hinweis: "Pro Standort kann ein eigenes Limit gesetzt werden. Neue Mitarbeiter erhalten das Limit für ihren Standort."

Buttons:
[Zurück] [Speichern]

SCHRITT 4: BESTÄTIGUNG

Icon: ✅ (grün)
Title: "Benefit hinzugefügt"

Text:
"[Benefit-Name] wurde hinzugefügt für:
• München: 100€ / Monat
• Heddesheim: 85€ / Monat

Gültig ab: 1. Mai 2026"

Button: [Schließen]

PART 6: VERWALTUNG PAGE (statt Settings)

Diese Seite wurde von "Settings" umbenannt zu "Verwaltung" und hat KEINE TABS mehr.

Title: "Verwaltung" (32px Bold #273A5F)

2 Sections (Card-Layout):

SECTION 1: Allgemeine Informationen

Firmenname: [Text, read-only]
Adresse: [Text, read-only]
Postleitzahl: [Text, read-only]
Stadt: [Text, read-only]
Umsatzsteuer-ID: [Text, read-only]
Ansprechpartner: [Text, read-only]
Telefonnummer: [Text, read-only]
SECTION 2: Berichte & Exports

Label: "Berichte"

Checkboxes (11 Benefits):
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

Standorte in Exporten enthalten:
☐ Alle
☐ München
☐ Berlin
☐ Heddesheim
☐ Viernheim

Exporttyp bezüglich Standorte:
◉ Alle Standorte in einem Report
◯ Einzelnen Report pro Standort

Button: "Einstellungen speichern" (Primary #0F429F)

PART 7: FARBPALETTE

Primary Blue: #0F429F
Light Blue: #246AFF
Light BG: #F0F4FF
Dark Text: #273A5F
Gray Text: #666666
Light Gray BG: #F9FAFB
Table Alternation: #FAFAFA
Border Gray: #E0E0E0
Success Green: #4CAF50
Error Red: #F44336

PART 8: TYPOGRAFIE (Roboto)

Page Title: 32px Bold #273A5F
Section Header: 20px Bold #273A5F
Table Header: 11px Regular #666666 UPPERCASE
Body Text: 12px / 14px Regular #333333
Helper Text: 11px / 12px Regular #999999
Button Text: 14px Medium

PART 9: KONSISTENZ-CHECKLISTE

Navigation:
☐ Sidebar: #273A5F Background
☐ Text: white
☐ Active Item: Background #0F429F, Bold
☐ Top Bar: white (unverändert)
☐ Logo: 32x32px, #0F429F, clickable
☐ KEINE Submenüs

Tabellen überall gleich:
☐ Header: #F0F4FF, UPPERCASE, 40px
☐ Rows: 40px, white/#FAFAFA alternation
☐ Hover: #F0F4FF
☐ Padding: 8px 16px
☐ Borders: 1px #E0E0E0

Benefit Icons:
☐ Original-Farben (keine Overlays außer KPI Cards)
☐ Größen: 48px (Cards), 32px (Management), 24px (Reports), 16px (Inline)
☐ Keine Farbveränderungen

Locations-Seite:
☐ Übersicht mit Tabelle + Button "Standort erstellen"
☐ Location-Details mit 3 Tabs (Benefits, Mitarbeiter, Übersicht)
☐ Benefit hinzufügen: 4-Schritt-Flow mit Standort-Selection vor Limits
☐ Hinweise: "Gültig ab 1. nächsten Monat"

Verwaltung (war Settings):
☐ KEIN Tab-Navigation
☐ 2 Sections: Allgemeine Infos + Berichte & Exports
☐ 11 Benefit-Checkboxes
☐ Standorte-Section mit Radio-Buttons für Export-Typ

PAGES ZUM UPDATEN

Dashboard / Übersicht:
✅ KPI Icons 48x48px
✅ Chart Title: "Gesamtbudget und Nutzung (pro Monat)"
✅ Table Formatting (Mitarbeiter + Berichte)

Mitarbeiter:
✅ Table Formatting
✅ CSV-Import Modal

Standorte:
🟡 Locations-Übersicht (Tabelle + Button)
🟡 Location-Details (3 Tabs)
🟡 Benefit hinzufügen Flow (4 Schritte)

Berichte:
✅ Table Formatting
✅ Benefit Checkboxes mit 24px Icons

Verwaltung:
🟡 Allgemeine Infos Section
🟡 Berichte & Exports Section (11 Checkboxes + Export-Typ)

Benefits:
✅ Overview (Icons 48x48px)
✅ Management mit Location Selection Flow (Icons 32x32px)

Navigation:
🟡 Sidebar dunkelblau #273A5F
🟡 Menü Items in Deutsch (Übersicht, Verwaltung, etc.)
🟡 KEINE Submenüs

DELIVERY CHECKLIST

Vor Upload zu Figma:
☐ Alle Tabellen gleich formatiert (Header #F0F4FF, Rows 40px)
☐ Logo 32x32px, clickable nur in Top Bar
☐ Navigation: #273A5F Sidebar, white Top Bar
☐ Benefit Icons: Original-Farben, keine Overlays (außer KPI Cards)
☐ Locations-Seite: Übersicht + Details (3 Tabs) + Flow
☐ Verwaltung: keine Tabs, 2 Sections
☐ Benefits: KEINE Submenü-Items in Navigation
☐ Location Selection: vor Limits konfigurieren
☐ Alle Hinweise: "Gültig ab 1. nächsten Monat"

Rückmeldung Screenshots:
☐ Navigation (Deutsch, #273A5F Sidebar)
☐ Locations-Seite Übersicht
☐ Locations-Details: 3 Tabs sichtbar
☐ Verwaltung Page (Allgemeine Infos + Berichte)
☐ Benefit Icons in verschiedenen Größen