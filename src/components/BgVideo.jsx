import { useEffect, useRef, useState } from 'react';
import { canAutoplayBackground, pickSource } from '../hooks/videoPolicy.js';

// Un solo video de fondo reproduciéndose a la vez: el último que entra en pantalla pausa al anterior.
let current = null;
let suspended = false; // true mientras hay un video con audio abierto en el modal
function playExclusive(v) {
  if (suspended) return;
  if (current && current !== v) current.pause();
  current = v;
  v.play().catch(() => {});
}

// Pausa/reanuda los videos de fondo (p. ej. mientras se ve la intro en el modal)
export function suspendBackgroundVideos(on) {
  suspended = on;
  if (on) current?.pause();
  else if (current) playExclusive(current);
}

// Video de fondo con poster siempre visible debajo.
// eager = hero (carga inmediata). El resto carga recién cuando se acerca a la pantalla.
export default function BgVideo({ video, eager = false, alt = '' }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const visible = useRef(false);
  const [allowed] = useState(canAutoplayBackground);
  const [src, setSrc] = useState(() => (eager && allowed ? pickSource(video) : null));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!allowed) return;
    const el = wrapRef.current;
    const v = videoRef.current;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting && e.intersectionRatio >= 0.2;
        if (e.isIntersecting && !v.getAttribute('src')) setSrc(pickSource(video));
        if (visible.current) {
          if (v.getAttribute('src')) playExclusive(v);
        } else if (!v.paused) {
          v.pause();
          if (current === v) current = null;
        }
      },
      { threshold: [0, 0.2, 0.6], rootMargin: '150px 0px' },
    );
    io.observe(el);
    const onVis = () => (document.hidden ? v.pause() : visible.current && playExclusive(v));
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [allowed, video]);

  // Cuando se asigna el src y el bloque ya está visible, arrancar
  useEffect(() => {
    if (src && visible.current) playExclusive(videoRef.current);
  }, [src]);

  const posterSmall = video.posterSrcSet.split(' ')[0];

  return (
    <div className="bgvideo" ref={wrapRef} aria-hidden={alt ? undefined : true}>
      <img
        className="bgvideo__poster"
        src={posterSmall}
        srcSet={video.posterSrcSet}
        sizes="100vw"
        alt={alt}
        decoding="async"
        loading={eager ? 'eager' : 'lazy'}
        fetchpriority={eager ? 'high' : undefined}
      />
      {allowed && (
        <video
          ref={videoRef}
          className={`bgvideo__video ${ready ? 'is-ready' : ''}`}
          src={src || undefined}
          poster={posterSmall}
          muted
          loop
          playsInline
          autoPlay={eager}
          preload={eager ? 'auto' : 'none'}
          disablePictureInPicture
          onPlaying={() => setReady(true)}
          tabIndex={-1}
        />
      )}
    </div>
  );
}
