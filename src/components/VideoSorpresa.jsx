// src/components/VideoSorpresa.jsx
import React, { useState } from 'react';

function VideoSorpresa({ datos }) {
  const [abierto, setAbierto] = useState(false);
  const textoBoton = datos.textoBotonVideo || "Toca para abrir tu sorpresa 🎁";
  const urlVideo = datos.urlVideo || "";

  // Identificar si es un link de YouTube
  const esYoutube = urlVideo.includes('youtube.com') || urlVideo.includes('youtu.be');

  const convertirUrlYoutube = (url) => {
    if (url.includes('embed/')) return url;
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  if (!urlVideo) return null;

  return (
    <div className="seccion-interactiva">
      {!abierto ? (
        <div onClick={() => setAbierto(true)} style={{ cursor: 'pointer' }}>
          <p className="texto-interactivo">✨ Tienes una sorpresa esperándote ✨</p>
          <button className="caja-regalo-btn">
            🎁
          </button>
          <p style={{ fontSize: '0.85rem', color: '#ff477e', fontWeight: 600, marginTop: '5px' }}>
            {textoBoton}
          </p>
        </div>
      ) : (
        <div className="seccion-video">
          <p className="texto-video">¡Momento especial! 💖</p>
          <div className="video-contenedor">
            {esYoutube ? (
              <iframe 
                width="100%" 
                height="220" 
                src={convertirUrlYoutube(urlVideo)} 
                title="Video Sorpresa" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="video-player"
              ></iframe>
            ) : (
              <video 
                src={urlVideo} 
                controls 
                autoPlay
                className="video-player"
              ></video>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoSorpresa;