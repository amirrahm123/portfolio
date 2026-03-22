import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  api: string
}

export default function Contact({ api }: Props) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch(`${api}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      setSent(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  const contactCards = [
    { icon: '📧', title: 'אימייל', value: 'webdevig123@gmail.com', href: 'mailto:webdevig123@gmail.com' },
    { icon: '📱', title: 'וואטסאפ', value: '052-7044989', href: 'https://wa.me/9720527044989' },
    { icon: '📸', title: 'אינסטגרם', value: '@buildlab.il', href: 'https://instagram.com/buildlab.il' },
    { icon: '📍', title: 'מיקום', value: 'ישראל', href: '' },
  ]

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">צור קשר</span>
          <h2>בואו <span className="gradient-text">נעבוד ביחד</span></h2>
          <p>יש לכם פרויקט בראש? בואו נדבר על איך אנחנו יכולים לעזור.</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {contactCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="contact-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="cc-icon">{card.icon}</div>
                <div>
                  <h4>{card.title}</h4>
                  {card.href ? (
                    <a href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                      {card.value}
                    </a>
                  ) : (
                    <span>{card.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {sent ? (
              <motion.div
                className="form-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="success-icon">✅</div>
                <h3>ההודעה נשלחה!</h3>
                <p>תודה שפניתם. נחזור אליכם בהקדם.</p>
                <button className="btn-primary" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}>
                  שלחו הודעה נוספת
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>השם שלכם</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="ישראל ישראלי"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>כתובת אימייל</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="israel@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ההודעה שלכם</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="ספרו לי על הפרויקט שלכם..."
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={sending}>
                  {sending ? 'שולח...' : 'שלחו הודעה'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
