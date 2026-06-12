import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const codespaceName = (import.meta.env.VITE_CODESPACE_NAME || '').trim()
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const apiBase = `${apiHost}/api`
const apiNote = codespaceName
  ? `Using Codespaces API host: ${apiBase}`
  : `VITE_CODESPACE_NAME is not set. Falling back to ${apiBase}. Define VITE_CODESPACE_NAME in .env.local for GitHub Codespaces.`

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-2">Octofit Tracker</h1>
        <p className="text-muted">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when running
          in GitHub Codespaces.
        </p>
        <p className="small text-secondary">{apiNote}</p>
        <nav className="nav nav-pills gap-2 flex-wrap">
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/users">
            Users
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/teams">
            Teams
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/activities">
            Activities
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/workouts">
            Workouts
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users apiBase={apiBase} />} />
          <Route path="/teams" element={<Teams apiBase={apiBase} />} />
          <Route path="/activities" element={<Activities apiBase={apiBase} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
          <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
