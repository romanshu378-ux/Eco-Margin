// EcoMargin — Framer Motion Variants
// src/utils/animations.js

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

export const slideUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export const slideInLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const slideInRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export const cardHover = {
  rest:  { scale: 1,    y: 0,   transition: { duration: 0.3 } },
  hover: { scale: 1.02, y: -4,  transition: { duration: 0.3 } },
}

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.25 } },
}
