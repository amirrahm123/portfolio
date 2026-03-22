import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const codeLines = [
  { text: 'const', color: '#c084fc' },
  { text: ' portfolio', color: '#818cf8' },
  { text: ' = ', color: '#6b6b80' },
  { text: '{', color: '#f0f0f3' },
]
const codeLine2 = [
  { text: '  name', color: '#4ade80' },
  { text: ': ', color: '#6b6b80' },
  { text: "'BuildLab'", color: '#fbbf24' },
  { text: ',', color: '#6b6b80' },
]
const codeLine3 = [
  { text: '  role', color: '#4ade80' },
  { text: ': ', color: '#6b6b80' },
  { text: "'Full-Stack'", color: '#fbbf24' },
  { text: ',', color: '#6b6b80' },
]
const codeLine4 = [
  { text: '  passion', color: '#4ade80' },
  { text: ': ', color: '#6b6b80' },
  { text: 'true', color: '#c084fc' },
  { text: ',', color: '#6b6b80' },
]
const codeLine5 = [
  { text: '  available', color: '#4ade80' },
  { text: ': ', color: '#6b6b80' },
  { text: 'true', color: '#4ade80' },
]
const codeLine6 = [
  { text: '}', color: '#f0f0f3' },
  { text: ';', color: '#6b6b80' },
]

const allLines = [codeLines, codeLine2, codeLine3, codeLine4, codeLine5, codeLine6]

function TypedLine({ tokens, delay }: { tokens: { text: string; color: string }[]; delay: number }) {
  const [charIndex, setCharIndex] = useState(0)
  const fullText = tokens.map(t => t.text).join('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (charIndex < fullText.length) {
        const interval = setInterval(() => {
          setCharIndex(prev => {
            if (prev >= fullText.length) {
              clearInterval(interval)
              return prev
            }
            return prev + 1
          })
        }, 35)
        return () => clearInterval(interval)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [delay, fullText.length])

  let rendered = 0
  return (
    <div style={{ fontFamily: "'Fira Code', 'Cascadia Code', monospace", fontSize: '0.8rem', lineHeight: 1.8, whiteSpace: 'pre', direction: 'ltr', textAlign: 'left' }}>
      {tokens.map((token, i) => {
        const start = rendered
        rendered += token.text.length
        const visible = token.text.slice(0, Math.max(0, charIndex - start))
        return <span key={i} style={{ color: token.color }}>{visible}</span>
      })}
      {charIndex < fullText.length && (
        <span style={{ color: '#818cf8', animation: 'blink .7s step-end infinite' }}>▌</span>
      )}
    </div>
  )
}

export default function CodeSnippet() {
  return (
    <motion.div
      className="code-snippet-float"
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="code-snippet-header">
        <div className="code-dots">
          <span style={{ background: '#ff5f57' }} />
          <span style={{ background: '#ffbd2e' }} />
          <span style={{ background: '#28c840' }} />
        </div>
        <span className="code-filename">portfolio.ts</span>
      </div>
      <div className="code-snippet-body">
        {allLines.map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span className="code-line-num">{i + 1}</span>
            <TypedLine tokens={line} delay={800 + i * 600} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
