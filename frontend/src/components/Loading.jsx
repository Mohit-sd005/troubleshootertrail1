export default function Loading({ size = 'md' }) {
  const px = size === 'sm' ? 16 : size === 'lg' ? 48 : 28
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 12 }}>
      <div className="spinner" style={{ width: px, height: px }} aria-hidden />
    </div>
  )
}

export function LoadingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
      <Loading size="lg" />
      <p className="muted" style={{ marginTop: 12 }}>Loading...</p>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="card" style={{ opacity: 0.85 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <div style={{ height: 18, background: '#eee', borderRadius: 6, width: '25%', marginBottom: 12 }}></div>
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ height: 12, background: '#eee', borderRadius: 6, width: '75%' }}></div>
            <div style={{ height: 12, background: '#eee', borderRadius: 6, width: '50%' }}></div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ height: 32, background: '#eee', borderRadius: 8, width: 96, marginBottom: 8 }}></div>
          <div style={{ height: 18, background: '#eee', borderRadius: 6, width: 80 }}></div>
        </div>
      </div>
    </div>
  )
}