import { Link } from 'react-router-dom'
import './AnnouncementBar.css'

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-inner">
        <span className="announcement-dot" />
        <span>
          2025–26 ACCA &amp; CIMA Study Materials Now Available — 
          <strong> Official Kaplan Publications</strong>
        </span>
        <Link to="/shop" className="shop-now-btn">Browse Books</Link>
      </div>
    </div>
  )
}
