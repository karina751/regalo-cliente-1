// src/components/Candado.jsx
import { useState } from 'react';

// Ahora recibimos los "datos" mágicos desde Firebase
function Candado({ datos, alDesbloquear }) {
  const [respuesta, setRespuesta] = useState('');
  const [error, setError] = useState(false);

  const verificarRespuesta = () => {
    // Comparamos con la fecha que guardamos en tu base de datos
    if (respuesta === datos.fechaAniversario) {
      setError(false);
      alDesbloquear(); 
    } else {
      setError(true); 
    }
  };

  return (
    <div className="pantalla-bloqueo">
      <h2>Un regalo especial para {datos.nombrePareja} 🎁</h2>
      <p>Para descubrir tu sorpresa, ingresa la fecha de nuestro aniversario (Día-Mes):</p>
      
      <input 
        type="text" 
        placeholder="Ej: 14-02" 
        value={respuesta}
        onChange={(evento) => setRespuesta(evento.target.value)}
      />
      
      <button onClick={verificarRespuesta}>Desbloquear</button>
      
      {error && <p className="error">Mmm... esa no es la fecha. ¡Intenta de nuevo!</p>}
    </div>
  );
}

export default Candado;