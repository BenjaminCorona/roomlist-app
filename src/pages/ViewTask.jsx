import { useState } from 'react'
import { Pencil, Link, MoreHorizontal, File, CircleUser, X } from 'lucide-react'

export default function ViewTask() {
  const [open, setOpen] = useState(true)

  return (
      <div className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'} bg-gray-100 bg-opacity-70`}>
        <div className="relative mx-auto mt-20 max-w-3xl bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Dialog Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Nombre de la tarea
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              {/*<button className="p-2 hover:bg-gray-100 rounded-full">*/}
              {/*  <Pencil className="h-4 w-4 text-gray-600" />*/}
              {/*</button>*/}
              {/*<button className="p-2 hover:bg-gray-100 rounded-full">*/}
              {/*  <Link className="h-4 w-4 text-gray-600" />*/}
              {/*</button>*/}
              {/*<button className="p-2 hover:bg-gray-100 rounded-full">*/}
              {/*  <MoreHorizontal className="h-4 w-4 text-gray-600" />*/}
              {/*</button>*/}
              <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => setOpen(false)}>
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Main Content */}
            <div className="flex-grow p-6 overflow-y-auto">
              <div className="flex items-start space-x-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Descripción tarea</h4>
                  <p className="mt-2 text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec dui in nunc ultricies lacinia.
                  </p>
                </div>
              </div>
              <div>
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
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-gray-200 p-6 space-y-6 bg-gray-50">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Autor</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Nombre_de_usuario</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Etiquetas</h3>
                <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-xs">etiqueta1</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Colaboradores</h3>
                <ul>
                  <li className="flex items-center">
                    <CircleUser className="h-4 w-4 text-gray-600 mr-3"/>
                    <span className="text-gray-700 text-sm">Colaborador1</span>
                  </li>
                  <li className="flex items-center">
                    <CircleUser className="h-4 w-4 text-gray-600 mr-3"/>
                    <span className="text-gray-700 text-sm">Colaborador2</span>
                  </li>
                </ul>

              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Estatus</h3>
                <select className="w-full border border-gray-300 rounded p-2 bg-white">
                  <option value="in-progress">En progreso</option>
                  <option value="todo">Por hacer</option>
                  <option value="done">Hecho</option>
                </select>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Fecha de inicio', value: 'No date' },
                  { label: 'Fecha de fin', value: 'No date' }
                ].map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-700">
                      <span className="text-sm font-semibold">{item.label}</span>
                      <span className="text-sm text-gray-500">{item.value}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
