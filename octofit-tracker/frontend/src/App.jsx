import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { apiBaseUrl } from './config/apiBaseUrl'

const logo = new URL('../../../docs/octofitapp-small.png', import.meta.url).href

function HomePage() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-md-4 text-center text-md-start">
          <img src={logo} alt="Octofit logo" className="img-fluid" style={{ maxWidth: '180px' }} />
        </div>
        <div className="col-md-8">
          <h1 className="display-5 fw-bold">Octofit Tracker</h1>
          <p className="lead mb-0">
            Multi-tier fitness tracking with users, teams, activities, leaderboard, and workouts.
          </p>
        </div>
      </div>
    </div>
  )
}

function ApiPage() {
  const endpoints = [
    `${apiBaseUrl}/api/users/`,
    `${apiBaseUrl}/api/teams/`,
    `${apiBaseUrl}/api/activities/`,
    `${apiBaseUrl}/api/leaderboard/`,
    `${apiBaseUrl}/api/workouts/`,
  ]

  return (
    <div className="container pb-5">
      <h2 className="h3 mb-3">Available API Endpoints</h2>
      <div className="list-group">
        {endpoints.map((endpoint) => (
          <div key={endpoint} className="list-group-item">
            {endpoint}
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand border-bottom bg-white">
        <div className="container">
          <span className="navbar-brand fw-semibold">Octofit</span>
          <div className="navbar-nav gap-3">
            <NavLink to="/" end className="nav-link">Home</NavLink>
            <NavLink to="/api" className="nav-link">API</NavLink>
            <NavLink to="/activities" className="nav-link">Activities</NavLink>
            <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
            <NavLink to="/teams" className="nav-link">Teams</NavLink>
            <NavLink to="/users" className="nav-link">Users</NavLink>
            <NavLink to="/workouts" className="nav-link">Workouts</NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api" element={<ApiPage />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App
