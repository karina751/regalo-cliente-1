// src/components/LineaDeTiempo.jsx
import React, { useEffect, useRef } from 'react';

function LineaDeTiempo({ datos }) {
  const textos = datos.textosHistoria || [];
  const fotos = datos.fotosHistoria || datos.fotos || [];
  const tituloSeccion = datos.tituloHistoria || "Nuestra Historia ❤️";
  
  const carruselRef = useRef(null);

  // Desplazamiento automático hacia arriba cada 1 minuto (60,000 ms)
  useEffect(() => {
    const contenedor = carruselRef.current;
    if (!contenedor) return;

    const intervalo = setInterval(() => {
      const tarjeta = contenedor.querySelector('.tarjeta-momento');
      if (!tarjeta) return;
      const altoTarjeta = tarjeta.offsetHeight + 15; // Alto + gap

      if (contenedor.scrollTop + contenedor.clientHeight >= contenedor.scrollHeight - 10) {
        contenedor.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        contenedor.scrollBy({ top: altoTarjeta, behavior: 'smooth' });
      }
    }, 60000); // 1 minuto exacto

    return () => clearInterval(intervalo);
  }, [textos.length]);

  // Funciones para pasar de foto manualmente hacia arriba o hacia abajo con botones
  const desplazar = (direccion) => {
    const contenedor = carruselRef.current;
    if (!contenedor) return;
    const tarjeta = contenedor.querySelector('.tarjeta-momento');
    if (!tarjeta) return;
    const altoTarjeta = tarjeta.offsetHeight + 15;

    contenedor.scrollBy({ 
      top: direccion === 'arriba' ? -altoTarjeta : altoTarjeta, 
      behavior: 'smooth' 
    });
  };

  if (textos.length === 0) return null;

  return (
    <div className="seccion-album">
      <h3 className="titulo-seccion">{tituloSeccion}</h3>
      
      {/* Contenedor del carrusel en formato vertical */}
      <div className="album-carrusel-vertical" ref={carruselRef}>
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

      {/* Botones de navegación manual hacia arriba y hacia abajo */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '12px' }}>
        <button 
          onClick={() => desplazar('arriba')} 
          style={{ width: '40px', height: '40px', padding: '0', borderRadius: '50%', fontSize: '1.1rem', boxShadow: '0 3px 8px rgba(2,132,199,0.3)' }}
          title="Anterior"
        >
          ▲
        </button>
        <button 
          onClick={() => desplazar('abajo')} 
          style={{ width: '40px', height: '40px', padding: '0', borderRadius: '50%', fontSize: '1.1rem', boxShadow: '0 3px 8px rgba(2,132,199,0.3)' }}
          title="Siguiente"
        >
          ▼
        </button>
      </div>
    </div>
  );
}

export default LineaDeTiempo;