// src/components/LineaDeTiempo.jsx

function LineaDeTiempo({ datos }) {
  const textos = datos.textosHistoria || [];
  const fotos = datos.fotosHistoria || [];

  if (textos.length === 0) return null;

  return (
    <div className="seccion-album">
      <h3 className="titulo-seccion">Nuestra Historia ❤️</h3>
      
      <div className="album-contenedor">
        {textos.map((parrafo, index) => (
          <div key={index} className="tarjeta-recuerdo">
            {fotos[index] && fotos[index].trim() !== "" && (
              <div className="foto-recuerdo-wrapper">
                <img 
                  src={fotos[index]} 
                  alt={`Recuerdo ${index + 1}`} 
                  className="foto-recuerdo"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            <p className="texto-recuerdo">{parrafo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LineaDeTiempo;