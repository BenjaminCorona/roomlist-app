import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function CreateNewRoom() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [message, setMessage] = useState({
    title: "",
    description: "",
    variant: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      setMessage({
        title: "Error",
        description: "El nombre de la sala no puede estar vacío.",
        variant: "error",
      });
      return;
    }

    // Lógica para crear la sala
    setMessage({
      title: "Sala Creada",
      description: `La sala "${nombre}" ha sido creada con éxito.`,
      variant: "success",
    });
    setNombre("");
    setDescripcion("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Crear Nueva Sala</h1>
          <p>Ingresa los detalles para tu nueva sala</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nombre" className="block font-medium">
              Nombre de la Sala
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Ingresa el nombre de la sala"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="descripcion" className="block font-medium">
              Descripción
            </label>
            <textarea
              id="descripcion"
              placeholder="Describe el propósito de esta sala"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Crear Sala
          </button>
        </form>
        {message.title && (
          <div
            className={`mt-4 p-2 text-white rounded ${
              message.variant === "error" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <strong>{message.title}:</strong> {message.description}
          </div>
        )}
      </div>
    </div>
  );
}
