URL: /ag-portal/kontakt

Page Layout
Header:

Page Title: "Kontakt" (32px Bold #273A5F)
Subtitle: "Wir helfen dir gerne weiter. Schreib uns eine Nachricht." (Roboto Regular 14px #666666)
Padding: 24px
KONTAKTFORMULAR
Form Title:

Font: Roboto Bold 20px
Color: #273A5F
Margin-bottom: 24px
Form Fields (1 Spalte):

Dein Name

Label: "Dein Name *"
Placeholder: "z.B. Max Mustermann"
Type: text
Required: ja
Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular 14px
Deine E-Mail

Label: "Deine E-Mail *"
Placeholder: "max@firma.de"
Type: email
Required: ja
Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular 14px
Betreff

Label: "Betreff *"
Placeholder: "Worum geht es?"
Type: text
Required: ja
Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular 14px
Kategorie (Dropdown)

Label: "Kategorie *"
Default: "-- Bitte wählen --"
Options:
Allgemeine Frage
Technisches Problem
Abrechnung & Budget
Benefit-Anfrage
Benutzer-Management
Sonstiges
Height: 40px
Border: 1px #0F429F
Font: Roboto Regular 14px
Nachricht

Label: "Nachricht *"
Placeholder: "Deine Nachricht..."
Type: textarea
Required: ja
Height: 120px
Border: 1px #0F429F
Padding: 12px
Font: Roboto Regular 14px
Field Spacing:

Gap zwischen Fields: 16px
Label-Font: Roboto Medium 13px
Label-Color: #273A5F
Label-Margin-Bottom: 8px
CHECKBOX (Optional)
☐ Kopie an meine E-Mail

Font: Roboto Regular 13px
Color: #666666
Margin-top: 16px
Checkbox Modern Style: 18x18px, Border 2px #0F429F
BUTTON SECTION
Buttons (unten):

[Abbrechen] (Secondary)

Background: transparent
Border: 1px #0F429F
Text-Color: #0F429F
Padding: 12px 24px
Radius: 24px
Action: Zurück zur vorherigen Seite
[Senden] (Primary)

Background: #0F429F
Text-Color: white
Padding: 12px 24px
Radius: 24px
Hover: Background #246AFF
Disabled: Background #CCCCCC (wenn erforderliche Felder leer)
Action: Form absenden
Button-Gap: 12px
Margin-top: 24px
Display: flex, Justify-Content: space-between (oder center auf Mobile)

SUCCESS/ERROR FEEDBACK
Nach Absenden:

Success State:

Icon: ✅ (grün, 48x48px)
Title: "Nachricht versendet!"
Text: "Danke für deine Nachricht. Wir melden uns in Kürze bei dir."
Button: [Schließen]
Action: Zurück zur Übersicht
Error State:

Icon: ❌ (rot, 48x48px)
Title: "Fehler beim Versenden"
Text: "Leider gab es ein Problem. Bitte versuche es später erneut oder kontaktiere uns direkt unter support@riso-app.de"
Buttons: [Nochmal versuchen] [Schließen]
FAQ SEKTION
Title:

Font: Roboto Bold 20px
Color: #273A5F
Text: "Häufig gestellte Fragen"
Margin-bottom: 16px
FAQ Container:

Background: white
Border: 1px #E0E0E0
Border-Radius: 12px
Padding: 24px
Margin-bottom: 24px
FAQ Items (5+):

Beispiele:

"Wie füge ich einen neuen Mitarbeiter hinzu?"

Antwort: "Sie können neue Mitarbeiter direkt im Portal unter Mitarbeiter > CSV importieren hinzufügen. Eine Schritt-für-Schritt-Anleitung finden Sie in unserer Hilfe."
"Wie aktiviere ich ein neues Benefit?"

Antwort: "Gehen Sie zu Benefits > Benefits verwalten und folgen Sie dem Wizard. Das Benefit wird ab dem 1. des nächsten Monats aktiv."
"Was ist eine Location?"

Antwort: "Eine Location ist ein flexibler Organisationscontainer — z.B. ein Standort oder eine Tochterunternehmen. Ein Mitarbeiter gehört immer zu genau einer Location."
"Wie ändere ich die Budget-Limits?"

Antwort: "Sie können Limits pro Standort in Verwaltung > Berichte anpassen. Änderungen gelten ab dem 1. des nächsten Monats."
"Wo finde ich meine Berichte?"

Antwort: "Alle erstellten Berichte sind unter Berichte > Meine Berichte verfügbar zum Download und zum Ansehen."
Item Layout:

Display: flex, flex-direction: column
Gap: 16px
Border-bottom: 1px #E0E0E0 (außer letztes Item)
Padding-bottom: 16px (außer letztes Item)
Item Title:

Font: Roboto Medium 14px
Color: #273A5F
Margin-bottom: 8px
Display: flex, gap 8px (Icon + Text)
Item Icon:

Symbol: ❓
Size: 16x16px
Color: #0F429F
Item Answer:

Font: Roboto Regular 13px
Color: #666666
Line-height: 1.6
"MEHR"-LINK ZUR HELP CENTER
Position: unten rechts im FAQ-Container

Link Style:

Text: "Mehr Fragen anschauen →"
Font: Roboto Regular 13px
Color: #0F429F
Hover: Color #246AFF, Underline
Cursor: pointer
Action: Navigiert zur Help Center Seite (/ag-portal/help-center)
Container:

Text-align: right
Margin-top: 16px
FORM VALIDATION
Dein Name:

Leer: Error "Name ist erforderlich"
Min-Length 2: Error "Name muss mindestens 2 Zeichen lang sein"
Deine E-Mail:

Leer: Error "E-Mail ist erforderlich"
Format: Error "Gültige E-Mail erforderlich"
Betreff:

Leer: Error "Betreff ist erforderlich"
Min-Length 5: Error "Betreff muss mindestens 5 Zeichen lang sein"
Kategorie:

Default: Error "Kategorie erforderlich"
Nachricht:

Leer: Error "Nachricht ist erforderlich"
Min-Length 10: Error "Nachricht muss mindestens 10 Zeichen lang sein"
Error Messages:

Font: Roboto Regular 12px
Color: #F44336
Display: direkt unter Input-Feld
Margin-top: 4px
RESPONSIVE LAYOUT
Desktop (1200px+):

Kontaktformular: 600px breit, zentriert
FAQ: volle Breite
Tablet (768px-1199px):

Kontaktformular: 90% breit
FAQ: volle Breite
Mobile (<768px):

Kontaktformular: 100% - 32px (mit Padding)
Input-Height: 44px (touch-friendly)
Button-Height: 48px
Buttons: full-width, stapelweise
FAQ: volle Breite
FARBEN & TOKENS
Primary Blue: #0F429F
Light Blue: #246AFF
Dark Text: #273A5F
Gray Text: #666666
Border: #E0E0E0
Error: #F44336
DELIVERY CHECKLIST
☐ Page Title: "Kontakt"
☐ Subtitle: "Wir helfen dir gerne weiter..."
☐ Form Fields: Name, Email, Betreff, Kategorie, Nachricht
☐ Checkbox: "Kopie an meine E-Mail"
☐ Buttons: [Abbrechen] [Senden]
☐ Success Message mit Icon ✅
☐ Error Message mit Icon ❌ + Support-Email
☐ Form Validation (Client-Side)
☐ FAQ Section mit 5+ Items
☐ "Mehr Fragen anschauen →" Link zu Help Center
☐ Responsive Layout (Desktop, Tablet, Mobile)