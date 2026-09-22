import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import MyStory from './pages/MyStory.tsx'
import Work from './pages/Work.tsx'
import Gallery from './pages/Gallery.tsx'
import CV from './pages/CV.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="my-story" element={<MyStory />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<Gallery />} />
          <Route path="cv" element={<CV />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
