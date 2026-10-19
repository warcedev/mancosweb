import { useRef } from 'react';

// Gestos táctiles simples: devuelve handlers de pointer para spread en un elemento.
// onLeft = deslizar hacia la izquierda (siguiente), onRight = hacia la derecha (anterior).
export function useSwipe({ onLeft, onRight, onDown, threshold = 50 } = {}) {
  const start = useRef(null);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    start.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!start.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.current.x;
    const dy = t.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > Math.abs(dy) * 1.2 && Math.abs(dx) > threshold) {
      if (dx < 0) onLeft?.();
      else onRight?.();
    } else if (dy > threshold * 1.6 && Math.abs(dy) > Math.abs(dx) * 1.2) {
      onDown?.();
    }
  };
  return { onTouchStart, onTouchEnd };
}
