import { useState } from 'react'
import './Ebooks.css'

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const faqs = [
    { q: 'How long does delivery take?', a: 'Orders within Lahore are delivered in 1–2 working days. Nationwide delivery takes 3–5 working days via our courier partners.' },
    { q: 'What payment methods do you accept?', a: 'Cash on Delivery (COD) is only available for Lahore. For all other cities, orders must be paid through bank transfer before dispatch.' },
    { q: 'Are these books 100% genuine and ACCA-approved?', a: 'Yes. Systematics Education is an authorised ACCA study material distributor. Every book carries the official ACCA Approved Content seal and includes free MyKaplan online access.' },
    { q: 'Can I order in bulk for a college or study group?', a: 'Absolutely. We offer special discounts on bulk and institutional orders. Contact us on WhatsApp 0321 8488802 or email madiha@systematics.com.pk for a custom quote.' },
    { q: 'What if I receive a damaged book?', a: "Inspect your parcel on delivery. If a book is damaged, contact us within 48 hours and we'll arrange a free replacement." },
    { q: 'How do I access my eBook after purchase?', a: 'After verifying your payment receipt, your eBook access code will be sent via email or WhatsApp within 24 hours. Log in to MyKaplan and access your materials via BibliU on any device.' },
    { q: 'How are delivery charges calculated?', a: 'Within Lahore: Flat rate of PKR 300. Outside Lahore: PKR 350 per kg. For example, a 3 kg parcel = PKR 1,050.' },
    { q: 'Are CIMA books available as physical copies?', a: 'No. CIMA books are eBook only. We sell complete sets — Study Texts (Rs. 6,000 each) and Exam Kits (Rs. 4,000 each). Contact us for bundle pricing.' },
  ]

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-label">Help Centre</span>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know before placing your order.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}
                  <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>

          <div className="faq-cta">
            <h3>Still have questions?</h3>
            <p>We usually reply within an hour on WhatsApp.</p>
            <div className="faq-cta-actions">
              <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer" className="btn btn-primary">
                Chat on WhatsApp
              </a>
              <a href="/contact" className="btn btn-outline">Send a Message</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
