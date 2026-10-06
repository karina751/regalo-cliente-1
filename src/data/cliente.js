// src/data/cliente.js
export const datosCliente = {
  nombrePareja: "Juan y María",
  fechaAniversario: "26-03", 
  mensajeError: "Mmm... esa no es la fecha. ¡Intenta de nuevo!",
  mensajeBienvenida: "¡Feliz Aniversario! ❤️",
  mensajeDedicatoria: "Gracias por cada momento juntos. Dale play a nuestra canción...",
  urlCancionSpotify: "https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?utm_source=generator",
  
  recuerdos: [
    {
      id: 1,
      fecha: "14 de Febrero de 2023",
      titulo: "Nuestra primera cita",
      texto: "Los nervios que tenía no te los imaginas. Ese café duró 4 horas.",
      imagen: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=80"
    },
    {
      id: 2,
      fecha: "12 de Diciembre de 2023",
      titulo: "El primer viaje juntos",
      texto: "Nos perdimos dos veces pero fue el mejor fin de semana.",
      imagen: "https://images.unsplash.com/photo-1476900543704-4312b78632f8?w=500&q=80"
    },
    {
      id: 3,
      fecha: "Hoy",
      titulo: "Y los que faltan...",
      texto: "Sigo eligiéndote todos los días. Te amo.",
      imagen: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80"
    }
  ],

  // NUEVO: El video final
  mensajeVideo: "Para terminar, dale play. Tengo algo más que decirte...",
  // Cuando el cliente te pase su video, puedes subirlo a Firebase, Google Drive (con link directo) 
  // o Imgur, y pegar el link terminado en .mp4 aquí:
  urlVideo: "https://www.w3schools.com/html/mov_bbb.mp4" 
};