// Hyper-realistic mock data for ShikshaSetu. All names, courses, and metrics are fictional.

export const faculty = {
  name: 'Professor Ishaan Nair',
  role: 'Faculty Mentor · School of Computational Science',
  cohort: 'Honors Cohort — Block VII',
  avatar: 'IN',
}

export const students = [
  { id: 's01', name: 'Amara Vance',        program: 'MS Computational Math',     year: 'Y2', gpa: 3.78, velocity: 0.82, trend: [0.62, 0.66, 0.71, 0.74, 0.79, 0.82], risk: 'low',     skills: { technical: 0.84, communication: 0.61, leadership: 0.55 }, gaps: ['Technical Writing', 'Distributed Systems'], strengths: ['Linear Algebra', 'Quantum Methods'], attendance: 0.96, minutesTardy: 4,  lastCheckIn: '08:42', geoFlags: 0 },
  { id: 's02', name: 'Theo Marchetti',    program: 'BS Computer Engineering',   year: 'Y3', gpa: 3.42, velocity: 0.58, trend: [0.71, 0.69, 0.64, 0.6, 0.57, 0.58], risk: 'elevated', skills: { technical: 0.72, communication: 0.7, leadership: 0.48 }, gaps: ['Numerical Methods', 'Public Speaking'], strengths: ['Circuit Design', 'Embedded C'], attendance: 0.81, minutesTardy: 38, lastCheckIn: '09:14', geoFlags: 2 },
  { id: 's03', name: 'Priya Anand',        program: 'MS Data Science',            year: 'Y1', gpa: 3.91, velocity: 0.93, trend: [0.78, 0.81, 0.86, 0.89, 0.92, 0.93], risk: 'low',     skills: { technical: 0.9, communication: 0.78, leadership: 0.66 }, gaps: ['Causal Inference'], strengths: ['Statistics', 'ML Systems'], attendance: 0.99, minutesTardy: 0,  lastCheckIn: '08:31', geoFlags: 0 },
  { id: 's04', name: 'Kenji Watanabe',     program: 'BS Applied Physics',        year: 'Y4', gpa: 3.55, velocity: 0.64, trend: [0.74, 0.72, 0.68, 0.65, 0.63, 0.64], risk: 'elevated', skills: { technical: 0.81, communication: 0.55, leadership: 0.5 }, gaps: ['Optics Lab', 'Team Facilitation'], strengths: ['Thermodynamics', 'Modeling'], attendance: 0.79, minutesTardy: 52, lastCheckIn: '09:02', geoFlags: 1 },
  { id: 's05', name: 'Sofia Marchetti',     program: 'MS Quantitative Finance',  year: 'Y2', gpa: 3.66, velocity: 0.71, trend: [0.6, 0.63, 0.66, 0.69, 0.7, 0.71], risk: 'moderate', skills: { technical: 0.76, communication: 0.74, leadership: 0.6 }, gaps: ['Stochastic Calculus'], strengths: ['Portfolio Theory'], attendance: 0.88, minutesTardy: 12, lastCheckIn: '08:48', geoFlags: 0 },
  { id: 's06', name: 'Dario Esposito',     program: 'BS Computer Science',       year: 'Y3', gpa: 2.91, velocity: 0.34, trend: [0.55, 0.5, 0.46, 0.42, 0.38, 0.34], risk: 'critical', skills: { technical: 0.62, communication: 0.6, leadership: 0.42 }, gaps: ['Algorithms II', 'Time Mgmt'], strengths: ['Debugging'], attendance: 0.71, minutesTardy: 74, lastCheckIn: '09:28', geoFlags: 3 },
  { id: 's07', name: 'Liang Chen',         program: 'MS Robotics',                year: 'Y1', gpa: 3.84, velocity: 0.86, trend: [0.7, 0.74, 0.78, 0.82, 0.84, 0.86], risk: 'low',     skills: { technical: 0.88, communication: 0.66, leadership: 0.58 }, gaps: ['Computer Vision'], strengths: ['Control Systems'], attendance: 0.94, minutesTardy: 6,  lastCheckIn: '08:39', geoFlags: 0 },
  { id: 's08', name: 'Naomi Okafor',       program: 'BS Bioinformatics',         year: 'Y2', gpa: 3.48, velocity: 0.67, trend: [0.66, 0.68, 0.65, 0.66, 0.67, 0.67], risk: 'moderate', skills: { technical: 0.79, communication: 0.81, leadership: 0.7 }, gaps: ['Graph Algorithms'], strengths: ['Genomics Pipelines'], attendance: 0.9, minutesTardy: 14, lastCheckIn: '08:51', geoFlags: 0 },
  { id: 's09', name: 'Mateo Reyes',        program: 'MS Cryptography',           year: 'Y2', gpa: 3.72, velocity: 0.78, trend: [0.66, 0.69, 0.72, 0.75, 0.77, 0.78], risk: 'low',     skills: { technical: 0.86, communication: 0.62, leadership: 0.5 }, gaps: ['Lattice Crypto'], strengths: ['Number Theory'], attendance: 0.93, minutesTardy: 8,  lastCheckIn: '08:44', geoFlags: 0 },
  { id: 's10', name: 'Hana Yusupova',      program: 'BS Software Engineering',   year: 'Y4', gpa: 3.18, velocity: 0.49, trend: [0.62, 0.58, 0.55, 0.52, 0.5, 0.49], risk: 'elevated', skills: { technical: 0.7, communication: 0.68, leadership: 0.64 }, gaps: ['Distributed Systems', 'DevOps'], strengths: ['UX Research'], attendance: 0.83, minutesTardy: 30, lastCheckIn: '09:11', geoFlags: 1 },
  { id: 's11', name: 'Eleanor Whitfield',  program: 'MS Applied Math',           year: 'Y1', gpa: 3.95, velocity: 0.96, trend: [0.84, 0.88, 0.91, 0.93, 0.95, 0.96], risk: 'low',     skills: { technical: 0.92, communication: 0.83, leadership: 0.72 }, gaps: [], strengths: ['PDE', 'Functional Analysis'], attendance: 0.98, minutesTardy: 0,  lastCheckIn: '08:33', geoFlags: 0 },
  { id: 's12', name: 'Rafael Castellanos', program: 'BS Data Engineering',       year: 'Y3', gpa: 3.05, velocity: 0.42, trend: [0.58, 0.54, 0.5, 0.46, 0.43, 0.42], risk: 'critical', skills: { technical: 0.66, communication: 0.58, leadership: 0.46 }, gaps: ['Stream Processing', 'SQL Tuning'], strengths: ['ETL Design'], attendance: 0.74, minutesTardy: 66, lastCheckIn: '09:21', geoFlags: 2 },
]

// Localized display names used throughout the student dashboard.
const indianStudentNames = {
  s01: 'Aarav Sharma', s02: 'Ananya Iyer', s03: 'Priya Anand', s04: 'Kavya Reddy',
  s05: 'Rohan Mehta', s06: 'Vikram Singh', s07: 'Meera Nair', s08: 'Ishita Gupta',
  s09: 'Arjun Patel', s10: 'Sneha Kulkarni', s11: 'Aditya Rao', s12: 'Nandini Das',
}

students.forEach((student) => { student.name = indianStudentNames[student.id] })

export const courses = [
  { id: 'c01', code: 'CS-547', name: 'Advanced Linear Algebra',           instructor: 'Professor Ishaan Nair', credits: 4, enrollment: 24, color: 'sage' },
  { id: 'c02', code: 'CS-612', name: 'Quantum Cryptography Simulation',  instructor: 'Dr. Amara Vance',       credits: 3, enrollment: 18, color: 'terra' },
  { id: 'c03', code: 'DS-501', name: 'Causal Inference & Experimentation', instructor: 'Dr. Priya Anand',     credits: 3, enrollment: 22, color: 'sage' },
  { id: 'c04', code: 'RO-410', name: 'Nonlinear Control Systems',         instructor: 'Professor Liang Chen', credits: 4, enrollment: 16, color: 'terra' },
  { id: 'c05', code: 'MA-688', name: 'Functional Analysis Seminar',       instructor: 'Professor Eleanor Whitfield', credits: 3, enrollment: 12, color: 'sage' },
]

export const gradebook = [
  { studentId: 's01', course: 'CS-547', projects: 92, midterms: 88, labs: 95, participation: 90 },
  { studentId: 's02', course: 'CS-547', projects: 74, midterms: 71, labs: 78, participation: 65 },
  { studentId: 's03', course: 'DS-501', projects: 96, midterms: 94, labs: 97, participation: 95 },
  { studentId: 's04', course: 'CS-547', projects: 71, midterms: 68, labs: 76, participation: 62 },
  { studentId: 's05', course: 'CS-612', projects: 84, midterms: 80, labs: 86, participation: 82 },
  { studentId: 's06', course: 'CS-547', projects: 58, midterms: 52, labs: 64, participation: 48 },
  { studentId: 's07', course: 'RO-410', projects: 90, midterms: 86, labs: 92, participation: 84 },
  { studentId: 's08', course: 'DS-501', projects: 82, midterms: 79, labs: 85, participation: 88 },
  { studentId: 's09', course: 'CS-612', projects: 88, midterms: 85, labs: 90, participation: 80 },
  { studentId: 's10', course: 'CS-547', projects: 70, midterms: 66, labs: 74, participation: 72 },
  { studentId: 's11', course: 'MA-688', projects: 98, midterms: 96, labs: 99, participation: 94 },
  { studentId: 's12', course: 'CS-547', projects: 62, midterms: 58, labs: 66, participation: 55 },
]

export const weights = { projects: 0.4, midterms: 0.3, labs: 0.2, participation: 0.1 }

export const recoveryPathways = [
  { id: 'rp1', label: 'Assigned Peer Tutoring', detail: 'Pair with cohort peer for 2 weekly sessions' },
  { id: 'rp2', label: 'Module 3 Recovery Sprint', detail: 'Targeted problem set + concept review' },
  { id: 'rp3', label: 'Office Hours Intensive', detail: '3 consecutive sessions with faculty' },
  { id: 'rp4', label: 'Asynchronous Bridge Pack', detail: 'Self-paced recordings + reflection memo' },
  { id: 'rp5', label: 'Lab Partner Reassignment', detail: 'Restructure pair programming rotation' },
]

export const schedule = [
  { id: 'ev1', day: 'Mon', start: '08:30', end: '10:00', title: 'CS-547 Lecture',  type: 'lecture',  room: 'Whitman 214',  attendees: 24 },
  { id: 'ev2', day: 'Mon', start: '10:30', end: '12:00', title: 'Office Hours',     type: 'office',   room: 'Faculty 312', attendees: 0 },
  { id: 'ev3', day: 'Mon', start: '13:00', end: '14:30', title: '1:1 — Dario E.',  type: 'mentor',   room: 'Studio B',    attendees: 1 },
  { id: 'ev4', day: 'Mon', start: '15:00', end: '17:00', title: 'CS-612 Lab',      type: 'lab',      room: 'Quantum Lab', attendees: 18 },
  { id: 'ev5', day: 'Tue', start: '09:00', end: '10:30', title: 'DS-501 Lecture',  type: 'lecture',  room: 'Whitman 110', attendees: 22 },
  { id: 'ev6', day: 'Tue', start: '11:00', end: '12:30', title: 'Faculty Council',  type: 'meeting',  room: 'Senate 4',    attendees: 9 },
  { id: 'ev7', day: 'Tue', start: '14:00', end: '15:30', title: '1:1 — Hana Y.',   type: 'mentor',   room: 'Studio B',    attendees: 1 },
  { id: 'ev8', day: 'Wed', start: '08:30', end: '10:00', title: 'CS-547 Lecture',  type: 'lecture',  room: 'Whitman 214',  attendees: 24 },
  { id: 'ev9', day: 'Wed', start: '10:00', end: '12:00', title: 'RO-410 Lab',     type: 'lab',      room: 'Robotics Bay', attendees: 16 },
  { id: 'ev10', day: 'Wed', start: '13:30', end: '15:00', title: 'Office Hours',  type: 'office',   room: 'Faculty 312', attendees: 0 },
  { id: 'ev11', day: 'Wed', start: '15:30', end: '17:00', title: 'MA-688 Seminar', type: 'lecture',  room: 'Whitman 401',  attendees: 12 },
  { id: 'ev12', day: 'Thu', start: '09:00', end: '10:30', title: 'DS-501 Lecture', type: 'lecture', room: 'Whitman 110',  attendees: 22 },
  { id: 'ev13', day: 'Thu', start: '11:00', end: '12:30', title: '1:1 — Theo M.', type: 'mentor',   room: 'Studio B',    attendees: 1 },
  { id: 'ev14', day: 'Thu', start: '14:00', end: '16:00', title: 'CS-612 Lab',    type: 'lab',      room: 'Quantum Lab', attendees: 18 },
  { id: 'ev15', day: 'Fri', start: '08:30', end: '10:00', title: 'CS-547 Recitation', type: 'lecture', room: 'Whitman 214', attendees: 24 },
  { id: 'ev16', day: 'Fri', start: '10:30', end: '12:00', title: 'Office Hours',  type: 'office',   room: 'Faculty 312', attendees: 0 },
  { id: 'ev17', day: 'Fri', start: '13:00', end: '16:00', title: 'Grading Block', type: 'block',    room: 'Faculty 312', attendees: 0 },
]

export const attendanceLog = [
  { studentId: 's01', date: '2026-07-19', status: 'present',  tardy: 0 },
  { studentId: 's02', date: '2026-07-19', status: 'tardy',    tardy: 14 },
  { studentId: 's03', date: '2026-07-19', status: 'present',  tardy: 0 },
  { studentId: 's04', date: '2026-07-19', status: 'excused',  tardy: 0 },
  { studentId: 's05', date: '2026-07-19', status: 'present',  tardy: 0 },
  { studentId: 's06', date: '2026-07-19', status: 'unexcused', tardy: 0 },
  { studentId: 's07', date: '2026-07-19', status: 'present',  tardy: 0 },
  { studentId: 's08', date: '2026-07-19', status: 'present',  tardy: 4 },
  { studentId: 's09', date: '2026-07-19', status: 'present',  tardy: 0 },
  { studentId: 's10', date: '2026-07-19', status: 'tardy',    tardy: 11 },
  { studentId: 's11', date: '2026-07-19', status: 'present',  tardy: 0 },
  { studentId: 's12', date: '2026-07-19', status: 'unexcused', tardy: 0 },
]

// Suspicious consecutive check-ins (geo-proxy simulation)
export const geoFlagLog = [
  { studentId: 's02', date: '2026-07-17', time: '08:58', location: 'Whitman 214', ip: '10.4.22.18',  prevIp: '10.4.22.18', gap: '00:00:00', note: 'Identical IP, 2 min after prior check-in from off-campus subnet' },
  { studentId: 's04', date: '2026-07-18', time: '09:01', location: 'Whitman 214', ip: '172.16.9.4',  prevIp: '10.4.22.18', gap: '00:00:14', note: 'Rapid subnet hop — Whitman to off-campus in 14s' },
  { studentId: 's06', date: '2026-07-19', time: '09:28', location: 'Whitman 214', ip: '10.4.22.18',  prevIp: '10.4.22.18', gap: '00:00:02', note: 'Back-to-back check-in — proxy pattern suspected' },
  { studentId: 's10', date: '2026-07-18', time: '09:11', location: 'Whitman 214', ip: '198.51.10.2', prevIp: '10.4.22.18', gap: '00:00:09', note: 'External relay IP within seconds of campus check-in' },
  { studentId: 's12', date: '2026-07-19', time: '09:21', location: 'Whitman 214', ip: '10.4.22.18',  prevIp: '198.51.10.2', gap: '00:00:05', note: 'Two-device simultaneous check-in flagged' },
]

export const peerSkillCatalog = [
  'Technical Writing', 'Distributed Systems', 'Numerical Methods', 'Public Speaking',
  'Causal Inference', 'Optics Lab', 'Team Facilitation', 'Stochastic Calculus',
  'Algorithms II', 'Time Mgmt', 'Computer Vision', 'Graph Algorithms',
  'Lattice Crypto', 'DevOps', 'Stream Processing', 'SQL Tuning',
]

export const riskLabels = {
  low: { label: 'Steady', tone: 'sage' },
  moderate: { label: 'Watch', tone: 'sage' },
  elevated: { label: 'Elevated', tone: 'terra' },
  critical: { label: 'Critical', tone: 'terra' },
}
