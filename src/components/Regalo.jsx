// src/components/Regalo.jsx
import LineaDeTiempo from './LineaDeTiempo';
import VideoSorpresa from './VideoSorpresa';

// Recibimos los datos de Firebase
function Regalo({ datos }) {
  return (
    <div className="contenedor-regalo">
      <h1>¡Feliz Aniversario! ❤️</h1>
      <p className="dedicatoria">Gracias por cada momento juntos. Dale play a nuestra canción...</p>

      {/* Reproductor de Spotify dinámico */}
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
      
      <LineaDeTiempo />
      
      {/* Video sorpresa */}
      <VideoSorpresa datos={datos} />
      
    </div>
  );
}

export default Regalo;