import { useState, useEffect } from 'react';
import { Search, MoreVertical, MessageCircle, UserPlus, UserMinus } from 'lucide-react';
import PocketBase from 'pocketbase';

// Inicializamos el estado de los miembros del grupo como un array vacío
export default function GroupMembers() {
  const pb = new PocketBase('https://roomlist.pockethost.io'); // Inicializamos PocketBase
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda
  const [groupMembers, setGroupMembers] = useState([]); // Estado para manejar los miembros del grupo dinámicamente
  const roomcode = localStorage.getItem("roomCode"); // Obtenemos el código de la sala del localStorage

  // Función para filtrar los miembros basados en el término de búsqueda
  const filteredMembers = groupMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para obtener las iniciales del nombre
  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).join('');
  };

  useEffect(() => {
    console.log("Roomcode:", roomcode);
    
    // Función asíncrona para obtener los usuarios del grupo desde PocketBase
    const fetchRecords = async () => {
      try {
        const records = await pb.collection("Usuario_Tablero").getFullList({
          filter: `ID_Sala="${roomcode}"`, // Filtramos por el código de sala
        });
        console.log(records);

        // Creamos un array temporal para almacenar los usuarios del grupo
        const updatedMembers = [];

        // Recorremos los registros que recibimos para buscar los detalles de cada usuario
        for (const record of records) {
          console.log(record.ID_Usuario);

          // Buscar detalles del usuario en la colección "Usuarios" usando el ID del registro
          const user = await pb.collection("Usuarios").getOne(record.ID_Usuario);
          console.log(user.username);

          // Agregar el usuario al array temporal con su respectiva información
          updatedMembers.push({
            id: user.id, // ID del usuario
            name: user.username, // Nombre del usuario
            role: "Member", // Rol por defecto, puedes cambiarlo si es necesario
            status: "online", // Estado del usuario, puedes ajustarlo según la lógica
          });
        }

        // Actualizamos el estado con los miembros obtenidos
        setGroupMembers(updatedMembers);

      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords(); // Llamamos a la función para obtener los datos
  }, [roomcode]); // El efecto se ejecutará cuando cambie el roomcode

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg shadow-lg bg-gray-50 md:max-w-full">
      <div className="p-4 rounded-t-lg text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Equipo</h2>
        </div>
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar miembros..."
            className="w-full border pl-8 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white h-[300px] overflow-y-auto p-4 rounded-b-lg">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg transition-colors mb-1 border-b"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 flex items-center justify-center bg-gray-500 text-white rounded-full text-xs font-bold">
                {getInitials(member.name)} {/* Mostramos las iniciales del nombre */}
              </div>
              <div className="text-sm cursor-pointer">
                <h3 className="font-semibold">{member.name}</h3> {/* Nombre del miembro */}
                <div className="flex items-center space-x-1">
                  <span className={`px-2 py-0.5 text-xs rounded ${
                    member.role === 'Admin' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                  }`}>
                    {member.role} {/* Rol del miembro */}
                  </span>
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    member.status === 'online' ? 'bg-green-500' :
                    member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                  <span className="text-xs text-gray-500">{member.status} {/* Estado del miembro */}</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="p-1 text-gray-500 hover:bg-gray-200 rounded-full transition focus:outline-none">
                <MoreVertical className="h-4 w-4" />
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 mt-1 w-40 bg-white border rounded-md shadow-lg z-10 hidden group-hover:block">
                <div className="py-1">
                  <span className="block px-3 py-1 text-xs font-bold">Acciones</span>
                  <button className="w-full flex items-center px-3 py-1 text-xs text-gray-700 hover:bg-gray-100">
                    <MessageCircle className="mr-2 h-3 w-3" />
                    Enviar mensaje
                  </button>
                  <button className="w-full flex items-center px-3 py-1 text-xs text-gray-700 hover:bg-gray-100">
                    <UserPlus className="mr-2 h-3 w-3" />
                    Promover
                  </button>
                  <div className="border-t my-1"></div>
                  <button className="w-full flex items-center px-3 py-1 text-xs text-red-600 hover:bg-red-100">
                    <UserMinus className="mr-2 h-3 w-3" />
                    Eliminar del grupo
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
