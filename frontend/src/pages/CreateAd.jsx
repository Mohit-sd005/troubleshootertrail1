import { useState } from 'react'
import { AdsAPI } from '../api'
import { useNavigate } from 'react-router-dom'
import AutoTextarea from '../components/AutoTextarea'

export default function CreateAd() {
  const user = JSON.parse(localStorage.getItem('ts_user') || 'null')
  const nav = useNavigate()
  const [fullDescription, setFullDescription] = useState('')
  const [githubLinks, setGithubLinks] = useState('')
  const [requirements, setRequirements] = useState('')
  const [cost, setCost] = useState(0)

  const submit = async (e) => {
    e.preventDefault()
    try {
      const payload = { clientId: user.id, fullDescription, githubLinks, requirements, cost }
      await AdsAPI.create(payload)
      alert('Ad created!')
      nav('/client')
    } catch (e) {
      alert('Failed: ' + (e.response?.data || e.message))
    }
  }

  return (
    <div className="card">
      <h2>Create Ad</h2>
      <form onSubmit={submit} className="grid mt16">
        <label className="label">Full Description</label>
        <AutoTextarea value={fullDescription} onChange={setFullDescription} placeholder="Type your requirements, GitHub repos, details..." />

        <label className="label">GitHub Links</label>
        <input className="input" value={githubLinks} onChange={e=>setGithubLinks(e.target.value)} placeholder="https://github.com/..." />

        <label className="label">Requirements</label>
        <AutoTextarea value={requirements} onChange={setRequirements} placeholder="Required skills, constraints..." />

        <label className="label">Cost (INR)</label>
        <input type="number" className="input" value={cost} onChange={e=>setCost(Number(e.target.value || 0))} />

        <button className="btn mt16" type="submit">Submit</button>
      </form>
    </div>
  )
}
