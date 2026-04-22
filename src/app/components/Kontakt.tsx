import { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, ChevronDown } from 'lucide-react';

export function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: 'Wie aktiviere ich ein neues Benefit?',
      answer: 'Gehe zu Benefits Management und klick auf "Benefit hinzufügen". Folge dann den Anweisungen im Setup-Wizard.',
    },
    {
      id: 2,
      question: 'Kann ich Benefits für einzelne Abteilungen aktivieren?',
      answer: 'Ja! In den Benefit-Einstellungen kannst du auswählen, für welche Abteilungen das Benefit automatisch zugeteilt wird.',
    },
    {
      id: 3,
      question: 'Welche Formate unterstützen die Reports?',
      answer: 'Reports können als PDF, Excel oder CSV exportiert werden. Du kannst das Format in den Report-Einstellungen auswählen.',
    },
    {
      id: 4,
      question: 'Wie lange dauert die Genehmigung von Benefits?',
      answer: 'Normalerweise dauert die Genehmigung 1-2 Geschäftstage. Dringliche Anfragen werden prioritär bearbeitet.',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting contact form:', formData);
    alert('Nachricht wurde gesendet! Wir antworten normalerweise innerhalb von 24 Stunden.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-8">
          <h1 className="text-4xl font-bold text-[#273A5F] mb-2">Kontakt & Support</h1>
          <p className="text-lg text-[#6B7280]">Wie können wir dir helfen?</p>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-3 gap-8 max-w-6xl">
          {/* Left Column - Contact Form (2/3 width) */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-8">
              <h2 className="text-2xl font-bold text-[#273A5F] mb-6">Schreib uns eine Nachricht</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#273A5F] mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Dein Name"
                    required
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] text-[#273A5F]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#273A5F] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="deine.email@company.de"
                    required
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] text-[#273A5F]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#273A5F] mb-2">Telefon (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+49 (0) 123 456789"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] text-[#273A5F]"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-[#273A5F] mb-2">Betreff</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] text-[#273A5F]"
                  >
                    <option value="">Wähle ein Thema...</option>
                    <option value="benefit-activation">Benefit aktivieren</option>
                    <option value="technical-issue">Technisches Problem</option>
                    <option value="billing">Fragen zur Abrechnung</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#273A5F] mb-2">Nachricht</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Schreibe hier deine Nachricht..."
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] text-[#273A5F]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition"
                  style={{ borderRadius: '32px' }}
                >
                  Nachricht absenden
                </button>
              </form>

              {/* Response Time Info */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <p className="text-sm font-medium text-green-900">Schnelle Antwort garantiert</p>
                  <p className="text-xs text-green-700 mt-1">Wir antworten normalerweise innerhalb von 24 Stunden</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info (1/3 width) */}
          <div>
            {/* Direct Contact */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#273A5F] mb-4">Direkter Kontakt</h3>
              <div className="space-y-4">
                <a href="mailto:support@riso-app.de" className="flex items-center gap-3 text-[#273A5F] hover:text-[#0F429F] transition">
                  <Mail size={20} className="text-[#0F429F]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Email</p>
                    <p className="font-medium">support@riso-app.de</p>
                  </div>
                </a>

                <a href="tel:+49123456789" className="flex items-center gap-3 text-[#273A5F] hover:text-[#0F429F] transition">
                  <Phone size={20} className="text-[#0F429F]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Telefon</p>
                    <p className="font-medium">+49 (0) 123 456789</p>
                  </div>
                </a>

                <button 
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-[#0F429F] font-medium rounded-lg hover:bg-blue-100 transition"
                  style={{ borderRadius: '8px' }}
                >
                  <MessageCircle size={18} />
                  Live Chat starten
                </button>

                <a href="#" className="flex items-center gap-3 text-[#273A5F] hover:text-[#0F429F] transition">
                  <MapPin size={20} className="text-[#0F429F]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Adresse</p>
                    <p className="font-medium text-sm">Riso GmbH, Berlin</p>
                  </div>
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <h3 className="text-lg font-bold text-[#273A5F] mb-4">Häufig gestellte Fragen</h3>
              <div className="space-y-2">
                {faqItems.map((item) => (
                  <div key={item.id} className="border-b border-[#E5E7EB] last:border-b-0">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
                      className="w-full py-3 flex items-start justify-between hover:bg-gray-50 transition"
                    >
                      <span className="text-sm font-medium text-[#273A5F] text-left">{item.question}</span>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 ml-2 text-[#6B7280] transition-transform ${
                          expandedFAQ === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedFAQ === item.id && (
                      <p className="pb-3 text-sm text-[#6B7280]">{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
