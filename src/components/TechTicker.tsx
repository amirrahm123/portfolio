const techs = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS',
  'Framer Motion', 'Express', 'PostgreSQL', 'Firebase', 'Docker', 'Figma',
  'Git', 'Vercel', 'REST APIs', 'HTML5', 'CSS3', 'JavaScript',
]

export default function TechTicker() {
  const doubled = [...techs, ...techs]

  return (
    <div className="tech-ticker-wrap">
      <div className="tech-ticker">
        {doubled.map((tech, i) => (
          <span key={i} className="tech-ticker-item">
            <span className="tech-ticker-dot" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
