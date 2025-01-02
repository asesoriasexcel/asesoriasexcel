const productosDestacados = [
  {
    id: 1,
    nombre: "Producto 1",
    descripcion:
      "Descubre cómo podemos ayudarte a llevar tus productos al siguiente nivel con soluciones únicas y efectivas. Descubre cómo podemos ayudarte a llevar tus productos al siguiente nivel con soluciones únicas y efectivas. Descubre cómo podemos ayudarte a llevar tus productos al siguiente nivel con soluciones únicas y efectivas.",
    precio: 10000,
    imagen: require('../images/imagen1.png'), // Ruta relativa a la imagen
    video_si: true, // Indica si tiene video (booleano)
    video_link: "https://www.youtube.com/watch?v=a9VTSJEzqh4", // Link del video
    area: "Educación", // Área, por ejemplo, Educación
    cargo: "Jefe de UTP", // Cargo, por ejemplo, Jefe de UTP
    profesion: "Profesor de Lenguaje", // Profesión, por ejemplo, Profesor de Lenguaje
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion:
      "Descubre cómo podemos ayudarte a llevar tus productos al siguiente nivel con soluciones únicas y efectivas. Descubre cómo podemos ayudarte a llevar tus productos al siguiente nivel con soluciones únicas y efectivas. Descubre cómo podemos ayudarte a llevar tus productos al siguiente nivel con soluciones únicas y efectivas.",
    precio: 15000,
    imagen: require('../images/imagen1.png'),
    video_si: true, // Indica si tiene video (booleano)
    video_link: "https://www.youtube.com/watch?v=a9VTSJEzqh4", // No tiene video, así que está vacío
    area: "Tecnología", // Área, por ejemplo, Tecnología
    cargo: "Ingeniero de Software", // Cargo, por ejemplo, Ingeniero de Software
    profesion: "Desarrollador Web", // Profesión, por ejemplo, Desarrollador Web
  },
  {
    id: 3,
    nombre: "Producto 3",
    descripcion:
      "Descubre cómo podemos ayudarte a llevar tus productos al siguiente nivel con soluciones únicas y efectivas. Descubre cómo podemos ayudarte a llevar tus productos al siguiente nivel con soluciones únicas y efectivas. Descubre cómo podemos ayudarte a llevar tus productos al siguiente nivel con soluciones únicas y efectivas.",
    precio: 20000,
    imagen: require('../images/imagen1.png'),
    video_si: true, // Indica si tiene video (booleano)
    video_link: "https://www.youtube.com/watch?v=a9VTSJEzqh4", // Link del video
    area: "Salud", // Área, por ejemplo, Salud
    cargo: "Médico General", // Cargo, por ejemplo, Médico General
    profesion: "Doctor en Medicina", // Profesión, por ejemplo, Doctor en Medicina
  },
];

export default productosDestacados;
