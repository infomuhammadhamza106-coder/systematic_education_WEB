import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { placeOrder } from '../services/api'
import { Link } from 'react-router-dom'
import './Cart.css'

const BANK = {
  name:    'Systematics Education (SMC-PVT) LTD',
  account: '0110 0020 0007 1137',
  bank:    'UBL — United Bank Limited',
  iban:    'PK86UNIL0109000051137001',
}

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, totalPrice } = useCart()
  const [form, setForm]     = useState({ name: '', email: '', phone: '', city: '', address: '', payment: 'bank', bankRef: '' })
  const [ordered, setOrdered]   = useState(null)
  const [ordering, setOrdering] = useState(false)
  const [copied, setCopied]     = useState('')
  const [error, setError]       = useState('')

  const delivery = form.city.toLowerCase() === 'lahore'
    ? 300
    : cart.length > 0
      ? Math.ceil(350 * cart.reduce((k, i) => k + i.qty * 0.5, 0))
      : 0

  const handleOrder = async (e) => {
    e.preventDefault()
    if (ordering) return
    setError('')

    if (form.payment === 'bank' && !form.bankRef.trim()) {
      setError('Please enter your bank transaction ID before placing the order.')
      return
    }

    try {
      setOrdering(true)
      const res = await placeOrder({
        items:            cart,
        customerName:     form.name,
        email:            form.email,
        phone:            form.phone,
        city:             form.city,
        address:          form.address,
        paymentMethod:    form.payment,
        bankTransferRef:  form.payment === 'bank' ? form.bankRef.trim() : '',
      })
      setOrdered({ ...res.data, paymentMethod: form.payment })
      clearCart()
    } catch (err) {
      const msg = err?.response?.data?.message || ''
      setError(msg || 'Order failed. Please contact us on WhatsApp.')
    } finally {
      setOrdering(false)
    }
  }

  const copy = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  /* ── Empty cart ─────────────────────────────────────── */
  if (cart.length === 0 && !ordered) return (
    <section className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border-mid)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 20px' }}>
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <h2 className="cart-empty-title">Your cart is empty</h2>
        <p style={{ color: 'var(--slate)', marginBottom: '24px', fontSize: '0.925rem' }}>
          Browse our ACCA &amp; CIMA books and add them to your cart.
        </p>
        <Link to="/shop" className="btn btn-primary">Browse ACCA Books</Link>
      </div>
    </section>
  )

  /* ── Order success ──────────────────────────────────── */
  if (ordered) {
    const total   = ordered.order?.grandTotal || 0
    const orderId = ordered.order?.orderId || ''
    const isCOD   = ordered.paymentMethod === 'cod'

    const nextStepsCOD = [
      'We confirm your order on WhatsApp within a few minutes.',
      'Your books are packed and dispatched.',
      'Delivery via TCS / Leopard — payment collected at your door.',
      'You receive a tracking number on WhatsApp.',
    ]
    const nextStepsBank = [
      'We verify your bank transfer — usually within 1 hour.',
      'Your books are packed and marked Ready to Ship.',
      'Dispatched via TCS / Leopard with a tracking number.',
      'You are notified on WhatsApp at every step.',
    ]

    return (
      <section className="section">
        <div className="container" style={{ maxWidth: '640px' }}>

          <div className="order-success-header">
            <div className="order-success-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1>Order Placed Successfully</h1>
            <p>Order ID: <code>{orderId}</code></p>
          </div>

          {isCOD ? (
            <div className="order-step-card">
              <div className="order-step-heading">
                <span className="order-step-num order-step-num-light">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </span>
                <div>
                  <div className="order-step-title order-step-title-dark">Cash on Delivery</div>
                  <div className="order-step-sub order-step-sub-dark">Pay when your books arrive at your door</div>
                </div>
              </div>
              <div className="order-amount-row order-amount-row-light">
                <span>Amount to Pay on Delivery</span>
                <strong>Rs. {total.toLocaleString()}</strong>
              </div>
            </div>
          ) : (
            <div className="order-step-card order-step-dark">
              <div className="order-step-heading">
                <span className="order-step-num">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                <div>
                  <div className="order-step-title">Bank Transfer Received</div>
                  <div className="order-step-sub">Your transaction ID has been submitted. We will verify shortly.</div>
                </div>
              </div>
              <div className="order-amount-row">
                <span>Amount Transferred</span>
                <strong>Rs. {total.toLocaleString()}</strong>
              </div>
              {[
                { label: 'Account Name',   val: BANK.name,    key: 'name', mono: false },
                { label: 'Account Number', val: BANK.account, key: 'acc',  mono: true  },
                { label: 'Bank',           val: BANK.bank,    key: 'bank', mono: false },
                { label: 'IBAN',           val: BANK.iban,    key: 'iban', mono: true  },
              ].map(({ label, val, key, mono }) => (
                <div key={key} className="order-bank-row">
                  <span>{label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <strong style={{ fontFamily: mono ? 'monospace' : 'inherit', fontSize: mono ? '0.9rem' : '0.875rem' }}>{val}</strong>
                    <button className="copy-btn" onClick={() => copy(val, key)}>
                      {copied === key ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="order-next">
            <div className="order-next-title">What happens next?</div>
            {(isCOD ? nextStepsCOD : nextStepsBank).map(text => (
              <div key={text} className="order-next-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {text}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href={ordered.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              Chat on WhatsApp
            </a>
            <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
          </div>
        </div>
      </section>
    )
  }

  /* ── Cart page ──────────────────────────────────────── */
  return (
    <section className="section">
      <div className="container">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-layout">

          {/* Items */}
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.itemId} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-unit">Rs. {item.price.toLocaleString()} each</div>
                </div>
                <div className="cart-qty">
                  <button onClick={() => updateQty(item.itemId, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.itemId, item.qty + 1)}>+</button>
                </div>
                <div className="cart-item-total">Rs. {(item.price * item.qty).toLocaleString()}</div>
                <button className="cart-remove" onClick={() => removeFromCart(item.itemId)} aria-label="Remove">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Order form */}
          <div className="cart-order-panel">
            <h3 className="cart-panel-title">Place Order</h3>
            <form onSubmit={handleOrder}>

              <div className="form-group">
                <label>Full Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Phone / WhatsApp *</label>
                <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="optional" />
              </div>
              <div className="form-group">
                <label>City *</label>
                <input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="e.g. Lahore, Karachi..." />
              </div>
              <div className="form-group">
                <label>Detailed Address *</label>
                <textarea
                  required
                  rows={2}
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  placeholder="House/flat no., street, area, postal code..."
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <select value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}>
                  <option value="bank">Bank Transfer (UBL)</option>
                  <option value="cod">Cash on Delivery (Lahore only)</option>
                </select>
              </div>

              {form.payment === 'bank' && (
                <>
                  <div className="cart-bank-preview">
                    <div className="cart-bank-preview-label">Transfer to this account</div>
                    <div>Bank: <strong>UBL</strong></div>
                    <div>Account: <strong style={{ fontFamily: 'monospace' }}>0110 0020 0007 1137</strong></div>
                    <div>Name: <strong>Systematics Education (SMC-PVT) LTD</strong></div>
                  </div>
                  <div className="form-group">
                    <label>Bank Transaction ID *</label>
                    <input
                      required
                      placeholder="Enter your transaction / transfer reference number"
                      value={form.bankRef}
                      onChange={e => setForm({ ...form, bankRef: e.target.value })}
                    />
                    <div className="form-hint">Transfer first, then enter the transaction ID shown in your banking app.</div>
                  </div>
                </>
              )}

              {form.payment === 'cod' && (
                <div className="cart-cod-notice">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Cash on Delivery is available for Lahore orders only.
                </div>
              )}

              <div className="cart-totals">
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <strong>Rs. {totalPrice.toLocaleString()}</strong>
                </div>
                <div className="cart-total-row">
                  <span>Delivery</span>
                  <span>{form.city ? `Rs. ${delivery}` : 'Enter city first'}</span>
                </div>
                <div className="cart-total-row cart-grand-total">
                  <span>Total</span>
                  <strong>Rs. {(totalPrice + (form.city ? delivery : 0)).toLocaleString()}</strong>
                </div>
              </div>

              {error && <div className="cart-error">{error}</div>}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={ordering || cart.length === 0}>
                {ordering ? 'Placing Order...' : 'Place Order'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
