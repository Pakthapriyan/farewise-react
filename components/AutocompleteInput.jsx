import { useEffect, useRef, useState } from 'react'

export default function AutocompleteInput({
  value,
  onChange,
  placeholder = '',
  className = '',
  onSelect,
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const wrapRef = useRef(null)
  const abortRef = useRef(null)
  const [q, setQ] = useState(value || '')

  // Sync controlled value -> local
  useEffect(() => {
    setQ(value || '')
  }, [value])

  // Fetch suggestions (debounced)
  useEffect(() => {
    if (!q || q.trim().length < 2) {
      setItems([])
      setOpen(false)
      return
    }

    setLoading(true)
    const t = setTimeout(async () => {
      try {
        if (abortRef.current) abortRef.current.abort()
        abortRef.current = new AbortController()

        // Prefer Photon for CORS-friendly suggestions; fall back to Nominatim proxy
        const urls = [
          `https://photon.komoot.io/api/?limit=6&lang=en&q=${encodeURIComponent(q)}`,
          `/api/geocode?format=jsonv2&limit=6&countrycodes=in&q=${encodeURIComponent(q)}`,
        ]

        let results = []
        for (const url of urls) {
          try {
            const res = await fetch(url, { signal: abortRef.current.signal })
            if (!res.ok) continue
            const data = await res.json()
            if (Array.isArray(data?.features)) {
              // Photon
              results = data.features.map(f => ({
                id: f.properties?.osm_id || `${f.geometry?.coordinates?.join(',')}`,
                label: f.properties?.name || f.properties?.country || 'Unknown',
                subtitle: [f.properties?.city, f.properties?.state, f.properties?.country]
                  .filter(Boolean).join(', '),
                lat: f.geometry?.coordinates?.[1],
                lon: f.geometry?.coordinates?.[0],
              }))
            } else if (Array.isArray(data)) {
              // Nominatim jsonv2
              results = data.map(it => ({
                id: it.place_id,
                label: it.display_name?.split(',')?.[0] || it.name || 'Unknown',
                subtitle: it.display_name,
                lat: parseFloat(it.lat),
                lon: parseFloat(it.lon),
              }))
            }
            if (results.length) break
          } catch (_) { /* try next */ }
        }

        setItems(results)
        setOpen(results.length > 0)
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => clearTimeout(t)
  }, [q])

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const handleSelect = (item) => {
    const v = `${item.label}`
    onChange?.({ target: { value: v } })
    onSelect?.(item)
    setQ(v)
    setOpen(false)
  }

  return (
    <div className="relative w-full" ref={wrapRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={q}
        onChange={(e) => { setQ(e.target.value); onChange?.(e); }}
        onFocus={() => { if (items.length) setOpen(true) }}
        className={`px-4 py-2 border rounded w-full focus:outline-none ${className}`}
        autoComplete="off"
      />
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-auto">
          {loading && (
            <div className="px-3 py-2 text-sm text-gray-500">Searching…</div>
          )}
          {!loading && items.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">No matches</div>
          )}
          <ul>
            {items.map((it) => (
              <li key={it.id} className="border-b last:border-0 border-gray-100">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(it)}
                  className="w-full text-left px-3 py-2 hover:bg-orange-50 focus:bg-orange-50"
                >
                  <div className="text-sm text-gray-900 font-medium">{it.label}</div>
                  {it.subtitle && (
                    <div className="text-xs text-gray-500 truncate">{it.subtitle}</div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}