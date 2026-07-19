/* eslint-disable react/prop-types */
const NAV = [
  { id: 'hub', label: 'Hub Dashboard', sub: 'The Overview', glyph: '01' },
  { id: 'attendance', label: 'Frictionless Attendance', sub: 'Roster & Decay', glyph: '02' },
  { id: 'marks', label: 'Marks & Outcome Analytics', sub: 'Gradebook & Recovery', glyph: '03' },
  { id: 'schedule', label: 'Conflict-Free Schedule', sub: 'Weekly Grid', glyph: '04' },
  { id: 'students', label: 'Academic Students', sub: 'Student Records', glyph: '05' },
  { id: 'staff', label: 'Academic Staff', sub: 'Faculty Records', glyph: '06' },
]

const getVisibleNav = (account) => account?.role === 'admin' ? NAV : NAV.slice(0, 1)

export default function Sidebar({ active, onChange, account, onLogout }) {
  const visibleNav = getVisibleNav(account)
  return <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-line bg-canvas/80 backdrop-blur-sm h-screen sticky top-0">
    <div className="px-7 pt-8 pb-6 border-b border-line"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-md bg-sage-500 grid place-items-center"><span className="font-serif text-canvas text-sm">S</span></div><div><div className="font-serif text-lg tracking-tightest text-ink leading-none">ShikshaSetu</div><div className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mt-1">Student Growth Engine</div></div></div></div>
    <nav className="flex-1 px-4 py-6 space-y-1.5"><div className="eyebrow px-3 mb-2">Modules</div>{visibleNav.map((item) => <button key={item.id} onClick={() => onChange(item.id)} className={`group w-full text-left rounded-xl px-3 py-2.5 transition-all ${active === item.id ? 'bg-ink text-canvas' : 'hover:bg-chalk text-ink-soft'}`}><div className="flex items-baseline gap-3"><span className={`font-mono text-[10px] ${active === item.id ? 'text-canvas/60' : 'text-ink-faint'}`}>{item.glyph}</span><div className="flex-1"><div className={`text-sm font-medium ${active === item.id ? 'text-canvas' : 'text-ink'}`}>{item.label}</div><div className={`text-[11px] tracking-wide ${active === item.id ? 'text-canvas/60' : 'text-ink-muted'}`}>{item.sub}</div></div></div></button>)}</nav>
    <div className="px-5 py-5 border-t border-line"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-terra-400 text-canvas grid place-items-center font-serif text-sm">{account.name?.slice(0, 1).toUpperCase()}</div><div className="min-w-0"><div className="text-sm font-medium text-ink truncate">{account.name}</div><div className="text-[11px] text-ink-muted truncate">{account.role === 'admin' ? 'Administrator · Full access' : 'Member · Overview access'}</div></div></div><button onClick={onLogout} className="mt-4 text-xs text-ink-muted hover:text-terra-500">Sign out</button></div>
  </aside>
}

export function MobileNav({ active, onChange, account, onLogout }) {
  return <div className="lg:hidden sticky top-0 z-30 bg-canvas/90 backdrop-blur border-b border-line"><div className="flex items-center justify-between px-4 py-3"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md bg-sage-500 grid place-items-center"><span className="font-serif text-canvas text-xs">S</span></div><span className="font-serif text-base tracking-tightest">ShikshaSetu</span></div><label className="flex flex-col gap-0.5 text-right"><span className="text-[9px] uppercase tracking-[0.14em] text-sage-700 font-semibold">Go to page</span><select value={active} onChange={(e) => onChange(e.target.value)} className="input-clean text-sm border-2 border-sage-300 bg-sage-50 font-medium text-ink focus:border-sage-600" aria-label="Go to page">{getVisibleNav(account).map((n) => <option key={n.id} value={n.id}>{n.glyph} — {n.label}</option>)}</select></label></div><button onClick={onLogout} className="px-4 pb-2 text-xs text-ink-muted">Sign out</button></div>
}
