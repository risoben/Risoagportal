Figma Make Prompt: Employee Management Form System

**Ziel:** Erstelle ein komplettes Employee Edit/Create Form Component System mit allen erforderlichen Feldern, Sections und Variants.

---

## 🎯 AUFGABE FÜR FIGMA MAKE

Erstelle in Figma ein Employee Management Form System mit folgenden Anforderungen:

### 1. MAIN COMPONENT "Employee Form"
   - Frame: Auto-Layout aktiviert (Vertical, Spacing: 24px)
   - Component Properties:
     * "Mode" (Enum: "Create" | "Edit")
     * "HasErrors" (Boolean: true=Error Banner anzeigen, false=verstecken)
     * "LoadingState" (Boolean: true=Form disabled + Spinner, false=normal)

### 2. SECTION A: PERSÖNLICHE DATEN
   Component: "Section PersonalData"
   - Header: "Persönliche Daten" (16px Bold, Dunkelblau)
   - Layout: 2-Column Grid (responsive auf 1 Column bei mobil)
   - Fields (alle mit Required Marker *):
     * Email (Type: TextInput, Placeholder: "max@example.com")
     * Password (Type: PasswordInput mit Eye-Icon Toggle, Placeholder: "••••••••")
     * Name (Type: TextInput, Placeholder: "Vorname")
     * Surname (Type: TextInput, Placeholder: "Nachname")
     * Gender (Type: RadioGroup, Options: "Männlich" | "Weiblich" | "Divers" | "Keine Angabe")
     * DateOfBirth (Type: DatePicker, Format: "DD.MM.YYYY")
     * Phone (Type: TextInput, Format: "+49 xxx...", optional)
     * EmployeeNo (Type: TextInput, Placeholder: "z.B. EMP-12345")

   Field Component Spec:
   - Label: 13px Regular, Grau
   - Input: 13px Regular, Black
   - Border: 1px #E0E0E0
   - Padding: 10px 12px
   - Border-Radius: 4px
   - Focus State: Blue Border (#2196F3) + Shadow
   - Required Marker: Red Asterisk (*)

### 3. SECTION B: UNTERNEHMENS-ZUORDNUNG
   Component: "Section CompanyAssignment"
   - Header: "Unternehmens-Zuordnung" (16px Bold, Dunkelblau)
   - Layout: 2-Column Grid
   - Fields (alle mit Required Marker *):
     * Company (Type: Dropdown, Dependent)
     * Location (Type: Dropdown, Filter basierend auf Company)
     * Department (Type: TextInput, optional)
     * Status (Type: Toggle, Options: "Active" | "Inactive")
     * StartDate (Type: DatePicker, Format: "DD.MM.YYYY")
     * EndDate (Type: DatePicker, Format: "DD.MM.YYYY", optional)

   Dependent Logic:
   - Wenn Company = "Fine Cotton Company" → Location zeigt nur: München, Heidelsheim
   - Wenn Company = "Cassianiel Software" → Location zeigt nur: Cassianiel Office

### 4. SECTION C: FAMILIENSITUATION
   Component: "Section FamilySituation"
   - Header: "Familiensituation" (16px Bold, Dunkelblau)
   - Layout: 1-Column
   - Fields (mit Required Marker *):
     * MaritalStatus (Type: Dropdown, Options: "Single" | "Married" | "Divorced" | "Widowed")
     * NumberOfChildren (Type: NumberInput oder Dropdown, Options: 0 | 1 | 2 | 3 | 4+)

### 5. SECTION D: ZUGEORDNETE BENEFITS
   Component: "Section AssignedBenefits"
   - Header: "Mitarbeiter-Benefits" (16px Bold, Dunkelblau)
   - Beschreibung: "Wähle die Leistungen, die dieser Mitarbeiter erhalten soll..." (12px Regular, Grau)
   - Container: Table Component "BenefitAssignmentTable"
     
   Table Columns:
   - [0] Checkbox (Type: Checkbox Component)
   - [1] BenefitIcon (24x24px, Icon Asset referenzieren)
   - [2] BenefitName (13px Regular, Black)
   - [3] Frequency (13px Regular, Grau, READ-ONLY - aus Backend)
   - [4] DailyLimit (Type: NumberInput mit "€" Unit Label)
   - [5] MonthlyLimit (Type: NumberInput mit "€" Unit Label)
   - [6] Remove (Type: IconButton mit Trash Icon)

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

   Table Styling:
   - Header Row: Background #F5F5F5, 13px Bold
   - Data Rows: Alternating White / #FAFAFA
   - Hover State: Background #E3F2FD
   - Border: 1px #E0E0E0

   Button unter Tabelle:
   - "+ Weitere Benefit hinzufügen" (13px Regular, Blau, Icon: Plus)

### 6. SECTION E: ZUGEORDNETE PRODUKTE MIT JAHRES-LIMITS
   Component: "Section AssignedProducts"
   - Header: "Mitarbeiter-Produkte mit Jahres-Limits" (16px Bold, Dunkelblau)
   - Beschreibung: "Produkte mit individuellen Jahres-Limits pro Mitarbeiter." (12px Regular, Grau)
   - Container: Table Component "ProductAssignmentTable"

   Table Columns:
   - [0] Checkbox (Type: Checkbox Component)
   - [1] ProductIcon (24x24px, Icon Asset referenzieren)
   - [2] ProductName (13px Regular, Black)
   - [3-6] YearlyLimits (4 Columns für 2024 | 2025 | 2026 | 2027)
     * Jede Spalte: NumberInput mit "€" Unit Label
   - [7] Remove (Type: IconButton mit Trash Icon)

   Products Rows (Beispiele, dynamisch erweiterbar):
   - Mittagessen (Asset: mittagessen.svg | Farbe: #F4B860)
   - Fahrkostenzuschuss (Asset: fahrkostenzuschuss.svg | Farbe: #2196F3)
   - Kindergartenzuschuss (Asset: kindergarten.svg | Farbe: #FF6B6B)
   - Danke-Bonus (Asset: danke-bonus.svg | Farbe: #4CAF50)
   - (weitere...)

   Table Styling: (wie Section D)

   Button unter Tabelle:
   - "+ Produkt hinzufügen" (13px Regular, Blau, Icon: Plus)

### 7. LAYER STRUKTUR (HIERARCHIE)

