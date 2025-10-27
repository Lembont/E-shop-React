import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart.jsx'
import formatCurrency from '../utils/formatCurrency.jsx'

const CartPage = () => {
  const { items, itemsCount, total, updateItemQuantity, removeItem, clear } = useCart()

  const handleQuantityChange = (productId, value) => {
    const parsed = Number(value)
    if (Number.isNaN(parsed) || parsed < 0) {
      return
    }
    updateItemQuantity(productId, parsed)
  }

  return (
    <section className="py-5">
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">Votre panier</h1>
          <p className="text-secondary mb-0">
            Ajustez les quantités ou supprimez les produits avant de poursuivre votre commande.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-primary" to="/">
            Continuer vos achats
          </Link>
          {items.length > 0 && (
            <button className="btn btn-outline-danger" type="button" onClick={clear}>
              Vider le panier
            </button>
          )}
        </div>
      </div>

      {items.length === 0 && (
        <div className="alert alert-secondary" role="status">
          Votre panier est vide. Ajoutez des produits depuis le catalogue.
        </div>
      )}

      {items.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">Produit</th>
                <th scope="col" className="text-center">
                  Quantité
                </th>
                <th scope="col" className="text-end">
                  Prix unitaire
                </th>
                <th scope="col" className="text-end">
                  Sous-total
                </th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ product, quantity }) => (
                <tr key={product.id}>
                  <td className="d-flex align-items-center gap-3">
                    <div className="ratio ratio-1x1" style={{ width: '64px' }}>
                      <img
                        alt={product.title}
                        className="object-fit-contain rounded bg-light p-2"
                        src={product.image}
                      />
                    </div>
                    <div>
                      <p className="fw-semibold mb-1">{product.title}</p>
                      <small className="text-secondary">{product.category}</small>
                    </div>
                  </td>
                  <td className="text-center" style={{ maxWidth: '120px' }}>
                    <input
                      className="form-control text-center"
                      min="0"
                      type="number"
                      value={quantity}
                      onChange={(event) => handleQuantityChange(product.id, event.target.value)}
                    />
                  </td>
                  <td className="text-end">{formatCurrency(product.price)}</td>
                  <td className="text-end">{formatCurrency(product.price * quantity)}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                      onClick={() => removeItem(product.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {items.length > 0 && (
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3 mt-4">
          <div className="text-secondary">
            {itemsCount} article{itemsCount > 1 ? 's' : ''} dans le panier
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="fs-5 fw-semibold">Total : {formatCurrency(total)}</span>
            <button className="btn btn-primary" type="button">
              Passer la commande
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default CartPage
