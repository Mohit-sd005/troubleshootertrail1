export default function Profile() {
  const u = JSON.parse(localStorage.getItem('ts_user') || 'null')
  if (!u) return <div className="card">Not logged in</div>
  return (
    <div className="card">
      <h2>Profile</h2>
      <div className="mt16"><strong>Name:</strong> {u.name}</div>
      <div className="mt8"><strong>Email:</strong> {u.email}</div>
      <div className="mt8"><strong>Role:</strong> {u.role}</div>
      {u.role === 'DEVELOPER' && (
        <div className="mt8"><strong>LinkedIn:</strong> {u.linkedinUrl ? <a href={u.linkedinUrl} target="_blank">Open</a> : '-'}</div>
      )}
      {/* <div className="mt16 badge">Deleted ads cannot be edited or viewed for acceptors.</div> */}
    </div>
  )
}
