import React, { useState } from "react";
import ViewTask from "../pages/ViewTask";
import { logCardStatus } from "../tools/triggers_history.js";
import PocketBase from "pocketbase";
import { use } from "framer-motion/client";

function TaskItem(props) {
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);
  const pb = new PocketBase('https://roomlist.pockethost.io');
  const toggleViewTaskModal = () => {
    setIsViewTaskModalOpen(!isViewTaskModalOpen);
  };

  // Desestructuración de los props para acceder a los parámetros
  const { taskid, users, title, descripcion, progreso, etiqueta, fechaInicio, fechaFin, user_creador, roomCode} = props;

  const handleStatusChange = async (newStatus) => {
    try {
      console.log("Detecto el cambio");
    } catch (error) {
      console.error('Error al actualizar el estado de la tarjeta:', error);
    }
  };

  const getStyles = (etiqueta) => {
    switch (etiqueta) {
      case "Fácil":
        return { backgroundColor: "#36b63c", textColor: "#E0F7FA" };
      case "Medio":
        return { backgroundColor: "#e6ad1d", textColor: "#6A1B9A" };
      case "Difícil":
        return { backgroundColor: "#C62828", textColor: "#FFEBEE" };
      default:
        return { backgroundColor: "#cccccc", textColor: "#000000" };
    }
  };

  const { backgroundColor, textColor } = getStyles(etiqueta);

  return (
      <>
        <button
            onClick={toggleViewTaskModal}
            className="bg-white bg-opacity-90 shadow-md rounded-lg w-full p-4 flex flex-col items-start text-left transition-all duration-200 hover:bg-opacity-100 hover:shadow-lg"
        >
          <span className="text-gray-400 font-semibold text-md">{user_creador}</span>
          <p className="text-gray-700 font-bold text-xl">{title}</p>

          {/* Renderizar la etiqueta solo si existe */}
          {etiqueta && (
              <span
                  className="rounded-full text-sm font-semibold px-3 py-[1px]"
                  style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                  }}
              >
          {etiqueta}
        </span>
          )}

        </button>

        {/* Modal para ver la tarea en detalle */}
        {isViewTaskModalOpen && (
            <ViewTask
                toggle={toggleViewTaskModal}
                taskid={taskid}
                users={users}
                title={title}
                descripcion={descripcion}
                progreso={progreso}
                etiqueta={etiqueta}
                fechaInicio={fechaInicio}
                fechaFin={fechaFin}
                user_creador={user_creador}
                onStatusChange={handleStatusChange}
                roomCode={roomCode}
            />
        )}
      </>

  );
}

export default TaskItem;