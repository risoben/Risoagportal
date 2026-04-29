# AG-Portal Figma: Benefit Icons — Component System & Implementation

## ZIEL
Erstelle ein wiederverwendbares Benefit Icon Component System in Figma, das:
1. Alle 11 Benefit Icons mit korrekten Farben/SVGs lädt
2. Automatisch auf allen 6 Seiten als Component-Instance auftaucht
3. Size-Varianten unterstützt (32px, 40px, 48px)
4. In Tabellen, Grids, Modals, Headers konsistent funktioniert

---

## 🎨 BENEFIT ICONS — DEFINITION

**Alle 11 Benefits mit Asset-Paths + Farben:**

| # | Benefit | SVG-Pfad | Farbe | Hex | Größen |
|---|---------|----------|-------|-----|--------|
| 1 | Mittagessen | /assets/benefit-icons/mittagessen.svg | Gold | #F4B860 | 32/40/48px |
| 2 | Internet | /assets/benefit-icons/internet.svg | Grün | #4CAF50 | 32/40/48px |
| 3 | Kindergarten | /assets/benefit-icons/kindergarten.svg | Rot | #FF6B6B | 32/40/48px |
| 4 | Commuting | /assets/benefit-icons/commuting.svg | Grün | #4CAF50 | 32/40/48px |
| 5 | Erholung | /assets/benefit-icons/erholung.svg | Blau | #2196F3 | 32/40/48px |
| 6 | Sachbezug | /assets/benefit-icons/sachbezug.svg | Pink | #E91E63 | 32/40/48px |
| 7 | Danke-Bonus | /assets/benefit-icons/danke-bonus.svg | Grün | #4CAF50 | 32/40/48px |
| 8 | Geburtstag | /assets/benefit-icons/geburtstag.svg | Gelb | #FFC107 | 32/40/48px |
| 9 | ÖPNV | /assets/benefit-icons/oepnv.svg | Blau | #2196F3 | 32/40/48px |
| 10 | BKV | /assets/benefit-icons/bkv.svg | Dunkelblau | #0F429F | 32/40/48px |
| 11 | BAV | /assets/benefit-icons/bav.svg | Violett | #8E44AD | 32/40/48px |

---

## 🔧 COMPONENT SETUP

### 1. Component Familie erstellen: "Benefit Icon"

**Path:** Assets → Components → Icons → Benefit Icon

**Main Component Eigenschaften:**
- Name: `Benefit Icon`
- Type: Component (Main)
- Artboard Size: 48x48px (für größte Größe)

**Component Properties (Instanzen):**

#### Property 1: Benefit Type (Dropdown)
Type: String (Enum)
Options:

Mittagessen
Internet
Kindergarten
Commuting
Erholung
Sachbezug
Danke-Bonus
Geburtstag
ÖPNV
BKV
BAV
Default: Mittagessen



#### Property 2: Size (Dropdown)
Type: String (Enum)
Options:

Small (32px)
Medium (40px)
Large (48px)
Default: Medium



#### Property 3: Background (Toggle)
Type: Boolean
Options:

true: Icon mit farbigem Hintergrund (80% Opacity)
false: Icon ohne Hintergrund (Nur Icon sichtbar)
Default: false



---

### 2. Main Component Design

**Main Component (48x48px):**
┌─────────────────────┐
│  [Colored Circle]   │ ← Background: benefit-spezifische Farbe, 20% Opacity
│    [SVG Icon]       │ ← Icon: 32px, benefit-spezifische Farbe
│                     │
└─────────────────────┘



**Mit Background (wenn Property = true):**
- Shape: Circle, 48x48px
- Fill: Benefit-Farbe (z.B. #F4B860 für Mittagessen)
- Opacity: 20% oder 10% (gering halten für subtilen Look)

**Icon Layer:**
- Size: 32px × 32px (bei 48px Artboard)
- Centered in Circle
- Fill: Benefit-spezifische Farbe (100%)
- Stroke: None

**Varianten (Sizes):**
- Small (32px): Icon 20px, kein Background Circle nötig
- Medium (40px): Icon 28px, Background 40x40px
- Large (48px): Icon 32px, Background 48x48px

---

## 📍 IMPLEMENTIERUNG AUF SEITEN

### SEITE 1: Benefits-Seite (Grid)

**Layout:** 11 Benefit Cards (Raster, 3 Spalten Desktop)

**Pro Card:**
┌──────────────────┐
│   [Icon 48px]    │ ← Benefit Icon Component (Large, mit Background)
│   Mittagessen    │ ← Benefit Name (13px Bold)
│   ─────────────  │
│   👥 Mitarb.     │ ← Anzahl Mitarbeiter
│   💰 Budget      │ ← Budget pro Monat
│   [Action BTN]   │
└──────────────────┘



**Icon Usage:**
- Component: Benefit Icon
- Size: Large (48px)
- Background: true (farbiger Kreis hinterm Icon)
- Benefit Type: [entsprechend Benefit]

---

### SEITE 2: Benefits Management (Verwaltung) — Tabelle

**Tabelle Struktur:**
| Benefit (Icon + Name) | Standorte | Budget | Verwendet | Verfügbar | Action |
|─────────────────────|-----------|--------|-----------|-----------|--------|
| [Icon] Mittagessen  |    4      | 50.000€|  42.000€  |  8.000€   |   ⋯    |
| [Icon] Internet     |    5      | 75.000€|  65.000€  | 10.000€   |   ⋯    |



**Icon Usage:**
- Component: Benefit Icon
- Size: Medium (40px)
- Background: false (nur Icon, kein Kreis)
- Benefit Type: [entsprechend Row]
- Position: Linke Spalte, vor Benefit Name

---

### SEITE 3: Standorte-Seite (Benefits Übersicht pro Standort)

**Pro Standort (in Details Tab):**
Aktive Benefits:
[Icon] Mittagessen  [Icon] Internet  [Icon] BKV  [Icon] Kindergarten



**Icon Usage:**
- Component: Benefit Icon
- Size: Small (32px)
- Background: false
- Layout: Horizontal, Gap 12px

---

### SEITE 4: Benefit Management Flow SCHRITT 1 (Benefit wählen)

**Modal/Dialog:**
"Welchen Benefit möchtest du konfigurieren?"

[Icon] Mittagessen              [Icon] Internet
[Icon] Kindergarten             [Icon] Commuting
[Icon] Erholung                 [Icon] Sachbezug
[Icon] Danke-Bonus              [Icon] Geburtstag
[Icon] ÖPNV                      [Icon] BKV
[Icon] BAV



**Icon Usage:**
- Component: Benefit Icon
- Size: Large (48px)
- Background: true (farbiger Kreis für visuellen Fokus)
- Benefit Type: [entsprechend Button]
- Hover: Shadow oder Opacity 90%

---

### SEITE 5: Benefit-Bearbeitungsseite (Header)

**Page Header:**
─────────────────────────────────
[Icon 48px] Mittagessen verwalten
─────────────────────────────────



**Icon Usage:**
- Component: Benefit Icon
- Size: Large (48px)
- Background: true
- Benefit Type: [entsprechend Seite]

**Auch in Tabellen unten:**
Standort	Icon	Budget (Monat)	Genutz	Verfügbar
Berlin	[I]	50.000€	42.000€	8.000€


- Component: Benefit Icon
- Size: Medium (40px)
- Background: false

---

### SEITE 6: Dashboard (Optional — Top Benefits Widget)

**Widget:**
"Top 3 Benefits (diesen Monat)"

[Icon] Mittagessen    87 Nutzer
[Icon] Internet       65 Nutzer

[Icon] BKV            54 Nutzer



**Icon Usage:**
- Component: Benefit Icon
- Size: Medium (40px)
- Background: false

---

## ✅ COMPONENT CHECKLIST

- [x] Main Component "Benefit Icon" erstellt (48x48px)
- [x] Properties definiert: Benefit Type (11 Optionen), Size (3 Optionen), Background (Toggle)
- [x] Alle 11 Benefit-Icons mit korrekten Farben im Component
- [x] Size-Varianten funktionieren (32px, 40px, 48px)
- [x] Background-Variante (mit/ohne farbigem Kreis) funktioniert
- [x] Component auf Benefits-Seite (Grid) instanziiert
- [x] Component auf Benefits Management Tabelle instanziiert
- [x] Component auf Standorte-Seite (Benefits) instanziiert
- [x] Component auf Benefit Management Flow Schritt 1 instanziiert
- [x] Component auf Benefit-Bearbeitungsseite (Header + Tabelle) instanziiert
- [x] Component auf Dashboard (Top Benefits) instanziiert
- [x] Hover-States definiert (Shadow, Opacity)
- [x] Farben matchen exakt mit Brand Guide

---

## 🔗 ASSET-DATEIEN (MÜSSEN GELADEN SEIN)

Alle SVGs müssen im Figma File als Assets geladen sein:
/assets/benefit-icons/mittagessen.svg
/assets/benefit-icons/internet.svg
/assets/benefit-icons/kindergarten.svg
/assets/benefit-icons/commuting.svg
/assets/benefit-icons/erholung.svg
/assets/benefit-icons/sachbezug.svg
/assets/benefit-icons/danke-bonus.svg
/assets/benefit-icons/geburtstag.svg
/assets/benefit-icons/oepnv.svg
/assets/benefit-icons/bkv.svg
/assets/benefit-icons/bav.svg



**Wichtig:** Alle SVGs in Figma **farbneutral** importieren (Stroke/Fill als Variable), dann über Component Properties die Farbe zuweisen.

---

## 🎨 FARB-MAPPING (VARIABLE SYSTEM)

**Erstelle Color Variables in Figma:**
benefit/mittagessen = #F4B860
benefit/internet = #4CAF50
benefit/kindergarten = #FF6B6B
benefit/commuting = #4CAF50
benefit/erholung = #2196F3
benefit/sachbezug = #E91E63
benefit/danke-bonus = #4CAF50
benefit/geburtstag = #FFC107
benefit/oepnv = #2196F3
benefit/bkv = #0F429F
benefit/bav = #8E44AD



Dann im Component: Icon Fill = `benefit/{type}` Variable

---

## 🚀 NÄCHSTE SCHRITTE NACH DESIGN

1. ✅ Component-System in Figma bauen
2. ✅ Alle 6 Seiten mit Component-Instanzen updaten
3. 🔄 Dev-Handoff: Component + Asset-Pfade + Farbtabelle an Lovable/Frontend
4. 🔄 Frontend: Component in React/Vue bauen (Prop: benefitType, size, background)
5. ✅ QA: Icons auf allen 6 Seiten prüfen