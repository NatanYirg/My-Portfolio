import type { Variants, Transition } from 'framer-motion'

// Cubic bezier typed as const tuple for framer-motion v12 compatibility
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const transition = (delay = 0): Transition => ({
  duration: 0.55,
  delay,
  ease,
})

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transition() },
}

export const fadeUpDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transition(delay) },
})

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
}
