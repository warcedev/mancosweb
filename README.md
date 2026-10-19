# Mancos Land — web oficial

Landing mobile-first del juego **Mancos Land** (Android). Vite + React, sin service worker.

```bash
npm install
npm run media      # genera videos, imágenes, sprites e íconos en /public (solo hace falta 1 vez)
npm run dev        # http://localhost:5173
npm run build      # salida en /dist
npm run preview    # sirve /dist en la red local
```

## Estructura

```
multimediamancos/          originales (no se publican)
public/
  downloads/MancosLand.apk instalador (placeholder: reemplazalo por la build nueva)
  videos/                  <nombre>.mp4 (720p) · <nombre>-mobile.mp4 (480p) · posters webp/jpg
  img/shots|sprites|ui/    capturas en srcset, sprites recortados, dragón del pergamino
  icons/                   apple-touch-icon, icon-192/512, favicon
  manifest.webmanifest
scripts/optimize-media.mjs pipeline de assets (ffmpeg-static + sharp)
src/
  config/assets.js         ← versión, tamaño, Android mínimo, fecha, rutas, link de iOS
  data/content.js          historia (9 capítulos), personajes, castillos, galería
  hooks/                   useDevice, useSwipe, useScrollLock, useInView, videoPolicy
  components/              Navbar (+ menú móvil), Hero, Features, Story, Characters/Bosses,
                           Gallery/Lightbox, Download (+ QR y barra sticky), VideoModal, BgVideo
```

### Publicar una versión nueva del APK
Versión actual: **v4.8** (1,9 MB) · anterior: v4.7.

1. Copiá el APK con su versión en el nombre: `public/downloads/MancosLand-vX.Y.apk`.
2. Copialo también encima de `public/downloads/MancosLand.apk`, que es el link fijo para quien tenga el enlace viejo.
3. En `src/config/assets.js`:
   - `APK`: `url`, `fileName`, `version`, `size`, `minAndroid`, `updated`.
   - `isNew: true` muestra los avisos de **¡Nueva versión!**: cinta en el hero, “NUEVO” en el menú y en la navbar, etiqueta en la barra fija y panel de descarga destacado. Cuando deje de ser novedad, ponelo en `false`.
   - `notes: ['…', '…']`: novedades de la versión. Si la lista tiene algo, aparece “Novedades de la vX.Y” en el panel de descarga.
   - `APK_PREVIOUS`: la versión anterior, ofrecida como “¿Problemas con la nueva versión?”. Si no la querés mostrar, ponela en `null`.
4. `npm run build`, commit y push.

`IOS_NOTIFY_URL` es el destino del botón “Avisame cuando esté en iOS” (formulario, Discord, `mailto:`…).

## Comportamiento por dispositivo

| Dispositivo | Qué ve |
|---|---|
| Android | Botón verde “▶ DESCARGAR APK” (descarga directa) + barra inferior fija |
| iPhone / iPad | Aviso “Disponible solo para Android por ahora” + botón “Avisame cuando esté en iOS”; sin barra fija |
| PC | Botón de descarga + QR generado en el cliente (“Escaneá con tu celular”) |

La detección está en `src/hooks/useDevice.js` (`navigator.userAgent`; iPadOS se detecta por `maxTouchPoints`).

## Videos

Hay dos versiones de cada video. `npm run media` las genera con `ffmpeg-static`, así que no hace falta instalar ffmpeg. Los comandos equivalentes con ffmpeg instalado son estos:

```bash
# Escritorio: 720p, H.264, CRF 28, faststart (los de fondo sin audio)
ffmpeg -i multimediamancos/gameplay1.mp4 -vf "scale=-2:720" -r 30 -c:v libx264 -preset slow -crf 28 \
  -pix_fmt yuv420p -movflags +faststart -an public/videos/gameplay1.mp4

# Móvil: 480p, CRF 30, sin audio
ffmpeg -i multimediamancos/gameplay1.mp4 -vf "scale=-2:480" -r 30 -c:v libx264 -preset slow -crf 30 \
  -pix_fmt yuv420p -movflags +faststart -an public/videos/gameplay1-mobile.mp4

# Igual para mazmorra-gameplay.mp4.
# historia-video.mp4 conserva el audio (se ve en el modal): reemplazá -an por
#   -c:a aac -b:a 128k   (escritorio)   /   -c:a aac -b:a 96k   (móvil)
```

Tamaños resultantes: gameplay1 6,7 MB / **2,7 MB** móvil · mazmorra 9,5 MB / **3,7 MB** · historia 5,3 MB / **2,8 MB**.

Reglas de reproducción (`src/hooks/videoPolicy.js`, `src/components/BgVideo.jsx`):
- La versión `-mobile` se usa con ancho ≤ 767 px, alto ≤ 500 px (móvil horizontal) o conexión 3g.
- Solo se muestra el poster si hay `prefers-reduced-motion`, `navigator.connection.saveData` o conexión 2g/slow-2g.
- Se reproduce un solo video de fondo a la vez (IntersectionObserver); el resto se pausa. Solo el hero carga de entrada; los demás usan `preload="none"` y cargan al acercarse.
- Todos los videos de fondo llevan `muted loop playsInline autoPlay` y poster.
- El video de la intro (con audio) solo se reproduce dentro del modal, después de un toque, con controles nativos. Mientras está abierto, los videos de fondo se pausan.

## Probar desde el teléfono (red local)

```bash
npm run dev:host        # = vite --host
# Vite muestra algo como:  ➜  Network: http://192.168.1.23:5173/
```
1. Conectá el teléfono a la **misma red Wi-Fi** que la PC.
2. Abrí la URL `Network` en Chrome (Android) o Safari (iOS).
3. Para probar el QR, abrí la web en la PC usando la IP de red (no `localhost`). El QR codifica la URL actual, así que con `localhost` el teléfono no la va a encontrar.
4. En WSL2 la IP de la PC no es la de WSL: hace falta un port-forward (`netsh interface portproxy add v4tov4 listenport=5173 connectaddress=<IP de WSL> connectport=5173`) y abrir el puerto en el firewall de Windows.

Para probar la build final: `npm run build && npm run preview` (puerto 4173, también expuesto en la red).

## Calidad: resultados medidos

Pruebas automáticas (Chromium headless) en 360, 390, 430, 768, 1024, 1440 y 1920 px, más 780×360 y 932×430 en horizontal:
- Sin scroll horizontal en ningún ancho.
- Ningún elemento tocable mide menos de 48 px en móvil.
- Sin errores de consola.
- Funcionan el menú, el swipe del pergamino y del lightbox, el cierre con swipe hacia abajo y tocando fuera, el bloqueo del scroll de fondo, la barra sticky que se oculta en el panel de descarga, el QR solo en PC y la exclusividad de videos.

**Lighthouse móvil** (build de producción): Performance 91 · Accesibilidad 100 · Buenas prácticas 100 · SEO 100 · CLS 0,002.

## Checklist en dispositivos reales

**Android · Chrome**
- [ ] El hero carga el poster al instante y el video arranca solo, sin sonido.
- [ ] “DESCARGAR APK” baja `MancosLand.apk`. Abrirlo desde Descargas inicia la instalación (permitir “apps desconocidas”).
- [ ] La barra inferior queda visible al hacer scroll y se oculta al llegar al panel de descarga. No tapa la barra de gestos.
- [ ] Menú hamburguesa: abre a pantalla completa, cierra al tocar un enlace o fuera, y el fondo no se mueve.
- [ ] Pergamino: el swipe izquierda/derecha cambia de capítulo, los 9 puntitos avanzan y el texto nunca queda cortado.
- [ ] Personajes: el carrusel desliza con snap.
- [ ] Galería: el lightbox abre a pantalla completa, desliza entre capturas y cierra con swipe hacia abajo.
- [ ] Intro: suena y tiene controles. Rotar a horizontal sigue funcionando.
- [ ] Con “Ahorro de datos” activado en Chrome se ven solo posters, sin videos.
- [ ] Rotar a horizontal: el hero, el menú y los modales se ven completos.
- [ ] “Agregar a pantalla principal”: aparecen el ícono y el color #1a1626.

**iOS · Safari**
- [ ] Se ve el aviso “Disponible solo para Android por ahora” y el botón “Avisame…”. No aparece la barra sticky.
- [ ] El notch y la barra de inicio no tapan contenido (safe areas), en vertical y en horizontal.
- [ ] El hero no salta al mostrarse u ocultarse la barra de Safari (`100svh`).
- [ ] Los videos de fondo reproducen inline, sin abrir pantalla completa.
- [ ] Con “Reducir movimiento” activado (Ajustes → Accesibilidad) se ven solo posters, sin partículas.
- [ ] Al cerrar un modal, la página vuelve a la misma posición de scroll.
- [ ] “Agregar a inicio” usa el apple-touch-icon.

**PC**
- [ ] Se ven el QR y “Escaneá con tu celular”. Al escanearlo desde Android, baja el APK.
- [ ] Los modales cierran con Esc y el lightbox navega con las flechas del teclado.
