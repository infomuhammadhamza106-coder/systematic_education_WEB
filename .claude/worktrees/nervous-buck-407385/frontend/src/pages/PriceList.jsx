import { Link } from 'react-router-dom'
import './PriceList.css'

const accaData = [
  { code:'BT',  title:'Business and Technology',          validUntil:'August 2026',  pubDate:'May 2025',     textPrice:4720, kitPrice:3195 },
  { code:'MA',  title:'Management Accounting',            validUntil:'August 2026',  pubDate:'May 2025',     textPrice:4720, kitPrice:3195 },
  { code:'FA',  title:'Financial Accounting',             validUntil:'August 2026',  pubDate:'May 2025',     textPrice:4720, kitPrice:3195 },
  { code:'LW',  title:'Corporate and Business Law – Eng', validUntil:'August 2026',  pubDate:'May 2025',     textPrice:4720, kitPrice:3195 },
  { code:'PM',  title:'Performance Management',           validUntil:'August 2026',  pubDate:'May 2025',     textPrice:4720, kitPrice:3195 },
  { code:'TX',  title:'Taxation – UK (Fa2025)',           validUntil:'March 2026',   pubDate:'October 2025', textPrice:5200, kitPrice:4600, highlight:true },
  { code:'FR',  title:'Financial Reporting',              validUntil:'August 2026',  pubDate:'May 2025',     textPrice:4720, kitPrice:3195 },
  { code:'AA',  title:'Audit and Assurance',              validUntil:'August 2026',  pubDate:'May 2025',     textPrice:4720, kitPrice:3195 },
  { code:'FM',  title:'Financial Management',             validUntil:'August 2026',  pubDate:'May 2025',     textPrice:4720, kitPrice:3195 },
  { code:'SBL', title:'Strategic Business Leader',        validUntil:'August 2026',  pubDate:'May 2025',     textPrice:5050, kitPrice:4100 },
  { code:'SBR', title:'Strategic Business Reporting',     validUntil:'August 2026',  pubDate:'May 2025',     textPrice:5050, kitPrice:4100 },
  { code:'AFM', title:'Advanced Financial Management',    validUntil:'August 2026',  pubDate:'May 2025',     textPrice:4720, kitPrice:3195 },
  { code:'APM', title:'Advanced Performance Management',  validUntil:'August 2026',  pubDate:'May 2025',     textPrice:4720, kitPrice:3195 },
  { code:'ATX', title:'Advanced Taxation – UK (Fa25)',    validUntil:'March 2026',   pubDate:'October 2025', textPrice:5500, kitPrice:4600, highlight:true },
  { code:'AAA', title:'Advanced Audit & Assurance – INT/UK', validUntil:'August 2026', pubDate:'May 2025',   textPrice:4720, kitPrice:3195 },
]

export default function PriceList() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-label">Updated 2025–26</span>
          <h1>Price List 2025–26</h1>
          <p>All ACCA &amp; CIMA study material prices from Systematics Education, inclusive of the current discount.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* ACCA table */}
          <h2 className="section-title" style={{ marginBottom: '8px' }}>ACCA Study Texts and Exam Kits 2025–26</h2>
          <p style={{ color: 'var(--slate)', marginBottom: '12px', fontSize: '0.875rem' }}>
            Brand New Syllabus. Physical + eBook available. Prices in Rs.
          </p>
          <div className="price-notice">
            <strong>Note:</strong> TX (Fa2025) and ATX (Fa25) are October 2025 editions with updated valid-until dates.
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '56px' }}>
            <table className="price-table">
              <thead>
                <tr>
                  <th>#</th><th>Paper</th><th>Title</th><th>Valid Until</th>
                  <th>Pub Date</th><th>Study Text</th><th>Exam Kit</th><th>Type</th>
                </tr>
              </thead>
              <tbody>
                {accaData.map((r, i) => (
                  <tr key={r.code} style={r.highlight ? { background: '#fffbeb' } : {}}>
                    <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                    <td><strong>{r.code}</strong></td>
                    <td>{r.title}</td>
                    <td style={{ color: 'var(--slate)', whiteSpace: 'nowrap' }}>{r.validUntil}</td>
                    <td style={{ color: 'var(--slate)', whiteSpace: 'nowrap' }}>{r.pubDate}</td>
                    <td className="price-tag">Rs. {r.textPrice.toLocaleString()}</td>
                    <td className="price-tag">Rs. {r.kitPrice.toLocaleString()}</td>
                    <td><span className="type-badge type-both">Both</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CIMA */}
          <h2 className="section-title" style={{ marginBottom: '10px' }}>CIMA Books — Price List</h2>
          <p style={{ color: 'var(--slate)', marginBottom: '16px', fontSize: '0.875rem' }}>
            CIMA books are available as <strong>eBook only</strong>. Sold as complete sets.
          </p>
          <div className="price-notice price-notice-green" style={{ marginBottom: '36px' }}>
            Study Text: <strong>Rs. 6,000</strong> each &nbsp;|&nbsp; Exam Kit: <strong>Rs. 4,000</strong> each &nbsp;|&nbsp;
            Contact us for complete set bundle pricing.
          </div>

          {/* Delivery */}
          <h2 className="section-title" style={{ marginBottom: '16px' }}>Delivery Charges</h2>
          <div className="delivery-grid">
            <div className="delivery-card">
              <div className="delivery-card-label">Within Lahore</div>
              <div className="delivery-card-price">Rs. 300</div>
              <p>Flat rate. Cash on Delivery available.</p>
            </div>
            <div className="delivery-card">
              <div className="delivery-card-label">Outside Lahore</div>
              <div className="delivery-card-price">Rs. 350 <span>/kg</span></div>
              <p>e.g. 3 kg parcel = Rs. 1,050. Bank transfer required.</p>
            </div>
          </div>

          {/* Payment */}
          <div className="payment-card">
            <h3>Payment Details</h3>
            <p>Advance payment to our bank account. Cash on Delivery is only available for Lahore orders.</p>
            <div className="payment-account">
              <div className="payment-account-name">Systematics Education (SMC-PVT) LTD</div>
              <div className="payment-account-bank">UBL — United Bank Limited</div>
              <div className="payment-account-num">0110 0020 0007 1137</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
