import { useState } from 'react'
import { sendContact } from '../services/api'

const icons = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.41 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  landline: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <line x1="12" y1="18" x2="12" y2="18"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  arrowRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
}

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', message: '', subject: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await sendContact(form)
      setStatus({ type: 'success', msg: res.data.message, waUrl: res.data.whatsappUrl })
      setForm({ name: '', email: '', phone: '', message: '', subject: '' })
    } catch {
      setStatus({ type: 'error', msg: 'Something went wrong. Please try WhatsApp directly.' })
    } finally {
      setLoading(false)
    }
  }

  const contacts = [
    { icon: icons.whatsapp, label: 'WhatsApp (Preferred)', val: '0321 8488802', sub: 'Fastest reply — usually within an hour', href: 'https://wa.me/923218488802', accent: true },
    { icon: icons.phone,    label: 'Mobile',               val: '0321 8488802', sub: 'Call us directly',                       href: 'tel:03218488802' },
    { icon: icons.landline, label: 'Landline',              val: '0435 782000',  sub: 'Office line',                            href: 'tel:0435782000' },
    { icon: icons.mail,     label: 'Email',                 val: 'madiha@systematics.com.pk', sub: 'We reply within 24 hours', href: 'mailto:madiha@systematics.com.pk' },
    { icon: icons.map,      label: 'Location',              val: 'Lahore, Pakistan', sub: 'Nationwide delivery available',      href: null },
  ]

  const metrics = [
    { val: '< 1 Hour', label: 'WhatsApp Reply Time' },
    { val: '1–5 Days', label: 'Nationwide Delivery' },
    { val: '25+ Years', label: 'Trusted in Pakistan' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Get in Touch</div>
          <h1>Contact Us</h1>
          <p>Have a question about ACCA or CIMA books? We usually reply within an hour on WhatsApp.</p>
        </div>
      </section>

      {/* Metrics bar */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="stats-grid">
            {metrics.map(m => (
              <div key={m.label} className="stat-item">
                <div className="stat-num">{m.val}</div>
                <div className="stat-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">

            {/* Left — Info */}
            <div className="contact-info-card">
              <h3>Let's Talk</h3>
              <p>Reach us through any channel below. WhatsApp is the fastest way to get a response.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '32px' }}>
                {contacts.map(({ icon, label, val, sub, href, accent }) => (
                  <div key={label} className="contact-detail">
                    <div className="contact-detail-icon" style={accent ? { background: '#25D366' } : {}}>
                      {icon}
                    </div>
                    <div className="contact-detail-text">
                      <strong>{label}</strong>
                      {href
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                            <span>{val}</span>
                          </a>
                        : <span>{val}</span>
                      }
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: '1px' }}>{sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bank */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
                <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, color: 'var(--green)', marginBottom: '12px' }}>
                  Bank Account
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px', fontSize: '0.84rem', lineHeight: 1.8 }}>
                  <div style={{ fontWeight: 600, color: '#fff', marginBottom: '4px' }}>Systematics Education (SMC-PVT) LTD</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '4px' }}>UBL — United Bank Limited</div>
                  <div style={{ fontFamily: 'monospace', color: '#4ADE80', fontSize: '0.95rem', fontWeight: 700 }}>0110 0020 0007 1137</div>
                </div>
              </div>

              <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer"
                className="btn btn-green" style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}>
                {icons.whatsapp} Chat on WhatsApp
              </a>
            </div>

            {/* Right — Form */}
            <div className="contact-form-card">
              <h3 style={{ fontFamily: 'Outfit', color: 'var(--navy)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
                Send a Message
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '28px' }}>
                Fill the form below and we'll respond promptly, or contact us directly on WhatsApp.
              </p>

              {status && (
                <div style={{
                  marginBottom: '24px', padding: '14px 18px', borderRadius: '10px',
                  background: status.type === 'success' ? '#F0FDF4' : '#FEF2F2',
                  border: `1px solid ${status.type === 'success' ? '#86EFAC' : '#FECACA'}`,
                  color:  status.type === 'success' ? '#166534' : '#991B1B',
                  fontSize: '0.88rem', display: 'flex', alignItems: 'flex-start', gap: '10px',
                }}>
                  <span style={{ flexShrink: 0, marginTop: '1px' }}>
                    {status.type === 'success' ? icons.check : '×'}
                  </span>
                  <span>
                    {status.msg}
                    {status.waUrl && (
                      <a href={status.waUrl} target="_blank" rel="noreferrer"
                        style={{ marginLeft: '8px', fontWeight: 700, color: '#166534' }}>
                        Open WhatsApp {icons.arrowRight}
                      </a>
                    )}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Full Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ahmed Khan" />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label>Phone / WhatsApp</label>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="03XX XXXXXXX" />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label>Email Address *</label>
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                    <option value="">Select a topic...</option>
                    <option value="order">Place / Track an Order</option>
                    <option value="acca">ACCA Book Enquiry</option>
                    <option value="cima">CIMA Book Enquiry</option>
                    <option value="bulk">Bulk / Institutional Order</option>
                    <option value="ebook">eBook Access Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us which books you need, your city, and any other details..." style={{ minHeight: '130px' }} />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                    {!loading && icons.arrowRight}
                  </button>
                  <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer"
                    className="btn btn-green" style={{ flex: 1, justifyContent: 'center' }}>
                    WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section style={{ background: 'var(--navy)', color: '#fff', padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>{icons.clock}</span>
              <h3 style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Business Hours</h3>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>
              WhatsApp orders are accepted 24/7. Office hours below.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { day: 'Mon – Fri', hours: '9:00 AM – 6:00 PM' },
              { day: 'Saturday',  hours: '10:00 AM – 4:00 PM' },
              { day: 'Sunday',    hours: 'WhatsApp Only' },
            ].map(({ day, hours }) => (
              <div key={day} style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '20px 32px', minWidth: '180px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>{day}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{hours}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
