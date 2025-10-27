import { NavLink } from 'react-router-dom'
import CartStatus from '../cart/CartStatus.jsx'
import useCategories from '../../hooks/useCategories.jsx'

const formatCategory = (category) =>
  category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const Header = () => {
  const { categories } = useCategories()

  return (
    <header className="border-bottom bg-white">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <NavLink className="navbar-brand fw-semibold text-primary" to="/">
            eShop
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#primaryNav"
            aria-controls="primaryNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="primaryNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Accueil
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Catégories
                </NavLink>
              </li>
              {categories.map((category) => (
                <li className="nav-item" key={category}>
                  <NavLink className="nav-link" to={`/categories/${encodeURIComponent(category)}`}>
                    {formatCategory(category)}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                <CartStatus />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
