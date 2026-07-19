import { useMemo } from 'react'

export function Panel({ className = '', children, ...rest }) {
  return (
    <section className={`panel ${className}`} {...rest}>
      {children}
    </section>
  )
}

export function Eyebrow({ children, className = '' }) {
  return <div className={`eyebrow ${className}`}>{children}</div>
}

export function Stat({ label, value, sub, tone = 'ink' }) {
  const toneClass = {
    ink: 'text-ink',
    sage: 'text-sage-600',
    terra: 'text-terra-500',
  }[tone]
  return (
    <div className="flex flex-col gap-1">
      <span className="eyebrow">{label}</span>
      <span className={`font-serif text-3xl tracking-tightest ${toneClass}`}>{value}</span>
      {sub && <span className="text-xs text-ink-muted">{sub}</span>}
    </div>
  )
}

export function Chip({ tone = 'neutral', children, className = '' }) {
  const tones = {
    neutral: 'bg-chalk text-ink-soft border border-line',
    sage: 'bg-sage-50 text-sage-700 border border-sage-200',
    terra: 'bg-terra-50 text-terra-600 border border-terra-100',
    ink: 'bg-ink text-canvas',
  }
  return <span className={`chip ${tones[tone]} ${className}`}>{children}</span>
}

export function Dot({ tone = 'sage', className = '' }) {
  const tones = {
    sage: 'bg-sage-500',
    terra: 'bg-terra-400',
    ink: 'bg-ink',
    muted: 'bg-ink-faint',
  }
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${tones[tone]} ${className}`} />
}

export function Sparkline({ data, width = 120, height = 28, stroke = '#4A6B5D', fill = 'rgba(74,107,93,0.12)' }) {
  const { path, area, last } = useMemo(() => {
    if (!data || data.length === 0) return { path: '', area: '', last: null }
    const max = Math.max(...data), min = Math.min(...data)
    const range = max - min || 1
    const stepX = width / (data.length - 1)
    const pts = data.map((v, i) => [i * stepX, height - ((v - min) / range) * (height - 4) - 2])
    const p = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt[0].toFixed(1)},${pt[1].toFixed(1)}`).join(' ')
    const a = `${p} L${width},${height} L0,${height} Z`
    return { path: p, area: a, last: pts[pts.length - 1] }
  }, [data, width, height])

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {last && <circle cx={last[0]} cy={last[1]} r="2.4" fill={stroke} />}
    </svg>
  )
}

export function Donut({ value, size = 96, stroke = 10, color = '#4A6B5D', track = '#E9E7E1', label }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c * (1 - Math.min(1, Math.max(0, value)))
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-xl tracking-tightest text-ink">{Math.round(value * 100)}%</span>
        {label && <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">{label}</span>}
      </div>
    </div>
  )
}

export function Drawer({ open, onClose, title, subtitle, children, footer }) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-ink/20 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-canvas border-l border-line shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-line">
          <div>
            <div className="eyebrow mb-1">Action Drawer</div>
            <h3 className="font-serif text-2xl tracking-tightest text-ink">{title}</h3>
            {subtitle && <p className="text-sm text-ink-muted mt-1">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="btn-ghost" aria-label="Close">Close</button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <footer className="px-6 py-4 border-t border-line bg-chalk/40">{footer}</footer>}
      </aside>
    </div>
  )
}

export function Modal({ open, onClose, title, subtitle, children, footer, wide = false }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-ink/25 backdrop-blur-[2px] transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute inset-0 flex items-center justify-center p-6`}>
        <div
          className={`relative bg-canvas border border-line rounded-2xl shadow-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          <header className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-line">
            <div>
              <div className="eyebrow mb-1">Modal</div>
              <h3 className="font-serif text-2xl tracking-tightest text-ink">{title}</h3>
              {subtitle && <p className="text-sm text-ink-muted mt-1">{subtitle}</p>}
            </div>
            <button onClick={onClose} className="btn-ghost">Close</button>
          </header>
          <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">{children}</div>
          {footer && <footer className="px-6 py-4 border-t border-line bg-chalk/40 rounded-b-2xl">{footer}</footer>}
        </div>
      </div>
    </div>
  )
}

export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="text-xs text-ink-muted mt-1 block">{hint}</span>}
    </label>
  )
}
