// src/components/Candado.jsx
import { useState } from 'react';
import { datosCliente } from '../data/cliente';

function Candado({ alDesbloquear }) {
  const [respuesta, setRespuesta] = useState('');
  const [error, setError] = useState(false);

  const verificarRespuesta = () => {
    // Compara lo que escribe el usuario con la fecha guardada en cliente.js
    if (respuesta === datosCliente.fechaAniversario) {
      setError(false);
      alDesbloquear(); // Si es correcto, le avisa a la App que abra el regalo
    } else {
      setError(true); // Si falla, muestra el error
    }
  };

  return (
    <div className="pantalla-bloqueo">
      <h2>Un regalo especial 🎁</h2>
      <p>Para descubrir tu sorpresa, ingresa la fecha de nuestro aniversario (Día-Mes):</p>
      
      <input 
        type="text" 
        placeholder="Ej: 14-02" 
        value={respuesta}
        onChange={(evento) => setRespuesta(evento.target.value)}
      />
      
      <button onClick={verificarRespuesta}>Desbloquear</button>
      
      {error && <p className="error">{datosCliente.mensajeError}</p>}
    </div>
  );
}

export default Candado;