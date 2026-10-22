// src/components/VideoSorpresa.jsx
import React, { useState } from 'react';

function VideoSorpresa({ datos, onCerrarSesion }) {
  const [globos, setGlobos] = useState([true, true, true]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [videoTerminado, setVideoTerminado] = useState(false);

  const urlVideo = datos.urlVideo || "";
  const esYoutube = urlVideo.includes('youtube.com') || urlVideo.includes('youtu.be');

  const convertirUrlYoutube = (url) => {
    if (url.includes('embed/')) return url;
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const reventarGlobo = (index) => {
    const nuevosGlobos = [...globos];
    nuevosGlobos[index] = false;
    setGlobos(nuevosGlobos);

    if (nuevosGlobos.every((g) => g === false)) {
      setTimeout(() => {
        setModalAbierto(true);
        setVideoTerminado(false);
      }, 300);
    }
  };

  const manejarCierreFinal = () => {
    setGlobos([true, true, true]);
    setModalAbierto(false);
    setVideoTerminado(false);
    if (onCerrarSesion) {
      onCerrarSesion();
    }
  };

  if (!urlVideo) return null;

  return (
    <div className="seccion-interactiva-globos">
      <div>
        <p className="instruccion-globos">🎈 ¡Revienta los globos de amor para abrir tu sorpresa! 🎈</p>
        <div className="contenedor-globos">
          {globos.map((activo, index) => (
            activo ? (
              <button 
                key={index} 
                className="globo-corazon"
                onClick={() => reventarGlobo(index)}
                title="¡Tócame para reventar!"
              >
                💖
              </button>
            ) : (
              <span key={index} style={{ fontSize: '1.5rem', opacity: 0.3, width: '55px', textAlign: 'center' }}>💥</span>
            )
          ))}
        </div>
        <p style={{ fontSize: '0.8rem', color: '#0284c7', marginTop: '10px', fontStyle: 'italic' }}>
          {globos.filter(g => g).length} globos restantes
        </p>
      </div>

      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            
            {!videoTerminado ? (
              <div className="tarjeta-video-revelado">
                <p className="texto-video" style={{ fontWeight: 'bold', color: '#451a03', marginBottom: '10px' }}>
                  ¡Sorpresa descubierta! Disfruta este momento 💖
                </p>
                <div className="video-contenedor">
                  {esYoutube ? (
                    <iframe 
                      width="100%" 
                      height="240" 
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
                      onEnded={() => setVideoTerminado(true)}
                    ></video>
                  )}
                </div>
                
                <button 
                  onClick={() => setVideoTerminado(true)} 
                  style={{ 
                    marginTop: '15px', 
                    background: 'linear-gradient(135deg, #0284c7, #0369a1)', 
                    fontSize: '0.9rem', 
                    padding: '12px',
                    width: '100%',
                    borderRadius: '12px',
                    border: 'none',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Ver mensaje final 💖✨
                </button>
              </div>
            ) : (
              <div className="pantalla-final-amor">
                <div className="pareja-animacion">👩‍❤️‍👨</div>
                <h3 className="titulo-final">¡Cordón de tres dobleces no se rompe fácilmente!</h3>
                <p className="texto-final">El amor se construye día a día con pequeños detalles. ❤️</p>
                <button className="btn-reiniciar-experiencia" onClick={manejarCierreFinal}>
                  🔒 Volver al inicio 
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default VideoSorpresa;