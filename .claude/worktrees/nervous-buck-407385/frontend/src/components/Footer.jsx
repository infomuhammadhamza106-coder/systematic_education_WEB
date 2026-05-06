import { Link } from 'react-router-dom'
import './Footer.css'

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.41 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const WAIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/images/logo.jpeg" alt="Systematics Education" className="footer-logo-img" />
            </div>
            <p>Pakistan's trusted ACCA &amp; CIMA study material distributor. Genuine Kaplan publications, delivered nationwide for over 25 years.</p>
            <div className="footer-social">
              <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer" title="WhatsApp" className="social-wa"><WAIcon /></a>
              <a href="mailto:madiha@systematics.com.pk" title="Email"><MailIcon /></a>
              <a href="tel:03218488802" title="Call"><PhoneIcon /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">ACCA Books</Link></li>
              <li><Link to="/cima">CIMA Books</Link></li>
              <li><Link to="/price-list">Price List 2025–26</Link></li>
              <li><Link to="/ebooks">eBooks</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          {/* ACCA Levels */}
          <div className="footer-col">
            <h4>ACCA Levels</h4>
            <ul>
              <li><Link to="/shop?category=knowledge">Applied Knowledge</Link></li>
              <li><Link to="/shop?category=skills">Applied Skills</Link></li>
              <li><Link to="/shop?category=professional">Strategic Professional</Link></li>
              <li><Link to="/cima">CIMA eBooks</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="tel:03218488802" className="footer-contact-link">
                  <PhoneIcon /> 0321 8488802
                </a>
              </li>
              <li>
                <a href="tel:0435782000" className="footer-contact-link">
                  <PhoneIcon /> 0435 782000
                </a>
              </li>
              <li>
                <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer" className="footer-contact-link">
                  <WAIcon /> WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:madiha@systematics.com.pk" className="footer-contact-link">
                  <MailIcon /> madiha@systematics.com.pk
                </a>
              </li>
              <li className="footer-contact-link" style={{ cursor: 'default' }}>
                <MapPinIcon /> Lahore, Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Systematics Education (SMC-PVT) LTD. All rights reserved.</p>
          <p className="footer-bottom-right">Official ACCA Approved Distributor</p>
        </div>
      </div>
    </footer>
  )
}
