import { useRef, useCallback } from 'react'

/**
 * Returns event handlers that apply a magnetic "anti-gravity" translation
 * to an element when hovered, then smoothly snaps back on leave.
 */
export function useMagnet(strength = 0.35) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      el.style.transform = `translate(${dx}px, ${dy}px)`
      el.style.transition = 'transform 0.15s ease-out'
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
