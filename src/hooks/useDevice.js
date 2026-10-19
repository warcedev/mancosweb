import { useMemo } from 'react';

// Detecta el tipo de dispositivo a partir de navigator.userAgent.
// 'android' | 'ios' | 'desktop'
export function detectDevice() {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  // iPadOS 13+ se presenta como Mac: lo distinguimos por soporte táctil
  const iPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/i.test(ua) || iPadOS) return 'ios';
  return 'desktop';
}

export function useDevice() {
  return useMemo(() => {
    const type = detectDevice();
    return { type, isAndroid: type === 'android', isIOS: type === 'ios', isDesktop: type === 'desktop' };
  }, []);
}
