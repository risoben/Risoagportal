import { ReactNode } from 'react';

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

const cellStyle = (align?: 'left' | 'center' | 'right'): React.CSSProperties => ({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: align || 'left',
});

export function Table({ columns, data, onRowClick, hoverable = true }: TableProps) {
  const templateColumns = columns.map(col => col.width || '1fr').join(' ');

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#E0E0E0]">
      {/* Table Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: templateColumns,
          alignItems: 'center',
          padding: '0 24px',
          height: '48px',
          background: '#273A5F',
          gap: 0,
        }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            className="text-white font-bold text-xs uppercase tracking-wide"
            style={cellStyle(column.align)}
          >
            {column.label}
          </div>
        ))}
      </div>

      {/* Table Body */}
      {data.map((row, index) => (
        <div
          key={row.id || index}
          onClick={() => onRowClick?.(row)}
          style={{
            display: 'grid',
            gridTemplateColumns: templateColumns,
            alignItems: 'center',
            padding: '0 24px',
            height: '56px',
            background: index % 2 === 0 ? '#ffffff' : '#F9FAFB',
            borderBottom: '1px solid #E5E7EB',
            gap: 0,
            cursor: onRowClick ? 'pointer' : 'default',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => hoverable && ((e.currentTarget as HTMLElement).style.background = '#F3F4F6')}
          onMouseLeave={e => hoverable && ((e.currentTarget as HTMLElement).style.background = index % 2 === 0 ? '#ffffff' : '#F9FAFB')}
        >
          {columns.map((column) => (
            <div
              key={column.key}
              className="text-[#000000] text-sm"
              style={cellStyle(column.align)}
            >
              {column.render
                ? column.render(row[column.key], row)
                : row[column.key]
              }
            </div>
          ))}
        </div>
      ))}

      {data.length === 0 && (
        <div className="py-8 text-center text-[#666666] text-sm">
          Keine Daten verfügbar
        </div>
      )}
    </div>
  );
}

export function TableCell({ children, align = 'left', truncate = false, tooltip }: {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  tooltip?: string;
}) {
  return (
    <div
      className={`text-[#333333] text-[12px] ${truncate ? 'truncate' : ''}`}
      style={{ textAlign: align }}
      title={tooltip}
    >
      {children}
    </div>
  );
}

export function StatusBadge({ status, type = 'success' }: {
  status: string;
  type?: 'success' | 'error' | 'warning' | 'info' | 'inactive' | 'pending';
}) {
  const colors = {
    success:  { bg: '#E8F5E9', text: '#4CAF50' },
    error:    { bg: '#FFEBEE', text: '#F44336' },
    warning:  { bg: '#FFF3E0', text: '#FF9800' },
    info:     { bg: '#E3F2FD', text: '#2196F3' },
    inactive: { bg: '#F5F5F5', text: '#9E9E9E' },
    pending:  { bg: '#FFF8E1', text: '#FBC02D' },
  };
  const color = colors[type];

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap"
      style={{ backgroundColor: color.bg, color: color.text, width: 'fit-content' }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.text }} />
      {status}
    </span>
  );
}

export function CurrencyCell({ amount, align = 'left' }: { amount: number; align?: 'left' | 'center' | 'right' }) {
  const formatted = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount) + '€';

  return (
    <div className="text-[#000000] text-sm" style={{ textAlign: align }}>
      {formatted}
    </div>
  );
}

export function DateCell({ date, align = 'left' }: { date: string; align?: 'left' | 'center' | 'right' }) {
  return (
    <div className="text-[#000000] text-sm" style={{ textAlign: align }}>
      {date}
    </div>
  );
}
