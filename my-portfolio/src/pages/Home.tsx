import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef, useEffect, useState, useCallback } from 'react'
import { fadeUp, stagger, staggerFast } from '../lib/variants'
import heroImg from '../assets/PortfolioHeroImg1.JPG'

import Tibeb1 from '../assets/Tibeb1.png'
import DesignKit from '../assets/designkit1.jpg'
import CMS from '../assets/CMS.png'
import Bunna2 from '../assets/Bunna2.png'
import AddisAfrica from '../assets/AddisAfrica.png'
import Legehare from '../assets/Legehare.png'


/* ─────────────────────────────────────
   SHARED UTILITIES
───────────────────────────────────── */

function useMouseGlow(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const h = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mouse-x', `${e.clientX - r.left}px`)
      el.style.setProperty('--mouse-y', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', h)
    return () => el.removeEventListener('mousemove', h)
  }, [])
}

function ProjectImageSlider({ images, emoji }: { images: string[]; emoji: string }) {
  const [index, setIndex] = useState(0)

  if (!images || images.length === 0) {
    return <div className="proj-emoji">{emoji}</div>
  }

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIndex(i => (i - 1 + images.length) % images.length)
  }
  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIndex(i => (i + 1) % images.length)
  }

  return (
    <div className="proj-slider">
      <div className="proj-slider-track">
        {images.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            className="proj-slider-img"
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ position: i === 0 ? 'relative' : 'absolute' }}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button type="button" className="proj-slider-arrow proj-slider-arrow-left" onClick={prev} aria-label="Previous image">‹</button>
          <button type="button" className="proj-slider-arrow proj-slider-arrow-right" onClick={next} aria-label="Next image">›</button>
          <div className="proj-slider-dots">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`proj-slider-dot ${i === index ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIndex(i) }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function MagnetCard({ children, className = '', style = {}, strength = 0.3,
  onHoverStart, onHoverEnd, variants: v }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties
  strength?: number; onHoverStart?: () => void; onHoverEnd?: () => void
  variants?: Variants
}) {
  const ref = useRef<HTMLDivElement>(null)
  useMouseGlow(ref as React.RefObject<HTMLElement | null>)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }, [x, y, strength])
  const onLeave = useCallback(() => { x.set(0); y.set(0); onHoverEnd?.() }, [x, y, onHoverEnd])
  return (
    <motion.div ref={ref} className={`card ${className}`}
      style={{ ...style, x: sx, y: sy }}
      variants={v ?? fadeUp}
      onMouseMove={onMove} onMouseLeave={onLeave} onHoverStart={onHoverStart}>
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────
   SECTION DIVIDER
───────────────────────────────────── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="sp-divider">
      <div className="sp-divider-line" />
      <span className="sp-divider-label">{label}</span>
      <div className="sp-divider-line" />
    </div>
  )
}

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'C#', 'Figma', 'PostgreSQL', 'Docker']

const homeStats = [
  { value: '10+', label: 'Projects Shipped', icon: '🚀' },
  { value: '2+',  label: 'Years Experience',  icon: '⚡' },
  { value: '5+',  label: 'Technologies',       icon: '🛠' },
  { value: '100%',label: 'Passion for Code',   icon: '❤️' },
]

type Project = {
  title: string; desc: string; long: string; tags: string[]
  tagColor: string; tech: string[]; year: string; featured?: boolean; emoji: string
  images: string[]
}
const projects: Project[] = [
  
  { title: 'Customer Registration Site', desc: 'Collaborative project management tool',
    long: 'A simple Customer registration site with real-time customer tracking. Built with React and MongoDB.',
    tags: ['Full-stack','SaaS'], tagColor: 'tag-orange', tech: ['React','MongoDB','Express'], year: '2025', emoji: '✅' ,
    images: [AddisAfrica] },
  { title: 'Tibeb MarketPlace Environment', desc: 'Job searching and Job providing container',
    long: 'A high-performance REST API for real-time file sync across devices. Built with Node.js, Redis pub/sub, and S3-compatible storage. Handles 10k+ concurrent connections.',
    tags: ['Backend','Systems'], tagColor: 'tag-blue', tech: ['Node.js','Redis','PostgreSQL','Docker','AWS S3'], year: '2026', featured: true, emoji: '☁️',
    images: [Tibeb1] },
  { title: 'DesignKit UI', desc: 'Open-source React component library',
    long: 'A fully accessible, themeable component library with 40+ components. Built with React, TypeScript, and CSS custom properties. Includes Storybook docs and Figma kit.',
    tags: ['Frontend','Design'], tagColor: 'tag-purple', tech: ['React','TypeScript','Storybook','Figma','CSS'], year: '2024', featured: true, emoji: '🎨' ,
    images: [DesignKit] },
  { title: 'Creative Designs', desc: 'Creative Designs & UI',
    long: 'UI Design for an inspiring website, bunna, headquarter located in the UAE. ',
    tags: ['Graphics','Design'], tagColor: 'tag-green', tech: ['Photoshop','Adobe Illustrator','Canva','AfterEffect','Figma'], year: '2023', featured: true, emoji: '📊',
    images: [Bunna2] },
  { title: 'Legehare Trading PLC', desc: 'Informative website',
    long: 'Informative website for Legehare trading plc. Displays all feautred realestate products and helps to apply for job positions when any position is open.',
    tags: ['Full-Stack','Design'], tagColor: 'tag-purple', tech: ['Node.js','TypeScript','React','Figma'], year: '2025', emoji: '✨' ,
    images: [Legehare] },
  { title: 'CMS Dashboard', desc: 'Manager Dashboard',
    long: 'Full-Stack web app. Church Management System',
    tags: ['Full-Stack','System'], tagColor: 'tag-blue', tech: ['Rust','React','Typesript', 'NestJS'], year: '2026', emoji: '🔐',
    images: [CMS] },
]
const filters = ['All','Frontend','Backend','Full-stack','Design','Graphics','Systems','Security']

type TechItem = { name: string; level: number; color: string; icon: string }
type Category = { title: string; icon: string; tagColor: string; items: TechItem[] }
const categories: Category[] = [
  { title: 'Languages', icon: '{ }', tagColor: 'var(--accent)', items: [
    { name: 'TypeScript', level: 95, color: '#3178c6', icon: 'TS' },
    { name: 'JavaScript', level: 95, color: '#f7df1e', icon: 'JS' },
    { name: 'Python',     level: 88, color: '#3776ab', icon: 'PY' },
    { name: 'C#',       level: 65, color: '#ce422b', icon: 'RS' },
    { name: 'Java',       level: 78, color: '#ed8b00', icon: 'JV' },
    { name: 'C/C++',      level: 72, color: '#00599c', icon: 'C+' },
  ]},
  { title: 'Frontend', icon: '◻', tagColor: 'var(--accent-2)', items: [
    { name: 'React',         level: 95, color: '#61dafb', icon: '⚛' },
    { name: 'Next.js',       level: 88, color: '#ffffff', icon: 'N'  },
    { name: 'Framer Motion', level: 82, color: '#ff4d4d', icon: 'FM' },
    { name: 'Tailwind CSS',  level: 90, color: '#38bdf8', icon: 'TW' },
    { name: 'Three.js',      level: 60, color: '#049ef4', icon: '3J' },
  ]},
  { title: 'Backend', icon: '⚙', tagColor: 'var(--accent-3)', items: [
    { name: '.NET',    level: 92, color: '#68a063', icon: 'ND' },
    { name: 'Node.js',    level: 85, color: '#009688', icon: 'FA' },
    { name: 'PostgreSQL', level: 88, color: '#336791', icon: 'PG' },
    /* { name: 'Redis',      level: 80, color: '#dc382d', icon: 'RD' }, */
    /* { name: 'GraphQL',    level: 75, color: '#e535ab', icon: 'GQ' }, */
  ]},
  { title: 'DevOps & Cloud', icon: '☁', tagColor: 'var(--accent-4)', items: [
    { name: 'Docker',         level: 85, color: '#2496ed', icon: '🐳' },
    { name: 'AWS',            level: 78, color: '#ff9900', icon: '☁'  },
    { name: 'GitHub Actions', level: 82, color: '#2088ff', icon: 'GA' },
    { name: 'Kubernetes',     level: 60, color: '#326ce5', icon: 'K8' },
    /* { name: 'Terraform',      level: 55, color: '#7b42bc', icon: 'TF' }, */
  ]},
  { title: 'Design Tools', icon: '✦', tagColor: '#f687b3', items: [
    { name: 'Figma',       level: 90, color: '#f24e1e', icon: '◈'  },
    { name: 'Illustrator', level: 85, color: '#ff9a00', icon: 'Ai' },
    { name: 'Photoshop',   level: 95, color: '#31a8ff', icon: 'Ps' },
    { name: 'Blender',     level: 50, color: '#ea7600', icon: '🎲' },
  ]},
]
const tools = [
  { name: 'VS Code', icon: '💻' }, { name: 'Jira',      icon: '📝' },
  { name: 'Postman', icon: '📮' }, { name: 'TablePlus',   icon: '🗄'  },
  { name: 'Photoshop',  icon: '📋' }, { name: 'Notion',      icon: '📓' },
  { name: 'Visual Studio',    icon: '⚡'  }, { name: 'Brave Browser', icon: '🌐' },
]
const socials = [
  
  
  { name: 'GitHub',     desc: 'Check out my open-source work',    color: 'var(--text-heading)', bg: 'rgba(255,255,255,0.06)', href: 'https://github.com/NatanYirg',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
  { name: 'LinkedIn',   desc: 'Connect professionally',           color: '#0a66c2',              bg: 'rgba(10,102,194,0.1)',   href: 'https://www.linkedin.com/in/nathan-yirgalem-b59591291/',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  /* { name: 'Twitter / X',desc: 'Thoughts on tech & design',        color: 'var(--text-heading)', bg: 'rgba(255,255,255,0.06)', href: 'https://x.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> }, */
  { name: 'Facebook',  desc: 'Follow my updates',                color: '#1877f2',              bg: 'rgba(24,119,242,0.1)',  href: 'https://facebook.com/yourusername',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { name: 'Instagram', desc: 'Photos & behind the scenes',        color: '#e4405f',              bg: 'rgba(228,64,95,0.1)',   href: 'https://www.instagram.com/_.nnatann._/',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
  { name: 'Telegram',  desc: 'Chat with me directly',             color: '#26a5e4',              bg: 'rgba(38,165,228,0.1)',  href: 'https://t.me/@Natan_Yirgalem',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.18 1.896-.96 6.504-1.356 8.628-.168.9-.5 1.2-.816 1.236-.696.06-1.224-.46-1.896-.9-1.056-.696-1.656-1.128-2.676-1.8-1.188-.78-.42-1.212.264-1.908.18-.18 3.252-2.98 3.312-3.234a.243.243 0 0 0-.06-.216c-.066-.06-.168-.036-.24-.024-.108.024-1.788 1.14-5.04 3.348-.48.324-.912.486-1.296.48-.432-.012-1.248-.24-1.86-.444-.756-.252-1.344-.384-1.296-.816.024-.216.324-.432.888-.66 3.48-1.512 5.808-2.508 6.972-2.988 3.324-1.38 4.008-1.62 4.464-1.62.096 0 .324.024.468.144.12.096.156.228.168.324.012.096.024.276.012.408z"/></svg> },
  /* { name: 'Dribbble',   desc: 'Design work & visual experiments',  color: '#ea4c89',             bg: 'rgba(234,76,137,0.1)',   href: 'https://dribbble.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.073c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.176zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.386z"/></svg> }, */
]

/* ─────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────── */

function TerminalLine({ prompt, cmd, output, delay, color, blink }: {
  prompt?: string; cmd?: string; output?: string
  delay: number; color?: string; blink?: boolean
}) {
  return (
    <motion.div className="terminal-line" style={{ color: color || 'var(--text)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.3 }}>
      {prompt && <span className="terminal-prompt">{prompt}</span>}
      {cmd    && <span className="terminal-cmd">{cmd}</span>}
      {output && <span>{output}</span>}
      {blink  && <motion.span className="terminal-blink" animate={{ opacity: [1,0] }} transition={{ repeat: Infinity, duration: 0.8 }}>▋</motion.span>}
    </motion.div>
  )
}

function SkillBar({ item, color }: { item: TechItem; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <div ref={ref} className="skill-bar">
      <div className="skill-bar-header">
        <div className="skill-bar-left">
          <div className="skill-icon" style={{ background: `${item.color}22`, border: `1px solid ${item.color}44`, color: item.color }}>{item.icon}</div>
          <span className="skill-name">{item.name}</span>
        </div>
        <span className="skill-pct">{item.level}%</span>
      </div>
      <div className="skill-track">
        <motion.div className="skill-fill" style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${item.level}%` : 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }} />
      </div>
    </div>
  )
}

function CategoryCard({ cat }: { cat: Category }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.25)
  }, [x, y])
  return (
    <motion.div ref={ref} className="card" style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0) }}>
      <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        <div className="cat-header">
          <div className="cat-icon" style={{ background: `${cat.tagColor}18`, border: `1px solid ${cat.tagColor}30`, color: cat.tagColor }}>{cat.icon}</div>
          <h3 className="cat-title">{cat.title}</h3>
        </div>
        <div className="cat-bars">
          {cat.items.map(item => <SkillBar key={item.name} item={item} color={cat.tagColor} />)}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const ref = useRef<HTMLDivElement>(null)
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }, [x, y])
  return (
    <motion.div ref={ref} className="proj-card" variants={fadeUp}
    
      style={{ x: sx, y: sy, borderColor: hovered ? 'var(--border-hover)' : 'var(--border)', boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4),0 0 40px rgba(99,179,237,0.08)' : undefined }}
      onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); setHovered(false) }}
      onHoverStart={() => setHovered(true)}>
      {p.featured && <div className="proj-featured">Featured</div>}

      <ProjectImageSlider images={p.images} emoji={p.emoji} />

      <div className="proj-card-body">
        <div className="proj-tags">
          {p.tags.map(t => <span key={t} className={`tag ${p.tagColor}`}>{t}</span>)}
          <span className="proj-year">{p.year}</span>
        </div>
        <h3 className="proj-title">{p.title}</h3>
        <p className="proj-desc">{p.long}</p>
        <div className="proj-tech">
          {p.tech.map(t => <span key={t} className="proj-tech-chip">{t}</span>)}
        </div>
      </div>
      <motion.div className="proj-arrow" animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}>→</motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────
   CONTACT SECTION (self-contained state)
───────────────────────────────────── */
type FormState = { name: string; email: string; subject: string; message: string }

function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="sp-section">
      <SectionDivider label="Contact" />
      <div className="section">
        <motion.div className="contact-header" initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-mono">// get in touch</p>
          <h2 className="heading-lg">Let's Build<br /><span className="text-gradient">Something Great</span></h2>
          <p className="contact-header-sub">Open to full-time roles, freelance projects, and interesting collaborations. Drop me a message and I'll get back within 24 hours.</p>
        </motion.div>

        <div className="contact-grid">
          <div className="contact-left">
            {/* Email */}
            <MagnetCard>
              <p className="text-mono mb-12">// direct email</p>
              <a href="mailto:natiyirgish@gmail.com" className="contact-email-link">
                <div className="contact-email-icon">✉️</div>
                natiyirgish@gmail.com
              </a>
            </MagnetCard>

            {/* Availability */}
            <MagnetCard>
              <div className="avail-header"><span className="status-dot" /><span className="avail-label">Available Now</span></div>
              <p className="avail-body">Currently open to full-time software engineering and design roles. Freelance projects welcome too.</p>
              <div className="avail-list">
                {['Full-time roles','Freelance / Contract','Open source collab','Design projects'].map(item => (
                  <div key={item} className="avail-item"><span className="avail-check">✓</span>{item}</div>
                ))}
              </div>
            </MagnetCard>
          </div>

          {/* Form */}
          <motion.div className="card contact-form-card"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.55 }}>
            <p className="text-mono mb-8">// send a message</p>
            <h2 className="heading-sm mb-28">Start a Conversation</h2>
            {sent ? (
              <motion.div className="form-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="form-success-icon">🎉</div>
                <h3 className="form-success-title">Message Sent!</h3>
                <p className="form-success-sub">I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" placeholder="Your name" value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} required
                      className={`form-input ${focused === 'name' ? 'focused' : ''}`} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" placeholder="your@email.com" value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} required
                      className={`form-input ${focused === 'email' ? 'focused' : ''}`} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input type="text" placeholder="What's this about?" value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)} required
                    className={`form-input ${focused === 'subject' ? 'focused' : ''}`} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea placeholder="Tell me about your project or opportunity..." value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} required rows={5}
                    className={`form-input form-textarea ${focused === 'message' ? 'focused' : ''}`} />
                </div>
                <motion.button type="submit" className="btn btn-primary form-submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(99,179,237,0.3)' }} whileTap={{ scale: 0.98 }}>
                  Send Message <span>→</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Socials */}
        <div className="socials-section">
          <p className="text-mono mb-12">// find me on</p>
          <div className="socials-list">
            {socials.map((s, i) => (
              <motion.a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                className="social-link" style={{ background: s.bg }}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.08 }} whileHover={{ x: 4 }}>
                <span style={{ color: s.color, flexShrink: 0 }}>{s.icon}</span>
                <div className="social-text"><div className="social-name">{s.name}</div><div className="social-desc">{s.desc}</div></div>
                <span className="social-arrow">→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────
   MAIN HOME PAGE
───────────────────────────────────── */
export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All')

  /* hero spotlight */
  const spotX = useMotionValue(-999); const spotY = useMotionValue(-999)
  const onHeroMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    spotX.set(e.clientX - r.left); spotY.set(e.clientY - r.top)
  }, [spotX, spotY])
  const onHeroLeave = useCallback(() => { spotX.set(-999); spotY.set(-999) }, [spotX, spotY])

  /* hero photo tilt */
  const mX = useMotionValue(0); const mY = useMotionValue(0)
  const rX = useTransform(mY, [-200, 200], [6, -6])
  const rY = useTransform(mX, [-200, 200], [-6, 6])
  const srX = useSpring(rX, { stiffness: 120, damping: 20 })
  const srY = useSpring(rY, { stiffness: 120, damping: 20 })
  const onPhotoMove = useCallback((e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mX.set(e.clientX - r.left - r.width / 2); mY.set(e.clientY - r.top - r.height / 2)
  }, [mX, mY])
  const onPhotoLeave = useCallback(() => { mX.set(0); mY.set(0) }, [mX, mY])

  const spotStyle = {
    background: useTransform([spotX, spotY], ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(99,179,237,0.10) 0%, rgba(159,122,234,0.05) 35%, transparent 65%)`),
  }

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.tags.includes(activeFilter))

  // Word-by-word reveal for the name
  const nameWords = ['Nathan', 'Yirgalem']

  return (
    <div className="page">

      {/* ══════════ HERO ══════════ */}
      <section id="home" className="hero-section" onMouseMove={onHeroMove} onMouseLeave={onHeroLeave}>
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <motion.div className="hero-spotlight" style={spotStyle} />

        <div className="hero-inner">
          <motion.div className="hero-left" variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <span className="tag tag-green hero-badge"><span className="status-dot" />Available for work</span>
            </motion.div>
            <motion.div variants={fadeUp} className="hero-heading-wrap">
              {/* Eyebrow */}
              <motion.p
                className="hero-eyebrow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="hero-eyebrow-line" />
                Full-Stack Developer &amp; Designer
              </motion.p>

              {/* Main name — "Nathan" stroke outline, "Yirgalem" gradient fill */}
              <h1 className="hero-name-block">
                {nameWords.map((word, wi) => (
                  <motion.span
                    key={word}
                    className={`hero-name-word ${wi === 0 ? 'hero-name-outline' : 'hero-name-filled'}`}
                    initial={{ opacity: 0, y: 60, skewY: 4 }}
                    animate={{ opacity: 1, y: 0, skewY: 0 }}
                    transition={{ delay: 0.5 + wi * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Animated subtitle */}
              <motion.div
                className="hero-subtitle-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <span className="hero-subtitle-dot" />
                <span className="hero-subtitle-text">Let's build something great together</span>
                <motion.span
                  className="hero-subtitle-arrow"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                >→</motion.span>
              </motion.div>
            </motion.div>
            <motion.p variants={fadeUp} className="hero-sub">
              CS graduate &amp; full-stack developer crafting performant web apps, scalable systems, and pixel-perfect interfaces.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-roles">
              {['Software Dev','Web Dev','Graphics Designer'].map(r => <span key={r} className="hero-role-chip">{r}</span>)}
            </motion.div>
            <motion.div variants={fadeUp} className="hero-cta">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <a href="#contact"  className="btn btn-ghost">Get in Touch</a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-right" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{ perspective: 800 }} onMouseMove={onPhotoMove} onMouseLeave={onPhotoLeave}>
            <motion.div className="hero-photo-ring" style={{ rotateX: srX, rotateY: srY, transformStyle: 'preserve-3d' }}>
              <motion.div className="hero-photo-orbit" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: 'linear' }} />
              <div className="hero-photo-frame">
                <img src={heroImg} alt="Portfolio" className="hero-photo-img" />
                <div className="hero-photo-overlay" />
              </div>
              <motion.div className="hero-float-badge hero-float-badge-tl" animate={{ y: [0,-6,0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
                <span className="hero-float-icon">⚡</span>
                <div><div className="hero-float-value">2+ yrs</div><div className="hero-float-label">Experience</div></div>
              </motion.div>
              <motion.div className="hero-float-badge hero-float-badge-br" animate={{ y: [0,6,0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}>
                <span className="hero-float-icon">🚀</span>
                <div><div className="hero-float-value">10+</div><div className="hero-float-label">Projects</div></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ BENTO / ABOUT ══════════ */}
      <div className="section">
        <motion.div className="bento-12-grid" variants={stagger} initial="hidden" animate="show">
          <MagnetCard className="bento-7 about-card">
  <div className="about-glow" />
  <div className="about-top">
    <div className="about-avatar-wrap">
      <div className="about-avatar">
        <img src={heroImg} alt="Profile" className="about-avatar-img" />
      </div>
      <span className="about-status-ping" />
    </div>
    <div className="about-top-text">
      <p className="text-mono mb-6">// About me</p>
      <h2 className="heading-md">CS Graduate & Developer</h2>
    </div>
  </div>

  <p className="card-body-text about-bio">
    Passionate about building elegant solutions to complex problems. I bridge the gap between design and engineering — from low-level systems to polished UIs.
  </p>

  <div className="about-facts">
    <div className="about-fact">
      <span className="about-fact-icon">🎓</span>
      <div>
        <div className="about-fact-label">Education</div>
        <div className="about-fact-value">B.Sc. Computer Science</div>
        <div className="about-fact-value">ALX. Software Enginnering</div>
      </div>
    </div>
    <div className="about-fact">
      <span className="about-fact-icon">📍</span>
      <div>
        <div className="about-fact-label">Based in</div>
        <div className="about-fact-value">Ethiopia 🌍</div>
        <div className="about-fact-value">Remote-first 🌍</div>
      </div>
    </div>
  </div>

  <div className="tag-row mt-16">
    <span className="tag tag-blue">Software Dev</span>
    <span className="tag tag-purple">Web Dev</span>
    <span className="tag tag-orange">Graphics Design</span>
  </div>
</MagnetCard>

          <MagnetCard className="bento-5">
            <p className="text-mono mb-12">// Current status</p>
            <div className="status-list">
              {[{ label:'Open to roles',value:'Remote / Freelance',dot:true},{label:'Location',value:'Ethiopia 🌍'},{label:'Focus',value:'Full-stack + Design'}].map(item => (
                <div key={item.label} className="status-row">
                  <span className="status-label">{item.label}</span>
                  <span className="status-value">{item.dot && <span className="status-dot" />}{item.value}</span>
                </div>
              ))}
            </div>
          </MagnetCard>

          <MagnetCard className="bento-5">
            <p className="text-mono mb-14">// Top skills</p>
            <div className="skill-chips">
              {skills.map((s, i) => (
                <motion.span key={s} className="skill-chip"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.05 }}
                  whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-glow)' }}>
                  {s}
                </motion.span>
              ))}
            </div>
          </MagnetCard>

          <MagnetCard className="bento-7">
            <div className="terminal">
              <div className="terminal-bar">
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} className="terminal-dot" style={{ background: c }} />)}
                <span className="terminal-title">~/portfolio — zsh</span>
              </div>
              <div className="terminal-body">
                <TerminalLine prompt="$" cmd="whoami" delay={0.6} />
                <TerminalLine output="cs_graduate | developer | designer" delay={0.9} color="var(--accent-3)" />
                <TerminalLine prompt="$" cmd='cat skills.json | jq ".top[]"' delay={1.2} />
                <TerminalLine output='"React" "TypeScript" "Python" "Figma"' delay={1.5} color="var(--accent)" />
                <TerminalLine prompt="$" cmd="echo $STATUS" delay={1.8} />
                <TerminalLine output="Available for exciting opportunities ✓" delay={2.1} color="var(--accent-3)" />
                <TerminalLine prompt="$" cmd="_" delay={2.4} blink />
              </div>
            </div>
          </MagnetCard>

          <MagnetCard className="bento-full">
            <div className="recent-header">
              <div><p className="text-mono mb-4">// Recent work</p><h2 className="heading-sm">Featured Projects</h2></div>
              <a href="#projects" className="btn btn-ghost btn-sm">View all →</a>
            </div>
            <div className="recent-grid">
              {projects.slice(0,3).map((p, i) => (
                <motion.div key={p.title} className="recent-card"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} whileHover={{ y: -3 }}>
                  <div className="recent-card-top"><span className={`tag ${p.tagColor}`}>{p.tags[0]}</span><span className="recent-arrow">→</span></div>
                  <h3 className="recent-title">{p.title}</h3>
                  <p className="recent-desc">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </MagnetCard>

          {homeStats.map(stat => (
            <MagnetCard key={stat.label} className="bento-3 stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </MagnetCard>
          ))}
        </motion.div>
      </div>

      {/* ══════════ PROJECTS ══════════ */}
      <section id="projects" className="sp-section">
        <SectionDivider label="Projects" />
        <div className="section">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="sp-header">
            <p className="text-mono sp-eyebrow">// my work</p>
            <h2 className="heading-lg">Projects &amp;<br /><span className="text-gradient">Case Studies</span></h2>
            <p className="sp-sub">A curated selection of systems, apps, and experiments I've built — from backend infrastructure to polished UIs.</p>
          </motion.div>

          <motion.div className="filter-bar" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            {filters.map(f => (
              <button key={f} type="button" className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </motion.div>

          <motion.div key={activeFilter} className="proj-grid" variants={staggerFast} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {filtered.map(p => <ProjectCard key={p.title} project={p} />)}
          </motion.div>
        </div>
      </section>

      {/* ══════════ STACK ══════════ */}
      <section id="stack" className="sp-section">
        <SectionDivider label="Tech Stack" />
        <div className="section">
          <motion.div className="sp-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-mono sp-eyebrow">// tech stack</p>
            <h2 className="heading-lg">Tools &amp;<br /><span className="text-gradient">Technologies</span></h2>
            <p className="sp-sub">A deep-dive into the languages, frameworks, and tools I use to build production-grade software and beautiful interfaces.</p>
          </motion.div>

          <motion.div className="stack-summary" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            {[{label:'Languages',value:'4+',color:'var(--accent)'},{label:'Frameworks',value:'10+',color:'var(--accent-2)'},{label:'Tools',value:'20+',color:'var(--accent-3)'},{label:'Years Coding',value:'4+',color:'var(--accent-4)'}].map(s => (
              <div key={s.label} className="card stack-summary-card">
                <div className="stack-summary-val" style={{ color: s.color }}>{s.value}</div>
                <div className="stack-summary-label">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="cat-grid">
            {categories.map(cat => <CategoryCard key={cat.title} cat={cat} />)}
          </div>

          <motion.div className="card" style={{ marginTop: 16 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-mono mb-8">// daily drivers</p>
            <h3 className="heading-sm mb-20">Tools I Use Every Day</h3>
            <div className="tools-grid">
              {tools.map((t, i) => (
                <motion.div key={t.name} className="tool-chip"
                  initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3, borderColor: 'var(--border-hover)' }}>
                  <span>{t.icon}</span><span>{t.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <ContactSection />

    </div>
  )
}
