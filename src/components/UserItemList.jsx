import React from 'react'

function UserItemList({ users }) {
    return (
        <div className="max-h-60 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
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
.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #e5e7eb; /* gris claro */
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #ef4444; /* azul (Tailwind: blue-500) */
  border-radius: 9999px;
  border: 2px solid transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: #dc2626; /* azul más oscuro (Tailwind: blue-600) */
}
`;

// Inserta el CSS dinámicamente en la página
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
