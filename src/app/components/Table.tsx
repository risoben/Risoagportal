import React, { ReactNode } from 'react';

interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  render?: (value: any, row: any) => ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  hoverable?: boolean;
}

/** Convert a column width to a grid track.
 *  px values → minmax(Xpx, 1fr) so the column has a minimum but can grow.
 *  fr / other → used as-is (already a proportional track). */
function track(w?: string): string {
  if (!w) return '1fr';
  if (w.endsWith('px')) return `minmax(${w}, 1fr)`;
  return w;
}

export function Table({ columns, data, onRowClick, hoverable = true }: TableProps) {
  const gridCols = columns.map(c => track(c.width)).join(' ');
  const baseCell: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#E0E0E0]">
      <div style={{ display: 'grid', gridTemplateColumns: gridCols, minWidth: '400px' }}>

        {/* Header row */}
        {columns.map((col) => (
          <div
            key={col.key}
            style={{ ...baseCell, background: '#273A5F', height: '48px', justifyContent: col.align === 'center' ? 'center' : 'flex-start' }}
          >
            <span className="text-white font-bold text-xs uppercase tracking-wide truncate">
              {col.label}
            </span>
          </div>
        ))}

        {/* Body rows */}
        {data.map((row, i) => {
          const bg = i % 2 === 0 ? '#ffffff' : '#F9FAFB';
          const border = '1px solid #E5E7EB';
          return (
            <React.Fragment key={row.id ?? i}>
              {columns.map((col) => (
                <div
                  key={col.key}
                  onClick={() => onRowClick?.(row)}
                  style={{
                    ...baseCell,
                    height: '56px',
                    background: bg,
                    borderBottom: border,
                    cursor: onRowClick ? 'pointer' : 'default',
                    justifyContent: col.align === 'center' ? 'center' : 'flex-start',
                  }}
                  onMouseEnter={e => hoverable && ((e.currentTarget as HTMLElement).style.background = '#F3F4F6')}
                  onMouseLeave={e => hoverable && ((e.currentTarget as HTMLElement).style.background = bg)}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : <span className="text-[#000000] text-sm truncate">{row[col.key]}</span>
                  }
                </div>
              ))}
            </React.Fragment>
          );
        })}

        {data.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '32px', textAlign: 'center', color: '#666666', fontSize: '14px' }}>
            Keine Daten verfügbar
          </div>
        )}
      </div>
    </div>
  );
}

export function TableCell({ children, align = 'left', truncate = false, tooltip }: {
  children: ReactNode; align?: 'left' | 'center' | 'right'; truncate?: boolean; tooltip?: string;
}) {
  return (
    <div className={`text-[#333333] text-[12px] ${truncate ? 'truncate' : ''}`} style={{ textAlign: align }} title={tooltip}>
      {children}
    </div>
  );
}

export function StatusBadge({ status, type = 'success' }: {
  status: string; type?: 'success' | 'error' | 'warning' | 'info' | 'inactive' | 'pending';
}) {
  const colors = {
    success:  { bg: '#E8F5E9', text: '#4CAF50' },
    error:    { bg: '#FFEBEE', text: '#F44336' },
    warning:  { bg: '#FFF3E0', text: '#FF9800' },
    info:     { bg: '#E3F2FD', text: '#2196F3' },
    inactive: { bg: '#F5F5F5', text: '#9E9E9E' },
    pending:  { bg: '#FFF8E1', text: '#FBC02D' },
  };
  const c = colors[type];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap"
      style={{ backgroundColor: c.bg, color: c.text, width: 'fit-content' }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.text }} />
      {status}
    </span>
  );
}

export function CurrencyCell({ amount, align = 'left' }: { amount: number; align?: 'left' | 'center' | 'right' }) {
  const formatted = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount) + '€';
  return <span className="text-[#000000] text-sm" style={{ textAlign: align }}>{formatted}</span>;
}

export function DateCell({ date, align = 'left' }: { date: string; align?: 'left' | 'center' | 'right' }) {
  return <span className="text-[#000000] text-sm" style={{ textAlign: align }}>{date}</span>;
}
