// ─────────────────────────────────────────────────────────────
// Configuración editable de assets y datos de descarga.
// Cambiá acá nombres de archivo, versión, tamaño, etc.
// ─────────────────────────────────────────────────────────────

export const APK = {
  url: '/downloads/MancosLand-v4.8.apk', // archivo con versión: evita que el celular use una copia vieja en caché
  fileName: 'MancosLand-v4.8.apk',
  version: 'v4.8',
  size: '1,9 MB',
  minAndroid: 'Android 8+', // placeholder editable
  updated: '19/10/2026',
  isNew: true, // muestra los avisos de "¡Nueva versión!" (poné false cuando deje de ser novedad)
  // Novedades de la versión: agregá una línea por cambio y aparecen en el panel de descarga
  notes: [],
};

// Versión anterior, por si alguien tiene problemas con la nueva (null para ocultarla)
export const APK_PREVIOUS = {
  url: '/downloads/MancosLand-v4.7.apk',
  fileName: 'MancosLand-v4.7.apk',
  version: 'v4.7',
  size: '1,5 MB',
};

// Placeholder: link para el aviso de iOS (formulario, Discord, mailto:, etc.)
export const IOS_NOTIFY_URL = '#descargar';

// Videos: desktop (720p) y mobile (480p, sufijo -mobile). Generados con `npm run media`.
const video = (name) => ({
  desktop: `/videos/${name}.mp4`,
  mobile: `/videos/${name}-mobile.mp4`,
  poster: `/videos/${name}-poster.jpg`,
  posterSrcSet: `/videos/${name}-poster-640.webp 640w, /videos/${name}-poster-1280.webp 1280w`,
});

export const VIDEOS = {
  hero: video('gameplay1'),
  dungeon: video('mazmorra-gameplay'),
  story: video('historia-video'),
};

// Capturas (ancho 2392x1080 → ratio 299/135)
export const SHOT_RATIO = '299 / 135';
export const shot = (n) => ({
  src: `/img/shots/captura-${n}-960.jpg`,
  srcSet: `/img/shots/captura-${n}-480.webp 480w, /img/shots/captura-${n}-960.webp 960w, /img/shots/captura-${n}-1600.webp 1600w`,
});

export const SPRITE = (id) => `/img/sprites/${id}.webp`;
export const DRAGON = '/img/ui/dragon.webp';
