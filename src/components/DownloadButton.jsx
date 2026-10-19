import { APK } from '../config/assets.js';

// Botón verde grande de descarga directa del APK.
export default function DownloadButton({ className = '', label = 'DESCARGAR APK', ...rest }) {
  return (
    <a className={`btn btn--green btn--lg ${className}`} href={APK.url} download={APK.fileName} type="application/vnd.android.package-archive" {...rest}>
      <span aria-hidden="true">▶</span> {label}
    </a>
  );
}
