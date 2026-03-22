import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="nav-logo">
              <img src={`${import.meta.env.BASE_URL}buildlab-logo.jpg`} alt="BuildLab" className="footer-logo-img" />
            </span>
            <p>בונה אתרים מודרניים שגורמים לעסקים לזרוח. עיצוב מרהיב, קוד נקי, חוויה מושלמת.</p>
          </div>
          <div className="footer-links">
            <h4>קישורים מהירים</h4>
            <a href="#home">דף הבית</a>
            <a href="#projects">פרויקטים</a>
            <a href="#about">אודות</a>
            <a href="#skills">מיומנויות</a>
            <a href="#contact">צור קשר</a>
          </div>
          <div className="footer-links">
            <h4>התחברו איתנו</h4>
            <a href="https://instagram.com/buildlab.il" target="_blank" rel="noopener">📸 אינסטגרם</a>
            <a href="https://wa.me/9720527044989" target="_blank" rel="noopener">💬 וואטסאפ</a>
            <a href="mailto:webdevig123@gmail.com">📧 אימייל</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BuildLab. כל הזכויות שמורות.</p>
        </div>
      </div>
    </motion.footer>
  )
}
