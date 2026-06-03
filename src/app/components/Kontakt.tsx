import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  category?: string;
  message?: string;
}

export function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    sendCopy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqItems = [
    {
      question: 'Wie füge ich einen neuen Mitarbeiter hinzu?',
      answer: 'Gehe zu Mitarbeiter → Neue Mitarbeiter importieren und lade eine CSV-Datei hoch. Alternativ kannst du einzelne Mitarbeiter über Neuen Mitarbeiter hinzufügen anlegen.',
    },
    {
      question: 'Wie aktiviere ich ein neues Benefit?',
      answer: 'Gehe zu Benefits → Benefits verwalten und aktiviere das Benefit per Toggle. Das Benefit wird ab dem 1. des nächsten Monats aktiv.',
    },
    {
      question: 'Was ist ein Standort?',
      answer: 'Ein Standort ist ein flexibler Organisationscontainer — z.B. ein Standort oder ein Tochterunternehmen. Ein Mitarbeiter gehört immer zu genau einem Standort.',
    },
    {
      question: 'Wie ändere ich die Budgets?',
      answer: 'Wähle den gewünschten Mitarbeiter unter Mitarbeiter aus und passe die Budgets direkt im Mitarbeiterprofil an. Änderungen gelten ab dem 1. des nächsten Monats.',
    },
    {
      question: 'Wo finde ich meine Berichte?',
      answer: 'Alle generierten Berichte findest du unter Berichte. Du kannst jeden Bericht direkt herunterladen.',
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name muss mindestens 2 Zeichen lang sein';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Gültige E-Mail erforderlich';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Betreff ist erforderlich';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Betreff muss mindestens 5 Zeichen lang sein';
    }

    // Category validation
    if (!formData.category || formData.category === '') {
      newErrors.category = 'Kategorie erforderlich';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Nachricht muss mindestens 10 Zeichen lang sein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate for demo

      if (success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: '',
          message: '',
          sendCopy: false,
        });
        setErrors({});
      } else {
        setShowError(true);
      }

      setIsSubmitting(false);
    }, 1000);
  };

  const handleCancel = () => {
    // Navigate back to previous page
    window.history.back();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    // Navigate back to overview
    window.dispatchEvent(
      new CustomEvent('sidebar-navigate', { detail: { itemId: 'dashboard' } })
    );
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleRetry = () => {
    setShowError(false);
    handleSubmit(new Event('submit') as any);
  };

  const navigateToHelpCenter = () => {
    window.dispatchEvent(
      new CustomEvent('sidebar-navigate', { detail: { itemId: 'help-center' } })
    );
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject.trim() &&
    formData.category &&
    formData.message.trim();

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto">
      {/* Header */}
      <div className="bg-white px-6 py-6">
        <h1 className="text-[32px] font-bold text-[#273A5F] mb-2">Kontakt</h1>
        <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Wir helfen dir gerne weiter. Schreib uns eine Nachricht.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Contact Form */}
        <div className="max-w-[600px] mx-auto bg-white rounded-lg border border-[#E0E0E0] p-6 mb-6">
          <h2 className="text-[20px] font-bold text-[#273A5F] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Kontaktformular
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Dein Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="z.B. Max Mustermann" className={`w-full h-[40px] px-3 py-2 border ${
                  errors.name ? 'border-[#F44336]' : 'border-[#0F429F]'
                } rounded text-[14px] text-[#273A5F] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              />
              {errors.name && (
                <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Deine E-Mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="max@firma.de" className={`w-full h-[40px] px-3 py-2 border ${
                  errors.email ? 'border-[#F44336]' : 'border-[#0F429F]'
                } rounded text-[14px] text-[#273A5F] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              />
              {errors.email && (
                <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Betreff *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Worum geht es?" className={`w-full h-[40px] px-3 py-2 border ${
                  errors.subject ? 'border-[#F44336]' : 'border-[#0F429F]'
                } rounded text-[14px] text-[#273A5F] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              />
              {errors.subject && (
                <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Kategorie *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange} className={`w-full h-[40px] px-3 py-2 border ${
                  errors.category ? 'border-[#F44336]' : 'border-[#0F429F]'
                } rounded text-[14px] text-[#273A5F] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                <option value="">-- Bitte wählen --</option>
                <option value="allgemeine-frage">Allgemeine Frage</option>
                <option value="technisches-problem">Technisches Problem</option>
                <option value="abrechnung-budget">Abrechnung & Budget</option>
                <option value="benefit-anfrage">Benefit-Anfrage</option>
                <option value="benutzer-management">Benutzer-Management</option>
                <option value="sonstiges">Sonstiges</option>
              </select>
              {errors.category && (
                <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {errors.category}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Nachricht *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Deine Nachricht..."
                rows={5} className={`w-full min-h-[120px] px-3 py-3 border ${
                  errors.message ? 'border-[#F44336]' : 'border-[#0F429F]'
                } rounded text-[14px] text-[#273A5F] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              />
              {errors.message && (
                <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {errors.message}
                </p>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                name="sendCopy"
                id="sendCopy"
                checked={formData.sendCopy}
                onChange={handleInputChange} className="w-[18px] h-[18px] border-2 border-[#0F429F] rounded text-[#0F429F] focus:ring-[#0F429F]"
              />
              <label htmlFor="sendCopy" className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Kopie an meine E-Mail
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6 justify-between">
              <button
                type="button"
                onClick={handleCancel} className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition-colors"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting} className={`px-6 py-3 rounded-full transition-colors ${
                  !isFormValid || isSubmitting
                    ? 'bg-[#CCCCCC] text-white cursor-not-allowed'
                    : 'bg-[#0F429F] text-white hover:bg-[#246AFF]'
                }`}
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                {isSubmitting ? 'Wird gesendet...' : 'Senden'}
              </button>
            </div>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="max-w-[100%] bg-white rounded-xl border border-[#E0E0E0] p-6">
          <h2 className="text-[20px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index} className={`pb-4 ${index !== faqItems.length - 1 ? 'border-b border-[#E0E0E0]' : ''}`}
              >
                <div className="flex gap-2 mb-2">
                  <span className="text-[16px] text-[#0F429F]">❓</span>
                  <h3 className="text-[14px] font-medium text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {item.question}
                  </h3>
                </div>
                <p className="text-[13px] text-[#666666] ml-6"
                  style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}
                >
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Link to Help Center */}
          <div className="text-right mt-4">
            <button
              onClick={navigateToHelpCenter} className="text-[13px] text-[#0F429F] hover:text-[#246AFF] hover:underline cursor-pointer"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Mehr Fragen anschauen →
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-[20px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Nachricht versendet!
            </h3>
            <p className="text-[14px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Danke für deine Nachricht. Wir melden uns in Kürze bei dir.
            </p>
            <button
              onClick={handleCloseSuccess} className="px-6 py-3 bg-[#0F429F] text-white rounded-full hover:bg-[#246AFF] transition-colors"
              style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
            >
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-[20px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Fehler beim Versenden
            </h3>
            <p className="text-[14px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Leider gab es ein Problem. Bitte versuche es später erneut oder kontaktiere uns direkt unter{' '}
              <a href="mailto:support@riso-app.de" className="text-[#0F429F] underline">
                support@riso-app.de
              </a>
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCloseError} className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition-colors"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Schließen
              </button>
              <button
                onClick={handleRetry} className="px-6 py-3 bg-[#0F429F] text-white rounded-full hover:bg-[#246AFF] transition-colors"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Nochmal versuchen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
