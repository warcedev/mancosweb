import { useEffect } from 'react';
import { pickSource } from '../hooks/videoPolicy.js';
import Modal from './Modal.jsx';
import { suspendBackgroundVideos } from './BgVideo.jsx';

// Video con audio: solo dentro del modal, tras un toque del usuario, con controles nativos.
export default function VideoModal({ video, open, onClose, title }) {
  useEffect(() => {
    if (!open) return;
    suspendBackgroundVideos(true);
    return () => suspendBackgroundVideos(false);
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} label={title} className="modal--video">
      <div className="vmodal">
        <video
          src={pickSource(video)}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          controlsList="nodownload"
        />
      </div>
    </Modal>
  );
}
