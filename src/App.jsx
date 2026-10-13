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
          
          // Si la URL coincide con el nombre del documento en Firebase (ej: /Jime-y-Gaby)
          if (path && idDoc === path) {
            clienteEncontrado = data;
          }
        });

        // Si no hay ruta en la URL, busca por defecto o agarra el primer cliente
        if (!clienteEncontrado && !querySnapshot.empty) {
          clienteEncontrado = querySnapshot.docs[0].data();
        }

        console.log("Cliente cargado desde Firebase:", clienteEncontrado);
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

    if (String(claveIngresada).trim() === String(datosCliente.fechaSecreta || '').trim()) {
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

  // Función infalible para limpiar comillas dobles o simples extras que se guarden en Firebase
  const limpiarTextoFirebase = (texto, porDefecto) => {
    if (!texto) return porDefecto;
    let limpio = String(texto).trim();
    // Quita comillas repetidas al inicio y al final si las hubiera
    limpio = limpio.replace(/^["']+|["']+$/g, '').trim();
    return limpio || porDefecto;
  };

  const nombrePareja = datosCliente.nombrePareja || datosCliente.nombreCliente || 'ti';
  const tituloPorDefecto = `Un regalo especial para ${nombrePareja} 🎁`;
  const mensajePorDefecto = "Para descubrir tu sorpresa, ingresa la fecha especial (Día-Mes):";

  // Lee dinámicamente de Firebase y limpia los textos
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