// src/components/LineaDeTiempo.jsx
import React from 'react';

function LineaDeTiempo({ datos }) {
  const textos = datos.textosHistoria || [];
  const fotos = datos.fotosHistoria || [];
  const tituloSeccion = datos.tituloHistoria || "Nuestra Historia ❤️";

  if (textos.length === 0) return null;

  return (
    <div className="seccion-album">
      <h3 className="titulo-seccion">{tituloSeccion}</h3>
      
      {/* Contenedor carrusel horizontal */}
      <div className="album-carrusel-horizontal">
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