import { useState, useEffect } from 'react';
import logo from '/Riso_Blue_Logo.svg';

interface PasswordProtectProps {
  children: React.ReactNode;
}

export function PasswordProtect({ children }: PasswordProtectProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already authenticated
    const stored = localStorage.getItem('ag-portal-auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Philipp2026') {
      setIsAuthenticated(true);
      localStorage.setItem('ag-portal-auth', 'true');
      setError('');
    } else {
      setError('Passwort falsch');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F429F] to-[#1a5bc4] flex items-center justify-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="bg-white rounded-xl shadow-2xl p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="Riso" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#273A5F]">AG-Portal</h1>
          <p className="text-[#666666] text-sm mt-2">Geschützter Zugriff</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#273A5F] font-semibold mb-2 text-sm">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Gib das Passwort ein"
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F429F] focus:border-transparent"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#0F429F] text-white font-semibold py-3 rounded-lg hover:bg-[#0a2e6f] transition-colors"
          >
            Zugriff
          </button>
        </form>

        <p className="text-center text-[#999999] text-xs mt-6">
          Dieser Bereich ist nur für autorisierte Benutzer zugänglich.
        </p>
      </div>
    </div>
  );
}
