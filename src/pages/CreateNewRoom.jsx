import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PocketBase from 'pocketbase';
import swal from 'sweetalert';

export default function CreateNewRoom() {
  const pb = new PocketBase('https://roomlist.pockethost.io');
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [message, setMessage] = useState({
    title: "",
    description: "",
    variant: "",
  });

  const navigate = useNavigate();

  const generarCodigo = () => {
    let nuevoCodigo = '';
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < 4; i++) {
      const letra = letras[Math.floor(Math.random() * letras.length)];
      const numero = Math.floor(Math.random() * 10);
      nuevoCodigo += letra + numero;
    }

    return nuevoCodigo;
  };

  // Función para verificar si el código ya existe en la base de datos
  const verificarCodigoExistente = async (codigo) => {
    const resultado = await pb.collection('Salas').getList(1, 1, {
      filter: `Codigo_Sala = "${codigo}"`, // Filtro para buscar por código
    });
    return resultado.items.length > 0; // Si hay resultados, el código ya existe
  };

  //Función de acción del botón generar sala 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      setMessage({
        title: "Error",
        description: "El nombre de la sala no puede estar vacío.",
        variant: "error",
      });
      return;
    }
    if (descripcion.trim() === "") {
      setMessage({
        title: "Error",
        description: "La sala debe de tener una descripción.",
        variant: "error",
      });
      return;
    }
  
    let nuevoCodigo = '';
    let codigoExiste = true;
  
    // Repetir hasta encontrar un código único
    while (codigoExiste) {
      nuevoCodigo = generarCodigo(); // Generar un nuevo código
      codigoExiste = await verificarCodigoExistente(nuevoCodigo); // Verificar si el código ya existe
    }
  
    try {
      // Lógica para crear la sala en PocketBase
      const data = {
        "Nombre_Sala": nombre,
        "Descripcion_Sala": descripcion,
        "Codigo_Sala": nuevoCodigo, // Incluir el código generado
      };
      const record = await pb.collection('Salas').create(data);
      
      if (record) {
        // Almacenar el código de la nueva sala en el historial de 'visitedRooms'
        let visitedRooms = JSON.parse(localStorage.getItem('visitedRooms')) || [];
  
        // Si ya existe el código en el historial, se elimina para luego volver a agregarlo al principio
        visitedRooms = visitedRooms.filter(code => code !== nuevoCodigo);
  
        // Agregar el nuevo código de sala al principio del historial
        visitedRooms.unshift(nuevoCodigo);
  
        // Guardar el historial actualizado en localStorage
        localStorage.setItem('visitedRooms', JSON.stringify(visitedRooms));
  
        // Mostrar mensaje de éxito con SweetAlert
        swal({
          title: "Sala Creada",
          text: `La sala "${nombre}" ha sido creada con éxito. Código: ${nuevoCodigo}`,
          icon: "success",
          button: "Aceptar",
        }).then(() => {
          // Redirigir a CreateJoinRoom después de cerrar la alerta
          navigate('/create-join-room');
        });
  
        // Limpiar campos
        setNombre("");
        setDescripcion("");
      }
    } catch (error) {
      setMessage({
        title: "Error",
        description: "Hubo un error al crear la sala.",
        variant: "error",
      });
      console.error('Error al crear la sala:', error);
    }
  };

  // Comprobar si el token está en el localStorage al cargar la página si no, se manda a login
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      pb.authStore.loadFromCookie(storedToken);
      if (!pb.authStore.isValid) {
        navigate("/");
      }
    }
  }, [navigate]);

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
            className="w-full bg-[#4b5563] text-white py-2 rounded flex items-center justify-center"
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


