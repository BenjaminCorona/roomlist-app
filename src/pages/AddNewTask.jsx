import { Lock, CalendarIcon, PlusIcon, Target, CheckCircle2, Trash2, X } from 'lucide-react';

export default function AddNewTask({toggle}) {
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70">
        <div className="relative w-full max-w-lg max-h-screen bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
          {/* Header con título y botón de cerrar */}
          <div className="bg-white z-10 flex justify-between items-center mb-4 p-2">
            <div className="flex items-center text-sm text-gray-500">
              <Target className="h-4 w-4 mr-2" />
              Agregar tarea
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={toggle} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mb-2">
            <h3 className="font-semibold mb-2">Nombre</h3>
          </div>
          <input
              type="text"
              placeholder="Nombre de la tarea"
              className="w-full p-2 mb-3 border border-gray-300 rounded min-h"
          />

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Descripción</h3>
            <textarea
                placeholder="Descripción de la tarea"
                className="w-full p-2 border border-gray-300 rounded min-h-[100px] resize-y"
            ></textarea>
          </div>

          <div className="flex space-x-2 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Fecha de inicio</h3>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="date"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Fecha de fin</h3>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="date"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Etiquetas</h3>
              <div className="flex rounded-md shadow-sm">
                <input
                    type="text"
                    placeholder="Agregar etiqueta"
                    className="block w-full py-2 px-3 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-800 focus:outline-none">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Usuarios */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Usuarios</h3>
              <div className="flex rounded-md shadow-sm">
                <input
                    type="text"
                    placeholder="Agregar usuario"
                    className="block w-full py-2 px-3 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-800 focus:outline-none">
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="font-semibold mb-2">Archivos</h3>
            <div className="border-2 border-dashed rounded-md p-4 text-center text-gray-500">
              Click to add / drop your files here
            </div>
          </div>

          <div className="bg-white">
            <button className="px-6 py-3 bg-gray-600 text-white w-full rounded-md hover:bg-gray-800">
              Guardar tarea
            </button>
          </div>
        </div>
      </div>
  );
}
