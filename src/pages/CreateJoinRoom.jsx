import { ArrowLeft, Plus, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PocketBase from "pocketbase";
import swal from "sweetalert2";

export default function CreateJoinRoom() {
  const pb = new PocketBase("https://roomlist.pockethost.io");
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState("");

  const navigateRoomList = () => {
    navigate(`/room-list/${roomCode}`);
  };

  const navigateCreateNewRoom = () => {
    navigate("/create-new-room");
  };

  const navigateToProfileSettings = () => {
    navigate("/profile-settings");
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

  // Función para unirse a una sala o validar su existencia
  const joinRoom = async () => {
    if (roomCode.trim() === "") {
      swal.fire("Error", "Por favor ingrese un código de sala.", "error");
      return;
    }

    try {
      const result = await pb
        .collection("Salas")
        .getFirstListItem(`Codigo_Sala="${roomCode}"`);

      swal
        .fire({
          title: `Sala encontrada: ${result.Nombre_Sala}`,
          text: "¿Quieres unirte a esta sala?",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Unirse",
          cancelButtonText: "Cancelar",
          customClass: {
            actions: "my-actions",
          },
        })
        .then((willJoin) => {
          if (willJoin.isConfirmed) {
            navigateRoomList();
          } else if (willJoin.dismiss === swal.DismissReason.cancel) {
            navigate("/create-join-room");
          }
        });
      //Guardar el código de sala en el localStorage
      saveRoomCode();
    } catch (error) {
      swal.fire("Error", "El código de sala no existe.", "error");
    }
  };

  // Función de validación para el código de sala
  const handleRoomCodeChange = (e) => {
    const input = e.target.value;
    // Validar que solo haya letras (A-Z, a-z) y números (0-9) y que el máximo de caracteres sea 8
    const validCode = input.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);
    setRoomCode(validCode);
  };

  // Función para guardar el código de sala en el localStorage
  const saveRoomCode = () => {
    localStorage.setItem("roomCode", roomCode);
    console.log("Código de sala almacenado:", roomCode);
  };

  //Que los usuarios no puedan acceder a la ventana de sala e historial de tarjetas sin haberse unido o creado a una sala
  useEffect(() => {
    const storedRoomCode = localStorage.getItem("roomCode");
    if (storedRoomCode) {
      //Si hay código de sala en el localStorage, se manda a la página de sala
      navigate("/room-list/" + storedRoomCode);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl overflow-hidden flex">
        {/* Left side - Content */}
        <div className="flex-1 p-8">
          {/* Main content */}
          <main>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold mb-2">Ingresar a Sala</h1>

              <div className="relative">
                <button
                  onClick={navigateToProfileSettings}
                  className="flex items-center justify-center w-12 h-12 bg-gray-600 text-white rounded-full"
                >
                  <User size={20} />
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={18}
              />
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
            <p className="text-gray-600 text-large mb-6">Salas Recientes:</p>

            {/* Workspace options */}
            <div className="space-y-4">
              <WorkspaceOption
                name="Sala 1"
                members={18}
                icon="1"
                iconBg="bg-gray-900"
                // clickEvent={navigateRoomList}
              />
              <WorkspaceOption
                name="Sala 2"
                members={2}
                icon="2"
                iconBg="bg-purple-200"
                iconColor="text-purple-600"
                //clickEvent={navigateRoomList}
              />
            </div>
          </main>
        </div>

        {/* Right side - Testimonial */}
        <div className="w-1/3 bg-[#4b5563] p-8 flex flex-col justify-end text-white">
          <blockquote className="mb-4">
            "Puedes crear diferentes salas para administrar tus tareas de una
            mejor manera."
          </blockquote>
        </div>
      </div>
    </div>
  );
}

function WorkspaceOption({
  name,
  members,
  icon,
  iconBg,
  iconColor = "text-white",
  clickEvent,
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 ${iconBg} ${iconColor} rounded-md flex items-center justify-center font-bold mr-4`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{members} Members</p>
        </div>
      </div>
      <button
        onClick={clickEvent}
        variant="default"
        className="bg-[#ffffff] border-[1px] border-[#4b5563] px-5 py-3 rounded-2xl hover:bg-[#4b5563] hover:text-white"
      >
        Join
      </button>
    </div>
  );
}
