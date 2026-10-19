import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Precarga la fuente del logo (Roboto 900): es parte del elemento LCP del hero.
const preloadLogoFont = {
  name: 'preload-logo-font',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      const font = Object.keys(ctx.bundle || {}).find((f) => /roboto-latin-900-normal.*\.woff2$/.test(f));
      if (!font) return html;
      return html.replace('</title>', `</title>\n    <link rel="preload" href="/${font}" as="font" type="font/woff2" crossorigin />`);
    },
  },
};

export default defineConfig({
  plugins: [react(), preloadLogoFont],
  build: { assetsInlineLimit: 0 },
});
