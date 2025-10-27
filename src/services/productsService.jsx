const API_BASE_URL = 'https://fakestoreapi.com'

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const message = error?.message || `Erreur API (${response.status})`
    throw new Error(message)
  }
  return response.json()
}

export const fetchProducts = async ({ signal } = {}) => {
  const response = await fetch(`${API_BASE_URL}/products`, { signal })
  return handleResponse(response)
}

export const fetchProduct = async (id, { signal } = {}) => {
  if (!id) {
    throw new Error('Identifiant produit manquant')
  }
  const response = await fetch(`${API_BASE_URL}/products/${id}`, { signal })
  return handleResponse(response)
}

export const fetchCategories = async ({ signal } = {}) => {
  const response = await fetch(`${API_BASE_URL}/products/categories`, { signal })
  return handleResponse(response)
}

export const fetchProductsByCategory = async (category, { signal } = {}) => {
  if (!category) {
    throw new Error('Catégorie manquante')
  }
  const response = await fetch(
    `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`,
    { signal },
  )
  return handleResponse(response)
}

export default {
  fetchProducts,
  fetchProduct,
  fetchCategories,
  fetchProductsByCategory,
}
