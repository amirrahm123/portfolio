import { useState } from 'react'
import type { Project } from '../App'

interface Props {
  projects: Project[]
  onRefresh: () => void
  api: string
  onExit: () => void
}

export default function AdminPanel({ projects, onRefresh, api, onExit }: Props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Omit<Project, '_id' | 'createdAt'>>({
    title: '', description: '', image: '', url: '', tags: [], featured: false
  })
  const [tagInput, setTagInput] = useState('')

  const handleLogin = async () => {
    try {
      const res = await fetch(`${api}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (res.ok) setLoggedIn(true)
      else setError('Wrong password')
    } catch {
      setError('Server connection error')
    }
  }

  const handleAddProject = async () => {
    try {
      await fetch(`${api}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      setForm({ title: '', description: '', image: '', url: '', tags: [], featured: false })
      setTagInput('')
      setShowForm(false)
      onRefresh()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    try {
      await fetch(`${api}/api/projects/${id}`, { method: 'DELETE' })
      onRefresh()
    } catch (err) {
      console.error(err)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  if (!loggedIn) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <h1>Admin Access</h1>
          <p>Portfolio Management</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter password"
          />
          <button onClick={handleLogin}>Login</button>
          {error && <div className="admin-error">{error}</div>}
          <button className="admin-back" onClick={onExit}>← Back to Site</button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Portfolio Admin</h1>
        <div className="admin-header-actions">
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Project'}
          </button>
          <button className="btn-outline" onClick={onExit}>Back to Site</button>
        </div>
      </div>

      {showForm && (
        <div className="admin-form">
          <h3>New Project</h3>
          <div className="admin-form-grid">
            <div className="form-group">
              <label>Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Project name" />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="form-group full">
              <label>Image URL</label>
              <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="Screenshot URL" />
            </div>
            <div className="form-group full">
              <label>Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." rows={3} />
            </div>
            <div className="form-group">
              <label>Tags</label>
              <div className="tag-input-wrap">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add tag + Enter" />
                <button type="button" onClick={addTag}>Add</button>
              </div>
              <div className="tag-list">
                {form.tags.map(tag => (
                  <span key={tag} className="tag-chip">
                    {tag}
                    <button onClick={() => setForm({ ...form, tags: form.tags.filter(t => t !== tag) })}>×</button>
                  </span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
                Featured Project
              </label>
            </div>
          </div>
          <button className="btn-primary" onClick={handleAddProject}>Save Project</button>
        </div>
      )}

      <div className="admin-projects">
        <h3>{projects.length} Projects</h3>
        {projects.length === 0 ? (
          <div className="admin-empty">No projects yet. Add your first one!</div>
        ) : (
          <div className="admin-project-list">
            {projects.map(p => (
              <div key={p._id} className="admin-project-card">
                <div className="apc-image">
                  {p.image ? <img src={p.image} alt={p.title} /> : <div className="apc-placeholder">No Image</div>}
                </div>
                <div className="apc-info">
                  <h4>{p.title} {p.featured && <span className="featured-badge">Featured</span>}</h4>
                  <p>{p.description}</p>
                  <div className="apc-tags">
                    {p.tags.map(t => <span key={t} className="skill-pill">{t}</span>)}
                  </div>
                </div>
                <div className="apc-actions">
                  <a href={p.url} target="_blank" rel="noopener" className="btn-outline btn-sm">Visit</a>
                  <button className="btn-danger btn-sm" onClick={() => handleDelete(p._id!)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
