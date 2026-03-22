import { motion } from 'framer-motion'

export default function About() {
  const highlights = [
    { icon: '🚀', title: 'ביצועים קודם כל', desc: 'זמני טעינה מהירים ואינטראקציות חלקות' },
    { icon: '🎯', title: 'מוכוון מטרות', desc: 'כל החלטה עיצובית משרתת מטרה עסקית' },
    { icon: '🤝', title: 'ממוקד לקוח', desc: 'תקשורת ברורה ותהליך שקוף' },
  ]

  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-card-stack">
              <motion.div
                className="about-float-card card-1"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="afc-icon">⚡</span>
                <span>אספקה מהירה</span>
              </motion.div>
              <motion.div
                className="about-float-card card-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <span className="afc-icon">🎨</span>
                <span>עיצוב יצירתי</span>
              </motion.div>
              <motion.div
                className="about-float-card card-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <span className="afc-icon">📱</span>
                <span>רספונסיבי לחלוטין</span>
              </motion.div>
              <div className="about-avatar">
                <div className="avatar-ring" />
                <img src={`${import.meta.env.BASE_URL}buildlab-logo.jpg`} alt="BuildLab" className="avatar-logo-img" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-tag">אודות</span>
            <h2>הופכים רעיונות <span className="gradient-text">למציאות</span></h2>
            <p>
              ב-BuildLab אנחנו מתמחים בבניית אתרים מודרניים
              ובעלי ביצועים גבוהים לעסקים. מדפי נחיתה מעוצבים
              ועד אפליקציות Full-Stack, אנחנו מספקים קוד נקי ועיצוב מרהיב.
            </p>
            <p>
              כל פרויקט שאנחנו לוקחים נבנה עם תשומת לב לפרטים,
              אופטימיזציה לביצועים ועיצוב Mobile-First. אנחנו עובדים בשיתוף פעולה
              צמוד עם הלקוחות שלנו כדי להבין את החזון שלהם ולהפוך אותו למציאות.
            </p>
            <div className="about-highlights">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="highlight"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                >
                  <div className="highlight-icon">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
