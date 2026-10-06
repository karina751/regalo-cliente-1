// src/components/Regalo.jsx
import { datosCliente } from '../data/cliente'; // Textos por defecto
import LineaDeTiempo from './LineaDeTiempo';
import VideoSorpresa from './VideoSorpresa';

// Recibimos los datos de Firebase
function Regalo({ datos }) {
  return (
    <div className="contenedor-regalo">
      <h1>¡Feliz Aniversario! ❤️</h1>
      <p className="dedicatoria">Gracias por cada momento juntos. Dale play a nuestra canción...</p>

      <div className="reproductor-spotify">
        <iframe 
          style={{ borderRadius: '12px' }} 
          src={datosCliente.urlCancionSpotify} 
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
      
      {/* Le pasamos los datos de Firebase al video */}
      <VideoSorpresa datos={datos} />
      
    </div>
  );
}

export default Regalo;