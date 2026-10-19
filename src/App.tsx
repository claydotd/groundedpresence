import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './components/Contact'
import { Outlet, useLocation } from 'react-router-dom'
import { galleries } from 'virtual:galleries'
import { getContentPage, getDraftPage } from './contentPages'

const SITE_TITLE = 'Grounded Presence'

function titleForPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return SITE_TITLE
  }

  if (segments[0] === 'work') {
    if (!segments[1]) return `Work | ${SITE_TITLE}`

    const gallery = galleries.find((item) => item.slug === segments[1])
    return gallery ? `${gallery.name} | ${SITE_TITLE}` : `Work | ${SITE_TITLE}`
  }

  if (segments[0] === 'drafts') {
    if (!segments[1]) return `Drafts | ${SITE_TITLE}`

    const draft = getDraftPage(segments[1])
    return draft ? `${draft.title} | ${SITE_TITLE}` : `Drafts | ${SITE_TITLE}`
  }

  const page = getContentPage(segments[0])
  return page ? `${page.title} | ${SITE_TITLE}` : SITE_TITLE
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function DocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titleForPath(pathname)

    const isDraft = pathname.split('/').filter(Boolean)[0] === 'drafts'
    const existing = document.querySelector('meta[name="robots"]')

    if (isDraft) {
      const robots = existing ?? document.createElement('meta')
      robots.setAttribute('name', 'robots')
      robots.setAttribute('content', 'noindex')
      if (!existing) document.head.appendChild(robots)
      return
    }

    existing?.remove()
  }, [pathname])

  return null
}

function App() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollToTop />
      <DocumentTitle />
      <Header />
      <main key={pathname} className="page">
        <Outlet />
      </main>
      <Contact />
      <Footer />
    </>
  )
}

export default App
