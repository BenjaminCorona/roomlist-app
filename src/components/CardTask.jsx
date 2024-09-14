import React from "react";

function CardTask(props) {
  let title = props.title;
  return (
    <>
      <div
        className="bg-white shadow-lg flex flex-col items-center p-3
      w-[50vw] h-full rounded-xl mr-3 ml-3 overflow-auto "
      >
        {title}
      </div>
    </>
  );
}

export default CardTask;
