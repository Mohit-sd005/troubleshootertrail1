import { useEffect, useState } from 'react'
import { AdsAPI } from '../api'
import { Link } from 'react-router-dom'
import AdCard from '../components/AdCard'

export default function ClientDashboard() {
  const user = JSON.parse(localStorage.getItem('ts_user') || 'null')
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const res = await AdsAPI.mine(user.id)
    setAds(res.data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <div className="card">Loading ads…</div>

  return (
    <div>
      <div className="row mb16">
        <Link to="/client/create" className="btn">
          + Create New Ad
        </Link>
      </div>
      <div className="grid">
        {ads.length === 0 && <div className="card">No ads yet.</div>}
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard ad={ad} />
            {ad.status === 'ACTIVE' ? (
              <div className="mt8 row">
                <Link to={`/client/edit/${ad.id}`} className="btn light">
                  Edit
                </Link>
                <Link to={`/client/acceptors/${ad.id}`} className="btn light">
                  View Acceptors
                </Link>
              </div>
            ) : (
              <div className="mt8 badge">This ad has been deleted.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
