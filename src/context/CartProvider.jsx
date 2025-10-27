import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import CartContext from './CartContext.jsx'

const STORAGE_KEY = 'eshop-cart'

const mergeProduct = (product) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  image: product.image,
  category: product.category,
  description: product.description,
})

const loadStoredItems = () => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .filter((item) =>
        item &&
        typeof item === 'object' &&
        item.product &&
        typeof item.product.id !== 'undefined' &&
        Number.isFinite(Number(item.quantity)),
      )
      .map((item) => ({
        product: mergeProduct(item.product),
        quantity: Math.max(Number(item.quantity) || 0, 0),
      }))
      .filter((item) => item.quantity > 0)
  } catch (error) {
    console.error('Failed to parse cart from storage:', error)
    return []
  }
}

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadStoredItems)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Failed to persist cart in storage:', error)
    }
  }, [items])

  const addItem = useCallback((product, quantity = 1) => {
    if (!product || !product.id) return

    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...prev, { product: mergeProduct(product), quantity }]
    })
  }, [])

  const updateItemQuantity = useCallback((productId, quantity) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(quantity, 0) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const itemsCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({ items, itemsCount, total, addItem, updateItemQuantity, removeItem, clear }),
    [items, itemsCount, total, addItem, updateItemQuantity, removeItem, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

CartProvider.propTypes = {
  children: PropTypes.node,
}

export default CartProvider
