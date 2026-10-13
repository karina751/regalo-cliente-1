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

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clientes"));
        const path = window.location.pathname.replace('/', '').toLowerCase();
        
        let clienteEncontrado = null;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const idDoc = doc.id.toLowerCase();
          if (path && idDoc === path) {
            clienteEncontrado = data;
          }
        });

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

    if (claveIngresada.trim() === String(datosCliente.fechaSecreta || '')) {
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

  // Textos flexibles: lee de Firebase o usa los predeterminados
  const tituloBloqueo = datosCliente.tituloBloqueo || datosCliente.titulo || `Un regalo especial para ${datosCliente.nombreCliente || 'ti'} 🎁`;
  const mensajeBloqueo = datosCliente.mensajeBloqueo || datosCliente.mensaje || "Para descubrir tu sorpresa, ingresa la fecha especial (Día-Mes):";

  return (
    <div className="app-container">
      {bloqueado ? (
        <div className="pantalla-bloqueo">
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#d90429', fontSize: '1.5rem', marginBottom: '10px' }}>
            {tituloBloqueo}
          </h2>
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