// src/components/LineaDeTiempo.jsx

function LineaDeTiempo({ datos }) {
  // Verificamos si el cliente cargó su historia en Firebase
  const textos = datos.textosHistoria || [];
  const fotos = datos.fotosHistoria || [];

  // Si no cargó nada, no mostramos esta sección
  if (textos.length === 0) return null;

  return (
    <div className="seccion-album">
      <h3 className="titulo-seccion">Nuestra Historia ❤️</h3>
      
      <div className="album-contenedor">
        {textos.map((parrafo, index) => (
          <div key={index} className="tarjeta-recuerdo">
            {/* Si hay una foto para este momento, la mostramos */}
            {fotos[index] && (
              <div className="foto-recuerdo-wrapper">
                <img 
                  src={fotos[index]} 
                  alt={`Recuerdo ${index + 1}`} 
                  className="foto-recuerdo"
                />
              </div>
            )}
            {/* El párrafo de la historia */}
            <p className="texto-recuerdo">{parrafo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LineaDeTiempo;