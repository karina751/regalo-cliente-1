// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/config';

import Candado from './components/Candado';
import Regalo from './components/Regalo';
import './App.css';

// Este componente se encarga de buscar al cliente en Firebase
function VistaCliente() {
  const { idCliente } = useParams(); // Esto lee "juan-y-maria" de la URL
  const [datosFirebase, setDatosFirebase] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [desbloqueado, setDesbloqueado] = useState(false);

  useEffect(() => {
    // Función que va a Firebase a buscar el documento
    const buscarCliente = async () => {
      try {
        const referencia = doc(db, "clientes", idCliente);
        const documento = await getDoc(referencia);
        
        if (documento.exists()) {
          setDatosFirebase(documento.data()); // Guardamos los datos que encontramos
        } else {
          setDatosFirebase(null); // No existe el cliente
        }
      } catch (error) {
        console.error("Error al buscar cliente:", error);
      }
      setCargando(false);
    };

    buscarCliente();
  }, [idCliente]);

  // Mientras busca en internet, mostramos esto:
  if (cargando) {
    return <div className="pantalla-bloqueo"><h2>Buscando tu sorpresa... 🎁</h2></div>;
  }

  // Si escribieron mal el enlace (ej: /pedro-y-ana y no existe en base de datos)
  if (!datosFirebase) {
    return <div className="pantalla-bloqueo"><h2>Mmm... no encontramos este regalo.</h2><p>Revisa que el enlace sea correcto.</p></div>;
  }

  // Si todo está bien y ya pusieron la clave
  if (desbloqueado) {
    // Le pasamos los datos reales de Firebase al Regalo
    return <Regalo datos={datosFirebase} />;
  }

  // Si encontraron al cliente pero falta la clave, mostramos el candado
  return <Candado datos={datosFirebase} alDesbloquear={() => setDesbloqueado(true)} />;
}

// Esta es la App principal que maneja las rutas
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Esto atrapa cualquier texto después de la barra (ej: /juan-y-maria) */}
        <Route path="/:idCliente" element={<VistaCliente />} />
        
        {/* Si entran a la página principal sin cliente, mostramos un aviso */}
        <Route path="/" element={
          <div className="pantalla-bloqueo">
            <h2>¡Hola! 👋</h2>
            <p>Debes agregar el nombre del cliente en el enlace.</p>
            <p>Ejemplo: tupagina.com/juan-y-maria</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;