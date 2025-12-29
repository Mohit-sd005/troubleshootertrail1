import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AdsAPI, AcceptAPI } from '../api'

export default function ViewAd() {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('ts_user') || 'null')
  const [ad, setAd] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await AdsAPI.get(id)
        setAd(res.data)
      } catch (err) {
        console.error('Error fetching ad:', err)
      }
      setLoading(false)
    }
    load()
  }, [id])

  const accept = async () => {
    if (user.role !== 'DEVELOPER') {
      window.dispatchEvent(new CustomEvent('toast', { detail: 'Only developers can accept ads.' }))
      return
    }
    const res = await AcceptAPI.apply(id, user.id)
    window.dispatchEvent(new CustomEvent('toast', { detail: res.data }))
  }

  if (loading) return <div className="card">Loading…</div>
  if (!ad) return <div className="card">Ad not found.</div>

  return (
    <div className="card">
      <h2>Ad #{ad.id}</h2>

      <div className="mt8"><strong>Cost:</strong> ₹ {ad.cost}</div>

      <div className="mt16">
        <strong>Full Description</strong>
        <div className="mt8">{ad.fullDescription}</div>
      </div>

      <div className="mt16">
        <strong>GitHub Links</strong>
        <div className="mt8">
          {ad.githubLinks ? (
            <a href={ad.githubLinks} target="_blank" rel="noreferrer">{ad.githubLinks}</a>
          ) : (
            '-'
          )}
        </div>
      </div>

      <div className="mt16">
        <strong>Requirements</strong>
        <div className="mt8">{ad.requirements || '-'}</div>
      </div>

      {/* ✅ Show accept button only to developers and only for active ads */}
      {user.role === 'DEVELOPER' && ad.status === 'ACTIVE' && (
        <button className="btn mt16" onClick={accept}>Accept Job</button>
      )}

      {/* ✅ Clients just view the ad; no accept button */}
      {/* {user.role === 'CLIENT' && (
        <div className="mt16 badge">Clients can view their ads but cannot accept them.</div>
      )} */}
    </div>
  )
}
