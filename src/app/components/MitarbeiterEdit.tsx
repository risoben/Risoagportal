import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

export function MitarbeiterEdit() {
  const [formData, setFormData] = useState({
    firstName: 'Anna',
    lastName: 'Smith',
    email: 'anna@company.de',
    phone: '+49 123 456',
    department: 'Vertrieb',
    employeeId: '#001',
  });

  const [benefits, setBenefits] = useState([
    { name: 'Essenszuschuss', status: 'aktiv', budget: '€1.000' },
    { name: 'Mobilität', status: 'aktiv', budget: '€500' },
    { name: 'Internet', status: 'ausstehend', budget: '€50' },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saving employee:', formData);
    alert('Mitarbeiter gespeichert!');
  };

  const goBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'mitarbeiter' } }));
  };

  return (
    <div className="flex-1 bg-white overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="px-8 py-4">
          <button
            onClick={goBack}
            className="flex items-center text-[#0F429F] hover:text-[#0d3680] mb-4 transition"
          >
            <ChevronLeft size={20} />
            <span className="ml-2">Zurück</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#246AFF] to-[#0F429F] rounded-full flex items-center justify-center text-white text-xl font-bold">
              AS
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#273A5F]">{formData.firstName} {formData.lastName}</h1>
              <p className="text-[#6B7280]">ID: {formData.employeeId} | {formData.department}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {/* Personal Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#273A5F] mb-6">Persönliche Informationen</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#273A5F] mb-2">Vorname</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#273A5F] mb-2">Nachname</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#273A5F] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#273A5F] mb-2">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#273A5F] mb-2">Abteilung</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
              >
                <option>Vertrieb</option>
                <option>IT</option>
                <option>HR</option>
                <option>Management</option>
              </select>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#273A5F] mb-6">Zugewiesene Benefits</h2>
          <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#273A5F]">
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Benefit</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Budget</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Aktion</th>
                </tr>
              </thead>
              <tbody>
                {benefits.map((benefit, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                    <td className="px-6 py-4 text-sm text-[#273A5F]">{benefit.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        benefit.status === 'aktiv'
                          ? 'bg-green-100 text-green-800'
                          : benefit.status === 'ausstehend'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {benefit.status === 'aktiv' ? '✅ Aktiv' : benefit.status === 'ausstehend' ? '⏳ Ausstehend' : '❌ Inaktiv'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#273A5F]">{benefit.budget}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-[#0F429F] hover:text-[#0d3680] font-medium transition">Bearbeiten</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition"
            style={{ borderRadius: '32px' }}
          >
            Speichern
          </button>
          <button
            onClick={goBack}
            className="px-6 py-3 border border-[#E5E7EB] text-[#273A5F] font-medium rounded-full hover:bg-gray-50 transition"
            style={{ borderRadius: '32px' }}
          >
            Abbrechen
          </button>
          <button 
            className="px-6 py-3 border border-red-300 text-red-600 font-medium rounded-full hover:bg-red-50 transition ml-auto"
            style={{ borderRadius: '32px' }}
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}
