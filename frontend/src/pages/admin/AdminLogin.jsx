import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('adminToken', data.token)
        navigate('/admin/dashboard')
      } else {
        setError('Incorrect password. Please try again.')
      }
    } catch {
      setError('Cannot connect to server. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-wrap">
      {/* Brand */}
      <div className="admin-login-brand">
        <div className="admin-brand-icon">SE</div>
        <h1>Systematics Education</h1>
        <p>Admin Portal</p>
      </div>

      {/* Card */}
      <div className="admin-login-card">
        <h2>Sign In</h2>
        <p className="admin-login-sub">Enter your admin password to continue.</p>

        {error && (
          <div className="admin-alert admin-alert-error">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="admin-login-hint">
          Default password: <code>systematics2025</code><br/>
          Change via <code>ADMIN_PASSWORD</code> in backend <code>.env</code>
        </p>
      </div>
    </div>
  )
}
