interface BenefitTaxInfoProps {
  steuer: string;
  sv: string;
}

export function BenefitTaxInfo({ steuer, sv }: BenefitTaxInfoProps) {
  const svLower = sv.toLowerCase();
  const svFrei = svLower.startsWith('sv-frei') || svLower.startsWith('sozialversicherungsfrei');
  const steuerFrei = steuer.toLowerCase().includes('steuerfrei');
  // Korrekte Lohnsteuer-Terminologie: "Sozialversicherungsfrei/-pflichtig" → "Abgabenfrei/-pflichtig"
  const svLabel = sv
    .replace(/Sozialversicherungsfrei/i, 'Abgabenfrei')
    .replace(/Sozialversicherungspflichtig/i, 'Abgabenpflichtig');

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
      <h2 className="text-[22px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Hinweis zu Steuern und Abgaben
      </h2>
      {/* grid-cols-3 wie die Highlight-Kacheln — 2 Slots belegt, jede Kachel 1/3 breit */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4">
          <p className="text-[16px] font-bold text-[#273A5F] uppercase tracking-wide mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Steuer
          </p>
          {steuerFrei ? (
            <span
              className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1 rounded-full"
              style={{
                background: '#E8F5E9',
                color: '#2E7D32',
                border: '1px solid #A5D6A7',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              Steuerfrei
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          ) : (
            <p className="text-[13px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
              {steuer}
            </p>
          )}
        </div>
        <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4">
          <p className="text-[16px] font-bold text-[#273A5F] uppercase tracking-wide mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Sozialversicherung
          </p>
          <span
            className="inline-block text-[13px] font-medium px-3 py-1 rounded-full"
            style={{
              background: svFrei ? '#E8F5E9' : '#F0F0F0',
              color: svFrei ? '#2E7D32' : '#333333',
              border: `1px solid ${svFrei ? '#A5D6A7' : '#D6D6D6'}`,
            }}
          >
            {svLabel}
          </span>
        </div>
        {/* 3. Slot leer — Kacheln behalten dieselbe Breite wie die 3er-Grid-Kacheln oben */}
      </div>
    </div>
  );
}
