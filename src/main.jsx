import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Review from './pages/Review.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/media',
        element: <Catalog />
      },
      {
        path: '/media/:movieId',
        element: <MovieDetails />
      },
      {
        path: '/media/:movieId/review',
        element: <Review />
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
