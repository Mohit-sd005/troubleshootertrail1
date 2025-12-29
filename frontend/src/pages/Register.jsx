import { useState } from 'react'
import { AuthAPI } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'CLIENT', linkedinUrl:'' })
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await AuthAPI.register(form)
      if (typeof res.data === 'string' && res.data.includes('Email already')) {
        alert(res.data); return
      }
      alert('Registration successful!')
      nav('/login')
    } catch (e) {
      alert('Failed: ' + (e.response?.data || e.message))
    }
  }

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={submit} className="grid mt16">
        <label className="label">Name</label>
        <input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />

        <label className="label">Email</label>
        <input type="email" className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />

        <label className="label">Password</label>
        <input type="password" className="input" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />

        <label className="label">Role</label>
        <select className="select" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="CLIENT">CLIENT</option>
          <option value="DEVELOPER">DEVELOPER</option>
        </select>

        {form.role === 'DEVELOPER' && (
          <>
            <label className="label">LinkedIn URL (required for Developers)</label>
            <input className="input" value={form.linkedinUrl} onChange={e=>setForm({...form,linkedinUrl:e.target.value})} required />
          </>
        )}

        <button className="btn mt16" type="submit">Register</button>
      </form>
    </div>
  )
}
