import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchCategories } from '../services/productsService.jsx'

const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const isMountedRef = useRef(false)

  const loadCategories = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchCategories()
      if (isMountedRef.current) {
        setCategories(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      if (isMountedRef.current) {
        setCategories([])
        setError(err)
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    loadCategories()
    return () => {
      isMountedRef.current = false
    }
  }, [loadCategories])

  return { categories, isLoading, error, reload: loadCategories }
}

export default useCategories
