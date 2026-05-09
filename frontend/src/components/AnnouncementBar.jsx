import { Link } from 'react-router-dom'
import './AnnouncementBar.css'

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="ann-glow" />
      <div className="announcement-inner">
        <span className="ann-emoji">🎓</span>
        <span className="ann-text">Special Offers for Students</span>
        <Link to="/shop" className="ann-link">Shop Now →</Link>
      </div>
    </div>
  )
}
