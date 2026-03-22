import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  url: String,
  tags: [String],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

const Project = mongoose.model('Project', projectSchema)

const projects = [
  {
    title: 'ערן בקר – עורכי דין',
    description: 'אתר לחברת עורכי דין המתמחה בנזיקין, ביטוח ורשלנות רפואית.',
    image: '/projects/ebeker/screenshot.png',
    url: '/projects/ebeker/index.html',
    tags: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
  },
  {
    title: 'לוטף – בית מרקחת',
    description: 'אתר לבית מרקחת לוטף עם ממשק מודרני ונוח למשתמש.',
    image: '/projects/lotef/screenshot.png',
    url: '/projects/lotef/index.html',
    tags: ['React', 'Vite', 'Node.js'],
    featured: false,
  },
  {
    title: 'SoundLight Pro',
    description: 'אתר להשכרת ציוד הגברה ותאורה לאירועים.',
    image: '/projects/soundlight/screenshot.png',
    url: '/projects/soundlight/index.html',
    tags: ['React', 'Vite', 'Node.js'],
    featured: false,
  },
  {
    title: 'BladeKing – מספרת גברים',
    description: 'אתר למספרת גברים עם מערכת הזמנת תורים.',
    image: '/projects/barbershop/screenshot.png',
    url: '/projects/barbershop/index.html',
    tags: ['React', 'Vite'],
    featured: false,
  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    for (const proj of projects) {
      const exists = await Project.findOne({ title: proj.title })
      if (exists) {
        // Update existing entry with fixed URL and featured flag
        await Project.updateOne({ title: proj.title }, { $set: { url: proj.url, featured: proj.featured } })
        console.log(`Updated "${proj.title}"`)
        continue
      }
      await Project.create(proj)
      console.log(`Added "${proj.title}"`)
    }

    console.log('Done!')
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

seed()
