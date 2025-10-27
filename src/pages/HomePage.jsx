import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard.jsx'
import useCart from '../hooks/useCart.jsx'
import useProducts from '../hooks/useProducts.jsx'

const chunkProducts = (items, size) => {
  if (!Array.isArray(items) || items.length === 0) {
    return []
  }

  const chunks = []
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }
  return chunks
}

const HomePage = () => {
  const { addItem } = useCart()
  const { products, isLoading, error } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')

  const carouselSlides = useMemo(() => chunkProducts(products, 3), [products])

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()
    if (!normalized) {
      return products
    }

    return products.filter((product) => {
      const titleMatch = product.title.toLowerCase().includes(normalized)
      const categoryMatch = product.category?.toLowerCase().includes(normalized)
      return titleMatch || categoryMatch
    })
  }, [products, searchTerm])

  const productsToDisplay = useMemo(() => filteredProducts.slice(0, 3), [filteredProducts])

  return (
    <section className="py-5">

      {!isLoading && !error && carouselSlides.length > 0 && (
        <section className="mb-5">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between gap-3 mb-3">
            <div>
              <h2 className="h3 fw-bold mb-0">Notre sélection</h2>
              <p className="text-secondary mb-0">
                Parcourez automatiquement notre catalogue.
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                data-bs-target="#homeProductsCarousel"
                data-bs-slide="prev"
              >
                ◀
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                data-bs-target="#homeProductsCarousel"
                data-bs-slide="next"
              >
                ▶
              </button>
            </div>
          </div>

          <div
            id="homeProductsCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="5000"
          >
            <div className="carousel-inner">
              {carouselSlides.map((group, slideIndex) => (
                <div
                  className={`carousel-item${slideIndex === 0 ? ' active' : ''}`}
                  key={group.map((item) => item.id).join('-')}
                >
                  <div className="row g-4">
                    {group.map((product) => (
                      <div className="col-md-4" key={product.id}>
                        <ProductCard product={product} onAddToCart={addItem} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div id="catalogue" className="mb-4">
        <div className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-lg-between gap-3">
          <div>
            <h2 className="h3 fw-bold">Tous les produits</h2>
            <p className="text-secondary mb-0">
              Consultez l&apos;ensemble du catalogue en un clin d&apos;œil et trouvez rapidement le produit recherché.
            </p>
          </div>
          <div className="w-100" style={{ maxWidth: '360px' }}>
            <label className="form-label visually-hidden" htmlFor="product-search">
              Rechercher un produit
            </label>
            <div className="input-group">
              <span className="input-group-text" id="product-search-addon" role="img" aria-label="Recherche">
                🔍
              </span>
              <input
                aria-describedby="product-search-addon"
                className="form-control"
                id="product-search"
                placeholder="Rechercher une référence ou une catégorie"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Impossible de charger les produits. {error.message}
        </div>
      )}

      {isLoading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}

      {!isLoading && !error && productsToDisplay.length > 0 && (
        <div className="row g-4">
          {productsToDisplay.map((product) => (
            <div className="col-md-6 col-lg-4" key={product.id}>
              <ProductCard product={product} onAddToCart={addItem} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <div className="alert alert-secondary mt-4" role="status">
          Aucun produit disponible pour le moment.
        </div>
      )}

      {!isLoading && !error && products.length > 0 && filteredProducts.length === 0 && (
        <div className="alert alert-warning mt-4" role="status">
          Aucun résultat ne correspond à votre recherche « {searchTerm} ».
        </div>
      )}

      {!isLoading && !error && filteredProducts.length > productsToDisplay.length && (
        <div className="alert alert-info mt-4" role="status">
          Seuls les 3 premiers résultats sont affichés. Ajustez votre recherche pour affiner la sélection.
        </div>
      )}
    </section>
  )
}

export default HomePage
