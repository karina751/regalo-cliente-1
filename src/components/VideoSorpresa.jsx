// src/components/VideoSorpresa.jsx

function VideoSorpresa({ datos }) {
  if (!datos.urlVideo) return null; 

  // Función para transformar un enlace normal de YouTube en uno apto para incrustar (iframe)
  const obtenerUrlYoutube = (url) => {
    // Si el link tiene "watch?v=", lo transformamos a "embed/"
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    // Si es un enlace corto de youtu.be, también lo adaptamos
    if (url.includes("youtu.be/")) {
      const idVideo = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${idVideo}`;
    }
    return url;
  };

  // Verificamos si el enlace es de YouTube
  const esYoutube = datos.urlVideo.includes("youtube.com") || datos.urlVideo.includes("youtu.be");

  return (
    <div className="seccion-video">
      <h3 className="titulo-seccion">Una última sorpresa</h3>
      <p className="texto-video">Para terminar, dale play. Tengo algo más que decirte...</p>
      
      <div className="video-contenedor">
        {esYoutube ? (
          /* Si es YouTube, usamos un iframe adaptado para celulares */
          <iframe 
            width="100%" 
            height="220" 
            src={obtenerUrlYoutube(datos.urlVideo)} 
            title="Video sorpresa" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ borderRadius: '12px', display: 'block' }}
          ></iframe>
        ) : (
          /* Si es un archivo directo tipo .mp4, usamos el reproductor nativo */
          <video 
            controls 
            className="video-player"
            controlsList="nodownload"
          >
            <source src={datos.urlVideo} type="video/mp4" />
            Tu navegador no soporta la reproducción de videos.
          </video>
        )}
      </div>
    </div>
  );
}

export default VideoSorpresa;