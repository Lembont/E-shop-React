import { useCallback, useEffect, useRef, useState } from 'react'
import {
  fetchProducts,
  fetchProductsByCategory,
} from '../services/productsService.jsx'

const sortProductsByNewest = (products) =>
  [...products].sort((a, b) => Number(b.id) - Number(a.id))

const useProducts = ({ category, limit } = {}) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const isMountedRef = useRef(false)
  const controllerRef = useRef(null)

  const safeSetState = useCallback((fn) => {
    if (isMountedRef.current) {
      fn()
    }
  }, [])

  const loadProducts = useCallback(
    async (controller) => {
      const activeController = controller ?? new AbortController()

      if (!controller) {
        controllerRef.current?.abort()
        controllerRef.current = activeController
      }

      safeSetState(() => {
        setIsLoading(true)
        setError(null)
      })

      try {
        const data = await (category
          ? fetchProductsByCategory(category, { signal: activeController.signal })
          : fetchProducts({ signal: activeController.signal }))

        const sorted = sortProductsByNewest(Array.isArray(data) ? data : [])
        const limited = typeof limit === 'number' ? sorted.slice(0, limit) : sorted

        safeSetState(() => {
          setProducts(limited)
        })
      } catch (err) {
        if (err.name === 'AbortError') return
        safeSetState(() => {
          setProducts([])
          setError(err)
        })
      } finally {
        safeSetState(() => {
          setIsLoading(false)
        })
      }
    },
    [category, limit, safeSetState],
  )

  useEffect(() => {
    isMountedRef.current = true
    const controller = new AbortController()
    controllerRef.current = controller
    loadProducts(controller)
    return () => {
      isMountedRef.current = false
      controllerRef.current = null
      controller.abort()
    }
  }, [loadProducts])

  const reload = useCallback(() => {
    if (!isMountedRef.current) return
    loadProducts()
  }, [loadProducts])

  return {
    products,
    isLoading,
    error,
    reload,
  }
}

export default useProducts
