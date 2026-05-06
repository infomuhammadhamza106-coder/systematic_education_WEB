import './PriceList.css'

const BookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)
const KitIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)

const SECTIONS = [
  {
    label: 'Applied Knowledge',
    color: '#15803d',
    rows: [
      { code: 'BT',  title: 'Business and Technology',          validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-bt2cb489ef-b1e6-4ba4-a2e6-1ba43c7ecbad.webp' },
      { code: 'MA',  title: 'Management Accounting',            validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-ma.webp' },
      { code: 'FA',  title: 'Financial Accounting',             validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-fa.webp' },
    ],
  },
  {
    label: 'Applied Skills',
    color: '#1d4ed8',
    rows: [
      { code: 'LW',  title: 'Corporate and Business Law (Eng)', validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-lw-eng.webp' },
      { code: 'PM',  title: 'Performance Management',           validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-pm89bf87f5-c689-42a2-9318-0495432316be.webp' },
      { code: 'TX',  title: 'Taxation – UK (Fa2025)',           validUntil: 'March 2026',   pubDate: 'October 2025', textPrice: 5200, kitPrice: 4600, thumb: '/images/study-text-acca-tx-product.png' },
      { code: 'FR',  title: 'Financial Reporting',              validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-fr8508f876-99c5-46da-97f5-868928393e27.webp' },
      { code: 'AA',  title: 'Audit and Assurance',              validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-aabab9d204-e1aa-4a05-b600-11bec7dbdb5c.webp' },
      { code: 'FM',  title: 'Financial Management',             validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-fmab6d5c11-6330-49ff-b33f-4cde1d124ff4.webp' },
    ],
  },
  {
    label: 'Strategic Professional',
    color: '#0f2044',
    rows: [
      { code: 'SBL', title: 'Strategic Business Leader',              validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 5050, kitPrice: 4100, thumb: '/images/study-text-acca-sbl61e42e3e-0f82-41df-b99b-a88e39e1f2bc.webp' },
      { code: 'SBR', title: 'Strategic Business Reporting',           validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 5050, kitPrice: 4100, thumb: '/images/study-text-acca-sbr29e64684-bce1-42ca-bce3-f8c07cdff017.webp' },
      { code: 'AFM', title: 'Advanced Financial Management',          validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-afmeac7bfc1-f76c-4632-8185-9f11528f9658.webp' },
      { code: 'APM', title: 'Advanced Performance Management',        validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-apm994362aa-d200-4eee-b8be-1e23a88a7b7a.webp' },
      { code: 'ATX', title: 'Advanced Taxation – UK (Fa25)',          validUntil: 'March 2026',   pubDate: 'October 2025', textPrice: 5500, kitPrice: 4600, thumb: '/images/study-text-acca-atx-product.png' },
      { code: 'AAA', title: 'Advanced Audit & Assurance – INT/UK',    validUntil: 'August 2026',  pubDate: 'May 2025',     textPrice: 4720, kitPrice: 3195, thumb: '/images/study-text-acca-aaa2fcd9bd8-c166-49b9-812e-debe49992f76.webp' },
    ],
  },
]

const CIMA_SECTIONS = [
  {
    label: 'CIMA Certificate – Fundamentals',
    color: '#047857',
    rows: [
      { code: 'BA1', title: 'Fundamentals of Business Economics', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-certificate-fundamentals-of-business-economics-ba1-2x.png' },
      { code: 'BA2', title: 'Fundamentals of Management Accounting', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-certificate-fundamentals-of-ethics-corporate-governance-and-business-law-ba2-2x.png' },
      { code: 'BA3', title: 'Fundamentals of Financial Accounting', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-certificate-fundamentals-of-ethics-corporate-governance-and-business-law-ba3-2x.png' },
      { code: 'BA4', title: 'Fundamentals of Ethics, Corporate Governance & Business Law', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-certificate-fundamentals-of-ethics-corporate-governance-and-business-law-ba4-2x.png' },
    ],
  },
  {
    label: 'CIMA Professional – Operational',
    color: '#0f4b9e',
    rows: [
      { code: 'E1', title: 'Managing Finance in a Digital World', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-operational-e1c1d420ad2adb676aab54ff5000b377c6.png' },
      { code: 'P1', title: 'Management Accounting', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-operational-p12edf20ad2adb676aab54ff5000b377c6.png' },
      { code: 'F1', title: 'Financial Reporting', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-operational-f194d620ad2adb676aab54ff5000b377c6.png' },
    ],
  },
  {
    label: 'CIMA Professional – Management',
    color: '#7c3aed',
    rows: [
      { code: 'E2', title: 'Managing Performance', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-management-e2afd720ad2adb676aab54ff5000b377c6.png' },
      { code: 'P2', title: 'Advanced Management Accounting', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-management-p2c9d720ad2adb676aab54ff5000b377c6.png' },
      { code: 'F2', title: 'Advanced Financial Reporting', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-management-f2b1d820ad2adb676aab54ff5000b377c6.png' },
    ],
  },
  {
    label: 'CIMA Professional – Strategic',
    color: '#be185d',
    rows: [
      { code: 'E3', title: 'Strategic Management', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-strategic-e3cbd820ad2adb676aab54ff5000b377c6.png' },
      { code: 'P3', title: 'Risk Management', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-strategic-p3b2d920ad2adb676aab54ff5000b377c6.png' },
      { code: 'F3', title: 'Financial Strategy', validUntil: 'August 2026', pubDate: 'May 2025', textPrice: 6000, kitPrice: 4000, thumb: '/images/study-text-cima-strategic-f3ccd920ad2adb676aab54ff5000b377c6.png' },
    ],
  },
]

function PriceTable({ rows, color }) {
  return (
    <div className="pl-table-wrap">
      <table className="pl-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Valid Until</th>
            <th>Pub Date</th>
            <th><BookIcon /> Study Text</th>
            <th><KitIcon /> Exam Kit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.code}>
              <td>
                <div className="pl-subject">
                  {r.thumb && <img className="pl-thumb" src={r.thumb} alt={`${r.title} cover`} />}
                  <span>{r.title}</span>
                </div>
              </td>
              <td className="pl-date">{r.validUntil}</td>
              <td className="pl-date">{r.pubDate}</td>
              <td className="pl-price">Rs. {r.textPrice.toLocaleString()}</td>
              <td className="pl-price">Rs. {r.kitPrice.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PriceList() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="page-hero-label">Updated 2025–26</span>
          <h1>Price List</h1>
          <p>All ACCA and CIMA study material prices. ACCA books are available physical + eBook; CIMA books are eBook only. Prices in PKR.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* ACCA sections */}
          {SECTIONS.map(s => (
            <div key={s.label} className="pl-section">
              <div className="pl-section-heading">
                <span className="pl-dot" style={{ background: s.color }} />
                <h2 className="pl-section-title">{s.label}</h2>
              </div>
              <PriceTable rows={s.rows} color={s.color} />
            </div>
          ))}

          {/* CIMA sections */}
          {CIMA_SECTIONS.map(s => (
            <div key={s.label} className="pl-section">
              <div className="pl-section-heading">
                <span className="pl-dot" style={{ background: s.color }} />
                <h2 className="pl-section-title">{s.label}</h2>
              </div>
              <PriceTable rows={s.rows} color={s.color} />
            </div>
          ))}

          {/* Delivery */}
          <div className="pl-section">
            <div className="pl-section-heading">
              <span className="pl-dot" style={{ background: '#7c3aed' }} />
              <h2 className="pl-section-title">Delivery Charges</h2>
            </div>
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
