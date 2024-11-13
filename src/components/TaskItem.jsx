import React, { useState } from "react";
import ViewTask from "../pages/ViewTask";

function TaskItem(props) {
  // Estado para controlar la visibilidad del modal de ViewTask
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);

  // Función para abrir o cerrar el modal de ViewTask
  const toggleViewTaskModal = () => {
    setIsViewTaskModalOpen(!isViewTaskModalOpen);
  };

  // Desestructuración de los props para acceder a los parámetros
  const { taskid, users, title, descripcion, progreso, etiqueta, fechaInicio, fechaFin, user_creador} = props;

  // Función para obtener los estilos según la dificultad
  const getStyles = (etiqueta) => {
    switch (etiqueta) {
      case "Fácil":
        return {
          backgroundColor: "#36b63c",
          textColor: "#E0F7FA",
        };
      case "Medio":
        return {
          backgroundColor: "#e6ad1d",
          textColor: "#6A1B9A",
        };
      case "Difícil":
        return {
          backgroundColor: "#C62828",
          textColor: "#FFEBEE",
        };
      default:
        return {
          backgroundColor: "#cccccc", // Color por defecto
          textColor: "#000000", // Texto por defecto
        };
    }
  };

  const { backgroundColor, textColor } = getStyles(etiqueta);

  return (
      <>
        <button
            onClick={toggleViewTaskModal}
            className="bg-[#f8fbfb] bg-opacity-65 shadow-sm rounded-lg min-h-28 w-[80%] mt-3 p-4 flex flex-col items-start"
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
            />
        )}
      </>
  );
}

export default TaskItem;
