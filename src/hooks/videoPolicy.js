// Reglas de reproducción de video de fondo.

const conn = () => (typeof navigator !== 'undefined' ? navigator.connection : undefined);

// Mostrar solo el poster si: reduced-motion, ahorro de datos o conexión 2g/slow-2g.
export function canAutoplayBackground() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const c = conn();
  if (c?.saveData) return false;
  if (c && /(^|-)2g$/.test(c.effectiveType || '')) return false;
  return true;
}

// Elegir la versión mobile (480p) en pantallas chicas o conexiones lentas (3g).
export function prefersMobileSource() {
  if (typeof window === 'undefined') return true;
  const small = window.matchMedia('(max-width: 767px), (max-height: 500px)').matches;
  const slow = conn()?.effectiveType === '3g';
  return small || slow;
}

export function pickSource(v) {
  return prefersMobileSource() ? v.mobile : v.desktop;
}

export const isSmallScreen = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px), (max-height: 500px)').matches;
