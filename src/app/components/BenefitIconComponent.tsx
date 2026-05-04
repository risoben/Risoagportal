interface BenefitIconProps {
  benefitName: string;
  size?: 32 | 40 | 48;
  background?: boolean;
  className?: string;
}

const benefitConfig: Record<string, { svgPath: string; color: string; fallbackEmoji?: string }> = {
  'Essenszuschuss': { svgPath: '/assets/benefit-icons/Mittagessen.svg', color: '#F4B860' },
  'Mittagessen': { svgPath: '/assets/benefit-icons/Mittagessen.svg', color: '#F4B860' },
  'Internet': { svgPath: '/assets/benefit-icons/Internet.svg', color: '#4CAF50' },
  'Internetzuschuss': { svgPath: '/assets/benefit-icons/Internet.svg', color: '#4CAF50' },
  'Kindergarten': { svgPath: '/assets/benefit-icons/Kindergarten.svg', color: '#FF6B6B' },
  'Kindergartenzuschuss': { svgPath: '/assets/benefit-icons/Kindergarten.svg', color: '#FF6B6B' },
  'Commuting': { svgPath: '/assets/benefit-icons/Commuting.svg', color: '#4CAF50' },
  'Fahrtkostenzuschuss': { svgPath: '/assets/benefit-icons/Commuting.svg', color: '#4CAF50' },
  'Erholung': { svgPath: '/assets/benefit-icons/Erholung.svg', color: '#2196F3' },
  'Erholungsbeihilfe': { svgPath: '/assets/benefit-icons/Erholung.svg', color: '#2196F3' },
  'Sachbezug': { svgPath: '/assets/benefit-icons/Sachbezug.svg', color: '#E91E63' },
  '50€-Sachbezug': { svgPath: '/assets/benefit-icons/Sachbezug.svg', color: '#E91E63' },
  'Danke-Bonus': { svgPath: '/assets/benefit-icons/Danke-Bonus.svg', color: '#4CAF50' },
  'Geburtstag': { svgPath: '/assets/benefit-icons/Geburtstag.svg', color: '#FFC107' },
  'Geburtstagsgutschein / Jubiläum': { svgPath: '/assets/benefit-icons/Geburtstag.svg', color: '#FFC107' },
  'ÖPNV': { svgPath: '/assets/benefit-icons/OEPNV.svg', color: '#2196F3' },
  'ÖPNV-Ticket-Zuschuss': { svgPath: '/assets/benefit-icons/OEPNV.svg', color: '#2196F3' },
  'BKV': { svgPath: '', color: '#0F429F', fallbackEmoji: '🏥' },
  'BKV (Betriebliche Krankenversicherung)': { svgPath: '', color: '#0F429F', fallbackEmoji: '🏥' },
  'BAV': { svgPath: '', color: '#8E44AD', fallbackEmoji: '💼' },
  'BAV (Betriebliche Altersvorsorge)': { svgPath: '', color: '#8E44AD', fallbackEmoji: '💼' }
};

export function BenefitIconComponent({
  benefitName,
  size = 48,
  background = false,
  className = ''
}: BenefitIconProps) {
  const config = benefitConfig[benefitName] || { svgPath: '', color: '#666666', fallbackEmoji: '💰' };

  // Icon size within the container
  const iconSize = size === 32 ? 20 : size === 40 ? 28 : 32;

  // Use SVG if available, otherwise use emoji fallback
  const useSvg = config.svgPath && config.svgPath !== '';

  if (background) {
    return (
      <div
        className={`flex items-center justify-center rounded-full ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: `${config.color}20`, // 20% opacity
        }}
      >
        {useSvg ? (
          <img
            src={config.svgPath}
            alt={benefitName}
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            }}
          />
        ) : (
          <div
            style={{
              fontSize: `${iconSize}px`,
              color: config.color,
              lineHeight: 1,
            }}
          >
            {config.fallbackEmoji}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {useSvg ? (
        <img
          src={config.svgPath}
          alt={benefitName}
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
        />
      ) : (
        <div
          style={{
            fontSize: `${iconSize}px`,
            color: config.color,
            lineHeight: 1,
          }}
        >
          {config.fallbackEmoji}
        </div>
      )}
    </div>
  );
}
