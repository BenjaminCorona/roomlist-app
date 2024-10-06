import { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import PocketBase from 'pocketbase';
import swal from "sweetalert";

export default function RoomList() {

  const pb = new PocketBase('https://roomlist.pockethost.io');


  // Estado para controlar la visibilidad del modal de AddNewTask
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
  //Funciona para abitrar o cerra el modal de AddNewTask
  const toggleAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(!isAddNewTaskModalOpen);
  };

  // Array de usuarios que se va a mostrar
  const users = ["User1", "User2", "User3", "User4", "User5"];
  const navigate = useNavigate();

  // Recuperar parámetros de la URL
  const { codigoSala } = useParams();
  const [nombreSala, setNombreSala] = useState("");
  const [idSala, setID] = useState("");
  const [setDescripcionsSala, setDescripcionSala] = useState("");

  const navigateHistory = () => {
    navigate("/history");
  };

  const navigateProfileSettings = () => {
    navigate("/profile-settings");
  };

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Generar un número aleatorio entre 1 y 14
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    // Actualizar el estado con la ruta de la imagen aleatoria
    setBackgroundImage(`/bg-roomlist/bg${randomNumber}.jpg`);
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar la sala en la colección
        const resultList = await pb.collection('Salas').getList(1, 1, {
          filter: `Codigo_Sala="${codigoSala}"`
        });

        if (resultList && resultList.items.length > 0) {
          const sala = resultList.items[0];

          // Recuperar la información requerida
          setID(sala.id);
          setNombreSala(sala.Nombre_Sala);
          setDescripcionSala(sala.Descripcion_Sala);
        } else {
          console.log("No se encontró ninguna sala con el código especificado.");
          navigate("/create-join-room");
        }
      } catch (error) {
        console.error("Error al recuperar la información de la sala:", error);
      }
    };

    fetchData();
  }, [codigoSala, navigate]);

  return (
    <div
      className="flex h-screen w-screen mx-auto overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Fondo dinámico
    >
      {/**Estilos generales para esconder la barra*/}
      <style>
        {`
      .flex.flex-col.items-center.w-full.h-screen.rounded-xl.mr-3.ml-3::-webkit-scrollbar {
        display: none; /* Oculta la barra de desplazamiento para navegadores WebKit */
      }
    `}
      </style>
      {/* Sidebar */}
      <div className="w-64 bg-gray-300 p-4 m-3 rounded-2xl bg-opacity-90">
        <button onClick={navigateProfileSettings} className="w-full ">
          <div className="flex items-center justify-between mb-6 bg-gray-200 hover:bg-gray-300 px-2 py-2 rounded-full ">
            <div className="flex items-center">
              <div className="h-8 w-8 mr-2 bg-gray-700 rounded-full flex items-center justify-center">
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
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Equipo</h3>
          <div className="h-96 overflow-auto">
            <UserItemList users={users} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl bg-[#4b5563] rounded text-gray-100 font-bold mb-4 ml-3 w-auto px-4 py-2 inline-block">
          {nombreSala} <span className="text-lg italic font-thin">#{codigoSala}</span>
        </h1>
        <div
            id="task-container"
            className="flex items-center w-full h-[80%] justify-evenly"
        >
          <div
              className="bg-gray-300 bg-opacity-75 shadow-lg flex flex-col items-center p-3 w-[50vw] h-full rounded-xl mr-3 ml-3">
            <span className="font-bold bg-gray-100 text-gray-800 bg-opacity-70 rounded-full px-3 py-0 mb-4 text-md flex items-center justify-center ">
              <CircleCheckBig size={20} className="mr-2" /> To do
            </span>
            <div className="flex flex-col items-center w-full h-screen rounded-xl mr-3 ml-3 overflow-auto">

            </div>
          </div>

          <div className=" bg-gray-300 bg-opacity-75 shadow-lg flex flex-col items-center p-3 w-[50vw] h-full rounded-xl mr-3 ml-3">
            <span className="font-bold bg-orange-100 text-orange-800 bg-opacity-70 rounded-full px-3 py-0 mb-4 text-md flex items-center justify-center">
              <CircleCheckBig size={20} className="mr-2" /> In progress
            </span>
            <div className=" flex flex-col items-center  w-full h-screen rounded-xl mr-3 ml-3 overflow-auto">

            </div>
          </div>

          <div className="bg-gray-300 bg-opacity-75 shadow-lg flex flex-col items-center p-3 w-[50vw] h-full rounded-xl mr-3 ml-3">
            <span className="font-bold bg-green-100 text-green-800 bg-opacity-70 rounded-full px-3 py-0 mb-4 text-md flex items-center justify-center">
              <CircleCheckBig size={20} className="mr-2" /> Done
            </span>
            <div className=" flex flex-col items-center  w-full h-screen rounded-xl mr-3 ml-3 overflow-auto">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
