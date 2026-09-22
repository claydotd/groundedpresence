import { useEffect, useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import verticalLine from '/src/assets/vert-divider.svg'
import { contentPages } from '../contentPages'

const NAV_LINKS = [
  { to: '/work', label: 'Work' },
  ...contentPages.map((page) => ({
    to: `/${page.slug}`,
    label: page.title,
  })),
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 769px)')
    const onChange = () => {
      if (media.matches) setOpen(false)
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="brand" onClick={closeMenu}>
            <h2 className="logo-text">Claire McAlpine</h2>
            <img src={verticalLine} loading="lazy" alt="" />
            <h2 className="logo-text">Photography</h2>
          </Link>
        </div>

        <button
          type="button"
          className={`nav-toggle${open ? ' is-open' : ''}`}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
        </button>

        <div
          className={`nav-backdrop${open ? ' is-open' : ''}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div id={menuId} className={`nav-menu${open ? ' is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <div key={link.to} className="nav-link">
              <Link to={link.to} onClick={closeMenu}>
                {link.label}
              </Link>
            </div>
          ))}
          <div className="nav-link">
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
