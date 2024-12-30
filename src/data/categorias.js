// src/data/categorias.js
import { FaCogs, FaUserTie, FaHandsHelping } from "react-icons/fa";

const categorias = [
  {
    id: 1,
    titulo: "Jefe de UTP",
    descripcion: "Fundamental para garantizar la calidad educativa y supervisar el trabajo de los docentes.",
    icono: <FaCogs />
  },
  {
    id: 2,
    titulo: "Docente",
    descripcion: "Fundamental para aplicar métodos innovadores de enseñanza y adaptados a las necesidades de los alumnos.",
    icono: <FaUserTie />
  },
  {
    id: 3,
    titulo: "Profesor Jefe",
    descripcion: "Fundamental para brindar un acompañamiento cercano y pedagógico para el desarrollo personal y académico.",
    icono: <FaHandsHelping />
  },
];

export default categorias;
