import { Link } from 'react-router-dom'

const statusStyles = {
  'OPEN': 'badge',
  'IN_PROGRESS': 'badge',
  'COMPLETED': 'badge',
  'DELETED': 'badge'
}

export default function AdCard({ ad }) {
  const preview =
    (ad.fullDescription || '').slice(0, 120) +
    ((ad.fullDescription || '').length > 120 ? '…' : '')

  return (
    <div className="card" style={{ width: '100%' }}>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div className="mb8"><strong>Ad #{ad.id}</strong></div>
          <div className="mb8 muted">{preview}</div>
          <div className="mt8"><span className="badge">Status: {ad.status}</span></div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="price">₹ {ad.cost}</div>
          <div className="muted">Budget</div>
        </div>
      </div>
      <div className="mt16" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to={`/ad/${ad.id}`} className="btn light">View Full Ad</Link>
        <div className="muted">Posted: {new Date(ad.createdAt || Date.now()).toLocaleDateString()}</div>
      </div>
    </div>
  )
}
