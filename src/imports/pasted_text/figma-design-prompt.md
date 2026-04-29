FIGMA DESIGN PROMPT: Übersicht-Seite & Benefits Management (Corrected)

PART 1: ÜBERSICHT-SEITE (Dashboard-ähnlich)

Page Title:

Text: "Übersicht" (32px Bold #273A5F)
Position: Top-left
Content: 3 KPI-Cards (nebeneinander)

┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│  ┌──────────────┐    │ │  ┌──────────────┐    │ │  ┌──────────────┐    │
│  │  € Symbol    │    │ │  │  👥 Symbol   │    │ │  │  📄 Symbol   │    │
│  │  (48x48)     │    │ │  │  (48x48)     │    │ │  │  (48x48)     │    │
│  └──────────────┘    │ │  └──────────────┘    │ │  └──────────────┘    │
│                      │ │                      │ │                      │
│  Gesamtbudget        │ │  Aktive Mitarbeiter  │ │  Berichte            │
│  1.250.000€          │ │  87                  │ │  24                  │
│                      │ │                      │ │                      │
│  [Details] →         │ │  [Details] →         │ │  [Details] →         │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘

Card Styling:

Background: white
Border: 1px #E0E0E0
Border-Radius: 12px
Padding: 24px
Min-Height: 180px
Hover: Shadow 0 4px 12px rgba(0,0,0,0.08)
Display: flex, flex-direction: column
Icon Area:

Size: 48x48px
Container Background: #F0F4FF (light blue circle)
Icon Color: Original (€ #0F429F, 👥 #0F429F, 📄 #0F429F)
Margin-bottom: 16px
Title:

Font: Roboto Regular 12px
Color: #666666
Margin-bottom: 8px
Value:

Font: Roboto Bold 28px
Color: #273A5F
Margin-bottom: auto (push link down)
Link:

Text: "[Details] →"
Font: Roboto Regular 12px
Color: #0F429F
Hover: Color #246AFF, Underline
Action: Navigiert zu entsprechender Seite (Standorte, Mitarbeiter, Berichte)
PART 2: SEPARATE BENEFITS-SEITE

Nach Übersicht kommt separate Seite: "Benefits"

Page Title:

Text: "Benefits" (32px Bold #273A5F)
Position: Top-left
Button oben rechts:

Text: "Benefits verwalten"
Style: Primary
Background: #0F429F
Padding: 12px 24px
Radius: 24px
Action: Leitet zu BENEFITS MANAGEMENT FLOW
Benefits Grid (2-3 Spalten):

Benefits Cards:

┌──────────────────────────┐
│  [Icon 48x48]            │  ← Original-Farbe
│                          │
│  Mittagessen             │
│  bis 100€ / Monat        │
│  ✅ Aktiv                │
│                          │
│  Details ansehen →       │
└──────────────────────────┘

Alle 11 Benefits mit Icons:

Mittagessen (#F4B860)
Internet (#4CAF50)
Kindergarten (#FF6B6B)
Commuting (#4CAF50)
Erholung (#2196F3)
Sachbezug (#E91E63)
Danke-Bonus (#4CAF50)
Geburtstag (#FFC107)
ÖPNV (#2196F3)
BKV (#0F429F)
BAV (#8E44AD)
PART 3: BENEFITS MANAGEMENT FLOW (ZENTRALER FLOW)

Dieser Flow wird AUSGELÖST von 2 Buttons:

"Benefits verwalten" Button (auf Benefits-Seite)
"Benefit hinzufügen" Button (in Locations > Tab "Benefits")
BEIDE navigieren zur GLEICHEN Flow!

BENEFITS MANAGEMENT PAGE

Title: "Benefits verwalten"

Button oben rechts:

Text: "Benefit hinzufügen"
Style: Primary #0F429F
Action: Startet SCHRITT 1
Benefits Management List (aktuelle Benefits):

Tabelle mit Spalten:

NAME (Icon 32x32 + Name)
LIMIT
STATUS
STANDORTE
AKTION
Beispiel:
| [Icon 32] Mittagessen | 100€/Monat | ✅ Aktiv | München, Heddesheim | [Bearbeiten] [⋮] |
| [Icon 32] Internet    | 50€/Monat  | ✅ Aktiv | München             | [Bearbeiten] [⋮] |

Tabelle Formatierung: Header #F0F4FF, Rows 40px (wie vorher)

SCHRITT 1: BENEFIT WÄHLEN

Title: "Welches Benefit möchte du hinzufügen?"

Grid von Benefit-Cards (2 Spalten):

┌──────────────────┐ ┌──────────────────┐
│ [Icon 48x48]     │ │ [Icon 48x48]     │
│ Mittagessen      │ │ Internet         │
│ [Wählen]         │ │ [Wählen]         │
└──────────────────┘ └──────────────────┘

[etc. alle 11 Benefits]

Buttons: [Abbrechen] [Weiter]

User klickt "Wählen" → SCHRITT 2

SCHRITT 2: STANDORTE WÄHLEN

Title: "Für welche Standorte soll [Benefit] verfügbar sein?"

Checkboxes:
☐ München (34 Mitarbeiter)
☐ Berlin (12 Mitarbeiter)
☐ Heddesheim (8 Mitarbeiter)
☐ Viernheim (5 Mitarbeiter)

Button: [Alle wählen]

Hinweis: "Neue Benefits gelten ab 1. nächsten Monat für alle zugeordneten Mitarbeiter dieser Standorte."

Buttons: [Zurück] [Weiter] (Weiter disabled bis ≥1 ausgewählt)

User wählt Standorte → SCHRITT 3

SCHRITT 3: LIMITS KONFIGURIEREN

Title: "Limits pro Standort"
Subtitle: "Benefit: [Benefit-Name]"

Input Fields pro ausgewählter Location:

München:    [] € / Monat
Heddesheim: [] € / Monat

Input-Feld Style:

Width: 200px
Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular 14px
Placeholder: "z.B. 100"
Validation:

Leer: Error "Feld erforderlich"
Negativ: Error "Betrag kann nicht negativ sein"
Hinweis: "Pro Standort kann ein eigenes Limit gesetzt werden. Neue Mitarbeiter erhalten das Limit für ihren Standort."

Buttons: [Zurück] [Speichern]

User klickt "Speichern" → SCHRITT 4

SCHRITT 4: BESTÄTIGUNG

Icon: ✅ (grün, 48x48px)
Title: "Benefit hinzugefügt"

Text:
"[Benefit-Name] wurde hinzugefügt für:
• München: 100€ / Monat
• Heddesheim: 85€ / Monat

Gültig ab: 1. Mai 2026"

Button: [Schließen]

Action nach "Schließen":

Zurück zur Benefits Management Page
Liste aktualisiert
Flow beendet
PART 4: NAVIGATION STRUKTUR

Menü:
📊 Übersicht
👥 Mitarbeiter
💰 Benefits (← neue Page!)
📍 Standorte
📋 Berichte
⚙️ Verwaltung
📧 Kontakt
❓ Hilfe

Übersicht-Seite:

Title: "Übersicht"
Content: 3 KPI-Cards (Gesamtbudget, Mitarbeiter, Berichte)
Keine Benefits auf dieser Seite!
Benefits-Seite:

Title: "Benefits"
Content: 11 Benefit-Cards in Grid
Button oben rechts: "Benefits verwalten" → Benefits Management Page
Benefits Management Page:

Title: "Benefits verwalten"
Content: Tabelle mit aktuellen Benefits
Button: "Benefit hinzufügen" → SCHRITT 1 des Flows
Locations-Seite > Tab "Benefits":

Button: "Benefit hinzufügen" → SCHRITT 1 des GLEICHEN Flows
BEIDE Pfade (Benefits-Seite + Locations) führen zu SCHRITT 1!

PART 5: FLOW DIAGRAM

┌─────────────────────────────────────────────┐
│  BENEFITS MANAGEMENT FLOW (ZENTRAL)         │
│                                              │
│  Einstiegspunkte:                          │
│  1. Benefits-Seite → "Benefits verwalten"   │
│  2. Locations > "Benefit hinzufügen"        │
│                                              │
│              ↓↓ (beide)                      │
│                                              │
│  SCHRITT 1: Benefit wählen (11 Cards Grid)  │
│  ↓                                          │
│  SCHRITT 2: Standorte auswählen (Checkboxes)
│  ↓                                          │
│  SCHRITT 3: Limits konfigurieren (Inputs)   │
│  ↓                                          │
│  SCHRITT 4: Bestätigung (✅ Modal)          │
│  ↓                                          │
│  Zurück zu Benefits Management Page         │
│                                              │
└─────────────────────────────────────────────┘

PART 6: KONSISTENZ-CHECKLISTE

Navigation:
☐ Menü: Übersicht | Mitarbeiter | Benefits | Standorte | Berichte | Verwaltung | Kontakt | Hilfe
☐ Übersicht ist erste Seite (3 KPI-Cards, KEINE Benefits!)
☐ Benefits ist separate Seite (11 Benefit-Cards)

Übersicht-Seite:
☐ Title: "Übersicht"
☐ 3 KPI-Cards (Gesamtbudget, Mitarbeiter, Berichte)
☐ Icons in #F0F4FF Containern (48x48px)
☐ Links führen zu Details

Benefits-Seite:
☐ Title: "Benefits"
☐ Button oben rechts: "Benefits verwalten"
☐ 11 Benefit-Cards in Grid (2-3 Spalten)
☐ Icons 48x48px, Original-Farben (NO Overlay)
☐ "Details ansehen →" Link pro Card

Benefits Management Page:
☐ Title: "Benefits verwalten"
☐ Tabelle mit aktuellen Benefits (Icon 32x32)
☐ Button: "Benefit hinzufügen" → SCHRITT 1

Benefits Management Flow:
☐ SCHRITT 1: Benefit wählen (Grid)
☐ SCHRITT 2: Standorte auswählen (Checkboxes)
☐ SCHRITT 3: Limits konfigurieren (Inputs)
☐ SCHRITT 4: Bestätigung (✅)
☐ Beide Einstiegspunkte nutzen GLEICHEN Flow

Locations-Seite:
☐ Tab "Benefits": "Benefit hinzufügen" Button
☐ Action: → SCHRITT 1 des gleichen Flows

DELIVERY CHECKLIST

Neue Pages:
☐ Übersicht-Seite (3 KPI-Cards, keine Benefits!)
☐ Benefits-Seite (11 Benefit-Cards + Button)
☐ Benefits Management Page (Tabelle)
☐ Benefits Management Flow (4 Schritte Modal)

Navigation:
☐ Menü um "Benefits" erweitert
☐ Alle 3 Pages erreichbar

Buttons & Flow:
☐ "Benefits verwalten" Button auf Benefits-Seite
☐ "Benefit hinzufügen" Button in Benefits Management
☐ "Benefit hinzufügen" Button in Locations > Tab Benefits
☐ Beide führen zu SCHRITT 1 des gleichen Flows

Icons:
☐ Alle 11 Benefits mit Original-Farben
☐ Größen: 48px (Cards), 32px (Management)
☐ Asset-Path: /assets/benefit-icons/[name].svg