import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchVal.trim())}`)
      setSearchVal('')
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">

        {/* Logo */}
        <Link to="/" className="nav-logo">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-logo-svg">
            <path d="M18 2L32 10V26L18 34L4 26V10L18 2Z" fill="url(#ng)" />
            <rect x="11" y="14" width="6" height="9" rx="1" fill="white" opacity="0.3"/>
            <rect x="19" y="14" width="6" height="9" rx="1" fill="white" opacity="0.3"/>
            <line x1="18" y1="13.5" x2="18" y2="23.5" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="10.5" y1="23.5" x2="25.5" y2="23.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            <line x1="10.5" y1="14.5" x2="25.5" y2="14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            <path d="M18 11L19.2 8.5H16.8L18 5.5" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="ng" x1="4" y1="2" x2="32" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1A3F7A"/>
                <stop offset="1" stopColor="#2557B0"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="nav-logo-text">
            <h1>Systematics Education</h1>
            <span>Empowering Professionals</span>
          </div>
        </Link>

        {/* Search */}
        <div className="nav-search">
          <span className="search-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search books..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Links */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/"           end    onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/shop"              onClick={() => setMenuOpen(false)}>ACCA Books</NavLink>
          <NavLink to="/cima"              onClick={() => setMenuOpen(false)}>CIMA Books</NavLink>
          <NavLink to="/price-list"        onClick={() => setMenuOpen(false)}>Price List</NavLink>
          <NavLink to="/ebooks"            onClick={() => setMenuOpen(false)}>eBooks</NavLink>
          <NavLink to="/about"             onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/faq"               onClick={() => setMenuOpen(false)}>FAQs</NavLink>

          {/* Cart */}
          <Link to="/cart" className="cart-btn" onClick={() => setMenuOpen(false)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {/* CTA */}
          <NavLink to="/contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Contact Us
          </NavLink>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  )
}
