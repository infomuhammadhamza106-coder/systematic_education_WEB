import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { placeOrder } from '../services/api'
import { Link } from 'react-router-dom'
import API from '../services/api'
import './Cart.css'

const BANK = {
  name:    'Systematics Education (SMC-PVT) LTD',
  account: '0110 0020 0007 1137',
  bank:    'UBL — United Bank Limited',
  iban:    'PK86UNIL0109000051137001',
}

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, totalPrice } = useCart()
  const [form, setForm]       = useState({ name: '', email: '', phone: '', city: '', payment: 'bank' })
  const [ordered, setOrdered] = useState(null)
  const [refInput, setRefInput]   = useState('')
  const [refStatus, setRefStatus] = useState(null)
  const [copied, setCopied]       = useState('')

  const delivery = form.city.toLowerCase() === 'lahore'
    ? 300
    : cart.length > 0
      ? Math.ceil(350 * cart.reduce((k, i) => k + i.qty * 0.5, 0))
      : 0

  const handleOrder = async (e) => {
    e.preventDefault()
    try {
      const res = await placeOrder({
        items:         cart,
        customerName:  form.name,
        email:         form.email,
        phone:         form.phone,
        city:          form.city,
        paymentMethod: form.payment,
      })
      setOrdered(res.data)
      clearCart()
    } catch {
      alert('Order failed. Please contact us on WhatsApp.')
    }
  }

  const handleRefSubmit = async () => {
    if (!refInput.trim()) return
    setRefStatus('submitting')
    try {
      await API.patch(`/orders/${ordered.order.orderId}/payment-ref`, {
        bankTransferRef: refInput.trim(),
      })
      setRefStatus('done')
    } catch {
      setRefStatus('error')
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

    return (
      <section className="section">
        <div className="container" style={{ maxWidth: '660px' }}>

          <div className="order-success-header">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <h1>Order Placed Successfully</h1>
            <p>
              Your Order ID is{' '}
              <code>{orderId}</code>
            </p>
          </div>

          {/* Step 1 — Bank transfer */}
          <div className="order-step-card order-step-dark">
            <div className="order-step-heading">
              <span className="order-step-num">1</span>
              <div>
                <div className="order-step-title">Make Bank Transfer</div>
                <div className="order-step-sub">Transfer the exact amount below to our UBL account</div>
              </div>
            </div>

            <div className="order-amount-row">
              <span>Amount to Transfer</span>
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

            <div className="order-memo-notice">
              <strong>Important:</strong> When transferring, write your Order ID{' '}
              <code
                style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.12)', padding: '1px 6px', borderRadius: '3px' }}
                onClick={() => copy(orderId, 'orderid')}
              >
                {orderId}
              </code>
              {' '}in the <strong>Transfer Memo / Reference</strong> field.
            </div>
          </div>

          {/* Step 2 — Submit ref */}
          <div className="order-step-card">
            <div className="order-step-heading">
              <span className="order-step-num order-step-num-light">2</span>
              <div>
                <div className="order-step-title order-step-title-dark">Confirm Your Payment</div>
                <div className="order-step-sub order-step-sub-dark">Enter your transaction reference number after transferring</div>
              </div>
            </div>

            {refStatus === 'done' ? (
              <div className="ref-success">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <div>
                  <strong>Payment reference submitted.</strong>
                  <p>We'll verify your transfer and confirm your order on WhatsApp within 1 hour.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label>Bank Transaction / Transfer Reference No.</label>
                  <input
                    placeholder="e.g. TRX20250504001 or last 6 digits of transfer"
                    value={refInput}
                    onChange={e => setRefInput(e.target.value)}
                  />
                </div>

                {refStatus === 'error' && (
                  <p style={{ color: '#dc2626', fontSize: '0.82rem', marginBottom: '12px' }}>
                    Could not submit. Please send us the reference on WhatsApp instead.
                  </p>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleRefSubmit}
                    disabled={refStatus === 'submitting' || !refInput.trim()}
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    {refStatus === 'submitting' ? 'Submitting...' : 'Submit Payment Reference'}
                  </button>
                  <a href={ordered.whatsappUrl} target="_blank" rel="noreferrer"
                    className="btn btn-outline" style={{ justifyContent: 'center' }}>
                    WhatsApp
                  </a>
                </div>
              </>
            )}
          </div>

          {/* What's next */}
          <div className="order-next">
            <div className="order-next-title">What happens next?</div>
            {[
              'We verify your bank transfer — usually within 1 hour.',
              'Your books are packed and marked Ready to Ship.',
              'Dispatched via TCS / Leopard with a tracking number.',
              'You are notified on WhatsApp at every step.',
            ].map(text => (
              <div key={text} className="order-next-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {text}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
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
              <div className="form-group"><label>Full Name *</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="optional" /></div>
              <div className="form-group"><label>Phone / WhatsApp *</label><input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              <div className="form-group"><label>City *</label><input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="e.g. Lahore, Karachi..." /></div>
              <div className="form-group"><label>Payment Method</label>
                <select value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}>
                  <option value="bank">Bank Transfer (UBL)</option>
                  <option value="cod">Cash on Delivery (Lahore only)</option>
                </select>
              </div>

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

              {form.payment === 'bank' && (
                <div className="cart-bank-preview">
                  <div className="cart-bank-preview-label">Payment via Bank Transfer</div>
                  <div>Bank: <strong>UBL</strong></div>
                  <div>Account: <strong style={{ fontFamily: 'monospace' }}>0110 0020 0007 1137</strong></div>
                  <div>Name: <strong>Systematics Education (SMC-PVT) LTD</strong></div>
                  <div className="cart-bank-preview-note">Full payment details shown after placing the order.</div>
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Place Order
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
