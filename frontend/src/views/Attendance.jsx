import { useMemo, useState, useReducer } from 'react'
import { students, attendanceLog, geoFlagLog, riskLabels } from '../data/mockData'
import { Panel, Eyebrow, Stat, Chip, Dot, Drawer, Field } from '../components/ui/Primitives'

const STATUS_TONE = {
  present: 'sage',
  excused: 'neutral',
  tardy: 'terra',
  unexcused: 'terra',
}

function statusReducer(state, action) {
  switch (action.type) {
    case 'set':
      return { ...state, [`${action.studentId}:${action.date}`]: action.status }
    default:
      return state
  }
}

function RosterTable({ overrides, dispatch }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const rows = useMemo(() => {
    return students.map((s) => {
      const log = attendanceLog.find((l) => l.studentId === s.id) || { status: 'present', tardy: 0, date: '2026-07-19' }
      const status = overrides[`${s.id}:${log.date}`] || log.status
      return { ...s, status, tardy: log.tardy, date: log.date }
    }).filter((r) => {
      const q = r.name.toLowerCase() + ' ' + r.program.toLowerCase()
      const matchesQuery = !query || q.includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [overrides, query, statusFilter])

  const counts = useMemo(() => {
    const c = { present: 0, excused: 0, tardy: 0, unexcused: 0 }
    students.forEach((s) => {
      const log = attendanceLog.find((l) => l.studentId === s.id)
      const status = overrides[`${s.id}:${log?.date}`] || log?.status || 'present'
      c[status] = (c[status] || 0) + 1
    })
    return c
  }, [overrides])

  const setStatus = (row, status) => dispatch({ type: 'set', studentId: row.id, date: row.date, status })

  return (
    <Panel className="p-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
        <div>
          <Eyebrow>Module 02 · Roster</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Deep-Dive Roster</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Interactive attendance ledger. Toggle status inline; minutes tardy auto-aggregates per scholar.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scholar or program…"
            className="input-clean w-56"
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-clean">
            <option value="all">All statuses</option>
            <option value="present">Present</option>
            <option value="excused">Excused</option>
            <option value="tardy">Tardy</option>
            <option value="unexcused">Unexcused</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {Object.entries(counts).map(([k, v]) => (
          <div key={k} className="rounded-xl border border-line p-3 flex items-center justify-between">
            <div>
              <div className="eyebrow capitalize">{k}</div>
              <div className="font-serif text-2xl tracking-tightest text-ink">{v}</div>
            </div>
            <Dot tone={STATUS_TONE[k]} className="w-2.5 h-2.5" />
          </div>
        ))}
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.16em] text-ink-muted border-b border-line">
              <th className="px-2 py-2 font-medium">#</th>
              <th className="px-2 py-2 font-medium">Scholar</th>
              <th className="px-2 py-2 font-medium">Program</th>
              <th className="px-2 py-2 font-medium">Status</th>
              <th className="px-2 py-2 font-medium text-right">Min Tardy</th>
              <th className="px-2 py-2 font-medium text-right">14-Day %</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="row-hover border-b border-line/60">
                <td className="px-2 py-2.5 font-mono text-[11px] text-ink-faint">{String(i + 1).padStart(2, '0')}</td>
                <td className="px-2 py-2.5">
                  <div className="font-medium text-ink">{r.name}</div>
                  <div className="text-[11px] text-ink-muted font-mono">#{r.id.toUpperCase()}</div>
                </td>
                <td className="px-2 py-2.5 text-ink-soft">{r.program}</td>
                <td className="px-2 py-2.5">
                  <div className="inline-flex rounded-lg border border-line overflow-hidden text-[11px]">
                    {['present', 'excused', 'tardy', 'unexcused'].map((st) => {
                      const on = r.status === st
                      const tone = STATUS_TONE[st]
                      const activeCls = tone === 'terra' ? 'bg-terra-400 text-canvas' : tone === 'sage' ? 'bg-sage-500 text-canvas' : 'bg-ink text-canvas'
                      return (
                        <button
                          key={st}
                          onClick={() => setStatus(r, st)}
                          className={`px-2 py-1 capitalize transition ${on ? activeCls : 'bg-white text-ink-muted hover:bg-chalk'}`}
                        >
                          {st}
                        </button>
                      )
                    })}
                  </div>
                </td>
                <td className="px-2 py-2.5 text-right font-mono text-ink-soft">{r.tardy}</td>
                <td className="px-2 py-2.5 text-right">
                  <span className={`font-mono ${r.attendance < 0.85 ? 'text-terra-500' : 'text-ink'}`}>
                    {(r.attendance * 100).toFixed(0)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

function DecayAlerts({ onCheckIn }) {
  const decay = useMemo(
    () => students.filter((s) => s.attendance < 0.85).sort((a, b) => a.attendance - b.attendance),
    []
  )
  return (
    <Panel className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <Eyebrow>Module 02 · Decay</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Attendance Decay Alerts</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Scholars tracking under 85% across the last 14 days. Each opens an Academic Check-in drawer.
          </p>
        </div>
        <Chip tone="terra"><Dot tone="terra" /> {decay.length} flagged</Chip>
      </div>

      <ul className="divide-y divide-line/60">
        {decay.map((s) => (
          <li key={s.id} className="py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-terra-50 text-terra-600 grid place-items-center font-serif text-sm">
                {s.name.split(' ').map((w) => w[0]).join('')}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-ink truncate">{s.name}</div>
                <div className="text-[11px] text-ink-muted truncate">{s.program} · {s.minutesTardy} min tardy · last check-in {s.lastCheckIn}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className="font-mono text-sm text-terra-500">{(s.attendance * 100).toFixed(0)}%</div>
                <div className="eyebrow text-[9px]">14-day</div>
              </div>
              <button onClick={() => onCheckIn(s)} className="btn-terra text-xs">Academic Check-in</button>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function GeoProxySim() {
  const [expanded, setExpanded] = useState(null)
  return (
    <Panel className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <Eyebrow>Module 02 · Integrity</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Geo-Proxy Detection</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Simulated fraud-prevention layer. Flags consecutive check-in timestamps with improbable IP / subnet transitions.
          </p>
        </div>
        <Chip tone="terra"><Dot tone="terra" /> {geoFlagLog.length} signals</Chip>
      </div>

      <div className="space-y-2">
        {geoFlagLog.map((g, i) => {
          const s = students.find((st) => st.id === g.studentId)
          const open = expanded === i
          return (
            <div key={i} className="rounded-xl border border-line overflow-hidden">
              <button
                onClick={() => setExpanded(open ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-chalk/40 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Dot tone="terra" className="w-2 h-2" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink truncate">{s?.name}</div>
                    <div className="text-[11px] text-ink-muted font-mono">
                      {g.date} · {g.time} · {g.location} · gap {g.gap}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Chip tone="terra" className="text-[10px]">{g.ip}</Chip>
                  <span className="text-ink-faint text-xs">{open ? '−' : '+'}</span>
                </div>
              </button>
              {open && (
                <div className="px-4 py-3 border-t border-line bg-chalk/40 text-sm text-ink-soft">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
                    <div><div className="eyebrow text-[9px]">Current IP</div><div className="font-mono text-ink">{g.ip}</div></div>
                    <div><div className="eyebrow text-[9px]">Prior IP</div><div className="font-mono text-ink">{g.prevIp}</div></div>
                    <div><div className="eyebrow text-[9px]">Inter-check Gap</div><div className="font-mono text-ink">{g.gap}</div></div>
                    <div><div className="eyebrow text-[9px]">Verdict</div><div className="text-terra-500 font-medium">Proxy pattern</div></div>
                  </div>
                  <p className="mt-3 text-ink-muted">{g.note}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

export default function Attendance() {
  const [overrides, dispatch] = useReducer(statusReducer, {})
  const [drawer, setDrawer] = useState(null)
  const [note, setNote] = useState('')
  const [action, setAction] = useState('checkin')
  const [scheduledCheckIn, setScheduledCheckIn] = useState(null)

  const avgAttendance = useMemo(() => students.reduce((a, s) => a + s.attendance, 0) / students.length, [])
  const flagged = students.filter((s) => s.attendance < 0.85).length
  const scheduleCheckIn = () => {
    if (!drawer) return
    setScheduledCheckIn({ student: drawer.name, action })
    setDrawer(null)
    setNote('')
    setAction('checkin')
  }

  return (
    <div className="space-y-6 animate-rise">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <Eyebrow>Module 02</Eyebrow>
          <h1 className="editorial-title text-4xl md:text-5xl mt-2 leading-[1.05]">Frictionless Attendance.</h1>
          <p className="text-ink-muted mt-2 max-w-xl">
            Roster, decay, and integrity — three lenses on the same daily ritual of showing up.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 md:gap-8">
          <Stat label="Avg Attendance" value={`${(avgAttendance * 100).toFixed(0)}%`} sub="rolling 14d" tone="sage" />
          <Stat label="Decay Flagged" value={String(flagged).padStart(2, '0')} sub="< 85%" tone="terra" />
          <Stat label="Proxy Signals" value={String(geoFlagLog.length).padStart(2, '0')} sub="last 72h" />
        </div>
      </header>

      {scheduledCheckIn && (
        <div className="rounded-xl border border-sage-500/30 bg-sage-50 px-4 py-3 text-sm text-ink flex items-center justify-between gap-4" role="status">
          <span><strong>{scheduledCheckIn.action === 'checkin' ? 'Academic check-in' : 'Support action'}</strong> scheduled for {scheduledCheckIn.student}.</span>
          <button onClick={() => setScheduledCheckIn(null)} className="text-ink-muted hover:text-ink" aria-label="Dismiss confirmation">×</button>
        </div>
      )}

      <RosterTable overrides={overrides} dispatch={dispatch} />
      <DecayAlerts onCheckIn={setDrawer} />
      <GeoProxySim />

      <Drawer
        open={!!drawer}
        onClose={() => { setDrawer(null); setNote(''); setAction('checkin') }}
        title={drawer ? drawer.name : ''}
        subtitle={drawer ? `${drawer.program} · 14-day attendance ${(drawer.attendance * 100).toFixed(0)}%` : ''}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setDrawer(null)} className="btn-ghost">Cancel</button>
            <button onClick={scheduleCheckIn} className="btn-primary">
              Schedule Check-in
            </button>
          </div>
        }
      >
        {drawer && (
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-chalk p-3">
                <div className="eyebrow text-[9px]">Attendance</div>
                <div className="font-serif text-xl text-terra-500">{(drawer.attendance * 100).toFixed(0)}%</div>
              </div>
              <div className="rounded-lg bg-chalk p-3">
                <div className="eyebrow text-[9px]">Min Tardy</div>
                <div className="font-serif text-xl text-ink">{drawer.minutesTardy}</div>
              </div>
              <div className="rounded-lg bg-chalk p-3">
                <div className="eyebrow text-[9px]">Risk</div>
                <div className="font-serif text-xl text-ink">{riskLabels[drawer.risk].label}</div>
              </div>
            </div>

            <Field label="Action Type">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { v: 'checkin', l: 'Academic Check-in' },
                  { v: 'tutor', l: 'Assign Tutor' },
                  { v: 'wellness', l: 'Wellness Referral' },
                  { v: 'probation', l: 'Formal Notice' },
                ].map((o) => (
                  <button
                    key={o.v}
                    onClick={() => setAction(o.v)}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${
                      action === o.v ? 'bg-ink text-canvas border-ink' : 'bg-white text-ink-soft border-line hover:border-ink-faint'
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Mentor Notes" hint="Visible to scholar and advisor of record.">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="e.g. Missed two consecutive labs; cited transit disruption. Propose makeup sprint for Module 3."
                className="input-clean w-full resize-none"
              />
            </Field>

            <div className="rounded-lg border border-line p-3 text-xs text-ink-muted">
              <span className="font-medium text-ink">Suggested pathway:</span>{' '}
              {action === 'checkin' && '15-minute conversation before next lecture.'}
              {action === 'tutor' && 'Pair with Eleanor W. for Advanced Linear Algebra.'}
              {action === 'wellness' && 'Refer to Student Wellness Office, attn. Dr. Vance.'}
              {action === 'probation' && 'Issue formal attendance notice cc: Registrar.'}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
