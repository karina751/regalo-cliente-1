// src/components/LineaDeTiempo.jsx
import React, { useEffect, useRef } from 'react';

function LineaDeTiempo({ datos }) {
  const textos = datos.textosHistoria || [];
  const fotos = datos.fotosHistoria || datos.fotos || [];
  const tituloSeccion = datos.tituloHistoria || "Nuestra Historia ❤️";
  
  const carruselRef = useRef(null);

  // Desplazamiento automático más pausado (ej: cada 7 segundos para que dé tiempo de leer)
  useEffect(() => {
    const contenedor = carruselRef.current;
    if (!contenedor) return;

    const intervalo = setInterval(() => {
      const tarjeta = contenedor.querySelector('.tarjeta-momento');
      if (!tarjeta) return;
      const anchoTarjeta = tarjeta.offsetWidth + 15; // Ancho + gap

      if (contenedor.scrollLeft + contenedor.clientWidth >= contenedor.scrollWidth - 10) {
        contenedor.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        contenedor.scrollBy({ left: anchoTarjeta, behavior: 'smooth' });
      }
    }, 60000); // 1minutoundos por imagen

    return () => clearInterval(intervalo);
  }, [textos.length]);

  // Funciones para pasar de foto manualmente con botones
  const desplazar = (direccion) => {
    const contenedor = carruselRef.current;
    if (!contenedor) return;
    const tarjeta = contenedor.querySelector('.tarjeta-momento');
    if (!tarjeta) return;
    const anchoTarjeta = tarjeta.offsetWidth + 15;

    contenedor.scrollBy({ 
      left: direccion === 'izquierda' ? -anchoTarjeta : anchoTarjeta, 
      behavior: 'smooth' 
    });
  };

  if (textos.length === 0) return null;

  return (
    <div className="seccion-album">
      <h3 className="titulo-seccion">{tituloSeccion}</h3>
      
      {/* Contenedor del carrusel con scroll manual habilitado y fluido */}
      <div className="album-carrusel-horizontal" ref={carruselRef}>
        {textos.map((parrafo, index) => (
          <div key={index} className="tarjeta-momento">
            {fotos[index] && typeof fotos[index] === 'string' && fotos[index].trim() !== "" && (
              <div className="foto-recuerdo-wrapper">
                <img 
                  src={fotos[index]} 
                  alt={`Momento ${index + 1}`} 
                  className="foto-recuerdo"
                  onError={(e) => { 
                    console.error("Error cargando imagen:", fotos[index]);
                    e.target.style.display = 'none'; 
                  }}
                />
              </div>
            )}
            <p className="texto-recuerdo">{parrafo}</p>
            <span className="indicador-pagina">Recuerdo {index + 1} de {textos.length}</span>
          </div>
        ))}
      </div>

      {/* Botones de navegación manual opcionales para pasar las fotos cómodamente */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
        <button 
          onClick={() => desplazar('izquierda')} 
          style={{ width: '40px', height: '40px', padding: '0', borderRadius: '50%', fontSize: '1.1rem', boxShadow: '0 3px 8px rgba(255,71,126,0.3)' }}
          title="Anterior"
        >
          ❮
        </button>
        <button 
          onClick={() => desplazar('derecha')} 
          style={{ width: '40px', height: '40px', padding: '0', borderRadius: '50%', fontSize: '1.1rem', boxShadow: '0 3px 8px rgba(255,71,126,0.3)' }}
          title="Siguiente"
        >
          ❯
        </button>
      </div>
    </div>
  );
}

export default LineaDeTiempo;