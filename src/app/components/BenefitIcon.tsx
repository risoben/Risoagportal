import mittagessen from '/Mittagessen.svg';
import sachbezug from '/Sachbezug.svg';
import dankeBonus from '/Danke-Bonus.svg';
import internet from '/Internet.svg';
import kindergarten from '/Kindergarten.svg';
import geburtstag from '/Geburtstag.svg';
import erholung from '/Erholung.svg';
import commuting from '/Commuting.svg';
import oepnv from '/OEPNV.svg';
import bkv from '/BKV.svg';
import bav from '/BAV.svg';

type BenefitIconProps = {
  benefitName: string;
  size?: 16 | 24 | 32 | 48 | 'tiny' | 'small' | 'medium' | 'large';
  disabled?: boolean;
  withShadow?: boolean;
  className?: string;
};

// Mapping between benefit names and image assets
const benefitIconMap: Record<string, string> = {
  'Essenszuschuss': mittagessen,
  'Mittagessen': mittagessen,
  '50€-Sachbezug': sachbezug,
  'Sachbezug': sachbezug,
  'Danke-Bonus': dankeBonus,
  'Internetzuschuss': internet,
  'Kindergartenzuschuss': kindergarten,
  'Geburtstagsgutschein': geburtstag,
  'Erholungsbeihilfe': erholung,
  'Fahrtkostenzuschuss': commuting,
  'ÖPNV-Ticket-Zuschuss': oepnv,
  'BKV': bkv,
  'BKV (Betriebliche Krankenversicherung)': bkv,
  'BAV': bav,
  'BAV (Betriebliche Altersvorsorge)': bav,
};

const sizeMap = {
  tiny: 16,
  small: 24,
  medium: 32,
  large: 48,
  16: 16,
  24: 24,
  32: 32,
  48: 48,
};

export function BenefitIcon({
  benefitName,
  size = 'medium',
  disabled = false,
  withShadow = false,
  className = ''
}: BenefitIconProps) {
  const iconSrc = benefitIconMap[benefitName];
  const iconSize = sizeMap[size];
  const isLargeIcon = iconSize >= 48;

  // Apply subtle shadow only for large icons (48px) if requested
  const shadowStyle = withShadow && isLargeIcon ? { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' } : {};

  // Use image asset
  return (
    <img
      src={iconSrc}
      alt={benefitName} className={`transition-transform duration-200 ${
        disabled
          ? 'opacity-50 cursor-not-allowed grayscale'
          : 'hover:scale-105'
      } ${className}`}
      style={{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        borderRadius: '50%',
        ...shadowStyle,
      }}
    />
  );
}
