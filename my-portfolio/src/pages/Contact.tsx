import { motion } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/* Magnet wrapper reused here too */
function MagnetCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.25)
  }, [x, y])

  const onLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={`card ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}

const socials = [
  {
    name: 'GitHub', desc: 'Check out my open-source work',
    color: 'var(--text-heading)', bg: 'rgba(255,255,255,0.06)', href: 'https://github.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>,
  },
  {
    name: 'LinkedIn', desc: 'Connect professionally',
    color: '#0a66c2', bg: 'rgba(10,102,194,0.1)', href: 'https://linkedin.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    name: 'Twitter / X', desc: 'Thoughts on tech & design',
    color: 'var(--text-heading)', bg: 'rgba(255,255,255,0.06)', href: 'https://x.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
]

type FormState = { name: string; email: string; subject: string; message: string }

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const isFocused = (f: string) => focused === f

  return (
    <div className="page">
      <div className="section">
        {/* Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-mono">// get in touch</p>
          <h1 className="heading-lg">
            Let's Build<br /><span className="text-gradient">Something Great</span>
          </h1>
          <p className="contact-header-sub">
            Open to full-time roles, freelance projects, and interesting collaborations.
            Drop me a message and I'll get back within 24 hours.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* LEFT col */}
          <div className="contact-left">
            {/* Email */}
            <MagnetCard>
              <p className="text-mono mb-12">// direct email</p>
              <a href="mailto:hello@yourname.dev" className="contact-email-link">
                <div className="contact-email-icon">✉️</div>
                hello@yourname.dev
              </a>
            </MagnetCard>

            {/* Availability */}
            <MagnetCard>
              <div className="avail-header">
                <span className="status-dot" />
                <span className="avail-label">Available Now</span>
              </div>
              <p className="avail-body">
                Currently open to full-time software engineering and design roles.
                Freelance projects welcome too.
              </p>
              <div className="avail-list">
                {['Full-time roles', 'Freelance / Contract', 'Open source collab', 'Design projects'].map(item => (
                  <div key={item} className="avail-item">
                    <span className="avail-check">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </MagnetCard>

            {/* Socials */}
            <div>
              <p className="text-mono mb-12">// find me on</p>
              <div className="socials-list">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ background: s.bg }}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    whileHover={{ x: 4 }}
                  >
                    <span style={{ color: s.color, flexShrink: 0 }}>{s.icon}</span>
                    <div className="social-text">
                      <div className="social-name">{s.name}</div>
                      <div className="social-desc">{s.desc}</div>
                    </div>
                    <span className="social-arrow">→</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <motion.div
            className="card contact-form-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            <p className="text-mono mb-8">// send a message</p>
            <h2 className="heading-sm mb-28">Start a Conversation</h2>

            {sent ? (
              <motion.div
                className="form-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="form-success-icon">🎉</div>
                <h3 className="form-success-title">Message Sent!</h3>
                <p className="form-success-sub">I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      required
                      className={`form-input ${isFocused('name') ? 'focused' : ''}`}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      required
                      className={`form-input ${isFocused('email') ? 'focused' : ''}`}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    required
                    className={`form-input ${isFocused('subject') ? 'focused' : ''}`}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                    rows={5}
                    className={`form-input form-textarea ${isFocused('message') ? 'focused' : ''}`}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary form-submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(99,179,237,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message <span>→</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
