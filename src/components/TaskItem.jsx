import React, {useState} from "react";
import ViewTask from "../pages/ViewTask";

function TaskItem(props) {
    // Estado para controlar la visibilidad del modal de ViewTask
    const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState(false);
    // Función para abrir o cerrar el modal de ViewTask
    const toggleViewTaskModal = () => {
        setIsViewTaskModalOpen(!isViewTaskModalOpen);
    };

  let title = props.title;
  let user = props.user;
  return (
    <>
      <button
          onClick={toggleViewTaskModal}
          className="border-gray-100 bg-[#f8fbfb] shadow-sm border-[1px] rounded-lg h-28 w-[80%] mt-3 p-4 flex flex-col items-start">
        <span className="text-gray-400 font-semibold text-md">{user}</span>
        <p className="text-gray-700 font-bold text-xl">{title}</p>
      </button>
        {isViewTaskModalOpen && <ViewTask toggle={toggleViewTaskModal} />}
    </>
  );
}

export default TaskItem;
