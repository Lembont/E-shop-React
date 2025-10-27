import PropTypes from 'prop-types'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

const Layout = ({ children }) => (
  <div className="d-flex flex-column min-vh-100 bg-light-subtle">
    <Header />
    <main className="flex-grow-1 py-4">
      <div className="container">{children}</div>
    </main>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
