import { useEffect, useRef } from 'react';
import { useScrollLock } from '../hooks/useScrollLock.js';
import { useSwipe } from '../hooks/useSwipe.js';

// Modal a pantalla completa en móvil. Cierra con: botón ✕, tocar fuera, swipe hacia abajo, Esc.
export default function Modal({ open, onClose, label, className = '', swipe = {}, children }) {
  const closeRef = useRef(null);
  useScrollLock(open);
  const handlers = useSwipe({ ...swipe, onDown: onClose });
  const latest = useRef({ onClose, swipe });
  latest.current = { onClose, swipe };

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      const { onClose: close, swipe: s } = latest.current;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') s.onLeft?.();
      else if (e.key === 'ArrowLeft') s.onRight?.();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className={`modal ${className}`}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      {...handlers}
    >
      <button ref={closeRef} className="modal__close" onClick={onClose} aria-label="Cerrar">
        <span aria-hidden="true">✕</span>
      </button>
      {children}
      <p className="modal__hint" aria-hidden="true">Deslizá hacia abajo para cerrar</p>
    </div>
  );
}
