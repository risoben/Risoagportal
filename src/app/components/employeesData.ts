export type Employee = {
  id: string;
  personnelNumber: string;
  name: string;
  department: string;
  status: 'aktiv' | 'inaktiv';
  budgetMonth: number;
  budgetYear: number;
  entryDate: string;
  location: string;
  // Profilfelder — von Benefits genutzt (Erholung: married/children · Geburtstag: birthday · Kindergarten: children).
  // Werden später aus der API befüllt (GET /api/v1/portal/employees). birthday: DD.MM. ohne Jahr (Datenschutz).
  married?: boolean;
  children?: number;
  birthday?: string;
  benefits: { benefitId: string; name: string; limit: string; period: 'Monat' | 'Jahr' }[];
};

// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/employees?search=&status=&location=&page=
// See DEVELOPER_GUIDE.md Section 5 (Employee) for the full response shape.
export const mockEmployees: Employee[] = [
  {
    id: '1',
    personnelNumber: 'MA-2451',
    name: 'Max Mustermann',
    department: 'Vertrieb',
    status: 'aktiv',
    budgetMonth: 250,
    budgetYear: 3000,
    entryDate: '01.01.2026',
    location: 'Heddesheim',
    married: true,
    children: 2,
    birthday: '14.03.',
    benefits: [
      { benefitId: 'mittagessen', name: 'Mittagessen', limit: '150 €', period: 'Monat' },
      { benefitId: 'internetzuschuss', name: 'Internetzuschuss', limit: '50 €', period: 'Monat' },
      { benefitId: 'erholungsbeihilfe', name: 'Erholungsbeihilfe', limit: '156 €', period: 'Jahr' },
    ],
  },
  {
    id: '2',
    personnelNumber: 'MA-2452',
    name: 'Anna Schmidt',
    department: 'HR',
    status: 'aktiv',
    budgetMonth: 180,
    budgetYear: 2160,
    entryDate: '15.03.2025',
    location: 'Mannheim',
    married: false,
    children: 0,
    birthday: '22.07.',
    benefits: [
      { benefitId: 'mittagessen', name: 'Mittagessen', limit: '130 €', period: 'Monat' },
      { benefitId: 'sachbezug', name: '50 €-Sachbezug', limit: '50 €', period: 'Monat' },
    ],
  },
  {
    id: '3',
    personnelNumber: 'MA-2453',
    name: 'Peter Meyer',
    department: 'IT',
    status: 'inaktiv',
    budgetMonth: 0,
    budgetYear: 0,
    entryDate: '10.06.2024',
    location: 'Berlin Tech GmbH',
    married: true,
    children: 1,
    birthday: '05.11.',
    benefits: [],
  },
  {
    id: '4',
    personnelNumber: 'MA-2454',
    name: 'Lisa Weber',
    department: 'Marketing',
    status: 'aktiv',
    budgetMonth: 320,
    budgetYear: 3840,
    entryDate: '20.02.2026',
    location: 'Heddesheim',
    married: false,
    children: 0,
    birthday: '20.02.',
    benefits: [
      { benefitId: 'mittagessen', name: 'Mittagessen', limit: '150 €', period: 'Monat' },
      { benefitId: 'internetzuschuss', name: 'Internetzuschuss', limit: '50 €', period: 'Monat' },
      { benefitId: 'oepnv', name: 'ÖPNV', limit: '70 €', period: 'Monat' },
      { benefitId: 'sachbezug', name: '50 €-Sachbezug', limit: '50 €', period: 'Monat' },
    ],
  },
  {
    id: '5',
    personnelNumber: 'MA-2455',
    name: 'Thomas Becker',
    department: 'IT',
    status: 'aktiv',
    budgetMonth: 200,
    budgetYear: 2400,
    entryDate: '05.11.2025',
    location: 'München',
    married: true,
    children: 3,
    birthday: '30.09.',
    benefits: [
      { benefitId: 'mittagessen', name: 'Mittagessen', limit: '150 €', period: 'Monat' },
      { benefitId: 'sachbezug', name: '50 €-Sachbezug', limit: '50 €', period: 'Monat' },
    ],
  },
  {
    id: '6',
    personnelNumber: 'MA-2456',
    name: 'Sarah Müller',
    department: 'Vertrieb',
    status: 'aktiv',
    budgetMonth: 280,
    budgetYear: 3360,
    entryDate: '12.08.2025',
    location: 'Heddesheim',
    married: true,
    children: 1,
    birthday: '12.05.',
    benefits: [
      { benefitId: 'mittagessen', name: 'Mittagessen', limit: '150 €', period: 'Monat' },
      { benefitId: 'internetzuschuss', name: 'Internetzuschuss', limit: '50 €', period: 'Monat' },
      { benefitId: 'fahrtkosten', name: 'Fahrtkostenzuschuss', limit: '80 €', period: 'Monat' },
    ],
  },
  {
    id: '7',
    personnelNumber: 'MA-2457',
    name: 'Michael Wagner',
    department: 'Finanzen',
    status: 'aktiv',
    budgetMonth: 230,
    budgetYear: 2760,
    entryDate: '18.04.2026',
    location: 'Mannheim',
    married: false,
    children: 0,
    birthday: '18.04.',
    benefits: [
      { benefitId: 'mittagessen', name: 'Mittagessen', limit: '150 €', period: 'Monat' },
      { benefitId: 'oepnv', name: 'ÖPNV', limit: '80 €', period: 'Monat' },
    ],
  },
  {
    id: '8',
    personnelNumber: 'MA-2458',
    name: 'Julia Fischer',
    department: 'HR',
    status: 'aktiv',
    budgetMonth: 200,
    budgetYear: 2400,
    entryDate: '22.09.2025',
    location: 'München',
    married: true,
    children: 2,
    birthday: '22.09.',
    benefits: [
      { benefitId: 'mittagessen', name: 'Mittagessen', limit: '150 €', period: 'Monat' },
      { benefitId: 'sachbezug', name: '50 €-Sachbezug', limit: '50 €', period: 'Monat' },
    ],
  },
  {
    id: '9',
    personnelNumber: 'MA-2459',
    name: 'Daniel Klein',
    department: 'IT',
    status: 'aktiv',
    budgetMonth: 300,
    budgetYear: 3600,
    entryDate: '30.01.2026',
    location: 'Berlin Tech GmbH',
    married: false,
    children: 1,
    birthday: '30.01.',
    benefits: [
      { benefitId: 'mittagessen', name: 'Mittagessen', limit: '150 €', period: 'Monat' },
      { benefitId: 'internetzuschuss', name: 'Internetzuschuss', limit: '50 €', period: 'Monat' },
      { benefitId: 'sachbezug', name: '50 €-Sachbezug', limit: '50 €', period: 'Monat' },
      { benefitId: 'bkv', name: 'BKV', limit: '50 €', period: 'Monat' },
    ],
  },
  {
    id: '10',
    personnelNumber: 'MA-2460',
    name: 'Laura Hoffmann',
    department: 'Marketing',
    status: 'aktiv',
    budgetMonth: 260,
    budgetYear: 3120,
    entryDate: '14.07.2025',
    location: 'Heddesheim',
    married: true,
    children: 2,
    birthday: '14.07.',
    benefits: [
      { benefitId: 'mittagessen', name: 'Mittagessen', limit: '150 €', period: 'Monat' },
      { benefitId: 'internetzuschuss', name: 'Internetzuschuss', limit: '50 €', period: 'Monat' },
      { benefitId: 'kindergarten', name: 'Kindergartenzuschuss', limit: '60 €', period: 'Monat' },
    ],
  },
];
