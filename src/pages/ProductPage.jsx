import { Link, useNavigate, useParams } from 'react-router-dom'
import useCart from '../hooks/useCart.jsx'
import useProduct from '../hooks/useProduct.jsx'
import formatCurrency from '../utils/formatCurrency.jsx'

const formatCategory = (category) =>
  category
    ?.split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const ProductPage = () => {
  const navigate = useNavigate()
  const { productId } = useParams()
  const numericId = Number(productId)
  const { addItem } = useCart()
  const { product, isLoading, error, reload } = useProduct(Number.isNaN(numericId) ? productId : numericId)

  return (
    <section className="py-5">
      <div className="mb-4">
        <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => navigate(-1)}>
          ← Retour
        </button>
      </div>

      {error && (
        <div
          className="alert alert-danger d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
          role="alert"
        >
          <span>Impossible de charger le produit. {error.message}</span>
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

      {!isLoading && product && (
        <article className="row g-5 align-items-start">
          <div className="col-lg-5">
            <div className="bg-white border rounded-4 shadow-sm p-4 h-100 d-flex align-items-center justify-content-center">
              <img
                alt={product.title}
                className="img-fluid object-fit-contain"
                src={product.image}
                loading="lazy"
                style={{ maxHeight: '360px' }}
              />
            </div>
          </div>

          <div className="col-lg-7">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-2">
                <span className="badge bg-primary-subtle text-primary-emphasis w-auto">
                  {formatCategory(product.category)}
                </span>
                <h1 className="display-6 fw-bold mb-0">{product.title}</h1>
              </div>

              <div className="d-flex flex-column gap-2">
                <span className="fs-3 fw-semibold text-primary">{formatCurrency(product.price)}</span>
                <p className="text-secondary mb-0">{product.description}</p>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-3 mt-2">
                <button className="btn btn-primary btn-lg" type="button" onClick={() => addItem(product)}>
                  Ajouter au panier
                </button>
                <Link className="btn btn-outline-primary btn-lg" to="/cart">
                  Voir mon panier
                </Link>
              </div>

              <div className="mt-4 pt-4 border-top">
                <h2 className="h5 fw-semibold">Informations complémentaires</h2>
                <ul className="list-unstyled mb-0 text-secondary small">
                    <li>
                    Catégorie :{' '}
                    <Link to={`/categories/${encodeURIComponent(product.category)}`}>
                      {formatCategory(product.category)}
                    </Link>
                  </li>
                  <li>Note moyenne : {product.rating?.rate ?? 'N/A'}</li>
                  <li>Nombre d&apos;avis : {product.rating?.count ?? 'N/A'}</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      )}

      {!isLoading && !error && !product && (
        <div className="alert alert-secondary" role="status">
          Ce produit est introuvable ou a été supprimé.
        </div>
      )}
    </section>
  )
}

export default ProductPage
