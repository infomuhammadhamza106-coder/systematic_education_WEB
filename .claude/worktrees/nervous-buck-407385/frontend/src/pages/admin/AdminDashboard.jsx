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

export default function AdminDashboard() {
  const [orders,       setOrders]       = useState([])
  const [stats,        setStats]        = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [selectedOrder,setSelectedOrder]= useState(null)
  const [filterStatus, setFilterStatus] = useState('All')
  const [tracking,     setTracking]     = useState('')
  const [updating,     setUpdating]     = useState(false)
  const [toast,        setToast]        = useState(null)
  const navigate = useNavigate()

  // ── Auth guard ──────────────────────────────────────
  useEffect(() => {
    if (!token()) navigate('/admin')
  }, [navigate])

  // ── Fetch data ──────────────────────────────────────
  const fetchAll = useCallback(async () => {
    try {
      const [oRes, sRes] = await Promise.all([
        fetch(`${API}/orders`,  { headers: { 'x-admin-token': token() } }),
        fetch(`${API}/stats`,   { headers: { 'x-admin-token': token() } }),
      ])
      const oData = await oRes.json()
      const sData = await sRes.json()
      if (oRes.status === 403) { navigate('/admin'); return; }
      setOrders(oData.orders || [])
      setStats(sData.stats   || null)
    } catch { showToast('Cannot reach server.', 'error') }
    finally  { setLoading(false) }
  }, [navigate])

  useEffect(() => { fetchAll() }, [fetchAll])

  // ── Toast ────────────────────────────────────────────
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  // ── Update status ─────────────────────────────────────
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

  // ── Logout ────────────────────────────────────────────
  const logout = () => { localStorage.removeItem('adminToken'); navigate('/admin') }

  // ── Filter ────────────────────────────────────────────
  const displayed = filterStatus === 'All' ? orders : orders.filter(o => o.status === filterStatus)

  // ── Helpers ───────────────────────────────────────────
  const fmt = (iso) => iso ? new Date(iso).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

  if (loading) return (
    <div className="admin-loading">
      <div className="admin-spinner" />
      <p>Loading dashboard...</p>
    </div>
  )

  return (
    <div className="admin-wrap">
      {/* Toast */}
      {toast && <div className={`admin-toast admin-toast-${toast.type}`}>{toast.msg}</div>}

      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-brand-icon sm">SE</div>
          <div>
            <div className="admin-brand-name">Systematics</div>
            <div className="admin-brand-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="admin-nav">
          <button className="admin-nav-item active">📦 Orders</button>
          <button className="admin-nav-item" onClick={() => setFilterStatus('Pending')}>⏳ Pending
            {stats && stats.pending > 0 && <span className="admin-nav-badge">{stats.pending}</span>}
          </button>
          <button className="admin-nav-item" onClick={() => setFilterStatus('Payment Received')}>💳 Payment Received
            {stats && stats.paymentReceived > 0 && <span className="admin-nav-badge blue">{stats.paymentReceived}</span>}
          </button>
          <button className="admin-nav-item" onClick={() => setFilterStatus('Ready to Ship')}>✅ Ready to Ship</button>
          <button className="admin-nav-item" onClick={() => setFilterStatus('Dispatched')}>🚚 Dispatched</button>
          <button className="admin-nav-item" onClick={() => setFilterStatus('All')}>📋 All Orders</button>
        </nav>

        <button className="admin-logout" onClick={logout}>🚪 Logout</button>
      </aside>

      {/* ── Main ────────────────────────────────── */}
      <main className="admin-main">

        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>Order Management</h1>
            <p>Manage orders, update statuses & track payments.</p>
          </div>
          <button className="admin-btn admin-btn-outline" onClick={fetchAll}>🔄 Refresh</button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="admin-stats">
            {[
              { label: 'Total Orders',      val: stats.total,           icon: '📦', color: '#1B3F8B' },
              { label: 'Pending',           val: stats.pending,         icon: '⏳', color: '#F59E0B' },
              { label: 'Payment Received',  val: stats.paymentReceived, icon: '💳', color: '#3B82F6' },
              { label: 'Ready to Ship',     val: stats.readyToShip,     icon: '✅', color: '#10B981' },
              { label: 'Dispatched',        val: stats.dispatched,      icon: '🚚', color: '#8B5CF6' },
              { label: 'Revenue (Rs.)',     val: `${stats.revenue.toLocaleString()}`, icon: '💰', color: '#0D9488' },
            ].map(({ label, val, icon, color }) => (
              <div key={label} className="admin-stat-card">
                <div className="admin-stat-icon" style={{ background: color + '18', color }}>{icon}</div>
                <div className="admin-stat-val" style={{ color }}>{val}</div>
                <div className="admin-stat-label">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filter tabs */}
        <div className="admin-tabs">
          {['All', ...STATUS_FLOW, 'Cancelled'].map(s => (
            <button
              key={s}
              className={`admin-tab ${filterStatus === s ? 'active' : ''}`}
              onClick={() => setFilterStatus(s)}
            >{s}</button>
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
                  <th>Action</th>
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
                      <td>
                        <div className="cell-sub">{order.items?.map(i => `${i.qty}× ${i.code}`).join(', ')}</div>
                      </td>
                      <td><strong>Rs. {order.grandTotal?.toLocaleString()}</strong></td>
                      <td>
                        {order.bankTransferRef
                          ? <span className="bank-ref">{order.bankTransferRef}</span>
                          : <span className="cell-sub">—</span>
                        }
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
                          View
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

      {/* ── Order Detail Drawer ───────────────── */}
      {selectedOrder && (
        <div className="admin-drawer-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="admin-drawer" onClick={e => e.stopPropagation()}>
            <div className="admin-drawer-header">
              <div>
                <h3>Order Detail</h3>
                <code>{selectedOrder.orderId}</code>
              </div>
              <button className="drawer-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div className="admin-drawer-body">
              {/* Customer Info */}
              <div className="drawer-section">
                <div className="drawer-section-title">👤 Customer</div>
                <div className="drawer-grid">
                  <span>Name</span><strong>{selectedOrder.customerName}</strong>
                  <span>Phone</span><strong>{selectedOrder.phone}</strong>
                  <span>Email</span><strong>{selectedOrder.email || '—'}</strong>
                  <span>City</span><strong>{selectedOrder.city}</strong>
                </div>
              </div>

              {/* Items */}
              <div className="drawer-section">
                <div className="drawer-section-title">📚 Items Ordered</div>
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
                <div className="drawer-section-title">💳 Payment</div>
                <div className="drawer-grid">
                  <span>Bank Ref</span>
                  <strong className={selectedOrder.bankTransferRef ? 'text-green' : 'text-muted'}>
                    {selectedOrder.bankTransferRef || 'Not submitted yet'}
                  </strong>
                  <span>Tracking No</span>
                  <strong>{selectedOrder.trackingNumber || '—'}</strong>
                </div>
              </div>

              {/* Status Update */}
              <div className="drawer-section">
                <div className="drawer-section-title">🔄 Update Status</div>

                {selectedOrder.status === 'Dispatched' || selectedOrder.status === 'Cancelled' ? (
                  <div className="admin-alert admin-alert-info">Order is {selectedOrder.status}. No further updates needed.</div>
                ) : (
                  <>
                    {/* Tracking field for Ready to Ship */}
                    {selectedOrder.status === 'Payment Received' && (
                      <div className="admin-form-group" style={{ marginBottom: 12 }}>
                        <label>Tracking Number (optional)</label>
                        <input
                          placeholder="e.g. TCS-887612"
                          value={tracking}
                          onChange={e => setTracking(e.target.value)}
                        />
                      </div>
                    )}
                    <div className="drawer-status-btns">
                      {STATUS_FLOW.filter(s => s !== selectedOrder.status).map(s => {
                        const sc = STATUS_COLORS[s]
                        return (
                          <button
                            key={s}
                            className="drawer-status-btn"
                            style={{ background: sc.bg, color: sc.color, borderColor: sc.dot }}
                            disabled={updating}
                            onClick={() => updateStatus(selectedOrder.orderId, s)}
                          >
                            {s}
                          </button>
                        )
                      })}
                      <button
                        className="drawer-status-btn"
                        style={{ background: '#FEE2E2', color: '#991B1B', borderColor: '#EF4444' }}
                        disabled={updating}
                        onClick={() => updateStatus(selectedOrder.orderId, 'Cancelled')}
                      >
                        Cancel Order
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Timeline */}
              <div className="drawer-section">
                <div className="drawer-section-title">🕐 Timeline</div>
                <div className="drawer-grid">
                  <span>Placed</span><span>{fmt(selectedOrder.createdAt)}</span>
                  <span>Updated</span><span>{fmt(selectedOrder.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
