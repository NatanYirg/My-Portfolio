import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import { fadeUp, staggerFast } from '../lib/variants'

function MagnetCard({ children, className = '', style = {}, onHoverStart, onHoverEnd }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties
  onHoverStart?: () => void; onHoverEnd?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }, [x, y])
  const onLeave = useCallback(() => { x.set(0); y.set(0); onHoverEnd?.() }, [x, y, onHoverEnd])
  return (
    <motion.div ref={ref} className={className} style={{ ...style, x: sx, y: sy }}
      variants={fadeUp} onMouseMove={onMove} onMouseLeave={onLeave}
      onHoverStart={onHoverStart}
    >{children}</motion.div>
  )
}

type Project = {
  title: string
  desc: string
  long: string
  tags: string[]
  tagColor: string
  tech: string[]
  year: string
  link?: string
  featured?: boolean
  emoji: string
}

const projects: Project[] = [
  {
    title: 'CloudSync API',
    desc: 'Distributed file synchronization service',
    long: 'A high-performance REST API for real-time file sync across devices. Built with Node.js, Redis pub/sub, and S3-compatible storage. Handles 10k+ concurrent connections.',
    tags: ['Backend', 'Systems'],
    tagColor: 'tag-blue',
    tech: ['Node.js', 'Redis', 'PostgreSQL', 'Docker', 'AWS S3'],
    year: '2024',
    featured: true,
    emoji: '☁️',
  },
  {
    title: 'DesignKit UI',
    desc: 'Open-source React component library',
    long: 'A fully accessible, themeable component library with 40+ components. Built with React, TypeScript, and CSS custom properties. Includes Storybook docs and Figma kit.',
    tags: ['Frontend', 'Design'],
    tagColor: 'tag-purple',
    tech: ['React', 'TypeScript', 'Storybook', 'Figma', 'CSS'],
    year: '2024',
    featured: true,
    emoji: '🎨',
  },
  {
    title: 'DataFlow ML',
    desc: 'Real-time analytics & ML pipeline',
    long: 'End-to-end machine learning pipeline for streaming data. Ingests events via Kafka, processes with Apache Spark, and serves predictions through a FastAPI endpoint.',
    tags: ['ML/AI', 'Data'],
    tagColor: 'tag-green',
    tech: ['Python', 'Kafka', 'Spark', 'FastAPI', 'TensorFlow'],
    year: '2023',
    featured: true,
    emoji: '📊',
  },
  {
    title: 'TaskFlow App',
    desc: 'Collaborative project management tool',
    long: 'A Notion-inspired productivity app with real-time collaboration, drag-and-drop boards, and rich text editing. Built with React, Socket.io, and MongoDB.',
    tags: ['Full-stack', 'SaaS'],
    tagColor: 'tag-orange',
    tech: ['React', 'Socket.io', 'MongoDB', 'Express'],
    year: '2023',
    emoji: '✅',
  },
  {
    title: 'BrandForge',
    desc: 'AI-powered brand identity generator',
    long: 'Generates complete brand identities — logos, color palettes, typography — using generative AI. Integrates with Stable Diffusion and exports to Figma.',
    tags: ['Design', 'AI'],
    tagColor: 'tag-purple',
    tech: ['Python', 'Stable Diffusion', 'React', 'Figma API'],
    year: '2023',
    emoji: '✨',
  },
  {
    title: 'SecureVault',
    desc: 'Zero-knowledge password manager',
    long: 'Client-side encrypted password manager with zero-knowledge architecture. AES-256 encryption, biometric auth, and browser extension support.',
    tags: ['Security', 'Systems'],
    tagColor: 'tag-blue',
    tech: ['Rust', 'WebAssembly', 'React', 'IndexedDB'],
    year: '2022',
    emoji: '🔐',
  },
]

const filters = ['All', 'Frontend', 'Backend', 'Full-stack', 'Design', 'ML/AI', 'Systems', 'Security']

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(active))

  return (
    <div className="page">
      <div className="section">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 56 }}
        >
          <p className="text-mono" style={{ marginBottom: 12 }}>// my work</p>
          <h1 className="heading-lg" style={{ marginBottom: 16 }}>
            Projects &<br /><span className="text-gradient">Case Studies</span>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text)', maxWidth: 480, lineHeight: 1.7 }}>
            A curated selection of systems, apps, and experiments I've built — from backend infrastructure to polished UIs.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                padding: '6px 16px',
                borderRadius: 8,
                border: '1px solid',
                borderColor: active === f ? 'var(--accent)' : 'var(--border)',
                background: active === f ? 'var(--accent-glow)' : 'transparent',
                color: active === f ? 'var(--accent)' : 'var(--text)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'var(--font)',
                transition: 'var(--transition)',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          key={active}
          variants={staggerFast}
          initial="hidden"
          animate="show"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}
        >
          {filtered.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <MagnetCard
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: 28,
        cursor: 'pointer',
        transition: 'border-color var(--transition)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,179,237,0.08)' : undefined,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {p.featured && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(99,179,237,0.1)',
          border: '1px solid rgba(99,179,237,0.2)',
          borderRadius: 6, padding: '2px 8px',
          fontSize: 10, fontWeight: 700, color: 'var(--accent)',
          letterSpacing: 1, textTransform: 'uppercase',
        }}>
          Featured
        </div>
      )}

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24,
      }}>
        {p.emoji}
      </div>

      {/* Content */}
      <div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          {p.tags.map(t => (
            <span key={t} className={`tag ${p.tagColor}`}>{t}</span>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
            {p.year}
          </span>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 8, letterSpacing: -0.3 }}>
          {p.title}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65 }}>{p.long}</p>
      </div>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
        {p.tech.map(t => (
          <span key={t} style={{
            padding: '3px 9px', borderRadius: 6,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            fontSize: 11, color: 'var(--text-muted)',
            fontFamily: 'var(--mono)',
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Hover arrow */}
      <motion.div
        animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}
        style={{
          position: 'absolute', bottom: 24, right: 24,
          width: 32, height: 32, borderRadius: 8,
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0a0a0f', fontSize: 16, fontWeight: 700,
        }}
      >
        →
      </motion.div>
    </MagnetCard>
  )
}
