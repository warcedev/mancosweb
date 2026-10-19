import { APK, IOS_NOTIFY_URL, SPRITE, VIDEOS } from '../config/assets.js';
import { useDevice } from '../hooks/useDevice.js';
import BgVideo from './BgVideo.jsx';
import DownloadButton from './DownloadButton.jsx';
import { Logo } from './Navbar.jsx';
import { NewRibbon } from './NewBadge.jsx';

const SIGN_CREW = ['gabriel', 'trebord', 'el-pibe', 'willito'];

export default function Hero({ onIntro }) {
  const { isIOS, isDesktop } = useDevice();

  return (
    <section className="hero" id="top">
      <BgVideo video={VIDEOS.hero} eager />
      <div className="shade" aria-hidden="true" />
      <Particles />

      <div className="hero__content">
        <h1 className="sr-only">Mancos Land</h1>
        {!isIOS && <NewRibbon />}
        <div className="sign">
          <div className="sign__crew" aria-hidden="true">
            {SIGN_CREW.map((id) => (
              <img key={id} src={SPRITE(id)} alt="" width="96" height="104" />
            ))}
          </div>
          <div className="sign__board">
            <Logo />
          </div>
        </div>
        <p className="hero__tag">Cada mapa nuevo se genera distinto</p>

        <div className="hero__ctas">
          {isIOS ? (
            <>
              <p className="notice">
                <strong>Disponible solo para Android por ahora.</strong> Estamos trabajando en iOS.
              </p>
              <a className="btn btn--blue btn--lg" href={IOS_NOTIFY_URL}>
                Avisame cuando esté en iOS
              </a>
            </>
          ) : (
            <DownloadButton label={isDesktop ? 'DESCARGAR PARA ANDROID' : 'DESCARGAR APK'} />
          )}
          <button className="btn btn--purple btn--lg" onClick={onIntro}>
            <span aria-hidden="true">🎬</span> VER INTRO
          </button>
          <a className="btn btn--gold btn--lg" href="#historia">
            <span aria-hidden="true">📜</span> HISTORIA
          </a>
        </div>

        <p className="hero__meta">
          {APK.version} · Gratis · {APK.minAndroid} · {APK.size}
          {isDesktop && (
            <>
              {' · '}
              <a href="#descargar">o escaneá el QR con tu celular</a>
            </>
          )}
        </p>
      </div>

      <a href="#juego" className="hero__scroll" aria-label="Bajar al contenido">▼</a>
    </section>
  );
}

// Partículas de cristal decorativas (CSS). Menos en móvil, ninguna con reduced-motion.
function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} style={{ '--x': `${(i * 37) % 100}%`, '--d': `${8 + (i % 5) * 2}s`, '--delay': `${-i * 1.3}s` }} />
      ))}
    </div>
  );
}
