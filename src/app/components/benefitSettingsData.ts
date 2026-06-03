interface BenefitLocation {
  id: string;
  name: string;
  limit: string;
  employeeCount: number;
  enabled: boolean;
  pendingLimit?: string;
  pendingStatus?: 'waiting';
}

interface BenefitStats {
  employeesWithAccess: number;
  budgetThisMonth: number;
  usedThisMonth: number;
}

interface BenefitSettingsEntry {
  category: 'cash' | 'voucher' | 'insurance';
  isYearlyBudget?: boolean;
  name?: string;
  description?: string;
  locations?: BenefitLocation[];
  stats?: BenefitStats;
}

export const benefitsSettingsData: Record<string, BenefitSettingsEntry> = {
  'mittagessen': {
    category: 'cash',
    name: 'Essenszuschuss',
    description: 'Mit dem Essenszuschuss erstattest du deinen Mitarbeitern ihre Mahlzeiten am Arbeitstag — ob Restaurant, Supermarkt oder Lieferdienst. Jeder Beleg wird automatisch über die Riso App geprüft, und der Betrag landet mit dem nächsten Gehalt auf dem Konto. Das Maximum liegt bei 7,67€ pro Arbeitstag — bis zu 115€ im Monat.',
  },
  'internet': {
    category: 'cash',
    name: 'Internetzuschuss',
    description: 'Mit dem Internetzuschuss übernimmst du die privaten Internetkosten deiner Mitarbeiter — bei jedem Anbieter, egal ob DSL, Glasfaser oder Mobilfunk. Deine Mitarbeiter reichen ihre monatliche Rechnung in der Riso App ein und bekommen bis zu 50€ direkt ausgezahlt. Ein unkompliziertes Benefit, das jeden Monat spürbar ist.',
  },
  'kindergarten': {
    category: 'cash',
    name: 'Kindergartenzuschuss',
    description: 'Mit dem Kindergartenzuschuss übernimmst du die Betreuungskosten deiner Mitarbeiter mit Kindern — Kita, Krippe, Tagesmutter oder Kindergarten, alles möglich. Es gibt keinen gesetzlichen Höchstbetrag: du erstattest die tatsächlichen Kosten, solange das Kind noch nicht schulpflichtig ist. Mitarbeiter reichen ihre monatliche Betreuungsrechnung einfach in der Riso App ein.',
  },
  'commuting': {
    category: 'cash',
    name: 'Fahrkostenzuschuss',
    description: 'Mit dem Fahrtkostenzuschuss unterstützt du deine Mitarbeiter auf dem Weg zur Arbeit — egal ob Auto, Fahrrad oder zu Fuß. Der Betrag berechnet sich automatisch aus Entfernung und Arbeitstagen: 0,30€/km bis 20km, 0,38€/km ab dem 21. km. Hinweis: nicht kombinierbar mit dem ÖPNV-Ticket — pro Mitarbeiter eine Option wählen.',
  },
  'erholung': {
    category: 'cash',
    isYearlyBudget: true,
    name: 'Erholungsbeihilfe',
    description: 'Mit der Erholungsbeihilfe schenkst du deinen Mitarbeitern einmal im Jahr einen Urlaubszuschuss — bis zu 156€ pro Mitarbeiter, plus 104€ für den Ehepartner und 52€ pro Kind. Deine Mitarbeiter reichen einen Urlaubsnachweis in der Riso App ein und bekommen den Betrag mit dem nächsten Gehalt. Einmal im Jahr, minimaler Aufwand, maximale Wirkung.',
  },
  'sachbezug': {
    category: 'voucher',
    name: 'Sachbezug',
    description: 'Mit dem Sachbezug bekommt jeder Mitarbeiter monatlich einen Gutschein bis zu 50€ — aus unserem Partnernetzwerk mit einer großen Auswahl an Shops, Restaurants und Freizeitangeboten. Wählt ein Mitarbeiter nichts aus, greift automatisch sein hinterlegter Standard-Gutschein — so verfällt kein Budget. Kein Beleg, kein Aufwand, jeden Monat ein sichtbares Benefit.',
  },
  'danke-bonus': {
    category: 'cash',
    name: 'Danke-Bonus',
    description: 'Mit dem Danke-Bonus kannst du außergewöhnliche Leistungen gezielt anerkennen — flexibel, individuell, wann immer du willst. Du legst Betrag und Anlass selbst fest, Riso schaltet den Gutschein direkt in der Riso App des Mitarbeiters frei. Kein fixer Rhythmus, kein Bürokratieaufwand — nur echte Wertschätzung, wenn sie verdient ist.',
  },
  'geburtstag': {
    category: 'voucher',
    isYearlyBudget: true,
    name: 'Geburtstagsgutschein',
    description: 'Mit dem Geburtstagsgutschein überraschst du jeden Mitarbeiter automatisch im Monat seines Geburtstags mit einem Gutschein bis zu 60€. Riso schaltet den Gutschein ohne dein Zutun frei — du musst nichts planen, nichts manuell auslösen. Ein kleines Zeichen, das ankommt, und das kein einziges Mal vergessen wird.',
  },
  'oepnv': {
    category: 'cash',
    name: 'ÖPNV-Ticket',
    description: 'Mit dem ÖPNV-Ticket übernimmst du die Kosten für Bus und Bahn deiner Mitarbeiter — ganz oder anteilig, ohne gesetzlichen Höchstbetrag. Ideal für das Deutschlandticket: du legst einen festen Monatsbetrag fest, deine Mitarbeiter reichen ihr Ticket in der Riso App ein. Hinweis: nicht kombinierbar mit dem Fahrtkostenzuschuss — pro Mitarbeiter eine Option wählen.',
  },
  'bkv': {
    category: 'insurance',
    name: 'BKV',
    description: 'Mit der Betrieblichen Krankenversicherung bietest du deinen Mitarbeitern privaten Zusatzschutz — Zahn, stationär, ambulant und mehr. Du zahlst den Beitrag direkt, Riso leitet ihn monatlich an den Versicherer weiter. Ein starkes Benefit im Recruiting, das zeigt: bei uns werden Mitarbeiter wirklich gut versorgt.',
  },
  'bav': {
    category: 'insurance',
    name: 'BAV',
    description: 'Mit der Betrieblichen Altersvorsorge unterstützt du deine Mitarbeiter beim Aufbau ihrer Rente — mit einem monatlichen Zuschuss direkt in ihren Versicherungsvertrag. Als Arbeitgeber bist du gesetzlich zu mindestens 15% Zuschuss verpflichtet. Riso übernimmt die Abwicklung und leitet die Beiträge automatisch weiter.',
  },
};
