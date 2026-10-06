// src/components/LineaDeTiempo.jsx
import React from 'react';

function LineaDeTiempo({ datos }) {
  const textos = datos.textosHistoria || [];
  const fotos = datos.fotosHistoria || [];

  if (textos.length === 0) return null;

  return (
    <div className="seccion-album">
      <h3 className="titulo-seccion">Nuestra Historia ❤️</h3>
      
      {/* Contenedor tipo carrusel vertical de momentos */}
      <div className="album-carrusel-vertical">
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
            <span className="indicador-pagina">{index + 1} / {textos.length}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LineaDeTiempo;