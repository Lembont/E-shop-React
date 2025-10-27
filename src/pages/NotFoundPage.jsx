import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <section className="py-5 text-center">
    <h1 className="display-6 fw-bold mb-3">Page introuvable</h1>
    <p className="text-secondary mb-4">
      Impossible de trouver la ressource demandée. Vérifiez l&apos;URL ou retournez à
      l&apos;accueil.
    </p>
    <Link className="btn btn-primary" to="/">
      Retour à l&apos;accueil
    </Link>
  </section>
)

export default NotFoundPage
