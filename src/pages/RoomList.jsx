import { useState } from 'react'
import { Bell, Inbox, Calendar, Tag, ChevronDown, Plus, Search, CheckCircle2 } from 'lucide-react'

export default function RoomList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Hacer 30 min de yoga 🧘', time: '7:30 am', completed: false, project: 'Mis Proyectos' },
    { id: 2, title: 'Cita médica', time: '10:00 am', completed: false, project: 'Mis Proyectos' },
    { id: 3, title: 'Comprar pan', time: '', completed: false, project: 'Mis Proyectos' },
    { id: 4, title: 'Planificar sesiones de investigación de usuarios', time: '2:00 pm', completed: false, project: 'Equipo', calendar: true },
    { id: 5, title: 'Enviar sugerencias sobre el diseño de Ana', time: '', completed: true, project: 'Equipo' },
    { id: 6, title: 'Reunión general', time: '', completed: false, project: 'Equipo' },
  ])

  const projects = [
    { name: 'Fitness', color: 'text-red-500' },
    { name: 'Supermercado', color: 'text-yellow-500' },
    { name: 'Citas', color: 'text-blue-500' },
  ]

  const teamProjects = [
    { name: 'Nueva marca', color: 'text-yellow-500' },
    { name: 'Actualización del sitio', color: 'text-purple-500' },
    { name: 'Plan de desarrollo de producto', color: 'text-green-500' },
    { name: 'Agenda de reuniones', color: 'text-pink-500' },
  ]

  return (
    <div className="flex h-[600px] max-w-4xl mx-auto border rounded-lg overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-8 w-8 mr-2 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-white">D</span>
            </div>
            <span className="font-semibold">Denise</span>
          </div>
          <ChevronDown size={20} />
        </div>
        <button className="w-full mb-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center">
          <Plus size={16} className="mr-2" /> Añadir tarea
        </button>
        <div className="space-y-2">
          <button className="w-full justify-start py-2 px-4 rounded flex items-center hover:bg-gray-100">
            <Search size={16} className="mr-2" /> Buscador
          </button>
          <button className="w-full justify-start py-2 px-4 rounded flex items-center hover:bg-gray-100">
            <Inbox size={16} className="mr-2" /> Bandeja de entrada
          </button>
          <button className="w-full justify-start py-2 px-4 rounded flex items-center bg-orange-100 hover:bg-orange-200">
            <Calendar size={16} className="mr-2" /> Hoy
          </button>
          <button className="w-full justify-start py-2 px-4 rounded flex items-center hover:bg-gray-100">
            <Calendar size={16} className="mr-2" /> Próximo
          </button>
          <button className="w-full justify-start py-2 px-4 rounded flex items-center hover:bg-gray-100">
            <Tag size={16} className="mr-2" /> Filtros y Etiquetas
          </button>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Mis Proyectos</h3>
          <ul className="space-y-1">
            {projects.map((project, index) => (
              <li key={index} className={`flex items-center ${project.color}`}>
                <span className="mr-2">#</span>
                {project.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Equipo</h3>
          <ul className="space-y-1">
            {teamProjects.map((project, index) => (
              <li key={index} className={`flex items-center ${project.color}`}>
                <span className="mr-2">#</span>
                {project.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Hoy</h1>
        <div className="space-y-6">
          {['Mis Proyectos', 'Equipo'].map((section) => (
            <div key={section}>
              <h2 className="text-lg font-semibold mb-2">{section}</h2>
              <ul className="space-y-2">
                {tasks
                  .filter(task => task.project === section)
                  .map((task) => (
                    <li key={task.id} className="flex items-center">
                      <button className="rounded-full p-0 mr-2 flex items-center justify-center">
                        <CheckCircle2 size={20} className={task.completed ? "text-red-500" : "text-gray-300"} />
                      </button>
                      <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
                      {task.time && (
                        <span className="ml-2 text-sm text-green-600 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {task.time}
                        </span>
                      )}
                      {task.calendar && (
                        <span className="ml-2 text-sm text-gray-500">Calendario</span>
                      )}
                    </li>
                  ))}
                <li>
                  <button className="text-red-500 py-2 px-4 rounded flex items-center">
                    <Plus size={16} className="mr-2" /> Añadir tarea
                  </button>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
