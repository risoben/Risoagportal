FIGMA DESIGN PROMPT: Kontaktformular & Navigation Update

NAVIGATION UPDATE

Menü Items (aktualisiert):

📊 Übersicht
👥 Mitarbeiter
💰 Benefits
📍 Standorte
📋 Berichte
⚙️ Verwaltung
📧 Kontakt
❓ Hilfe

Alternative Platzierung: Kontakt-Icon in Top Bar (rechts neben User Badge) statt in Menü

PART 1: KONTAKTFORMULAR — MODAL DIALOG

Trigger:

Menü-Item "Kontakt" (📧)
Oder: Kontakt-Icon in Top Bar (rechts, 24x24px)
Oder: Button in Help Center / Hilfe-Seite
Modal Container:

Width: 600px
Background: white
Border-Radius: 12px
Shadow: 0 10px 40px rgba(0,0,0,0.12)
Padding: 32px
Modal Header:

Title: "Kontakt zum Support"
Font: Roboto Bold 24px
Color: #273A5F
Margin-bottom: 12px

Subtitle: "Wir helfen dir gerne weiter. Schreib uns eine Nachricht."
Font: Roboto Regular 14px
Color: #666666

Close Button (X):

Position: top-right
Size: 24px
Color: #666666
Hover: Background #F0F4FF
Form Fields:

Dein Name

Placeholder: "z.B. Max Mustermann"
Type: text
Required: ja
Input-Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular 14px
Deine E-Mail

Placeholder: "max@firma.de"
Type: email
Required: ja
Input-Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular 14px
Validation: Email-Format prüfen
Betreff

Placeholder: "Worum geht es?"
Type: text
Required: ja
Input-Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular 14px
Kategorie (Dropdown)

Label: "Kategorie"
Options:
Allgemeine Frage
Technisches Problem
Abrechnung & Budget
Benefit-Anfrage
Benutzer-Management
Sonstiges
Default: "-- Bitte wählen --"
Height: 40px
Border: 1px #0F429F
Font: Roboto Regular 14px
Nachricht

Placeholder: "Deine Nachricht..."
Type: textarea
Required: ja
Height: 120px
Border: 1px #0F429F
Padding: 12px
Font: Roboto Regular 14px
Resize: vertikal erlaubt
Field Spacing:

Gap zwischen Fields: 16px
Label-Font: Roboto Medium 13px
Label-Color: #273A5F
Label-Margin-Bottom: 8px
Form Layout:

┌─────────────────────────────────────┐
│ X  Kontakt zum Support              │
│    Wir helfen dir gerne weiter...   │
├─────────────────────────────────────┤
│                                     │
│ Dein Name *                         │
│ []        │
│                                     │
│ Deine E-Mail *                      │
│ []        │
│                                     │
│ Betreff *                           │
│ []        │
│                                     │
│ Kategorie *                         │
│ [-- Bitte wählen --        ▼]       │
│                                     │
│ Nachricht *                         │
│ []        │
│ []        │
│ []        │
│                                     │
│ ☐ Kopie an meine E-Mail             │
│                                     │
│ [Abbrechen] [Senden]                │
└─────────────────────────────────────┘

Checkbox (Optional):

Label: "Kopie an meine E-Mail"
Font: Roboto Regular 13px
Color: #666666
Margin-top: 16px
Button Section (unten):

Buttons:

[Abbrechen] (Secondary)

Background: transparent
Border: 1px #0F429F
Text-Color: #0F429F
Padding: 12px 24px
Radius: 24px
Action: Modal schließen
[Senden] (Primary)

Background: #0F429F
Text-Color: white
Padding: 12px 24px
Radius: 24px
Action: Form absenden
Disabled State: Background #CCCCCC (wenn erforderliche Felder leer oder Email ungültig)
Button-Gap: 12px
Margin-top: 24px
Display: flex, Justify-Content: space-between

Form Validation (Client-Side):

Dein Name:

Leer: Error "Name ist erforderlich"
Min-Length 2: Error "Name muss mindestens 2 Zeichen lang sein"
Deine E-Mail:

Leer: Error "E-Mail ist erforderlich"
Format: Error "Gültige E-Mail erforderlich (z.B. max@firma.de)"
Max-Length 255: Warnung "E-Mail sehr lang"
Betreff:

Leer: Error "Betreff ist erforderlich"
Min-Length 5: Error "Betreff muss mindestens 5 Zeichen lang sein"
Max-Length 150: Warnung "Betreff kürzen"
Kategorie:

Default: Error "Kategorie erforderlich"
Nachricht:

Leer: Error "Nachricht ist erforderlich"
Min-Length 10: Error "Nachricht muss mindestens 10 Zeichen lang sein"
Max-Length 5000: Warnung "Nachricht sehr lang"
Alle Errors:

Font: Roboto Regular 12px
Color: #F44336 (Error Red)
Display: direkt unter Input-Feld
Margin-top: 4px
Form States:

Default (leer)

Alle Inputs leer
[Senden] Button disabled (grau)
Validating (User tippt)

Input fokussiert: Border zu #0F429F, Shadow 0 0 0 3px rgba(15,66,159,0.1)
Error-Messages zeigen bei Invalid-Input
[Senden] Button: disabled solange erforderliche Felder leer
Valid (alle Felder gefüllt & validiert)

Alle Inputs mit gültigen Daten
Keine Error-Messages
[Senden] Button: enabled (#0F429F), Hover: #246AFF
Sending (Form wird gesendet)

Alle Inputs disabled (Opacity 0.5)
[Senden] Button: Loading-Spinner, Text: "Wird gesendet..." oder nur Spinner
[Abbrechen] Button: disabled
Success (erfolgreich gesendet)

Icon: ✅ (grün, 48x48px)
Title: "Nachricht versendet!"
Text: "Danke für deine Nachricht. Wir melden uns in Kürze bei dir."
Button: "Schließen" (Primary)
Auto-Close: optional nach 5 Sekunden
Error (Fehler beim Senden)

Icon: ❌ (rot, 48x48px)
Title: "Fehler beim Versenden"
Text: "Leider gab es ein Problem. Bitte versuche es später erneut oder kontaktiere uns direkt unter support@riso-app.de"
Button: "Nochmal versuchen" (Primary) + "Schließen" (Secondary)
Success/Error Modal Layout:

┌─────────────────────────────────────┐
│                                     │
│           ✅ / ❌                    │
│                                     │
│  Nachricht versendet! / Fehler...  │
│                                     │
│  Danke für deine Nachricht. Wir    │
│  melden uns in Kürze bei dir.      │
│                                     │
│      [Schließen] oder [Retry]      │
│                                     │
└─────────────────────────────────────┘

PART 2: KONTAKT-INTEGRATION IN HELP CENTER / HILFE-SEITE

Hilfe-Seite (bestehend):

Hero Section mit Suchfeld
Kategorie-Cards
Popular Articles
Footer
Zusatz: Kontakt-CTA am Ende (vor Footer):

┌─────────────────────────────────────┐
│                                     │
│  Frage nicht beantwortet?           │
│  Schreib uns direkt!                │
│                                     │
│  [Kontakt aufnehmen]                │
│  (öffnet Kontaktformular Modal)     │
│                                     │
└─────────────────────────────────────┘

Button-Style:

Background: #0F429F
Text: white
Padding: 12px 32px
Radius: 24px
Font: Roboto Medium 14px
Hover: Background #246AFF
PART 3: NAVIGATION UPDATED

Menu Structure (neu):

📊 Übersicht
👥 Mitarbeiter
💰 Benefits
📍 Standorte
📋 Berichte
⚙️ Verwaltung
📧 Kontakt
❓ Hilfe

Alternative: Kontakt im Top Bar (rechts)

Top Bar Right Section:

Kontakt-Icon (24x24px, Envelope/Mail-Symbol)
Position: rechts neben User Badge
Color: #666666
Hover: Color #0F429F
Clickable: ja → öffnet Kontaktformular Modal
Tooltip on hover: "Kontakt"
PART 4: EMAIL TEMPLATE (Backend Integration)

Wenn Form erfolgreich gesendet:

Email an: support@riso-app.de (oder Riso-Support)

Subject: "[Riso AG-Portal] Neue Nachricht von [Firma-Name]: [Betreff]"

Body:
Neue Kontaktanfrage vom AG-Portal

Von: [Name]
E-Mail: [E-Mail]
Firma: [AG-Name aus Session]
Kategorie: [Kategorie]

Betreff: [Betreff]

Nachricht:
[Nachricht Text]

Verfügt über Kopie: [Ja/Nein] IP-Adresse: [IP] Gesendet: [Datum/Uhrzeit]
Email an Nutzer (falls Kopie angefordert):

Subject: "[Riso] Wir haben deine Nachricht erhalten"

Body:
Hallo [Name],

danke für deine Nachricht! Wir haben sie erhalten und kümmern uns darum.

Betreff: [Betreff]
Kategorie: [Kategorie]

Wir melden uns in Kürze bei dir.

Viele Grüße, Riso Support Team support@riso-app.de
PART 5: FORM STYLING TOKENS

Colors:

Primary Blue: #0F429F
Light Blue Hover: #246AFF
Input Border: #0F429F
Input Focus Shadow: rgba(15,66,159,0.1)
Label Color: #273A5F
Placeholder Color: #999999
Error Color: #F44336
Success Color: #4CAF50
Typography:

Title: 24px Bold #273A5F
Label: 13px Medium #273A5F
Input: 14px Regular #333333
Helper/Error: 12px Regular #F44336
Placeholder: 14px Regular #999999
Spacing:

Modal Padding: 32px
Field Gap: 16px
Label-to-Input: 8px
Button Gap: 12px
Input Height: 40px (text/email/select)
Textarea Height: 120px
Borders & Radius:

Input Border: 1px #0F429F
Input Radius: 4px
Button Radius: 24px
Modal Radius: 12px
PART 6: RESPONSIVE VARIANTEN

Desktop (1200px+):

Modal Width: 600px
Alle Felder nebeneinander (Name | Email in einer Zeile optional)
Button-Layout: flex space-between
Tablet (768px-1199px):

Modal Width: 90% (max 500px)
Alle Felder vertikal stapelweise
Button-Layout: flex column (Buttons übereinander)
Mobile (<768px):

Modal Width: 100% - 32px (mit Padding)
Modal Padding: 24px
Alle Felder vertikal
Input Height: 44px (mobile-friendly)
Button-Layout: flex column (100% width)
Button Height: 48px (touch-friendly)
PART 7: DELIVERY CHECKLIST

Design Figma:
☐ Kontaktformular Modal (600px width Desktop)
☐ Alle 5 Form Fields (Name, Email, Betreff, Kategorie, Nachricht)
☐ Checkbox "Kopie an E-Mail"
☐ [Abbrechen] und [Senden] Buttons
☐ Error-States für jedes Feld
☐ Success-Modal mit ✅
☐ Error-Modal mit ❌
☐ Loading-State beim Senden

Navigation:
☐ Menü-Item "Kontakt" hinzufügt (oder Top-Bar Icon)
☐ Kontakt-Icon (24x24px) in Top Bar (optional)
☐ Menü-Struktur: 8 Items gesamt

Integration:
☐ Kontaktformular Modal auf allen Pages erreichbar
☐ Button in Help Center / Hilfe-Seite
☐ Backend: Email-Versand einrichten
☐ Success/Error-Nachrichten in Modal
☐ Form Validation (Client-Side)

Testing:
☐ Form Validation: alle Error-Cases testen
☐ Erfolgreicher Submit: Email-Versand prüfen
☐ Responsive auf Mobile/Tablet
☐ Modal-Close Button (X) funktioniert
☐ Tab-Navigation durch Form-Felder
☐ Escape-Key schließt Modal