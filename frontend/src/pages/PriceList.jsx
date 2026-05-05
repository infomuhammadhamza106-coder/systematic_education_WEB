import { Link } from 'react-router-dom'

const accaData = [
  { code:'BT', title:'Business and Technology', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
  { code:'MA', title:'Management Accounting', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
  { code:'FA', title:'Financial Accounting', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
  { code:'LW', title:'Corporate and Business Law – Eng', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
  { code:'PM', title:'Performance Management', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
  { code:'TX', title:'Taxation – UK (Fa2025)', validUntil:'March 2026', pubDate:'October 2025', textPrice:5200, kitPrice:4600, highlight:true },
  { code:'FR', title:'Financial Reporting', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
  { code:'AA', title:'Audit and Assurance', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
  { code:'FM', title:'Financial Management', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
  { code:'SBL', title:'Strategic Business Leader', validUntil:'August 2026', pubDate:'May 2025', textPrice:5050, kitPrice:4100 },
  { code:'SBR', title:'Strategic Business Reporting', validUntil:'August 2026', pubDate:'May 2025', textPrice:5050, kitPrice:4100 },
  { code:'AFM', title:'Advanced Financial Management', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
  { code:'APM', title:'Advanced Performance Management', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
  { code:'ATX', title:'Advanced Taxation – UK (Fa25)', validUntil:'March 2026', pubDate:'October 2025', textPrice:5500, kitPrice:4600, highlight:true },
  { code:'AAA', title:'Advanced Audit & Assurance – INT/UK', validUntil:'August 2026', pubDate:'May 2025', textPrice:4720, kitPrice:3195 },
]

export default function PriceList() {
  return (
    <>
      <section className="page-hero">
        <div className="container"><span className="badge">Updated 2025–26</span><h1>Price List 2025–26</h1><p>All ACCA & CIMA study material prices from Systematics Education. Inclusive of 25% limited-time discount.</p></div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '8px' }}>ACCA Study Texts and Exam Kits 2025–26</h2>
          <p style={{ color: '#475569', marginBottom: '6px' }}>Brand New Syllabus. Physical + eBook available. Prices in Rs.</p>
          <div style={{ background: '#EEF4FF', border: '1px solid rgba(27,63,139,0.2)', borderRadius: '8px', padding: '10px 16px', marginBottom: '20px', fontSize: '0.84rem', color: '#1B3F8B' }}>
            ℹ️ <strong>Valid Until</strong> dates as per the official 2025–26 schedule. TX (Fa2025) and ATX (Fa25) are October 2025 editions.
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="price-table">
              <thead><tr><th>#</th><th>Paper</th><th>Title</th><th>Valid Until</th><th>Pub Date</th><th>Study Text</th><th>Exam Kit</th><th>Type</th></tr></thead>
              <tbody>
                {accaData.map((r, i) => (
                  <tr key={r.code} style={r.highlight ? { background: '#FFF7ED' } : {}}>
                    <td>{i + 1}</td><td><strong>{r.code}</strong></td><td>{r.title}</td>
                    <td>{r.validUntil}</td><td>{r.pubDate}</td>
                    <td className="price-tag">Rs. {r.textPrice.toLocaleString()}</td>
                    <td className="price-tag">Rs. {r.kitPrice.toLocaleString()}</td>
                    <td><span className="type-badge type-both">Both</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="section-title" style={{ marginTop: '56px', marginBottom: '12px' }}>CIMA Books — Price List</h2>
          <p style={{ color: '#475569', marginBottom: '8px' }}>CIMA books are available as <strong>eBook only</strong>. Sold as complete sets.</p>
          <div style={{ background: '#EEF9F4', border: '1px solid rgba(26,92,78,0.2)', borderRadius: '8px', padding: '12px 18px', marginBottom: '24px', fontSize: '0.88rem', color: '#1a5c4e' }}>
            Study Text: <strong>Rs. 6,000</strong> each | Exam Kit: <strong>Rs. 4,000</strong> each | Contact for set bundle pricing.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '48px' }}>
            <div style={{ background: '#F5F8FF', borderRadius: '12px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#1B3F8B', fontSize: '1rem' }}>Within Lahore</strong>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#5CB847', fontFamily: 'Outfit', margin: '8px 0' }}>Rs. 300</div>
              <p style={{ fontSize: '0.84rem', color: '#475569' }}>Flat rate. Cash on Delivery available.</p>
            </div>
            <div style={{ background: '#F5F8FF', borderRadius: '12px', padding: '24px', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#1B3F8B', fontSize: '1rem' }}>Outside Lahore</strong>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563A8', fontFamily: 'Outfit', margin: '8px 0' }}>Rs. 350/kg</div>
              <p style={{ fontSize: '0.84rem', color: '#475569' }}>e.g. 3 kg parcel = Rs. 1,050. Bank transfer required.</p>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg,#0D1B3E,#1B3F8B)', borderRadius: '16px', padding: '32px', marginTop: '28px', color: '#fff' }}>
            <h3 style={{ fontFamily: 'Outfit', marginBottom: '8px' }}>💳 Payment Details</h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', marginBottom: '16px' }}>Advance payment to bank account. COD only for Lahore orders.</p>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '16px 20px' }}>
              <strong>Systematics Education (SMC-PVT) LTD</strong><br />
              Account No: <strong>0110 0020 0007 1137</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
