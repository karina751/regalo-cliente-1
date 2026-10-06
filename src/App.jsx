// src/App.jsx
import { useState } from 'react';
import Candado from './components/Candado';
import Regalo from './components/Regalo'; // Importamos la nueva pantalla
import './App.css';

function App() {
  const [desbloqueado, setDesbloqueado] = useState(false);

  // Si ya abrieron el candado, mostramos el componente Regalo
  if (desbloqueado) {
    return <Regalo />;
  }

  // Si no, mostramos el candado
  return <Candado alDesbloquear={() => setDesbloqueado(true)} />;
}

export default App;