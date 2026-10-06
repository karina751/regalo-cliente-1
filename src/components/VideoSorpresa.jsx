// src/components/VideoSorpresa.jsx

function VideoSorpresa({ datos }) {
  // Si en Firebase no le pusiste video a este cliente, no muestra nada
  if (!datos.urlVideo) return null; 

  return (
    <div className="seccion-video">
      <h3 className="titulo-seccion">Una última sorpresa</h3>
      <p className="texto-video">Para terminar, dale play. Tengo algo más que decirte...</p>
      
      <div className="video-contenedor">
        <video 
          controls 
          className="video-player"
          controlsList="nodownload"
        >
          {/* Aquí inyectamos el enlace que guardaste en la nube */}
          <source src={datos.urlVideo} type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>
      </div>
    </div>
  );
}

export default VideoSorpresa;