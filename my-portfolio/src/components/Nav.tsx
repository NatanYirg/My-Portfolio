import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack',    label: 'Stack' },
  { href: '#contact',  label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  // Track which section is in view
  useEffect(() => {
    const ids = ['home', 'projects', 'stack', 'contact']
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current + 2
      const isScrollingUp = currentScrollY < lastScrollY.current - 2

      if (currentScrollY <= 8 || isScrollingUp) {
        setHidden(false)
      } else if (isScrollingDown) {
        setHidden(true)
      }

      lastScrollY.current = currentScrollY
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (hidden) setOpen(false)
  }, [hidden])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleClick = (href: string) => {
    setActive(href)
    setOpen(false)
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`nav ${hidden ? 'nav-hidden' : ''}`}>
        <a href="#home" className="nav-logo" onClick={() => handleClick('#home')}>
          <div className="nav-logo-mark">{'</>'}</div>
          <span>NatanYirg</span>
        </a>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href ? 'active' : ''}
                onClick={e => { e.preventDefault(); handleClick(l.href) }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <a href="#contact" className="btn btn-primary nav-hire-btn"
            onClick={e => { e.preventDefault(); handleClick('#contact') }}>
            Hire Me
          </a>
          <button className={`nav-burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen(o => !o)} aria-label="Toggle navigation">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="nav-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} onClick={() => setOpen(false)} />

            <motion.div className="nav-drawer"
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
              <ul className="nav-drawer-links">
                {links.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <a href={l.href} className={active === l.href ? 'active' : ''}
                      onClick={e => { e.preventDefault(); handleClick(l.href) }}>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="nav-drawer-footer">
                <a href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
                  onClick={e => { e.preventDefault(); handleClick('#contact') }}>
                  Hire Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
