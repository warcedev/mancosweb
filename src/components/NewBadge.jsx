import { APK } from '../config/assets.js';

// Etiqueta "¡NUEVA VERSIÓN!". Solo se muestra mientras APK.isNew sea true.
export default function NewBadge({ variant = 'tag', withVersion = false, className = '' }) {
  if (!APK.isNew) return null;
  const text = variant === 'dot' ? 'NUEVO' : `¡NUEVA VERSIÓN${withVersion ? ` ${APK.version}` : ''}!`;
  return <span className={`newbadge newbadge--${variant} ${className}`}>{text}</span>;
}

// Cinta grande del hero, lleva al panel de descarga
export function NewRibbon() {
  if (!APK.isNew) return null;
  return (
    <a href="#descargar" className="newribbon">
      <span className="newribbon__star" aria-hidden="true">✦</span>
      <span>¡NUEVA VERSIÓN {APK.version}!</span>
      <span className="newribbon__cta">Ya disponible</span>
    </a>
  );
}
