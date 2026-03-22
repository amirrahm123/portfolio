import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '12345'

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

// Schemas
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  url: String,
  tags: [String],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
})

const Project = mongoose.model('Project', projectSchema)
const Contact = mongoose.model('Contact', contactSchema)

// Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
})

function formatDate(date) {
  return new Intl.DateTimeFormat('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jerusalem'
  }).format(date)
}

async function sendEmail(data) {
  const { name, email, message } = data
  const now = new Date()
  const dateStr = formatDate(now)

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #06060b; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #06060b; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size: 28px; font-weight: 800; color: #e4e4e7; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">
                    <span style="color: #818cf8;">&lt;</span>AR<span style="color: #818cf8;">/&gt;</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background: linear-gradient(180deg, #131320 0%, #0e0e1a 100%); border-radius: 24px; overflow: hidden; border: 1px solid #1e1e30;">

              <!-- Gradient Banner -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background: linear-gradient(135deg, #818cf8 0%, #a78bfa 40%, #c084fc 70%, #e879f9 100%); padding: 40px 40px 36px; text-align: center;">
                    <div style="font-size: 44px; margin-bottom: 12px;">&#9993;</div>
                    <h1 style="margin: 0 0 8px; font-size: 26px; font-weight: 800; color: white; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">
                      פנייה חדשה מהפורטפוליו!
                    </h1>
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.85); font-weight: 500;">
                      ${dateStr}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Sender Info Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 32px 40px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a2e; border-radius: 16px; border: 1px solid #252540; overflow: hidden;">
                      <tr>
                        <td style="padding: 24px 28px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <!-- Name Row -->
                            <tr>
                              <td style="padding-bottom: 20px;">
                                <table role="presentation" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="width: 44px; height: 44px; background: linear-gradient(135deg, #818cf8, #c084fc); border-radius: 12px; text-align: center; vertical-align: middle; font-size: 20px;">
                                      &#128100;
                                    </td>
                                    <td style="padding-right: 16px; vertical-align: middle;">
                                      <div style="font-size: 11px; font-weight: 600; color: #818cf8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                                        &#128073; שם השולח
                                      </div>
                                      <div style="font-size: 18px; font-weight: 700; color: #e4e4e7;">
                                        ${name}
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <!-- Divider -->
                            <tr>
                              <td style="padding-bottom: 20px;">
                                <div style="height: 1px; background: linear-gradient(90deg, transparent, #252540, transparent);"></div>
                              </td>
                            </tr>

                            <!-- Email Row -->
                            <tr>
                              <td>
                                <table role="presentation" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="width: 44px; height: 44px; background: linear-gradient(135deg, #818cf8, #c084fc); border-radius: 12px; text-align: center; vertical-align: middle; font-size: 20px;">
                                      &#9993;
                                    </td>
                                    <td style="padding-right: 16px; vertical-align: middle;">
                                      <div style="font-size: 11px; font-weight: 600; color: #818cf8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                                        &#128231; כתובת אימייל
                                      </div>
                                      <a href="mailto:${email}" style="font-size: 16px; font-weight: 600; color: #a78bfa; text-decoration: none;">
                                        ${email}
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 24px 40px 0;">
                    <div style="font-size: 11px; font-weight: 700; color: #818cf8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">
                      &#128172; תוכן ההודעה
                    </div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a2e; border-radius: 16px; border: 1px solid #252540; border-right: 4px solid #818cf8;">
                      <tr>
                        <td style="padding: 24px 28px;">
                          <p style="margin: 0; font-size: 15px; line-height: 1.8; color: #c4c4cc; white-space: pre-wrap;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Quick Reply Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 32px 40px;" align="center">
                    <a href="mailto:${email}?subject=Re: פנייה מהפורטפוליו - ${name}" style="display: inline-block; background: linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%); color: white; padding: 16px 48px; border-radius: 12px; font-size: 16px; font-weight: 700; text-decoration: none; letter-spacing: 0.3px;">
                      &#9993; השב עכשיו
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Contact Cards Row -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48%" style="background: #1a1a2e; border-radius: 12px; border: 1px solid #252540; padding: 16px 20px; text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 6px;">&#128241;</div>
                          <div style="font-size: 11px; color: #71717a; margin-bottom: 4px;">וואטסאפ</div>
                          <a href="https://wa.me/9720525916333" style="color: #a78bfa; font-size: 14px; font-weight: 600; text-decoration: none;">052-5916333</a>
                        </td>
                        <td width="4%"></td>
                        <td width="48%" style="background: #1a1a2e; border-radius: 12px; border: 1px solid #252540; padding: 16px 20px; text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 6px;">&#128205;</div>
                          <div style="font-size: 11px; color: #71717a; margin-bottom: 4px;">מיקום</div>
                          <div style="color: #e4e4e7; font-size: 14px; font-weight: 600;">ישראל</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 20px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #52525b;">
                נשלח אוטומטית מאתר הפורטפוליו של
                <span style="color: #818cf8; font-weight: 600;">אמיר ר.</span>
              </p>
              <p style="margin: 0; font-size: 11px; color: #3f3f46;">
                &copy; ${now.getFullYear()} כל הזכויות שמורות
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  await transporter.sendMail({
    from: `"הפורטפוליו של אמיר" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `${name} | פנייה חדשה מהפורטפוליו`,
    html,
  })
}

// Admin login
app.post('/api/admin/login', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) res.json({ success: true })
  else res.status(401).json({ success: false })
})

// Projects CRUD
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 })
  res.json(projects)
})

app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.json({ success: true, project })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create' })
  }
})

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' })
  }
})

// Contact
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body)
    await contact.save()
    try { await sendEmail(req.body) } catch (err) { console.error('Email error:', err.message) }
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to save' })
  }
})

app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json(contacts)
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
