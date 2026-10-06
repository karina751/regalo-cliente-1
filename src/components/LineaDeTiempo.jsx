// src/components/LineaDeTiempo.jsx
import { datosCliente } from '../data/cliente';

function LineaDeTiempo() {
  return (
    <div className="seccion-timeline">
      <h3 className="titulo-seccion">Nuestra historia</h3>
      
      <div className="timeline-contenedor">
        {/* Recorremos cada recuerdo y lo dibujamos */}
        {datosCliente.recuerdos.map((recuerdo) => (
          <div key={recuerdo.id} className="timeline-item">
            {/* El puntito decorativo */}
            <div className="timeline-punto"></div>
            
            {/* El contenido de la foto */}
            <div className="timeline-contenido">
              <span className="timeline-fecha">{recuerdo.fecha}</span>
              <h4>{recuerdo.titulo}</h4>
              <img src={recuerdo.imagen} alt={recuerdo.titulo} className="timeline-foto" />
              <p>{recuerdo.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LineaDeTiempo;