// src/App.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebase/config';
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
        const path = window.location.pathname.replace('/', '').toLowerCase().trim();
        
        let clienteEncontrado = null;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const idDoc = doc.id.toLowerCase().trim();
          
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

  // Control para permitir solo números, un guion y máximo 4 caracteres
  const manejarCambioInput = (e) => {
    let valor = e.target.value;
    
    // Permitir solo números y el símbolo guion (-)
    valor = valor.replace(/[^0-9-]/g, '');

    // Limitar estrictamente a 4 caracteres (ej: DD-MM)
    if (valor.length <= 5) {
      setClaveIngresada(valor);
    }
  };

  const verificarClave = (e) => {
    e.preventDefault();
    if (!datosCliente) return;

    const fechaReal = String(
      datosCliente.fechaSecreta || 
      datosCliente.fecha || 
      datosCliente.clave || 
      datosCliente.password || ''
    ).trim();

    const claveEscrita = String(claveIngresada).trim();

    if (claveEscrita === fechaReal) {
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

  const limpiarTextoFirebase = (texto, porDefecto) => {
    if (!texto) return porDefecto;
    let limpio = String(texto).trim();
    limpio = limpio.replace(/^["']+|["']+$/g, '').trim();
    return limpio || porDefecto;
  };

  const nombrePareja = datosCliente.nombrePareja || datosCliente.nombreCliente || 'ti';
  const tituloPorDefecto = `Un regalo especial para ${nombrePareja} 🎁`;
  const mensajePorDefecto = "Para descubrir tu sorpresa, ingresa la fecha especial (Día-Mes):";

  const tituloBloqueo = limpiarTextoFirebase(datosCliente.tituloBloqueo || datosCliente.titulo, tituloPorDefecto);
  const mensajeBloqueo = limpiarTextoFirebase(datosCliente.mensajeBloqueo || datosCliente.mensaje, mensajePorDefecto);

  return (
    <div className="app-container">
      {bloqueado ? (
        <div className="pantalla-bloqueo">
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#d90429', fontSize: '1.4rem', marginBottom: '10px' }}>
            {tituloBloqueo}
          </h2>
          <p style={{ color: '#6c757d', fontSize: '0.95rem', margin: '15px 0' }}>
            {mensajeBloqueo}
          </p>
          <form onSubmit={verificarClave}>
            <input 
              type="text" 
              placeholder="Ej: 27-10" 
              maxLength="4"
              value={claveIngresada}
              onChange={manejarCambioInput}
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