import { track } from '@vercel/analytics';
import { APK } from '../config/assets.js';

// Botón verde grande de descarga directa del APK.
// source = desde dónde se tocó (hero, panel, barra) → evento "Descarga APK" en Vercel Analytics.
export default function DownloadButton({ className = '', label = 'DESCARGAR APK', source = 'otro', ...rest }) {
  return (
    <a
      className={`btn btn--green btn--lg ${className}`}
      href={APK.url}
      download={APK.fileName}
      type="application/vnd.android.package-archive"
      onClick={() => track('Descarga APK', { version: APK.version, origen: source })}
      {...rest}
    >
      <span aria-hidden="true">▶</span> {label}
    </a>
  );
}
