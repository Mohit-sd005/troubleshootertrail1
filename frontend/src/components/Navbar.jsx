import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('ts_user') || 'null')

  const logout = () => {
    localStorage.removeItem('ts_user')
    navigate('/login')
  }

  const initials = user ? ( (user.name || user.email || '').split(' ').map(s=>s[0]).slice(0,2).join('') ) : ''

  return (
    <div className="header">
      <div className="container nav">
        <Link to="/" className="brand nav-item"><span className="nav brand">TroubleShooters</span></Link>
        <div className="spacer" />
        {user ? (
          <>
            <span className="badge" aria-hidden>{user.role}</span>
            {user.role === 'CLIENT' && <Link to="/client" className="btn light">My Ads</Link>}
            {user.role === 'DEVELOPER' && <Link to="/developer" className="btn light">Browse Ads</Link>}
            <Link to="/profile" className="btn light" aria-label="Profile">
              <span className="avatar" title={user.name || user.email}>{initials || 'U'}</span>
            </Link>
            <button className="btn" onClick={logout} aria-label="Logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn light">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </div>
  )
}
