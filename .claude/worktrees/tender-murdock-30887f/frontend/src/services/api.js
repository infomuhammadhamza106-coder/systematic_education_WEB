import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' })

export const getAccaProducts = (params = {}) => API.get('/products/acca', { params })
export const getCimaProducts = (params = {}) => API.get('/products/cima', { params })
export const sendContact = (data) => API.post('/contact', data)
export const placeOrder = (data) => API.post('/orders', data)

export default API
