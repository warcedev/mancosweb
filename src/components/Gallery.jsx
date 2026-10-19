import { SHOT_RATIO } from '../config/assets.js';
import { GALLERY } from '../data/content.js';
import Modal from './Modal.jsx';

export function Gallery({ onOpen }) {
  return (
    <section className="section" id="galeria">
      <div className="container">
        <h2 className="title">Galería</h2>
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <button key={g.src} className="gallery__item frame" onClick={() => onOpen(i)} aria-label={`Ampliar: ${g.alt}`}>
              <img
                src={g.src}
                srcSet={g.srcSet}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 92vw"
                alt={g.alt}
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: SHOT_RATIO }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Lightbox({ index, setIndex }) {
  const open = index !== null;
  const total = GALLERY.length;
  const go = (d) => setIndex((v) => (v + d + total) % total);
  const g = open ? GALLERY[index] : null;

  return (
    <Modal open={open} onClose={() => setIndex(null)} label="Galería" className="modal--lightbox" swipe={{ onLeft: () => go(1), onRight: () => go(-1) }}>
      {g && (
        <figure className="lightbox">
          <img src={g.src} srcSet={g.srcSet} sizes="100vw" alt={g.alt} style={{ aspectRatio: SHOT_RATIO }} />
          <figcaption>
            <span>{g.alt}</span>
            <span className="lightbox__count">{index + 1} / {total}</span>
          </figcaption>
          <div className="lightbox__nav">
            <button className="btn btn--gray btn--icon" onClick={() => go(-1)} aria-label="Anterior">◀</button>
            <button className="btn btn--gray btn--icon" onClick={() => go(1)} aria-label="Siguiente">▶</button>
          </div>
        </figure>
      )}
    </Modal>
  );
}
