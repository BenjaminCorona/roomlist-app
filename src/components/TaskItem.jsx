import React, { useState } from "react";
import ViewTask from "../pages/ViewTask";

function TaskItem({ user, title, etiqueta }) {
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);

  const toggleViewTaskModal = () => {
    setIsViewTaskModalOpen(!isViewTaskModalOpen);
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
      <div className="w-full mb-3">
        <button
            onClick={toggleViewTaskModal}
            className="bg-white bg-opacity-90 shadow-md rounded-lg w-full p-4 flex flex-col items-start text-left transition-all duration-200 hover:bg-opacity-100 hover:shadow-lg"
        >
          <span className="text-gray-500 text-sm mb-1">{user}</span>
          <h3 className="text-gray-800 font-semibold text-lg mb-2 break-words">{title}</h3>
          <div className="flex flex-wrap gap-1">
          <span
              className="rounded-full text-xs font-medium px-2 py-1"
              style={{
                backgroundColor,
                color: textColor,
              }}
          >
            {etiqueta}
          </span>
          </div>
        </button>

        {isViewTaskModalOpen && <ViewTask toggle={toggleViewTaskModal} />}
      </div>
  );
}

export default TaskItem;