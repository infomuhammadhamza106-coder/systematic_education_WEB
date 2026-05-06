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
      setMenuOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">

        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src="/images/logo.jpeg" alt="Systematics Education" className="nav-logo-img" />
        </Link>

        {/* Search */}
        <div className="nav-search">
          <span className="search-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
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

          <Link to="/cart" className="cart-btn" onClick={() => setMenuOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

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
