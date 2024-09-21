import React from "react";

function TaskItem(props) {
  let title = props.title;
  let user = props.user;
  return (
    <>
      <button className="border-gray-100 bg-[#f8fbfb] shadow-sm border-[1px] rounded-lg h-28 w-[80%] mt-3 p-4 flex flex-col items-start">
        <span className="text-gray-400 font-semibold text-md">{user}</span>
        <p className="text-gray-700 font-bold text-xl">{title}</p>
      </button>
    </>
  );
}

export default TaskItem;
