🎨 FIGMA DESIGN SPECIFICATION: Dashboard (Finales Update - Detail-Feedback implementiert)

KONTEXT: Dashboard AG-Portal mit allen Detail-Feedback Korrektionen
Datum Feedback: 2026-04-23

═══════════════════════════════════════════════════════════════

SECTION 1: KPI-CARDS (3 Boxen oben)

CARD LAYOUT (3 Cards im Grid):
- Display: grid, grid-template-columns: repeat(3, 1fr)
- Gap: 24px
- Margin-bottom: 32px

CARD STYLING (alle identisch):
- Background: White
- Border: 1px #E0E0E0
- Border-Radius: 12px
- Padding: 24px
- Hover: Box-Shadow 0 4px 16px rgba(0,0,0,0.1)

CARD CONTENT (flex layout):
- Display: flex
- Align-items: center (VERTIKAL ZENTRIERT)
- Gap: 16px
- Justify-content: space-between

ICON AREA (linksbündig):
- Position: left side
- ALL ICONS: 48x48px (SAME SIZE — wichtig!)
- Icon Container Background: #F0F4FF
- Border-Radius: 8px
- Padding: 8px
- Vertical Alignment: center (vertikale Mitte der Card)

TEXT AREA (rechts):
- Display: flex, flex-direction column, gap 4px

═══════════════════════════════════════════════════════════════

CARD 1: Gesamtbudget

ICON:
- Asset: EUR Symbol (€) — 48x48px, Color #0F429F
- Background: #F0F4FF
- ❌ NICHT Dollar-Zeichen ($)
- ✅ Euro-Zeichen (€) verwenden
- Vertically centered in card

TITLE: "Gesamtbudget (Jahr)" (Roboto Medium, 13px, #666666)
VALUE: "1.250.000€" (Roboto Bold, 20px, #273A5F)
FORMAT: Punkt als Tausender, Euro am Ende, kein Leerzeichen

CLICKABLE: Ja → Link zu Benefits-Seite
Cursor: pointer
Hover: Slight scale 1.02x

═══════════════════════════════════════════════════════════════

CARD 2: Mitarbeiter

ICON:
- Asset: 👥 (People Icon) — 48x48px, Color #0F429F
- Background: #F0F4FF
- SAME SIZE als Card 1 (48x48px!)
- Vertically centered

TITLE: "Registrierte Nutzer" (Roboto Medium, 13px, #666666)
- ✅ GEÄNDERT von "Eingetragener Nutzer"
VALUE: "87" (Roboto Bold, 20px, #273A5F)

CLICKABLE: Ja → Link zu Mitarbeiter-Seite

═══════════════════════════════════════════════════════════════

CARD 3: Berichte

ICON:
- Asset: 📄 (Document Icon) — 48x48px, Color #0F429F
- Background: #F0F4FF
- SAME SIZE als Card 1 & 2 (48x48px!)
- Vertically centered

TITLE: "Berichte" (Roboto Medium, 13px, #666666)
- ✅ "diesen Monat" ENTFERNT
- ✅ Nur Gesamtanzahl aller Berichte
- Hinweis in Anweisungen: "Dies ist die Gesamtanzahl aller Berichte, nicht begrenzt auf einen Monat"

VALUE: "24" (Roboto Bold, 20px, #273A5F)

CLICKABLE: Ja → Link zu Berichte-Seite

═══════════════════════════════════════════════════════════════

SECTION 2: GESAMTBUDGET CHART

TITLE: "Gesamtbudget und Nutzung (pro Monat)" (Roboto Bold, 14px, #273A5F)
- ✅ GEÄNDERT von "Gesamtbudget (Jahr)"
- Hinzufügung "(pro Monat)" zeigt Granularität

CHART TYPE: Stacked Column Chart, 12 Monate

X-AXIS (Monate):
- Format: "Januar 2026", "Februar 2026", etc.
- ✅ Mit Jahreszahl
- Font: Roboto Regular, 11px, #666666
- Rotation: -45° (diagonal für Lesbarkeit)

ROLLING 12-MONTHS LOGIC:
- ✅ ROLLIERING (nicht ab Januar)
- Wenn April → zeigt: Mai 2025, Juni 2025, ..., April 2026
- Wenn Januar → zeigt: Februar 2025, März 2025, ..., Januar 2026
- Immer die letzten 12 Monate anzeigen

Y-AXIS (Werte):
- Format: "500.000€", "1.000.000€", "1.500.000€"
- Font: Roboto Regular, 11px, #666666
- Increment: 500.000€

COLUMNS:
- Dunkelblau (#0F429F): Verfügbares Budget
- Hellblau (#246AFF): Genutztes Budget
- Stacked nebeneinander pro Monat

LEGEND:
- "Verfügbares Budget" (dunkelblau), "Genutztes Budget" (hellblau)
- Roboto Regular, 12px, #333333
- Positioned: Oben rechts oder unten

HOVER/TOOLTIP (WICHTIG!):
- Trigger: Mouse-Over auf Column
- Display: Tooltip mit:
  - Monat mit JAHRESZAHL (z.B. "Januar 2026")
  - ✅ Jahreszahl hinzugefügt (nicht nur "Januar")
  - Verfügbares Budget: "X.XXX.XXX€"
  - Genutztes Budget: "X.XXX.XXX€"
  - Verbleibender Budget: "X.XXX.XXX€"
  - Prozentuale Nutzung: "40.8%"
- Background: White, Border 1px #E0E0E0, Shadow subtle
- Font: Roboto Regular, 11px, #333333
- Animation: Fade in 0.2s

═══════════════════════════════════════════════════════════════

SECTION 3: MITARBEITER-LISTE

TITLE: "Aktive Mitarbeiter" (Roboto Bold, 14px, #273A5F)

TABLE HEADER:
- Background: #F0F4FF
- Border-bottom: 1px #E0E0E0
- Padding: 12px 16px
- Font: Roboto Regular, 11px (UPPERCASE), #666666

COLUMNS:
1. Personennummer (80px)
2. Name (180px - BREITER als aktuell für lange Namen)
3. Abteilung (120px)
4. Status (100px)
5. Bearbeiten (60px)

TABLE ROWS:
- Height: 40px
- Padding: 12px 16px
- Border-bottom: 1px #F0F0F0
- Alternation: white / #FAFAFA
- Hover: Background #F0F4FF

NAME COLUMN:
- Font: Roboto Regular, 12px, #333333
- Text-Overflow: ellipsis (bei lange Namen)
- White-Space: nowrap
- Width: 180px (ERHÖHT für bessere Lesbarkeit)

LONG NAME HANDLING:
- ✅ Text wird NICHT automatisch angepasst
- ✅ Ellipsis (...) wenn Text länger als Spaltenbreite
- Tooltip auf Hover zeigt vollständigen Namen

STATUS BADGE:
- Grün (#4CAF50) für "Aktiv"
- Grau (#9E9E9E) für "Inaktiv"
- Radius: 12px, Padding: 4px 8px

AKTION-BUTTON:
- "Bearbeiten" (Secondary link style)
- Font: Roboto Regular, 12px, #0F429F
- Hover: Underline, Color #246AFF
- Cursor: pointer

PAGINATION/LINK:
- "Alle Mitarbeiter anzeigen" (Roboto Regular, 12px, #0F429F)
- Position: Under table
- Margin-top: 16px
- Hover: Underline

═══════════════════════════════════════════════════════════════

SECTION 4: BERICHTE-LISTE

TITLE: "Berichte" (Roboto Bold, 14px, #273A5F)

TABLE HEADER:
- Background: #F0F4FF
- Same styling as Mitarbeiter-Liste

COLUMNS:
1. ~~Checkbox~~ ❌ ENTFERNEN (kein Massen-Download im Dashboard nötig)
2. Datum (100px)
3. Monat (80px)
4. Erstellungsdatum (120px)
5. Version (80px)
6. Dateityp (80px)
7. Dateiname (200px - ERHÖHT, war zu kurz)
8. Aktion (100px)

TABLE ROWS:
- Height: 40px
- Same styling as Mitarbeiter-Liste

DATEINAME COLUMN:
- Font: Roboto Regular, 12px, #333333
- Width: 200px (ERHÖHT für lange Dateinamen)
- Text-Overflow: ellipsis
- Tooltip auf Hover zeigt vollständigen Namen
- ✅ More space available (Checkbox entfernt)

AKTION-BUTTONS:
- "Ansehen" (Secondary, Radius 24px)
- "Herunterladen" (Primary, Radius 24px)
- Spacing: 8px between buttons
- Hover: Opacity 0.9

LONG FILENAME HANDLING:
- ✅ Text wird NICHT automatisch angepasst
- ✅ Ellipsis (...) wenn Text länger
- Tooltip zeigt: "Riso_Report_Benefits_2026_Maerz_Heddesheim.pdf" (full name)

PAGINATION/LINK:
- "Alle Berichte anzeigen" (Roboto Regular, 12px, #0F429F)
- Position: Under table

═══════════════════════════════════════════════════════════════

ICON SIZING REFERENCE (Alle gleich!):

Card 1 Icon (Budget): 48x48px (€)
Card 2 Icon (Mitarbeiter): 48x48px (👥)
Card 3 Icon (Berichte): 48x48px (📄)

ALL SAME SIZE — keine Größenunterschiede!
ALL Icon Containers: #F0F4FF, Padding 8px, Radius 8px
ALL vertically centered in their Cards

═══════════════════════════════════════════════════════════════

RESPONSIVE:

Tablet (1024px):
- KPI-Cards: grid-template-columns repeat(2, 1fr) + 1 full row
- Table Columns: proportional reduction, Dateiname 150px
- Chart: Smaller, scrollable if needed

Mobile (375px):
- KPI-Cards: 1 column
- Tables: Horizontal scroll
- Icons: 40x40px
- Columns: Dateiname 100px (mit Ellipsis)

═══════════════════════════════════════════════════════════════

ZUSAMMENFASSUNG ÄNDERUNGEN:

✅ Icon Euro-Zeichen (€) statt Dollar ($)
✅ Alle Icons 48x48px (SAME SIZE)
✅ Icons vertikal zentriert in Cards
✅ "Eingetragener Nutzer" → "Registrierte Nutzer"
✅ Berichte: nur Gesamtanzahl (kein "diesen Monat")
✅ Chart-Hover: Jahreszahl neben Monat
✅ Chart: Rollierend (letzte 12 Monate)
✅ Chart-Titel: "Gesamtbudget und Nutzung (pro Monat)"
✅ Checkbox-Spalte in Berichte entfernt (kein Massen-Download im Dashboard)
✅ Dateiname-Spalte breiter (200px)
✅ Lange Namen: Ellipsis + Tooltip (nicht automatisch angepasst)
✅ Name-Spalte breiter (180px für lange Mitarbeiternamen)

═══════════════════════════════════════════════════════════════
