import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import CartPage from './pages/CartPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const App = () => (
  <Layout>
    <Routes>
      <Route index element={<HomePage />} />
  <Route path="products" element={<ProductsPage />} />
  <Route path="products/:productId" element={<ProductPage />} />
      <Route path="categories/:categoryId" element={<CategoryPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Layout>
)

export default App
