import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import ClientDashboard from './pages/ClientDashboard'
import CreateAd from './pages/CreateAd'
import EditAd from './pages/EditAd'
import DeveloperDashboard from './pages/DeveloperDashboard'
import ViewAd from './pages/ViewAd'
import ViewAcceptors from './pages/ViewAcceptors'
import Profile from './pages/Profile'
import ToastHost from './components/ToastHost'

// ======================= ROLE GUARDS =========================

// Require any logged-in user (either client or developer)
function RequireAuth({ children }) {
  const u = JSON.parse(localStorage.getItem('ts_user') || 'null')
  return u ? children : <Navigate to="/login" />
}

// Require only client
function RequireClient({ children }) {
  const u = JSON.parse(localStorage.getItem('ts_user') || 'null')
  if (!u) return <Navigate to="/login" />
  return u.role === 'CLIENT' ? children : <Navigate to="/developer" />
}

// Require only developer
function RequireDev({ children }) {
  const u = JSON.parse(localStorage.getItem('ts_user') || 'null')
  if (!u) return <Navigate to="/login" />
  return u.role === 'DEVELOPER' ? children : <Navigate to="/client" />
}

// ======================= APP ROUTES ==========================

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* CLIENT ROUTES */}
          <Route path="/client" element={<RequireClient><ClientDashboard /></RequireClient>} />
          <Route path="/client/create" element={<RequireClient><CreateAd /></RequireClient>} />
          <Route path="/client/edit/:id" element={<RequireClient><EditAd /></RequireClient>} />
          <Route path="/client/acceptors/:id" element={<RequireClient><ViewAcceptors /></RequireClient>} />

          {/* DEVELOPER ROUTES */}
          <Route path="/developer" element={<RequireDev><DeveloperDashboard /></RequireDev>} />

          {/* BOTH CLIENT + DEV can view full ad */}
          <Route path="/ad/:id" element={<RequireAuth><ViewAd /></RequireAuth>} />

          {/* COMMON ROUTES */}
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        </Routes>
      </div>
      <ToastHost />
    </>
  )
}
