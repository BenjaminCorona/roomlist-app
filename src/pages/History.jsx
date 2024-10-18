import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PocketBase from 'pocketbase';

// Datos de ejemplo (se usarán inicialmente, pero luego serán reemplazados por los datos de PocketBase)
const initialActivityData = [
  // Tu data de ejemplo aquí...
];

const taskVariants = {
  offscreen: {
    x: 200,
  },
  onscreen: (i) => ({
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
      delay: i <= 4 ? i * 0.12 : 0,
    },
  }),
};

export default function History() {
  const pb = new PocketBase('https://roomlist.pockethost.io');
  const navigate = useNavigate();

  const [filter, setFilter] = useState("Toda la actividad");
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      pb.authStore.loadFromCookie(storedToken);
      if (!pb.authStore.isValid) {
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const storedRoomCode = localStorage.getItem("roomCode");
    if (!storedRoomCode) {
      navigate("/create-join-room");
    }
  }, []);

  // Función para cargar la actividad desde PocketBase solo cuando se selecciona "Toda la actividad"
  const loadActivityData = async () => {
    try {
      const records = await pb.collection('Historial_Cambios').getFullList({
        sort: '-Fecha_Cambio', // Ordenamos por fecha descendente
      });
      
      // Mapeamos los datos obtenidos para ajustar el formato
      const formattedData = records.map((record, index) => ({
        id: record.id,
        task: record.Descripcion_Cambio, // Solo mostramos la descripción de la tarea
        timestamp: new Date(record.Fecha_Cambio).toLocaleString(),
      }));
      
      setActivityData(formattedData);
    } catch (error) {
      console.error("Error al cargar datos de PocketBase:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Historial de Actividades</h1>
        <DropdownMenu filter={filter} setFilter={setFilter} loadActivityData={loadActivityData} />
      </header>

      <motion.div className="max-h-80 overflow-y-auto overflow-x-hidden space-y-4">
        <ul className="space-y-4">
          {activityData.map((item) => (
            <motion.li
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.4 }}
              custom={item.id}
              variants={taskVariants}
              key={item.id}
              className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{item.task}</p>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-400">{item.timestamp}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function DropdownMenu({ filter, setFilter, loadActivityData }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (newFilter) => {
    setFilter(newFilter);
    setIsOpen(false);
    
    // Solo cargamos los datos si se selecciona "Toda la actividad"
    if (newFilter === "Toda la actividad") {
      loadActivityData(); // Cargar la actividad desde PocketBase
    } else {
      // Para los otros filtros, puedes decidir si quieres limpiar o modificar los datos aquí.
    }
  };

  return (
    <div className="relative">
      <button
        className="border px-4 py-2 rounded-md flex items-center"
        onClick={toggleDropdown}
      >
        {filter}
        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute bg-white border mt-2 rounded-md shadow-lg w-48">
          <li
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect("Toda la actividad")}
          >
            Toda la actividad
          </li>
          <li
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect("Tareas añadidas")}
          >
            Tareas añadidas
          </li>
          <li
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect("Tareas completadas")}
          >
            Tareas completadas
          </li>
          <li
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect("Tareas modificadas")}
          >
            Tareas modificadas
          </li>
        </ul>
      )}
    </div>
  );
}
