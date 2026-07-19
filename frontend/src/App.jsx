import { useReducer, useState } from 'react'
import Sidebar, { MobileNav } from './components/Sidebar'
import HubDashboard from './views/HubDashboard'
import Attendance from './views/Attendance'
import Marks from './views/Marks'
import Schedule from './views/Schedule'
import StudentManagement from './views/StudentManagement'
import AcademicStaff from './views/AcademicStaff'
import Login from './views/Login'
import './App.css'

const TABS = {
  hub: HubDashboard,
  attendance: Attendance,
  marks: Marks,
  schedule: Schedule,
  students: StudentManagement,
  staff: AcademicStaff,
}

function tabReducer(state, action) {
  if (TABS[action]) return action
  return state
}

export default function App() {
  const [tab, dispatch] = useReducer(tabReducer, 'hub')
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shikshasetu_session')) } catch { return null }
  })
  const logout = () => { localStorage.removeItem('shikshasetu_session'); setSession(null); dispatch('hub') }
  if (!session?.account || !session?.token) return <Login onAuthenticated={setSession} />
  const View = TABS[tab]

  return (
    <div className="min-h-screen bg-canvas text-ink flex">
      <Sidebar active={tab} onChange={(id) => dispatch(id)} account={session.account} onLogout={logout} />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileNav active={tab} onChange={(id) => dispatch(id)} account={session.account} onLogout={logout} />
        <main className="flex-1 px-5 md:px-10 lg:px-14 py-8 md:py-12 max-w-[1400px] w-full mx-auto">
          <View />
        </main>
        <footer className="px-6 md:px-10 lg:px-14 py-6 border-t border-line text-[11px] text-ink-muted flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>ShikshaSetu · Student Growth &amp; Synergy Engine · Block VII</div>
          <div className="font-mono">build 2026.07 · editorial light theme</div>
        </footer>
      </div>
    </div>
  )
}
