import { useMemo, useState } from 'react'
import { students as seedStudents } from '../data/mockData'
import { Eyebrow, Modal, Panel, Field } from '../components/ui/Primitives'

const blankStudent = { name: '', program: '', year: 'Y1', gpa: '0.00' }

export default function StudentManagement() {
  const [students, setStudents] = useState(() => seedStudents.map(({ id, name, program, year, gpa }) => ({ id, name, program, year, gpa })))
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    return term ? students.filter((student) => `${student.name} ${student.program}`.toLowerCase().includes(term)) : students
  }, [students, query])

  const saveStudent = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const record = {
      id: editing?.id || `s${String(Date.now()).slice(-6)}`,
      name: form.get('name').trim(),
      program: form.get('program').trim(),
      year: form.get('year'),
      gpa: Number(form.get('gpa')).toFixed(2),
    }
    if (!record.name || !record.program) return
    setStudents((current) => editing?.id ? current.map((student) => student.id === editing.id ? record : student) : [...current, record])
    setEditing(null)
  }

  const removeStudent = (student) => {
    if (window.confirm(`Remove ${student.name} from academic student records?`)) {
      setStudents((current) => current.filter((item) => item.id !== student.id))
    }
  }

  return (
    <div className="space-y-6 animate-rise">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <Eyebrow>Module 05 - Records</Eyebrow>
          <h1 className="editorial-title text-4xl md:text-5xl mt-2">Academic Students.</h1>
          <p className="text-ink-muted mt-2 max-w-xl">Create, update, and remove student academic records from one page.</p>
        </div>
        <button onClick={() => setEditing(blankStudent)} className="btn-primary">+ Add student</button>
      </header>

      <Panel className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
          <div><h2 className="editorial-title text-2xl">Student records</h2><p className="text-sm text-ink-muted mt-1">{students.length} active records</p></div>
          <input className="input-clean w-full md:w-64" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search student or programme" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[680px]">
            <thead><tr className="border-b border-line text-left text-[11px] uppercase tracking-[0.14em] text-ink-muted"><th className="py-3 pr-4">Student</th><th className="py-3 pr-4">Programme</th><th className="py-3 pr-4">Year</th><th className="py-3 pr-4">GPA</th><th className="py-3 text-right">Actions</th></tr></thead>
            <tbody>{visible.map((student) => <tr key={student.id} className="border-b border-line/60 row-hover"><td className="py-3 pr-4"><div className="font-medium text-ink">{student.name}</div><div className="font-mono text-[10px] text-ink-faint">{student.id.toUpperCase()}</div></td><td className="py-3 pr-4 text-ink-soft">{student.program}</td><td className="py-3 pr-4">{student.year}</td><td className="py-3 pr-4 font-mono">{student.gpa}</td><td className="py-3 text-right whitespace-nowrap"><button onClick={() => setEditing(student)} className="btn-ghost text-xs">Edit</button><button onClick={() => removeStudent(student)} className="btn-ghost text-xs text-terra-600">Delete</button></td></tr>)}</tbody>
          </table>
        </div>
        {visible.length === 0 && <p className="text-sm text-ink-muted py-5">No student records match this search.</p>}
      </Panel>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit student' : 'Add student'} subtitle="Academic student record" footer={<div className="flex justify-end gap-2"><button onClick={() => setEditing(null)} className="btn-ghost">Cancel</button><button form="student-form" type="submit" className="btn-primary">Save student</button></div>}>
        {editing && <form id="student-form" onSubmit={saveStudent} className="space-y-4"><Field label="Student name"><input name="name" defaultValue={editing.name} className="input-clean w-full" required /></Field><Field label="Programme"><input name="program" defaultValue={editing.program} className="input-clean w-full" required /></Field><div className="grid grid-cols-2 gap-3"><Field label="Academic year"><select name="year" defaultValue={editing.year} className="input-clean w-full">{['Y1', 'Y2', 'Y3', 'Y4'].map((year) => <option key={year}>{year}</option>)}</select></Field><Field label="GPA"><input name="gpa" type="number" min="0" max="4" step="0.01" defaultValue={editing.gpa} className="input-clean w-full" required /></Field></div></form>}
      </Modal>
    </div>
  )
}
