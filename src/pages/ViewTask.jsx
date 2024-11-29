import { useState } from "react";
import {
  Pencil,
  Link,
  MoreHorizontal,
  File,
  CircleUser,
  X,
} from "lucide-react";
import PocketBase from "pocketbase";
import { logCardStatus } from "../tools/triggers_history.js";

export default function ViewTask({
  toggle,
  taskid,
  users,
  title,
  descripcion,
  progreso,
  etiqueta,
  fechaInicio,
  fechaFin,
  user_creador,
  onStatusChange,
  roomCode,
}) {
  const pb = new PocketBase("https://roomlist.pockethost.io");
  const [progresos, setProgreso] = useState(progreso);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setProgreso(newStatus);
    onStatusChange(newStatus);
  };

  // Función para guardar cambios en la base de datos
  const handleSave = async () => {
    try {
      const data = {
        Progreso: progresos,
      };

      const record = await pb.collection("Tarjetas").update(taskid, data); // Actualiza el registro en PocketBase
      const userinfo = pb.authStore.model;
      console.log(roomCode);
      console.log(progresos);
      console.log(title);
      console.log(userinfo);
      await logCardStatus(userinfo, title, roomCode, progresos);
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar el progreso:", error);
    }
  };

  return (
    <div
      className={
        "fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70"
      }
    >
      <div className="relative mx-auto mt-0g max-w-3xl bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* Dialog Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggle}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Main Content */}
          <div className="flex-grow p-6 overflow-y-auto">
            <div className="flex items-start space-x-4 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Descripción tarea
                </h4>
                <p className="mt-2 text-gray-700">{descripcion}</p>
              </div>
            </div>
            {/* <div>
                <h4 className="font-semibold text-gray-900 mb-4">Archivos adjuntos</h4>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition duration-150 ease-in-out">
                    <div className="flex items-center">
                      <File className="h-4 w-4 text-gray-600 mr-5 ml-2"/>
                      <span className="text-gray-800">archivo1.pdf</span>
                    </div>
                    <button className="text-blue-500 hover:underline">Descargar</button>
                  </li>
                  <li className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition duration-150 ease-in-out">
                    <div className="flex items-center">
                      <File className="h-4 w-4 text-gray-600 mr-5 ml-2"/>
                      <span className="text-gray-800">archivo2.jpg</span>
                    </div>
                    <button className="text-blue-500 hover:underline">Descargar</button>
                  </li>
                  <li className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition duration-150 ease-in-out">
                    <div className="flex items-center">
                      <File className="h-4 w-4 text-gray-600 mr-5 ml-2"/>
                      <span className="text-gray-800">archivo3.pptx</span>
                    </div>
                    <button className="text-blue-500 hover:underline">Descargar</button>
                  </li>
                </ul>
              </div> */}
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-gray-200 p-6 space-y-6 bg-gray-50">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Autor
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{user_creador}</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Etiquetas
              </h3>
              <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-xs">
                {etiqueta || "N/A"}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Colaboradores
              </h3>
              <ul className="max-h-32 overflow-y-auto">
                {(users || []).map((user, index) => (
                  <li key={index} className="flex items-center">
                    <CircleUser className="h-4 w-4 text-gray-600 mr-3" />
                    <span className="text-gray-700 text-sm">{user}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Estatus
              </h3>
              <select
                className="w-full border border-gray-300 rounded p-2 bg-white"
                value={progresos}
                onChange={handleStatusChange} // Actualiza `progreso` con el valor seleccionado
              >
                <option value="Por Hacer">Por Hacer</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Hecho">Hecho</option>
              </select>
            </div>
            <div className="space-y-2">
              {[
                {
                  label: "Fecha de inicio",
                  value: fechaInicio
                    ? new Date(fechaInicio).toLocaleDateString()
                    : "Sin asignar",
                },
                {
                  label: "Fecha de fin",
                  value: fechaFin
                    ? new Date(fechaFin).toLocaleDateString()
                    : "Sin asignar",
                },
              ].map((item, index) => (
                <div key={index} className="flex justify-between text-gray-700">
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
            <div> </div>

            <div> </div>

            <div> </div>
            {/* Botón de Guardar */}
            <button
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={handleSave} // Manejador de evento para guardar
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
