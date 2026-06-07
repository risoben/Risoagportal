interface BenefitTaxInfoProps {
  steuer: string;
  sv: string;
}

export function BenefitTaxInfo({ steuer, sv }: BenefitTaxInfoProps) {
  const svLower = sv.toLowerCase();
  const svFrei = svLower.startsWith('sv-frei') || svLower.startsWith('sozialversicherungsfrei');

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
      <h2 className="text-[18px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Steuerliche Behandlung
      </h2>
      <div className="overflow-hidden rounded-lg border border-[#E0E0E0]">
        <div
          className="bg-[#273A5F] px-5 h-11"
          style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1fr 1fr' }}
        >
          <span className="text-white font-bold text-xs uppercase tracking-wide">Steuer</span>
          <span className="text-white font-bold text-xs uppercase tracking-wide">Sozialversicherung</span>
        </div>
        <div
          className="bg-white px-5"
          style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1fr 1fr', minHeight: '56px', paddingTop: '12px', paddingBottom: '12px' }}
        >
          <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.5' }}>
            {steuer}
          </span>
          <div>
            <span
              className="text-[12px] font-medium px-3 py-1 rounded-full"
              style={{
                background: svFrei ? '#E8F5E9' : '#FFEBEE',
                color: svFrei ? '#2E7D32' : '#C62828',
                border: `1px solid ${svFrei ? '#A5D6A7' : '#EF9A9A'}`,
              }}
            >
              {sv}
            </span>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-[#9E9E9E] mt-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Steuerliche Behandlung nach geltendem deutschen Recht. Riso übernimmt die Abwicklung automatisch.
      </p>
    </div>
  );
}
