import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechTicker from './components/TechTicker'
import Projects from './components/Projects'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import AdminPanel from './components/AdminPanel'
import './App.css'

export interface Project {
  _id?: string
  title: string
  description: string
  image: string
  url: string
  tags: string[]
  featured: boolean
  createdAt?: string
}

const API = import.meta.env.DEV ? 'http://localhost:3003' : ''

const FALLBACK_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'ערן בקר – עורכי דין',
    description: 'אתר לחברת עורכי דין המתמחה בנזיקין, ביטוח ורשלנות רפואית.',
    image: 'screenshots/ebeker.png',
    url: './projects/ebeker/index.html',
    tags: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
  },
  {
    _id: '2',
    title: 'לוטף – בית מרקחת',
    description: 'אתר לבית מרקחת לוטף עם ממשק מודרני ונוח למשתמש.',
    image: 'screenshots/lutef.png',
    url: './projects/lotef/index.html',
    tags: ['React', 'Vite', 'Node.js'],
    featured: false,
  },
  {
    _id: '3',
    title: 'SoundLight Pro',
    description: 'אתר להשכרת ציוד הגברה ותאורה לאירועים.',
    image: 'screenshots/soundlight.png',
    url: './projects/soundlight/index.html',
    tags: ['React', 'Vite', 'Node.js'],
    featured: false,
  },
  {
    _id: '4',
    title: 'BladeKing – מספרת גברים',
    description: 'אתר למספרת גברים עם מערכת הזמנת תורים.',
    image: 'screenshots/barbershop.png',
    url: './projects/barbershop/index.html',
    tags: ['React', 'Vite'],
    featured: false,
  },
  {
    _id: '5',
    title: 'Smile Studio – מרפאת שיניים',
    description: 'אתר למרפאת שיניים עם עיצוב נקי ומקצועי, ממשק הזמנת תורים וגלריית טיפולים.',
    image: 'screenshots/smilestudio.png',
    url: 'https://zoharmanor.github.io/smileStudio/',
    tags: ['React', 'Vite', 'UI/UX'],
    featured: false,
  },
  {
    _id: '6',
    title: 'Royal Fitness – אימון אישי',
    description: 'אתר לסטודיו כושר עם חווית משתמש דינמית, תוכניות אימון ותצוגת מאמנים.',
    image: 'screenshots/fitness.png',
    url: 'https://zoharmanor.github.io/fitnesss/',
    tags: ['React', 'Vite', 'UI/UX'],
    featured: false,
  },
  {
    _id: '7',
    title: 'אומנות השיפוץ – קבלן שיפוצים',
    description: 'אתר לקבלן שיפוצים מורשה עם טופס הצעת מחיר, גלריית פרויקטים ועיצוב מקצועי.',
    image: 'screenshots/renovation.png',
    url: 'https://zoharmanor.github.io/renovationArt/',
    tags: ['React', 'Vite', 'UI/UX'],
    featured: false,
  },
  {
    _id: '8',
    title: 'לחם טנא – מאפייה כפרית',
    description: 'אתר למאפייה כפרית בגליל המערבי עם תפריט מוצרים, סיפור המאפייה ואווירה חמה.',
    image: 'screenshots/bakery-lehem.png',
    url: 'https://zoharmanor.github.io/bakeryUi/',
    tags: ['React', 'Vite', 'UI/UX'],
    featured: false,
  },
]

function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (window.location.hash === '#admin') setIsAdmin(true)
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    // Skip API call when not running locally
    if (window.location.hostname !== 'localhost') {
      setProjects(FALLBACK_PROJECTS)
      setLoading(false)
      return
    }
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 2000)
      const res = await fetch(`${API}/api/projects`, { signal: controller.signal })
      clearTimeout(timeout)
      const data = await res.json()
      setProjects(data)
    } catch {
      setProjects(FALLBACK_PROJECTS)
    } finally {
      setLoading(false)
    }
  }

  if (isAdmin) {
    return <AdminPanel projects={projects} onRefresh={fetchProjects} api={API} onExit={() => { setIsAdmin(false); window.location.hash = '' }} />
  }

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <TechTicker />
      <Projects projects={projects} loading={loading} />
      <About />
      <Skills />
      <Testimonials />
      <Contact api={API} />
      <Footer />
      <a
        href="https://wa.me/9720527044989"
        target="_blank"
        rel="noopener"
        className="whatsapp-fab"
        aria-label="שלחו הודעה בוואטסאפ"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
          <path d="M16.004 2.667A13.26 13.26 0 002.667 15.89a13.16 13.16 0 001.907 6.843L2.667 29.333l6.84-1.793A13.29 13.29 0 0016.004 29.3 13.27 13.27 0 0029.333 16.04 13.27 13.27 0 0016.004 2.667zm0 24.28a10.92 10.92 0 01-5.57-1.52l-.4-.237-4.14 1.086 1.104-4.04-.26-.413a10.88 10.88 0 01-1.67-5.84A10.93 10.93 0 0116.004 5.04 10.93 10.93 0 0126.96 16.04a10.93 10.93 0 01-10.956 10.907zm6.003-8.187c-.33-.164-1.95-.96-2.252-1.07-.302-.11-.522-.165-.742.165-.22.33-.852 1.07-1.044 1.29-.192.22-.385.248-.714.083-.33-.164-1.39-.512-2.65-1.633-.98-.872-1.64-1.95-1.833-2.28-.192-.33-.02-.508.145-.672.148-.148.33-.385.494-.578.165-.192.22-.33.33-.55.11-.22.055-.412-.028-.578-.083-.165-.742-1.787-1.016-2.447-.268-.643-.54-.556-.742-.566l-.632-.01c-.22 0-.577.083-.88.413-.302.33-1.153 1.127-1.153 2.747s1.18 3.186 1.346 3.406c.165.22 2.323 3.547 5.63 4.973.787.34 1.4.543 1.88.695.79.25 1.51.215 2.078.13.634-.094 1.95-.797 2.225-1.566.275-.77.275-1.43.192-1.567-.083-.137-.302-.22-.632-.385z"/>
        </svg>
      </a>
    </div>
  )
}

export default App
