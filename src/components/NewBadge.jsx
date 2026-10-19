import { APK } from '../config/assets.js';

const NEW_TEXT = APK.beta ? '¡NUEVA BETA' : '¡NUEVA VERSIÓN';

// Etiqueta "¡NUEVA BETA!" / "¡NUEVA VERSIÓN!". Solo se muestra mientras APK.isNew sea true.
export default function NewBadge({ variant = 'tag', withVersion = false, className = '' }) {
  if (!APK.isNew) return null;
  const text = variant === 'dot' ? 'NUEVO' : `${NEW_TEXT}${withVersion ? ` ${APK.version}` : ''}!`;
  return <span className={`newbadge newbadge--${variant} ${className}`}>{text}</span>;
}

// Sello "BETA" mientras el juego siga en beta
export function BetaTag({ className = '' }) {
  if (!APK.beta) return null;
  return <span className={`betatag ${className}`}>BETA</span>;
}

// Cinta grande del hero, lleva al panel de descarga
export function NewRibbon() {
  if (!APK.isNew) return null;
  return (
    <a href="#descargar" className="newribbon">
      <span className="newribbon__star" aria-hidden="true">✦</span>
      <span>{NEW_TEXT} {APK.version}!</span>
      <span className="newribbon__cta">Ya disponible</span>
    </a>
  );
}
