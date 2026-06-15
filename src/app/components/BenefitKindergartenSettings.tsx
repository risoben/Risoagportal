import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitTaxInfo } from './BenefitTaxInfo';
import { StatusBadge } from './Table';
import { benefitsSettingsData } from './benefitSettingsData';

type NutzungStatus = 'approved' | 'pending' | 'rejected';

interface KindergartenNutzung {
  id: string;
  employeeName: string;
  location: string;
  kinder: number;
  kostenMonat: number;
  status: NutzungStatus;
}

const STATUS_CONFIG: Record<NutzungStatus, { label: string; bg: string; color: string; border: string }> = {
  approved: { label: '✅ Aktiv',      bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
  pending:  { label: '⏳ Ausstehend', bg: '#FFF8E1', color: '#F57F17', border: '#FFD54F' },
  rejected: { label: '❌ Abgelehnt',  bg: '#FFEBEE', color: '#C62828', border: '#EF9A9A' },
};

const MOCK_NUTZUNGEN: KindergartenNutzung[] = [
  { id: '1', employeeName: 'Anna Müller',    location: 'München',    kinder: 2, kostenMonat: 840,  status: 'approved' },
  { id: '2', employeeName: 'Klaus Fischer',  location: 'Heddesheim', kinder: 1, kostenMonat: 320,  status: 'pending'  },
  { id: '3', employeeName: 'Sara Becker',    location: 'München',    kinder: 1, kostenMonat: 450,  status: 'approved' },
  { id: '4', employeeName: 'Tom Schmidt',    location: 'Berlin',     kinder: 3, kostenMonat: 1100, status: 'rejected' },
];

export function BenefitKindergartenSettings() {
  const [isActive, setIsActive] = useState(true);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const taxInfo = benefitsSettingsData['kindergarten']?.taxInfo;
  const description = benefitsSettingsData['kindergarten']?.description;

  const goBack = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));

  const aktiveNutzungen = MOCK_NUTZUNGEN.filter(n => n.status === 'approved');
  const gesamtKosten = aktiveNutzungen.reduce((sum, n) => sum + n.kostenMonat, 0);
  const gesamtKinder = MOCK_NUTZUNGEN.reduce((sum, n) => sum + n.kinder, 0);

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Back */}
      <div className="bg-white px-8 pt-6 pb-4">
        <button onClick={goBack} className="flex items-center text-[#0F429F] text-[12px] hover:underline transition">
          <ArrowLeft size={16} className="mr-1" />
          Zurück zu Benefits verwalten
        </button>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-8 pb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <BenefitIconComponent benefitName="Kindergartenzuschuss" size={48} background={true} />
            <div>
              <h1 className="text-[32px] font-bold text-[#273A5F]">Kindergartenzuschuss</h1>
              <p className="text-[13px] text-[#666666] mt-1">Tatsächliche Betreuungskosten — kein Höchstbetrag</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px] text-[#273A5F]">Status</span>
              <button
                onClick={() => setIsActive(v => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <StatusBadge status={isActive ? 'Aktiv' : 'Inaktiv'} type={isActive ? 'success' : 'inactive'} />
            </div>
            <p className="text-[11px] text-[#666666]">Status-Änderung gilt ab 1. nächsten Monat</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6" style={{ maxWidth: '900px' }}>

        {/* Section 1: Benefit-Informationen */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-3">Benefit-Informationen</h2>
          <p className="text-[14px] text-[#333333]" style={{ lineHeight: '1.6' }}>
            {description}
          </p>
        </div>

        {/* Section 2: Aktive Nutzungen */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5">Aktive Nutzungen</h2>

          {MOCK_NUTZUNGEN.length === 0 ? (
            <p className="text-[14px] text-[#9E9E9E] text-center py-8">Noch keine Nutzungen eingetragen.</p>
          ) : (
            <>
              <div
                className="bg-[#273A5F] px-4 h-11 rounded-t-lg"
                style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.6fr 1.2fr 0.6fr 1fr 1fr' }}
              >
                {['Mitarbeiter', 'Standort', 'Kinder', 'Kosten/Monat', 'Status'].map(h => (
                  <span key={h} className="text-white font-bold text-xs uppercase tracking-wide">{h}</span>
                ))}
              </div>

              {MOCK_NUTZUNGEN.map((n, i) => {
                const sc = STATUS_CONFIG[n.status];
                return (
                  <div
                    key={n.id}
                    className={`px-4 border-b border-[#E5E7EB] last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}
                    style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.6fr 1.2fr 0.6fr 1fr 1fr', minHeight: '52px', paddingTop: '8px', paddingBottom: '8px' }}
                  >
                    <span className="text-[14px] text-[#333333]">{n.employeeName}</span>
                    <span className="text-[13px] text-[#666666]">{n.location}</span>
                    <span className="text-[13px] text-[#333333]">{n.kinder}</span>
                    <span className="text-[13px] text-[#273A5F] font-medium">
                      {n.kostenMonat.toLocaleString('de-DE')} €
                    </span>
                    <span
                      className="text-[11px] font-medium px-2 py-1 rounded-full"
                      style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, width: 'fit-content' }}
                    >
                      {sc.label}
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Section 3: Nutzungsstatistik */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5">Nutzungsstatistik</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Mitarbeiter mit Zugriff', value: String(MOCK_NUTZUNGEN.length) },
              { label: 'Kosten diesen Monat',     value: `${gesamtKosten.toLocaleString('de-DE')} €` },
              { label: 'Kinder gesamt',           value: String(gesamtKinder) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 text-center">
                <p className="text-[24px] font-bold text-[#273A5F]">{value}</p>
                <p className="text-[12px] text-[#666666] mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Steuerliche Behandlung */}
        {taxInfo && <BenefitTaxInfo steuer={taxInfo.steuer} sv={taxInfo.sv} />}

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 mb-8">
          <button
            onClick={() => setShowDeactivateModal(true)}
            className="px-6 py-3 border border-[#F44336] text-[#F44336] font-medium rounded-full hover:bg-[#FFEBEE] transition"
            style={{ borderRadius: '24px' }}
          >
            Deaktivieren
          </button>
          <button
            className="px-8 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#246AFF] transition"
            style={{ borderRadius: '24px' }}
          >
            Speichern
          </button>
        </div>
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <div className="text-[48px] mb-3">⚠️</div>
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-3">Benefit deaktivieren?</h3>
            <p className="text-[14px] text-[#333333] mb-4">Möchtest du den <strong>Kindergartenzuschuss</strong> wirklich deaktivieren?</p>
            <div className="bg-[#FFEBEE] border border-[#F44336] rounded p-3 mb-6 flex items-start gap-2 text-left">
              <span>⚠️</span>
              <p className="text-[12px] text-[#F44336]">Mitarbeiter verlieren ab 1. nächsten Monat Zugriff auf diesen Benefit.</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ borderRadius: '24px' }}
              >Abbrechen</button>
              <button
                onClick={() => { setShowDeactivateModal(false); goBack(); }}
                className="px-6 py-3 bg-[#F44336] text-white rounded-full hover:bg-[#D32F2F] transition"
                style={{ borderRadius: '24px' }}
              >Deaktivieren</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
