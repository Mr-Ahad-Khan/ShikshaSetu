import { useMemo, useState, useReducer } from 'react'
import { students, gradebook, weights as initialWeights, recoveryPathways, courses } from '../data/mockData'
import { Panel, Eyebrow, Stat, Chip, Dot } from '../components/ui/Primitives'

function weighted(row, w) {
  return (
    row.projects * w.projects +
    row.midterms * w.midterms +
    row.labs * w.labs +
    row.participation * w.participation
  )
}

function gradeLetter(score) {
  if (score >= 93) return 'A'
  if (score >= 90) return 'A-'
  if (score >= 87) return 'B+'
  if (score >= 83) return 'B'
  if (score >= 80) return 'B-'
  if (score >= 77) return 'C+'
  if (score >= 73) return 'C'
  if (score >= 70) return 'C-'
  if (score >= 67) return 'D+'
  if (score >= 60) return 'D'
  return 'F'
}

function weightsReducer(state, action) {
  switch (action.type) {
    case 'set':
      return { ...state, [action.key]: action.value }
    case 'normalize': {
      const sum = Object.values(state).reduce((a, b) => a + Number(b), 0) || 1
      const next = {}
      for (const k of Object.keys(state)) next[k] = Number(state[k]) / sum
      return next
    }
    default:
      return state
  }
}

function WeightedGradebook({ gradebook, setGradebook, weights, dispatchWeights }) {
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null) // {studentId, course, key}
  const [draft, setDraft] = useState(null)

  const rows = useMemo(() => {
    return gradebook
      .map((g) => {
        const s = students.find((st) => st.id === g.studentId)
        const w = weighted(g, weights)
        return { ...g, student: s, weighted: w, letter: gradeLetter(w) }
      })
      .filter((r) => !query || r.student.name.toLowerCase().includes(query.toLowerCase()) || r.course.toLowerCase().includes(query.toLowerCase()))
  }, [gradebook, weights, query])

  const startEdit = (r, key) => {
    setEditing({ studentId: r.studentId, course: r.course, key })
    setDraft(String(r[key]))
  }
  const commitEdit = () => {
    if (!editing) return
    const v = Math.max(0, Math.min(100, Number(draft) || 0))
    setGradebook((current) => current.map((row) =>
      row.studentId === editing.studentId && row.course === editing.course
        ? { ...row, [editing.key]: v }
        : row,
    ))
    setEditing(null)
    setDraft(null)
  }

  return (
    <Panel className="p-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
        <div>
          <Eyebrow>Module 03 · Gradebook</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Weighted Grade Book</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Spreadsheet-style ledger with adjustable category weights. Click any cell to edit; weighted total recomputes live.
          </p>
        </div>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter by scholar or course…" className="input-clean w-64" />
      </div>

      <div className="rounded-xl border border-line p-4 mb-5 bg-chalk/40">
        <div className="flex items-center justify-between mb-3">
          <Eyebrow>Category Weights</Eyebrow>
          <button onClick={() => dispatchWeights({ type: 'normalize' })} className="btn-ghost text-xs">Normalize to 1.0</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(weights).map(([k, v]) => (
            <div key={k}>
              <div className="flex items-center justify-between">
                <span className="eyebrow capitalize">{k}</span>
                <span className="font-mono text-xs text-ink-muted">{(Number(v) * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0" max="1" step="0.05"
                value={v}
                onChange={(e) => dispatchWeights({ type: 'set', key: k, value: Number(e.target.value) })}
                className="w-full accent-sage-500 mt-1"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.16em] text-ink-muted border-b border-line">
              <th className="px-2 py-2 font-medium">Scholar</th>
              <th className="px-2 py-2 font-medium">Course</th>
              <th className="px-2 py-2 font-medium text-right">Projects</th>
              <th className="px-2 py-2 font-medium text-right">Midterms</th>
              <th className="px-2 py-2 font-medium text-right">Labs</th>
              <th className="px-2 py-2 font-medium text-right">Partic.</th>
              <th className="px-2 py-2 font-medium text-right">Weighted</th>
              <th className="px-2 py-2 font-medium text-right">Letter</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.studentId}-${r.course}`} className="row-hover border-b border-line/60">
                <td className="px-2 py-2.5">
                  <div className="font-medium text-ink">{r.student.name}</div>
                  <div className="text-[11px] text-ink-muted font-mono">#{r.studentId.toUpperCase()}</div>
                </td>
                <td className="px-2 py-2.5">
                  <div className="text-ink-soft">{r.course}</div>
                  <div className="text-[11px] text-ink-muted">{courses.find((c) => c.code === r.course)?.name}</div>
                </td>
                {['projects', 'midterms', 'labs', 'participation'].map((k) => {
                  const isEditing = editing?.studentId === r.studentId && editing?.course === r.course && editing?.key === k
                  return (
                    <td key={k} className="px-2 py-2.5 text-right">
                      {isEditing ? (
                        <input
                          autoFocus
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onBlur={commitEdit}
                          onKeyDown={(e) => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditing(null) }}
                          className="input-clean w-16 text-right font-mono py-1"
                        />
                      ) : (
                        <button
                          onClick={() => startEdit(r, k)}
                          className={`font-mono px-2 py-1 rounded transition ${r[k] < 65 ? 'text-terra-500 hover:bg-terra-50' : 'text-ink hover:bg-chalk'}`}
                        >
                          {r[k]}
                        </button>
                      )}
                    </td>
                  )
                })}
                <td className="px-2 py-2.5 text-right">
                  <span className={`font-mono font-medium ${r.weighted < 70 ? 'text-terra-500' : r.weighted < 80 ? 'text-ink' : 'text-sage-600'}`}>
                    {r.weighted.toFixed(1)}
                  </span>
                </td>
                <td className="px-2 py-2.5 text-right">
                  <Chip tone={r.weighted >= 80 ? 'sage' : r.weighted >= 70 ? 'neutral' : 'terra'}>{r.letter}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

function TrendVisualizer() {
  const [selected, setSelected] = useState(students[0].id)
  const s = students.find((st) => st.id === selected)
  const trend = s.trend
  const w = 720, h = 220, pad = 36
  const max = 1, min = 0
  const stepX = (w - pad * 2) / (trend.length - 1)
  const pts = trend.map((v, i) => [pad + i * stepX, h - pad - ((v - min) / (max - min)) * (h - pad * 2)])
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const area = `${path} L${pad + (trend.length - 1) * stepX},${h - pad} L${pad},${h - pad} Z`
  const spikes = []
  for (let i = 1; i < trend.length; i++) {
    const d = trend[i] - trend[i - 1]
    if (Math.abs(d) > 0.06) spikes.push({ idx: i, delta: d, x: pts[i][0], y: pts[i][1] })
  }

  return (
    <Panel className="p-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
        <div>
          <Eyebrow>Module 03 · Trend</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Performance Trend Visualizer</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Six-week trendline. Spikes and drops above the 6% threshold are annotated inline.
          </p>
        </div>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} className="input-clean">
          {students.map((st) => <option key={st.id} value={st.id}>{st.name}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full min-w-[640px]">
          {[0, 0.25, 0.5, 0.75, 1].map((g) => (
            <g key={g}>
              <line x1={pad} x2={w - pad} y1={h - pad - g * (h - pad * 2)} y2={h - pad - g * (h - pad * 2)} stroke="#E9E7E1" strokeWidth="1" />
              <text x={pad - 8} y={h - pad - g * (h - pad * 2) + 4} textAnchor="end" className="fill-ink-faint" fontSize="10" fontFamily="JetBrains Mono">{Math.round(g * 100)}</text>
            </g>
          ))}
          <path d={area} fill="rgba(74,107,93,0.08)" />
          <path d={path} fill="none" stroke="#4A6B5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#FBFBFA" stroke="#4A6B5D" strokeWidth="1.5" />)}
          {spikes.map((sp, i) => (
            <g key={i}>
              <circle cx={sp.x} cy={sp.y} r="5" fill={sp.delta > 0 ? '#4A6B5D' : '#C26D50'} className="animate-pulseSoft" />
              <line x1={sp.x} y1={sp.y} x2={sp.x} y2={sp.y - 24} stroke={sp.delta > 0 ? '#4A6B5D' : '#C26D50'} strokeWidth="1" strokeDasharray="2 2" />
              <text x={sp.x} y={sp.y - 28} textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fill={sp.delta > 0 ? '#3B5749' : '#A85940'}>
                {sp.delta > 0 ? '+' : ''}{(sp.delta * 100).toFixed(0)}
              </text>
            </g>
          ))}
          {['W01', 'W02', 'W03', 'W04', 'W05', 'W06'].map((w, i) => (
            <text key={w} x={pad + i * stepX} y={h - 12} textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" className="fill-ink-muted">{w}</text>
          ))}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {spikes.length === 0 ? (
          <Chip tone="sage"><Dot tone="sage" /> No spikes — steady trajectory</Chip>
        ) : (
          spikes.map((sp, i) => (
            <Chip key={i} tone={sp.delta > 0 ? 'sage' : 'terra'}>
              <Dot tone={sp.delta > 0 ? 'sage' : 'terra'} />
              Week {String(sp.idx + 1).padStart(2, '0')}: {sp.delta > 0 ? '+' : ''}{(sp.delta * 100).toFixed(0)} pts
            </Chip>
          ))
        )}
      </div>
    </Panel>
  )
}

function RedirectionEngine({ gradebook, weights }) {
  const [assignments, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'assign': return { ...state, [`${action.studentId}:${action.course}`]: action.pathwayId }
      case 'clear': {
        const next = { ...state }; delete next[`${action.studentId}:${action.course}`]; return next
      }
      default: return state
    }
  }, {})
  const [menu, setMenu] = useState(null)

  const lowRows = useMemo(() => {
    return gradebook
      .map((g) => {
        const s = students.find((st) => st.id === g.studentId)
        const w = weighted(g, weights)
        return { ...g, student: s, weighted: w }
      })
      .filter((r) => r.weighted < 75)
      .sort((a, b) => a.weighted - b.weighted)
  }, [gradebook, weights])

  return (
    <Panel className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <Eyebrow>Module 03 · Redirection</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Redirection Engine</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Low marks trigger a context menu of Recovery Pathways. Assignments surface in the scholar's recovery queue.
          </p>
        </div>
        <Chip tone="terra"><Dot tone="terra" /> {lowRows.length} scholars below 75</Chip>
      </div>

      <ul className="divide-y divide-line/60">
        {lowRows.map((r) => {
          const key = `${r.studentId}:${r.course}`
          const assigned = assignments[key]
          const pathway = recoveryPathways.find((p) => p.id === assigned)
          const open = menu && menu.key === key
          return (
            <li key={key} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-terra-50 text-terra-600 grid place-items-center font-serif text-sm">
                  {r.student.name.split(' ').map((w) => w[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-ink truncate">{r.student.name}</div>
                  <div className="text-[11px] text-ink-muted truncate">{r.course} · weighted {r.weighted.toFixed(1)} · {gradeLetter(r.weighted)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {pathway ? (
                  <>
                    <Chip tone="sage"><Dot tone="sage" /> {pathway.label}</Chip>
                    <button onClick={() => dispatch({ type: 'clear', studentId: r.studentId, course: r.course })} className="btn-ghost text-xs">Clear</button>
                  </>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => setMenu(open ? null : { key })}
                      className="btn-terra text-xs"
                    >
                      Assign Recovery Pathway
                    </button>
                    {open && (
                      <div className="absolute right-0 mt-2 w-72 bg-canvas border border-line rounded-xl shadow-2xl z-20 overflow-hidden">
                        <div className="px-3 py-2 border-b border-line bg-chalk/40">
                          <div className="eyebrow">Recovery Pathways</div>
                        </div>
                        {recoveryPathways.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => { dispatch({ type: 'assign', studentId: r.studentId, course: r.course, pathwayId: p.id }); setMenu(null) }}
                            className="w-full text-left px-3 py-2.5 hover:bg-chalk/60 transition-colors border-b border-line/60 last:border-0"
                          >
                            <div className="text-sm font-medium text-ink">{p.label}</div>
                            <div className="text-[11px] text-ink-muted">{p.detail}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

export default function Marks() {
  const [weights, dispatchWeights] = useReducer(weightsReducer, { ...initialWeights })
  const [gradebookRows, setGradebookRows] = useState(() => gradebook.map((row) => ({ ...row })))
  const avgWeighted = useMemo(() => {
    return gradebookRows.reduce((a, g) => a + weighted(g, weights), 0) / gradebookRows.length
  }, [gradebookRows, weights])
  const belowC = useMemo(() => gradebookRows.filter((g) => weighted(g, weights) < 70).length, [gradebookRows, weights])

  return (
    <div className="space-y-6 animate-rise">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <Eyebrow>Module 03</Eyebrow>
          <h1 className="editorial-title text-4xl md:text-5xl mt-2 leading-[1.05]">Marks & Outcome Analytics.</h1>
          <p className="text-ink-muted mt-2 max-w-xl">
            Weighted ledger, trendline, and redirection — three instruments for moving a scholar from a number to a pathway.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 md:gap-8">
          <Stat label="Cohort Avg" value={avgWeighted.toFixed(1)} sub="weighted" tone="sage" />
          <Stat label="Below C-" value={String(belowC).padStart(2, '0')} sub="weighted < 70" tone="terra" />
          <Stat label="Recovery Slots" value={String(recoveryPathways.length).padStart(2, '0')} sub="pathways" />
        </div>
      </header>

      <WeightedGradebook gradebook={gradebookRows} setGradebook={setGradebookRows} weights={weights} dispatchWeights={dispatchWeights} />
      <TrendVisualizer />
      <RedirectionEngine gradebook={gradebookRows} weights={weights} />
    </div>
  )
}
