import React, { useState } from "react";
import "./App.css";
import LoginRegister from "./pages/LoginRegister";
import CreateJoinRoom from "./pages/CreateJointRoom";
import History from "./pages/History";
import ProfileSettings from "./pages/ProfileSettings";
import CreateNewRoom from "./pages/CreateNewRoom";
import AddNewTask from "./pages/AddNewTask";
import RoomList from "./pages/RoomList";
import ViewTask from "./pages/ViewTask";

function App() {
  // Estado para controlar la visibilidad del modal de AddNewTask
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = useState(false);
  // Estado para controlar la visibilidad del modal de ViewTask
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);

  // Función para abrir o cerrar el modal de AddNewTask
  const toggleAddNewTaskModal = () => {
    setIsAddNewTaskModalOpen(!isAddNewTaskModalOpen);
  };

  // Función para abrir o cerrar el modal de ViewTask
  const toggleViewTaskModal = () => {
    setIsViewTaskModalOpen(!isViewTaskModalOpen);
  };

  return (
    <>
      <span className="text-xl font-bold">App Hijin</span>
      <br />
      Componente de la aplicación (En este componente se tendrán que agregar
      todas las pantallas las cuales, por medio de validaciones, se mostrarán)
      <br />
      <span className="text-xl font-bold">Login / Register page</span>
      <LoginRegister />
      <br />
      <span className="text-xl font-bold">Create - Join Room</span>
      <CreateJoinRoom />
      <br />
      <span className="text-xl font-bold">Create new Room</span>
      <CreateNewRoom />
      <br />
      <span className="text-xl font-bold">RoomList</span>
      <RoomList />
      <br />
      <span className="text-xl font-bold">Menu / Profile</span>
      <ProfileSettings />
      <br />
      <span className="text-xl font-bold">History</span>
      <History />
      <br />
      <span className="text-xl font-bold">Add New Task</span>
      <button
        className="bg-green-500 rounded-lg"
        onClick={toggleAddNewTaskModal}
        type="button"
      >
        Abrir modal
      </button>
      <br />
      {/* Renderizar el modal de AddNewTask si isAddNewTaskModalOpen es true */}
      {isAddNewTaskModalOpen && (
        <div className="modal">
          <AddNewTask />
          <button
            onClick={toggleAddNewTaskModal}
            className="bg-red-500 text-white rounded-lg"
          >
            Cerrar modal
          </button>
        </div>
      )}
      <br />
      <span className="text-xl font-bold">View Task</span>
      <button
        className="bg-blue-500 rounded-lg"
        onClick={toggleViewTaskModal}
        type="button"
      >
        Abrir modal
      </button>
      <br />
      {/* Renderizar el modal de ViewTask si isViewTaskModalOpen es true */}
      {isViewTaskModalOpen && (
        <div className="modal">
          <ViewTask />
          <button
            onClick={toggleViewTaskModal}
            className="bg-red-500 text-white rounded-lg"
          >
            Cerrar modal
          </button>
        </div>
      )}
    </>
  );
}

export default App;
