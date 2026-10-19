import { forwardRef, useMemo } from 'react';
import qrcode from 'qrcode-generator';
import { track } from '@vercel/analytics';
import { APK, APK_PREVIOUS, IOS_NOTIFY_URL, versionLabel } from '../config/assets.js';
import { useDevice } from '../hooks/useDevice.js';
import DownloadButton from './DownloadButton.jsx';
import NewBadge from './NewBadge.jsx';

const STEPS = [
  { t: 'Descargá el archivo', d: `Tocá “Descargar APK” y esperá a que baje ${APK.fileName}.` },
  { t: 'Abrilo desde Descargas', d: 'Abrí la notificación de descarga o la app Archivos → Descargas.' },
  { t: 'Permití la instalación', d: 'Si Android lo pide, activá “Instalar apps desconocidas” para tu navegador.' },
  { t: 'Instalá y jugá', d: 'Tocá Instalar, abrí Mancos Land y elegí tu Manco.' },
];

// QR generado en el cliente (qrcode-generator, ~20 KB sin dependencias)
function QR({ url }) {
  const svg = useMemo(() => {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    return qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
  }, [url]);
  return <div className="qr" role="img" aria-label="Código QR para descargar el APK" dangerouslySetInnerHTML={{ __html: svg }} />;
}

const Download = forwardRef(function Download(_, ref) {
  const { isIOS, isDesktop } = useDevice();
  const apkAbsolute = typeof window !== 'undefined' ? new URL(APK.url, window.location.href).href : APK.url;

  return (
    <section className="section section--download" id="descargar" ref={ref}>
      <div className="container">
        <div className={`dl frame ${APK.isNew ? 'dl--new' : ''}`}>
          <NewBadge variant="ribbon" withVersion className="dl__ribbon" />
          <div className="dl__main">
            <h2 className="title">Descargá Mancos Land</h2>
            <p className="dl__platform">
              <span className="pill pill--green">Android</span>
              {APK.beta && <span className="pill pill--beta">Beta</span>}
              Gratis · sin cuenta obligatoria
            </p>

            {APK.beta && (
              <p className="dl__beta">
                <strong>Mancos Land está en beta.</strong> El juego sigue en desarrollo: puede tener errores y cambiar entre versiones. ¡Gracias por probarlo!
              </p>
            )}

            <dl className="dl__meta">
              <div className={APK.isNew ? 'is-new' : ''}><dt>Versión</dt><dd>{versionLabel(APK)} {APK.isNew && <small className="dl__newtag">NUEVA</small>}</dd></div>
              <div><dt>Tamaño</dt><dd>{APK.size}</dd></div>
              <div><dt>Requiere</dt><dd>{APK.minAndroid}</dd></div>
              <div><dt>Actualizado</dt><dd>{APK.updated}</dd></div>
            </dl>

            {APK.isNew && !isIOS && (
              <div className="dl__news">
                <p className="dl__update">
                  <strong>¿Ya tenés el juego?</strong> Descargá la {versionLabel(APK)} e instalala para actualizar.
                </p>
                {APK.notes.length > 0 && (
                  <>
                    <h3 className="dl__news-title">Novedades de la {APK.version}</h3>
                    <ul className="dl__notes">
                      {APK.notes.map((n) => <li key={n}>{n}</li>)}
                    </ul>
                  </>
                )}
              </div>
            )}

            {isIOS ? (
              <div className="dl__ios">
                <p className="notice">
                  <strong>Disponible solo para Android por ahora.</strong> Todavía no hay versión para iPhone ni iPad.
                </p>
                <a className="btn btn--blue btn--lg" href={IOS_NOTIFY_URL} onClick={() => track('Aviso iOS')}>Avisame cuando esté en iOS</a>
              </div>
            ) : (
              <div className="dl__action">
                <DownloadButton label="DESCARGAR APK" source="panel" />
                {isDesktop && (
                  <div className="dl__qr">
                    <QR url={apkAbsolute} />
                    <p><strong>Escaneá con tu celular</strong><br />y bajá el APK directo en tu Android.</p>
                  </div>
                )}
              </div>
            )}

            {APK_PREVIOUS && !isIOS && (
              <p className="dl__prev">
                ¿Problemas con la nueva versión?{' '}
                <a
                  href={APK_PREVIOUS.url}
                  download={APK_PREVIOUS.fileName}
                  type="application/vnd.android.package-archive"
                  onClick={() => track('Descarga APK', { version: APK_PREVIOUS.version, origen: 'version-anterior' })}
                >
                  Descargá la {APK_PREVIOUS.version} ({APK_PREVIOUS.size})
                </a>
              </p>
            )}

            <p className="dl__safe">
              <span aria-hidden="true">🛡</span> El APK se instala fuera de Play Store. Es normal que Android te pida permiso la primera vez.
            </p>
          </div>

          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.t}>
                <span className="steps__n" aria-hidden="true">{i + 1}</span>
                <div>
                  <strong>{s.t}</strong>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
});

export default Download;

// Barra inferior fija (solo móvil). Se oculta cuando el panel de descarga está en pantalla.
export function StickyDownload({ hidden }) {
  const { isIOS } = useDevice();
  if (isIOS) return null;
  return (
    <div className={`sticky-dl ${hidden ? 'is-hidden' : ''}`} aria-hidden={hidden}>
      <span className="sticky-dl__info">
        {APK.isNew ? <NewBadge variant="tag" /> : 'Mancos Land'}
        <small>{versionLabel(APK)} · {APK.size}</small>
      </span>
      <DownloadButton label="DESCARGAR APK" source="barra" tabIndex={hidden ? -1 : 0} />
    </div>
  );
}
