import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import formatCurrency from '../../utils/formatCurrency.jsx'

const ProductCard = ({ product, onAddToCart }) => (
  <article className="card h-100 shadow-sm border-0">
    <Link className="ratio ratio-1x1 bg-white rounded-top d-block" to={`/products/${product.id}`}>
      <img
        alt={product.title}
        className="p-4 object-fit-contain"
        src={product.image}
        loading="lazy"
      />
    </Link>
    <div className="card-body d-flex flex-column">
      <span className="badge bg-primary-subtle text-primary-emphasis w-auto mb-2">
        {product.category}
      </span>
      <h2 className="h5 fw-semibold">
        <Link className="text-decoration-none stretched-link" to={`/products/${product.id}`}>
          {product.title}
        </Link>
      </h2>
      <p className="text-secondary flex-grow-1 small">{product.description}</p>
      <div className="d-flex align-items-center justify-content-between mt-3">
        <span className="fw-bold text-primary">{formatCurrency(product.price)}</span>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => onAddToCart?.(product)}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </article>
)

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func,
}

export default ProductCard
