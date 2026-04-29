import { useState, useEffect } from 'react';
import { X, Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = 'editing' | 'sending' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  sendCopy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  category?: string;
  message?: string;
}

const categories = [
  'Allgemeine Frage',
  'Technisches Problem',
  'Abrechnung & Budget',
  'Benefit-Anfrage',
  'Benutzer-Management',
  'Sonstiges'
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState<FormState>('editing');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    sendCopy: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFormState('editing');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
        sendCopy: false
      });
      setErrors({});
      setTouched({});
    }
  }, [isOpen]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name ist erforderlich';
        if (value.trim().length < 2) return 'Name muss mindestens 2 Zeichen lang sein';
        break;
      case 'email':
        if (!value.trim()) return 'E-Mail ist erforderlich';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Gültige E-Mail erforderlich (z.B. max@firma.de)';
        if (value.length > 255) return 'E-Mail sehr lang';
        break;
      case 'subject':
        if (!value.trim()) return 'Betreff ist erforderlich';
        if (value.trim().length < 5) return 'Betreff muss mindestens 5 Zeichen lang sein';
        if (value.length > 150) return 'Betreff kürzen';
        break;
      case 'category':
        if (!value) return 'Kategorie erforderlich';
        break;
      case 'message':
        if (!value.trim()) return 'Nachricht ist erforderlich';
        if (value.trim().length < 10) return 'Nachricht muss mindestens 10 Zeichen lang sein';
        if (value.length > 5000) return 'Nachricht sehr lang';
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, sendCopy: e.target.checked }));
  };

  const isFormValid = (): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'sendCopy') {
        const error = validateField(key, formData[key as keyof FormData] as string);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'sendCopy') {
        allTouched[key] = true;
      }
    });
    setTouched(allTouched);

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'sendCopy') {
        const error = validateField(key, formData[key as keyof FormData] as string);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setFormState('sending');

    // Simulate API call
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        setFormState('success');
        // Auto-close after 5 seconds
        setTimeout(() => {
          onClose();
        }, 5000);
      } else {
        setFormState('error');
      }
    }, 2000);
  };

  const handleRetry = () => {
    setFormState('editing');
  };

  const handleClose = () => {
    if (formState === 'sending') return;
    onClose();
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && formState !== 'sending') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, formState]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-auto"
        style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}
      >
        {/* Success State */}
        {formState === 'success' && (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle size={48} className="text-[#4CAF50]" />
            </div>
            <h2 className="text-[#273A5F] font-bold text-[24px] mb-4">Nachricht versendet!</h2>
            <p className="text-[#666666] text-[14px] mb-6">
              Danke für deine Nachricht. Wir melden uns in Kürze bei dir.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
            >
              Schließen
            </button>
          </div>
        )}

        {/* Error State */}
        {formState === 'error' && (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <XCircle size={48} className="text-[#F44336]" />
            </div>
            <h2 className="text-[#273A5F] font-bold text-[24px] mb-4">Fehler beim Versenden</h2>
            <p className="text-[#666666] text-[14px] mb-6">
              Leider gab es ein Problem. Bitte versuche es später erneut oder kontaktiere uns direkt unter{' '}
              <a href="mailto:support@riso-app.de" className="text-[#0F429F] hover:underline">
                support@riso-app.de
              </a>
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleClose}
                className="px-8 py-3 border border-[#0F429F] text-[#0F429F] text-[14px] font-medium rounded-full hover:bg-[#F0F4FF] transition-colors"
              >
                Schließen
              </button>
              <button
                onClick={handleRetry}
                className="px-8 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
              >
                Nochmal versuchen
              </button>
            </div>
          </div>
        )}

        {/* Form State */}
        {(formState === 'editing' || formState === 'sending') && (
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-[#273A5F] font-bold text-[24px] mb-2">Kontakt zum Support</h2>
                <p className="text-[#666666] text-[14px]">Wir helfen dir gerne weiter. Schreib uns eine Nachricht.</p>
              </div>
              <button
                onClick={handleClose}
                disabled={formState === 'sending'}
                className="w-8 h-8 flex items-center justify-center text-[#666666] hover:bg-[#F0F4FF] rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                  Dein Name <span className="text-[#F44336]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={formState === 'sending'}
                  placeholder="z.B. Max Mustermann"
                  className={`w-full px-3 py-2 border rounded text-[14px] transition-all ${
                    errors.name && touched.name
                      ? 'border-[#F44336]'
                      : 'border-[#0F429F] focus:shadow-[0_0_0_3px_rgba(15,66,159,0.1)]'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{ height: '40px' }}
                />
                {errors.name && touched.name && (
                  <p className="text-[#F44336] text-[12px] mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                  Deine E-Mail <span className="text-[#F44336]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={formState === 'sending'}
                  placeholder="max@firma.de"
                  className={`w-full px-3 py-2 border rounded text-[14px] transition-all ${
                    errors.email && touched.email
                      ? 'border-[#F44336]'
                      : 'border-[#0F429F] focus:shadow-[0_0_0_3px_rgba(15,66,159,0.1)]'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{ height: '40px' }}
                />
                {errors.email && touched.email && (
                  <p className="text-[#F44336] text-[12px] mt-1">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                  Betreff <span className="text-[#F44336]">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={formState === 'sending'}
                  placeholder="Worum geht es?"
                  className={`w-full px-3 py-2 border rounded text-[14px] transition-all ${
                    errors.subject && touched.subject
                      ? 'border-[#F44336]'
                      : 'border-[#0F429F] focus:shadow-[0_0_0_3px_rgba(15,66,159,0.1)]'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{ height: '40px' }}
                />
                {errors.subject && touched.subject && (
                  <p className="text-[#F44336] text-[12px] mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                  Kategorie <span className="text-[#F44336]">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={formState === 'sending'}
                  className={`w-full px-3 py-2 border rounded text-[14px] transition-all cursor-pointer ${
                    errors.category && touched.category
                      ? 'border-[#F44336]'
                      : 'border-[#0F429F] focus:shadow-[0_0_0_3px_rgba(15,66,159,0.1)]'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{ height: '40px' }}
                >
                  <option value="">-- Bitte wählen --</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && touched.category && (
                  <p className="text-[#F44336] text-[12px] mt-1">{errors.category}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                  Nachricht <span className="text-[#F44336]">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={formState === 'sending'}
                  placeholder="Deine Nachricht..."
                  className={`w-full px-3 py-3 border rounded text-[14px] transition-all resize-y ${
                    errors.message && touched.message
                      ? 'border-[#F44336]'
                      : 'border-[#0F429F] focus:shadow-[0_0_0_3px_rgba(15,66,159,0.1)]'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{ height: '120px', minHeight: '80px' }}
                />
                {errors.message && touched.message && (
                  <p className="text-[#F44336] text-[12px] mt-1">{errors.message}</p>
                )}
              </div>

              {/* Send Copy Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sendCopy}
                    onChange={handleCheckboxChange}
                    disabled={formState === 'sending'}
                    className="w-4 h-4 disabled:opacity-50"
                  />
                  <span className="text-[#666666] text-[13px]">Kopie an meine E-Mail</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={formState === 'sending'}
                  className="px-6 py-3 border border-[#0F429F] text-[#0F429F] text-[14px] font-medium rounded-full hover:bg-[#F0F4FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={formState === 'sending' || !isFormValid()}
                  className="flex-1 px-6 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors disabled:bg-[#CCCCCC] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formState === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    'Senden'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
