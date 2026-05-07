import { useState } from 'react';
import { X, Search, ExternalLink } from 'lucide-react';

interface HelpPanelProps {
  onClose: () => void;
}

const popularArticles = [
  { id: 1, title: 'Massenimport: Schritt für Schritt', url: '#' },
  { id: 2, title: 'Benefits erklären', url: '#' },
  { id: 3, title: 'Berichte konfigurieren', url: '#' },
  { id: 4, title: 'Fehlerbehandlung', url: '#' },
];

export function HelpPanel({ onClose }: HelpPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showTicketModal, setShowTicketModal] = useState(false);

  return (
    <>
      {/* Help Panel */}
      <div className="fixed right-0 top-0 bg-white shadow-2xl z-40"
        style={{ width: '400px', height: '600px', fontFamily: 'Roboto, sans-serif' }}
      >
        {/* Header */}
        <div className="bg-[#273A5F] h-12 flex items-center justify-between px-4">
          <h2 className="text-white font-bold text-sm">Riso Help Center</h2>
          <button
            onClick={onClose} className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Field */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-10 pl-10 pr-4 bg-white border border-[#0F429F] rounded text-sm text-[#273A5F] focus:outline-none focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20"
            />
          </div>
        </div>

        {/* Popular Articles Section */}
        <div className="px-4 pb-4">
          <h3 className="text-[#273A5F] font-medium text-sm mb-3">Beliebte Artikel:</h3>
          <div className="space-y-4">
            {popularArticles.map((article) => (
              <a
                key={article.id}
                href={article.url} className="flex items-start gap-2 text-[#0F429F] text-sm hover:underline transition-all group"
              >
                <span className="mt-1">•</span>
                <span className="flex-1">{article.title}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 my-6 h-px bg-[#E5E7EB]"></div>

        {/* Contact Section */}
        <div className="px-4">
          <button
            onClick={() => setShowTicketModal(true)} className="w-full h-10 bg-[#0F429F] text-white font-medium text-sm rounded-full hover:bg-[#0d3680] transition-colors mb-3"
          >
            Ticket schreiben
          </button>
          <p className="text-[#6B7280] text-xs text-center leading-relaxed">
            Hast du ein Problem? Schreibe uns eine Nachricht und wir helfen dir weiter.
          </p>
        </div>
      </div>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-30"
        onClick={onClose}
      ></div>

      {/* Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl"
            style={{ width: '500px', maxWidth: '90%', fontFamily: 'Roboto, sans-serif' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-[#273A5F] font-bold text-lg">Support-Ticket erstellen</h2>
              <button
                onClick={() => setShowTicketModal(false)} className="text-[#6B7280] hover:text-[#273A5F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 space-y-4">
              {/* Subject Field */}
              <div>
                <label className="block text-[#273A5F] text-sm font-medium mb-2">
                  Betreff
                </label>
                <input
                  type="text"
                  placeholder="Kurze Beschreibung des Problems..." className="w-full h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#273A5F] focus:outline-none focus:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20"
                />
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-[#273A5F] text-sm font-medium mb-2">
                  Kategorie
                </label>
                <select className="w-full h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#273A5F] focus:outline-none focus:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20">
                  <option>CSV Import</option>
                  <option>Budget Management</option>
                  <option>Employee Management</option>
                  <option>Berichte</option>
                  <option>Sonstiges</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-[#273A5F] text-sm font-medium mb-2">
                  Nachricht
                </label>
                <textarea
                  placeholder="Beschreibe dein Problem ausführlich..."
                  rows={6} className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#273A5F] focus:outline-none focus:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 px-6 py-4 border-t border-[#E5E7EB]">
              <button
                onClick={() => setShowTicketModal(false)} className="h-10 px-6 rounded-full font-medium text-sm bg-white border border-[#E5E7EB] text-[#273A5F] hover:bg-gray-50 transition-all"
              >
                Abbrechen
              </button>
              <button
                onClick={() => {
                  setShowTicketModal(false);
                  onClose();
                }} className="h-10 px-6 rounded-full font-medium text-sm bg-[#0F429F] text-white hover:bg-[#0d3680] transition-all"
              >
                Ticket senden
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
