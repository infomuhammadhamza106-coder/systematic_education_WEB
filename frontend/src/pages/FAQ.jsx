import { useState } from 'react'

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const faqs = [
    { q: 'How long does delivery take?', a: 'Orders within Lahore are delivered in 1–2 working days. Nationwide delivery takes 3–5 working days via our courier partners.' },
    { q: 'What payment methods do you accept?', a: 'Cash on Delivery (COD) is only available for Lahore. For all other cities, orders must be paid through bank transfer before dispatch.' },
    { q: 'Are these books 100% genuine & ACCA-approved?', a: 'Yes. Systematics Education is an authorised ACCA study material distributor. Every book carries the official ACCA Approved Content seal and includes free MyKaplan online access.' },
    { q: 'Can I order in bulk for a college or study group?', a: 'Absolutely. We offer special discounts on bulk and institutional orders. Contact us on WhatsApp 0321 8488802 or email madiha@systematics.com.pk for a custom quote.' },
    { q: 'What if I receive a damaged book?', a: "Inspect your parcel on delivery. If a book is damaged, contact us within 48 hours and we'll arrange a free replacement." },
    { q: 'How do I access my eBook after purchase?', a: 'After verifying your payment receipt, your eBook access code will be sent via email or WhatsApp within 24 hours. Log in to MyKaplan and access your materials via BibliU on any device.' },
    { q: 'How are delivery charges calculated?', a: 'Within Lahore: Flat rate of PKR 300. Outside Lahore: PKR 350 per kg. For example, 3 kg parcel = PKR 1,050.' },
    { q: 'Are CIMA books available as physical copies?', a: 'No. CIMA books are eBook only. We sell complete sets — Study Texts (Rs. 6,000 each) and Exam Kits (Rs. 4,000 each). Contact us for bundle pricing.' },
  ]
  return (
    <>
      <section className="page-hero">
        <div className="container"><span className="badge">Help Centre</span><h1>Frequently Asked Questions</h1><p>Everything you need to know before placing your order.</p></div>
      </section>
      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>{f.q}<span className="faq-icon">+</span></div>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px', background: '#F5F8FF', borderRadius: '16px', padding: '40px' }}>
            <h3 style={{ fontFamily: 'Outfit', color: '#0D1B3E', marginBottom: '8px' }}>Still have questions?</h3>
            <p style={{ color: '#475569', marginBottom: '20px' }}>We usually reply within an hour on WhatsApp.</p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/923218488802" target="_blank" rel="noreferrer" className="btn btn-green">💬 Chat on WhatsApp</a>
              <a href="/contact" className="btn btn-primary">✉️ Send a Message</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
