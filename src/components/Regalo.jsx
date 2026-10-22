// src/components/Regalo.jsx
import React from 'react';
import LineaDeTiempo from './LineaDeTiempo';
import VideoSorpresa from './VideoSorpresa';

function Regalo({ datos, onCerrarSesion }) {
  const tituloRegalo = datos.tituloRegalo || "¡Feliz Aniversario! ❤️";
  const dedicatoria = datos.dedicatoria || "Gracias por cada momento juntos";
  const urlCancionSpotify = datos.urlCancionSpotify || "";

  return (
    <div className="contenedor-regalo">
      <h1>{tituloRegalo}</h1>
      <p className="dedicatoria">{dedicatoria}</p>

      {/* Reproductor de Spotify comentado para este cliente */}
      {/* 
      {urlCancionSpotify && (
        <div className="reproductor-spotify">
          <iframe
            style={{ borderRadius: '12px' }}
            src={urlCancionSpotify}
            width="100%"
            height="152"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Canción"
          ></iframe>
        </div>
      )} 
      */}

      {/* Línea de tiempo / Álbum de fotos */}
      <LineaDeTiempo datos={datos} />

      {/* Sección interactiva de globos y video con el botón de cierre actualizado */}
      <VideoSorpresa datos={datos} onCerrarSesion={onCerrarSesion} />
    </div>
  );
}

export default Regalo;