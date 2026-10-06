// src/components/VideoSorpresa.jsx
import { datosCliente } from '../data/cliente';

function VideoSorpresa() {
  // Si por alguna razón el cliente no te pasó video, esto oculta la sección para que no dé error
  if (!datosCliente.urlVideo) return null; 

  return (
    <div className="seccion-video">
      <h3 className="titulo-seccion">Una última sorpresa</h3>
      <p className="texto-video">{datosCliente.mensajeVideo}</p>
      
      <div className="video-contenedor">
        <video 
          controls 
          className="video-player"
          controlsList="nodownload" // Evita que aparezca el botón de descargar
        >
          <source src={datosCliente.urlVideo} type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>
      </div>
    </div>
  );
}

export default VideoSorpresa;