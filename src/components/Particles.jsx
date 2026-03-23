import React, { useEffect, useRef } from 'react';

const COLORS = ['#ff6b6b', '#ffd93d', '#a78bfa', '#4ecb71', '#6bcbff'];

export default function Particles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 10 + 4;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 8}s;
      `;
      container.appendChild(p);
    }

    return () => { container.innerHTML = ''; };
  }, []);

  return <div className="particles" ref={containerRef} />;
}