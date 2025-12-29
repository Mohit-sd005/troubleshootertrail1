import { useRef, useEffect } from 'react'

export default function AutoTextarea({ value, onChange, placeholder }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = 'auto'
    ref.current.style.height = ref.current.scrollHeight + 'px'
  }, [value])

  return (
    <div className="relative">
      <textarea
        ref={ref}
        className="textarea"
        aria-label={placeholder || 'text input'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={1}
        style={{ overflow: 'hidden', resize: 'none', transition: 'box-shadow .12s ease' }}
      />
      <div className="absolute bottom-2 right-2 text-xs muted">{(value || '').length} characters</div>
    </div>
  )
}
