import React from 'react'

function UserItemList({ users }) {
    return (
        <div className="max-h-60 overflow-y-scroll scrollbar-thin ">
            {users.map((user, index) => (
                <div key={index} className='bg-gray-50 mt-3 h-11 flex items-center pl-3 rounded-md'>
                    <p className='text-gray-900 font-semibold text-sm'>{user}</p> 
                </div>
            ))}
        </div>
    )
}

export default UserItemList

// CSS para el scroll
const styles = `
/* Estilos para WebKit (Chrome, Safari, Edge) */
.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #e5e7eb; /* gris claro */
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #4b5563; /* azul (Tailwind: blue-500) */
  border-radius: 9999px;
  border: 2px solid transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: #677486; /* azul más oscuro (Tailwind: blue-600) */
}

/* Estilos para Firefox */
.scrollbar-thin {
  scrollbar-width: thin; /* Define el ancho de la barra de desplazamiento */
  scrollbar-color: #4b5563 #e5e7eb; /* Color del pulgar y el track */
}

/* Hover en el thumb en Firefox */
.scrollbar-thin:hover {
  scrollbar-color: #677486 #e5e7eb; /* Color más oscuro en hover */
}
`;


// Inserta el CSS dinámicamente en la página
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
