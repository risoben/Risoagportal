FIGMA DESIGN PROMPT: Dashboard (Final) — Detail-Feedback Integration

PART 1: KPI-CARDS (3 oben)

Container:

Display: flex
Gap: 24px
Padding: 24px
Jede Card:

Background: white
Border: 1px #E0E0E0
Border-Radius: 12px
Padding: 24px
Min-Width: 300px
Hover: Shadow 0 4px 12px rgba(0,0,0,0.08)
CARD 1: GESAMTBUDGET

Icon:

Symbol: € (Eurozeichen, NICHT Dollar!)
Size: 48x48px (ALLE Icons gleich groß!)
Color: #0F429F
Container Background: #F0F4FF (light circle)
Position: LINKSBÜNDIG, aber VERTIKAL ZENTRIERT in der Box
Margin-bottom: 16px
Title:

Font: Roboto Regular 12px
Color: #666666
Text: "Gesamtbudget"
Value:

Font: Roboto Bold 32px
Color: #273A5F
Text: "1.250.000€"
Link:

Font: Roboto Regular 12px
Color: #0F429F
Text: "Zu Benefits →"
Action: → Benefits-Seite
CARD 2: REGISTRIERTE NUTZER

Icon:

Symbol: 👥
Size: 48x48px (GLEICH groß wie Eurozeichen!)
Color: #0F429F
Container Background: #F0F4FF
Position: LINKSBÜNDIG, VERTIKAL ZENTRIERT
Margin-bottom: 16px
Title:

Font: Roboto Regular 12px
Color: #666666
Text: "Registrierte Nutzer" (NICHT "Eingetragener Nutzer")
Value:

Font: Roboto Bold 32px
Color: #273A5F
Text: "87"
Link:

Font: Roboto Regular 12px
Color: #0F429F
Text: "Zu Mitarbeitern →"
Action: → Mitarbeiter-Seite
CARD 3: BERICHTE (Gesamtanzahl!)

Icon:

Symbol: 📄
Size: 48x48px (GLEICH groß!)
Color: #0F429F
Container Background: #F0F4FF
Position: LINKSBÜNDIG, VERTIKAL ZENTRIERT
Margin-bottom: 16px
Title:

Font: Roboto Regular 12px
Color: #666666
Text: "Berichte" (OHNE "diesen Monat"!)
Value:

Font: Roboto Bold 32px
Color: #273A5F
Text: "24" (Gesamtanzahl aller Berichte, nicht nur diesen Monat!)
Link:

Font: Roboto Regular 12px
Color: #0F429F
Text: "Zu Berichten →"
Action: → Reports-Seite
PART 2: CHART — GESAMTBUDGET UND NUTZUNG

Chart Title:

Text: "Gesamtbudget und Nutzung (pro Monat)" (GEÄNDERT!)
Font: Roboto Bold 16px
Color: #273A5F
Margin-bottom: 16px
Chart Type: Stacked Columns

Datenreihen:

Dunkelblau (#0F429F): Verfügbares Budget
Hellblau (#246AFF): Genutztes Budget
X-Achse (Monate):

Display: Rollierend letzte 12 Monate (NICHT Jan-Dez des aktuellen Jahres!)
Format: "Januar 2026", "Februar 2026", ..., "Dezember 2026"
Beispiel: Wenn heute April 2026 ist:
Mai 2025, Juni 2025, Juli 2025, ..., April 2026
Label Format: "Mai 2025", "Juni 2025", etc. (Monat + Jahr!)

Y-Achse (Werte):

Format: "1.25M€", "500K€" (wie in den Anforderungen)
Oder: "1.250.000€", "500.000€" (mit Punkt als Tausender)
Hover-Tooltip (WICHTIG!):

Format: "Mai 2025" (Monat + Jahr!)
Verfügbares Budget: 1.000.000€
Genutztes Budget: 750.000€
Verbleibender Budget: 250.000€
Auslastung: 75%
Legende:

Dunkelblau: "Verfügbares Budget"
Hellblau: "Genutztes Budget"
PART 3: MITARBEITER-LISTE

Title:

Font: Roboto Bold 16px
Color: #273A5F
Text: "Mitarbeiter"
Table Header:

Background: #F0F4FF
Padding: 12px 16px
Height: 40px
Font: Roboto Regular 11px
Color: #666666
Text-Transform: UPPERCASE
Spalten:

PERSONENNUMMER (80px)
NAME (150px)
ABTEILUNG (120px)
STATUS (100px, center)
AKTION (80px)
Zeige aktive UND inaktive Mitarbeiter!

Spalte "NAME" — Länge handhaben:

Text-Overflow: ellipsis
white-space: nowrap
Tooltip on hover mit vollständigem Namen
Max-Width: 150px
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
Beispiel-Daten:
| 1001 | Schmidt, Anna | Vertrieb | ✅ Aktiv | [Bearbeiten] |
| 1002 | Müller, Johannes | IT | ✅ Aktiv | [Bearbeiten] |
| 1003 | Weber, Lara | Finanzen | ⚪ Inaktiv | [Bearbeiten] |

"Alle Mitarbeiter anzeigen" Link unten

PART 4: BERICHTE-LISTE

Title:

Font: Roboto Bold 16px
Color: #273A5F
Text: "Berichte"
Table Header:

Background: #F0F4FF
Padding: 12px 16px
Height: 40px
Font: Roboto Regular 11px
Color: #666666
Text-Transform: UPPERCASE
Spalten (aktualisiert!):

DATUM (100px)
MONAT (80px)
ERSTELLUNGSDATUM (120px)
VERSION (80px)
DATEITYP (80px)
DATEINAME (200px) ← BREITER!
ANSEHEN (80px)
HERUNTERLADEN (80px)
CHECKBOX-SPALTE ENTFERNEN! ❌
Massen-Download nur auf der Reports-Seite, nicht im Dashboard!

Spalte "DATEINAME" — Länge handhaben:

Width: 200px (nicht weniger!)
Text-Overflow: ellipsis
white-space: nowrap
Tooltip on hover mit vollständigem Dateinamen
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
Buttons:

[Ansehen] (Secondary, 14px)
[Herunterladen] (Primary #0F429F, 14px)
Beispiel-Daten:
| 15.04.2026 | April | 14.04.2026 14:30 | v2.1 | PDF | Abrechnung_April_2026_Final.pdf | [Ansehen] | [Herunterladen] |
| 14.03.2026 | März | 13.03.2026 09:15 | v1.0 | Excel | Budget_Übersicht_März_2026.xlsx | [Ansehen] | [Herunterladen] |

"Alle Berichte anzeigen" Link unten

PART 5: FARBEN & TOKENS

Colors:

Primary Blue: #0F429F
Light Blue: #246AFF
Light BG: #F0F4FF
Dark Text: #273A5F
Gray Text: #666666
Table Alternation: #FAFAFA
Border: #E0E0E0
Typography:

Title: 16px Bold #273A5F
Label: 12px Regular #666666
Value: 32px Bold #273A5F
Link: 12px Regular #0F429F
Table Header: 11px Regular #666666 UPPERCASE
Table Body: 12px Regular #333333
PART 6: RESPONSIVE LAYOUT

Desktop (1200px+):

3 KPI-Cards horizontal
Charts full-width
Tabellen full-width
Tablet (768px-1199px):

3 KPI-Cards: angepasstes Layout
Tabellen: horizontal scrollbar bei Bedarf
Mobile (<768px):

1 KPI-Card pro Zeile (vertikal)
Tabellen: horizontal scrollbar oder Card-View
DELIVERY CHECKLIST

KPI-Cards:
☐ Icon 1: € (Eurozeichen) statt Dollar
☐ Alle Icons: 48x48px (gleich groß)
☐ Icons: LINKSBÜNDIG, aber VERTIKAL ZENTRIERT
☐ "Eingetragener Nutzer" → "Registrierte Nutzer"
☐ "diesen Monat" entfernt → Gesamtanzahl Berichte
☐ Links korrekt verlinkt (€ → Benefits, 👥 → Mitarbeiter, 📄 → Berichte)

Chart:
☐ Titel: "Gesamtbudget und Nutzung (pro Monat)"
☐ Rollierend letzte 12 Monate (nicht Jan-Dez)
☐ Tooltip mit Monat + Jahr ("Mai 2025")
☐ Auslastung % in Tooltip

Mitarbeiter-Tabelle:
☐ Spalten korrekt (Personennummer, Name, Abteilung, Status, Aktion)
☐ Aktiv + inaktiv Mitarbeiter anzeigen
☐ Lange Namen: ellipsis + tooltip
☐ Alternation: white / #FAFAFA

Berichte-Tabelle:
☐ Spalten: Datum, Monat, Erstellungsdatum, Version, Dateityp, Dateiname, Ansehen, Herunterladen
☐ CHECKBOX-SPALTE ENTFERNT ❌
☐ DATEINAME: 200px breit
☐ Lange Dateinamen: ellipsis + tooltip
☐ Alternation: white / #FAFAFA

FERTIG FÜR FIGMA-IMPLEMENTIERUNG

Key Changes:

€ Icon statt Dollar
Icons: 48x48px, gleich groß
"Registrierte Nutzer"
Berichte: Gesamtanzahl
Chart: rollierend 12 Monate + Jahr im Tooltip
Dateiname: 200px breit
Checkbox-Spalte: ENTFERNT
Lange Namen: ellipsis + tooltip