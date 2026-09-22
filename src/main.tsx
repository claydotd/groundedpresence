import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Work from './pages/Work.tsx'
import Gallery from './pages/Gallery.tsx'
import MarkdownPage from './pages/MarkdownPage.tsx'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<Gallery />} />
          <Route path=":slug" element={<MarkdownPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
