import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('se_cart') || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('se_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, type = 'text') => {
    const price = type === 'text' ? product.textPrice : product.kitPrice
    const itemId = `${product.id}-${type}`
    const name = `${product.code} ${type === 'text' ? 'Study Text' : 'Exam Kit'}`
    setCart(prev => {
      const existing = prev.find(i => i.itemId === itemId)
      if (existing) return prev.map(i => i.itemId === itemId ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { itemId, name, code: product.code, price, qty: 1, type }]
    })
  }

  const removeFromCart = (itemId) => setCart(prev => prev.filter(i => i.itemId !== itemId))

  const updateQty = (itemId, qty) => {
    if (qty < 1) return removeFromCart(itemId)
    setCart(prev => prev.map(i => i.itemId === itemId ? { ...i, qty } : i))
  }

  const clearCart = () => setCart([])

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
