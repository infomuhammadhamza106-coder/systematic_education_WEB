import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppFloat from './components/WhatsAppFloat'

import Home      from './pages/Home'
import Shop      from './pages/Shop'
import Cima      from './pages/Cima'
import PriceList from './pages/PriceList'
import Ebooks    from './pages/Ebooks'
import About     from './pages/About'
import FAQ       from './pages/FAQ'
import Contact   from './pages/Contact'
import Cart      from './pages/Cart'
import NotFound  from './pages/NotFound'
import ProductDetail     from './pages/ProductDetail'
import AccaProductDetail from './pages/AccaProductDetail'

import AdminLogin     from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

function AppShell() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <AnnouncementBar />}
      {!isAdmin && <Navbar />}
      {!isAdmin && <WhatsAppFloat />}

      <Routes>
        {/* ── Public ── */}
        <Route path="/"           element={<Home />} />
        <Route path="/shop"       element={<Shop />} />
        <Route path="/cima"       element={<Cima />} />
        <Route path="/price-list" element={<PriceList />} />
        <Route path="/ebooks"     element={<Ebooks />} />
        <Route path="/about"      element={<About />} />
        <Route path="/faq"        element={<FAQ />} />
        <Route path="/contact"    element={<Contact />} />
        <Route path="/cart"       element={<Cart />} />
        <Route path="/cima/:productId" element={<ProductDetail />} />
        <Route path="/acca/:id"       element={<AccaProductDetail />} />

        {/* ── Admin (no Navbar/Footer) ── */}
        <Route path="/admin"            element={<AdminLogin />} />
        <Route path="/admin/dashboard"  element={<AdminDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </CartProvider>
  )
}
