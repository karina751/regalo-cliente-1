// src/components/VideoSorpresa.jsx
import React, { useState } from 'react';

function VideoSorpresa({ datos }) {
  // Estado de los 3 globos (true = inflado, false = reventado)
  const [globos, setGlobos] = useState([true, true, true]);
  const [videoRevelado, setVideoRevelado] = useState(false);
  const [videoTerminado, setVideoTerminado] = useState(false);

  const urlVideo = datos.urlVideo || "";

  // Identificar si es un link de YouTube
  const esYoutube = urlVideo.includes('youtube.com') || urlVideo.includes('youtu.be');

  const convertirUrlYoutube = (url) => {
    if (url.includes('embed/')) return url;
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  // Manejar el estallido de un globo
  const reventarGlobo = (index) => {
    const nuevosGlobos = [...globos];
    nuevosGlobos[index] = false;
    setGlobos(nuevosGlobos);

    // Si ya no quedan globos con vida (todos false), revelamos el video
    if (nuevosGlobos.every((g) => g === false)) {
      setTimeout(() => {
        setVideoRevelado(true);
      }, 400); // Pequeña pausa estética
    }
  };

  // Función para reiniciar la experiencia si quieren volver a verla
  const reiniciarExperiencia = () => {
    setGlobos([true, true, true]);
    setVideoRevelado(false);
    setVideoTerminado(false);
  };

  if (!urlVideo) return null;

  return (
    <div className="seccion-interactiva-globos">
      {!videoRevelado && !videoTerminado && (
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
                <span key={index} style={{ fontSize: '1.5rem', opacity: 0.3, width: '60px', textAlign: 'center' }}>💥</span>
              )
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', color: '#ff477e', marginTop: '10px', fontStyle: 'italic' }}>
            {globos.filter(g => g).length} globos restantes
          </p>
        </div>
      )}

      {videoRevelado && !videoTerminado && (
        <div className="tarjeta-video-revelado">
          <p className="texto-video">¡Sorpresa descubierta! Disfruta este momento 💖</p>
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
                onEnded={() => setVideoTerminado(true)} // Cuando el video termina, pasa a la pantalla de amor final
              ></video>
            )}
          </div>
          {esYoutube && (
            <button 
              onClick={() => setVideoTerminado(true)} 
              style={{ marginTop: '15px', background: '#e56b6f', fontSize: '0.85rem', padding: '8px' }}
            >
              Terminar video ✨
            </button>
          )}
        </div>
      )}

      {videoTerminado && (
        <div className="pantalla-final-amor">
          <div className="pareja-animacion">👩‍❤️‍👨</div>
          <h3 className="titulo-final">¡Por muchos momentos más juntos!</h3>
          <p className="texto-final">El amor se construye día a día con pequeños detalles. ❤️</p>
          <button className="btn-reiniciar-experiencia" onClick={reiniciarExperiencia}>
            Volver a abrir sorpresa 🎁
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoSorpresa;