// Single Source of Truth für den Mitarbeiter-Satz der Benefit-Zuweisung (Mock).
//
// TODO: Später an die echte API anbinden (GET /api/v1/portal/employees) — dann füllt
// die API EMPLOYEE_PROFILES; die Komponenten bleiben unverändert.
//
// Unvollständige Profile (fehlendes married/children/birthday) sind ABSICHTLICH:
// sie demonstrieren die Arbeitgeber-Fallback-Eingabe im Portal.
//
// Vorher lagen diese Daten 3× dupliziert in BenefitSettings / BenefitErholungSettings /
// BenefitGeburtstagSettings — jetzt zentral und konsistent.

export interface EmployeeProfile {
  married?: boolean;
  children?: number;
  birthday?: string; // z. B. "15. März" — ohne Jahr (Datenschutz)
}

// Mitarbeiter pro Standort-ID (1 = München, 2 = Heddesheim, 3 = Berlin, 4 = Viernheim)
export const EMPLOYEES_BY_LOCATION: Record<string, string[]> = {
  '1': ['Anna Müller', 'Tom Schmidt', 'Sara Becker', 'Max Hoffmann'],
  '2': ['Lisa Weber', 'Klaus Fischer'],
  '3': ['Jan Braun', 'Maria Koch'],
  '4': ['Nina Vogel'],
};

// Profile pro Mitarbeiter — married/children (Erholung, Kindergarten) + birthday (Geburtstag)
export const EMPLOYEE_PROFILES: Record<string, EmployeeProfile> = {
  'Anna Müller':   { married: true,  children: 2, birthday: '15. März' },
  'Tom Schmidt':   { married: false, children: 1, birthday: '03. Juli' },
  'Sara Becker':   { married: true,  children: 0 },                          // kein Geburtstag → Fallback
  'Max Hoffmann':  { birthday: '22. November' },                            // married/children fehlen → Fallback
  'Lisa Weber':    { married: false },                                      // children + birthday fehlen → Fallback
  'Klaus Fischer': { married: true,  children: 3, birthday: '08. Januar' },
  'Jan Braun':     { children: 1, birthday: '30. September' },              // married fehlt → Fallback
  'Maria Koch':    { married: false, children: 0 },                         // kein Geburtstag → Fallback
  'Nina Vogel':    {},                                                      // alles fehlt → Fallback
};

export function getEmployeesByLocation(locationId: string): string[] {
  return EMPLOYEES_BY_LOCATION[locationId] ?? [];
}

export function getEmployeeProfile(name: string): EmployeeProfile {
  return EMPLOYEE_PROFILES[name] ?? {};
}
