import { useEffect, useState } from 'react';
import { useScrollLock } from '../hooks/useScrollLock.js';
import { APK } from '../config/assets.js';
import NewBadge, { BetaTag } from './NewBadge.jsx';

export const NAV = [
  { href: '#juego', label: 'El juego', icon: '▶', color: 'green' },
  { href: '#historia', label: 'Historia', icon: '📜', color: 'gold' },
  { href: '#personajes', label: 'Personajes', icon: '👤', color: 'blue' },
  { href: '#jefes', label: 'Castillos', icon: '🏰', color: 'gray' },
  { href: '#galeria', label: 'Galería', icon: '🖼', color: 'steel' },
  { href: '#descargar', label: 'Descargar', icon: '⬇', color: 'orange' },
];

export function Logo({ small = false }) {
  return (
    <span className={`logo ${small ? 'logo--small' : ''}`}>
      <span className="logo__mancos">MANCOS</span>
      <span className="logo__land">LAND</span>
    </span>
  );
}

export default function Navbar({ menuOpen, setMenuOpen }) {
  useScrollLock(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          <a href="#top" className="nav__brand" aria-label={APK.beta ? 'Mancos Land beta, inicio' : 'Mancos Land, inicio'}>
            <Logo small />
            <BetaTag />
          </a>
          <nav className="nav__links" aria-label="Principal">
            {NAV.slice(0, -1).map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
            <a href="#descargar" className="btn btn--green btn--sm nav__dl">Descargar <NewBadge variant="dot" /></a>
          </nav>
          <button
            className="nav__burger"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
            {APK.isNew && <i className="nav__dot" aria-hidden="true" />}
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

// Menú móvil a pantalla completa con estilo "menú principal del juego"
function MobileMenu({ open, onClose }) {
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);
  if (!mounted && !open) return null;

  return (
    <div
      id="menu-movil"
      className={`mmenu ${open ? 'is-open' : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTransitionEnd={() => !open && setMounted(false)}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <div className="mmenu__panel frame">
        <div className="mmenu__head">
          <Logo small />
          <button className="mmenu__close" onClick={onClose} aria-label="Cerrar menú" tabIndex={open ? 0 : -1}>✕</button>
        </div>
        <nav aria-label="Menú móvil">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className={`btn btn--${l.color} btn--block`} onClick={onClose} tabIndex={open ? 0 : -1}>
              <span aria-hidden="true">{l.icon}</span> {l.label.toUpperCase()}
              {l.href === '#descargar' && <NewBadge variant="dot" />}
            </a>
          ))}
        </nav>
        <p className="mmenu__foot">Jugando como: Invitado</p>
      </div>
    </div>
  );
}
