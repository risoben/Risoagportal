FIGMA DESIGN SYSTEM: AG-Portal — Tabellen, Navigation, Icons & Workflows
Status: ✅ Konsolidierter System-Prompt

Erstellt: 2026-04-23

Owner: Santiago

Zweck: Einheitliche Design-Specification für Dashboard, Einstellungen, Mitarbeiter, Reports, Benefits Management

PART 1: GLOBALE DESIGN-TOKENS
1.1 Farbpalette (Riso CI)
Element	Farbe	Verwendung
Primary Blue	#0F429F	Buttons, Links, Icons
Light Blue	#246AFF	Primary Button Hover
Light BG	#F0F4FF	Table Header, Hover States
Dark Text	#273A5F	Überschriften, Labels
Gray Text	#666666	Helper Text, Subtitles
Light Gray BG	#F9FAFB	Content Boxen, Sections
Table Alternation	#FAFAFA	Even Rows
Border Gray	#E0E0E0	Lines, Separators
Success Green	#4CAF50	Status Badges (Erfolg)
Error Red	#F44336	Status Badges (Fehler)
1.2 Typografie (Roboto)
Element	Größe	Gewicht	Farbe
Page Title	32px	Bold	#273A5F
Section Header	20px	Bold	#273A5F
Table Header	11px	Regular	#666666 (UPPERCASE)
Body Text	12px / 14px	Regular	#333333
Helper Text	11px / 12px	Regular	#999999
Button Text	14px	Medium	je nach Button-Type
PART 2: NAVIGATION & LAYOUT
2.1 Top Bar (Weiß — unverändert)
Container:

Height: 64px
Background: White #FFFFFF
Border-bottom: 1px #E0E0E0
Padding: 0 24px
Display: flex
Align-Items: center
Justify-Content: space-between
Left Section (Logo + Text):

Logo: Riso_Blue_Logo.svg
Size: 32x32px
Color: #0F429F (original SVG color)
Margin-right: 16px
Clickable: ja → Links zum Dashboard
Text: "Arbeitgeber-Portal"
Font: Roboto Bold, 16px
Color: #273A5F
Display: flex, align-items: center, gap 16px
Right Section (User Profile / Logout):

Initials Badge: 40x40px, Background #0F429F, Text white
Dropdown Menu: Name, Email, Logout
Optional: Settings, Help Links
2.2 Navigation Menu (Dunkelblau — NEU)
Container:

Background: #273A5F (Dunkelblau — Riso Dark Blue)
Width: 260px (feste Sidebar)
Height: calc(100vh - 64px) (unter Top Bar)
Padding: 24px 12px
Display: flex
Flex-Direction: column
Gap: 8px
Overflow-Y: auto
Border-right: 1px #E0E0E0
Menu Items:

Font: Roboto Regular, 14px
Color: white #FFFFFF (inaktiv: #B0B5C1)
Padding: 12px 16px
Margin-bottom: 4px
Border-Radius: 6px
Cursor: pointer
States:

Inactive: Background transparent, Color #B0B5C1 (light gray)
Active: Background #0F429F (Riso Primary Blue), Color white, Bold
Hover: Background rgba(255,255,255,0.1)
Menu Structure:


📊 Dashboard
  └─ (keine Sub-Items)
👥 Mitarbeiter
  └─ (keine Sub-Items)
⚙️ Settings
  └─ Allgemeine Infos
  └─ Berichte & Exports
📋 Reports
  └─ (keine Sub-Items)
💰 Benefits
  └─ Überblick
  └─ Verwalten
❓ Hilfe
  └─ (öffnet External Link)
Icons in Menu:

Size: 16x16px
Color: inherit (white / gray je nach State)
Margin-right: 12px
Display: inline
PART 3: EINHEITLICHE TABELLENFORMATIERUNG
3.1 Table Container
Allgemein:

Border: 1px #E0E0E0 (oben, unten, links, rechts)
Border-Radius: 8px
Overflow: hidden
Background: white
3.2 Table Header
Header Row:

Background: #F0F4FF (hellblau)
Border-bottom: 1px #E0E0E0
Padding: 12px 16px
Height: 40px
Display: flex
Align-Items: center
Header Cell (th):

Font: Roboto Regular, 11px
Color: #666666
Text-Transform: UPPERCASE
Letter-Spacing: 0.5px
Font-Weight: 500 (medium)
Text-Align: left (default, sonst center/right je nach Datentyp)
Header Beispiel:


| ZEILE | NAME | AKTION | STATUS |
3.3 Table Body Rows
Row Container:

Height: 40px
Display: flex
Align-Items: center
Border-bottom: 1px #F0F0F0 (helles Grau)
Padding: 8px 16px
Font: Roboto Regular, 12px
Color: #333333
Row Alternation:

Odd Rows (Zeile 1, 3, 5...): Background white
Even Rows (Zeile 2, 4, 6...): Background #FAFAFA (sehr helles Grau)
Row States:

Hover: Background #F0F4FF (hellblau), Transition smooth 0.2s
Selected (falls checkbox): Background #E8EEFF (noch helleres blau)
Row Data Cell (td):

Padding: 0 (row padding reicht)
Text-Align: left (default, anpassbar)
Vertical-Align: center
3.4 Table Data Formatting
Textformate nach Spaltentyp:

Datentyp	Beispiel	Formatierung
Euro-Beträge	4.200,50€	Rechts-aligniert, 2 Dezimalstellen, Punkt als Tausender, € dahinter
Prozentual	75%	Rechts-aligniert, keine Dezimalstellen (außer <1%)
Datum	15.04.2026	Links-aligniert, Format DD.MM.YYYY
Status	Aktiv / Inaktiv	Badge mit Farbe (grün/grau)
Text (Long)	Sehr langer Name hier...	text-overflow: ellipsis, white-space: nowrap, Tooltip on hover zeigt vollständigen Text
Text-Overflow Handling:


.long-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

/* Tooltip on hover */
title="Vollständiger Text hier"
3.5 Table Scrolling & Responsiveness
Desktop (1200px+):

Alle Spalten sichtbar
Max-Width: 100% des Containers
Horizontales Scrolling: nur falls notwendig
Tablet (768px–1199px):

Columns mit geringerer Breite
Horizontales Scrolling bei Bedarf
Scrollbar: custom (#CCCCCC, radius 4px)
Mobile (<768px):

Tabelle zu vertikal gestapelten Cards umwandeln oder Horizontal-Scroll erzwingen
3.6 Table Beispiel: Dashboard Mitarbeiter-Liste

Header:
│ PERSONENNUMMER | NAME | ABTEILUNG | STATUS │

Row 1 (odd, white BG):
│ 1001 | Schmidt, Anna | Vertrieb | ✅ Aktiv │

Row 2 (even, #FAFAFA):
│ 1002 | Müller, Johannes | IT | ✅ Aktiv │

Row 3 (odd, white BG):
│ 1003 | Weber, Lara | Finanzen | ⚪ Neu │

Hover Effect:
│ → Background becomes #F0F4FF, smooth 0.2s transition
PART 4: LOGO & ASSET MANAGEMENT
4.1 Riso_Blue_Logo.svg — Einheitliche Platzierung
Kontext	Größe	Placement	Farbe	Aktion
Top Bar	32x32px	Links, neben "Arbeitgeber-Portal"	#0F429F (original)	Click → Dashboard
Sidebar Header (falls zusätzliches Branding nötig)	24x24px	Top-left	#0F429F	—
Help Center Hero	48x48px	Center, über Titel	#0F429F	—
Footer (falls vorhanden)	16x16px	Links unten	#0F429F	—
Modal Header (falls zusätzliches Branding)	20x20px	Top-left in Header	#0F429F	—
Wichtig:

SVG-Farbe immer #0F429F (Riso Primary)
Keine Overlays oder Farbveränderungen
Clickability: nur Top Bar (→ Dashboard), alle anderen Instances: statisch
PART 5: BENEFIT ICONS — IMPLEMENTATION MATRIX
5.1 Icon Assets & Original Colors
Benefit	Asset	Original Farbe	Hex-Code
Mittagessen	Mittagessen.svg	Orange	#F4B860
Sachbezug	Sachbezug.svg	Pink	#E91E63
Danke-Bonus	Danke-Bonus.svg	Grün	#4CAF50
Internet	Internet.svg	Grün	#4CAF50
Kindergarten	Kindergarten.svg	Orange-Rot	#FF6B6B
Geburtstag	Geburtstag.svg	Gold	#FFC107
Erholung	Erholung.svg	Blau	#2196F3
Commuting	Commuting.svg	Grün	#4CAF50
ÖPNV	ÖPNV.svg	Blau	#2196F3
Fehlende Assets (zu erstellen in Figma):

BKV.svg → Farbe: #0F429F (Riso Blue) — Symbol: Gebäude + Herz
BAV.svg → Farbe: #8E44AD (Lila) — Symbol: Geldbeutel + Pensionär
5.2 Icon Sizing Rules
Context	Größe	Container BG	Placement
Benefits Overview Cards	48x48px	white (no BG container)	Center-top in card
Dashboard KPI Cards	48x48px	#F0F4FF (light circle)	Center in small circle
Benefit Management List	32x32px	white (no BG)	Left side of row
Reports Tab Checkboxes	24x24px	white (no BG)	Left of checkbox
Benefit Creation Modal	32x32px	white (no BG)	Top-left of card
Inline (Breadcrumbs, Tags)	16x16px	white (no BG)	Inline with text
WICHTIG: KEINE #F0F4FF OVERLAYS!

Alle Icons zeigen ihre Original-SVG-Farbe
Background-Container nur bei "Dashboard KPI Cards" (kleine hellblaue Kreise um jedes Icon)
Überall sonst: reines Icon auf transparentem/weißem Grund
5.3 Icon Placement Rules
Benefits Overview Seite (Karten-Layout):


┌─────────────────────┐
│   [Icon 48x48]      │  ← Icon centered top
│                     │
│  Mittagessen       │  ← Titel
│  bis 100€ / Monat  │  ← Description
│  ✅ Aktiv          │  ← Status Badge
│  [Verwalten] [...]  │  ← Actions
└─────────────────────┘
Benefit Management / Settings Tab (Listen-Layout):


┌─────────────────────────────────────────┐
│ [Icon 32x32] Mittagessen  [Manage] [⋮]  │
│ [Icon 32x32] Internet     [Manage] [⋮]  │
│ [Icon 32x32] Kindergarten [Manage] [⋮]  │
└─────────────────────────────────────────┘
Reports Tab — Benefit Checkboxes:


☐ [Icon 24x24] Mittagessen
☐ [Icon 24x24] Internet
☐ [Icon 24x24] Kindergarten
Benefit Creation Modal / Wizard:


Schritt 1: Benefit wählen
┌─────────────────┐
│ [Icon 32x32]    │  ← Icon oben in Card
│ Mittagessen     │
│                 │
│ Bis 100€/Monat  │
│ [Wählen]        │
└─────────────────┘
PART 6: LOCATION SELECTION WORKFLOW
6.1 Benefits Management — Gesamter Flow
Ausgangspunkt: User klickt "Benefit hinzufügen" (Benefits Tab in Einstellungen)


┌───────────────────────────────────────────────┐
│ SCHRITT 1: BENEFIT WÄHLEN                     │
│                                               │
│ Verfügbare Benefits:                          │
│ ┌──────────────────┐  ┌──────────────────┐   │
│ │ [Icon] Mittagessen│  │ [Icon] Internet  │   │
│ │ Wählen           │  │ Wählen           │   │
│ └──────────────────┘  └──────────────────┘   │
│ ┌──────────────────┐  ┌──────────────────┐   │
│ │ [Icon] Kindergarten│  │ [Icon] Commuting │   │
│ │ Wählen           │  │ Wählen           │   │
│ └──────────────────┘  └──────────────────┘   │
│                                               │
│ [Abbrechen] [Weiter]                          │
└───────────────────────────────────────────────┘

         ↓ User klickt ein Benefit

┌───────────────────────────────────────────────┐
│ SCHRITT 2: STANDORTE WÄHLEN                  │ ← KRITISCH
│                                               │
│ "Für welche Standorte soll [Benefit]         │
│  verfügbar sein?"                            │
│                                               │
│ Verfügbare Standorte:                         │
│ ☐ München                                    │
│ ☐ Berlin                                     │
│ ☐ Heddesheim                                 │
│ ☐ Viernheim                                  │
│                                               │
│ [Alle wählen]                                │
│                                               │
│ Hinweis: "Neue Benefits gelten ab 1.        │
│ nächsten Monat für alle zugeordneten         │
│ Mitarbeiter dieser Standorte."               │
│                                               │
│ [Zurück] [Weiter]                            │
└───────────────────────────────────────────────┘

         ↓ User wählt Standorte

┌───────────────────────────────────────────────┐
│ SCHRITT 3: LIMITS KONFIGURIEREN               │ ← ERST JETZT!
│                                               │
│ Benefit: Mittagessen                         │
│ Für Standorte: München, Heddesheim           │
│                                               │
│ "Wie viel Budget pro Mitarbeiter?"           │
│                                               │
│ München:        [_____] € / Monat            │
│ Heddesheim:     [_____] € / Monat            │
│                                               │
│ Hinweis: "Pro Standort kann ein eigenes      │
│ Limit gesetzt werden. Neue Mitarbeiter      │
│ erhalten das Limit für ihren Standort."      │
│                                               │
│ [Zurück] [Speichern]                         │
└───────────────────────────────────────────────┘

         ↓ User speichert

┌───────────────────────────────────────────────┐
│ ✅ BESTÄTIGUNG                                 │
│                                               │
│ "Mittagessen wurde hinzugefügt für:          │
│  • München: 100€ / Monat                     │
│  • Heddesheim: 85€ / Monat                   │
│                                               │
│  Gültig ab: 1. Mai 2026"                     │
│                                               │
│ [Schließen]                                  │
└───────────────────────────────────────────────┘
6.2 Standorte-Wahl: UI Details
Dialog / Modal:

Title: "Standorte wählen"
Subtitle: "Für welche Standorte soll [Benefit] verfügbar sein?"
Checkbox List:

Background: white
Padding: 16px
Gap: 12px
Checkbox Item:


☐ München
  └─ (8 Mitarbeiter) ← optional, zeige Headcount
Helper Text (unter Liste):

Font: Roboto Regular, 12px
Color: #666666
Text: "Neue Benefits gelten ab 1. nächsten Monat für alle zugeordneten Mitarbeiter dieser Standorte."
Button Section:

[Zurück] (Secondary)
[Weiter] (Primary, disabled bis ≥1 Standort ausgewählt)
6.3 Limits Konfigurieren — Pro-Location Input
Nach Standort-Selection:

Standort	Input-Field	Type	Validation
München	[___] € / Monat	Number	0 – 9999€, 2 Dezimalstellen
Heddesheim	[___] € / Monat	Number	0 – 9999€, 2 Dezimalstellen
Input-Feld Details:

Width: 200px
Height: 40px
Border: 1px #0F429F
Padding: 8px 12px
Font: Roboto Regular, 14px
Placeholder: "z.B. 100"
Suffix: "€ / Monat"
Validation:

Leer: Error "Feld erforderlich"
Negative: Error "Betrag kann nicht negativ sein"
9999: Warning "Sehr hoher Betrag — OK?"

Hinweis unter Inputs:

Font: Roboto Regular, 11px
Color: #999999
Text: "Pro Standort kann ein eigenes Limit gesetzt werden. Neue Mitarbeiter erhalten das Limit für ihren Standort."
6.4 Verschiedene Szenarien
Szenario A: Neues Benefit — mehrere Standorte, unterschiedliche Limits


Benefit: Kindergarten
Standorte: München, Berlin, Heddesheim

München:    150€ / Monat
Berlin:     120€ / Monat
Heddesheim: 100€ / Monat

Gültig ab: 1. Mai 2026
Szenario B: Bestehendes Benefit, Standort hinzufügen


Mittagessen existiert bereits für:
✅ München (100€) — bereits gespeichert
☐ Heddesheim — Neu hinzufügen

Konfiguriere Heddesheim:
Heddesheim: [_____] € / Monat

Gültig ab: 1. Mai 2026
Szenario C: Benefit entfernen von einem Standort


(Separate Aktion — nicht im Add-Flow)

Aktion: Im Benefit-Management → [Manage] → "Standort entfernen"
Warnung: "Mitarbeiter auf diesem Standort verlieren dieses Benefit ab 1. nächsten Monat."

Gültig ab: 1. Mai 2026
PART 7: APPLICATION TIMING & MIGRATIONS
7.1 Regel: Soft Migration (1. nächsten Monat)
Neuer Mitarbeiter:

Benefit-Zuordnung: sofort aktiv (kein Delay)
Limit: sofort gültig
Status: "✅ Aktiv ab [Datum heute]"
Bestehendes Benefit — Limit erhöhen/senken:

Change: ab 1. nächsten Monat
Hinweis in UI: "Gültig ab 1. Mai 2026"
Alter Mitarbeiter sieht alte Limit bis 30. April, dann wechsel
Mitarbeiter-Wechsel (Standort A → B):

Gültig ab: 1. nächsten Monat
Alte Benefits (nur in A): werden deaktiviert
Neue Benefits (nur in B): werden aktiviert
Shared Benefits: Limit passt sich an B an
Hinweis: "Wechsel wird wirksam am 1. Mai 2026"
Mitarbeiter entfernen:

Benefit endet: 1. nächsten Monat
Status: "⚪ Inaktiv ab 1. Mai 2026"
Hinweis: "Mitarbeiter hat noch Zugriff bis 30. April"
7.2 UI Hinweise für Application Timing
In Benefits-Management Tab — jedes Benefit-Item:


┌───────────────────────────────────────┐
│ [Icon] Mittagessen                    │
│ Limit: 100€ / Monat                  │
│ Status: ✅ Aktiv                      │
│ Gültig ab: 1. Mai 2026               │ ← Badge/Hinweis
│ [Verwalten] [...]                    │
└───────────────────────────────────────┘
In Bestätigung nach Speichern:


✅ Mittagessen wurde hinzugefügt

Standorte: München, Heddesheim
Limits: 100€ (München), 85€ (Heddesheim)
Gültig ab: 1. Mai 2026
PART 8: AUSNAHMEFÄLLE (Riso-Admin Overrides)
Nicht im AG-Portal sichtbar, aber dokumentiert für zukünftige Admin-Interfaces:

Scenario	Override	Bedingung
AG braucht Benefit sofort	"Riso-Admin: sofort aktivieren"	Spezielle Absprache
Rückwirkende Limit-Änderung	"Rückwirkend ab [Datum]"	Nur Riso-Admin Backend
Standort-Wechsel sofort	"Sofort wirksam (statt 1. nächsten Monat)"	Riso-Admin Decision
Audit-Logging:

Jeder Override wird geloggt: (Datum, Zeit, Admin-User, Change, Grund)
Nicht in AG-Portal sichtbar, aber im Riso-Backend-System
PART 9: KONSISTENZ-CHECKLISTE FÜR ALLE PAGES
9.1 Tabellenformatierung — Überall gleich
 Header: #F0F4FF, UPPERCASE, Roboto Regular 11px
 Rows: 40px height, white/#FAFAFA alternation
 Hover: #F0F4FF background
 Borders: 1px #E0E0E0 zwischen Rows, oben/unten
 Padding: 8px 16px in Cells
 Text-Overflow: ellipsis + tooltip bei langen Texten
 Euro-Format: Punkt als Tausender, € dahinter
9.2 Logo-Funktionalität — Überall korrekt
 Top Bar: Logo 32x32px, #0F429F, clickable → Dashboard
 Alle anderen Locations: statisch, keine Overlays, original-Farbe
 SVG-Asset: Riso_Blue_Logo.svg (nie anderem File)
9.3 Navigation Menu — Dunkelblau
 Sidebar Background: #273A5F
 Text: white (#FFFFFF)
 Inactive Text: #B0B5C1
 Active Item: Background #0F429F, Bold
 Hover: Background rgba(255,255,255,0.1)
 Top Bar (64px oben): WHITE (unverändert) mit Logo + Text
9.4 Benefit Icons — Überall korrekt
 Keine #F0F4FF Overlays außer Dashboard KPI Cards
 Original-SVG-Farben (nicht umgefärbt)
 Größen: 48px (Cards), 32px (Management), 24px (Reports), 16px (Inline)
 Asset-Path: /product-icons/[BenefitName].svg
 Missing Assets: BKV.svg, BAV.svg (zu erstellen)
9.5 Location Selection — Benefit Management
 Schritt 1: Benefit wählen
 Schritt 2: Standorte auswählen (MUSS vor Limits kommen)
 Schritt 3: Limits pro Standort
 Hinweise: "Gültig ab 1. nächsten Monat"
 Validation: mind. 1 Standort erforderlich
PART 10: PAGES ZUM UPDATEN
Page	Änderungen
Dashboard	✅ KPI Icons 48x48px, Chart Title update, Table Formatting
Einstellungen > Allgemeine Infos	✅ Mockup-Fidelity (Felder Namen)
Einstellungen > Berichte	✅ Locations Section, Benefit Checkboxes (24px Icons), Table Format
Mitarbeiter	✅ Table Format, Icons (falls Standort-Spalte), CSV-Import Modal
Benefits Overview	🟡 Icons 48x48px (keine #F0F4FF BG), Layout
Benefits Management	🟡 Location Selection Flow (Schritt 1-3), Icons 32x32px
Benefit Info Modal	🟡 Icons korrekt, Informationen klar
Reports Page	✅ Table Format, Benefit Checkboxes mit Icons 24px
Navigation Sidebar	🟡 Background #273A5F (Dunkelblau), Text white
Top Bar (Header)	✅ Logo 32x32px, "Arbeitgeber-Portal" Text, bleibt WHITE
Help Center / Hilfe-Seite	✅ Logo, Navigation, Hero Section
ERSTELLUNGSTECHNIK FÜR FIGMA
Schritt 1: Components erstellen

 Table Header Component (reusable)
 Table Row Component (reusable, mit Hover-State)
 Logo Component (32x32px, links-clickable)
 Menu Item Component (mit Active/Hover States)
 Benefit Card Component (48px Icon + Label + Status)
 Benefit List Item Component (32px Icon + Toggle)
Schritt 2: Tokens definieren (Figma Design System)

 Color Tokens: Primary Blue, Light Blue, BGs, Text Colors
 Typography Tokens: Headings, Body, Helper
 Spacing Tokens: 8px, 12px, 16px, 24px, 32px
 Icon Tokens: 16px, 24px, 32px, 48px Sizes
Schritt 3: Pages updaten

 Jede Page: Copy Tokens von System
 Jede Table: nutze Table Components
 Jede Navigation: nutze Menu Components
 Benefit Icons: Asset-Links (nie SVG-Farben ändern)
Schritt 4: Responsive Variants erstellen

 Desktop (1200px+)
 Tablet (768px–1199px)
 Mobile (<768px)
DELIVERY CHECKLIST
Vor Upload zu Figma:

 Alle 10 Pages überprüft auf Tabellenformatierung
 Logo überall 32x32px, clickable nur in Top Bar
 Navigation: #273A5F Sidebar, white Top Bar
 Benefit Icons: Original-Farben, keine Overlays (außer KPI Cards)
 Location Selection Flow: 3 Schritte implementiert
 Alle Hinweise "Gültig ab 1. nächsten Monat" eingefügt
 Responsive Breakpoints getestet
Rückmeldung an Santiago:

 Screenshot: Navigation (Sidebar dunkelblau)
 Screenshot: Benefits Management (Location Selection Flow)
 Screenshot: Tabellenvergleich (alle gleich formatiert)
 Screenshot: Benefit Icons (Original-Farben sichtbar)
