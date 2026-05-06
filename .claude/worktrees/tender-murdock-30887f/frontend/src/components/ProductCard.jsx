import { Link, useNavigate } from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({ product, type = 'acca' }) {
  const navigate = useNavigate()

  const fallback = type === 'cima'
    ? '/images/cima_ebook.png'
    : product.category === 'knowledge'
    ? '/images/acca_knowledge.png'
    : product.category === 'skills'
    ? '/images/acca_skills.png'
    : '/images/acca_strategic.png'

  const img = product.img || fallback
  const detailPath = type === 'cima' ? `/cima/${product.id}` : `/acca/${product.id}`

  return (
    <div className="product-card" onClick={() => navigate(detailPath)} style={{ cursor: 'pointer' }}>
      <div className="product-card-img">
        <img src={img} alt={product.title} onError={e => { e.target.onerror = null; e.target.src = fallback }} />
        <span className={`product-badge ${type === 'cima' ? 'ebook' : 'physical'}`}>
          {type === 'cima' ? 'eBook Only' : 'Physical + eBook'}
        </span>
      </div>
      <div className="product-card-body">
        <h3 className="product-title">{product.code} — {product.title}</h3>
        <p className="product-desc">{product.desc}</p>
        {product.validUntil && (
          <div className="product-meta">Valid until: <strong>{product.validUntil}</strong></div>
        )}
        <div className="product-footer">
          <div className="product-prices">
            <div className="price-row">
              <span className="price-label">Study Text</span>
              <span className="price-val">Rs. {product.textPrice.toLocaleString()}</span>
            </div>
            <div className="price-row">
              <span className="price-label">Exam Kit</span>
              <span className="price-val">Rs. {product.kitPrice.toLocaleString()}</span>
            </div>
          </div>
          <Link to={detailPath} className="card-detail-link" onClick={e => e.stopPropagation()}>
            View &amp; Buy →
          </Link>
        </div>
      </div>
    </div>
  )
}
