// src/components/LineaDeTiempo.jsx
import React, { useEffect, useRef } from 'react';

function LineaDeTiempo({ datos }) {
  const textos = datos.textosHistoria || [];
  // Aseguramos que lea tanto 'fotosHistoria' como 'fotos' por si acaso
  const fotos = datos.fotosHistoria || datos.fotos || [];
  const tituloSeccion = datos.tituloHistoria || "Nuestra Historia ❤️";
  
  const carruselRef = useRef(null);

  // Efecto para el desplazamiento automático en bucle
  useEffect(() => {
    const contenedor = carruselRef.current;
    if (!contenedor) return;

    const intervalo = setInterval(() => {
      const tarjeta = contenedor.querySelector('.tarjeta-momento');
      if (!tarjeta) return;
      const anchoTarjeta = tarjeta.offsetWidth + 20;

      if (contenedor.scrollLeft + contenedor.clientWidth >= contenedor.scrollWidth - 10) {
        contenedor.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        contenedor.scrollBy({ left: anchoTarjeta, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(intervalo);
  }, [textos.length]);

  if (textos.length === 0) return null;

  return (
    <div className="seccion-album">
      <h3 className="titulo-seccion">{tituloSeccion}</h3>
      
      <div className="album-carrusel-horizontal" ref={carruselRef}>
        {textos.map((parrafo, index) => (
          <div key={index} className="tarjeta-momento">
            {/* Validamos que exista la foto y no esté vacía */}
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
    </div>
  );
}

export default LineaDeTiempo;