// ─────────────────────────────────────────────────────────────
// Configuración editable de assets y datos de descarga.
// Cambiá acá nombres de archivo, versión, tamaño, etc.
// ─────────────────────────────────────────────────────────────

export const APK = {
  url: '/downloads/MancosLand.apk', // placeholder: reemplazá el archivo en /public/downloads
  fileName: 'MancosLand.apk',
  version: 'v4.7',
  size: '1,5 MB',
  minAndroid: 'Android 8+', // placeholder editable
  updated: '19/10/2026',
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
