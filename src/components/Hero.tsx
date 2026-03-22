import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const roles = ['מפתחי אתרים', 'מעצבי UI/UX', 'מפתחי Full-Stack', 'פותרי בעיות']

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'transform 0.15s ease-out',
      }}
    />
  )
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{suffix}{count}+</span>
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text.length < currentRole.length) {
      timeout = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), 80)
    } else if (!deleting && text.length === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  }

  return (
    <section className="hero" id="home">
      {/* Animated mesh gradient */}
      <div className="hero-mesh">
        <div className="hero-mesh-orb" />
        <div className="hero-mesh-orb" />
        <div className="hero-mesh-orb" />
      </div>

      <video className="hero-video" autoPlay muted loop playsInline>
        <source src={`${import.meta.env.BASE_URL}hero-bg.mp4`} type="video/mp4" />
      </video>
      <div className="hero-video-overlay" />
      <div className="hero-bg-grid" />
      <CursorGlow />

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="hero-badge">
          זמין לפרויקטים
        </motion.div>

        <motion.h1 variants={itemVariants}>
          אנחנו יוצרים <span className="gradient-text">חוויות דיגיטליות</span>
          <br />שעושות רושם.
        </motion.h1>

        <motion.div variants={itemVariants} className="hero-role">
          <span className="role-prefix">אנחנו </span>
          <span className="role-typed">{text}</span>
          <span className="cursor">|</span>
        </motion.div>

        <motion.p variants={itemVariants} className="hero-desc">
          בונים אתרים מודרניים, רספונסיביים וביצועיים
          שעוזרים לעסקים לצמוח ולבלוט ברשת.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-actions">
          <a href="#projects" className="btn-primary">צפו בעבודות שלנו</a>
          <a href="#contact" className="btn-outline">צרו קשר</a>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-stats">
          <div className="stat">
            <span className="stat-num"><AnimatedCounter target={10} /></span>
            <span className="stat-label">פרויקטים שהושלמו</span>
          </div>
          <div className="stat">
            <span className="stat-num"><AnimatedCounter target={100} suffix="" /></span>
            <span className="stat-label">שביעות רצון לקוחות</span>
          </div>
          <div className="stat">
            <span className="stat-num"><AnimatedCounter target={2} /></span>
            <span className="stat-label">שנות ניסיון</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>גללו למטה</span>
        <div className="scroll-indicator" />
      </motion.div>
    </section>
  )
}
