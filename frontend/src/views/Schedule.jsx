import { useMemo, useState } from 'react'
import { schedule, students } from '../data/mockData'
import { Panel, Eyebrow, Stat, Chip, Dot, Modal, Field } from '../components/ui/Primitives'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const HOURS = Array.from({ length: 12 }, (_, i) => i + 7) // 07:00 - 18:00

const TYPE_TONE = {
  lecture: { bg: 'bg-sage-500', text: 'text-canvas', chip: 'sage' },
  lab: { bg: 'bg-terra-400', text: 'text-canvas', chip: 'terra' },
  office: { bg: 'bg-chalk', text: 'text-ink', chip: 'neutral' },
  mentor: { bg: 'bg-ink', text: 'text-canvas', chip: 'ink' },
  meeting: { bg: 'bg-sage-100', text: 'text-sage-700', chip: 'sage' },
  block: { bg: 'bg-chalk', text: 'text-ink-muted', chip: 'neutral' },
}

function toMinutes(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function WeeklyGrid() {
  return (
    <Panel className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <Eyebrow>Module 04 · Grid</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Weekly Grid Layout</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Asymmetric calendar — lectures, labs, mentor sessions, and faculty blocks. Height encodes duration.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(TYPE_TONE).map(([k, v]) => (
            <Chip key={k} tone={v.chip} className="capitalize"><span className={`w-2 h-2 rounded-full ${v.bg}`} /> {k}</Chip>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto -mx-2">
        <div className="min-w-[860px] px-2">
          <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-0 border border-line rounded-xl overflow-hidden">
            <div className="bg-chalk/50 border-r border-line" />
            {DAYS.map((d) => (
              <div key={d} className="bg-chalk/50 border-r border-line last:border-r-0 px-3 py-2.5">
                <div className="eyebrow">{d}</div>
              </div>
            ))}

            {HOURS.map((h) => (
              <div key={h} className="contents">
                <div className="border-t border-line/60 px-2 py-1 text-[10px] font-mono text-ink-faint">
                  {String(h).padStart(2, '0')}:00
                </div>
                {DAYS.map((d) => (
                  <div key={`${d}-${h}`} className="border-t border-line/60 border-r border-line last:border-r-0 relative min-h-[44px]">
                    {schedule
                      .filter((e) => e.day === d && toMinutes(e.start) === h * 60)
                      .map((e) => {
                        const dur = (toMinutes(e.end) - toMinutes(e.start)) / 60
                        const tone = TYPE_TONE[e.type]
                        const isBlock = e.type === 'block' || e.type === 'office'
                        return (
                          <div
                            key={e.id}
                            className={`absolute inset-x-1 top-1 rounded-lg ${tone.bg} ${tone.text} px-2.5 py-1.5 shadow-soft overflow-hidden`}
                            style={{ height: `calc(${dur * 44}px - 4px)` }}
                          >
                            <div className="text-[11px] font-medium leading-tight truncate">{e.title}</div>
                            <div className={`text-[10px] ${isBlock ? 'text-ink-muted' : 'opacity-70'} truncate`}>{e.start}–{e.end} · {e.room}</div>
                          </div>
                        )
                      })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}

function BurnoutPredictor() {
  const flagged = useMemo(() => {
    return students
      .map((s) => {
        // Simulate back-to-back load: count of days where student has >6h contiguous commitments
        const loadDays = DAYS.map((d) => {
          const dayEvents = schedule.filter((e) => e.type === 'lecture' || e.type === 'lab')
          const totalHours = dayEvents
            .filter((e) => e.day === d)
            .reduce((a, e) => a + (toMinutes(e.end) - toMinutes(e.start)) / 60, 0)
          return totalHours
        })
        const maxDay = Math.max(...loadDays)
        const overDays = loadDays.filter((h) => h > 6).length
        return { ...s, maxDay, overDays, loadDays }
      })
      .filter((s) => s.overDays > 0)
      .sort((a, b) => b.overDays - a.overDays || b.maxDay - a.maxDay)
  }, [])

  const [rebalanced, setRebalanced] = useState({})

  return (
    <Panel className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <Eyebrow>Module 04 · Burnout</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Burnout Predictor</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Flags scholars with &gt;6 hours of back-to-back commitments on any day. Suggests schedule rebalancing workflow.
          </p>
        </div>
        <Chip tone="terra"><Dot tone="terra" /> {flagged.length} scholars</Chip>
      </div>

      {flagged.length === 0 ? (
        <div className="rounded-xl border border-line p-6 text-center text-ink-muted">
          No scholars exceed the 6-hour back-to-back threshold this week.
        </div>
      ) : (
        <ul className="space-y-3">
          {flagged.map((s) => {
            const isRebalanced = rebalanced[s.id]
            return (
              <li key={s.id} className="rounded-xl border border-line p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-terra-50 text-terra-600 grid place-items-center font-serif text-sm">
                      {s.name.split(' ').map((w) => w[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-ink truncate">{s.name}</div>
                      <div className="text-[11px] text-ink-muted truncate">
                        Peak {s.maxDay.toFixed(1)}h · {s.overDays} day{s.overDays > 1 ? 's' : ''} over threshold
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex gap-1">
                      {DAYS.map((d, i) => (
                        <div
                          key={d}
                          title={`${d}: ${s.loadDays[i].toFixed(1)}h`}
                          className={`w-6 h-6 rounded text-[10px] font-mono grid place-items-center ${
                            s.loadDays[i] > 6 ? 'bg-terra-400 text-canvas' : s.loadDays[i] > 3 ? 'bg-sage-100 text-sage-700' : 'bg-chalk text-ink-muted'
                          }`}
                        >
                          {d[0]}
                        </div>
                      ))}
                    </div>
                    {isRebalanced ? (
                      <Chip tone="sage"><Dot tone="sage" /> Rebalance suggested</Chip>
                    ) : (
                      <button
                        onClick={() => setRebalanced((r) => ({ ...r, [s.id]: true }))}
                        className="btn-primary text-xs"
                      >
                        Suggest Rebalancing
                      </button>
                    )}
                  </div>
                </div>
                {isRebalanced && (
                  <div className="mt-3 pt-3 border-t border-line text-xs text-ink-muted space-y-1">
                    <div className="text-ink font-medium">Proposed shifts:</div>
                    <div>· Move CS-612 Lab (Mon 15:00) → Wed 10:00 slot (open)</div>
                    <div>· Split Grading Block into two 90-min windows across Tue/Fri</div>
                    <div>· Insert 30-min recovery buffer after 1:1 mentor sessions</div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </Panel>
  )
}

function OfficeHoursMatrix() {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState(null)
  const [duration, setDuration] = useState(30)
  const [confirmed, setConfirmed] = useState(null)

  const slots = useMemo(() => {
    const out = []
    for (const d of DAYS) {
      for (let h = 9; h <= 16; h++) {
        for (const m of [0, 30]) {
          const start = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
          const endM = h * 60 + m + duration
          const end = `${String(Math.floor(endM / 60)).padStart(2, '0')}:${String(endM % 60).padStart(2, '0')}`
          // Conflict: faculty has event overlapping this slot
          const conflict = schedule.find((e) => e.day === d && !(toMinutes(end) <= toMinutes(e.start) || toMinutes(start) >= toMinutes(e.end)))
          // Seat availability simulation: 6 seats, random-ish deterministic
          const seed = (d.charCodeAt(0) + h + m) % 6
          const seats = 6 - (seed % 4)
          out.push({ day: d, start, end, conflict: !!conflict, conflictEvent: conflict, seats })
        }
      }
    }
    return out
  }, [duration])

  const available = slots.filter((s) => !s.conflict && s.seats > 0)

  return (
    <Panel className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <Eyebrow>Module 04 · Office Hours</Eyebrow>
          <h2 className="editorial-title text-2xl mt-1">Office Hours Rescheduling Matrix</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Modal-driven picker. Validates seat availability and faculty conflict checks in real time.
          </p>
        </div>
        <button onClick={() => setOpen(true)} className="btn-primary">Open Rescheduling Matrix</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-line p-3">
          <div className="eyebrow">Open Slots</div>
          <div className="font-serif text-2xl tracking-tightest text-sage-600">{available.length}</div>
        </div>
        <div className="rounded-xl border border-line p-3">
          <div className="eyebrow">Conflicts</div>
          <div className="font-serif text-2xl tracking-tightest text-terra-500">{slots.length - available.length}</div>
        </div>
        <div className="rounded-xl border border-line p-3">
          <div className="eyebrow">Total Slots</div>
          <div className="font-serif text-2xl tracking-tightest text-ink">{slots.length}</div>
        </div>
        <div className="rounded-xl border border-line p-3">
          <div className="eyebrow">Avg Seats</div>
          <div className="font-serif text-2xl tracking-tightest text-ink">{(slots.reduce((a, s) => a + s.seats, 0) / slots.length).toFixed(1)}</div>
        </div>
      </div>

      {confirmed && (
        <div className="mt-4 rounded-xl bg-sage-50 border border-sage-200 p-4 text-sm text-sage-700">
          <Dot tone="sage" /> Confirmed: {confirmed.day} {confirmed.start}–{confirmed.end} · {confirmed.seats} seat{confirmed.seats > 1 ? 's' : ''} reserved.
        </div>
      )}

      <Modal
        open={open}
        onClose={() => { setOpen(false); setPicked(null); setConfirmed(null) }}
        title="Rescheduling Matrix"
        subtitle={`${duration}-min slots · seat & conflict validated`}
        wide
        footer={
          <div className="flex items-center justify-between">
            <div className="text-xs text-ink-muted">
              {picked ? `Selected: ${picked.day} ${picked.start}–${picked.end} · ${picked.seats} seats` : 'Select an open slot to confirm'}
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setOpen(false); setPicked(null) }} className="btn-ghost">Cancel</button>
              <button
                disabled={!picked}
                onClick={() => { setConfirmed(picked); setOpen(false) }}
                className={`btn-primary ${!picked ? 'opacity-50 pointer-events-none' : ''}`}
              >
                Confirm Slot
              </button>
            </div>
          </div>
        }
      >
        <div className="mb-4">
          <Field label="Session Duration">
            <div className="flex gap-2">
              {[30, 45, 60, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => { setDuration(d); setPicked(null) }}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition ${duration === d ? 'bg-ink text-canvas border-ink' : 'bg-white text-ink-soft border-line hover:border-ink-faint'}`}
                >
                  {d} min
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-1 text-xs">
          <div />
          {DAYS.map((d) => <div key={d} className="eyebrow text-center">{d}</div>)}
          {[9, 10, 11, 12, 13, 14, 15, 16].map((h) => (
            <div key={h} className="contents">
              <div className="font-mono text-[10px] text-ink-faint self-center">{String(h).padStart(2, '0')}:00</div>
              {DAYS.map((d) => {
                const slot = slots.find((s) => s.day === d && s.start.startsWith(String(h).padStart(2, '0') + ':'))
                if (!slot) return <div key={`${d}-${h}`} className="rounded bg-chalk/30" />
                const isPicked = picked && picked.day === d && picked.start === slot.start
                return (
                  <button
                    key={`${d}-${h}-${slot.start}`}
                    disabled={slot.conflict || slot.seats === 0}
                    onClick={() => setPicked(slot)}
                    className={`rounded px-1.5 py-1 text-left transition border ${
                      isPicked ? 'bg-ink text-canvas border-ink' :
                      slot.conflict ? 'bg-terra-50 border-terra-100 text-terra-500 cursor-not-allowed' :
                      slot.seats === 0 ? 'bg-chalk border-line text-ink-faint cursor-not-allowed' :
                      'bg-white border-line hover:border-sage-400 text-ink'
                    }`}
                  >
                    <div className="font-mono text-[10px]">{slot.start}</div>
                    <div className="text-[10px]">{slot.conflict ? 'conflict' : slot.seats === 0 ? 'full' : `${slot.seats} seats`}</div>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-ink-muted">
          <Chip tone="sage"><Dot tone="sage" /> Open</Chip>
          <Chip tone="terra"><Dot tone="terra" /> Faculty conflict</Chip>
          <Chip tone="neutral"><Dot tone="muted" /> Full</Chip>
        </div>
      </Modal>
    </Panel>
  )
}

export default function Schedule() {
  const totalHours = useMemo(() => schedule.reduce((a, e) => a + (toMinutes(e.end) - toMinutes(e.start)) / 60, 0), [])
  const mentorCount = schedule.filter((e) => e.type === 'mentor').length
  const labCount = schedule.filter((e) => e.type === 'lab').length

  return (
    <div className="space-y-6 animate-rise">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <Eyebrow>Module 04</Eyebrow>
          <h1 className="editorial-title text-4xl md:text-5xl mt-2 leading-[1.05]">Conflict-Free Schedule.</h1>
          <p className="text-ink-muted mt-2 max-w-xl">
            Weekly grid, burnout signal, and rescheduling matrix — designed so no scholar meets themselves coming and going.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 md:gap-8">
          <Stat label="Weekly Hours" value={totalHours.toFixed(1)} sub="faculty load" tone="sage" />
          <Stat label="Mentor Sessions" value={String(mentorCount).padStart(2, '0')} sub="1:1 slots" />
          <Stat label="Lab Blocks" value={String(labCount).padStart(2, '0')} sub="supervised" tone="terra" />
        </div>
      </header>

      <WeeklyGrid />
      <BurnoutPredictor />
      <OfficeHoursMatrix />
    </div>
  )
}
