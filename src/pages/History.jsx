import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import PocketBase from 'pocketbase';

// Datos de ejemplo
const activityData = [
  {
    id: 1,
    user: { name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
    action: "agregó",
    task: "Crear esquemas para un nuevo proyecto",
    timestamp: "Hace 2 minutos",
  },
  {
    id: 2,
    user: { name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
    action: "completó",
    task: "Revisar los comentarios de los clientes",
    timestamp: "Hace 1 hora",
  },
  {
    id: 3,
    user: { name: "Charlie", avatar: "/placeholder.svg?height=32&width=32" },
    action: "modificó",
    task: "Actualizar el cronograma del proyecto",
    timestamp: "Hace 3 horas",
  },
  {
    id: 4,
    user: { name: "Diana", avatar: "/placeholder.svg?height=32&width=32" },
    action: "agregó",
    task: "Programar reunión de equipo",
    timestamp: "Ayer",
  },
  {
    id: 5,
    user: { name: "Ethan", avatar: "/placeholder.svg?height=32&width=32" },
    action: "completó",
    task: "Preparar diapositivas de presentación",
    timestamp: "Hace 2 días",
  },
  {
    id: 6,
    user: { name: "Evan", avatar: "/placeholder.svg?height=32&width=32" },
    action: "modificó",
    task: "Actualizar el organigrama del proyecto",
    timestamp: "Hace 2 horas",
  },
  {
    id: 7,
    user: { name: "Andy", avatar: "/placeholder.svg?height=32&width=32" },
    action: "agregó",
    task: "Realizar prueba de conexión",
    timestamp: "Hace 2 horas",
  },
]

const taskVariants= {
  offscreen: {
    x: 200, //coordenada inicial del elemento en x
  },
  onscreen: (i)=>({ //iteracion de i (valor de item.id) 1 en 1
    x: 0, //coordenada final del elemento en x
    rotate: 0,
    transition: {
      type: "spring", //tipo de transición
      bounce: 0.4, //valor de rebote en la animacion
      duration: 0.8, //duracion de la animacion
      delay: i <= 4 ? i * 0.12: 0,//delay asignado a los primeros 4 elementos de acuerdo al valor de i  
    },
  }),
}

export default function History() {
  const pb = new PocketBase('https://roomlist.pockethost.io');
  const navigate = useNavigate();

  const [filter, setFilter] = useState("Toda la actividad")

    // Comprobar si el token está en el localStorage al cargar la página si no, se manda a login
    useEffect(() => {
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        pb.authStore.loadFromCookie(storedToken);
        if (!pb.authStore.isValid) {
          navigate("/");
        }
      }
    }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Historial de Actividades</h1>
        <DropdownMenu filter={filter} setFilter={setFilter} />
      </header>

      {/* Contenedor para las tareas con scroll */}
      <motion.div className="max-h-80 overflow-y-auto overflow-x-hidden  space-y-4">
      
        <ul className="space-y-4">
          {activityData.map((item) => (
            <motion.li

            /* Animacion de cada tarea dentro del historial */
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.4 }}
            custom={item.id} //Se envia valor de item.id para configurar un retraso en los primeros elementos
            variants={taskVariants}
            /* Fin de animacion */

            key={item.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-md transition-colors">
              <Avatar src={item.user.avatar} alt={item.user.name} fallback={item.user.name.charAt(0)} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {item.user.name}{" "}
                  <span className="font-normal text-gray-500">{item.action} la tarea:</span>
                </p>
                <p className="text-sm text-gray-500 truncate">{item.task}</p>
              </div>
              <div className="flex items-center">
                {item.action === "agregó" && (
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
                {item.action === "completó" && (
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {item.action === "modificó" && (
                  <svg className="h-5 w-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v4h16V4m0 0l-8 8-8-8m16 16V8m0 0L12 12M4 8v12h16" />
                  </svg>
                )}
                <span className="text-xs text-gray-400">{item.timestamp}</span>
              </div>
            </motion.li>
          ))}
        </ul>

      </motion.div> {/* Contenedor para las tareas con scroll */}
      
    </div>
  )
}


// Componentes auxiliares
function Avatar({ src, alt, fallback }) {
    return (
      <div className="relative h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {src ? (
          <img src={src} alt={alt} className="object-cover h-full w-full" />
        ) : (
          <span className="text-gray-500">{fallback}</span>
        )}
      </div>
    )
  }
  
  function DropdownMenu({ filter, setFilter }) {
    const [isOpen, setIsOpen] = useState(false)
  
    const toggleDropdown = () => setIsOpen(!isOpen)
  
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
              onClick={() => {
                setFilter("Toda la actividad")
                setIsOpen(false)
              }}
            >
              Toda la actividad
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setFilter("Tareas añadidas")
                setIsOpen(false)
              }}
            >
              Tareas añadidas
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setFilter("Tareas completadas")
                setIsOpen(false)
              }}
            >
              Tareas completadas
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setFilter("Tareas modificadas")
                setIsOpen(false)
              }}
            >
              Tareas modificadas
            </li>
          </ul>
        )}
      </div>
    )
  }