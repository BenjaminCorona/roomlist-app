import React, { useState } from "react";
import { Router, Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import "./App.css";
import LoginRegister from "./pages/LoginRegister";
import CreateJoinRoom from "./pages/CreateJoinRoom";
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

    <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LoginRegister/>} />
          <Route path="/create-join-room" element={<CreateJoinRoom />} />
          <Route path="/history" element={<History/>} />
          <Route path="/profile-settings" element={<ProfileSettings/>}/>
          <Route path="/create-new-room" element={<CreateNewRoom/>}/>
          <Route path="/room-list" element={<RoomList/>}/>
        </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
