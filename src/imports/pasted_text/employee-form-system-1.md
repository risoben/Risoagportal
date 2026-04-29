Figma Make Prompt: Employee Management Form System (Updated)

**Ziel:** Erstelle ein komplettes Employee Edit/Create Form Component System mit Info-Buttons für Benefits und ohne Jahres-Limits-Sektion.

---

## 🎯 AUFGABE FÜR FIGMA MAKE

Erstelle in Figma ein Employee Management Form System mit folgenden Anforderungen:

### 1. MAIN COMPONENT "Employee Form"
   - Frame: Auto-Layout aktiviert (Vertical, Spacing: 24px)
   - Component Properties:
     * "Mode" (Enum: "Create" | "Edit")
     * "HasErrors" (Boolean: true=Error Banner anzeigen, false=verstecken)
     * "LoadingState" (Boolean: true=Form disabled + Spinner, false=normal)

### 2. SECTION A: PERSÖNLICHE DATEN (Personal Information)
   Component: "Section PersonalData"
   - Header: "Persönliche Daten" (16px Bold, Dunkelblau)
   - Layout: 2 Spalten wo möglich

   Fields:
   - Email * (Eingabefeld, Type: email)
   - Password * (Eingabefeld, Type: password, mit "Eye Icon" zum Anzeigen/Verbergen)
   - Name * (Eingabefeld)
   - Surname * (Eingabefeld)
   - Gender * (Radio Buttons oder Dropdown: Männlich / Weiblich / Divers / Keine Angabe)
   - Date of Birth * (Date Picker, Format: DD.MM.YYYY)
   - Phone (Eingabefeld, Format: +49 xxx)
   - Employee No. * (Eingabefeld)

### 3. SECTION B: UNTERNEHMENS-ZUORDNUNG (Company Assignment)
   Component: "Section CompanyAssignment"
   - Header: "Unternehmens-Zuordnung" (16px Bold, Dunkelblau)
   - Layout: 2-Column Grid

   Fields:
   - Company * (Dropdown, z.B. "Fine Cotton Company", "Cassianiel Software")
   - Location * (Dropdown, abhängig von Company, z.B. "München", "Heidelsheim")
   - Department / Abteilung (Eingabefeld, optional)
   - Status * (Toggle: Active / Inactive)
   - Start Date (Date Picker)
   - End Date (Date Picker, optional für ausgeschiedene Mitarbeiter)

### 4. SECTION C: FAMILIENSITUATION (Family Situation)
   Component: "Section FamilySituation"
   - Header: "Familiensituation" (16px Bold, Dunkelblau)
   - Layout: 1-Column

   Fields:
   - Marital Status * (Dropdown: Single / Married / Divorced / Widowed)
   - Number of Children * (Number Input oder Dropdown: 0, 1, 2, 3+)

### 5. SECTION D: ZUGEORDNETE BENEFITS (Assigned Benefits)
   Component: "Section AssignedBenefits"
   - Header: "Mitarbeiter-Benefits" (16px Bold, Dunkelblau)
   - Beschreibung: "Wähle die Leistungen, die dieser Mitarbeiter erhalten soll. Die tatsächlichen Limits pro Standort sind in der Benefit-Detail-Seite definiert." (12px Regular, Grau)
   - Container: Table Component "BenefitAssignmentTable"

   Table Columns:
   - [0] Checkbox (Type: Checkbox Component)
   - [1] BenefitIcon (24x24px, Icon Asset referenzieren)
   - [2] BenefitName (13px Regular, Black)
   - [3] Frequency (13px Regular, Grau, READ-ONLY - aus Backend)
   - [4] DailyLimit (READ-ONLY — grauer Background, NICHT EDITIERBAR — Limit ist vorgesetzt)
   - [5] MonthlyLimit (Type: NumberInput mit "€" Unit Label — EDITIERBAR)
   - [6] Info Button (Type: IconButton mit Info Icon "i")
     * On Click → Shows Tooltip/Modal: "[BenefitName] monatliches Limit"
     * Modal Content:
       - Title: "[BenefitName]"
       - Description: "Das monatliche Limit definiert die maximale Summe, die pro Monat für diesen Mitarbeiter verfügbar ist."
       - Example: "z.B. Essenszuschuss mit 10€/Monat = max. 10€ pro Monat nutzbar"
       - Close Button
   - [7] Remove (Type: IconButton mit Trash Icon)

   Benefits Rows (11 Total):
   - Essenszuschuss (Asset: essenszuschuss.svg | Farbe: #F4B860)
   - Internet (Asset: internet.svg | Farbe: #4CAF50)
   - Kindergarten (Asset: kindergarten.svg | Farbe: #FF6B6B)
   - Commuting (Asset: commuting.svg | Farbe: #4CAF50)
   - Erholung (Asset: erholung.svg | Farbe: #2196F3)
   - Sachbezug (Asset: sachbezug.svg | Farbe: #E91E63)
   - Danke-Bonus (Asset: danke-bonus.svg | Farbe: #4CAF50)
   - Geburtstag (Asset: geburtstag.svg | Farbe: #FFC107)
   - ÖPNV (Asset: oepnv.svg | Farbe: #2196F3)
   - BKV (Asset: bkv.svg | Farbe: #0F429F)
   - BAV (Asset: bav.svg | Farbe: #8E44AD)

   DailyLimit Styling (READ-ONLY):
   - Background: #F5F5F5 (grau)
   - Border: 1px #CCCCCC
   - Text Color: #999999
   - Cursor: not-allowed
   - No Focus State (disabled field)

   MonthlyLimit Styling (EDITIERBAR):
   - Border: 1px #E0E0E0
   - Focus: Blue Border (#2196F3) + Shadow
   - Padding: 8px

   Info Button Styling:
   - Icon: Circled "i" (Info Icon)
   - Size: 20x20px
   - Background: Transparent
   - Hover: Light Blue Background (#E3F2FD)
   - Cursor: pointer
   - Color: #2196F3

   Info Modal Styling:
   - Background: White
   - Border: 1px #E0E0E0
   - Border-Radius: 8px
   - Padding: 20px
   - Shadow: Medium Drop Shadow
   - Title: 16px Bold, Dunkelblau
   - Description: 13px Regular, Grau
   - Close Button: Top-Right, Red X Icon

   Table Styling:
   - Header Row: Background #F5F5F5, 13px Bold
   - Data Rows: Alternating White / #FAFAFA
   - Hover State: Background #E3F2FD
   - Border: 1px #E0E0E0
   - Row Height: 48px

   Button unter Tabelle:
   - "+ Weitere Benefit hinzufügen" (13px Regular, Blau, Icon: Plus)

### 6. LAYER STRUKTUR (HIERARCHIE)

Component: "Employee Form"
├── ErrorBanner (Conditional: nur wenn HasErrors=true)
│   ├── Background: Red (#E74C3C)
│   ├── Text: "Fehler beim Speichern. Bitte versuchen Sie es später erneut."
│   └── Icon: Close Button
├── LoadingOverlay (Conditional: nur wenn LoadingState=true)
│   ├── Background: Semi-transparent
│   └── Spinner: Centered
├── Section: PersonalData
│   ├── Header
│   ├── 2-Column Grid
│   │   ├── TextInput: Email
│   │   ├── PasswordInput: Password
│   │   ├── TextInput: Name
│   │   ├── TextInput: Surname
│   │   ├── RadioGroup: Gender
│   │   ├── DatePicker: DateOfBirth
│   │   ├── TextInput: Phone
│   │   └── TextInput: EmployeeNo
├── Section: CompanyAssignment
│   ├── Header
│   ├── 2-Column Grid
│   │   ├── Dropdown: Company
│   │   ├── Dropdown: Location (Dependent)
│   │   ├── TextInput: Department
│   │   ├── Toggle: Status
│   │   ├── DatePicker: StartDate
│   │   └── DatePicker: EndDate
├── Section: FamilySituation
│   ├── Header
│   ├── Dropdown: MaritalStatus
│   └── NumberInput: NumberOfChildren
├── Section: AssignedBenefits
│   ├── Header
│   ├── BenefitAssignmentTable (mit 11 Benefit Rows)
│   │   ├── [0] Checkbox
│   │   ├── [1] BenefitIcon
│   │   ├── [2] BenefitName
│   │   ├── [3] Frequency (READ-ONLY)
│   │   ├── [4] DailyLimit (READ-ONLY, grau)
│   │   ├── [5] MonthlyLimit (NumberInput, editierbar)
│   │   ├── [6] InfoButton (mit Tooltip Modal)
│   │   └── [7] Remove Button (Trash Icon)
│   └── Button: "+ Weitere Benefit hinzufügen"
├── Modal: "Benefit Info – [BenefitName]"
│   ├── Title: "[BenefitName]"
│   ├── Description: "Das monatliche Limit definiert..."
│   ├── Example Text
│   └── Close Button
└── Footer: Action Buttons
├── Button: "Speichern" (Primary, Green #4CAF50)
├── Button: "Abbrechen" (Secondary, White)
└── Button: "Löschen" (Destructive, Red #E74C3C, nur im Edit Mode)



### 7. COMPONENT PROPERTIES (Global)

Mode:
- "Create" → Footer zeigt: "Speichern" + "Abbrechen"
- "Edit" → Footer zeigt: "Speichern" + "Abbrechen" + "Löschen"

HasErrors:
- true → ErrorBanner sichtbar, Form geringfügig transparent
- false → ErrorBanner versteckt

LoadingState:
- true → Alle Input-Felder disabled, Buttons disabled, Spinner sichtbar
- false → Normal interaktiv

### 8. RESPONSIVE VARIANTS

Erstelle Variants für:
- Desktop (>1200px): 2-Column Layout für PersonalData, volle Breite für Tabellen
- Tablet (768-1200px): 1-Column Layout, Tabellen horizontal scrollbar
- Mobile (<768px): Vollständig stacked, Single Column, Tabellen compact

### 9. COMPONENT TEST INSTANCES

Nach Setup: Erstelle Test-Instanzen mit folgenden Kombinationen:

1. Employee Create Form
   - Mode: Create
   - HasErrors: false
   - LoadingState: false
   - Alle Felder leer

2. Employee Edit Form (Max Mustermann gefüllt)
   - Mode: Edit
   - HasErrors: false
   - LoadingState: false
   - Daten: Max Mustermann (komplett gefüllt)
   - 2 Benefits zugeordnet:
     * Internet: DailyLimit: READ-ONLY "50", MonthlyLimit: "500", InfoButton sichtbar
     * ÖPNV: DailyLimit: READ-ONLY "63", MonthlyLimit: "630", InfoButton sichtbar

3. Employee Form mit Info Modal (Info Button geklickt)
   - Mode: Edit
   - Info Modal für "Internet" sichtbar
   - Modal zeigt:
     * Title: "Internet"
     * Description: "Das monatliche Limit definiert die maximale Summe..."
     * Close Button

4. Employee Form mit Error
   - Mode: Edit
   - HasErrors: true
   - Error Banner sichtbar

5. Employee Form Loading
   - Mode: Edit
   - LoadingState: true
   - Spinner + disabled Buttons

6. Employee Form Mobile
   - Mode: Edit
   - Single Column Layout, Tabellen compact

### 10. INPUT/OUTPUT KONFIGURATION

Input Assets:
- Alle 11 Benefit Icons (essenszuschuss.svg, internet.svg, etc.)
- UI Icons: Plus Icon, Trash Icon, Close Icon, Eye Icon, Info Icon ("i" in Kreis)

Output:
- Main Component: "Employee Form"
- Sub-Components: PersonalData Section, CompanyAssignment Section, FamilySituation Section, AssignedBenefits Section, BenefitInfoModal
- Variants: Create Mode, Edit Mode, Error State, Loading State, Mobile Variant

### 11. VALIDIERUNGS-CHECKLIST

Nach Figma Make Generierung prüfen:

- [ ] Main Component "Employee Form" existiert
- [ ] Component Properties vorhanden: Mode, HasErrors, LoadingState
- [ ] Section A: PersonalData mit 8 Feldern korrekt
- [ ] Section B: CompanyAssignment mit 6 Feldern korrekt
- [ ] Section C: FamilySituation mit 2 Feldern korrekt
- [ ] Section D: BenefitAssignmentTable mit 11 Benefits korrekt
- [ ] DailyLimit: READ-ONLY mit grauem Background (nicht editierbar)
- [ ] MonthlyLimit: Editierbar mit NumberInput
- [ ] InfoButton: Neben jedem Benefit sichtbar
- [ ] BenefitInfoModal: Zeigt Benefit-Name + Description + Close Button
- [ ] Modal schließt beim Close Button Click
- [ ] ErrorBanner: nur bei HasErrors=true sichtbar
- [ ] LoadingOverlay: nur bei LoadingState=true sichtbar
- [ ] DeleteButton: nur im Edit Mode sichtbar
- [ ] Footer Buttons: Mode-abhängig korrekt
- [ ] Responsive Variants funktionieren
- [ ] Test-Instanzen erzeugt: Create, Edit, Edit mit Modal, Error, Loading, Mobile
- [ ] Alle Icons korrekt verlinkt
- [ ] Spacing & Padding konsistent
- [ ] Keine Fehlermeldungen in Figma

---