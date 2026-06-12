import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const apiNote = codespaceName
  ? `Using Codespaces host: ${apiHost}`
  : 'VITE_CODESPACE_NAME is not set, falling back to http://localhost:8000'

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
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
          <NavLink className="nav-link" to="/teams">
            Teams
          </NavLink>
          <NavLink className="nav-link" to="/activities">
            Activities
          </NavLink>
          <NavLink className="nav-link" to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className="nav-link" to="/workouts">
            Workouts
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/users" element={<Users apiHost={apiHost} />} />
          <Route path="/teams" element={<Teams apiHost={apiHost} />} />
          <Route path="/activities" element={<Activities apiHost={apiHost} />} />
          <Route path="/leaderboard" element={<Leaderboard apiHost={apiHost} />} />
          <Route path="/workouts" element={<Workouts apiHost={apiHost} />} />
          <Route path="*" element={<Users apiHost={apiHost} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
