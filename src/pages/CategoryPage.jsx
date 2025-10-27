import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard.jsx'
import useCart from '../hooks/useCart.jsx'
import useProducts from '../hooks/useProducts.jsx'

const formatCategory = (category) =>
  category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const CategoryPage = () => {
  const { categoryId } = useParams()
  const category = decodeURIComponent(categoryId)
  const { addItem } = useCart()
  const { products, isLoading, error, reload } = useProducts({ category, limit: 5 })

  return (
    <section className="py-5">
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">{formatCategory(category)}</h1>
          <p className="text-secondary mb-0">
            Découvrez les 5 derniers produits publiés dans cette catégorie.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-secondary" to="/products">
            Retour aux catégories
          </Link>
          <Link className="btn btn-outline-primary" to="/">
            Accueil
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3" role="alert">
          <span>Impossible de charger les produits. {error.message}</span>
          <button className="btn btn-outline-danger btn-sm" type="button" onClick={reload}>
            Réessayer
          </button>
        </div>
      )}

      {isLoading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-6 col-lg-4" key={product.id}>
              <ProductCard product={product} onAddToCart={addItem} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <div className="alert alert-secondary mt-4" role="status">
          Aucun produit récent n&apos;a été trouvé pour cette catégorie.
        </div>
      )}
    </section>
  )
}

export default CategoryPage
