import { motion } from 'framer-motion'

const skills = [
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'HTML/CSS', color: '#e34f26' },
  { name: 'Tailwind', color: '#06b6d4' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'Express', color: '#ffffff' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'REST APIs', color: '#818cf8' },
  { name: 'Firebase', color: '#ffca28' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Git', color: '#f05032' },
  { name: 'Figma', color: '#f24e1e' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'UI/UX', color: '#a78bfa' },
  { name: 'Framer Motion', color: '#ff0055' },
  { name: 'Vercel', color: '#ffffff' },
  { name: 'Linux', color: '#fcc624' },
]

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <motion.div
          className="skills-compact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="skills-title">הטכנולוגיות שלי</h3>
          <div className="skills-flow">
            {skills.map((skill, i) => (
              <motion.span
                key={skill.name}
                className="skill-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <span
                  className="skill-dot"
                  style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}40` }}
                />
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
