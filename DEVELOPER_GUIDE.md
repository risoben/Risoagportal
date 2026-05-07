# Riso AG-Portal — Developer Guide

This guide is for developers integrating the Laravel backend with the React frontend.
The UI is in German — use the glossary below when navigating components.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [German → English Glossary](#3-german--english-glossary)
4. [Component Map](#4-component-map)
5. [Entity Field Reference](#5-entity-field-reference)
6. [API Endpoints](#6-api-endpoints)
7. [How to Replace Mock Data](#7-how-to-replace-mock-data)

---

## 1. Project Overview

The AG-Portal is a portal for HR managers at companies ("Arbeitgeber" = employer) using the Riso benefits platform.

**What HR managers can do:**
- Manage employees (Mitarbeiter) and their benefit assignments
- Manage locations/branches (Standorte) and subsidiaries (Tochterunternehmen)
- View benefit budgets and usage statistics
- Download monthly/quarterly reports (Berichte)
- Bulk-import employees via CSV (Massenimport)
- Configure company settings and report preferences

---

## 2. Architecture

```
┌─────────────────────────────────┐
│  React Frontend (this repo)     │
│  localhost:5173                 │
│                                 │
│  All data currently MOCKED      │
│  → needs real API calls         │
└──────────────┬──────────────────┘
               │ HTTP + Bearer token
               ▼
┌─────────────────────────────────┐
│  Laravel REST API               │
│  /api/v1/portal/...             │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Riso Database                  │
└─────────────────────────────────┘
```

**Auth:** All requests require a Bearer token in the `Authorization` header.
Token is obtained via `POST /api/v1/portal/auth/login`.

---

## 3. German → English Glossary

| German (UI label) | English | Notes |
|-------------------|---------|-------|
| Standort | Location / Branch | A physical office location |
| Tochterunternehmen | Subsidiary | A subsidiary company |
| Mitarbeiter | Employee | |
| Personalnummer | Personnel Number | Employee ID (format: "MA-2451") |
| Abteilung | Department | e.g. "Vertrieb" = Sales, "IT", "HR" |
| Eintrittsdatum | Start Date | Date employee joined the company |
| Übersicht | Overview / Dashboard | Main summary page |
| Berichte | Reports | Generated PDF/Excel/CSV reports |
| Verwaltung | Administration / Settings | Company settings page |
| Benefits verwalten | Manage Benefits | Benefits management page |
| Budget/Monat | Monthly Budget | Total benefit budget per month |
| Genutzt | Used / Consumed | Budget used so far |
| Verfügbar | Available | Remaining budget |
| Aktiv / Inaktiv | Active / Inactive | Status of employee, benefit, or location |
| Sachbezug | Non-cash benefit | Tax-free goods/vouchers up to 50€/month |
| Erholung | Recreation allowance | Annual wellness/recreation allowance |
| Essenszuschuss | Meal subsidy | Daily meal/lunch allowance |
| Fahrkostenzuschuss | Commuting allowance | Travel-to-work allowance |
| Geburtstag | Birthday voucher | Annual birthday gift voucher |
| Danke-Bonus | Appreciation bonus | Variable performance bonus |
| ÖPNV | Public transport subsidy | Public transit ticket subsidy |
| BKV | Company health insurance | Betriebliche Krankenversicherung |
| BAV | Company pension plan | Betriebliche Altersvorsorge |
| Kindergarten | Childcare allowance | Daycare cost subsidy |
| Massenimport | Bulk import | CSV upload to create/update employees |
| Bericht erstellen | Generate report | Create a new report |
| Standort erstellen | Create location | Add a new branch/location |
| Cash-Benefits | Cash benefits | Category: monetary benefit payments |
| Versicherungen | Insurance benefits | Category: BKV + BAV |

---

## 4. Component Map

Each row shows: what the component displays, where it lives in the UI, and which API it needs.

| Component file | UI section (German) | What it shows | API endpoint(s) needed |
|----------------|--------------------|--------------|-----------------------|
| `Dashboard.tsx` | Übersicht | KPI cards, budget chart (12 months), last 5 employees, last 5 reports | `GET /api/v1/portal/dashboard` |
| `EmployeeManagement.tsx` | Mitarbeiter | Full employee table with search, filter by status/location, pagination | `GET /api/v1/portal/employees` |
| `LocationsOverview.tsx` | Standorte | All locations list with budget/usage stats | `GET /api/v1/portal/locations` |
| `LocationDetails.tsx` | Standorte → [Location] | Single location: its benefits, employees, budget chart | `GET /api/v1/portal/locations/{id}` |
| `LocationFormComplete.tsx` | Standorte → Erstellen/Bearbeiten | Create or edit a location | `POST/PUT /api/v1/portal/locations` |
| `BenefitsManagement.tsx` | Benefits verwalten | All 11 benefits grouped by category, with status and budget | `GET /api/v1/portal/benefits` |
| `BenefitsOverviewPage.tsx` | Benefits → Übersicht | Benefit usage KPIs, per-employee breakdown | `GET /api/v1/portal/benefits/overview` |
| `ReportsPage.tsx` | Berichte | List of generated reports, download links | `GET /api/v1/portal/reports` |
| `MassImport.tsx` | Mitarbeiter → Massenimport | CSV upload + validation preview | `POST /api/v1/portal/import/validate` |
| `MassImportModal.tsx` | Mitarbeiter → Massenimport | Confirm import, show results per row | `POST /api/v1/portal/import/execute` |
| `VerwaltungPage.tsx` | Verwaltung | Company settings, report columns, export config | `GET/PUT /api/v1/portal/settings` |
| `BenefitEditLocation.tsx` | Benefits → Standort bearbeiten | Edit benefit config for a specific location | `GET/PUT /api/v1/portal/benefits/{id}` |

---

## 5. Entity Field Reference

These fields are derived directly from the current React mock data — this is what the API must return.

### Employee (Mitarbeiter)

```json
{
  "id": "1",
  "personnelNumber": "MA-2451",
  "name": "Max Mustermann",
  "department": "Vertrieb",
  "status": "aktiv",
  "budgetMonth": 250,
  "budgetYear": 3000,
  "entryDate": "2026-01-01",
  "locationId": "heddesheim",
  "since": "2026-01-01",
  "benefits": [
    {
      "benefitId": "essenszuschuss",
      "name": "Essenszuschuss",
      "limit": "150€",
      "period": "Monat"
    }
  ]
}
```

| Field | Type | Notes |
|-------|------|-------|
| id | string | Unique ID |
| personnelNumber | string | Format: "MA-XXXX" |
| name | string | Full name |
| department | string | e.g. "Vertrieb", "IT", "HR", "Marketing", "Finanzen" |
| status | "aktiv" \| "inaktiv" | |
| budgetMonth | number | Monthly benefit budget in € |
| budgetYear | number | Annual benefit budget in € |
| entryDate | string (ISO date) | Employment start date |
| locationId | string | → Location.id |
| since | string (ISO date) | Start date at this location |
| benefits | array | Assigned benefits (see nested fields above) |

---

### Location (Standort)

```json
{
  "id": "heddesheim",
  "name": "Heddesheim",
  "type": "Standort",
  "employees": 34,
  "budgetPerMonth": 4200,
  "usedThisMonth": 3100,
  "status": "active",
  "benefits": [...],
  "employees_list": [...],
  "budgetChart": [...]
}
```

| Field | Type | Notes |
|-------|------|-------|
| id | string | Slug (e.g. "heddesheim") |
| name | string | Display name |
| type | "Standort" \| "Tochterunternehmen" | Branch or Subsidiary |
| employees | number | Employee count |
| budgetPerMonth | number | Total monthly budget in € |
| usedThisMonth | number | Budget consumed this month in € |
| status | "active" \| "inactive" | |

**Nested — Location Benefits:**

| Field | Type | Example |
|-------|------|---------|
| id | string | "mittagessen" |
| name | string | "Mittagessen" |
| limit | number | 100 (in €) |
| active | boolean | true |

**Nested — Location Employees:**

| Field | Type | Example |
|-------|------|---------|
| id | string | "1" |
| nr | string | "MA-10234" |
| name | string | "Max Mustermann" |
| department | string | "IT" |
| active | boolean | true |

**Nested — Budget Chart (12 months):**

| Field | Type | Example |
|-------|------|---------|
| month | string | "Mai" |
| verfuegbar | number | 4200 (available) |
| genutzt | number | 3100 (used) |

---

### Benefit

```json
{
  "id": "mittagessen",
  "name": "Mittagessen",
  "limit": 100,
  "limitLabel": "100€/Monat",
  "status": "active",
  "locations": ["München", "Heddesheim"],
  "description": "Daily meal subsidy for canteen or restaurants.",
  "group": "Cash Benefits",
  "employees": 45,
  "budgetMonth": 1250,
  "usedMonth": 850,
  "available": 400,
  "percentage": 68
}
```

| Field | Type | Notes |
|-------|------|-------|
| id | string | Slug: "mittagessen", "essenszuschuss", "bkv", etc. |
| name | string | Display name |
| limit | number | Budget cap in € |
| limitLabel | string | Formatted: "100€/Monat" or "156€/Jahr" |
| status | "active" \| "inactive" | |
| locations | string[] | Location names where this benefit is active |
| description | string | Short English description |
| group | "Cash Benefits" \| "Sachbezüge" \| "Versicherungen" | Category |
| employees | number | Count of employees using this benefit |
| budgetMonth | number | Total monthly budget for this benefit |
| usedMonth | number | Used this month |
| available | number | Remaining = budgetMonth - usedMonth |
| percentage | number | usedMonth / budgetMonth × 100 |

**Known benefit IDs:**
`mittagessen`, `internet`, `kindergarten`, `commuting`, `erholung`, `sachbezug`, `danke-bonus`, `geburtstag`, `oepnv`, `bkv`, `bav`

---

### Report (Bericht)

```json
{
  "id": "1",
  "date": "01.04.",
  "month": "April",
  "createdDate": "2026-04-01",
  "version": "v2.3",
  "fileType": "PDF",
  "fileName": "Monatsbericht April"
}
```

| Field | Type | Notes |
|-------|------|-------|
| id | string | |
| date | string | Short display: "01.04." |
| month | string | Month name in German: "April" |
| createdDate | string (ISO date) | Full creation date |
| version | string | e.g. "v2.3" |
| fileType | "PDF" \| "Excel" \| "CSV" | |
| fileName | string | Display name for download |

---

### Dashboard KPIs

```json
{
  "totalEmployees": 134,
  "totalBudgetMonth": 12500,
  "usedBudgetMonth": 8800,
  "activeBenefits": 9,
  "budgetChart": [
    { "monthYear": "Mai 2025", "verfuegbar": 1041666, "genutzt": 425000 }
  ],
  "recentEmployees": [...],
  "recentReports": [...]
}
```

| Field | Type | Notes |
|-------|------|-------|
| totalEmployees | number | KPI card |
| totalBudgetMonth | number | KPI card: total monthly budget in € |
| usedBudgetMonth | number | KPI card: used this month in € |
| activeBenefits | number | KPI card: count of active benefits |
| budgetChart | array | 12 months of budget data |
| recentEmployees | Employee[] | Last 5 employees (subset of Employee fields) |
| recentReports | Report[] | Last 5 reports |

---

### Bulk Import — Validation Response

`POST /api/v1/portal/import/validate` must return:

```json
{
  "total_rows": 25,
  "valid_rows": 21,
  "invalid_rows": 4,
  "results": [
    {
      "row_number": 12,
      "name": "Keller, Anna",
      "action": "create",
      "status": "error",
      "errors": [
        {
          "field": "E-Mail",
          "problem": "Invalid format",
          "suggestion": "name@company.com"
        }
      ]
    }
  ]
}
```

`POST /api/v1/portal/import/execute` must return:

```json
[
  {
    "row": 12,
    "name": "Keller, Anna",
    "action": "create",
    "status": "success"
  }
]
```

---

### Settings (VerwaltungPage)

```json
{
  "companyName": "Riso GmbH",
  "reportColumns": ["Vorname", "Nachname", "Personalnummer", "Geburtsdatum"],
  "exportType": "combined",
  "exportFormat": "pdf",
  "reportFrequency": "monthly"
}
```

| Field | Type | Values |
|-------|------|--------|
| companyName | string | |
| reportColumns | string[] | Column names to include in exports |
| exportType | enum | "combined" (all locations in one report) \| "separate" (one per location) |
| exportFormat | enum | "pdf" \| "excel" \| "csv" |
| reportFrequency | enum | "monthly" \| "quarterly" |

---

## 6. API Endpoints

Base URL: `/api/v1/portal`
Auth header: `Authorization: Bearer {token}`

| Method | Endpoint | Component | Description |
|--------|----------|-----------|-------------|
| POST | `/auth/login` | PasswordProtect | Login → returns `{ token, user }` |
| GET | `/dashboard` | Dashboard | KPIs + budget chart + recent employees + recent reports |
| GET | `/employees` | EmployeeManagement | List employees. Query params: `?search=&status=&location=&page=` |
| GET | `/employees/{id}` | EmployeeManagement | Single employee + benefits array |
| POST | `/employees` | EmployeeManagement | Create employee |
| PUT | `/employees/{id}` | EmployeeManagement | Update employee |
| DELETE | `/employees/{id}` | EmployeeManagement | Delete employee |
| GET | `/locations` | LocationsOverview | List all locations |
| GET | `/locations/{id}` | LocationDetails | Single location + benefits + employees + budget chart |
| POST | `/locations` | LocationFormComplete | Create location |
| PUT | `/locations/{id}` | LocationFormComplete | Update location |
| GET | `/benefits` | BenefitsManagement | All benefits with status, locations, group |
| GET | `/benefits/overview` | BenefitsOverviewPage | Benefits with usage stats (employees, budgetMonth, usedMonth, %) |
| PUT | `/benefits/{id}` | BenefitsManagement, BenefitEditLocation | Update benefit config |
| GET | `/reports` | ReportsPage | List reports. Query params: `?type=&location=&month=` |
| GET | `/reports/{id}/download` | ReportsPage | Download report file |
| POST | `/reports/generate` | ReportsPage | Generate a new report |
| POST | `/import/validate` | MassImport | Validate CSV → returns ValidationResponse |
| POST | `/import/execute` | MassImportModal | Execute import → returns ImportResult[] |
| GET | `/settings` | VerwaltungPage | Get company settings |
| PUT | `/settings` | VerwaltungPage | Update company settings |

---

## 7. How to Replace Mock Data

Every component with mock data has a `// TODO` comment at the top of the mock block. Here is the pattern to follow:

### Before (mock data)

```tsx
// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/employees
// See Section 5 of DEVELOPER_GUIDE.md for the full response shape.
const mockEmployees: Employee[] = [
  { id: '1', name: 'Max Mustermann', ... },
];
```

### After (real API call)

```tsx
const [employees, setEmployees] = useState<Employee[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('/api/v1/portal/employees', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(r => r.json())
    .then(data => {
      setEmployees(data.employees);
      setLoading(false);
    });
}, []);
```

Replace `token` with however auth state is managed (context, localStorage, etc.).

---

*Generated from the current React codebase — source of truth is the mock data in each component.*
