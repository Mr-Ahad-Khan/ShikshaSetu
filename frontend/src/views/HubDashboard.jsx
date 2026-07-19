import { useMemo, useState } from 'react'
import { students, riskLabels, faculty } from '../data/mockData'
import { Panel, Eyebrow, Stat, Chip, Dot, Sparkline, Donut } from '../components/ui/Primitives'

const RISK_ORDER = ['critical', 'elevated', 'moderate', 'low']

function VelocityChart() {
  const sorted = useMemo(
    () => [...students].sort((a, b) => b.velocity - a.velocity),
    []
  )
  const max = 1
  return (
    <Panel className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <Eyebrow>Module 01 · Momentum</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Student Velocity Chart</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Learning momentum across the last six weeks — a composite of submission cadence, concept mastery, and peer collaboration density.
          </p>
        </div>
        <div className="hidden md:flex gap-4 text-xs text-ink-muted">
          <div className="flex items-center gap-1.5"><Dot tone="sage" /> Accelerating</div>
          <div className="flex items-center gap-1.5"><Dot tone="terra" /> Decelerating</div>
        </div>
      </div>

      <div className="space-y-2.5">
        {sorted.map((s, i) => {
          const accel = s.trend[s.trend.length - 1] >= s.trend[0]
          return (
            <div key={s.id} className="group grid grid-cols-12 items-center gap-3 py-1.5 border-b border-line/60 last:border-0">
              <div className="col-span-1 font-mono text-[11px] text-ink-faint">{String(i + 1).padStart(2, '0')}</div>
              <div className="col-span-4 md:col-span-3 min-w-0">
                <div className="text-sm font-medium text-ink truncate">{s.name}</div>
                <div className="text-[11px] text-ink-muted truncate">{s.program}</div>
              </div>
              <div className="col-span-5 md:col-span-6">
                <div className="relative h-7 rounded-md bg-chalk overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 ${accel ? 'bg-sage-500' : 'bg-terra-400'} rounded-md transition-all duration-700`}
                    style={{ width: `${(s.velocity / max) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-2.5">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-canvas/90 font-medium">
                      {accel ? 'rising' : 'falling'}
                    </span>
                    <span className="font-mono text-[11px] text-canvas">{(s.velocity * 100).toFixed(0)}</span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 hidden md:flex justify-end">
                <Sparkline data={s.trend} stroke={accel ? '#4A6B5D' : '#C26D50'} fill={accel ? 'rgba(74,107,93,0.12)' : 'rgba(194,109,80,0.12)'} />
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

function RiskHeatmap() {
  const [filter, setFilter] = useState('all')
  const cells = useMemo(() => {
    return students.map((s) => {
      const tone = riskLabels[s.risk].tone
      const intensity = s.risk === 'critical' ? 5 : s.risk === 'elevated' ? 4 : s.risk === 'moderate' ? 3 : 1
      return { s, tone, intensity }
    })
  }, [])

  const visible = filter === 'all' ? cells : cells.filter((c) => c.s.risk === filter)

  return (
    <Panel className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <Eyebrow>Module 01 · Retention</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Risk & Retention Heatmap</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            A typographic flagging grid. Each cell encodes a 14-day engagement decay signal — softly flagged, not alarmed.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['all', ...RISK_ORDER].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[11px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border transition ${
                filter === f ? 'bg-ink text-canvas border-ink' : 'bg-white text-ink-muted border-line hover:border-ink-faint'
              }`}
            >
              {f === 'all' ? 'All' : riskLabels[f].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {visible.map(({ s, tone, intensity }) => {
          const bg = tone === 'terra'
            ? `rgba(194,109,80,${0.08 + intensity * 0.08})`
            : `rgba(74,107,93,${0.06 + intensity * 0.05})`
          return (
            <div
              key={s.id}
              className="rounded-xl border border-line p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft"
              style={{ background: bg }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-ink-muted">#{s.id.toUpperCase()}</span>
                <Chip tone={tone}>
                  <Dot tone={tone} />
                  {riskLabels[s.risk].label}
                </Chip>
              </div>
              <div className="mt-3 font-serif text-lg tracking-tightest text-ink leading-tight">{s.name}</div>
              <div className="text-[11px] text-ink-muted mt-0.5">{s.program}</div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="eyebrow text-[9px]">Attendance</div>
                  <div className="font-mono text-sm text-ink">{(s.attendance * 100).toFixed(0)}%</div>
                </div>
                <div className="text-right">
                  <div className="eyebrow text-[9px]">Tardy (min)</div>
                  <div className="font-mono text-sm text-ink">{s.minutesTardy}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}

function SynergyMatcher() {
  const pairs = useMemo(() => {
    const result = []
    const pool = [...students]
    while (pool.length > 1) {
      const a = pool.shift()
      let best = null, bestScore = -Infinity
      for (const b of pool) {
        // Complementary: a's strengths offset b's gaps, and vice versa
        const techComp = (a.skills.technical - b.skills.technical)
        const commComp = (a.skills.communication - b.skills.communication)
        const leadComp = (a.skills.leadership - b.skills.leadership)
        const gapOverlap = a.gaps.filter((g) => b.strengths.includes(g)).length + b.gaps.filter((g) => a.strengths.includes(g)).length
        const score = gapOverlap * 3 - Math.abs(techComp) - Math.abs(commComp) * 0.5 - Math.abs(leadComp) * 0.5
        if (score > bestScore) { bestScore = score; best = b }
      }
      if (best) {
        pool.splice(pool.indexOf(best), 1)
        const aGives = a.strengths.filter((st) => best.gaps.includes(st))
        const bGives = best.strengths.filter((st) => a.gaps.includes(st))
        result.push({ a, b: best, aGives, bGives, score: bestScore })
      }
    }
    return result
  }, [])

  return (
    <Panel className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <Eyebrow>Module 01 · Synergy</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Synergy Matcher</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Suggested peer pairs ranked by complementary skill gaps. Each pairing is reversible — both parties grow.
          </p>
        </div>
        <Chip tone="sage"><Dot tone="sage" /> {pairs.length} pairs</Chip>
      </div>

      <div className="space-y-3">
        {pairs.slice(0, 6).map((p, i) => (
          <div key={i} className="rounded-xl border border-line p-4 hover:bg-chalk/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                <span className="font-mono">PAIR {String(i + 1).padStart(2, '0')}</span>
                <span>·</span>
                <span>Affinity {(p.score + 6).toFixed(1)}</span>
              </div>
              <Chip tone="neutral">{p.aGives.length + p.bGives.length} skill bridges</Chip>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { giver: p.a, recv: p.b, gives: p.aGives },
                { giver: p.b, recv: p.a, gives: p.bGives },
              ].map((side, idx) => (
                <div key={idx} className="rounded-lg bg-chalk/60 p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-sage-500 text-canvas grid place-items-center font-serif text-xs">
                      {side.giver.name.split(' ').map((w) => w[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-ink truncate">{side.giver.name}</div>
                      <div className="text-[10px] text-ink-muted">teaches {side.recv.name.split(' ')[0]}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {side.gives.length > 0 ? side.gives.map((g) => (
                      <Chip key={g} tone="sage" className="text-[10px]">{g}</Chip>
                    )) : <span className="text-[11px] text-ink-muted italic">General mentorship</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

export default function HubDashboard() {
  const avgVelocity = useMemo(() => students.reduce((a, s) => a + s.velocity, 0) / students.length, [])
  const atRisk = useMemo(() => students.filter((s) => s.risk === 'critical' || s.risk === 'elevated').length, [])
  const avgAttendance = useMemo(() => students.reduce((a, s) => a + s.attendance, 0) / students.length, [])

  return (
    <div className="space-y-6 animate-rise">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <Eyebrow>Block VII · Week 03</Eyebrow>
          <h1 className="editorial-title text-4xl md:text-5xl mt-2 leading-[1.05]">The Overview.</h1>
          <p className="text-ink-muted mt-2 max-w-xl">
            A composite glance at {students.length} scholars in {faculty.cohort.toLowerCase()}. Momentum, risk, and synergy — read together, not apart.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 md:gap-8">
          <Stat label="Cohort Velocity" value={avgVelocity.toFixed(2)} sub="composite momentum" tone="sage" />
          <Stat label="At-Risk Flags" value={String(atRisk).padStart(2, '0')} sub="elevated + critical" tone="terra" />
          <Stat label="Attendance" value={`${(avgAttendance * 100).toFixed(0)}%`} sub="14-day rolling" />
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2"><VelocityChart /></div>
        <div className="flex flex-col items-center justify-center panel p-6">
          <Eyebrow>Cohort Pulse</Eyebrow>
          <div className="mt-4"><Donut value={avgVelocity} size={140} stroke={12} label="Velocity" /></div>
          <div className="mt-6 grid grid-cols-2 gap-4 w-full text-center">
            <div>
              <div className="font-serif text-2xl tracking-tightest text-sage-600">{students.filter((s) => s.trend[5] >= s.trend[0]).length}</div>
              <div className="eyebrow text-[9px]">Rising</div>
            </div>
            <div>
              <div className="font-serif text-2xl tracking-tightest text-terra-500">{students.filter((s) => s.trend[5] < s.trend[0]).length}</div>
              <div className="eyebrow text-[9px]">Falling</div>
            </div>
          </div>
        </div>
      </div>

      <RiskHeatmap />
      <SynergyMatcher />
    </div>
  )
}
