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
        const path = window.location.pathname.replace('/', '').toLowerCase().trim();
        
        let clienteEncontrado = null;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const idDoc = doc.id.toLowerCase().trim();
          
          console.log(`Revisando documento en Firebase: "${doc.id}"`, data); // Diagnóstico

          if (path && idDoc === path) {
            clienteEncontrado = data;
          }
        });

        if (!clienteEncontrado && !querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            if (doc.id.toLowerCase().includes('jime')) {
              clienteEncontrado = doc.data();
            }
          });
          if (!clienteEncontrado) {
            clienteEncontrado = querySnapshot.docs[0].data();
          }
        }

        console.log("Cliente seleccionado finalmente:", clienteEncontrado); // Diagnóstico
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

  // Limpiador seguro de comillas por si Firebase las guarda con comillas adentro
  const limpiarTexto = (texto, porDefecto) => {
    if (!texto) return porDefecto;
    let limpio = String(texto).trim();
    // Si empieza y termina con comillas dobles o simples, las quita
    if ((limpio.startsWith('"') && limpio.endsWith('"')) || (limpio.startsWith("'") && limpio.endsWith("'"))) {
      limpio = limpio.slice(1, -1).trim();
    }
    return limpio || porDefecto;
  };

  const nombrePareja = datosCliente.nombrePareja || datosCliente.nombreCliente || 'ti';
  const tituloPorDefecto = `Un regalo especial para ${nombrePareja} 🎁`;
  const mensajePorDefecto = "Para descubrir tu sorpresa, ingresa la fecha especial (Día-Mes):";

  const tituloBloqueo = limpiarTexto(datosCliente.tituloBloqueo || datosCliente.titulo, tituloPorDefecto);
  const mensajeBloqueo = limpiarTexto(datosCliente.mensajeBloqueo || datosCliente.mensaje, mensajePorDefecto);

  console.log("Título procesado para mostrar:", tituloBloqueo); // Diagnóstico
  console.log("Mensaje procesado para mostrar:", mensajeBloqueo); // Diagnóstico

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