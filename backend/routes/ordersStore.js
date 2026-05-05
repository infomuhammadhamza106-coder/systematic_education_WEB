// Shared in-memory orders store
// Seed with demo orders so the admin panel has something to show
const orders = [
  {
    orderId: 'SE-1746350001',
    customerName: 'Ahmed Raza',
    email: 'ahmed@example.com',
    phone: '03001234567',
    city: 'Lahore',
    items: [
      { code: 'BT', name: 'Business and Technology', qty: 1, price: 4720 },
      { code: 'MA', name: 'Management Accounting',   qty: 1, price: 3195 },
    ],
    subtotal: 7915,
    deliveryCharge: 300,
    grandTotal: 8215,
    bankTransferRef: 'TRX-20250504-001',
    status: 'Payment Received',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    orderId: 'SE-1746350002',
    customerName: 'Sara Khan',
    email: 'sara@example.com',
    phone: '03111234567',
    city: 'Karachi',
    items: [
      { code: 'FR', name: 'Financial Reporting', qty: 1, price: 4720 },
      { code: 'AA', name: 'Audit and Assurance',  qty: 1, price: 4720 },
    ],
    subtotal: 9440,
    deliveryCharge: 350,
    grandTotal: 9790,
    bankTransferRef: '',
    status: 'Pending',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: null,
  },
  {
    orderId: 'SE-1746350003',
    customerName: 'Usman Ali',
    email: 'usman@example.com',
    phone: '03451234567',
    city: 'Islamabad',
    items: [
      { code: 'SBL', name: 'Strategic Business Leader', qty: 1, price: 5050 },
    ],
    subtotal: 5050,
    deliveryCharge: 350,
    grandTotal: 5400,
    bankTransferRef: 'TRX-20250503-009',
    status: 'Dispatched',
    trackingNumber: 'TCS-887612',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

module.exports = orders;
