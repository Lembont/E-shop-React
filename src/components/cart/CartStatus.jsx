import { NavLink } from 'react-router-dom'
import useCart from '../../hooks/useCart.jsx'

const CartStatus = () => {
  const { itemsCount } = useCart()

  return (
    <NavLink
      className="btn btn-outline-primary position-relative d-flex align-items-center gap-2"
      to="/cart"
    >
      <span role="img" aria-label="Panier">
        🛒
      </span>
      <span>Panier</span>
      <span className="badge text-bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
        {itemsCount}
      </span>
    </NavLink>
  )
}

export default CartStatus
