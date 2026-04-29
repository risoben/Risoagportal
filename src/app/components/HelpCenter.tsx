import { useState } from 'react';
import { Search, FileText, Rocket, BarChart3, Smartphone, Gift, Info, ArrowLeft } from 'lucide-react';

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBackToPortal = () => {
    // Navigate back to dashboard
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'dashboard' } }));
  };

  const categories = [
    {
      id: 1,
      icon: <FileText size={32} className="text-[#0F429F]" />,
      title: 'Über Riso',
      description: 'Alles Wissenswerte über Riso, unsere Mission und Werte',
      articleCount: 4,
    },
    {
      id: 2,
      icon: <Rocket size={32} className="text-[#0F429F]" />,
      title: 'Riso - Erste Schritte',
      description: 'Schnelle Einführung für Arbeitgeber und Arbeitnehmer',
      articleCount: 6,
    },
    {
      id: 3,
      icon: <BarChart3 size={32} className="text-[#0F429F]" />,
      title: 'Berichte, Rechtliches, Lohn & Steuerberatung',
      description: 'Reports erstellen, rechtliche Informationen und Steuerberatung',
      articleCount: 5,
    },
    {
      id: 4,
      icon: <Smartphone size={32} className="text-[#0F429F]" />,
      title: 'Riso - App',
      description: 'Anleitungen und FAQs zur Riso Mobile App',
      articleCount: 3,
    },
    {
      id: 5,
      icon: <Gift size={32} className="text-[#0F429F]" />,
      title: 'Riso - Benefits',
      description: 'Detaillierte Informationen zu allen Riso Benefits und Zuschüssen',
      articleCount: 18,
    },
  ];

  const popularArticles = [
    {
      id: 1,
      title: 'Erholungsbeihilfe - Nutzungsbedingungen',
      category: 'Über Erholung',
    },
    {
      id: 2,
      title: 'Essenszuschuss einrichten',
      category: 'Benefits',
    },
    {
      id: 3,
      title: 'Berichte exportieren',
      category: 'Reports',
    },
    {
      id: 4,
      title: 'Mitarbeiter hinzufügen',
      category: 'Erste Schritte',
    },
    {
      id: 5,
      title: 'Standorte verwalten',
      category: 'Verwaltung',
    },
    {
      id: 6,
      title: 'Mobile App einrichten',
      category: 'Riso App',
    },
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleOpenContact = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'kontakt' } }));
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header / Navigation */}
      <header className="h-16 bg-white border-b border-[#E0E0E0] px-8 flex items-center justify-between">
        {/* Riso Logo - 24x24px for Help Center */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
          <div className="w-6 h-6 flex items-center justify-center rounded bg-[#0F429F]">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-lg text-[#0F429F]">Riso</span>
        </div>

        <nav className="flex items-center gap-8">
          <a href="#" className="text-[13px] text-[#666666] hover:text-[#0F429F] cursor-pointer transition">
            Startseite
          </a>
          <a href="#" className="text-[13px] text-[#0F429F] underline cursor-pointer">
            Wissensdatenbank
          </a>
          <a href="#" className="text-[13px] text-[#666666] hover:text-[#0F429F] cursor-pointer transition">
            Anmelden
          </a>
          <a href="#" className="text-[13px] text-[#666666] hover:text-[#0F429F] cursor-pointer transition">
            Registrieren
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToPortal}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#0F429F] border border-[#0F429F] rounded-md bg-transparent hover:bg-[#F0F4FF] hover:border-2 hover:border-[#0F429F] transition cursor-pointer"
          >
            <ArrowLeft size={14} className="text-[#0F429F]" />
            Zurück zum Arbeitgeberportal
          </button>
          <Info size={24} className="text-[#0F429F] cursor-help" />
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="h-[400px] px-8 py-16 flex flex-col items-center justify-center gap-6"
        style={{
          background: 'linear-gradient(135deg, #0F429F 0%, #246AFF 100%)',
        }}
      >
        <h1 className="text-5xl font-bold text-white text-center leading-tight">
          Willkommen beim Riso Help Center
        </h1>
        <p className="text-base text-white opacity-95 text-center mb-6">
          Suche nach Antworten, stöbere in der Wissensdatenbank oder erstelle ein Ticket.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-full p-1 flex items-center gap-2 w-full max-w-[600px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Im Help Center suchen..."
            className="flex-1 px-5 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-transparent border-none outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-[#0F429F] text-white text-[13px] font-medium rounded-full hover:bg-[#246AFF] transition cursor-pointer"
          >
            Suchen
          </button>
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        {/* Section A: Kategorien Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-[#E0E0E0] rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="mb-4">{category.icon}</div>
              <h3 className="text-base font-bold text-[#273A5F] mb-2">{category.title}</h3>
              <p className="text-[13px] text-[#666666] leading-relaxed mb-4">
                {category.description}
              </p>
              <a href="#" className="text-[13px] font-medium text-[#0F429F] hover:underline">
                Mehr erfahren →
              </a>
              <div className="mt-4 pt-4 border-t border-[#E0E0E0]">
                <span className="text-[11px] text-[#999999]">{category.articleCount} Artikel</span>
              </div>
            </div>
          ))}
        </div>

        {/* Section B: Beliebte Artikel */}
        <div className="mb-16">
          <h2 className="text-lg font-bold text-[#273A5F] mb-6">Beliebte Artikel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-[#E0E0E0] rounded-lg p-4 hover:border-[#0F429F] hover:border-2 hover:shadow-sm transition cursor-pointer"
              >
                <FileText size={16} className="text-[#0F429F] mb-2" />
                <h4 className="text-[13px] text-[#333333] leading-snug hover:text-[#0F429F] transition">
                  {article.title}
                </h4>
                <div className="mt-2 pt-2 border-t border-[#E0E0E0]">
                  <span className="text-[11px] text-[#999999]">in {article.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section C: Call-to-Action - Contact */}
        <div className="bg-[#F0F4FF] rounded-xl p-10 text-center mb-16">
          <h2 className="text-lg font-bold text-[#273A5F] mb-3">
            Frage nicht beantwortet?
          </h2>
          <p className="text-sm text-[#666666] mb-6">
            Schreib uns direkt!
          </p>
          <button
            onClick={handleOpenContact}
            className="px-8 py-3 bg-[#0F429F] text-white text-sm font-medium rounded-full hover:bg-[#246AFF] transition cursor-pointer"
          >
            Kontakt aufnehmen
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#273A5F] text-white px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Company Links */}
            <div>
              <h4 className="text-sm font-bold mb-4">Riso</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[13px] opacity-80 hover:opacity-100 cursor-pointer transition">
                    Startseite
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[13px] opacity-80 hover:opacity-100 cursor-pointer transition">
                    Wissensdatenbank
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleOpenContact}
                    className="text-[13px] opacity-80 hover:opacity-100 cursor-pointer transition text-left"
                  >
                    Kontakt
                  </button>
                </li>
                <li>
                  <a href="#" className="text-[13px] opacity-80 hover:opacity-100 cursor-pointer transition">
                    Mein Bereich
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Legal */}
            <div>
              <h4 className="text-sm font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[13px] opacity-80 hover:opacity-100 cursor-pointer transition">
                    Datenschutz
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[13px] opacity-80 hover:opacity-100 cursor-pointer transition">
                    Impressum
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleOpenContact}
                    className="text-[13px] opacity-80 hover:opacity-100 cursor-pointer transition text-left"
                  >
                    Kontakt
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Business */}
            <div>
              <h4 className="text-sm font-bold mb-4">Business</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[13px] opacity-80 hover:opacity-100 cursor-pointer transition">
                    riso-app.de
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-sm font-bold mb-4">Support</h4>
              <div className="space-y-2">
                <p className="text-xs opacity-80">E-Mail: support@risoapp.zohodesk.eu</p>
                <p className="text-xs opacity-80">Telefon: +496223 969696 58</p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 mt-8 border-t border-white border-opacity-20 text-center">
            <p className="text-[11px] opacity-60">© Riso • Powered by Zoho Desk</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
