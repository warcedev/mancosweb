import { useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { VIDEOS } from './config/assets.js';
import { useInView } from './hooks/useInView.js';
import Navbar, { Logo } from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Story from './components/Story.jsx';
import { Characters, Bosses } from './components/Characters.jsx';
import { Gallery, Lightbox } from './components/Gallery.jsx';
import Download, { StickyDownload } from './components/Download.jsx';
import VideoModal from './components/VideoModal.jsx';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [shot, setShot] = useState(null);
  const downloadRef = useRef(null);
  const downloadVisible = useInView(downloadRef, { threshold: 0.15 });

  const openIntro = () => setIntroOpen(true);

  return (
    <>
      <a className="skip" href="#juego">Saltar al contenido</a>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero onIntro={openIntro} />
        <Features />
        <Story onIntro={openIntro} />
        <Characters />
        <Bosses />
        <Gallery onOpen={setShot} />
        <Download ref={downloadRef} />
      </main>
      <footer className="footer">
        <Logo small />
        <p>Mancos Land · RPG pixelado para Android</p>
        <p className="footer__small">El APK se distribuye directamente desde esta web.</p>
      </footer>

      <StickyDownload hidden={downloadVisible || menuOpen || introOpen || shot !== null} />
      <VideoModal video={VIDEOS.story} open={introOpen} onClose={() => setIntroOpen(false)} title="Intro de Mancos Land" />
      <Lightbox index={shot} setIndex={setShot} />
      <Analytics />
    </>
  );
}
