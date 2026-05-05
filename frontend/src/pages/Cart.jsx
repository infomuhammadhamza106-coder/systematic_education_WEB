import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { placeOrder } from '../services/api'
import { Link } from 'react-router-dom'
import API from '../services/api'

const BANK = {
  name:    'Systematics Education (SMC-PVT) LTD',
  account: '0110 0020 0007 1137',
  bank:    'UBL (United Bank Limited)',
  iban:    'PK86UNIL0109000051137001',
}

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, totalPrice } = useCart()
  const [form, setForm]       = useState({ name: '', email: '', phone: '', city: '', payment: 'bank' })
  const [ordered, setOrdered] = useState(null)

  // Payment ref step
  const [refInput,    setRefInput]    = useState('')
  const [refStatus,   setRefStatus]   = useState(null)  // null | 'submitting' | 'done' | 'error'
  const [copied,      setCopied]      = useState('')

  const delivery = form.city.toLowerCase() === 'lahore'
    ? 300
    : cart.length > 0
      ? Math.ceil(350 * cart.reduce((k, i) => k + i.qty * 0.5, 0))
      : 0

  // ── Place order ────────────────────────────────────────
  const handleOrder = async (e) => {
    e.preventDefault()
    try {
      const res = await placeOrder({
        items:        cart,
        customerName: form.name,
        email:        form.email,
        phone:        form.phone,
        city:         form.city,
        paymentMethod: form.payment,
      })
      setOrdered(res.data)
      clearCart()
    } catch {
      alert('Order failed. Please contact us on WhatsApp.')
    }
  }

  // ── Submit bank transfer ref ───────────────────────────
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

  // ── Copy to clipboard helper ───────────────────────────
  const copy = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  // ── Empty cart ─────────────────────────────────────────
  if (cart.length === 0 && !ordered) return (
    <section className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ fontFamily: 'Outfit', color: '#0D1B3E', marginBottom: '8px' }}>Your cart is empty</h2>
        <p style={{ color: '#475569', marginBottom: '24px' }}>Browse our ACCA &amp; CIMA books and add them to your cart.</p>
        <Link to="/shop" className="btn btn-primary">Browse ACCA Books</Link>
      </div>
    </section>
  )

  // ── Order success screen ───────────────────────────────
  if (ordered) {
    const total = ordered.order?.grandTotal || 0
    const orderId = ordered.order?.orderId || ''

    return (
      <section className="section">
        <div className="container" style={{ maxWidth: '680px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>✅</div>
            <h1 style={{ fontFamily: 'Outfit', color: '#0D1B3E', fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
              Order Placed Successfully!
            </h1>
            <p style={{ color: '#64748B' }}>
              Your Order ID is{' '}
              <strong style={{ color: '#1B3F8B', fontFamily: 'monospace', fontSize: '1rem' }}>{orderId}</strong>
            </p>
          </div>

          {/* ── STEP 1: Payment instructions ── */}
          <div style={{
            background: 'linear-gradient(135deg, #0D1B3E, #1B3F8B)',
            borderRadius: '16px', padding: '28px', marginBottom: '20px', color: '#fff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.4rem' }}>💳</span>
              <div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.1rem' }}>Step 1 — Make Bank Transfer</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>Transfer the exact amount below to our UBL account</div>
              </div>
            </div>

            {/* Amount */}
            <div style={{
              background: 'rgba(126,217,87,0.15)', border: '1px solid rgba(126,217,87,0.4)',
              borderRadius: '10px', padding: '16px 20px', marginBottom: '16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>Amount to Transfer</span>
              <strong style={{ fontFamily: 'Outfit', fontSize: '1.5rem', color: '#7ED957' }}>
                Rs. {total.toLocaleString()}
              </strong>
            </div>

            {/* Bank details */}
            {[
              { label: 'Account Name',   val: BANK.name,    key: 'name' },
              { label: 'Account Number', val: BANK.account, key: 'acc' },
              { label: 'Bank',           val: BANK.bank,    key: 'bank' },
              { label: 'IBAN',           val: BANK.iban,    key: 'iban' },
            ].map(({ label, val, key }) => (
              <div key={key} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>{label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <strong style={{ fontSize: '0.88rem', fontFamily: key === 'acc' || key === 'iban' ? 'monospace' : 'inherit' }}>
                    {val}
                  </strong>
                  <button
                    onClick={() => copy(val, key)}
                    style={{
                      background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '4px',
                      padding: '3px 8px', color: '#fff', fontSize: '0.72rem', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {copied === key ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}

            {/* Important tip */}
            <div style={{
              background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)',
              borderRadius: '10px', padding: '14px 16px', marginTop: '18px',
              display: 'flex', gap: '10px', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>⚠️</span>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                <strong style={{ color: '#FCD34D' }}>Important:</strong> When making the transfer, write your Order ID{' '}
                <span
                  style={{ fontFamily: 'monospace', background: 'rgba(255,255,255,0.12)', padding: '1px 6px', borderRadius: '4px', cursor: 'pointer' }}
                  onClick={() => copy(orderId, 'orderid')}
                >
                  {orderId}
                </span>
                {' '}in the <strong>Transfer Memo / Reference</strong> field. This helps us match your payment instantly.
              </div>
            </div>
          </div>

          {/* ── STEP 2: Submit transfer reference ── */}
          <div style={{
            background: '#fff', border: '1px solid #E2E8F0',
            borderRadius: '16px', padding: '28px', marginBottom: '20px',
            boxShadow: '0 4px 16px rgba(27,63,139,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.4rem' }}>📋</span>
              <div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.05rem', color: '#0D1B3E' }}>
                  Step 2 — Confirm Your Payment
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  After transferring, enter your transaction reference number below
                </div>
              </div>
            </div>

            {refStatus === 'done' ? (
              <div style={{
                background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '10px',
                padding: '16px', textAlign: 'center', color: '#166534',
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🎉</div>
                <strong>Payment reference submitted!</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                  We'll verify your transfer and confirm your order on WhatsApp within 1 hour.
                </p>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>
                    Bank Transaction / Transfer Reference No.
                  </label>
                  <input
                    className="form-group input"
                    placeholder="e.g. TRX20250504001 or last 6 digits of transfer"
                    value={refInput}
                    onChange={e => setRefInput(e.target.value)}
                    style={{
                      width: '100%', padding: '11px 16px',
                      border: '1.5px solid #E2E8F0', borderRadius: '8px',
                      fontSize: '0.9rem', fontFamily: 'Inter', background: '#F8FAFC',
                    }}
                  />
                </div>

                {refStatus === 'error' && (
                  <p style={{ color: '#DC2626', fontSize: '0.82rem', marginBottom: '12px' }}>
                    ❌ Could not submit. Please send us the reference on WhatsApp instead.
                  </p>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleRefSubmit}
                    disabled={refStatus === 'submitting' || !refInput.trim()}
                    className="btn btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    {refStatus === 'submitting' ? '⏳ Submitting...' : '✅ I\'ve Paid — Submit Reference'}
                  </button>
                  <a
                    href={ordered.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-green"
                    style={{ justifyContent: 'center' }}
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </>
            )}
          </div>

          {/* What's next */}
          <div style={{
            background: '#F8FAFC', border: '1px solid #E2E8F0',
            borderRadius: '12px', padding: '20px',
          }}>
            <div style={{ fontWeight: 700, color: '#0D1B3E', fontSize: '0.88rem', marginBottom: '12px' }}>
              📦 What happens next?
            </div>
            {[
              { icon: '✅', text: 'We verify your bank transfer (usually within 1 hour)' },
              { icon: '📦', text: 'Your books are packed and marked Ready to Ship' },
              { icon: '🚚', text: 'Dispatched via TCS / Leopard with tracking number' },
              { icon: '💬', text: 'You\'re notified on WhatsApp at every step' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '0.84rem', color: '#475569' }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link to="/shop" className="btn btn-outline">← Continue Shopping</Link>
          </div>
        </div>
      </section>
    )
  }

  // ── Cart page ──────────────────────────────────────────
  return (
    <section className="section">
      <div className="container">
        <h1 style={{ fontFamily: 'Outfit', color: '#0D1B3E', fontSize: '1.8rem', marginBottom: '32px' }}>🛒 Your Cart</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>

          {/* Items list */}
          <div>
            {cart.map(item => (
              <div key={item.itemId} style={{
                background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px',
                padding: '20px', marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#0D1B3E', fontFamily: 'Outfit' }}>{item.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>Rs. {item.price.toLocaleString()} each</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => updateQty(item.itemId, item.qty - 1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', background: '#F1F5F9', cursor: 'pointer', fontWeight: 700 }}>−</button>
                  <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.itemId, item.qty + 1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', background: '#F1F5F9', cursor: 'pointer', fontWeight: 700 }}>+</button>
                </div>
                <div style={{ fontWeight: 800, fontFamily: 'Outfit', color: '#1B3F8B', minWidth: '80px', textAlign: 'right' }}>
                  Rs. {(item.price * item.qty).toLocaleString()}
                </div>
                <button onClick={() => removeFromCart(item.itemId)} style={{ color: '#EF4444', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
              </div>
            ))}
          </div>

          {/* Order form */}
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 16px rgba(27,63,139,0.1)' }}>
            <h3 style={{ fontFamily: 'Outfit', color: '#0D1B3E', marginBottom: '20px' }}>Place Order</h3>
            <form onSubmit={handleOrder}>
              <div className="form-group"><label>Full Name</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="optional" /></div>
              <div className="form-group"><label>Phone / WhatsApp *</label><input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              <div className="form-group"><label>City *</label><input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="e.g. Lahore, Karachi..." /></div>
              <div className="form-group"><label>Payment Method</label>
                <select value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}>
                  <option value="bank">Bank Transfer (UBL)</option>
                  <option value="cod">Cash on Delivery (Lahore only)</option>
                </select>
              </div>

              {/* Totals */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span>Subtotal</span><strong>Rs. {totalPrice.toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#475569' }}>
                  <span>Delivery</span>
                  <span>{form.city ? `Rs. ${delivery}` : 'Enter city first'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', fontFamily: 'Outfit', color: '#1B3F8B' }}>
                  <span>Total</span>
                  <span>Rs. {(totalPrice + (form.city ? delivery : 0)).toLocaleString()}</span>
                </div>
              </div>

              {/* Bank preview before placing */}
              {form.payment === 'bank' && (
                <div style={{
                  background: '#F0F7FF', border: '1px solid #BFDBFE',
                  borderRadius: '10px', padding: '14px', marginBottom: '16px', fontSize: '0.82rem',
                }}>
                  <div style={{ fontWeight: 700, color: '#1E40AF', marginBottom: '6px' }}>💳 Payment via Bank Transfer</div>
                  <div style={{ color: '#374151', lineHeight: 1.8 }}>
                    <div>Bank: <strong>UBL</strong></div>
                    <div>Account: <strong style={{ fontFamily: 'monospace' }}>0110 0020 0007 1137</strong></div>
                    <div>Name: <strong>Systematics Education (SMC-PVT) LTD</strong></div>
                  </div>
                  <div style={{ color: '#6B7280', marginTop: '8px', fontSize: '0.78rem' }}>
                    Full payment details shown after you place the order.
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Place Order →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
