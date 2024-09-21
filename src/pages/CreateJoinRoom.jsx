import { ArrowLeft, Plus } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"


export default function CreateJoinRoom() {
  const navigate = useNavigate();

  const navigateRoomList = () => {
    navigate('/room-list')
  }

  const navigateCreateNewRoom = () => {
    navigate('/create-new-room');
  } 

  return (
    <div className="flex h-screen bg-[#ffffff] p-6">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl overflow-hidden flex">
        {/* Left side - Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <header className="flex items-center mb-8">
            <button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-500">Regresar</span>
          </header>

          {/* Main content */}
          <main>
            <h1 className="text-2xl font-bold mb-2">Ingresar a Sala</h1>
            <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input id="name" placeholder="Código de Sala" className="pl-3 w-1/2 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button onClick={navigateRoomList} className="w-1/4 mt-6 ml-6 bg-blue-500 text-white py-2 rounded-lg">Unirse</button>
            </div>
            <div className="relative">
            <button onClick={navigateCreateNewRoom} className="w-1/4 mt-6 bg-blue-500 text-white py-2 rounded-lg">Crear Sala</button>
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
                clickEvent={navigateRoomList}
              />
              <WorkspaceOption
                name="Sala 2"
                members={2}
                icon="2"
                iconBg="bg-purple-200"
                iconColor="text-purple-600"
                clickEvent={navigateRoomList}
              />
            </div>
          </main>
        </div>

        {/* Right side - Testimonial */}
        <div className="w-1/3 bg-[#548de9] p-8 flex flex-col justify-end text-white">
          <blockquote className="mb-4">
            "Puedes crear diferentes salas para administrar tus tareas de una mejor manera."
          </blockquote>
        </div>
      </div>
    </div>
  )
}

function WorkspaceOption({ name, members, icon, iconBg, iconColor = "text-white", clickEvent }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <div className={`w-10 h-10 ${iconBg} ${iconColor} rounded-md flex items-center justify-center font-bold mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{members} Members</p>
        </div>
      </div>
      <button onClick={clickEvent} variant="default" className="bg-[#ffffff] hover:bg-[#bbbfc1]">
        Join
      </button>
    </div>
  )
}