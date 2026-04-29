Figma Make Prompt: Benefit Management Form System

**Ziel:** Erstelle ein komplettes Benefit Edit/Create Form Component System mit allen erforderlichen Feldern, Year-by-Year Limits und Standort-Verwaltung.

---

## 🎯 AUFGABE FÜR FIGMA MAKE

Erstelle in Figma ein Benefit Management Form System mit folgenden Anforderungen:

### 1. MAIN COMPONENT "Benefit Form"
   - Frame: Auto-Layout aktiviert (Vertical, Spacing: 24px)
   - Component Properties:
     * "Mode" (Enum: "Create" | "Edit")
     * "HasErrors" (Boolean: true=Error Banner anzeigen, false=verstecken)
     * "LoadingState" (Boolean: true=Form disabled + Spinner, false=normal)

### 2. SECTION A: GRUNDINFORMATIONEN
   Component: "Section BasicInfo"
   - Header: "Grundinformationen" (16px Bold, Dunkelblau)
   - Layout: 2-Column Grid wo möglich
   - Fields (mit Required Marker *):
     * Name * (Type: TextInput, Placeholder: "z.B. Mittagessen")
     * Description * (Type: TextArea, Placeholder: "Beschreibung der Leistung...", Rows: 4)
     * FrequencyType * (Type: Dropdown, Options: "Daily" | "Weekly" | "Monthly")
     * CategoryType * (Type: Dropdown, Options: "Cash" | "Benefit" | "Product")
     * Status * (Type: Toggle, Options: "Active" | "Inactive")

   Field Component Spec:
   - Label: 13px Regular, Grau
   - Input: 13px Regular, Black
   - Border: 1px #E0E0E0
   - Padding: 10px 12px
   - Border-Radius: 4px
   - Focus State: Blue Border (#2196F3) + Shadow
   - Required Marker: Red Asterisk (*)

### 3. SECTION B: KONFIGURATION
   Component: "Section Configuration"
   - Header: "Konfiguration" (16px Bold, Dunkelblau)
   - Layout: 1-Column
   - Fields:
     * TaxLiable (Type: Toggle, Label: "Steuerpflichtige Leistung", Description: "Aktivieren wenn diese Leistung besteuert werden muss")
     * DifferentTimesPerYear (Type: Toggle, Label: "Unterschiedliche Limits pro Jahr", Description: "Aktivieren um unterschiedliche Limits für verschiedene Jahre zu setzen")
     * ColorPicker * (Type: Color Picker Component mit Hex-Input)
       - Default Color aus Benefit-Definition (z.B. #F4B860 für Essenszuschuss)
     * ImageUpload * (Type: File Upload, Accept: "image/svg+xml, image/png", Label: "Benefit Icon (SVG oder PNG)")
       - Placeholder: "Ziehe Datei herein oder klicke zum Auswählen"
       - Preview: 64x64px Icon anzeigen wenn vorhanden

### 4. SECTION C: JAHRES-LIMITS (Year-by-Year Limits)
   Component: "Section YearlyLimits"
   - Header: "Limits pro Jahr" (16px Bold, Dunkelblau)
   - Beschreibung: "Definiere täglich, monatlich und standardmäßig verfügbare Limits für jedes Jahr." (12px Regular, Grau)
   - Container: Table Component "YearlyLimitsTable"

   Condition: Nur sichtbar wenn "DifferentTimesPerYear" = true

   Table Columns:
   - [0] JAHR (13px Bold, Grau) — Wert: 2019, 2020, 2021, ..., 2027
   - [1] DAILY LIMIT (Type: NumberInput mit optional "€" / "Stunden" Unit)
   - [2] MONTHLY LIMIT (Type: NumberInput mit optional "€" / "Stunden" Unit)
   - [3] STANDARD AMOUNT (Type: NumberInput mit "€" / "Stunden" Unit)

   Table Styling:
   - Header Row: Background #F5F5F5, 13px Bold
   - Data Rows: Alternating White / #FAFAFA
   - Hover State: Background #E3F2FD
   - Border: 1px #E0E0E0
   - Input Fields in Cells: Padding 8px, Border: 1px #E0E0E0
   - Row Height: 48px

   Rows: 9 Total (2019-2027)
2019 | [Input] | [Input] | [Input]
2020 | [Input] | [Input] | [Input]
2021 | [Input] | [Input] | [Input]
2022 | [Input] | [Input] | [Input]
2023 | [Input] | [Input] | [Input]
2024 | [Input] | [Input] | [Input]
2025 | [Input] | [Input] | [Input]
2026 | [Input] | [Input] | [Input]
2027 | [Input] | [Input] | [Input]



### 5. SECTION D: LIMITS PRO STANDORT (Location-based Limits)
Component: "Section LocationLimits"
- Header: "Limits pro Standort" (16px Bold, Dunkelblau)
- Beschreibung: "Hier werden die Limits für jeden Standort dargestellt. Um ein Limit zu ändern, klicke auf 'Bearbeiten'." (12px Regular, Grau)
- Container: Table Component "LocationLimitsTable"

Table Columns:
- [0] STANDORT (13px Regular, Black)
- [1] LIMIT (13px Regular, Black) — zeigt z.B. "10€/Monat"
- [2] AKTION (Button: "Bearbeiten")

Table Styling: (wie YearlyLimitsTable)

Sample Rows:
München | 10€/Monat | [Bearbeiten Button]
Heidelsheim | 10€/Monat | [Bearbeiten Button]
Berlin | 8€/Monat | [Bearbeiten Button]
Vanillum | 10€/Monat | [Bearbeiten Button]



Button Interaction:
- Clicking "Bearbeiten" → Opens Modal: "Limit bearbeiten – [BenefitName] – [LocationName]"
  * Modal mit Label "Limit pro Mitarbeiter"
  * NumberInput (z.B. "100" mit "€/Monat" Unit)
  * Hinweis: "Änderung gilt ab 1. nächsten Monat für alle Mitarbeiter dieses Standorts"
  * Buttons: Abbrechen | Speichern

### 6. SECTION E: STANDORTE (Available Locations)
Component: "Section AvailableLocations"
- Header: "Verfügbar für diese Standorte" (16px Bold, Dunkelblau)
- Beschreibung: "Wähle aus, für welche Standorte diese Leistung verfügbar sein soll." (12px Regular, Grau)
- Container: Checkbox List

Layout: Spalten-Layout mit Checkboxes
Jeder Eintrag:
- Checkbox (Type: Checkbox Component)
- Location Name (13px Regular, Black)
- Employee Count in Klammern (13px Regular, Grau) — z.B. "(34 Mitarbeiter)"

Sample Entries:
☑ München (34 Mitarbeiter)
☑ Heidelsheim (15 Mitarbeiter)
☑ Berlin (8 Mitarbeiter)
☐ Varnheim (5 Mitarbeiter)



### 7. SECTION F: NUTZUNGSSTATISTIK (Usage Statistics)
Component: "Section UsageStatistics"
- Header: "Nutzungsstatistik" (16px Bold, Dunkelblau)
- Layout: 3-Column Grid (responsive auf Single Column bei Mobile)

Cards (je 1 Card):

Card 1: "Mitarbeiter im Zugriff"
- Large Number: "62" (24px Bold, Dunkelblau)
- Label: "Mitarbeiter im Zugriff" (12px Regular, Grau)
- Background: Light Blue (#E3F2FD)

Card 2: "Budget diesen Monat"
- Large Number: "4.200€" (24px Bold, Green #4CAF50)
- Label: "Budget diesen Monat" (12px Regular, Grau)
- Background: Light Green (#E8F5E9)

Card 3: "Genutzt diesen Monat"
- Large Number: "3.100€" (24px Bold, Orange #FF9800)
- Label: "Genutzt diesen Monat" (12px Regular, Grau)
- Background: Light Orange (#FFF3E0)

### 8. LAYER STRUKTUR (HIERARCHIE)

Component: "Benefit Form"
├── ErrorBanner (Conditional: nur wenn HasErrors=true)
│   ├── Background: Red (#E74C3C)
│   ├── Text: "Fehler beim Speichern. Bitte versuchen Sie es später erneut."
│   └── Icon: Close Button
├── LoadingOverlay (Conditional: nur wenn LoadingState=true)
│   ├── Background: Semi-transparent
│   └── Spinner: Centered
├── Section: BasicInfo
│   ├── Header
│   ├── 2-Column Grid
│   │   ├── TextInput: Name
│   │   ├── TextInput: FrequencyType (Dropdown)
│   │   ├── TextArea: Description (2 rows)
│   │   ├── Dropdown: CategoryType
│   │   └── Toggle: Status
├── Section: Configuration
│   ├── Header
│   ├── Toggle: TaxLiable
│   ├── Toggle: DifferentTimesPerYear
│   ├── ColorPicker: Color
│   └── FileUpload: Image
├── Section: YearlyLimits (Conditional: wenn DifferentTimesPerYear=true)
│   ├── Header
│   └── YearlyLimitsTable (9 Rows für 2019-2027)
├── Section: LocationLimits
│   ├── Header
│   └── LocationLimitsTable (mit "Bearbeiten" Buttons)
├── Modal: "Limit bearbeiten – [BenefitName] – [LocationName]"
│   ├── Label: "Limit pro Mitarbeiter"
│   ├── NumberInput
│   ├── Hinweis Text
│   └── Buttons: Abbrechen | Speichern
├── Section: AvailableLocations
│   ├── Header
│   └── CheckboxList (4 Locations mit Employee Count)
├── Section: UsageStatistics
│   ├── Header
│   ├── Stat Card: "Mitarbeiter im Zugriff" (62)
│   ├── Stat Card: "Budget diesen Monat" (4.200€)
│   └── Stat Card: "Genutzt diesen Monat" (3.100€)
└── Footer: Action Buttons
├── Button: "Speichern" (Primary, Green #4CAF50)
├── Button: "Abbrechen" (Secondary, White)
└── Button: "Löschen" (Destructive, Red #E74C3C, nur im Edit Mode)



### 9. COMPONENT PROPERTIES (Global)

Mode:
- "Create" → Footer zeigt: "Speichern" + "Abbrechen", Title: "Neuen Benefit erstellen"
- "Edit" → Footer zeigt: "Speichern" + "Abbrechen" + "Löschen", Title: "[BenefitName]"

HasErrors:
- true → ErrorBanner sichtbar, Form geringfügig transparent
- false → ErrorBanner versteckt

LoadingState:
- true → Alle Input-Felder disabled, Buttons disabled, Spinner sichtbar
- false → Normal interaktiv

### 10. CONDITIONAL LOGIC

YearlyLimitsTable Sichtbarkeit:
- Nur anzeigen wenn "DifferentTimesPerYear" Toggle = true
- Animation: Smooth Fade-In/Fade-Out beim Toggle

DeleteButton Sichtbarkeit:
- Nur im "Edit" Mode anzeigen
- Nicht im "Create" Mode

### 11. RESPONSIVE VARIANTS

Erstelle Variants für:
- Desktop (>1200px): 2-Column Layout für BasicInfo, volle Breite für Tabellen
- Tablet (768-1200px): 1-Column Layout für BasicInfo, Tabellen horizontal scrollbar
- Mobile (<768px): Vollständig stacked, Single Column, Tables compact (Spalten reduziert)

### 12. COMPONENT TEST INSTANCES

Nach Setup: Erstelle Test-Instanzen mit folgenden Kombinationen:

1. Benefit Create Form
   - Mode: Create
   - HasErrors: false
   - LoadingState: false
   - Alle Felder leer
   - Title: "Neuen Benefit erstellen"

2. Benefit Edit Form (Mittagessen gefüllt)
   - Mode: Edit
   - HasErrors: false
   - LoadingState: false
   - Daten:
     * Name: "Mittagessen"
     * Description: "Der Essenszuschuss ermöglicht Mitarbeitern die Nutzung von Essensgutscheinen oder direkten Mitarbeiterverpflegung."
     * FrequencyType: "Monthly"
     * CategoryType: "Cash"
     * Status: "Active"
     * TaxLiable: false
     * DifferentTimesPerYear: true
     * ColorPicker: #F4B860
     * Image: mittagessen.svg
   - YearlyLimitsTable sichtbar mit Beispiel-Werten (2024: 100€ Daily, 1000€ Monthly, 1200€ Standard)
   - LocationLimits: München (10€/Monat), Heidelsheim (10€/Monat), Berlin (8€/Monat)
   - AvailableLocations: München, Heidelsheim, Berlin checked; Varnheim unchecked
   - UsageStatistics: 62, 4.200€, 3.100€

3. Benefit Edit Form (DifferentTimesPerYear=false)
   - Mode: Edit
   - HasErrors: false
   - DifferentTimesPerYear: false
   - YearlyLimitsTable NICHT sichtbar
   - Alle anderen Felder gefüllt

4. Benefit Form mit Error
   - Mode: Edit
   - HasErrors: true
   - LoadingState: false
   - Error Banner sichtbar

5. Benefit Form Loading
   - Mode: Edit
   - HasErrors: false
   - LoadingState: true
   - Spinner + disabled Buttons

6. Benefit Form Mobile (Tablet Variant)
   - Mode: Edit
   - HasErrors: false
   - LoadingState: false
   - Single Column Layout, Tables compact

### 13. INPUT/OUTPUT KONFIGURATION

Input Assets (müssen in Assets Panel vorhanden sein):
- Alle 11 Benefit Icons (essenszuschuss.svg, internet.svg, etc.)
- UI Icons: Plus Icon, Trash Icon, Close Icon, Upload Icon

Output:
- Main Component: "Benefit Form"
- Sub-Components: BasicInfo Section, Configuration Section, YearlyLimits Section, LocationLimits Section, AvailableLocations Section, UsageStatistics Section, LocationLimitModal
- Variants: Create Mode, Edit Mode, Error State, Loading State, Mobile Variant, DifferentTimesPerYear ON/OFF

### 14. VALIDIERUNGS-CHECKLIST

Nach Figma Make Generierung prüfen:

- [ ] Main Component "Benefit Form" existiert
- [ ] Component Properties vorhanden: Mode, HasErrors, LoadingState
- [ ] Section A: BasicInfo mit 5 Feldern korrekt (Name, Description, FrequencyType, CategoryType, Status)
- [ ] Section B: Configuration mit TaxLiable, DifferentTimesPerYear, ColorPicker, ImageUpload
- [ ] Section C: YearlyLimitsTable mit 9 Rows (2019-2027) + 3 Spalten (Daily, Monthly, Standard)
- [ ] YearlyLimitsTable: Conditional Logic funktioniert (nur bei DifferentTimesPerYear=true sichtbar)
- [ ] Section D: LocationLimitsTable mit "Bearbeiten" Buttons
- [ ] Modal "Limit bearbeiten" funktioniert mit NumberInput + Hinweis
- [ ] Section E: AvailableLocations mit Checkbox List + Employee Count
- [ ] Section F: UsageStatistics mit 3 Stat Cards (Mitarbeiter, Budget, Genutzt)
- [ ] ErrorBanner: nur bei HasErrors=true sichtbar
- [ ] LoadingOverlay: nur bei LoadingState=true sichtbar
- [ ] DeleteButton: nur im Edit Mode sichtbar
- [ ] Footer Buttons: Mode-abhängig korrekt (Create vs. Edit)
- [ ] Responsive Variants (Desktop, Tablet, Mobile) funktionieren
- [ ] Test-Instanzen erzeugt: Create, Edit (2 Varianten), Error, Loading, Mobile
- [ ] Alle Icons korrekt verlinkt
- [ ] Farben matchen Spezifikation (Color Picker z.B. #F4B860)
- [ ] Spacing & Padding konsistent
- [ ] Keine Fehlermeldungen in Figma

---

**Format:** Copy-Paste-Ready für Figma Make Generative Features
Ready! 🎯

lass uns mit der loaction weiter machen

Figma Make Prompt: Location Management Form System

**Ziel:** Erstelle ein komplettes Location Edit/Create Form Component System mit Tax ID, Address, Products Assignment und Yearly Limits.

---

## 🎯 AUFGABE FÜR FIGMA MAKE

Erstelle in Figma ein Location Management Form System mit folgenden Anforderungen:

### 1. MAIN COMPONENT "Location Form"
   - Frame: Auto-Layout aktiviert (Vertical, Spacing: 24px)
   - Component Properties:
     * "Mode" (Enum: "Create" | "Edit")
     * "HasErrors" (Boolean: true=Error Banner anzeigen, false=verstecken)
     * "LoadingState" (Boolean: true=Form disabled + Spinner, false=normal)

### 2. SECTION A: STANDORT-STAMMDATEN
   Component: "Section LocationMasterData"
   - Header: "Standort-Stammdaten" (16px Bold, Dunkelblau)
   - Layout: 2-Column Grid wo möglich
   - Fields (mit Required Marker *):
     * LocationName * (Type: TextInput, Placeholder: "z.B. Heidelsheim, München, etc.")
     * Company * (Type: Dropdown, Placeholder: "z.B. Casual Software GmbH")
     * TaxIdentificationNumber (Type: TextInput, Placeholder: "z.B. DE123456789")
       - Label: "Steuernummer / VAT ID"
       - Optional (kein Required Marker)

   Field Component Spec:
   - Label: 13px Regular, Grau
   - Input: 13px Regular, Black
   - Border: 1px #E0E0E0
   - Padding: 10px 12px
   - Border-Radius: 4px
   - Focus State: Blue Border (#2196F3) + Shadow
   - Required Marker: Red Asterisk (*)

### 3. SECTION B: ADRESSE
   Component: "Section Address"
   - Header: "Adresse" (16px Bold, Dunkelblau)
   - Layout: 2-Column Grid
   - Fields (mit Required Marker *):
     * Address * (Type: TextInput, Placeholder: "Vollständige Adresse mit Straße, Hausnummer und Ort")
     * Street * (Type: TextInput, Placeholder: "z.B. Fürstenrieder Straße 279A")
     * City * (Type: TextInput, Placeholder: "z.B. München")
     * State * (Type: Dropdown, Placeholder: "Bitte auswählen")
       - Options: Bayern, Baden-Württemberg, Hessen, NRW, ... (Standard German States)
     * ZipCode * (Type: TextInput, Placeholder: "z.B. 81377")
     * Country * (Type: Dropdown, Placeholder: "Deutschland", Default: "Deutschland")
       - Options: Deutschland, Österreich, Schweiz, Liechtenstein, etc.

### 4. SECTION C: KONTAKTDATEN
   Component: "Section ContactData"
   - Header: "Kontaktdaten" (16px Bold, Dunkelblau)
   - Layout: 2-Column Grid
   - Fields:
     * Phone (Type: TextInput, Format: "+49 xxx...", Placeholder: "z.B. +49 241 5850001")
     * Fax (Type: TextInput, Format: "+49 xxx...", Placeholder: "z.B. +49 241 5850079")

### 5. SECTION D: STANDORTTYP
   Component: "Section LocationType"
   - Header: "Standorttyp" (16px Bold, Dunkelblau)
   - Layout: 1-Column
   - Fields:
     * Type * (Type: RadioGroup, Options: "Standort" | "Tochterunternehmen")
       - Default: "Standort"

### 6. SECTION E: ZUGEORDNETE PRODUKTE (Location Products)
   Component: "Section AssignedProducts"
   - Header: "Zugeordnete Produkte" (16px Bold, Dunkelblau)
   - Beschreibung: "Produkte mit täglichen und monatlichen Limits für diesen Standort." (12px Regular, Grau)
   - Container: Table Component "LocationProductsTable"

   Table Columns:
   - [0] Checkbox (Type: Checkbox Component)
   - [1] ProductIcon (24x24px, Icon Asset referenzieren)
   - [2] ProductName (13px Regular, Black)
   - [3] DailyLimit (Type: NumberInput mit "€" Unit Label)
   - [4] MonthlyLimit (Type: NumberInput mit "€" Unit Label)
   - [5] Remove (Type: IconButton mit Trash Icon)

   Products Rows (Beispiele):
   - Mittagessen (Asset: mittagessen.svg | Farbe: #F4B860) | 60 | 60
   - Internet (Asset: internet.svg | Farbe: #4CAF50) | 50 | 50
   - Kindergartenzuschuss (Asset: kindergarten.svg | Farbe: #FF6B6B) | 800 | 800
   - ÖPNV (Asset: oepnv.svg | Farbe: #2196F3) | 63 | 63
   - Sachbezug (Asset: sachbezug.svg | Farbe: #E91E63) | 50 | 50
   - (weitere...)

   Table Styling:
   - Header Row: Background #F5F5F5, 13px Bold
   - Data Rows: Alternating White / #FAFAFA
   - Hover State: Background #E3F2FD
   - Border: 1px #E0E0E0
   - Input Fields in Cells: Padding 8px, Border: 1px #E0E0E0
   - Row Height: 48px

   Button unter Tabelle:
   - "+ Produkt hinzufügen" (13px Regular, Blau, Icon: Plus)

### 7. SECTION F: JAHRES-LIMIT PRODUKTE (Yearly Limit Products)
   Component: "Section YearlyLimitProducts"
   - Header: "Produkte mit Jahres-Limits" (16px Bold, Dunkelblau)
   - Beschreibung: "Produkte mit Limits die pro Jahr unterschiedlich sein können." (12px Regular, Grau)
   - Container: Table Component "YearlyLimitProductsTable"

   Table Columns:
   - [0] Checkbox (Type: Checkbox Component)
   - [1] ProductIcon (24x24px, Icon Asset referenzieren)
   - [2] ProductName (13px Regular, Black)
   - [3-6] YearlyLimits (4 Columns für 2024 | 2025 | 2026 | 2027)
     * Jede Spalte: NumberInput mit "€" Unit Label
   - [7] Remove (Type: IconButton mit Trash Icon)

   Products Rows (Beispiele):
   - Danke-Bonus (Asset: danke-bonus.svg | Farbe: #4CAF50) | 10000 | 10000 | 10000 | 10000
   - Erholung (Asset: erholung.svg | Farbe: #2196F3) | 2000 | 2000 | 2000 | 2000
   - (weitere...)

   Table Styling: (wie Section E)

   Button unter Tabelle:
   - "+ Produkt hinzufügen" (13px Regular, Blau, Icon: Plus)

### 8. LAYER STRUKTUR (HIERARCHIE)

Component: "Location Form"
├── ErrorBanner (Conditional: nur wenn HasErrors=true)
│   ├── Background: Red (#E74C3C)
│   ├── Text: "Fehler beim Speichern. Bitte versuchen Sie es später erneut."
│   └── Icon: Close Button
├── LoadingOverlay (Conditional: nur wenn LoadingState=true)
│   ├── Background: Semi-transparent
│   └── Spinner: Centered
├── Section: LocationMasterData
│   ├── Header
│   ├── 2-Column Grid
│   │   ├── TextInput: LocationName
│   │   ├── Dropdown: Company
│   │   └── TextInput: TaxIdentificationNumber
├── Section: Address
│   ├── Header
│   ├── 2-Column Grid
│   │   ├── TextInput: Address
│   │   ├── TextInput: Street
│   │   ├── TextInput: City
│   │   ├── Dropdown: State
│   │   ├── TextInput: ZipCode
│   │   └── Dropdown: Country
├── Section: ContactData
│   ├── Header
│   ├── 2-Column Grid
│   │   ├── TextInput: Phone
│   │   └── TextInput: Fax
├── Section: LocationType
│   ├── Header
│   └── RadioGroup: Type (Standort / Tochterunternehmen)
├── Section: AssignedProducts
│   ├── Header
│   ├── LocationProductsTable (mit Product Rows + Daily/Monthly Limits)
│   └── Button: "+ Produkt hinzufügen"
├── Section: YearlyLimitProducts
│   ├── Header
│   ├── YearlyLimitProductsTable (mit Product Rows + Yearly Limits 2024-2027)
│   └── Button: "+ Produkt hinzufügen"
└── Footer: Action Buttons
├── Button: "Standort erstellen" oder "Speichern" (Primary, Green #4CAF50)
├── Button: "Abbrechen" (Secondary, White)
└── Button: "Löschen" (Destructive, Red #E74C3C, nur im Edit Mode)



### 9. COMPONENT PROPERTIES (Global)

Mode:
- "Create" → Footer zeigt: "Standort erstellen" + "Abbrechen", Title: "Neuen Standort erstellen"
- "Edit" → Footer zeigt: "Speichern" + "Abbrechen" + "Löschen", Title: "[LocationName]"

HasErrors:
- true → ErrorBanner sichtbar, Form geringfügig transparent
- false → ErrorBanner versteckt

LoadingState:
- true → Alle Input-Felder disabled, Buttons disabled, Spinner sichtbar
- false → Normal interaktiv

### 10. RESPONSIVE VARIANTS

Erstelle Variants für:
- Desktop (>1200px): 2-Column Layout für Master Data, Address, Contact Data, volle Breite für Tabellen
- Tablet (768-1200px): 1-Column Layout, Tabellen horizontal scrollbar
- Mobile (<768px): Vollständig stacked, Single Column, Tables compact (Spalten reduziert)

### 11. COMPONENT TEST INSTANCES

Nach Setup: Erstelle Test-Instanzen mit folgenden Kombinationen:

1. Location Create Form
   - Mode: Create
   - HasErrors: false
   - LoadingState: false
   - Alle Felder leer
   - Title: "Neuen Standort erstellen"

2. Location Edit Form (München gefüllt)
   - Mode: Edit
   - HasErrors: false
   - LoadingState: false
   - Daten:
     * LocationName: "München"
     * Company: "Cassianiel Software"
     * TaxIdentificationNumber: "DE123456789"
     * Address: "Fürstenrieder Straße 279A, 81377 München"
     * Street: "Fürstenrieder Straße 279A"
     * City: "München"
     * State: "Bayern"
     * ZipCode: "81377"
     * Country: "Deutschland"
     * Phone: "+49 241 5850001"
     * Fax: "+49 241 5850079"
     * Type: "Standort"
   - AssignedProducts Table mit 5 Produkte:
     * Mittagessen: 60€/day, 600€/month
     * Internet: 50€/day, 500€/month
     * Kindergartenzuschuss: 800€/day, 800€/month
     * ÖPNV: 63€/day, 630€/month
     * Sachbezug: 50€/day, 500€/month
   - YearlyLimitProducts Table mit 2 Produkte:
     * Danke-Bonus: 10000€ (2024), 10000€ (2025), 10000€ (2026), 10000€ (2027)
     * Erholung: 2000€ (2024), 2000€ (2025), 2000€ (2026), 2000€ (2027)

3. Location Edit Form (Type = Tochterunternehmen)
   - Mode: Edit
   - HasErrors: false
   - Type: "Tochterunternehmen"
   - Alle anderen Felder gefüllt

4. Location Form mit Error
   - Mode: Edit
   - HasErrors: true
   - LoadingState: false
   - Error Banner sichtbar

5. Location Form Loading
   - Mode: Edit
   - HasErrors: false
   - LoadingState: true
   - Spinner + disabled Buttons

6. Location Form Mobile (Tablet Variant)
   - Mode: Edit
   - HasErrors: false
   - LoadingState: false
   - Single Column Layout, Tables compact

### 12. INPUT/OUTPUT KONFIGURATION

Input Assets (müssen in Assets Panel vorhanden sein):
- Alle Product Icons (mittagessen.svg, internet.svg, kindergarten.svg, oepnv.svg, sachbezug.svg, danke-bonus.svg, erholung.svg, etc.)
- UI Icons: Plus Icon, Trash Icon, Close Icon

Output:
- Main Component: "Location Form"
- Sub-Components: LocationMasterData Section, Address Section, ContactData Section, LocationType Section, AssignedProducts Section, YearlyLimitProducts Section
- Variants: Create Mode, Edit Mode, Error State, Loading State, Mobile Variant

### 13. VALIDIERUNGS-CHECKLIST

Nach Figma Make Generierung prüfen:

- [ ] Main Component "Location Form" existiert
- [ ] Component Properties vorhanden: Mode, HasErrors, LoadingState
- [ ] Section A: LocationMasterData mit 3 Feldern korrekt (LocationName, Company, TaxIdentificationNumber)
- [ ] Section B: Address mit 6 Feldern korrekt (Address, Street, City, State, ZipCode, Country)
- [ ] Section C: ContactData mit 2 Feldern korrekt (Phone, Fax)
- [ ] Section D: LocationType mit RadioGroup (Standort / Tochterunternehmen)
- [ ] Section E: AssignedProductsTable mit Daily/Monthly Limits
- [ ] Section F: YearlyLimitProductsTable mit 4 Spalten für 2024-2027
- [ ] ErrorBanner: nur bei HasErrors=true sichtbar
- [ ] LoadingOverlay: nur bei LoadingState=true sichtbar
- [ ] DeleteButton: nur im Edit Mode sichtbar
- [ ] Footer Buttons: Mode-abhängig korrekt (Create vs. Edit)
- [ ] Responsive Variants (Desktop, Tablet, Mobile) funktionieren
- [ ] Test-Instanzen erzeugt: Create, Edit (2 Varianten), Error, Loading, Mobile
- [ ] Alle Icons korrekt verlinkt (Product Icons, UI Icons)
- [ ] Spacing & Padding konsistent
- [ ] Keine Fehlermeldungen in Figma

---
