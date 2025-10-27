# E-commerce React Starter# React + Vite

> Base front-end architecture built with React 19, Vite 7, React Router et Bootstrap 5.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## PrérequisCurrently, two official plugins are available:

- Node.js 20.19+ (requis par Vite 7) et npm 10+- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- Navigateur moderne compatible ES2022- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Installation## React Compiler

````bashThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

npm install

```## Expanding the ESLint configuration



## Scripts npmIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


- `npm run dev` : lance le serveur de développement Vite
- `npm run build` : génère la version de production dans `dist/`
- `npm run preview` : prévisualise le build de production
- `npm run lint` : exécute ESLint avec la configuration personnalisée
- `npm run format` : formate le code avec Prettier

## Structure des dossiers

````

src/
├─ components/ # Composants réutilisables (Header, Footer, Layout, ...)
├─ context/ # Contextes React (ex. panier)
├─ hooks/ # Hooks personnalisés exposés à l'application
├─ pages/ # Pages utilisées dans le router
├─ styles/ # Feuilles de styles globales ou modulaires
└─ utils/ # Fonctions utilitaires et données mock

```

## Fonctionnalités incluses

- Routing client via `react-router-dom`
- Design responsive avec Bootstrap (CSS + bundle JS)
- Exemple de contexte panier (`CartProvider` + hook `useCart`)
- Outils qualité : ESLint (flat config) + Prettier
- Consommation de l'API publique [FakeStoreAPI](https://fakestoreapi.com/) pour alimenter le catalogue

## Prochaines étapes suggérées

1. Remplacer FakeStoreAPI par votre backend ou votre CMS commerce
2. Ajouter des pages (panier, checkout, profil, etc.)
3. Mettre en place vos propres règles ESLint et un workflow CI/CD
4. Ajouter des tests (Jest, Testing Library, Cypress) selon vos besoins
```
