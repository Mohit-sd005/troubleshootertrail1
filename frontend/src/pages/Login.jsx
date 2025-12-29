import { useState } from 'react'
import { AuthAPI } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await AuthAPI.login({ email, password })
      if (typeof res.data === 'string') { alert(res.data); return }
      localStorage.setItem('ts_user', JSON.stringify(res.data))
      if (res.data.role === 'CLIENT') nav('/client'); else nav('/developer')
    } catch (e) {
      alert('Login failed: ' + (e.response?.data || e.message))
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={submit} className="grid mt16">
        <label className="label">Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label className="label">Password</label>
        <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn mt16" type="submit">Login</button>
      </form>
    </div>
  )
}
