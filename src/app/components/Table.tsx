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

const H = '48px';
const R = '56px';
const cell: React.CSSProperties = { overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 24px' };

export function Table({ columns, data, onRowClick, hoverable = true }: TableProps) {
  const cols = columns.map(c => `minmax(0,${c.width || '1fr'})`).join(' ');

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#E0E0E0]">
      {/* Single grid — header + all rows share the same columns */}
      <div style={{ display: 'grid', gridTemplateColumns: cols, minWidth: '500px' }}>
        {/* Header cells */}
        {columns.map((col) => (
          <div key={col.key} style={{ ...cell, background: '#273A5F', height: H }}>
            <span className="text-white font-bold text-xs uppercase tracking-wide" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {col.label}
            </span>
          </div>
        ))}

        {/* Body cells */}
        {data.map((row, i) => {
          const bg = i % 2 === 0 ? '#ffffff' : '#F9FAFB';
          const border = '1px solid #E5E7EB';
          return (
            <React.Fragment key={row.id ?? i}>
              {columns.map((col) => (
                <div
                  key={col.key}
                  onClick={() => onRowClick?.(row)}
                  style={{ ...cell, height: R, background: bg, borderBottom: border, cursor: onRowClick ? 'pointer' : 'default' }}
                  onMouseEnter={e => hoverable && ((e.currentTarget as HTMLElement).style.background = '#F3F4F6')}
                  onMouseLeave={e => hoverable && ((e.currentTarget as HTMLElement).style.background = bg)}
                >
                  <span className="text-[#000000] text-sm" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </span>
                </div>
              ))}
            </React.Fragment>
          );
        })}

        {data.length === 0 && (
          <div style={{ gridColumn: `1 / -1`, padding: '32px', textAlign: 'center', color: '#666666', fontSize: '14px' }}>
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
  return <div className="text-[#000000] text-sm" style={{ textAlign: align }}>{formatted}</div>;
}

export function DateCell({ date, align = 'left' }: { date: string; align?: 'left' | 'center' | 'right' }) {
  return <div className="text-[#000000] text-sm" style={{ textAlign: align }}>{date}</div>;
}
