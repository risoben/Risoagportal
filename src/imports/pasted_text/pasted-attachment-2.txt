🎨 FIGMA DESIGN SPECIFICATION: Massenimport Modal

KONTEXT: Modal für CSV-Import von Mitarbeitern. Zwei Phasen: Upload (Phase 1) → Validierungsergebnisse (Phase 2).

BOARD-SETUP:
- Frame-Name: "Massenimport Modal"
- Frame-Größe: 900x800px (Desktop)
- Background: White #FFFFFF
- Corner Radius: 12px
- Shadow: 0 10px 40px rgba(0,0,0,0.12)

═══════════════════════════════════════════════════════════════

PHASE 1: UPLOAD & HELP (Initial State)

HEADER AREA (Höhe: 56px)
- Background: White
- Border-bottom: 1px #E0E0E0
- Padding: 16px 24px
- Title: "Mitarbeiter importieren" (Roboto Bold, 24px, #273A5F)
- Close Button (X): 24px, #666666, top-right

CONTENT AREA (Padding: 24px)

HELP-BOX
- Background: #F9FAFB
- Border: 1px #E0E0E0
- Corner Radius: 8px
- Padding: 16px
- Title: "Massenimport von Riso-Mitarbeitern" (Roboto Medium, 13px, #333333)
- Bullet-Liste (Roboto Regular, 12px, #666666, line-height 1.6):
  • Bestandteil des CSV-Import für Mitarbeiter — speichert neue und aktualisiert bestehende Einträge.
  • Speichere die Datei als CSV-Format (UTF-8 Encoding). Umlaute werden unterstützt.
  • Die CSV-Datei muss diese Spalten enthalten: Personennummer, Name, Abteilung, Email, Geburtstag, Location
  • Fehler und Fehlermeldungen werden nach dem Upload angezeigt. Du kannst die Fehler korrigieren und nochmal hochladen.
  • Solltest du weitere Fragen haben, schreib uns: support@riso-app.de oder nutze den Chat-Support unten rechts.

UPLOAD-AREA
- Background: #F0F4FF
- Border: 2px dashed #0F429F
- Corner Radius: 12px
- Padding: 32px
- Height: 280px
- Flex: center, column, gap 12px
- Icon: 📄 (48x48px, Color #0F429F)
- Text 1: "CSV-Datei hier ablegen" (Roboto Medium, 16px, #273A5F)
- Text 2: "Klick zum Hochladen" (Roboto Regular, 14px, #666666, margin-top 8px)
- Text 3: "Nur CSV-Dateien, max. 10 MB" (Roboto Regular, 12px, #999999, margin-top 8px)
- States:
  - Hover: Background #E8EEFF
  - Drag-Over: Border solid, Background #DDE7FF

BUTTON-ZEILE
- Display: flex, gap 12px, justify-content space-between, margin-top 24px
- Button 1: "Vorlage herunterladen" (Secondary, transparent bg, 1px border #0F429F, text #0F429F, Roboto Medium 14px, radius 24px, padding 12px 24px)
- Button 2: "Import starten" (Primary, bg #246AFF, text white, Roboto Medium 14px, radius 24px, padding 12px 24px)

═══════════════════════════════════════════════════════════════

PHASE 2: VALIDIERUNGSERGEBNISSE (Nach Upload)

STATUS-INFO BOX
- Background: #F9FAFB
- Border: 1px #E0E0E0
- Corner Radius: 8px
- Padding: 16px
- Display: flex, gap 12px, align-items center
- Badge: 32x32px, radius 50%
  - Success: bg #4CAF50, icon ✅
  - Error: bg #F44336, icon ⚠️
- Text: "X von Y Mitarbeiter erfolgreich importiert" (Roboto Regular, 14px, #333333)

VALIDIERUNGSERGEBNISSE TABELLE
Header (Roboto Regular 11px uppercase, #666666):
- Spalte 1: "ZEILE" (80px)
- Spalte 2: "NAME" (150px, left-aligned)
- Spalte 3: "AKTION" (120px, left-aligned)
- Spalte 4: "STATUS" (100px, center)
- Background: #F0F4FF
- Border-bottom: 1px #E0E0E0
- Padding: 12px 16px

Daten-Zeilen:
- Height: 40px, Padding 8px 16px
- Font: Roboto Regular 12px, #333333
- Border-bottom: 1px #F0F0F0
- Alternation: white / #FAFAFA
- Hover: bg #F0F4FF
- Status-Badges: 
  - Erfolg: bg #E8F5E9, text #4CAF50, radius 12px
  - Fehler: bg #FFEBEE, text #F44336, radius 12px

Beispiel-Daten:
Zeile 12 | Killer, Anna      | Neu anlegen     | ✅ Erfolg
Zeile 13 | Moer, Jonas       | Aktualisieren   | ✅ Erfolg
Zeile 21 | Nguyen, Linh      | Neu anlegen     | ❌ Fehler
Zeile 22 | Schmidt, Lara     | Aktualisieren   | ❌ Fehler
Zeile 31 | Weber, Tom        | Aktualisieren   | ✅ Erfolg

Max-Height: 300px, overflow-y auto

FEHLERDETAILS EXPANDER
- Background: #FFF5F5
- Border: 1px #FFEBEE
- Corner Radius: 8px
- Padding: 0

Header (clickable):
- Padding: 16px
- Border-bottom: 1px #FFEBEE
- Display: flex, justify-content space-between
- Title: "Fehlerdetails" (Roboto Medium 13px, #273A5F)
- Chevron: > (collapsed) / v (expanded), color #0F429F, transition 0.3s

Content (expanded):
- Padding: 16px
- Display: none / block
- Animation: slide-down 0.3s

Fehlerdetails-Tabelle:
Header-Background: #FFE8E8
Header-Color: #D32F2F
Spalten:
- "ZEILE" (80px)
- "FELD" (120px)
- "PROBLEM" (200px)
- "VORSCHLAG" (250px)

Beispiel-Daten:
Zeile 21 | Email      | Ungültiges Format       | müller@firma.de (statt: na_me@f.de)
Zeile 21 | Geburtstag | Fehlendes Feld          | Format: DD.MM.YYYY (z.B. 25.06.1990)
Zeile 22 | Name       | Leerzeichen am Anfang   | "Schmidt, Lara" (ohne führendes Leerzeichen)
Zeile 22 | Location   | Standort existiert nicht| Verfügbare: Heddesheim, Viernheim

Max-Height: 250px, overflow-y auto

BUTTON-ZEILE (Phase 2)
- Display: flex, gap 12px, justify-content space-between
- Button 1: "Nochmal hochladen" (Secondary, wie Phase 1) → zurück zu Phase 1
- Button 2: "Mitarbeiter speichern" (Primary, bg #4CAF50 grün, text white) → speichert & schließt Modal

═══════════════════════════════════════════════════════════════

RESPONSIVE:
- Tablet (600px): Modal 600px, Button-Zeile column-layout
- Mobile: Modal 100% - 16px, Upload-Area Height 200px, Buttons full-width stapelweise

FARBEN (Riso CI):
- Primary Blue: #0F429F
- Light Blue: #246AFF
- Hellblau BG: #F0F4FF
- Dark Text: #273A5F
- Gray Text: #666666
- Light BG: #F9FAFB
- Success: #4CAF50
- Error: #F44336
- Border: #E0E0E0

FONT: Roboto (Regular, Medium, Bold)
- Titel: 24px Bold
- Section-Title: 13px Medium
- Body/Tabelle: 12px Regular
- Helper: 11px Regular
