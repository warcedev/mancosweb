import { useEffect } from 'react';

// Bloquea el scroll del fondo mientras un modal/menú está abierto (incluido iOS Safari).
let locks = 0;
let savedY = 0;

export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    if (locks++ === 0) {
      savedY = window.scrollY;
      const s = document.body.style;
      s.position = 'fixed';
      s.top = `-${savedY}px`;
      s.left = '0';
      s.right = '0';
      s.overflow = 'hidden';
    }
    return () => {
      if (--locks === 0) {
        const s = document.body.style;
        s.position = s.top = s.left = s.right = s.overflow = '';
        window.scrollTo(0, savedY);
      }
    };
  }, [active]);
}
