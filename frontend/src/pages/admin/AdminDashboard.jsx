import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

const API   = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin`
const token = () => localStorage.getItem('adminToken')

const STATUS_FLOW = ['Pending', 'Payment Received', 'Ready to Ship', 'Dispatched']
const STATUS_COLORS = {
  'Pending':          { bg: '#FEF3C7', color: '#92400E', dot: '#F59E0B' },
  'Payment Received': { bg: '#DBEAFE', color: '#1E40AF', dot: '#3B82F6' },
  'Ready to Ship':    { bg: '#D1FAE5', color: '#065F46', dot: '#10B981' },
  'Dispatched':       { bg: '#EDE9FE', color: '#4C1D95', dot: '#8B5CF6' },
  'Cancelled':        { bg: '#FEE2E2', color: '#991B1B', dot: '#EF4444' },
}

/* ── SVG Icons ─────────────────────────────────────────── */
const Icon = ({ name, size = 16 }) => {
  const paths = {
    box:      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>,
    clock:    <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    creditcard:<><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    truck:    <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    check:    <polyline points="20 6 9 17 4 12"/>,
    list:     <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
    logout:   <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    refresh:  <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>,
    user:     <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    book:     <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
    payment:  <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    rupee:    <><path d="M7 6h10"/><path d="M7 10h10"/><path d="M9 14h6c2 0 4-1.5 4-4 0-2.5-1.5-4-4-4H9"/><path d="M9 14v6"/></>,
    dollar:   <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    timeline: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    x:        <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    arrow:    <path d="M5 12h14M12 5l7 7-7 7"/>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

export default function AdminDashboard() {
  const [orders,        setOrders]        = useState([])
  const [stats,         setStats]         = useState(null)
  const [loading,       setLoading]       = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filterStatus,  setFilterStatus]  = useState('All')
  const [tracking,      setTracking]      = useState('')
  const [updating,      setUpdating]      = useState(false)
  const [toast,         setToast]         = useState(null)
  const navigate = useNavigate()

  useEffect(() => { if (!token()) navigate('/admin') }, [navigate])

  const fetchAll = useCallback(async () => {
    try {
      const [oRes, sRes] = await Promise.all([
        fetch(`${API}/orders`, { headers: { 'x-admin-token': token() } }),
        fetch(`${API}/stats`,  { headers: { 'x-admin-token': token() } }),
      ])
      const oData = await oRes.json()
      const sData = await sRes.json()
      if (oRes.status === 403) { navigate('/admin'); return }
      setOrders(oData.orders || [])
      setStats(sData.stats   || null)
    } catch { showToast('Cannot reach server.', 'error') }
    finally  { setLoading(false) }
  }, [navigate])

  useEffect(() => { fetchAll() }, [fetchAll])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const updateStatus = async (orderId, status) => {
    setUpdating(true)
    try {
      const res  = await fetch(`${API}/orders/${orderId}/status`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token() },
        body:    JSON.stringify({ status, trackingNumber: tracking }),
      })
      const data = await res.json()
      if (data.success) {
        setOrders(prev => prev.map(o => o.orderId === orderId ? data.order : o))
        setSelectedOrder(data.order)
        setTracking('')
        showToast(`Order ${orderId} → ${status}`)
      }
    } catch { showToast('Update failed.', 'error') }
    finally { setUpdating(false) }
  }

  const logout   = () => { localStorage.removeItem('adminToken'); navigate('/admin') }
  const displayed = filterStatus === 'All' ? orders : orders.filter(o => o.status === filterStatus)
  const fmt       = iso => iso ? new Date(iso).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

  if (loading) return (
    <div className="admin-loading">
      <div className="admin-spinner" />
      <p>Loading dashboard...</p>
    </div>
  )

  const NAV_ITEMS = [
    { label: 'All Orders',       icon: 'list',       status: 'All'              },
    { label: 'Pending',          icon: 'clock',      status: 'Pending',         badge: stats?.pending,         badgeColor: 'amber' },
    { label: 'Payment Received', icon: 'creditcard', status: 'Payment Received', badge: stats?.paymentReceived, badgeColor: 'blue'  },
    { label: 'Ready to Ship',    icon: 'box',        status: 'Ready to Ship'    },
    { label: 'Dispatched',       icon: 'truck',      status: 'Dispatched'       },
  ]

  const STAT_CARDS = stats ? [
    { label: 'Total Orders',     val: stats.total,                            icon: 'box',        color: '#1B3F8B', bg: '#EFF6FF' },
    { label: 'Pending',          val: stats.pending,                          icon: 'clock',      color: '#D97706', bg: '#FEF3C7' },
    { label: 'Payment Received', val: stats.paymentReceived,                  icon: 'creditcard', color: '#2563EB', bg: '#DBEAFE' },
    { label: 'Ready to Ship',    val: stats.readyToShip,                      icon: 'check',      color: '#059669', bg: '#D1FAE5' },
    { label: 'Dispatched',       val: stats.dispatched,                       icon: 'truck',      color: '#7C3AED', bg: '#EDE9FE' },
    { label: 'Revenue (PKR)',    val: `PKR ${stats.revenue.toLocaleString()}`, icon: 'payment',    color: '#0D9488', bg: '#CCFBF1' },
  ] : []

  return (
    <div className="admin-wrap">
      {/* Toast */}
      {toast && <div className={`admin-toast admin-toast-${toast.type}`}>{toast.msg}</div>}

      {/* ── Sidebar ─────────────────────────────────── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-brand-icon sm">SE</div>
          <div>
            <div className="admin-brand-name">Systematics</div>
            <div className="admin-brand-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map(({ label, icon, status, badge, badgeColor }) => (
            <button
              key={status}
              className={`admin-nav-item ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              <span className="admin-nav-left">
                <Icon name={icon} size={15} />
                {label}
              </span>
              {badge > 0 && (
                <span className={`admin-nav-badge ${badgeColor || ''}`}>{badge}</span>
              )}
            </button>
          ))}
        </nav>

        <button className="admin-logout" onClick={logout}>
          <Icon name="logout" size={15} />
          Sign Out
        </button>
      </aside>

      {/* ── Main ──────────────────────────────────────── */}
      <main className="admin-main">

        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>Order Management</h1>
            <p>{displayed.length} order{displayed.length !== 1 ? 's' : ''} · {filterStatus === 'All' ? 'Showing all' : filterStatus}</p>
          </div>
          <button className="admin-btn admin-btn-outline" onClick={fetchAll}>
            <Icon name="refresh" size={14} /> Refresh
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="admin-stats">
            {STAT_CARDS.map(({ label, val, icon, color, bg }) => (
              <div key={label} className="admin-stat-card">
                <div className="admin-stat-icon" style={{ background: bg, color }}>
                  <Icon name={icon} size={18} />
                </div>
                <div className="admin-stat-val" style={{ color }}>{val}</div>
                <div className="admin-stat-label">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filter tabs */}
        <div className="admin-tabs">
          {['All', ...STATUS_FLOW, 'Cancelled'].map(s => (
            <button key={s} className={`admin-tab ${filterStatus === s ? 'active' : ''}`}
              onClick={() => setFilterStatus(s)}>{s}</button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="admin-table-wrap">
          {displayed.length === 0 ? (
            <div className="admin-empty">No orders found for this status.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>City</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Bank Ref</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {displayed.map(order => {
                  const sc = STATUS_COLORS[order.status] || STATUS_COLORS['Pending']
                  return (
                    <tr key={order.orderId} className={selectedOrder?.orderId === order.orderId ? 'selected' : ''}>
                      <td><code className="order-id">{order.orderId}</code></td>
                      <td>
                        <div className="cell-name">{order.customerName}</div>
                        <div className="cell-sub">{order.phone}</div>
                      </td>
                      <td>{order.city}</td>
                      <td><div className="cell-sub">{order.items?.map(i => `${i.qty}× ${i.code}`).join(', ')}</div></td>
                      <td><strong>Rs. {order.grandTotal?.toLocaleString()}</strong></td>
                      <td>
                        {order.bankTransferRef
                          ? <span className="bank-ref">{order.bankTransferRef}</span>
                          : <span className="cell-sub">—</span>}
                      </td>
                      <td>
                        <span className="status-badge" style={{ background: sc.bg, color: sc.color }}>
                          <span className="status-dot" style={{ background: sc.dot }} />
                          {order.status}
                        </span>
                      </td>
                      <td><span className="cell-sub">{fmt(order.createdAt)}</span></td>
                      <td>
                        <button className="admin-btn-sm" onClick={() => { setSelectedOrder(order); setTracking('') }}>
                          View <Icon name="arrow" size={12} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* ── Order Drawer ──────────────────────────────── */}
      {selectedOrder && (
        <div className="admin-drawer-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="admin-drawer" onClick={e => e.stopPropagation()}>
            <div className="admin-drawer-header">
              <div>
                <h3>Order Detail</h3>
                <code>{selectedOrder.orderId}</code>
              </div>
              <button className="drawer-close" onClick={() => setSelectedOrder(null)}>
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="admin-drawer-body">

              {/* Customer */}
              <div className="drawer-section">
                <div className="drawer-section-title">
                  <Icon name="user" size={13} /> Customer
                </div>
                <div className="drawer-grid">
                  <span>Name</span>  <strong>{selectedOrder.customerName}</strong>
                  <span>Phone</span> <strong>{selectedOrder.phone}</strong>
                  <span>Email</span> <strong>{selectedOrder.email || '—'}</strong>
                  <span>City</span>  <strong>{selectedOrder.city}</strong>
                </div>
              </div>

              {/* Items */}
              <div className="drawer-section">
                <div className="drawer-section-title">
                  <Icon name="book" size={13} /> Items Ordered
                </div>
                {selectedOrder.items?.map((item, i) => (
                  <div key={i} className="drawer-item">
                    <span className="drawer-item-code">{item.code}</span>
                    <span>{item.name}</span>
                    <span>×{item.qty}</span>
                    <strong>Rs. {(item.price * item.qty).toLocaleString()}</strong>
                  </div>
                ))}
                <div className="drawer-totals">
                  <div><span>Subtotal</span><span>Rs. {selectedOrder.subtotal?.toLocaleString()}</span></div>
                  <div><span>Delivery</span><span>Rs. {selectedOrder.deliveryCharge?.toLocaleString()}</span></div>
                  <div className="total-row"><span>Grand Total</span><strong>Rs. {selectedOrder.grandTotal?.toLocaleString()}</strong></div>
                </div>
              </div>

              {/* Payment */}
              <div className="drawer-section">
                <div className="drawer-section-title">
                  <Icon name="payment" size={13} /> Payment
                </div>
                <div className="drawer-grid">
                  <span>Bank Ref</span>
                  <strong className={selectedOrder.bankTransferRef ? 'text-green' : 'text-muted'}>
                    {selectedOrder.bankTransferRef || 'Not submitted yet'}
                  </strong>
                  <span>Tracking</span>
                  <strong>{selectedOrder.trackingNumber || '—'}</strong>
                </div>
              </div>

              {/* Status Update */}
              <div className="drawer-section">
                <div className="drawer-section-title">
                  <Icon name="refresh" size={13} /> Update Status
                </div>
                {selectedOrder.status === 'Dispatched' || selectedOrder.status === 'Cancelled' ? (
                  <div className="admin-alert admin-alert-info">
                    Order is {selectedOrder.status}. No further updates needed.
                  </div>
                ) : (
                  <>
                    {selectedOrder.status === 'Payment Received' && (
                      <div className="admin-form-group" style={{ marginBottom: 12 }}>
                        <label>Tracking Number (optional)</label>
                        <input placeholder="e.g. TCS-887612" value={tracking}
                          onChange={e => setTracking(e.target.value)} />
                      </div>
                    )}
                    <div className="drawer-status-btns">
                      {STATUS_FLOW.filter(s => s !== selectedOrder.status).map(s => {
                        const sc = STATUS_COLORS[s]
                        return (
                          <button key={s} className="drawer-status-btn"
                            style={{ background: sc.bg, color: sc.color, borderColor: sc.dot }}
                            disabled={updating} onClick={() => updateStatus(selectedOrder.orderId, s)}>
                            {s}
                          </button>
                        )
                      })}
                      <button className="drawer-status-btn"
                        style={{ background: '#FEE2E2', color: '#991B1B', borderColor: '#EF4444' }}
                        disabled={updating} onClick={() => updateStatus(selectedOrder.orderId, 'Cancelled')}>
                        Cancel Order
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Timeline */}
              <div className="drawer-section">
                <div className="drawer-section-title">
                  <Icon name="timeline" size={13} /> Timeline
                </div>
                <div className="drawer-grid">
                  <span>Placed</span>  <span>{fmt(selectedOrder.createdAt)}</span>
                  <span>Updated</span> <span>{fmt(selectedOrder.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
