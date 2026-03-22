import { motion } from 'framer-motion'
import type { Project } from '../App'

interface Props {
  projects: Project[]
  loading: boolean
}

export default function Projects({ projects, loading }: Props) {
  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">תיק עבודות</span>
          <h2>פרויקטים <span className="gradient-text">נבחרים</span></h2>
          <p>מבחר מעבודות אחרונות שבניתי עבור לקוחות.</p>
        </motion.div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>טוען פרויקטים...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <p>אין פרויקטים עדיין. בדקו שוב בקרוב!</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.a
                key={project._id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="project-image">
                  <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={project.title} loading="lazy" />
                  <div className="project-overlay">
                    <span className="project-link">
                      צפו בפרויקט
                    </span>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
