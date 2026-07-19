import { useMemo, useState } from 'react'
import { Eyebrow, Panel, Chip, Dot, Modal, Field } from '../components/ui/Primitives'

const initialStaff = [
  { id: 'f01', name: 'Professor Ishaan Nair', department: 'Computer Science', role: 'Faculty Mentor', courses: 2, advisees: 12, status: 'Available' },
  { id: 'f02', name: 'Dr. Kavita Menon', department: 'Data Science', role: 'Programme Coordinator', courses: 3, advisees: 18, status: 'Available' },
  { id: 'f03', name: 'Dr. Rajesh Kumar', department: 'Mathematics', role: 'Senior Lecturer', courses: 2, advisees: 14, status: 'In class' },
  { id: 'f04', name: 'Dr. Neha Bansal', department: 'Engineering', role: 'Academic Advisor', courses: 2, advisees: 16, status: 'Available' },
  { id: 'f05', name: 'Professor Suresh Iyer', department: 'Physics', role: 'Department Chair', courses: 1, advisees: 8, status: 'In meeting' },
]

const blankStaff = { name: '', department: '', role: '', courses: 0, advisees: 0, status: 'Available' }

export default function AcademicStaff() {
  const [staff, setStaff] = useState(initialStaff)
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('All')
  const [editing, setEditing] = useState(null)
  const departments = ['All', ...new Set(staff.map((member) => member.department))]
  const visible = useMemo(() => staff.filter((member) => (department === 'All' || member.department === department) && `${member.name} ${member.role}`.toLowerCase().includes(query.toLowerCase())), [staff, department, query])

  const saveStaff = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const record = { id: editing?.id || `f${String(Date.now()).slice(-6)}`, name: form.get('name').trim(), department: form.get('department').trim(), role: form.get('role').trim(), courses: Number(form.get('courses')), advisees: Number(form.get('advisees')), status: form.get('status') }
    if (!record.name || !record.department || !record.role) return
    setStaff((current) => editing?.id ? current.map((member) => member.id === editing.id ? record : member) : [...current, record])
    setEditing(null)
  }

  const removeStaff = (member) => {
    if (window.confirm(`Remove ${member.name} from academic staff records?`)) setStaff((current) => current.filter((item) => item.id !== member.id))
  }

  return <div className="space-y-6 animate-rise">
    <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div><Eyebrow>Module 06 - Faculty</Eyebrow><h1 className="editorial-title text-4xl md:text-5xl mt-2">Academic Staff.</h1><p className="text-ink-muted mt-2 max-w-xl">Create, update, and remove faculty records and academic workloads.</p></div>
      <button onClick={() => setEditing(blankStaff)} className="btn-primary">+ Add staff member</button>
    </header>
    <Panel className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5"><div><h2 className="editorial-title text-2xl">Faculty records</h2><p className="text-sm text-ink-muted mt-1">{staff.length} active staff records</p></div><div className="flex flex-col sm:flex-row gap-2"><input className="input-clean" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search faculty or role" /><select className="input-clean" value={department} onChange={(event) => setDepartment(event.target.value)}>{departments.map((item) => <option key={item}>{item}</option>)}</select></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{visible.map((member) => <article key={member.id} className="rounded-xl border border-line p-5 hover:bg-chalk/40 transition-colors"><div className="flex items-start justify-between gap-3"><div className="w-10 h-10 rounded-full bg-sage-500 text-canvas grid place-items-center font-serif">{member.name.split(' ').map((part) => part[0]).slice(-2).join('')}</div><Chip tone={member.status === 'Available' ? 'sage' : 'neutral'}><Dot tone={member.status === 'Available' ? 'sage' : 'muted'} /> {member.status}</Chip></div><h3 className="font-serif text-xl mt-4">{member.name}</h3><p className="text-sm text-ink-muted mt-1">{member.role} - {member.department}</p><div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-line"><div><div className="font-mono text-lg">{member.courses}</div><div className="eyebrow text-[9px]">Courses</div></div><div><div className="font-mono text-lg">{member.advisees}</div><div className="eyebrow text-[9px]">Advisees</div></div></div><div className="flex justify-end gap-1 mt-4"><button onClick={() => setEditing(member)} className="btn-ghost text-xs">Edit</button><button onClick={() => removeStaff(member)} className="btn-ghost text-xs text-terra-600">Delete</button></div></article>)}</div>
      {visible.length === 0 && <p className="text-sm text-ink-muted">No academic staff match this filter.</p>}
    </Panel>
    <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit staff member' : 'Add staff member'} subtitle="Academic staff record" footer={<div className="flex justify-end gap-2"><button onClick={() => setEditing(null)} className="btn-ghost">Cancel</button><button form="staff-form" type="submit" className="btn-primary">Save staff member</button></div>}>
      {editing && <form id="staff-form" onSubmit={saveStaff} className="space-y-4"><Field label="Full name"><input name="name" defaultValue={editing.name} className="input-clean w-full" required /></Field><div className="grid grid-cols-2 gap-3"><Field label="Department"><input name="department" defaultValue={editing.department} className="input-clean w-full" required /></Field><Field label="Role"><input name="role" defaultValue={editing.role} className="input-clean w-full" required /></Field></div><div className="grid grid-cols-3 gap-3"><Field label="Courses"><input name="courses" type="number" min="0" defaultValue={editing.courses} className="input-clean w-full" required /></Field><Field label="Advisees"><input name="advisees" type="number" min="0" defaultValue={editing.advisees} className="input-clean w-full" required /></Field><Field label="Status"><select name="status" defaultValue={editing.status} className="input-clean w-full">{['Available', 'In class', 'In meeting'].map((status) => <option key={status}>{status}</option>)}</select></Field></div></form>}
    </Modal>
  </div>
}
