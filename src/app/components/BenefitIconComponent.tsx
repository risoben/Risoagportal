interface BenefitIconProps {
  benefitName: string;
  size?: 32 | 40 | 48;
  background?: boolean;
  className?: string;
}

const benefitConfig: Record<string, { svgPath: string }> = {
  'Mittagessen':                 { svgPath: '/assets/benefit-icons/Mittagessen.svg' },
  'Internet':                    { svgPath: '/assets/benefit-icons/Internet.svg' },
  'Internetzuschuss':            { svgPath: '/assets/benefit-icons/Internet.svg' },
  'Kindergarten':                { svgPath: '/assets/benefit-icons/Kindergarten.svg' },
  'Kindergartenzuschuss':        { svgPath: '/assets/benefit-icons/Kindergarten.svg' },
  'Commuting':                   { svgPath: '/assets/benefit-icons/Commuting.svg' },
  'Fahrtkosten':                 { svgPath: '/assets/benefit-icons/Commuting.svg' },
  'Fahrkostenzuschuss':          { svgPath: '/assets/benefit-icons/Commuting.svg' },
  'Fahrtkostenzuschuss':         { svgPath: '/assets/benefit-icons/Commuting.svg' },
  'Erholung':                    { svgPath: '/assets/benefit-icons/Erholung.svg' },
  'Erholungsbeihilfe':           { svgPath: '/assets/benefit-icons/Erholung.svg' },
  'Sachbezug':                   { svgPath: '/assets/benefit-icons/Sachbezug.svg' },
  '50 €-Sachbezug':               { svgPath: '/assets/benefit-icons/Sachbezug.svg' },
  'Danke-Bonus':                 { svgPath: '/assets/benefit-icons/Danke-Bonus.svg' },
  'Geburtstag':                  { svgPath: '/assets/benefit-icons/Geburtstag.svg' },
  'Geburtstagsgutschein':        { svgPath: '/assets/benefit-icons/Geburtstag.svg' },
  'Geburtstagsgutschein / Jubiläum': { svgPath: '/assets/benefit-icons/Geburtstag.svg' },
  'ÖPNV':                        { svgPath: '/assets/benefit-icons/OEPNV.svg' },
  'ÖPNV-Ticket':                 { svgPath: '/assets/benefit-icons/OEPNV.svg' },
  'ÖPNV-Ticket-Zuschuss':        { svgPath: '/assets/benefit-icons/OEPNV.svg' },
  'BKV':                         { svgPath: '/assets/benefit-icons/BKV.svg' },
  'BKV (Betriebliche Krankenversicherung)': { svgPath: '/assets/benefit-icons/BKV.svg' },
  'Betriebliche Krankenversicherung (BKV)': { svgPath: '/assets/benefit-icons/BKV.svg' },
  'BAV':                         { svgPath: '/assets/benefit-icons/BAV.svg' },
  'BAV (Betriebliche Altersvorsorge)': { svgPath: '/assets/benefit-icons/BAV.svg' },
  'Betriebliche Altersvorsorge (BAV)': { svgPath: '/assets/benefit-icons/BAV.svg' },
};

export function BenefitIconComponent({
  benefitName,
  size = 48,
  background = false,
  className = '',
}: BenefitIconProps) {
  const config = benefitConfig[benefitName];
  const iconSize = size === 32 ? 20 : size === 40 ? 28 : 32;

  const imgEl = config ? (
    <img
      src={config.svgPath}
      alt={benefitName}
      style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
    />
  ) : (
    <span style={{ fontSize: `${iconSize}px`, lineHeight: 1 }}>💰</span>
  );

  if (background) {
    return (
      <div
        className={`flex items-center justify-center rounded-full ${className}`}
        style={{ width: `${size}px`, height: `${size}px`, backgroundColor: '#F0F4FF' }}
      >
        {imgEl}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {imgEl}
    </div>
  );
}
