// src/App.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Regalo from './components/Regalo';
import './App.css';

function App() {
  const [datosCliente, setDatosCliente] = useState(null);
  const [claveIngresada, setClaveIngresada] = useState('');
  const [bloqueado, setBloqueado] = useState(true);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  // Detectar si estamos en una ruta de cliente (ej: /jimeygaby o buscando por parámetro)
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clientes"));
        const path = window.location.pathname.replace('/', '').toLowerCase();
        
        let clienteEncontrado = null;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const idDoc = doc.id.toLowerCase();
          // Compara si la URL coincide con el id del documento
          if (path && idDoc === path) {
            clienteEncontrado = data;
          }
        });

        // Si no hay ruta específica, toma el primer cliente por defecto para pruebas
        if (!clienteEncontrado && !querySnapshot.empty) {
          clienteEncontrado = querySnapshot.docs[0].data();
        }

        setDatosCliente(clienteEncontrado);
      } catch (err) {
        console.error("Error al cargar Firebase:", err);
      } finally {
        setCargando(false);
      }
    };

    fetchDatos();
  }, []);

  const verificarClave = (e) => {
    e.preventDefault();
    if (!datosCliente) return;

    // Compara la clave ingresada con la fecha secreta de Firebase
    if (claveIngresada.trim() === datosCliente.fechaSecreta) {
      setBloqueado(false);
      setError('');
    } else {
      setError('❌ Fecha incorrecta, prueba otra vez mi amor.');
    }
  };

  if (cargando) {
    return (
      <div className="app-container">
        <p style={{ color: '#d90429', fontWeight: 600 }}>Cargando sorpresa romántica... 💖</p>
      </div>
    );
  }

  if (!datosCliente) {
    return (
      <div className="app-container">
        <div className="pantalla-bloqueo">
          <p style={{ color: '#d90429' }}>No se encontró el regalo para este enlace. 😢</p>
        </div>
      </div>
    );
  }

  // Textos configurables desde Firebase (con opción por defecto si no los escribiste)
  const tituloBloqueo = datosCliente.tituloBloqueo || `Un regalo especial para ${datosCliente.nombreCliente || 'ti'} 🎁`;
  const mensajeBloqueo = datosCliente.mensajeBloqueo || "Para descubrir tu sorpresa, ingresa la fecha especial (Día-Mes):";

  return (
    <div className="app-container">
      {bloqueado ? (
        <div className="pantalla-bloqueo">
          <h2>{tituloBloqueo}</h2>
          <p style={{ color: '#6c757d', fontSize: '0.95rem', margin: '15px 0' }}>
            {mensajeBloqueo}
          </p>
          <form onSubmit={verificarClave}>
            <input 
              type="text" 
              placeholder="Ej: 14-02" 
              value={claveIngresada}
              onChange={(e) => setClaveIngresada(e.target.value)}
            />
            <br />
            <button type="submit">Desbloquear 🔓</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <Regalo datos={datosCliente} />
      )}
    </div>
  );
}

export default App;