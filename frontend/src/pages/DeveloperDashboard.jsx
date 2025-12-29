import { useEffect, useState } from 'react'
import { AdsAPI } from '../api'
import AdCard from '../components/AdCard'

export default function DeveloperDashboard() {
  const [ads, setAds] = useState([])
  const [q, setQ] = useState('')
  const [minCost, setMinCost] = useState('')
  const [maxCost, setMaxCost] = useState('')

  const load = async () => {
    const res = await AdsAPI.active()
    setAds(res.data || [])
  }

  const doSearch = async (e) => {
    e?.preventDefault()
    const res = await AdsAPI.search(q || undefined,
      minCost !== '' ? Number(minCost) : undefined,
      maxCost !== '' ? Number(maxCost) : undefined)
    setAds(res.data || [])
  }

  useEffect(()=>{ load() }, [])

  return (
    <>
      <form className="card grid grid-2 mb16" onSubmit={doSearch}>
        <div>
          <label className="label">Search text</label>
          <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="keywords…" />
        </div>
        <div className="grid grid-2">
          <div>
            <label className="label">Min cost</label>
            <input className="input" value={minCost} onChange={e=>setMinCost(e.target.value)} placeholder="e.g. 500" />
          </div>
          <div>
            <label className="label">Max cost</label>
            <input className="input" value={maxCost} onChange={e=>setMaxCost(e.target.value)} placeholder="e.g. 2000" />
          </div>
        </div>
        <div><button className="btn mt16" type="submit">Search</button></div>
      </form>

      <div className="grid">
        {ads.length === 0 && <div className="card">No matching ads.</div>}
        {ads.map(ad => <AdCard key={ad.id} ad={ad} />)}
      </div>
    </>
  )
}
