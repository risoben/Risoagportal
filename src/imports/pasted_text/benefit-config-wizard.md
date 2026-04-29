Figma Make Prompt: Benefit Configuration Wizard — Step 3 & 4

**Ziel:** Erstelle einen Multi-Step Wizard für Benefit-Konfiguration mit flexibler Limits-Verwaltung (alle Mitarbeiter vs. einzeln).

---

## 🎯 AUFGABE FÜR FIGMA MAKE

Erstelle in Figma einen Benefit Configuration Wizard mit Step 3 und Step 4:

### 1. MAIN COMPONENT "Benefit Config Wizard – Step 3"
   - Frame: Auto-Layout aktiviert (Vertical, Spacing: 24px)
   - Component Properties:
     * "Step" (Enum: "Step3" | "Step4")
     * "SelectedOption" (Enum: "AllEmployees" | "IndividualEmployees")
     * "HasError" (Boolean)

### 2. STEP 3: LIMITS KONFIGURIEREN

   Component: "Step3_LimitConfiguration"

   **Header:**
   - Title: "Schritt 3 von 4: Limits konfigurieren" (18px Bold, Dunkelblau)
   - Subtitle: "[BenefitName] – [LocationName]" (14px Regular, Grau)
   - Benefit Icon + Name anzeigen

   **Description:**
   - "Wähle wie die Monatslimits für diese Location konfiguriert werden sollen." (13px Regular, Grau)

   **Option Container 1: "Für alle Mitarbeiter"**
   - Type: Radio Button + Card
   - Label: "Für alle Mitarbeiter in dieser Location" (14px Regular, Dunkelblau)
   - Description: "Alle Mitarbeiter erhalten das gleiche monatliche Limit. Du kannst später noch einzelne Limits setzen." (12px Regular, Grau)
   - Icon: People/Users Icon (24x24px)
   - Background: White, Border: 1px #E0E0E0, Padding: 16px
   - Hover State: Light Blue Background (#E3F2FD), Blue Border (#2196F3)
   - Selected State: Blue Border (#2196F3), Blue Background (#E3F2FD)
   - Cursor: pointer

   **Option Container 2: "Limits für jeden Mitarbeiter einzeln"**
   - Type: Radio Button + Card
   - Label: "Limits für jeden Mitarbeiter einzeln verwalten" (14px Regular, Dunkelblau)
   - Description: "Definiere unterschiedliche Monatslimits für einzelne Mitarbeiter. Dies ermöglicht flexible Limits je nach Bedarf." (12px Regular, Grau)
   - Icon: Settings/Sliders Icon (24x24px)
   - Background: White, Border: 1px #E0E0E0, Padding: 16px
   - Hover State: Light Blue Background (#E3F2FD), Blue Border (#2196F3)
   - Selected State: Blue Border (#2196F3), Blue Background (#E3F2FD)
   - Cursor: pointer

   **Error Message (Conditional):**
   - Only visible wenn HasError = true
   - Text: "Bitte wähle eine Option aus, um fortzufahren." (12px Regular, Red #E74C3C)
   - Icon: Warning/Alert Icon (16x16px)

   **Footer Buttons:**
   - Button: "Zurück" (Secondary, White)
   - Button: "Weiter" (Primary, Green #4CAF50)
     * Disabled wenn keine Option selected
     * Enabled wenn Option 1 oder 2 selected

   **Conditional Logic:**
   - Option 1 Selected → Next Button → Go to Success/Summary (Step abgeschlossen)
   - Option 2 Selected → Next Button → Go to Step 4

### 3. STEP 4: MITARBEITER-SPEZIFISCHE LIMITS

   Component: "Step4_EmployeeIndividualLimits"

   **Header:**
   - Title: "Schritt 4 von 4: Monatslimits für Mitarbeiter" (18px Bold, Dunkelblau)
   - Subtitle: "[BenefitName] – [LocationName]" (14px Regular, Grau)
   - Benefit Icon + Name anzeigen

   **Description:**
   - "Wähle Mitarbeiter aus und lege ein Monatslimit fest. Das Limit ist erforderlich für alle ausgewählten Mitarbeiter." (13px Regular, Grau)

   **Employee List Table:**
   - Container: Table Component "EmployeeIndividualLimitsTable"

   Table Columns:
   - [0] Checkbox (Type: Checkbox Component) — für Auswahl des Mitarbeiters
   - [1] EmployeeName (13px Regular, Black) — Vorname + Nachname
   - [2] EmployeeNo (13px Regular, Grau) — z.B. "EMP-12345"
   - [3] MonthlyLimit (Type: NumberInput mit "€" Unit Label)
     * Placeholder: "z.B. 500"
     * Conditional: Nur editierbar wenn Checkbox checked
     * Validation: Muss eine Zahl > 0 sein wenn checked

   Table Styling:
   - Header Row: Background #F5F5F5, 13px Bold, Grau
   - Data Rows: Alternating White / #FAFAFA
   - Hover State: Light Blue Background (#E3F2FD)
   - Border: 1px #E0E0E0
   - Row Height: 56px

   Sample Data (Beispiel-Mitarbeiter):
☐ | Max Mustermann | EMP-12345 | [Input: leer]
☐ | Erika Musterfrau | EMP-12346 | [Input: leer]
☐ | John Doe | EMP-12347 | [Input: leer]
☐ | Jane Smith | EMP-12348 | [Input: leer]
☐ | Hans Mueller | EMP-12349 | [Input: leer]



**Validation Logic:**
- Checkbox unchecked → MonthlyLimit Input: disabled (grayed out), kann leer sein
- Checkbox checked → MonthlyLimit Input: enabled, MUSS gefüllt sein mit Zahl > 0
- Wenn Checkbox checked aber Input leer → Row zeigt Error State (rotes Input Border + Error Icon)
- Weiter Button ist nur enabled wenn:
  * Mindestens 1 Mitarbeiter selected UND
  * Für ALLE selected Mitarbeiter ein gültiges Monatslimit > 0 eingegeben

**Error State Styling:**
- Input Border: 2px Red (#E74C3C)
- Input Background: Light Red (#FFEBEE)
- Error Message unter Input: "Monatslimit erforderlich" (11px Regular, Red)
- Row Background leicht rosa tingiert

**Validation Messages (Dynamic):**
- Below Table:
  * If no employee selected: "Bitte wähle mindestens einen Mitarbeiter aus." (12px Regular, Orange #FF9800)
  * If employees selected but limits missing: "Limits erforderlich für: [Employee1], [Employee2], ..." (12px Regular, Red #E74C3C)
  * If all valid: Checkmark + "Alle Mitarbeiter konfiguriert ✓" (12px Regular, Green #4CAF50)

**Select All Checkbox:**
- In Header Row, vor EmployeeName
- Label: "Alle auswählen" / "Alle abwählen"
- On Click: Alle Mitarbeiter-Checkboxen toggeln

**Footer Buttons:**
- Button: "Zurück" (Secondary, White) → Zurück zu Step 3
- Button: "Weiter" (Primary, Green #4CAF50)
  * Disabled wenn Validation fehlschlägt
  * Enabled wenn alle Conditions erfüllt

### 4. LAYER STRUKTUR

Wizard Container:
├── Step 3: LimitConfiguration
│   ├── Header (Title, Subtitle, Icon)
│   ├── Description
│   ├── OptionCard 1 (Radio + Label + Description + Icon)
│   ├── OptionCard 2 (Radio + Label + Description + Icon)
│   ├── ErrorMessage (Conditional)
│   └── Footer (Buttons: Zurück, Weiter)
│
└── Step 4: EmployeeIndividualLimits
├── Header (Title, Subtitle, Icon)
├── Description
├── EmployeeIndividualLimitsTable
│   ├── Header Row (Select All | EmployeeName | EmployeeNo | MonthlyLimit)
│   └── Data Rows (Checkbox | Name | No | Input)
├── ValidationMessages (Dynamic)
└── Footer (Buttons: Zurück, Weiter)



### 5. COMPONENT PROPERTIES

Step:
- "Step3" → Step 3 Container sichtbar, Step 4 versteckt
- "Step4" → Step 4 Container sichtbar, Step 3 versteckt

SelectedOption (Step 3):
- "AllEmployees" → Option 1 selected (Blue Border + Background)
- "IndividualEmployees" → Option 2 selected (Blue Border + Background)
- "" (empty) → Beide deselected

HasError (Step 3):
- true → Error Message sichtbar, Next Button disabled
- false → Error Message versteckt, Next Button enabled (wenn Option selected)

### 6. INTERACTIVE BEHAVIORS

**Step 3:**
- Click Option 1 → SelectedOption = "AllEmployees", Next Button enabled
- Click Option 2 → SelectedOption = "IndividualEmployees", Next Button enabled
- Click Next mit Option 1 selected → Modal/Screen zeigt Summary "Alle Mitarbeiter bekommen X€ Limit" → Done
- Click Next mit Option 2 selected → Step = "Step4"

**Step 4:**
- Click "Select All" Checkbox → Alle Mitarbeiter-Checkboxen werden checked
- Click Mitarbeiter Checkbox → Entsprechender MonthlyLimit Input wird enabled
- Input MonthlyLimit:
  * User tippt Zahl → Validation läuft
  * Wenn Zahl > 0 → Input valid (grüner Indikator)
  * Wenn Zahl = 0 oder nicht numerisch → Error State
  * Wenn Checkbox unchecked → Input disabled (grau)
- Click Next Button:
  * If validation fails → Error Messages erscheinen, Button bleibt disabled
  * If all valid → Transition zu Summary/Completion

### 7. RESPONSIVE VARIANTS

- Desktop (>1200px): Volle Breite für Optionen und Table
- Tablet (768-1200px): Optionen stacked, Table mit horizontalem Scroll
- Mobile (<768px): Single Column, Table compact

### 8. TEST INSTANCES

1. Step 3 – No Option Selected
   - SelectedOption: "" (empty)
   - HasError: false
   - Next Button: disabled

2. Step 3 – Option 1 Selected
   - SelectedOption: "AllEmployees"
   - HasError: false
   - Next Button: enabled (Green)

3. Step 3 – Option 2 Selected
   - SelectedOption: "IndividualEmployees"
   - HasError: false
   - Next Button: enabled (Green)

4. Step 3 – Error State
   - SelectedOption: "" (empty)
   - HasError: true
   - Error Message visible: "Bitte wähle eine Option aus..."
   - Next Button: disabled (Red)

5. Step 4 – No Employee Selected
   - 5 Mitarbeiter in Table
   - Keine Checkboxen selected
   - Validation Message: "Bitte wähle mindestens einen Mitarbeiter aus."
   - Next Button: disabled

6. Step 4 – Employees Selected, Limits Missing
   - Max Mustermann: checked, Input: leer (Error State)
   - Erika Musterfrau: checked, Input: "500" (valid)
   - Validation Message: "Limits erforderlich für: Max Mustermann"
   - Row Error State für Max Mustermann sichtbar
   - Next Button: disabled (Red)

7. Step 4 – All Valid
   - Max Mustermann: checked, Input: "500" (valid, Checkmark)
   - Erika Musterfrau: checked, Input: "600" (valid, Checkmark)
   - John Doe: unchecked, Input: disabled
   - Validation Message: "Alle Mitarbeiter konfiguriert ✓" (Green)
   - Next Button: enabled (Green)

8. Step 4 – Select All Used
   - "Select All" Checkbox: checked
   - Alle 5 Mitarbeiter Checkboxes: checked
   - Alle MonthlyLimit Inputs: enabled, focused

### 9. VALIDIERUNGS-CHECKLIST

- [ ] Step 3: 2 Option Cards korrekt (Radio + Label + Description + Icon)
- [ ] Step 3: Option 1 & 2 sichtbar mit korrektem Styling (Border, Hover, Selected State)
- [ ] Step 3: Next Button disabled wenn keine Option selected
- [ ] Step 3: Next Button enabled wenn Option 1 oder 2 selected
- [ ] Step 3: Error Message nur sichtbar bei HasError=true
- [ ] Step 4: Employee Table mit 5 Sample Mitarbeiter
- [ ] Step 4: Checkbox Column funktioniert
- [ ] Step 4: MonthlyLimit Input: disabled wenn unchecked, enabled wenn checked
- [ ] Step 4: Select All Checkbox funktioniert (togglet alle)
- [ ] Step 4: Validation Messages dynamisch aktualisiert
- [ ] Step 4: Error State zeigt rotes Border + Error Message bei ungültigen Inputs
- [ ] Step 4: Next Button disabled wenn Validation fehlschlägt
- [ ] Step 4: Next Button enabled nur wenn alle Conditions erfüllt
- [ ] Responsive Variants funktionieren (Desktop, Tablet, Mobile)
- [ ] Test-Instanzen erzeugt für alle Scenarios
- [ ] Keine Fehlermeldungen in Figma