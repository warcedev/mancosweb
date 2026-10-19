import { SHOT_RATIO, VIDEOS } from '../config/assets.js';
import { FEATURES } from '../data/content.js';
import BgVideo from './BgVideo.jsx';

export default function Features() {
  return (
    <>
      <section className="section" id="juego">
        <div className="container">
          <h2 className="title">El juego</h2>
          <p className="lead">
            Un RPG pixelado para el celular: explorá, juntá recursos, construí tu casa y bajá a los castillos del abismo.
          </p>
          <div className="cards">
            {FEATURES.map((f) => (
              <article key={f.title} className={`card card--${f.color}`}>
                <img
                  className="card__img"
                  src={f.shot.src}
                  srcSet={f.shot.srcSet}
                  sizes="(min-width: 1200px) 280px, (min-width: 768px) 45vw, 92vw"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: SHOT_RATIO }}
                />
                <div className="card__body">
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="mazmorras-title">
        <BgVideo video={VIDEOS.dungeon} />
        <div className="shade shade--strong" aria-hidden="true" />
        <div className="container band__content">
          <h2 className="title" id="mazmorras-title">Cien pisos hacia la oscuridad</h2>
          <ul className="stats">
            <li><strong>100</strong> pisos por castillo</li>
            <li><strong>4</strong> castillos</li>
            <li><strong>1</strong> guardián cada 10 pisos</li>
            <li><strong>?</strong> bóvedas secretas</li>
          </ul>
          <p className="band__text">Pinchos, flechas y losas que se hunden. Cada diez pisos, una puerta de regreso: nadie baja cien de una sola vez.</p>
        </div>
      </section>
    </>
  );
}
