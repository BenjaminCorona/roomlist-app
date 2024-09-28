import { useState, useEffect } from "react";
import CardTask from "../components/CardTask";
import TaskItem from "../components/TaskItem";
import UserItemList from "../components/UserItemList";
import AddNewTask from "./AddNewTask";
import "../index.css";
import {
  Bell,
  Inbox,
  Calendar,
  Tag,
  ChevronDown,
  Plus,
  Search,
  CircleAlert,
  Circle,
  CircleCheckBig,
  Home,
  History,
  HistoryIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RoomList() {
  /** 
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Hacer 30 min de yoga 🧘",
      time: "7:30 am",
      completed: false,
      project: "Mis Proyectos",
    },
    {
      id: 2,
      title: "Cita médica",
      time: "10:00 am",
      completed: false,
      project: "Mis Proyectos",
    },
    {
      id: 3,
      title: "Comprar pan",
      time: "",
      completed: false,
      project: "Mis Proyectos",
    },
    {
      id: 4,
      title: "Planificar sesiones de investigación de usuarios",
      time: "2:00 pm",
      completed: false,
      project: "Equipo",
      calendar: true,
    },
    {
      id: 5,
      title: "Enviar sugerencias sobre el diseño de Ana",
      time: "",
      completed: true,
      project: "Equipo",
    },
    {
      id: 6,
      title: "Reunión general",
      time: "",
      completed: false,
      project: "Equipo",
    },
  ]);
  
  const projects = [
    { name: "Fitness", color: "text-red-500" },
    { name: "Supermercado", color: "text-yellow-500" },
    { name: "Citas", color: "text-blue-500" },
  ];

  const teamProjects = [
    { name: "Nueva marca", color: "text-yellow-500" },
    { name: "Actualización del sitio", color: "text-purple-500" },
    { name: "Plan de desarrollo de producto", color: "text-green-500" },
    { name: "Agenda de reuniones", color: "text-pink-500" },
  ];
  */

  // Estado para controlar la visibilidad del modal de AddNewTask
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
  //Funciona para abitrar o cerra el modal de AddNewTask
  const toggleAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(!isAddNewTaskModalOpen);
  };

  // Array de usuarios que se va a mostrar
  const users = ["User1", "User2", "User3", "User4", "User5"];
  const navigate = useNavigate();

  const navigateHistory = () => {
    navigate("/history");
  };

  const navigateProfileSettings = () => {
    navigate("/profile-settings");
  };

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Generar un número aleatorio entre 1 y 14
    const randomNumber = Math.floor(Math.random() * 14) + 1;
    // Actualizar el estado con la ruta de la imagen aleatoria
    setBackgroundImage(`/bg-roomlist/bg${randomNumber}.jpg`);
  }, []);

  return (
    //<div className="flex h-[600px] max-w-6xl mx-auto border rounded-lg overflow-hidden bg-gray-50">
    <div
      className="flex h-screen w-screen mx-auto border rounded-lg overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Fondo dinámico
    >
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <button onClick={navigateProfileSettings} className="w-full ">
          <div className="flex items-center justify-between mb-6 bg-gray-200 px-2 py-2 rounded-full ">
            <div className="flex items-center">
              <div className="h-8 w-8 mr-2 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white">U</span>
              </div>
              <span className="font-semibold text-gray-600">User</span>
            </div>
            <ChevronDown color="#4b5563" size={20} />
          </div>
        </button>

        <button
          onClick={toggleAddNewTaskModal}
          className="w-full mb-4 bg-[#4b5563] hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center"
        >
          <Plus size={16} className="mr-2" /> Añadir tarea
        </button>
        {isAddNewTaskModalOpen && <AddNewTask toggle={toggleAddNewTaskModal} />}
        <div className="space-y-2">
          <button className="w-full justify-start py-2 px-4 rounded flex items-center bg-gray-200 hover:bg-gray-300">
            <Home size={16} className="mr-2" /> Inicio
          </button>
          <button
            onClick={navigateHistory}
            className="w-full justify-start py-2 px-4 rounded flex items-center hover:bg-gray-300"
          >
            <History size={16} className="mr-2" /> Historial
          </button>
          {/** 
          <button className="w-full justify-start py-2 px-4 rounded flex items-center bg-orange-100 hover:bg-orange-200">
            <Calendar size={16} className="mr-2" /> Hoy
          </button>
          <button className="w-full justify-start py-2 px-4 rounded flex items-center hover:bg-gray-100">
            <Calendar size={16} className="mr-2" /> Próximo
          </button>
          <button className="w-full justify-start py-2 px-4 rounded flex items-center hover:bg-gray-100">
            <Tag size={16} className="mr-2" /> Filtros y Etiquetas
          </button>
          */}
        </div>

        {/** 
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
        */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Equipo</h3>
          {/**<ul className="space-y-1">
            {teamProjects.map((project, index) => (
              <li key={index} className={`flex items-center ${project.color}`}>
                <span className="mr-2">#</span>
                {project.name}
              </li>
            ))}
              
          </ul>
          */}
          <div className="h-96 overflow-auto">
            <UserItemList users={users} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl text-gray-100 font-bold mb-4 ml-5">Inicio</h1>
        {/**
        <div className="space-y-6">
          {["Mis Proyectos", "Equipo"].map((section) => (
            <div key={section}>
              <h2 className="text-lg font-semibold mb-2">{section}</h2>
              <ul className="space-y-2">
                {tasks
                  .filter((task) => task.project === section)
                  .map((task) => (
                    <li key={task.id} className="flex items-center">
                      <button className="rounded-full p-0 mr-2 flex items-center justify-center">
                        <CheckCircleCheckBig2
                          size={20}
                          className={
                            task.completed ? "text-red-500" : "text-gray-300"
                          }
                        />
                      </button>
                      <span
                        className={
                          task.completed ? "line-through text-gray-500" : ""
                        }
                      >
                        {task.title}
                      </span>
                      {task.time && (
                        <span className="ml-2 text-sm text-green-600 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {task.time}
                        </span>
                      )}
                      {task.calendar && (
                        <span className="ml-2 text-sm text-gray-500">
                          Calendario
                        </span>
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
        */}
        <div
          id="task-container"
          className="flex items-center w-full h-[80%] justify-evenly"
        >
          <div className="bg-gray-300 bg-opacity-75 shadow-lg flex flex-col items-center p-3 w-[50vw] h-full rounded-xl mr-3 ml-3">
            <span className="font-bold bg-gray-100 text-gray-800 bg-opacity-70 rounded-full px-3 py-0 mb-4 text-md flex items-center justify-center ">
              <CircleCheckBig size={20} className="mr-2" /> To do
            </span>
            <div className=" flex flex-col items-center  w-full h-screen rounded-xl mr-3 ml-3 overflow-auto">
              
              <TaskItem
                title="Desarrollo de la landing page"
                user="Juan Perez"
                etiqueta="Fácil"
              />

              <TaskItem
                title="Revisión de código"
                user="Maria Lopez"
                etiqueta="Medio"
              />
              <TaskItem
                title="Desarrollo de la landing page"
                user="Juan Perez"
                etiqueta="Fácil"
              />

              <TaskItem
                title="Revisión de código"
                user="Maria Lopez"
                etiqueta="Medio"
              />

              <TaskItem
                title="Diseño de logotipo"
                user="Carlos Garcia"
                etiqueta="Difícil"
              />

              <TaskItem
                title="Documentación del proyecto"
                user="Ana Rodriguez"
                etiqueta="Fácil"
              />

              <TaskItem
                title="Presentación a clientes"
                user="David Sanchez"
                etiqueta="Medio"
              />

              <TaskItem
                title="Pruebas de usabilidad"
                user="Sofia Fernandez"
                etiqueta="Difícil"
              />

              <TaskItem
                title="Implementación funciones"
                user="Pedro Martinez"
                etiqueta="Fácil"
              />
            </div>
          </div>

          <div className=" bg-gray-300 bg-opacity-75 shadow-lg flex flex-col items-center p-3 w-[50vw] h-full rounded-xl mr-3 ml-3">
            <span className="font-bold bg-orange-100 text-orange-800 bg-opacity-70 rounded-full px-3 py-0 mb-4 text-md flex items-center justify-center">
              <CircleCheckBig size={20} className="mr-2" /> In progress
            </span>
            <div className=" flex flex-col items-center  w-full h-screen rounded-xl mr-3 ml-3 overflow-auto">
              <TaskItem
                title="Desarrollo de la landing page"
                user="Juan Perez"
                etiqueta="Fácil"
              />

              <TaskItem
                title="Revisión de código"
                user="Maria Lopez"
                etiqueta="Medio"
              />
              <TaskItem
                title="Desarrollo de la landing page"
                user="Juan Perez"
                etiqueta="Fácil"
              />

              <TaskItem
                title="Revisión de código"
                user="Maria Lopez"
                etiqueta="Medio"
              />

              <TaskItem
                title="Diseño de logotipo"
                user="Carlos Garcia"
                etiqueta="Difícil"
              />

              <TaskItem
                title="Documentación del proyecto"
                user="Ana Rodriguez"
                etiqueta="Fácil"
              />

              <TaskItem
                title="Presentación a clientes"
                user="David Sanchez"
                etiqueta="Medio"
              />

              <TaskItem
                title="Pruebas de usabilidad"
                user="Sofia Fernandez"
                etiqueta="Difícil"
              />

              <TaskItem
                title="Implementación funciones"
                user="Pedro Martinez"
                etiqueta="Fácil"
              />
            </div>
          </div>

          <div className="bg-gray-300 bg-opacity-75 shadow-lg flex flex-col items-center p-3 w-[50vw] h-full rounded-xl mr-3 ml-3">
            <span className="font-bold bg-green-100 text-green-800 bg-opacity-70 rounded-full px-3 py-0 mb-4 text-md flex items-center justify-center">
              <CircleCheckBig size={20} className="mr-2" /> Done
            </span>
            <div className=" flex flex-col items-center  w-full h-screen rounded-xl mr-3 ml-3 overflow-auto">
              <TaskItem
                title="Desarrollo de la landing page"
                user="Juan Perez"
                etiqueta="Fácil"
              />

              <TaskItem
                title="Revisión de código"
                user="Maria Lopez"
                etiqueta="Medio"
              />
              <TaskItem
                title="Desarrollo de la landing page"
                user="Juan Perez"
                etiqueta="Fácil"
              />

              <TaskItem
                title="Revisión de código"
                user="Maria Lopez"
                etiqueta="Medio"
              />

              <TaskItem
                title="Diseño de logotipo"
                user="Carlos Garcia"
                etiqueta="Difícil"
              />

              <TaskItem
                title="Documentación del proyecto"
                user="Ana Rodriguez"
                etiqueta="Fácil"
              />

              <TaskItem
                title="Presentación a clientes"
                user="David Sanchez"
                etiqueta="Medio"
              />

              <TaskItem
                title="Pruebas de usabilidad"
                user="Sofia Fernandez"
                etiqueta="Difícil"
              />

              <TaskItem
                title="Implementación funciones"
                user="Pedro Martinez"
                etiqueta="Fácil"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
