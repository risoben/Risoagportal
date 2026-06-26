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

interface BenefitTaxInfo {
  steuer: string;
  sv: string;
}

interface HighlightBox {
  title: string;
  text: string;
}

interface ProcessStep {
  step: string;
  title: string;
  text: string;
}

interface WieFunktioniert {
  agTitle: string;
  agSteps: ProcessStep[];
  maTitle: string;
  maSteps: ProcessStep[];
}

interface BelegStep {
  icon: string;
  label: string;
  sub: string;
}

interface Belegprinzip {
  title?: string;
  intro: string;
  steps: BelegStep[];
}

interface Vorteil {
  title: string;
  text: string;
}

interface Persona {
  img?: string;
  title: string;
  text: string;
}

interface PersonasSection {
  title: string;
  intro: string;
  items: Persona[];
}

interface FaqArticle {
  title: string;
  summary: string;
  url: string;
}

interface BenefitSettingsEntry {
  category: 'cash' | 'voucher' | 'insurance';
  isYearlyBudget?: boolean;
  maxBudgetPerEmployee?: number;
  hasKinderField?: boolean;
  hasPendelstreckeField?: boolean;
  name?: string;
  description?: string;
  taxInfo?: BenefitTaxInfo;
  locations?: BenefitLocation[];
  stats?: BenefitStats;
  highlightBoxes?: HighlightBox[];
  wieFunktioniert?: WieFunktioniert;
  belegprinzip?: Belegprinzip;
  vorteile?: Vorteil[];
  personas?: PersonasSection;
  faqs?: FaqArticle[];
  beratungstext?: string;
}

export const benefitsSettingsData: Record<string, BenefitSettingsEntry> = {
  'mittagessen': {
    category: 'cash',
    name: 'Mittagessen',
    description: 'Mit dem Benefit Mittagessen erstattest du deinen Mitarbeitern ihre Mahlzeiten am Arbeitstag, ob aus dem Restaurant, dem Supermarkt oder vom Lieferdienst. Deine Mitarbeiter laden ihren Beleg in der Riso-App hoch, und der Betrag kommt mit der nächsten Gehaltsabrechnung. Pro Arbeitstag sind bis zu 7,67 € möglich, also bis zu 115,05 € im Monat.',
    taxInfo: {
      steuer: 'Effektiv 5 bis 7 % Pauschalsteuer',
      sv: 'Sozialversicherungsfrei',
    },
    highlightBoxes: [
      { title: '115,05 € / Monat', text: 'Bis zu 1.380 € im Jahr, 7,67 € pro Arbeitstag als gesetzliches Maximum' },
      { title: 'Jeder Lebensmittelbeleg gilt', text: 'Gekauft, gekocht oder bestellt, Restaurant, Supermarkt, Lieferdienst' },
      { title: 'Beleg-Erstattung', text: 'Cash aufs Konto, direkt mit dem Gehalt erstattet' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Setup (einmalig)',
      agSteps: [
        { step: '1', title: 'Standort & Budget', text: 'Standorte aktivieren und Budget festlegen' },
        { step: '2', title: 'Mitarbeiter zuweisen', text: 'Den Benefit den richtigen Mitarbeitern zuweisen, erst dann haben sie Zugriff' },
        { step: '3', title: 'Fertig', text: 'Riso übernimmt Belegprüfung und monatliche Berichte' },
      ],
      maTitle: 'Mitarbeiter-Nutzung (monatlich)',
      maSteps: [
        { step: '1', title: 'Essen kaufen', text: 'Restaurant, Supermarkt, Lieferdienst, beliebig' },
        { step: '2', title: 'Beleg in der Riso-App hochladen', text: 'In der Riso-App fotografieren & einreichen' },
        { step: '3', title: 'Geld erhalten', text: 'Bis zu 115,05 € / Monat aufs Konto' },
      ],
    },
    belegprinzip: {
      intro: 'So einfach funktioniert der Benefit Mittagessen: Beleg einreichen, Riso prüft, Erstattung kommt mit der nächsten Gehaltsabrechnung.',
      steps: [
        { icon: '/assets/essen-icons/belegprinzip/beleg-kaufen.svg', label: 'Essen kaufen', sub: 'Restaurant, Supermarkt, Lieferdienst' },
        { icon: '/assets/essen-icons/belegprinzip/app-hochladen.svg', label: 'In der Riso-App hochladen', sub: 'Foto machen & einreichen' },
        { icon: '/assets/essen-icons/belegprinzip/riso-prueft.svg', label: 'Riso prüft', sub: 'Regelkonform' },
        { icon: '/assets/essen-icons/belegprinzip/erstattung.svg', label: 'Direkt aufs Konto', sub: 'Monatlich mit dem Gehalt' },
      ],
    },
    vorteile: [
      { title: 'Bis zu 50% niedrigere Lohnnebenkosten', text: 'Der Benefit Mittagessen reduziert die Lohnnebenkosten gegenüber einer klassischen Gehaltserhöhung erheblich.' },
      { title: 'Talentbindung & -gewinnung', text: 'Attraktive Benefits helfen, Mitarbeiter zu halten und neue im Wettbewerb um Fachkräfte zu gewinnen.' },
      { title: 'Einfache digitale Umsetzung', text: 'Einmal einrichten, Riso übernimmt Belegprüfung, Dokumentation und monatliche Berichte.' },
    ],
    personas: {
      title: 'Passt für jeden Essenstyp',
      intro: 'Egal, was für ein Essenstyp deine Mitarbeitenden sind, der Zuschuss zum Mittagessen passt zu jedem Lifestyle und jeder Essgewohnheit.',
      items: [
        { img: '/assets/mittagessen-icons/personas/tupperdose.png', title: 'Tupperdose-Fan', text: 'Bringt Essen von zuhause ins Büro, selbst gekochte Mahlzeiten zählen.' },
        { img: '/assets/mittagessen-icons/personas/menue.png', title: 'Menü-Liebhaber', text: 'Genießt die lange Mittagspause im Restaurant, jeder Restaurantbeleg gilt.' },
        { img: '/assets/mittagessen-icons/personas/healthy.png', title: 'Healthy Hero', text: 'Vegan, bio, glutenfrei, Lebensmittel aus dem Supermarkt sind selbstverständlich dabei.' },
        { img: '/assets/mittagessen-icons/personas/baecker.png', title: 'Bäcker oder Imbiss', text: 'Auch Belege vom Bäcker, Metzger oder Imbiss um die Ecke werden akzeptiert.' },
        { img: '/assets/mittagessen-icons/personas/fitness.png', title: 'Fitness-Typ', text: 'Protein-Riegel, Proteinshakes und Sportlernahrung zählen ebenfalls als Beleg.' },
      ],
    },
    faqs: [
      {
        title: 'Essenszuschuss mit Riso',
        summary: 'Mit dem Essenszuschuss bekommst du bis zu 7,67 € pro Arbeitstag für dein Mittagessen erstattet, ob im Restaurant, aus dem Supermarkt oder per Lieferdienst. Belege hochladen, fertig.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/essenszuschuss-mit-riso',
      },
      {
        title: 'Essenszuschuss im Home-Office nutzen',
        summary: 'Du arbeitest von zuhause aus? Der Essenszuschuss funktioniert auch im Home-Office, genauso wie im Büro. Beleg hochladen, fertig.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/mittagessenzuschuss-im-home-office-nutzen',
      },
      {
        title: 'Essenszuschuss: Das Wichtigste in Kürze',
        summary: 'Der Staat fördert das arbeitstägliche Mittagessen mit bis zu 7,67 € pro Tag, an maximal 15 Tagen im Monat. Das ergibt bis zu 115,05 € pro Monat, steuerfrei und direkt erstattet.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/essenszuschuss-das-wichtigste-in-kürze',
      },
      {
        title: 'Essenszuschuss: Im Detail',
        summary: 'Schritt-für-Schritt: Wie Mitarbeitende einen Beleg einreichen, was akzeptiert wird und wie die Erstattung funktioniert, egal ob Restaurant, Supermarkt oder Lieferdienst.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/essenszuschuss-im-detail',
      },
      {
        title: 'Voraussetzungen für den Essenszuschuss',
        summary: 'Damit Mitarbeitende den vollen Essenszuschuss nutzen können, müssen einige grundlegende Voraussetzungen erfüllt sein, hier findest du sie im Überblick.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/vorraussetzungen-für-den-essenszuschuss',
      },
      {
        title: 'Regeln zur Nutzung des Essenszuschusses',
        summary: 'Für die Nutzung des Essenszuschusses gelten einige klare Regeln, damit alles korrekt, fair und reibungslos läuft.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/regeln-zur-nutzung-des-essenszuschusses',
      },
    ],
  },
  'internet': {
    category: 'cash',
    maxBudgetPerEmployee: 50,
    name: 'Internet',
    description: 'Mit dem Internet übernimmst du die privaten Internetkosten deiner Mitarbeiter, bei jedem Anbieter und egal ob DSL, Glasfaser oder Mobilfunk. Deine Mitarbeiter reichen ihre monatliche Rechnung in der Riso-App ein und bekommen bis zu 50 € direkt ausgezahlt.',
    taxInfo: {
      steuer: '25 % Pauschalsteuer',
      sv: 'Sozialversicherungsfrei',
    },
    highlightBoxes: [
      { title: '50 € / Monat', text: 'Bis zu 600 € im Jahr, für jeden Internetanschluss, egal welcher Anbieter' },
      { title: 'Jede Internetrechnung gilt', text: 'DSL, Glasfaser oder Mobilfunk, Hauptsache es ist die eigene Rechnung' },
      { title: 'Beleg-Erstattung', text: 'Cash aufs Konto, direkt mit dem Gehalt erstattet' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Setup (einmalig)',
      agSteps: [
        { step: '1', title: 'Standort & Budget', text: 'Standorte aktivieren und Budget festlegen' },
        { step: '2', title: 'Mitarbeiter zuweisen', text: 'Den Benefit den richtigen Mitarbeitern zuweisen, erst dann haben sie Zugriff' },
        { step: '3', title: 'Fertig', text: 'Riso übernimmt Belegprüfung und monatliche Berichte' },
      ],
      maTitle: 'Mitarbeiter-Nutzung (monatlich)',
      maSteps: [
        { step: '1', title: 'Internetrechnung erhalten', text: 'Vom eigenen Anbieter, DSL, Glasfaser oder Mobilfunk' },
        { step: '2', title: 'Rechnung in der Riso-App hochladen', text: 'In der Riso-App fotografieren & einreichen' },
        { step: '3', title: 'Geld erhalten', text: 'Bis zu 50 € / Monat aufs Konto' },
      ],
    },
    belegprinzip: {
      intro: 'So einfach funktioniert das Internet: Rechnung einreichen, Riso prüft, Erstattung kommt mit der nächsten Gehaltsabrechnung.',
      steps: [
        { icon: '/assets/essen-icons/belegprinzip/beleg-kaufen.svg', label: 'Internet nutzen', sub: 'Zuhause, unterwegs oder im Büro' },
        { icon: '/assets/essen-icons/belegprinzip/app-hochladen.svg', label: 'Rechnung einreichen', sub: 'Foto machen & in der Riso-App hochladen' },
        // TODO(Santiago): echtes Icon für "Riso prüft" liefern — Platzhalter wiederverwendet rechnung-einreichen.svg
        { icon: '/assets/essen-icons/belegprinzip/riso-prueft.svg', label: 'Riso prüft', sub: 'Regelkonform' },
        { icon: '/assets/essen-icons/belegprinzip/erstattung.svg', label: 'Direkt aufs Konto', sub: 'Monatlich mit dem Gehalt' },
      ],
    },
    vorteile: [
      { title: 'Moderne Arbeitsmodelle', text: 'Unterstützt Remote, Hybrid und mobiles Arbeiten.' },
      { title: 'Attraktiver für Talente', text: 'Steigert deine Attraktivität für neue Fachkräfte.' },
      { title: 'Vollständig digital gesteuert', text: 'Einfach implementierbar, Riso übernimmt die Abwicklung.' },
    ],
    personas: {
      title: 'Passt für jeden Internet-Nutzertyp',
      intro: 'Egal wie und wo deine Mitarbeitenden online sind, das Internet passt zu jedem Arbeitsmodell und jeder Nutzung.',
      items: [
        { img: '/assets/internet-icons/personas/home-office.png', title: 'Home-Office Pro', text: 'Arbeitet von überall, Internetkosten im Griff, Zuschuss direkt aufs Konto.' },
        { img: '/assets/internet-icons/personas/mobildaten.png', title: 'Mobildaten-Fan', text: 'Nutzt Internet vom Handy, Datenvolumen ganz flexibel.' },
        { img: '/assets/internet-icons/personas/freelancer.png', title: 'Freelancer-Modus', text: 'Das Büro ist überall, solange WLAN reicht.' },
        { img: '/assets/internet-icons/personas/familiennetz.png', title: 'Familiennetz', text: 'Zuhause mit der Family, online für alle.' },
        { img: '/assets/internet-icons/personas/work-life.png', title: 'Work-Life-Balancer', text: 'Arbeitet im Garten, WLAN vom Balkon reicht aus.' },
        { img: '/assets/internet-icons/personas/gaming.png', title: 'Gaming-Worker', text: 'Tagsüber Arbeit, abends Games, leistungsstarkes Netz zählt.' },
      ],
    },
    faqs: [
      {
        title: 'Internet mit Riso',
        summary: 'Warum gibt’s das Internet? Schnelles Internet ist unverzichtbar, beruflich wie privat. Doch DSL, Glasfaser oder Mobilfunk können schnell teuer werden: bis zu 50 € im Monat erstattet Riso direkt aufs Konto.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/internetzuschuss',
      },
      {
        title: 'Internet - in Kürze',
        summary: 'Ob Zuhause, unterwegs oder im Hotel, schnelles Internet ist unverzichtbar. Gut, dass es sich mit Riso unkompliziert erstatten lässt, egal ob Glasfaser, Kabel oder DSL.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/internetzuschuss-in-kürze',
      },
      {
        title: 'Internet - Anforderungen',
        summary: 'Damit das Internet erfolgreich genutzt werden kann, müssen einige Voraussetzungen erfüllt sein, u.a. Rechnungsempfänger sein und alle Seiten der Rechnung einreichen.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/internetzuschuss-anforderungen',
      },
      {
        title: 'Internet - Nutzungsbedingungen',
        summary: 'Damit die Erstattung korrekt abgewickelt wird, gelten klare Regeln für die Nutzung des Internets, z.B. nur eigene Belege einreichen.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/internetzuschuss-nutzungsbedingungen',
      },
    ],
  },
  'kindergarten': {
    category: 'cash',
    hasKinderField: true,
    name: 'Kindergarten',
    description: 'Mit dem Kindergarten übernimmst du die Betreuungskosten deiner Mitarbeiter mit Kindern, egal ob Kita, Krippe, Tagesmutter oder Kindergarten. Einen Höchstbetrag gibt es nicht: Du erstattest die tatsächlichen Kosten, solange das Kind noch nicht schulpflichtig ist. Die monatliche Betreuungsrechnung reichen deine Mitarbeiter einfach in der Riso-App ein.',
    taxInfo: {
      steuer: 'Steuerfrei, kein Höchstbetrag',
      sv: 'Sozialversicherungsfrei',
    },
    highlightBoxes: [
      { title: 'Kein Höchstbetrag', text: 'Erstattet werden die tatsächlichen Betreuungskosten' },
      { title: 'Jede Betreuungsform gilt', text: 'Kita, Krippe, Tagesmutter oder Kindergarten' },
      { title: 'Beleg-Erstattung', text: 'Cash aufs Konto, direkt mit dem Gehalt erstattet' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Setup (einmalig)',
      agSteps: [
        { step: '1', title: 'Standort & Budget', text: 'Standorte aktivieren und Budget festlegen' },
        { step: '2', title: 'Mitarbeiter zuweisen', text: 'Den Benefit den Mitarbeitern mit Kindern zuweisen, erst dann haben sie Zugriff' },
        { step: '3', title: 'Fertig', text: 'Riso übernimmt Belegprüfung und monatliche Berichte' },
      ],
      maTitle: 'Mitarbeiter-Nutzung (monatlich)',
      maSteps: [
        { step: '1', title: 'Betreuung nutzen', text: 'Kita, Krippe, Tagesmutter oder Kindergarten' },
        { step: '2', title: 'Rechnung in der Riso-App hochladen', text: 'Monatliche Betreuungsrechnung fotografieren & einreichen' },
        { step: '3', title: 'Geld erhalten', text: 'Tatsächliche Kosten aufs Konto' },
      ],
    },
    belegprinzip: {
      intro: 'So einfach funktioniert der Kindergarten: Rechnung einreichen, Riso prüft, Erstattung kommt mit der nächsten Gehaltsabrechnung.',
      steps: [
        { icon: '/assets/essen-icons/belegprinzip/app-hochladen.svg', label: 'Rechnung einreichen', sub: 'Foto machen & in der Riso-App hochladen' },
        { icon: '/assets/essen-icons/belegprinzip/riso-prueft.svg', label: 'Riso prüft', sub: 'Regelkonform' },
        { icon: '/assets/essen-icons/belegprinzip/erstattung.svg', label: 'Direkt aufs Konto', sub: 'Monatlich mit dem Gehalt' },
      ],
    },
    vorteile: [
      { title: 'Fördert Mitarbeiterbindung', text: 'Echte Entlastung für Familien im Team.' },
      { title: 'Unterstützt Work-Life-Balance', text: 'Hilft, Beruf und Betreuung zu vereinen.' },
      { title: 'Stärkt die Arbeitgebermarke', text: 'Einfach digital administrierbar über Riso.' },
    ],
    personas: {
      title: 'Passt für jede Betreuungssituation',
      intro: 'Egal welche Betreuungsform deine Mitarbeitenden nutzen, der Kindergarten passt dazu.',
      items: [
        { img: '/assets/kindergarten-icons/personas/kita-alltag.png', title: 'Kita-Alltag', text: 'Monatliche Beiträge einfach einreichen und erstatten.' },
        { img: '/assets/kindergarten-icons/personas/essen-kita.png', title: 'Essen im Kindergarten', text: 'Kosten fürs Mittagessen werden zusätzlich erstattet.' },
        { img: '/assets/kindergarten-icons/personas/ganztags.png', title: 'Ganztagesbetreuung', text: 'Damit deine Kleinsten in guten Händen sind, während du arbeitest.' },
      ],
    },
    faqs: [
      {
        title: 'Kindergarten mit Riso',
        summary: 'Warum es den Zuschuss gibt: Kinderbetreuung ist für viele Familien essenziell, aber auch teuer. Ob Krippe, Kindergarten oder Tagesmutter, die Kosten summieren sich schnell.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/kindergartenzuschuss-mit-riso',
      },
      {
        title: 'Kindergarten – in Kürze',
        summary: 'Kinderbetreuung entlastet den Alltag, ist aber oft teuer. Mit dem Kindergarten wird das ein Stück leichter.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/kindergartenzuschuss-in-kürze',
      },
      {
        title: 'Kindergarten – Voraussetzungen & Bedingungen',
        summary: 'Der Zuschuss gilt nur für die Betreuung von Kindern im Vorschulalter (z.B. in Krippen, Kindergärten, durch Tagesmütter).',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/kindergartenzuschuss-voraussetzungen-bedingungen',
      },
      {
        title: 'Kindergarten – im Detail',
        summary: 'Nicht nur der Kindergarten zählt, diese Betreuungskosten können zusätzlich geltend gemacht werden.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/kindergartenzuschuss-im-detail',
      },
    ],
  },
  'commuting': {
    category: 'cash',
    hasPendelstreckeField: true,
    name: 'Fahrtkosten',
    description: 'Mit den Fahrtkosten unterstützt du deine Mitarbeiter auf dem Weg zur Arbeit, egal ob mit Auto, Fahrrad oder zu Fuß. Der Betrag berechnet sich automatisch aus Entfernung und Arbeitstagen: 0,38 € pro Kilometer ab dem 1. Kilometer. Hinweis: nicht mit dem ÖPNV kombinierbar.',
    taxInfo: {
      steuer: '15 % Pauschalsteuer',
      sv: 'Sozialversicherungsfrei',
    },
    highlightBoxes: [
      { title: '0,38 € pro Kilometer', text: 'Ab dem 1. Kilometer' },
      { title: 'Jedes Verkehrsmittel zählt', text: 'Auto, Fahrrad, E-Scooter, Carsharing oder zu Fuß' },
      { title: 'Beleg-Erstattung', text: 'Cash aufs Konto, direkt mit dem Gehalt erstattet' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Setup (einmalig)',
      agSteps: [
        { step: '1', title: 'Standort & Budget', text: 'Standorte aktivieren und Budget festlegen' },
        { step: '2', title: 'Mitarbeiter zuweisen', text: 'Den Benefit den richtigen Mitarbeitern zuweisen, erst dann haben sie Zugriff' },
        { step: '3', title: 'Fertig', text: 'Riso übernimmt Berechnung und monatliche Berichte' },
      ],
      maTitle: 'Mitarbeiter-Nutzung (monatlich)',
      maSteps: [
        { step: '1', title: 'Arbeitsweg festlegen', text: 'Entfernung Wohnung–Arbeit einmalig hinterlegen' },
        { step: '2', title: 'Fahrttage in der Riso-App eintragen', text: 'Reale Arbeitstage mit Pendelweg angeben' },
        { step: '3', title: 'Geld erhalten', text: 'Bis zu 0,38 €/km automatisch berechnet aufs Konto' },
      ],
    },
    belegprinzip: {
      intro: 'So einfach funktionieren die Fahrtkosten: Pendeldaten eintragen, Riso berechnet, Erstattung kommt mit der nächsten Gehaltsabrechnung.',
      steps: [
        { icon: '/assets/essen-icons/belegprinzip/app-hochladen.svg', label: 'Strecke und Arbeitstage eintragen', sub: 'Einmalig in der Riso-App hinterlegen' },
        { icon: '/assets/essen-icons/belegprinzip/riso-prueft.svg', label: 'Riso berechnet', sub: 'Automatisch jeden Monat' },
        { icon: '/assets/essen-icons/belegprinzip/erstattung.svg', label: 'Direkt aufs Konto', sub: 'Monatlich mit dem Gehalt' },
      ],
    },
    vorteile: [
      { title: 'Top Talente halten und gewinnen', text: 'Hält Fachkräfte und gewinnt neue im Wettbewerb.' },
      { title: 'Positive Unternehmenskultur', text: 'Wirkt sich positiv auf die Unternehmenskultur aus.' },
      { title: 'Einfache Umsetzung', text: 'Heute besprechen, morgen anfangen.' },
    ],
    personas: {
      title: 'Passt für jeden Pendlertyp',
      intro: 'Egal wie deine Mitarbeitenden zur Arbeit kommen, die Fahrtkosten passen zu jedem Arbeitsweg.',
      items: [
        { img: '/assets/commuting-icons/personas/flexi-mobil.png', title: 'Flexi-Mobil', text: 'Mal mit dem Fahrrad, mal einfach zu Fuß, kein Problem.' },
        { img: '/assets/commuting-icons/personas/autofahrer.png', title: 'Autofahrer', text: 'Kilometerpauschale für den Weg mit dem eigenen Wagen zur Arbeit.' },
        { img: '/assets/commuting-icons/personas/flexibel-office.png', title: 'Flexibel ins Office', text: 'Hybrid unterwegs? Jeder Büro-Tag zählt.' },
        { img: '/assets/commuting-icons/personas/fernpendler.png', title: 'Fernpendler', text: 'Auch lange Strecken sind abgedeckt.' },
        { img: '/assets/commuting-icons/personas/roller-pendler.png', title: 'Roller-Pendler', text: 'Auch Rollerfahrten zählen.' },
        { img: '/assets/commuting-icons/personas/fahrgemeinschaftler.png', title: 'Fahrgemeinschaftler', text: 'Fährst nicht selbst? Auch Mitfahrkosten zählen.' },
      ],
    },
    faqs: [
      {
        title: 'Fahrtkosten mit Riso: Pendeln und sparen',
        summary: 'Warum du deinen Arbeitsweg erstattet bekommst: Ob mit Auto, Bus, Bahn oder Fahrrad, der tägliche Weg zur Arbeit kostet Zeit und vor allem Geld.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/fahrkostenzuschuss-mit-riso-pendeln-und-sparen',
      },
      {
        title: 'Fahrtkosten – in Kürze',
        summary: 'Ob mit Auto, Bahn oder Fahrrad, die Fahrt zur Arbeit kostet Zeit und Geld. Gut, dass es dafür einen Zuschuss gibt.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/fahrkostenzuschuss-in-kürze',
      },
      {
        title: 'Fahrtkosten – Voraussetzungen',
        summary: 'Damit du den Zuschuss korrekt erhältst: Er gilt ausschließlich für den Arbeitsweg (Hin- und Rückfahrt), 0,38 € pro Kilometer ab dem 1. Kilometer.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/fahrkostenzuschuss-voraussetzungen',
      },
      {
        title: 'Fahrtkosten – im Detail',
        summary: 'Egal wie du zur Arbeit kommst, so reichst du deine Fahrtkosten flexibel und korrekt ein.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/fahrkostenzuschuss-im-detail',
      },
    ],
  },
  'erholung': {
    category: 'cash',
    isYearlyBudget: true,
    name: 'Erholung',
    description: 'Mit der Erholungsbeihilfe schenkst du deinen Mitarbeitern einmal im Jahr einen Urlaubszuschuss: bis zu 156 € pro Mitarbeiter, plus 104 € für den Ehepartner und 52 € pro Kind. Deine Mitarbeiter reichen einen Urlaubsnachweis in der Riso-App ein und bekommen den Betrag mit dem nächsten Gehalt.',
    taxInfo: {
      steuer: '25 % Pauschalsteuer',
      sv: 'Sozialversicherungsfrei',
    },
    highlightBoxes: [
      { title: '156 € pro Mitarbeiter / Jahr', text: 'Plus 104 € für den Ehepartner und 52 € pro Kind' },
      { title: 'Für jede Form von Erholung', text: 'Pauschalreise, Familienreise, Wellness oder Freizeitpark' },
      { title: 'Beleg-Erstattung', text: 'Cash aufs Konto, direkt mit dem Gehalt erstattet' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Setup (einmalig)',
      agSteps: [
        { step: '1', title: 'Standort & Budget', text: 'Standorte aktivieren und Max-Budget pro Mitarbeiter festlegen' },
        { step: '2', title: 'Erholungsbeihilfe vergeben', text: 'Mitarbeiter, Betrag und Auszahlungsmonat wählen' },
        { step: '3', title: 'Fertig', text: 'Riso prüft den Urlaubsnachweis und zahlt aus' },
      ],
      maTitle: 'Mitarbeiter-Nutzung (jährlich)',
      maSteps: [
        { step: '1', title: 'Urlaub machen', text: 'Mindestens 5 Tage Erholungsurlaub' },
        { step: '2', title: 'Urlaubsnachweis hochladen', text: 'In der Riso-App fotografieren & einreichen' },
        { step: '3', title: 'Geld erhalten', text: 'Erstattung mit dem nächsten Gehalt' },
      ],
    },
    belegprinzip: {
      intro: 'So einfach funktioniert die Erholungsbeihilfe: Urlaubsnachweis einreichen, Riso prüft, Erstattung kommt mit der nächsten Gehaltsabrechnung.',
      steps: [
        { icon: '/assets/essen-icons/belegprinzip/beleg-kaufen.svg', label: 'Urlaub machen', sub: 'Mindestens 5 Tage Erholungsurlaub' },
        { icon: '/assets/essen-icons/belegprinzip/app-hochladen.svg', label: 'Urlaubsnachweis einreichen', sub: 'Foto machen & in der Riso-App hochladen' },
        // TODO(Santiago): echtes Icon für "Riso prüft" liefern — Platzhalter wiederverwendet nachweis-einreichen.svg
        { icon: '/assets/essen-icons/belegprinzip/riso-prueft.svg', label: 'Riso prüft', sub: 'Regelkonform' },
        { icon: '/assets/essen-icons/belegprinzip/erstattung.svg', label: 'Direkt aufs Konto', sub: 'Monatlich mit dem Gehalt' },
      ],
    },
    vorteile: [
      { title: 'Fürsorglicher Arbeitgeber', text: 'Positioniert dein Unternehmen als fürsorglich.' },
      { title: 'Emotionaler Benefit', text: 'Wirkt nicht nur finanziell, sondern emotional.' },
      { title: 'Nachhaltige Leistungsfähigkeit', text: 'Fördert Erholung statt kurzfristiger Motivation.' },
    ],
    personas: {
      title: 'Passt für jede Erholungsart',
      intro: 'Egal wie deine Mitarbeitenden sich erholen, die Erholungsbeihilfe passt zu jeder Urlaubsart.',
      items: [
        { img: '/assets/erholung-icons/personas/pauschalreise.png', title: 'Pauschalreise', text: 'Flug & Hotel als Paket, Belege einreichen, Zuschuss erhalten.' },
        { img: '/assets/erholung-icons/personas/familienreise.png', title: 'Familienreise', text: 'Urlaub mit Kindern, von Hotel bis Ferienwohnung erstattbar.' },
        { img: '/assets/erholung-icons/personas/geniesser.png', title: 'Genießer-Wochenende', text: 'Ein Kurztrip ins Weingebiet, mit Übernachtung natürlich gültig.' },
        { img: '/assets/erholung-icons/personas/road-trip-urlauber.jpg', title: 'Roadtrip', text: 'Mit dem Auto unterwegs, auch für Mietwagen oder Unterkünfte auf dem Weg nutzbar.' },
        { img: '/assets/erholung-icons/personas/wellness.png', title: 'Wellness-Wochenende', text: 'Entspannung im Spa oder Thermalbad, die Rechnung einfach hochladen und profitieren.' },
        { img: '/assets/erholung-icons/personas/freizeitpark.jpg', title: 'Freizeitpark', text: 'Spaß mit Freunden und der Familie im Freizeitpark, Hotelübernachtung inklusive.' },
      ],
    },
    faqs: [
      {
        title: 'Erholungsbeihilfe mit Riso',
        summary: 'Warum der Staat deine Erholung fördert: Du bekommst für deine Erholung einen steuerfreien Zuschuss von deinem Arbeitgeber.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/erholungszuschuss-mit-riso',
      },
      {
        title: 'Erholungsbeihilfe - in Kürze',
        summary: 'Wenn du in den letzten oder kommenden 3 Monaten mindestens 5 Tage Urlaub machst, kannst du dir deine Ausgaben für Hotels oder andere Erholungskosten erstatten lassen.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/erholungsbeihilfe-in-kürze',
      },
      {
        title: 'Erholungsbeihilfe - im Detail',
        summary: 'Voraussetzung ist, dass du mindestens 5 Tage Urlaub nimmst. Belege können bis zu 3 Monate vor oder nach dem Urlaub eingereicht werden.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/erholungsbeihilfe-im-detail',
      },
      {
        title: 'Erholungsbeihilfe - Nutzungsbedingungen',
        summary: 'Damit alles korrekt läuft, gelten klare Regeln für die Nutzung des Erholungszuschusses, z.B. nur eigene Belege einreichen.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/erholungsbeihilfe-nutzungsbedingungen',
      },
    ],
  },
  'sachbezug': {
    category: 'voucher',
    maxBudgetPerEmployee: 50,
    name: 'Sachbezug',
    description: 'Mit dem Sachbezug bekommt jeder Mitarbeiter monatlich einen Gutschein bis zu 50 € aus dem Riso-Partnernetzwerk, mit einer großen Auswahl an Shops, Marken und Freizeitangeboten. Wählt ein Mitarbeiter nichts aus, greift sein hinterlegter Automatik-Gutschein, sodass kein Budget verfällt. Einen Beleg braucht es nicht, und der Benefit kommt jeden Monat verlässlich an.',
    taxInfo: {
      steuer: 'Steuerfrei bis 50 €/Monat',
      sv: 'Sozialversicherungsfrei',
    },
    highlightBoxes: [
      { title: '50 € / Monat', text: 'Automatisch, kein Beleg, kein Aufwand' },
      { title: 'Großes Partnernetzwerk', text: 'Shops, Marken und Freizeitangebote zur Auswahl' },
      { title: 'Als Gutschein verfügbar', text: 'In der Riso-App wählen und direkt beim Partner einlösen' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Setup (einmalig)',
      agSteps: [
        { step: '1', title: 'Standort & Budget', text: 'Standorte aktivieren und Budget festlegen' },
        { step: '2', title: 'Mitarbeiter zuweisen', text: 'Den Benefit den richtigen Mitarbeitern zuweisen, erst dann haben sie Zugriff' },
        { step: '3', title: 'Fertig', text: 'Riso übernimmt steuerliche Bearbeitung und Auslieferung der Codes' },
      ],
      maTitle: 'Mitarbeiter-Nutzung (monatlich)',
      maSteps: [
        { step: '1', title: 'Gutschein auswählen', text: 'Bis zum 19. des Monats aus der Liste wählen' },
        { step: '2', title: 'Einlösecode erhalten', text: 'Am Monatsende in der Riso-App' },
        { step: '3', title: 'Gutschein einlösen', text: 'Bei Partnern einlösen, online oder vor Ort' },
      ],
    },
    belegprinzip: {
      title: 'Das Gutscheinprinzip',
      intro: 'So einfach funktioniert der Sachbezug: Der Gutschein wird automatisch freigeschaltet, der Mitarbeiter wählt ihn aus, erhält den Einlösecode und löst ihn bei Partnern ein.',
      steps: [
        // TODO(Santiago): echtes Icon für "Gutschein auswählen" liefern — Platzhalter wiederverwendet app-hochladen.svg
        { icon: '/assets/essen-icons/belegprinzip/app-hochladen.svg', label: 'Gutschein auswählen', sub: 'Aus dem Riso-Partnernetzwerk in der App' },
        { icon: '/assets/voucher-icons/gutschein-erhalten.svg', label: 'Gutschein erhalten', sub: 'In der Riso-App als Code oder QR-Code' },
        { icon: '/assets/voucher-icons/partner-einloesen.svg', label: 'Bei Partnern einlösen', sub: 'Online oder vor Ort' },
      ],
    },
    vorteile: [
      { title: 'Vorteil im Recruiting', text: 'Ein sichtbares monatliches Extra fürs Team.' },
      { title: 'Flexible Gestaltung', text: 'Frei wählbar bei über 70 Partnern.' },
      { title: 'Digitale Verwaltung', text: 'Steuerlich optimiert, komplett über Riso.' },
    ],
    personas: {
      title: 'Passt für jeden Shopping-Typ',
      intro: 'Egal wofür sich deine Mitarbeitenden entscheiden, der Sachbezug passt zu jedem Geschmack.',
      items: [
        { img: '/assets/sachbezug-icons/personas/mode-liebhaber.png', title: 'Mode-Liebhaber', text: 'Neue Schuhe oder Kleidung kaufen, der Gutschein gilt bei vielen großen Modeketten.' },
        { img: '/assets/sachbezug-icons/personas/technik-fan.png', title: 'Technik-Fan', text: 'Spiele, Konsolen oder Zubehör, mit dem monatlichen Extra.' },
        { img: '/assets/sachbezug-icons/personas/tankstellen-nutzer.png', title: 'Tankstellen-Nutzer', text: 'Ob Benzin oder Diesel, der Sachbezug macht den Tankstopp günstiger.' },
        { img: '/assets/sachbezug-icons/personas/haushalts-held.png', title: 'Haushalts-Held', text: 'Auch für Möbel, Deko oder Haushaltswaren nutzbar.' },
        { img: '/assets/sachbezug-icons/personas/drogerie-fan.png', title: 'Drogerie-Fan', text: 'Kosmetik, Pflege oder Drogerie-Artikel, einfach Gutschein einlösen und sparen.' },
        { img: '/assets/sachbezug-icons/personas/buecherwurm.png', title: 'Bücherwurm', text: 'Fachliteratur oder Bestseller, der Sachbezug gilt auch im Buchhandel.' },
      ],
    },
    faqs: [
      {
        title: 'Änderung der Gutscheinwahl',
        summary: 'Bis zum 19. des Monats kannst du deine Auswahl jederzeit in der App anpassen. Danach wird die Wahl steuerlich verarbeitet und ist für diesen Monat verbindlich.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/änderung-der-gutscheinwahl',
      },
      {
        title: 'Gutschein ändern - Automatik-Gutschein',
        summary: 'Nachträglich können Gutscheine nicht mehr abgeändert oder ausgetauscht werden, da sonst die gesetzlichen Regelungen nicht mehr erfüllt wären. Ein Automatik-Gutschein kann jederzeit hinterlegt werden.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/gutschein-ändern',
      },
      {
        title: 'Sachbezug - alte Gutscheine einsehen',
        summary: 'So findest du alle bisher erhaltenen Gutscheine in der Riso-App wieder, auch aus vergangenen Jahren.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/sachbezug-alte-gutscheine-einsehen',
      },
      {
        title: 'Gutschein funktioniert nicht, Druckversion für Shop-Mitarbeiter',
        summary: 'Falls ein Gutschein beim Einlösen Probleme macht: Eine Anleitung für Shop-Mitarbeiter, wie Codes und Barcodes korrekt verarbeitet werden.',
        url: 'https://hilfe.riso-app.de/portal/de/kb/articles/voucherredemption',
      },
    ],
  },
  'danke-bonus': {
    category: 'voucher',
    name: 'Danke-Bonus',
    description: 'Mit dem Danke-Bonus erkennst du außergewöhnliche Leistungen gezielt an, wann immer du willst. Du legst Betrag und Anlass selbst fest, Riso schaltet den Gutschein direkt in der Riso-App des Mitarbeiters frei. Es gibt keinen festen Rhythmus und keinen Bürokratieaufwand: Du sagst Danke genau dann, wenn es jemand verdient hat.',
    taxInfo: {
      steuer: '30 % Pauschalsteuer',
      sv: 'Sozialversicherungspflichtig',
    },
    highlightBoxes: [
      { title: 'Einmalig, kein monatliches Budget', text: 'Du legst Betrag und Anlass selbst fest, bis zu 10.000 € pro Mitarbeiter im Jahr' },
      { title: 'Riso-Genehmigung erforderlich', text: 'Jeder Danke-Bonus wird vor Freischaltung geprüft' },
      { title: 'Als Gutschein verfügbar', text: 'In der Riso-App wählen und direkt beim Partner einlösen' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Schritte',
      agSteps: [
        { step: '1', title: 'Standort & Budget', text: 'Standorte aktivieren und Max-Budget pro Mitarbeiter festlegen' },
        { step: '2', title: 'Danke-Bonus vergeben', text: 'Mitarbeiter, Anlass und Betrag auswählen' },
        { step: '3', title: 'Fertig', text: 'Riso prüft und schaltet den Gutschein frei' },
      ],
      maTitle: 'Mitarbeiter-Nutzung',
      maSteps: [
        { step: '1', title: 'Danke-Bonus erhalten', text: 'Nach Genehmigung in der Riso-App freigeschaltet' },
        { step: '2', title: 'Gutschein auswählen', text: 'Aus dem Riso-Partnernetzwerk in der App' },
        { step: '3', title: 'Einlösen', text: 'Einlösecode bei Partnern online oder vor Ort einlösen' },
      ],
    },
    belegprinzip: {
      title: 'Das Gutscheinprinzip',
      intro: 'So einfach funktioniert der Danke-Bonus: Nach Genehmigung wird der Gutschein freigeschaltet, der Mitarbeiter wählt ihn aus, erhält den Einlösecode und löst ihn bei Partnern ein.',
      steps: [
        // TODO(Santiago): echtes Icon für "Gutschein auswählen" liefern — Platzhalter wiederverwendet app-hochladen.svg
        { icon: '/assets/essen-icons/belegprinzip/app-hochladen.svg', label: 'Gutschein auswählen', sub: 'Aus dem Riso-Partnernetzwerk in der App' },
        { icon: '/assets/voucher-icons/gutschein-erhalten.svg', label: 'Gutschein erhalten', sub: 'In der Riso-App als Code oder QR-Code' },
        { icon: '/assets/voucher-icons/partner-einloesen.svg', label: 'Bei Partnern einlösen', sub: 'Online oder vor Ort' },
      ],
    },
    vorteile: [
      { title: 'Gezielt belohnen', text: 'Mitarbeitende genau dann anerkennen, wenn sie es verdienen.' },
      { title: 'Teamspirit fördern', text: 'Stärkt den Zusammenhalt im Team nachhaltig.' },
      { title: 'Flexibel & digital', text: 'Betrag und Anlass selbst festlegen, Riso übernimmt den Rest.' },
    ],
    personas: {
      title: 'Passt für jeden Anlass',
      intro: 'Egal wofür sich deine Mitarbeitenden den Dank verdient haben, der Danke-Bonus passt zu jedem Anlass.',
      items: [
        { img: '/assets/danke-bonus-icons/personas/geschenk.png', title: 'Jubiläum-Feier', text: 'Jahrestag erreicht. Geschenk bekommen. Firma sagt Danke.' },
        { img: '/assets/danke-bonus-icons/personas/erfolgsbringer.png', title: 'Erfolgsbringer', text: 'Ziel übertroffen. Extra anerkannt. Gutschein gewählt.' },
        { img: '/assets/danke-bonus-icons/personas/spontane-hilfe.png', title: 'Spontane Hilfe', text: 'Kurzfristig eingesprungen. Großer Dank. Belohnung direkt.' },
        { img: '/assets/danke-bonus-icons/personas/event-hero.png', title: 'Event-Hero', text: 'Viel organisiert. Alles geklappt. AG sagt Danke.' },
        { img: '/assets/danke-bonus-icons/personas/vorbild.png', title: 'Vorbild im Team', text: 'Geduldig & fair. Unterstützend. Jetzt belohnt.' },
        { img: '/assets/danke-bonus-icons/personas/interner-coach.png', title: 'Interner Coach', text: 'Wissen geteilt. Danke erhalten. Gutschein wählbar.' },
      ],
    },
  },
  'geburtstag': {
    category: 'voucher',
    isYearlyBudget: true,
    maxBudgetPerEmployee: 60,
    name: 'Geburtstag',
    description: 'Mit dem Geburtstag überraschst du jeden Mitarbeiter in seinem Geburtstagsmonat mit einem Gutschein bis zu 60 €. Riso schaltet ihn automatisch frei, du musst nichts planen oder manuell auslösen. So wird kein Geburtstag vergessen.',
    taxInfo: {
      steuer: 'Vollständig steuerfrei (R 19.6 LStR)',
      sv: 'Sozialversicherungsfrei',
    },
    highlightBoxes: [
      { title: 'Automatisch, kein Zutun nötig', text: 'Riso schaltet den Gutschein im Geburtsmonat frei' },
      { title: 'Bis zu 60 € / Jahr', text: 'Gesetzliches Maximum, gilt automatisch pro Mitarbeiter' },
      { title: 'Als Gutschein verfügbar', text: 'In der Riso-App wählen und direkt beim Partner einlösen' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Setup (einmalig)',
      agSteps: [
        { step: '1', title: 'Standorte aktivieren', text: 'Lege fest, an welchen Standorten der Benefit Geburtstag gilt' },
        { step: '2', title: 'Geburtstage', text: 'Werden automatisch aus dem Mitarbeiterprofil gezogen, fehlende manuell ergänzen' },
        { step: '3', title: 'Fertig', text: 'Riso schaltet den Gutschein im Geburtsmonat automatisch frei' },
      ],
      maTitle: 'Mitarbeiter-Nutzung',
      maSteps: [
        { step: '1', title: 'Gutschein erhalten', text: 'Automatisch im Geburtsmonat in der Riso-App freigeschaltet' },
        { step: '2', title: 'Gutschein auswählen', text: 'Aus dem Riso-Partnernetzwerk in der App' },
        { step: '3', title: 'Einlösen', text: 'Einlösecode bei Partnern online oder vor Ort einlösen' },
      ],
    },
    belegprinzip: {
      title: 'Das Gutscheinprinzip',
      intro: 'So einfach funktioniert der Geburtstag: Im Geburtsmonat freigeschaltet, der Mitarbeiter wählt den Gutschein, erhält den Einlösecode und löst ihn bei Partnern ein.',
      steps: [
        // TODO(Santiago): echtes Icon für "Gutschein auswählen" liefern — Platzhalter wiederverwendet app-hochladen.svg
        { icon: '/assets/essen-icons/belegprinzip/app-hochladen.svg', label: 'Gutschein auswählen', sub: 'Aus dem Riso-Partnernetzwerk in der App' },
        { icon: '/assets/voucher-icons/gutschein-erhalten.svg', label: 'Gutschein erhalten', sub: 'In der Riso-App als Code oder QR-Code' },
        { icon: '/assets/voucher-icons/partner-einloesen.svg', label: 'Bei Partnern einlösen', sub: 'Online oder vor Ort' },
      ],
    },
    vorteile: [
      { title: 'Persönliche Anerkennung', text: 'Ein Zeichen mit minimalem Budgeteinsatz.' },
      { title: 'Stärkt die emotionale Bindung', text: 'Mehr als nur ein monetärer Anreiz.' },
      { title: 'Kein Verwaltungsaufwand', text: 'Automatische Bereitstellung im Geburtstagsmonat.' },
    ],
    personas: {
      title: 'Passt für jeden Geschmack',
      intro: 'Egal wofür sich deine Mitarbeitenden entscheiden, der Geburtstag passt zu jedem Geschmack.',
      items: [
        { img: '/assets/geburtstag-icons/personas/mode.png', title: 'Mode & Accessoires', text: 'Neue Mode oder Accessoires holen und den Stil auffrischen.' },
        { img: '/assets/geburtstag-icons/personas/technik.png', title: 'Technik & Zubehör', text: 'Kopfhörer, Technikzubehör oder kleine Gadgets für den Alltag.' },
        { img: '/assets/geburtstag-icons/personas/zuhause.png', title: 'Für Zuhause', text: 'Praktische Haushaltsprodukte oder Deko fürs gemütliche Zuhause.' },
        { img: '/assets/geburtstag-icons/personas/selfcare.png', title: 'Selfcare & Beauty', text: 'Wellness- und Beautyprodukte für bewusste Selfcare-Zeit.' },
        { img: '/assets/geburtstag-icons/personas/erlebnis.png', title: 'Erlebnis-Moment', text: 'Kinobesuch, Konzertticket oder eine Aktivität, die den Geburtstag besonders macht.' },
        { img: '/assets/geburtstag-icons/personas/buecher.png', title: 'Bücher & Wissen', text: 'Spannende Bücher, Fachwerke oder Romane entdecken.' },
      ],
    },
  },
  'oepnv': {
    category: 'cash',
    name: 'ÖPNV',
    description: 'Mit dem ÖPNV übernimmst du die Kosten für Bus und Bahn deiner Mitarbeiter, ganz oder anteilig und ohne Höchstbetrag. Ideal für das Deutschlandticket: Du legst einen festen Monatsbetrag fest, deine Mitarbeiter reichen ihr Ticket in der Riso-App ein. Hinweis: nicht mit dem Fahrtkostenzuschuss kombinierbar, pro Mitarbeiter eine Option wählen.',
    taxInfo: {
      steuer: 'Steuerfrei, kein Höchstbetrag',
      sv: 'Sozialversicherungsfrei',
    },
    highlightBoxes: [
      { title: 'Kein Höchstbetrag', text: 'Du legst den Betrag pro Standort selbst fest' },
      { title: 'Jedes ÖPNV-Ticket gilt', text: 'Deutschlandticket, Monats-, Jahres- oder Einzelfahrkarte' },
      { title: 'Beleg-Erstattung', text: 'Cash aufs Konto, direkt mit dem Gehalt erstattet' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Setup (einmalig)',
      agSteps: [
        { step: '1', title: 'Standort & Budget', text: 'Standorte aktivieren und Budget festlegen' },
        { step: '2', title: 'Mitarbeiter zuweisen', text: 'Den Benefit den richtigen Mitarbeitern zuweisen, erst dann haben sie Zugriff' },
        { step: '3', title: 'Fertig', text: 'Riso übernimmt Belegprüfung und monatliche Berichte' },
      ],
      maTitle: 'Mitarbeiter-Nutzung (monatlich)',
      maSteps: [
        { step: '1', title: 'ÖPNV nutzen', text: 'Bus, Bahn oder Deutschlandticket, beliebig' },
        { step: '2', title: 'Ticket in der Riso-App hochladen', text: 'Foto machen & einreichen' },
        { step: '3', title: 'Geld erhalten', text: 'Erstattung aufs Konto' },
      ],
    },
    belegprinzip: {
      intro: 'So einfach funktioniert es: Ticket einreichen, Riso prüft, Erstattung kommt mit der nächsten Gehaltsabrechnung.',
      steps: [
        { icon: '/assets/essen-icons/belegprinzip/beleg-kaufen.svg', label: 'ÖPNV nutzen', sub: 'Bus oder Bahn, Hauptsache unterwegs' },
        { icon: '/assets/essen-icons/belegprinzip/app-hochladen.svg', label: 'Ticket einreichen', sub: 'Foto machen & in der Riso-App hochladen' },
        // TODO(Santiago): echtes Icon für "Riso prüft" liefern — Platzhalter wiederverwendet ticket-einreichen.svg
        { icon: '/assets/essen-icons/belegprinzip/riso-prueft.svg', label: 'Riso prüft', sub: 'Regelkonform' },
        { icon: '/assets/essen-icons/belegprinzip/erstattung.svg', label: 'Direkt aufs Konto', sub: 'Monatlich mit dem Gehalt' },
      ],
    },
    vorteile: [
      { title: 'Mobilität fördern statt Dienstwagen', text: 'Moderne Mobilität für dein Team.' },
      { title: 'Umweltfreundlich und zeitgemäß', text: 'Nachhaltige Mobilität unterstützen.' },
      { title: 'Flexibel für jeden Arbeitsweg', text: 'Passt zu jedem Ticket und jeder Strecke.' },
    ],
    personas: {
      title: 'Passt für jeden ÖPNV-Nutzertyp',
      intro: 'Egal mit welchem Ticket deine Mitarbeitenden unterwegs sind, der ÖPNV-Zuschuss passt zu jedem Fahrweg.',
      items: [
        { img: '/assets/oepnv-icons/personas/deutschlandticket.png', title: 'Deutschlandticket-Nutzer', text: 'Der Deutschlandticket-Preis kann vollständig erstattet werden.' },
        { img: '/assets/oepnv-icons/personas/abo-karten.png', title: 'Abo-Karten-Fan', text: 'Ob Monats- oder Jahresticket, digital erfassen, Rückerstattung erhalten.' },
        { img: '/assets/oepnv-icons/personas/stadtpendler.png', title: 'Stadtpendler', text: 'Streifenkarten oder Einzelfahrten? Auch diese werden berücksichtigt.' },
      ],
    },
  },
  'bkv': {
    category: 'insurance',
    maxBudgetPerEmployee: 83.33,
    name: 'BKV',
    description: 'Mit der Betrieblichen Krankenversicherung bietest du deinen Mitarbeitern privaten Zusatzschutz für Zahn, stationäre und ambulante Behandlungen und mehr. Du zahlst den Beitrag direkt, Riso leitet ihn monatlich an den Versicherer weiter. Im Recruiting ist das ein starkes Signal, dass dein Team gut versorgt ist.',
    taxInfo: {
      steuer: 'Pauschalsteuer',
      sv: 'Sozialversicherungsfrei',
    },
    highlightBoxes: [
      { title: 'Extra-Budget für die Gesundheit', text: 'Moderner Gesundheitsschutz, finanziert vom Arbeitgeber' },
      { title: 'Schon ab 15 € im Monat', text: 'Starker Benefit mit kleinem Budget' },
      { title: 'Ohne Eigenanteil', text: 'Deine Mitarbeitenden profitieren kostenfrei' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Setup',
      agSteps: [
        { step: '1', title: 'Tarif & Budget wählen', text: 'Gemeinsam mit Riso den passenden Gesundheitsschutz festlegen' },
        { step: '2', title: 'Beitrag finanzieren', text: 'Der Arbeitgeber zahlt den monatlichen Beitrag, schon ab 15 €' },
        { step: '3', title: 'Mitarbeiter freischalten', text: 'Das Team erhält Zugang zum Gesundheitsbudget' },
      ],
      maTitle: 'Für deine Mitarbeitenden',
      maSteps: [
        { step: '1', title: 'Gesundheitsbudget erhalten', text: 'Moderner Zusatzschutz ohne Eigenanteil' },
        { step: '2', title: 'Selbst entscheiden', text: 'Wo das Budget eingesetzt wird, Zahn, Vorsorge oder Krankenhaus' },
        { step: '3', title: 'Kostenfrei profitieren', text: 'Mehr Gesundheitsleistungen im Alltag, ganz ohne eigene Kosten' },
      ],
    },
    personas: {
      title: 'Was die BKV abdeckt',
      intro: 'Moderne Gesundheitsleistungen, deine Mitarbeitenden entscheiden selbst, wo sie ihr Gesundheitsbudget einsetzen.',
      items: [
        { img: '/assets/bkv-icons/personas/zahn-booster.png', title: 'Zahn-Booster', text: 'Zahnersatz abgesichert, Prophylaxe möglich ohne Zuzahlung.' },
        { img: '/assets/bkv-icons/personas/eltern-plus.png', title: 'Eltern-Plus', text: 'Für die ganze Familie, Check-ups inklusive, rundum geschützt.' },
        { img: '/assets/bkv-icons/personas/hospital-hero.png', title: 'Hospital-Hero', text: 'Zusatzleistungen, bessere Versorgung, schnellere Termine.' },
      ],
    },
    vorteile: [
      { title: 'Employer Branding stärken', text: 'Ein starkes Signal im Recruiting.' },
      { title: 'Prävention unterstützen', text: 'Moderne Gesundheitsleistungen fürs Team.' },
      { title: 'Einfache Abwicklung', text: 'Steuerlich begünstigt und effizient über Riso.' },
    ],
  },
  'bav': {
    category: 'insurance',
    name: 'BAV',
    description: 'Mit der Betrieblichen Altersvorsorge unterstützt du deine Mitarbeiter beim Aufbau ihrer Rente, mit einem monatlichen Zuschuss direkt in ihren Versicherungsvertrag. Als Arbeitgeber bist du gesetzlich zu mindestens 15 % Zuschuss verpflichtet. Riso übernimmt die Abwicklung und leitet die Beiträge automatisch weiter.',
    taxInfo: {
      steuer: 'Steuerfrei bis zu 8 % der BBG (676 €/Monat, 2026)',
      sv: 'Sozialversicherungsfrei',
    },
    highlightBoxes: [
      { title: 'Heute vorsorgen, morgen profitieren', text: 'Steueroptimierte Altersvorsorge fürs ganze Team' },
      { title: 'Steuer- und sozialabgabenfrei einzahlen', text: 'Ein Teil des Bruttogehalts fließt direkt in die Rente' },
      { title: 'Zusatzrente im Ruhestand', text: 'Flexibel anpassbare Beiträge, digital in der Riso-App' },
    ],
    wieFunktioniert: {
      agTitle: 'Arbeitgeber-Setup',
      agSteps: [
        { step: '1', title: 'Beratung & Tarif', text: 'Mit Riso die passende Altersvorsorge auswählen' },
        { step: '2', title: 'Beitrag festlegen', text: 'Höhe der Entgeltumwandlung und des Arbeitgeber-Zuschusses bestimmen' },
        { step: '3', title: 'Digital abschließen', text: 'Vertragsabschluss läuft digital in der Riso-App' },
      ],
      maTitle: 'Für deine Mitarbeitenden',
      maSteps: [
        { step: '1', title: 'Aus dem Brutto einzahlen', text: 'Per Entgeltumwandlung, der Beitrag wird vor Steuer und Abgaben abgezogen' },
        { step: '2', title: 'In der App verfolgen', text: 'Beiträge jederzeit in der Riso-App einsehen' },
        { step: '3', title: 'Auszahlung im Ruhestand', text: 'Das angesparte Kapital wird im Alter ausgezahlt' },
      ],
    },
    personas: {
      title: 'Für wen sich die BAV lohnt',
      intro: 'Eine Altersvorsorge, die zu jeder Lebensphase passt.',
      items: [
        { img: '/assets/bav-icons/personas/zukunftsplaner.png', title: 'Zukunftsplaner', text: 'Heute schützen, für morgen sparen.' },
        { img: '/assets/bav-icons/personas/karrierestarter.png', title: 'Karrierestarter', text: 'Früh anfangen, Wirkung maximieren und Zukunft aufbauen.' },
        { img: '/assets/bav-icons/personas/finanzbewusste.png', title: 'Finanzbewusste', text: 'Jeder Euro zählt, Netto schützen, Zukunft im Blick.' },
      ],
    },
    vorteile: [
      { title: 'Mitarbeiterbindung verbessern', text: 'Perfekt für langfristige Teams.' },
      { title: 'Nachhaltiger Wettbewerbsvorteil', text: 'Hebt dich von anderen Arbeitgebern ab.' },
      { title: 'Einfache Einführung', text: 'Heute besprechen, morgen anfangen.' },
    ],
  },
};
