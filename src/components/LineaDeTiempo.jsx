// src/components/LineaDeTiempo.jsx
import React, { useEffect, useRef } from 'react';

function LineaDeTiempo({ datos }) {
  const textos = datos.textosHistoria || [];
  const fotos = datos.fotosHistoria || [];
  const tituloSeccion = datos.tituloHistoria || "Nuestra Historia ❤️";
  
  const carruselRef = useRef(null);

  // Efecto para el desplazamiento automático en bucle
  useEffect(() => {
    const contenedor = carruselRef.current;
    if (!contenedor) return;

    const intervalo = setInterval(() => {
      // Calculamos el ancho de cada tarjeta con su separación (gap de 20px)
      const tarjeta = contenedor.querySelector('.tarjeta-momento');
      if (!tarjeta) return;
      const anchoTarjeta = tarjeta.offsetWidth + 20;

      // Si llegó al final, vuelve al principio (0), sino avanza una tarjeta
      if (contenedor.scrollLeft + contenedor.clientWidth >= contenedor.scrollWidth - 10) {
        contenedor.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        contenedor.scrollBy({ left: anchoTarjeta, behavior: 'smooth' });
      }
    }, 3000); // Cambia de foto cada 3 segundos

    return () => clearInterval(intervalo);
  }, [textos.length]);

  if (textos.length === 0) return null;

  return (
    <div className="seccion-album">
      <h3 className="titulo-seccion">{tituloSeccion}</h3>
      
      {/* Contenedor carrusel horizontal con referencia automática */}
      <div className="album-carrusel-horizontal" ref={carruselRef}>
        {textos.map((parrafo, index) => (
          <div key={index} className="tarjeta-momento">
            {fotos[index] && fotos[index].trim() !== "" && (
              <div className="foto-recuerdo-wrapper">
                <img 
                  src={fotos[index]} 
                  alt={`Momento ${index + 1}`} 
                  className="foto-recuerdo"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            <p className="texto-recuerdo">{parrafo}</p>
            <span className="indicador-pagina">Recuerdo {index + 1} de {textos.length}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LineaDeTiempo;