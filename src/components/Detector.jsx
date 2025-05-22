import { useEffect } from 'react';

const Detector = () => {
  useEffect(() => {
    const checkDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      if (widthDiff > 100) {
        alert('개발자 도구가 열려있수다!');
      }
    };

    const checkUserAgent = () => {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes('headless') || ua.includes('phantom')) {
        alert('봇/스크래퍼 탐지됐수다!');
      }
    };

    checkDevTools();
    checkUserAgent();

    window.addEventListener('resize', checkDevTools);
    return () => window.removeEventListener('resize', checkDevTools);
  }, []);

  return null;
};

export default Detector;