URL: /ag-portal/benefits-management/edit/[benefit-id]

PAGE STRUKTUR
Zurück-Link (oben links):

Text: "← Zurück zu Benefits verwalten"
Font: Roboto Regular 12px
Color: #0F429F
Hover: Underline
Action: Zurück zur Benefits Management Page
HEADER-BEREICH
Layout (horizontal):

Icon: 48x48px (original SVG-Farbe, z.B. #F4B860 für Mittagessen)
Rechts davon: Title + Status
Title:

Text: Benefit-Name (z.B. "Mittagessen")
Font: Roboto Bold 32px
Color: #273A5F
Status Toggle (rechts oben):

Label: "Status"
Style: Toggle Switch
Default: "Aktiv" (grün, #4CAF50) oder "Inaktiv" (grau, #9E9E9E)
Action: Aktiviert/Deaktiviert Benefit global
Hinweis unter Toggle:

Font: Roboto Regular 11px
Color: #666666
Text: "Status-Änderung gilt ab 1. nächsten Monat"
SECTION 1: BENEFIT-INFORMATIONEN
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
Text: "Benefit-Informationen"
Beschreibung:

Label: "Beschreibung" (Roboto Medium 13px #273A5F)
Content: Long-text (Roboto Regular 14px #333333)
Max-Width: 100%
Line-height: 1.6
Beispiel: "Der Essenszuschuss ermöglicht Mitarbeitern die Nutzung von Essensgutscheinen oder direkten Kantinenzuschüssen."
SECTION 2: LIMITS PRO LOCATION
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
Text: "Limits pro Standort"
Tabelle:

Table Header:

Background: #F0F4FF
Padding: 12px 16px
Height: 40px
Font: Roboto Regular 11px
Color: #666666
Text-Transform: UPPERCASE
Spalten:

STANDORT (200px)
LIMIT (150px)
AKTION (100px)
Table Body:

Height: 40px pro Zeile
Padding: 8px 16px
Font: Roboto Regular 12px
Color: #333333
Border-bottom: 1px #F0F0F0
Row Alternation:

Odd: white
Even: #FAFAFA
Beispiel-Daten:
| München | 100€/Monat | [Bearbeiten] |
| Heddesheim | 100€/Monat | [Bearbeiten] |
| Berlin | 85€/Monat | [Bearbeiten] |
| Viernheim | 100€/Monat | [Bearbeiten] |

Bearbeiten-Button:

Text: "Bearbeiten"
Style: Secondary
Background: transparent
Border: 1px #0F429F
Text-Color: #0F429F
Padding: 8px 16px
Radius: 16px
Font: Roboto Regular 12px
Hover: Background #F0F4FF
Action: Öffnet "Limit bearbeiten" Modal
SECTION 3: VERFÜGBARE STANDORTE
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
Text: "Verfügbar für diese Standorte"
Location-List (mit Checkboxes):

☐ München (34 Mitarbeiter)
☐ Heddesheim (15 Mitarbeiter)
☐ Berlin (8 Mitarbeiter)
☐ Viernheim (5 Mitarbeiter)

Checkbox Style:

Size: 18x18px
Border: 2px #0F429F
Background (unchecked): white
Background (checked): #0F429F
Checkmark: white SVG
Item Layout:

Display: flex, gap 12px, align-items: center
Font: Roboto Regular 14px
Color: #333333
Padding: 12px
Height: 40px
Hover: Background #F0F4FF
Hinweis:

Font: Roboto Regular 12px
Color: #666666
Margin-top: 16px
Text: "Ein Benefit ist für einen Standort verfügbar, wenn mindestens ein Limit gesetzt ist. Mitarbeiter dieser Standorte erhalten das Benefit automatisch ab 1. nächsten Monat."
SECTION 4: NUTZUNGSSTATISTIK
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
Text: "Nutzungsstatistik"
Statistiken (3 KPI-Cards):

┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ 62 Mitarbeiter   │ │ 4.200€ Budget    │ │ 3.100€ Genutzt   │
│ mit Zugriff      │ │ (diesen Monat)   │ │ (diesen Monat)   │
└──────────────────┘ └──────────────────┘ └──────────────────┘

Card Style:

Background: #F9FAFB
Border: 1px #E0E0E0
Border-Radius: 8px
Padding: 16px
Text-align: center
Value:

Font: Roboto Bold 24px
Color: #273A5F
Label:

Font: Roboto Regular 12px
Color: #666666
Margin-top: 8px
SECTION 5: AKTION-BUTTONS (unten)
Button-Container:

Display: flex, gap 12px
Justify-Content: space-between
Margin-top: 32px
[Löschen] Button (links):

Text: "Löschen"
Style: Danger/Secondary
Background: transparent
Border: 1px #F44336
Text-Color: #F44336
Padding: 12px 24px
Radius: 24px
Font: Roboto Medium 14px
Hover: Background #FFEBEE
Action: Öffnet Bestätigungsmodal "Benefit löschen?"
[Speichern] Button (rechts):

Text: "Speichern"
Style: Primary
Background: #0F429F
Text-Color: white
Padding: 12px 32px
Radius: 24px
Font: Roboto Medium 14px
Hover: Background #246AFF
Disabled: Background #CCCCCC (wenn keine Änderungen)
Action: Speichert alle Änderungen
MODAL 1: LIMIT BEARBEITEN
Title: "Limit bearbeiten — [Benefit-Name] — [Standort]"

Label:

Font: Roboto Medium 13px
Color: #273A5F
Text: "Limit pro Mitarbeiter"
Margin-bottom: 8px
Input Field:

Width: 250px
Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular 14px
Placeholder: "z.B. 100"
Suffix: "€/Monat"
Validation:

Leer: Error "Feld erforderlich"
Negativ: Error "Betrag kann nicht negativ sein"
Format: Error "Nur Zahlen erlaubt"
Error Message:

Font: Roboto Regular 12px
Color: #F44336
Margin-top: 4px
Hinweis:

Font: Roboto Regular 12px
Color: #666666
Margin-top: 16px
Text: "Änderung gilt ab 1. nächsten Monat für alle Mitarbeiter dieses Standorts"
Buttons:

[Abbrechen] (Secondary)
[Speichern] (Primary #0F429F) — disabled bis Feldinhalt geändert
MODAL 2: BENEFIT LÖSCHEN
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
Light BG: #F9FAFB
Border: #E0E0E0
Error: #F44336
Success: #4CAF50
Warning: #FFC107
RESPONSIVE LAYOUT
Desktop (1200px+):

Sections: full-width, vertikal gestapelt
Tabellen: full-width
Tablet (768px-1199px):

Sections: full-width
Tabellen: horizontal scrollbar bei Bedarf
Mobile (<768px):

Sections: full-width
Tabellen: Card-View oder horizontal scrollbar
Input-Height: 44px
Button: full-width
DELIVERY CHECKLIST
Header:
☐ Benefit-Icon (48x48px, original Farbe)
☐ Benefit-Name (32px Bold)
☐ Status Toggle (Aktiv/Inaktiv)
☐ Hinweis: "Status-Änderung gilt ab 1. nächsten Monat"

Section 1 — Benefit-Informationen:
☐ Beschreibung angezeigt
☐ Read-only (nicht editierbar)

Section 2 — Limits pro Location:
☐ Tabelle mit Standorten + Limits
☐ "Bearbeiten" Button pro Standort
☐ Limit Bearbeiten Modal funktioniert

Section 3 — Verfügbare Standorte:
☐ Checkboxes für alle Standorte
☐ Mitarbeiter-Anzahl angezeigt
☐ Hinweis zu Verfügbarkeit

Section 4 — Nutzungsstatistik:
☐ 3 KPI-Cards (Mitarbeiter, Budget, Genutzt)
☐ Aktuelle Werte angezeigt

Buttons:
☐ [Löschen] Button (links, rot)
☐ [Speichern] Button (rechts, Primary)
☐ Deletion Modal mit Warnung

Responsive:
☐ Desktop: full-width Sections
☐ Tablet: angepasst
☐ Mobile: 1 Spalte, full-width Buttons

FERTIG FÜR FIGMA-IMPLEMENTIERUNG

Key Design Decisions:

Benefit-Icon prominent im Header
Limits-Tabelle mit Edit-Buttons (keine Inline-Edits)
Nutzungsstatistik für Transparenz
Status-Toggle global (nicht pro Location)
Löschen-Button mit Warnung