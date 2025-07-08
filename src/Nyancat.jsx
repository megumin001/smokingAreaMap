import React from 'react';
import nyanCatGif from './assets/nyan-cat.gif';

export default function NyanCat() {
  return (
    <img
      src={nyanCatGif}
      alt="nyan cat"
      style={{
        width: 100,
        height: 100,
        animation: 'float 3s ease-in-out infinite',
        pointerEvents: 'none',
        userSelect: 'none',
        //zIndex: 9999,
      }}
    />
  );
}