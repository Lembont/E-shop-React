import { Link } from 'react-router-dom'
import useCategories from '../hooks/useCategories.jsx'

const formatCategory = (category) =>
  category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const ProductsPage = () => {
  const { categories, isLoading, error, reload } = useCategories()

  return (
    <section className="py-5">
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">Explorer les catégories</h1>
          <p className="text-secondary mb-0">
            Retrouvez toutes les familles de produits disponibles sur FakeStoreAPI et accédez
            rapidement aux 5 dernières nouveautés de chaque catégorie.
          </p>
        </div>
        <Link className="btn btn-outline-primary" to="/">
          Retour à l&apos;accueil
        </Link>
      </div>

      {error && (
        <div
          className="alert alert-danger d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
          role="alert"
        >
          <span>Impossible de charger les catégories. {error.message}</span>
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
          {categories.map((category) => (
            <div className="col-md-6 col-lg-4" key={category}>
              <article className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <span className="badge bg-primary-subtle text-primary-emphasis w-auto mb-2">
                    Catégorie
                  </span>
                  <h2 className="h5 fw-semibold">{formatCategory(category)}</h2>
                  <p className="text-secondary flex-grow-1">
                    Consultez les 5 derniers produits ajoutés dans cette catégorie.
                  </p>
                  <Link
                    className="btn btn-primary mt-3 align-self-start"
                    to={`/categories/${encodeURIComponent(category)}`}
                  >
                    Voir la catégorie
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && categories.length === 0 && (
        <div className="alert alert-secondary mt-4" role="status">
          Aucune catégorie n&apos;a pu être trouvée.
        </div>
      )}
    </section>
  )
}

export default ProductsPage
