import { useRef } from 'react';
import { SPRITE } from '../config/assets.js';
import { CHARACTERS, BOSSES } from '../data/content.js';
import PixelIcon from './PixelIcon.jsx';

export function Characters() {
  const track = useRef(null);
  const page = (dir) => {
    const el = track.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };

  return (
    <section className="section" id="personajes">
      <div className="container">
        <h2 className="title">Los Mancos</h2>
        <p className="lead">
          13 personajes, <strong className="free">todos GRATIS por ahora</strong>. Torpes, distintos y valientes.
        </p>
      </div>
      <div className="carousel">
        <ul className="carousel__track" ref={track} tabIndex={0} aria-label="Personajes (deslizá para ver más)">
          {CHARACTERS.map((c) => (
            <li key={c.id} className="char frame">
              <div className="char__sprite">
                <img src={SPRITE(c.id)} alt="" width="192" height="208" loading="lazy" decoding="async" />
              </div>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
            </li>
          ))}
        </ul>
        <div className="carousel__nav container">
          <button className="btn btn--gray btn--icon" onClick={() => page(-1)} aria-label="Personajes anteriores">◀</button>
          <button className="btn btn--gray btn--icon" onClick={() => page(1)} aria-label="Más personajes">▶</button>
        </div>
      </div>
    </section>
  );
}

export function Bosses() {
  return (
    <section className="section section--dark" id="jefes">
      <div className="container">
        <h2 className="title">Los cuatro reyes caídos</h2>
        <p className="lead">Cada castillo guarda un sello. Recuperalos los cuatro y el abismo se abrirá.</p>
        <div className="cards cards--4">
          {BOSSES.map((b) => (
            <article key={b.boss} className={`boss boss--${b.tone} frame`}>
              <div className="boss__icon"><PixelIcon name={b.icon} size={64} /></div>
              <p className="boss__castle">{b.castle}</p>
              <h3>{b.boss}</h3>
              <p>{b.text}</p>
              <p className="boss__floor">Piso 100/100</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
