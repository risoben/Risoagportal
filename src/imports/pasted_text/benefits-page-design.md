FIGMA DESIGN PROMPT: Benefits-Seite (Updated) — Icons & Button-Restructure

PART 1: BENEFITS OVERVIEW PAGE (ÜBERBLICK)

Page Title:

Text: "Benefits" (32px Bold #273A5F)
Position: Top-left
Button oben rechts (NEU):

Text: "Benefits verwalten"
Style: Primary Button
Background: #0F429F
Text-Color: white
Padding: 12px 24px
Radius: 24px
Font: Roboto Medium 14px
Hover: Background #246AFF
Action: Leitet zur Benefits Management Seite (Verwaltung > Berichte Tab oder separate Benefits-Verwaltung)
PART 2: BENEFITS CARD LAYOUT (GRID)

Container:

Display: Grid
Columns: 2 oder 3 (je nach Bildschirmbreite)
Gap: 24px
Padding: 24px
Benefit Card (einzeln):

┌──────────────────────────┐
│  [Icon 48x48px]          │  ← Icon oben center, Original-Farbe
│                          │
│  Mittagessen             │  ← Titel (Roboto Medium 14px #273A5F)
│  bis 100€ / Monat        │  ← Description (Roboto Regular 12px #666666)
│  ✅ Aktiv                │  ← Status Badge (grün)
│                          │
│  [Details ansehen] →     │  ← Link (Roboto Regular 12px #0F429F)
└──────────────────────────┘

Card Styling:

Background: white
Border: 1px #E0E0E0
Border-Radius: 12px
Padding: 24px
Height: auto (flexible)
Hover: Shadow 0 4px 12px rgba(0,0,0,0.08), Transition smooth 0.2s
Cursor: pointer (ganze Card clickable)
Icon Area:

Size: 48x48px
Position: Center-top
Margin-bottom: 16px
NO Background-Overlay (#F0F4FF nicht verwenden!)
Original SVG Color von jedem Benefit
Title:

Font: Roboto Medium 14px
Color: #273A5F
Margin-bottom: 8px
Description:

Font: Roboto Regular 12px
Color: #666666
Margin-bottom: 12px
Status Badge:

Background: #4CAF50 (grün) oder #9E9E9E (grau inaktiv)
Text: "✅ Aktiv" oder "⚪ Inaktiv"
Padding: 4px 8px
Radius: 12px
Font: Roboto Medium 11px
Color: white
Margin-bottom: 12px
Link:

Text: "Details ansehen →"
Font: Roboto Regular 12px
Color: #0F429F
Hover: Color #246AFF, Underline
Cursor: pointer
Action: Öffnet Benefit Info Modal (Details)
PART 3: ALLE 11 BENEFIT ICONS MIT ASSET-PATHS

KRITISCH: Diese Icons MÜSSEN überall eingesetzt sein!

Benefits und ihre Asset-Dateien:

Mittagessen: mittagessen.svg → #F4B860 (Orange)
Internet: internet.svg → #4CAF50 (Grün)
Kindergarten: kindergarten.svg → #FF6B6B (Orange-Rot)
Commuting: commuting.svg → #4CAF50 (Grün)
Erholung: erholung.svg → #2196F3 (Blau)
Sachbezug: sachbezug.svg → #E91E63 (Pink)
Danke-Bonus: danke-bonus.svg → #4CAF50 (Grün)
Geburtstag: geburtstag.svg → #FFC107 (Gold)
ÖPNV: oepnv.svg → #2196F3 (Blau)
BKV: bkv.svg → #0F429F (Riso Blue)
BAV: bav.svg → #8E44AD (Lila)
Asset-Path Struktur:
/assets/benefit-icons/[benefit-name].svg

Beispiele:

/assets/benefit-icons/mittagessen.svg
/assets/benefit-icons/internet.svg
/assets/benefit-icons/kindergarten.svg
PART 4: BENEFIT ICON INTEGRATION — ALLE PAGES

Icon-Integration Checklist (KRITISCH):

Benefits Overview (diese Seite)
✅ Größe: 48x48px
✅ Farbe: Original SVG (#F4B860 Mittagessen, #4CAF50 Internet, etc.)
✅ KEINE #F0F4FF Overlay!
✅ Center-top in Card
✅ Asset-Path: /assets/benefit-icons/[name].svg

Benefits Management (in Verwaltung oder separate Seite)
✅ Größe: 32x32px
✅ Farbe: Original SVG (nicht umgefärbt!)
✅ KEINE #F0F4FF Overlay!
✅ Links in List-Item
✅ Asset-Path: /assets/benefit-icons/[name].svg

Reports Tab (in Verwaltung)
✅ Größe: 24x24px
✅ Farbe: Original SVG
✅ KEINE #F0F4FF Overlay!
✅ Links von Checkbox
✅ Asset-Path: /assets/benefit-icons/[name].svg

Dashboard KPI Cards (Ausnahme mit Container!)
✅ Größe: 48x48px
✅ Farbe: Original SVG
✅ Container: #F0F4FF (light circle, nur hier!)
✅ Center in Circle
✅ Asset-Path: /assets/benefit-icons/[name].svg

Massenimport Modal
✅ Größe: 32x32px (falls Benefits-Auswahl im Modal vorhanden)
✅ Farbe: Original SVG
✅ KEINE #F0F4FF Overlay!
✅ Asset-Path: /assets/benefit-icons/[name].svg

Benefit Info Modal (Details ansehen)
✅ Größe: 48x48px
✅ Farbe: Original SVG
✅ KEINE #F0F4FF Overlay!
✅ Top-left in Modal Header
✅ Asset-Path: /assets/benefit-icons/[name].svg

Benefit Location Selection Flow (Schritt 1)
✅ Größe: 48x48px (in Card-Layout beim Benefit wählen)
✅ Farbe: Original SVG
✅ KEINE #F0F4FF Overlay!
✅ Center-top in Benefit-Card
✅ Asset-Path: /assets/benefit-icons/[name].svg

PART 5: ICON RENDERING RULES (KRITISCH)

Farbverwaltung:

FALSCH ❌:

Icon mit #F0F4FF Hintergrund-Overlay überall
Icon-Farben ändern zu #0F429F oder anderen Farben
Icons in Grayscale rendern
Icons mit Opacity < 1.0
RICHTIG ✅:

Icon mit Original-SVG-Farbe rendern
Nur bei Dashboard KPI Cards: #F0F4FF Container (nicht Overlay!)
Alle anderen Pages: Icon auf transparentem/weißem Grund
Icons immer mit 100% Opacity
Asset-Path: /assets/benefit-icons/[name].svg (direkt von dort)
Beispiel Dashboard KPI Card (AUSNAHME):
┌──────────────────┐
│   ┌──────────┐   │
│   │[Icon 48] │   │  ← Icon mit Original-Farbe
│   └──────────┘   │  ← #F0F4FF Container (light circle)
│                  │
│  Mittagessen     │
│  100€ / Monat    │
└──────────────────┘

Beispiel Benefits Overview Card (STANDARD):
┌──────────────────┐
│   [Icon 48]      │  ← Icon mit Original-Farbe, NO Container!
│                  │
│  Mittagessen     │
│  bis 100€/Monat  │
│  ✅ Aktiv        │
└──────────────────┘

PART 6: ALTE BUTTONS ENTFERNEN

Alte Card-Layout (ENTFERNEN):

┌──────────────────────────────────┐
│ [Icon] Mittagessen               │
│ bis 100€ / Monat                 │
│ ✅ Aktiv                         │
│ [Verwalten] [Deaktivieren] [⋮]   │  ← ENTFERNEN!
└──────────────────────────────────┘

Neue Card-Layout (BEHALTEN):

┌──────────────────┐
│   [Icon 48]      │
│                  │
│  Mittagessen     │
│  bis 100€/Monat  │
│  ✅ Aktiv        │
│                  │
│  Details ansehen →
└──────────────────┘

Änderungen:

❌ [Verwalten] Button entfernen (pro Card)
❌ [Deaktivieren] Button entfernen (pro Card)
❌ [⋮] Menü-Button entfernen (pro Card)
✅ "Details ansehen →" Link behalten (oder neue Card-Click-Action)
✅ "Benefits verwalten" Button oben rechts (neu!)
PART 7: NAVIGATION ZUR VERWALTUNG

Click-Flow:

Option A: "Benefits verwalten" Button (oben rechts)
→ Leitet zu Verwaltung Seite
→ Öffnet direkt in Berichte Tab
→ Zeigt Benefits-Liste mit "Benefit hinzufügen" Button

Option B: "Details ansehen" Link (auf Card)
→ Öffnet Benefit Info Modal
→ Zeigt Benefit-Details
→ Button "Dieses Benefit verwalten" → zur Verwaltung (Berichte Tab)

PART 8: BENEFIT INFO MODAL (DETAILS ANSEHEN)

Modal-Größe: 600px (wie Kontaktformular)

┌─────────────────────────────────┐
│ X  [Icon 48] Mittagessen        │  ← Icon links, Title rechts
├─────────────────────────────────┤
│                                 │
│ Beschreibung:                   │
│ [Benefit-Beschreibung hier]     │
│                                 │
│ Limit pro Mitarbeiter:          │
│ 100€ / Monat                    │
│                                 │
│ Verfügbar für Standorte:        │
│ • München                       │
│ • Heddesheim                    │
│                                 │
│ Status: ✅ Aktiv                │
│                                 │
│ [Schließen] [Dieses Benefit     │
│             verwalten]          │
│                                 │
└─────────────────────────────────┘

Modal Header:

Icon: 48x48px, Original-Farbe, Links
Title: Benefit-Name (Roboto Bold 20px #273A5F)
Close-Button: X (rechts oben)
Content:

Beschreibung (Roboto Regular 14px #333333)
Limit-Info (Roboto Medium 13px #273A5F)
Standorte-Liste (Roboto Regular 12px #666666)
Status-Badge (grün/grau)
Buttons:

[Schließen] (Secondary)
[Dieses Benefit verwalten] (Primary #0F429F) → zur Verwaltung
PART 9: KONSISTENZ-CHECKLISTE FÜR BENEFIT ICONS

ÜBERALL:
☐ Mittagessen: #F4B860 (Orange)
☐ Internet: #4CAF50 (Grün)
☐ Kindergarten: #FF6B6B (Orange-Rot)
☐ Commuting: #4CAF50 (Grün)
☐ Erholung: #2196F3 (Blau)
☐ Sachbezug: #E91E63 (Pink)
☐ Danke-Bonus: #4CAF50 (Grün)
☐ Geburtstag: #FFC107 (Gold)
☐ ÖPNV: #2196F3 (Blau)
☐ BKV: #0F429F (Riso Blue)
☐ BAV: #8E44AD (Lila)

Größen:
☐ Benefits Overview: 48x48px
☐ Benefits Management: 32x32px
☐ Reports Checkboxes: 24x24px
☐ Dashboard KPI Cards: 48x48px (mit #F0F4FF Container)
☐ Benefit Info Modal: 48x48px
☐ Inline/Breadcrumbs: 16x16px

Platzierungen:
☐ Benefits Overview: Center-top in Card
☐ Benefits Management: Links in List-Item
☐ Reports: Links von Checkbox
☐ Dashboard: Center in #F0F4FF Circle
☐ Modals: Top-left oder Center-top

Asset-Linking:
☐ Alle Icons: /assets/benefit-icons/[name].svg
☐ Keine Hardcoded Farb-Overlays
☐ Keine Farbveränderungen in Figma/Code
☐ SVG-Farben direkt vom Asset

PART 10: PAGES ZUM UPDATEN

Benefits Overview (diese Seite):
✅ Grid Layout mit 2-3 Spalten
✅ Benefit Cards (48x48px Icons, Original-Farben)
✅ "Benefits verwalten" Button oben rechts (NEU!)
✅ Entfernen: [Verwalten] [Deaktivieren] [⋮] Buttons pro Card
✅ "Details ansehen →" Link behalten
✅ Card-Hover: Shadow + Transition

Benefits Management (Verwaltung > Berichte Tab):
✅ List mit 32x32px Icons
✅ "Benefit hinzufügen" Button
✅ Benefit Selection Flow (4 Schritte, mit Location-Selection)

Benefit Info Modal (neue Modal):
✅ 48x48px Icon (Original-Farbe)
✅ Benefit-Details
✅ Standorte-Info
✅ [Dieses Benefit verwalten] Button

Dashboard:
✅ KPI Cards mit 48x48px Icons in #F0F4FF Containern

Reports Tab:
✅ Checkboxes mit 24x24px Icons (Original-Farben, NO Overlay)

Alle Icons überall:
✅ Asset-Path: /assets/benefit-icons/[name].svg
✅ Original-SVG-Farben (nie umgefärbt)
✅ Korrekte Größen je Context
✅ KEINE #F0F4FF Overlays (außer Dashboard KPI)

DELIVERY CHECKLIST

Button-Struktur:
☐ "Benefits verwalten" Button oben rechts (Primary #0F429F)
☐ Alte [Verwalten] [Deaktivieren] Buttons pro Card entfernt
☐ "Details ansehen →" Link auf Card behalten
☐ Benefit Info Modal mit "Dieses Benefit verwalten" Button

Icon-Integration (KRITISCH):
☐ Alle 11 Benefit Icons mit Original-Farben eingebunden
☐ Asset-Path: /assets/benefit-icons/[name].svg
☐ Größen: 48px (Overview), 32px (Management), 24px (Reports), 16px (Inline)
☐ KEINE #F0F4FF Overlays (außer Dashboard KPI Cards)
☐ Überall wo Benefits auftauchen: Icons sichtbar

Figma Pages:
☐ Benefits Overview (mit neuem Layout)
☐ Benefit Info Modal (neue Modal)
☐ Benefits Management (in Verwaltung, mit Icons)
☐ Dashboard (Icons mit #F0F4FF Containern)
☐ Reports Tab (Icons ohne Overlay)

Testing:
☐ Alle 11 Icons rendern mit korrekten Farben
☐ Icon-Größen responsive (Desktop, Tablet, Mobile)
☐ "Benefits verwalten" Button funktioniert
☐ "Details ansehen" Link öffnet Modal
☐ Benefit Info Modal anzeigbar