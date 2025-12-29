import { useEffect, useState } from 'react'

const getToastConfig = (msg) => {
  if (typeof msg === 'string') {
    return { type: 'info', message: msg }
  }
  return msg
}

export default function ToastHost() {
  const [toast, setToast] = useState(null)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const handleToast = (e) => {
      const config = getToastConfig(e.detail)
      setToast(config)
      setHiding(false)
      // hide after 3s
      setTimeout(() => {
        setHiding(true)
        setTimeout(() => setToast(null), 300)
      }, 3000)
    }
    window.addEventListener('toast', handleToast)
    return () => window.removeEventListener('toast', handleToast)
  }, [])

  if (!toast) return null

  const cls = `toast ${toast.type === 'success' ? 'success' : toast.type === 'error' ? 'error' : ''} ${hiding ? 'toast--hide' : ''}`.trim()

  return (
    <div className={cls} role="status" aria-live="polite">
      <span style={{ display: 'inline-block', marginRight: 8 }}>{/* space for an icon */}</span>
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  )
}
