import { ArrowLeft, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PocketBase from 'pocketbase';
import swal from 'sweetalert2';

export default function CreateJoinRoom() {
  const pb = new PocketBase('https://roomlist.pockethost.io');
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState('');
  const [roomHistory, setRoomHistory] = useState([]); // Estado para almacenar el historial de salas

  const navigateRoomList = (roomCode) => {
    navigate(`/room-list/${roomCode}`);
  };

  const navigateCreateNewRoom = () => {
    navigate('/create-new-room');
  };

  // Comprobar si el token está en el localStorage al cargar la página, si no, se manda a login
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      pb.authStore.loadFromCookie(storedToken);
      if (!pb.authStore.isValid) {
        navigate("/");
      }
    }
  }, [navigate]);

  // Obtener las salas de la base de datos filtrando solo por las que están en el localStorage
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Obtener los códigos de sala almacenados en localStorage
        const visitedRooms = JSON.parse(localStorage.getItem('visitedRooms')) || [];

        if (visitedRooms.length === 0) return;

        // Obtener todas las salas de PocketBase
        const records = await pb.collection('Salas').getFullList();

        // Filtrar las salas que coincidan con los códigos almacenados en localStorage
        const filteredRooms = records.filter(room => visitedRooms.includes(room.Codigo_Sala));

        // Ordenar las salas para que la última visitada esté primero
        const orderedRooms = visitedRooms
          .map(code => filteredRooms.find(room => room.Codigo_Sala === code))
          .filter(Boolean); // Eliminar los valores `undefined` si no se encuentra la sala

        setRoomHistory(orderedRooms);
      } catch (error) {
        console.error('Error al obtener salas:', error);
      }
    };

    fetchRooms();
  }, []);

  // Función para unirse a una sala o validar su existencia
  const joinRoom = async () => {
    if (roomCode.trim() === '') {
      swal.fire('Error', 'Por favor ingrese un código de sala.', 'error');
      return;
    }

    try {
      const result = await pb.collection('Salas').getFirstListItem(`Codigo_Sala="${roomCode}"`);

      swal.fire({
        title: `Sala encontrada: ${result.Nombre_Sala}`,
        text: '¿Quieres unirte a esta sala?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Unirse',
        cancelButtonText: 'Cancelar',
        customClass: {
          actions: 'my-actions',
        }
      }).then((willJoin) => {
        if (willJoin.isConfirmed) {
          // Almacenar el código de la sala en localStorage
          let visitedRooms = JSON.parse(localStorage.getItem('visitedRooms')) || [];

          // Si ya existe el código en el historial, se elimina para luego volver a agregarlo al principio
          visitedRooms = visitedRooms.filter(code => code !== roomCode);

          // Agregar la sala al principio del historial
          visitedRooms.unshift(roomCode);

          // Guardar el historial actualizado en localStorage
          localStorage.setItem('visitedRooms', JSON.stringify(visitedRooms));

          // Redirigir a la sala
          navigateRoomList(roomCode);
        } else if (willJoin.dismiss === swal.DismissReason.cancel) {
          navigate('/create-join-room');
        }
      });
    } catch (error) {
      swal.fire('Error', 'El código de sala no existe.', 'error');
    }
  };

  // Función de validación para el código de sala
  const handleRoomCodeChange = (e) => {
    const input = e.target.value;
    // Validar que solo haya letras (A-Z, a-z) y números (0-9) y que el máximo de caracteres sea 8
    const validCode = input.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
    setRoomCode(validCode);
  };

  return (
    <div className="flex h-screen bg-[#ffffff] p-6">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl overflow-hidden flex">
        {/* Left side - Content */}
        <div className="flex-1 p-8">
          {/* Main content */}
          <main>
            <h1 className="text-2xl font-bold mb-2">Ingresar a Sala</h1>

            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input
                id="name"
                value={roomCode}
                onChange={handleRoomCodeChange}
                placeholder="Código de Sala"
                className="pl-3 w-1/2 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4b5563]"
              />
              <button
                onClick={() => {
                  console.log("Código de Sala ingresado:", roomCode); // Imprimir en la consola el código
                  joinRoom();
                }}
                className="w-1/4 mt-6 ml-6 bg-[#4b5563] text-white py-2 rounded-lg"
              >
                Unirse
              </button>
            </div>

            <div className="relative">
              <button
                onClick={navigateCreateNewRoom}
                className="w-1/4 mt-6 bg-[#4b5563] text-white py-2 rounded-lg"
              >
                Crear Sala
              </button>
            </div>
            <br />
            <br />
            <p className="text-gray-600 text-large mb-6">Historial de Salas:</p>

            {/* Historial de salas */}
            <div className="space-y-4">
              {roomHistory.length > 0 ? (
                roomHistory.map((room) => (
                  <RoomHistoryOption
                    key={room.id}
                    name={room.Nombre_Sala}
                    code={room.Codigo_Sala}
                    clickEvent={() => navigateRoomList(room.Codigo_Sala)}
                  />
                ))
              ) : (
                <p className="text-gray-500">No hay salas recientes.</p>
              )}
            </div>
          </main>
        </div>

        {/* Right side - Testimonial */}
        <div className="w-1/3 bg-[#4b5563] p-8 flex flex-col justify-end text-white">
          <blockquote className="mb-4">
            "Puedes crear diferentes salas para administrar tus tareas de una mejor manera."
          </blockquote>
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar el historial de salas
function RoomHistoryOption({ name, code, clickEvent }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <div className="flex flex-col">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">Código: {code}</p>
        </div>
      </div>
      <button
        onClick={clickEvent}
        className="bg-[#ffffff] border-[1px] border-[#4b5563] px-5 py-3 rounded-2xl hover:bg-[#4b5563] hover:text-white"
      >
        Ingresar
      </button>
    </div>
  );
}


