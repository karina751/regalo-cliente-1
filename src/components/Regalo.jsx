// src/components/Regalo.jsx
import React from 'react';
import LineaDeTiempo from './LineaDeTiempo';
import VideoSorpresa from './VideoSorpresa';

function Regalo({ datos }) {
  // Si en Firebase pusiste un título, lo usa; si no, por defecto muestra "¡Feliz Aniversario! ❤️"
  const tituloPrincipal = datos.tituloRegalo || "¡Feliz Aniversario! ❤️";
  const dedicatoria = datos.dedicatoria || "Gracias por cada momento juntos";

  return (
    <div className="contenedor-regalo">
      <h1>{tituloPrincipal}</h1>
      <p className="dedicatoria">{dedicatoria}</p>

      {/* Reproductor de Spotify */}
      {datos.urlCancionSpotify && (
        <div className="reproductor-spotify">
          <iframe 
            style={{ borderRadius: '12px' }} 
            src={datos.urlCancionSpotify} 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="Reproductor Spotify"
          ></iframe>
        </div>
      )}
      
      {/* Álbum de recuerdos dinámico */}
      <LineaDeTiempo datos={datos} />
      
      {/* Video sorpresa final */}
      <VideoSorpresa datos={datos} />
    </div>
  );
}

export default Regalo;