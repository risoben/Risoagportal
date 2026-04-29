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

export function Table({ columns, data, onRowClick, hoverable = true }: TableProps) {
  return (
    <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
      {/* Table Header */}
      <div
        className="bg-[#F0F4FF] grid border-b border-[#E0E0E0] h-10 items-center px-4"
        style={{
          gridTemplateColumns: columns.map(col => col.width || '1fr').join(' '),
          fontFamily: 'Roboto, sans-serif'
        }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            className="text-[#666666] text-[11px] font-medium uppercase tracking-wide"
            style={{
              textAlign: column.align || 'left',
              letterSpacing: '0.5px'
            }}
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
          className={`
            grid items-center px-4 h-10 border-b border-[#F0F0F0] last:border-b-0
            ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}
            ${hoverable ? 'hover:bg-[#F0F4FF] cursor-pointer' : ''}
            transition-colors duration-200
          `}
          style={{
            gridTemplateColumns: columns.map(col => col.width || '1fr').join(' '),
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          {columns.map((column) => (
            <div
              key={column.key}
              className="text-[#333333] text-[12px]"
              style={{
                textAlign: column.align || 'left'
              }}
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
        <div className="py-8 text-center text-[#666666] text-[14px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Keine Daten verfügbar
        </div>
      )}
    </div>
  );
}

interface TableCellProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  tooltip?: string;
}

export function TableCell({ children, align = 'left', truncate = false, tooltip }: TableCellProps) {
  return (
    <div
      className={`text-[#333333] text-[12px] ${truncate ? 'truncate' : ''}`}
      style={{
        textAlign: align,
        fontFamily: 'Roboto, sans-serif'
      }}
      title={tooltip}
    >
      {children}
    </div>
  );
}

export function StatusBadge({ status, type = 'success' }: { status: string; type?: 'success' | 'error' | 'warning' | 'info' }) {
  const colors = {
    success: { bg: '#E8F5E9', text: '#4CAF50' },
    error: { bg: '#FFEBEE', text: '#F44336' },
    warning: { bg: '#FFF3E0', text: '#FF9800' },
    info: { bg: '#E3F2FD', text: '#2196F3' }
  };

  const color = colors[type];

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium"
      style={{
        backgroundColor: color.bg,
        color: color.text,
        fontFamily: 'Roboto, sans-serif'
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.text }} />
      {status}
    </span>
  );
}

export function CurrencyCell({ amount, align = 'right' }: { amount: number; align?: 'left' | 'center' | 'right' }) {
  const formatted = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount) + '€';

  return (
    <div className="text-[#333333] text-[12px]" style={{ textAlign: align, fontFamily: 'Roboto, sans-serif' }}>
      {formatted}
    </div>
  );
}

export function DateCell({ date, align = 'left' }: { date: string; align?: 'left' | 'center' | 'right' }) {
  return (
    <div className="text-[#333333] text-[12px]" style={{ textAlign: align, fontFamily: 'Roboto, sans-serif' }}>
      {date}
    </div>
  );
}
