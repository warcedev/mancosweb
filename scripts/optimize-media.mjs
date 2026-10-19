// Genera todos los assets optimizados en /public a partir de /multimediamancos.
// Uso: npm run media   (usa ffmpeg-static y sharp, no hace falta ffmpeg instalado)
import { execFileSync } from 'node:child_process';
import { mkdirSync, copyFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const SRC = 'multimediamancos';
const OUT = 'public';
const force = process.argv.includes('--force');

for (const d of ['videos', 'img/shots', 'img/sprites', 'img/ui', 'icons', 'downloads']) {
  mkdirSync(join(OUT, d), { recursive: true });
}

const run = (args) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
const skip = (f) => !force && existsSync(f);
const kb = (f) => `${Math.round(statSync(f).size / 1024)} KB`;

// ---------- Videos ----------
// keepAudio: solo el video de historia (se ve en modal, con sonido)
const videos = [
  { name: 'gameplay1', keepAudio: false },
  { name: 'mazmorra-gameplay', keepAudio: false },
  { name: 'historia-video', keepAudio: true },
];

for (const { name, keepAudio } of videos) {
  const input = join(SRC, `${name}.mp4`);
  const desktop = join(OUT, 'videos', `${name}.mp4`);
  const mobile = join(OUT, 'videos', `${name}-mobile.mp4`);
  const audio = keepAudio ? ['-c:a', 'aac', '-b:a', '128k'] : ['-an'];

  if (!skip(desktop)) {
    // Escritorio: 720p, H.264, CRF 28, faststart
    run(['-i', input, '-vf', 'scale=-2:720', '-r', '30', '-c:v', 'libx264', '-preset', 'slow', '-crf', '28',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', ...audio, desktop]);
  }
  if (!skip(mobile)) {
    // Móvil: 480p, CRF 30, sin audio en los de fondo
    const mAudio = keepAudio ? ['-c:a', 'aac', '-b:a', '96k'] : ['-an'];
    run(['-i', input, '-vf', 'scale=-2:480', '-r', '30', '-c:v', 'libx264', '-preset', 'slow', '-crf', '30',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', ...mAudio, mobile]);
  }
  console.log(`video ${name}: desktop ${kb(desktop)} · mobile ${kb(mobile)}`);

  // Posters (webp + jpg)
  const poster = join(SRC, `${name}-poster.jpg`);
  for (const w of [640, 1280]) {
    await sharp(poster).resize({ width: w }).webp({ quality: 72 }).toFile(join(OUT, 'videos', `${name}-poster-${w}.webp`));
  }
  await sharp(poster).resize({ width: 1280 }).jpeg({ quality: 75, mozjpeg: true }).toFile(join(OUT, 'videos', `${name}-poster.jpg`));
}

// ---------- Capturas (srcset) ----------
for (let i = 1; i <= 5; i++) {
  const input = join(SRC, `captura-${i}.jpg`);
  for (const w of [480, 960, 1600]) {
    await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(join(OUT, 'img/shots', `captura-${i}-${w}.webp`));
  }
  await sharp(input).resize({ width: 960 }).jpeg({ quality: 76, mozjpeg: true }).toFile(join(OUT, 'img/shots', `captura-${i}-960.jpg`));
}

// ---------- Sprites de personajes (recortados de captura-2) ----------
const roster = [
  'gabriel', 'trebord', 'el-pibe', 'willito', 'nanan',
  'trus', 'sutrus', 'sucutrus', 'fabino', 'gabriel-rojo',
  'trebord-ninja', 'pibe-rojo', 'willito-dorado',
];
const colX = [500, 674, 848, 1022, 1196];
const rowY = [112, 286, 461];
for (const [i, id] of roster.entries()) {
  const left = colX[i % 5] + 30;
  const top = rowY[Math.floor(i / 5)] + 14;
  await sharp(join(SRC, 'captura-2.jpg'))
    .extract({ left, top, width: 96, height: 104 })
    .resize({ width: 192, kernel: 'nearest' })
    .webp({ quality: 85 })
    .toFile(join(OUT, 'img/sprites', `${id}.webp`));
}
// Gabriel grande (panel izquierdo)
await sharp(join(SRC, 'captura-2.jpg'))
  .extract({ left: 206, top: 140, width: 160, height: 196 })
  .webp({ quality: 88 })
  .toFile(join(OUT, 'img/sprites', 'gabriel-big.webp'));

// ---------- Dragón marca de agua (del pergamino) ----------
await sharp(join(SRC, 'historia 1.jpg'))
  .extract({ left: 1680, top: 470, width: 590, height: 300 })
  .webp({ quality: 80 })
  .toFile(join(OUT, 'img/ui', 'dragon.webp'));

// ---------- Íconos ----------
const bg = { r: 0x1a, g: 0x16, b: 0x26, alpha: 1 };
const face = await sharp(join(SRC, 'captura-2.jpg')).extract({ left: 230, top: 146, width: 110, height: 110 }).toBuffer();
for (const [file, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512], ['favicon-32.png', 32]]) {
  const inner = Math.round(size * 0.78);
  const sprite = await sharp(face).resize(inner, inner, { kernel: 'nearest' }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: sprite, gravity: 'center' }])
    .png()
    .toFile(join(OUT, 'icons', file));
}

// ---------- APK ----------
// Solo la primera vez: las versiones nuevas se copian a mano en public/downloads (ver README)
const apkOut = join(OUT, 'downloads', 'MancosLand.apk');
if (!existsSync(apkOut)) copyFileSync(join(SRC, 'MancosLand-v4.7.apk'), apkOut);
console.log(`apk: ${kb(apkOut)}`);
console.log('Listo.');
