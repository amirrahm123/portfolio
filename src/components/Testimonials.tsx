import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'דוד כ.',
    role: 'בעל עסק',
    initial: 'ד',
    text: 'BuildLab בנו לנו אתר מדהים שהכפיל את כמות הפניות שלנו. מקצועי, מהיר ועם עין לפרטים. ממליץ בחום!',
    stars: 5,
  },
  {
    name: 'שרה ל.',
    role: 'מנהלת שיווק',
    initial: 'ש',
    text: 'העבודה עם BuildLab הייתה חוויה מעולה. הקשיבו לכל הצרכים שלנו והפכו את החזון למציאות. האתר נראה פנטסטי!',
    stars: 5,
  },
  {
    name: 'יוסי מ.',
    role: 'יזם',
    initial: 'י',
    text: 'קיבלנו אתר מהיר, יפה ומותאם לנייד. BuildLab תמיד זמינים לשינויים ועדכונים. שירות ברמה הגבוהה ביותר.',
    stars: 5,
  },
  {
    name: 'מיכל ב.',
    role: 'בעלת חנות אונליין',
    initial: 'מ',
    text: 'האתר ש-BuildLab בנו לנו שידרג את המותג שלנו ברמות. לקוחות כל הזמן משבחים את העיצוב והנוחות. תודה רבה!',
    stars: 5,
  },
  {
    name: 'אלון ר.',
    role: 'מנכ"ל סטארטאפ',
    initial: 'א',
    text: 'עבודה מקצועית מהתחלה ועד הסוף. BuildLab הבינו בדיוק מה אנחנו צריכים וסיפקו תוצאה מעל ומעבר למצופה.',
    stars: 5,
  },
  {
    name: 'נועה ג.',
    role: 'מעצבת פנים',
    initial: 'נ',
    text: 'חיפשתי מישהו שיבנה לי אתר תדמית ברמה גבוהה ו-BuildLab עשו עבודה מושלמת. מהירים, אמינים ויצירתיים!',
    stars: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const t = testimonials[current]

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">המלצות</span>
          <h2>מה <span className="gradient-text">הלקוחות</span> אומרים</h2>
        </motion.div>

        <div className="testimonial-slider">
          <button className="testimonial-arrow testimonial-arrow-right" onClick={prev} aria-label="הקודם">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          <div className="testimonial-slide-area">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                className="testimonial-card"
                custom={direction}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="testimonial-stars">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <span key={si}>★</span>
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div className="testimonial-author-info">
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="testimonial-arrow testimonial-arrow-left" onClick={next} aria-label="הבא">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === current ? 'active' : ''}`}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              aria-label={`המלצה ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
