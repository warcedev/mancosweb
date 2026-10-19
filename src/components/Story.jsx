import { useState } from 'react';
import { DRAGON } from '../config/assets.js';
import { STORY } from '../data/content.js';
import { useSwipe } from '../hooks/useSwipe.js';
import PixelIcon from './PixelIcon.jsx';

export default function Story({ onIntro }) {
  const [i, setI] = useState(0);
  const total = STORY.length;
  const prev = () => setI((v) => Math.max(0, v - 1));
  const next = () => setI((v) => Math.min(total - 1, v + 1));
  const swipe = useSwipe({ onLeft: next, onRight: prev });
  const ch = STORY[i];

  return (
    <section className="section section--story" id="historia">
      <div className="container">
        <h2 className="title">La historia</h2>
        <p className="lead">Las Crónicas de Mancos, tal como se cuentan en el juego.</p>

        <div className="scroll-frame frame">
          <article className="parchment" {...swipe} aria-roledescription="carrusel" aria-label="Crónicas de Mancos">
            <img className={`parchment__dragon parchment__dragon--${ch.dragon}`} src={DRAGON} alt="" aria-hidden="true" width="590" height="300" loading="lazy" />
            <header className="parchment__top">
              <span>📜 Crónicas de Mancos</span>
              <span className="parchment__count" aria-label={`Capítulo ${i + 1} de ${total}`}>{i + 1} / {total}</span>
            </header>
            <div className="parchment__body" key={i} aria-live="polite">
              <h3 className="parchment__title">{ch.n} · {ch.title}</h3>
              <p className="parchment__sub">{ch.sub}</p>
              <div className="parchment__rule" aria-hidden="true"><PixelIcon name="crystal" size={14} /></div>
              <p className="parchment__text">{ch.text}</p>
            </div>
          </article>

          <div className="dots" aria-hidden="true">
            {STORY.map((_, k) => (
              <span key={k} className={k === i ? 'is-on' : k < i ? 'is-past' : ''} />
            ))}
          </div>

          <div className="parchment__nav">
            <button className="btn btn--brown" onClick={prev} disabled={i === 0}>◀ ANTERIOR</button>
            <button className="btn btn--gold" onClick={next} disabled={i === total - 1}>SIGUIENTE ▶</button>
          </div>
        </div>

        <div className="center">
          <button className="btn btn--purple btn--lg" onClick={onIntro}>
            <span aria-hidden="true">🎬</span> VER LA INTRO (con sonido)
          </button>
        </div>
      </div>
    </section>
  );
}
