import React, { useEffect, useState } from 'react';
import nyanGif from './assets/nyan-cat.gif'; // GIFファイルを用意してね！

export default function CuteCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = e => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          width: 48,
          height: 48,
          zIndex: 9999,
          userSelect: 'none',
          mixBlendMode: 'normal', // 好きなら色味調整もできるよ
        }}
      >
        <img src={nyanGif} alt="cute cursor" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* カーソルを透明にしてアニメ絵が見えるように */}
      <style>{`
        body, * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}