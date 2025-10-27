import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchProduct } from '../services/productsService.jsx'

const useProduct = (productId) => {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const isMountedRef = useRef(false)
  const controllerRef = useRef(null)

  const safeSetState = useCallback((updater) => {
    if (isMountedRef.current) {
      updater()
    }
  }, [])

  const loadProduct = useCallback(
    async (id, controller) => {
      if (!id) {
        safeSetState(() => {
          setProduct(null)
          setError(new Error('Identifiant produit manquant'))
        })
        return
      }

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
        const data = await fetchProduct(id, { signal: activeController.signal })
        safeSetState(() => {
          setProduct(data)
        })
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }
        safeSetState(() => {
          setProduct(null)
          setError(err)
        })
      } finally {
        safeSetState(() => {
          setIsLoading(false)
        })
      }
    },
    [safeSetState],
  )

  useEffect(() => {
    isMountedRef.current = true
    const controller = new AbortController()
    controllerRef.current = controller
    loadProduct(productId, controller)

    return () => {
      isMountedRef.current = false
      controllerRef.current = null
      controller.abort()
    }
  }, [loadProduct, productId])

  const reload = useCallback(() => {
    if (!isMountedRef.current) {
      return
    }
    loadProduct(productId)
  }, [loadProduct, productId])

  return {
    product,
    isLoading,
    error,
    reload,
  }
}

export default useProduct
