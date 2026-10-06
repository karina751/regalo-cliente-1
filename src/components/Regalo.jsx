// src/components/Regalo.jsx
import { datosCliente } from '../data/cliente';
import LineaDeTiempo from './LineaDeTiempo';
import VideoSorpresa from './VideoSorpresa'; // Importamos el video

function Regalo() {
  return (
    <div className="contenedor-regalo">
      <h1>{datosCliente.mensajeBienvenida}</h1>
      <p className="dedicatoria">{datosCliente.mensajeDedicatoria}</p>

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
      
      {/* AGREGAMOS EL VIDEO AL FINAL */}
      <VideoSorpresa />
      
    </div>
  );
}

export default Regalo;