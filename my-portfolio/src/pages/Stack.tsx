import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useCallback } from 'react'
import { fadeUp, stagger } from '../lib/variants'

function MagnetCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.25)
  }, [x, y])
  const onLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])
  return (
    <motion.div ref={ref} className={`card ${className}`} style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >{children}</motion.div>
  )
}

type TechItem = { name: string; level: number; color: string; icon: string }

type Category = {
  title: string
  icon: string
  tagColor: string
  items: TechItem[]
}

const categories: Category[] = [
  {
    title: 'Languages',
    icon: '{ }',
    tagColor: 'var(--accent)',
    items: [
      { name: 'TypeScript', level: 95, color: '#3178c6', icon: 'TS' },
      { name: 'JavaScript', level: 95, color: '#f7df1e', icon: 'JS' },
      { name: 'Python', level: 88, color: '#3776ab', icon: 'PY' },
      { name: 'Rust', level: 65, color: '#ce422b', icon: 'RS' },
      { name: 'Java', level: 78, color: '#ed8b00', icon: 'JV' },
      { name: 'C/C++', level: 72, color: '#00599c', icon: 'C+' },
    ],
  },
  {
    title: 'Frontend',
    icon: '◻',
    tagColor: 'var(--accent-2)',
    items: [
      { name: 'React', level: 95, color: '#61dafb', icon: '⚛' },
      { name: 'Next.js', level: 88, color: '#ffffff', icon: 'N' },
      { name: 'Framer Motion', level: 82, color: '#ff4d4d', icon: 'FM' },
      { name: 'Tailwind CSS', level: 90, color: '#38bdf8', icon: 'TW' },
      { name: 'Three.js', level: 60, color: '#049ef4', icon: '3J' },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙',
    tagColor: 'var(--accent-3)',
    items: [
      { name: 'Node.js', level: 92, color: '#68a063', icon: 'ND' },
      { name: 'FastAPI', level: 85, color: '#009688', icon: 'FA' },
      { name: 'PostgreSQL', level: 88, color: '#336791', icon: 'PG' },
      { name: 'Redis', level: 80, color: '#dc382d', icon: 'RD' },
      { name: 'GraphQL', level: 75, color: '#e535ab', icon: 'GQ' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: '☁',
    tagColor: 'var(--accent-4)',
    items: [
      { name: 'Docker', level: 85, color: '#2496ed', icon: '🐳' },
      { name: 'AWS', level: 78, color: '#ff9900', icon: '☁' },
      { name: 'GitHub Actions', level: 82, color: '#2088ff', icon: 'GA' },
      { name: 'Kubernetes', level: 60, color: '#326ce5', icon: 'K8' },
      { name: 'Terraform', level: 55, color: '#7b42bc', icon: 'TF' },
    ],
  },
  {
    title: 'Design Tools',
    icon: '✦',
    tagColor: '#f687b3',
    items: [
      { name: 'Figma', level: 92, color: '#f24e1e', icon: '◈' },
      { name: 'Adobe XD', level: 80, color: '#ff61f6', icon: 'XD' },
      { name: 'Illustrator', level: 75, color: '#ff9a00', icon: 'Ai' },
      { name: 'Photoshop', level: 78, color: '#31a8ff', icon: 'Ps' },
      { name: 'Blender', level: 50, color: '#ea7600', icon: '🎲' },
    ],
  },
]

const tools = [
  { name: 'VS Code', icon: '💻' }, { name: 'Neovim', icon: '📝' },
  { name: 'Postman', icon: '📮' }, { name: 'TablePlus', icon: '🗄' },
  { name: 'Linear', icon: '📋' }, { name: 'Notion', icon: '📓' },
  { name: 'Warp', icon: '⚡' }, { name: 'Arc Browser', icon: '🌐' },
]

function SkillBar({ item, color }: { item: TechItem; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 6,
            background: `${item.color}22`,
            border: `1px solid ${item.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: item.color,
            fontFamily: 'var(--mono)',
          }}>
            {item.icon}
          </div>
          <span style={{ fontSize: 14, color: 'var(--text-heading)', fontWeight: 500 }}>{item.name}</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>{item.level}%</span>
      </div>
      <div style={{
        height: 4, borderRadius: 2,
        background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${item.level}%` : 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', borderRadius: 2, background: color }}
        />
      </div>
    </div>
  )
}

function CategoryCard({ cat }: { cat: Category }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <MagnetCard>
      <div ref={ref}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${cat.tagColor}18`,
              border: `1px solid ${cat.tagColor}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: cat.tagColor, fontFamily: 'var(--mono)', fontWeight: 700,
            }}>
              {cat.icon}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-heading)' }}>{cat.title}</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cat.items.map(item => (
              <SkillBar key={item.name} item={item} color={cat.tagColor} />
            ))}
          </div>
        </motion.div>
      </div>
    </MagnetCard>
  )
}

export default function Stack() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <div className="page">
      <div className="section">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={stagger}
          initial="hidden"
          animate={headerInView ? 'show' : 'hidden'}
          style={{ marginBottom: 64 }}
        >
          <motion.p variants={fadeUp} className="text-mono" style={{ marginBottom: 12 }}>// tech stack</motion.p>
          <motion.h1 variants={fadeUp} className="heading-lg" style={{ marginBottom: 16 }}>
            Tools &<br /><span className="text-gradient">Technologies</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'var(--text)', maxWidth: 480, lineHeight: 1.7 }}>
            A deep-dive into the languages, frameworks, and tools I use to build production-grade software and beautiful interfaces.
          </motion.p>
        </motion.div>

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
            marginBottom: 48,
          }}
        >
          {[
            { label: 'Languages', value: '6+', color: 'var(--accent)' },
            { label: 'Frameworks', value: '10+', color: 'var(--accent-2)' },
            { label: 'Tools', value: '20+', color: 'var(--accent-3)' },
            { label: 'Years Coding', value: '4+', color: 'var(--accent-4)' },
          ].map(s => (
            <div key={s.label} className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: -1, marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Categories grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginBottom: 48 }}>
          {categories.map(cat => (
            <CategoryCard key={cat.title} cat={cat} />
          ))}
        </div>

        {/* Daily tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <p className="text-mono" style={{ marginBottom: 8 }}>// daily drivers</p>
          <h3 className="heading-sm" style={{ marginBottom: 20 }}>Tools I Use Every Day</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {tools.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3, borderColor: 'var(--border-hover)' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 16px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  fontSize: 14, color: 'var(--text-heading)',
                  cursor: 'default', transition: 'var(--transition)',
                }}
              >
                <span>{t.icon}</span>
                <span>{t.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
