// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// REEMPLAZA ESTE BLOQUE POR EL TUYO:
const firebaseConfig = {
  apiKey: "AIzaSyCbOXxbeeOW-noR_dzjSVALbz7qIwYRkGw",
  authDomain: "regalos-clientes-qr.firebaseapp.com",
  databaseURL: "https://regalos-clientes-qr-default-rtdb.firebaseio.com",
  projectId: "regalos-clientes-qr",
  storageBucket: "regalos-clientes-qr.firebasestorage.app",
  messagingSenderId: "1024901931159",
  appId: "1:1024901931159:web:6e64b301931abc302209d2"
};

// Con esto iniciamos la conexión
const app = initializeApp(firebaseConfig);

// Exportamos "db" (database) para usarla en el resto del proyecto
export const db = getFirestore(app);