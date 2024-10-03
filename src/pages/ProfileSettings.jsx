import { useState, useEffect} from "react"
import { LogOut, Save } from "lucide-react"
import { useNavigate } from "react-router-dom";
import PocketBase from 'pocketbase';
import swal from 'sweetalert';


const pb = new PocketBase('https://roomlist.pockethost.io');

export default function ProfileSettings() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  // Gestiona el mensaje de error relacionado con la longitud de la contraseña.
  const [passwordError, setPasswordError] = useState("");
  

  const navigate = useNavigate();
  
  //Funciones de navegacion
  const navigateRoomList = () => {
    navigate('/room-list')
  }

  
  const navigateLoginRegister = () => {
    navigate('/')
  }

     useEffect(() => {

      const storedToken = localStorage.getItem('authToken');
      if (!(storedToken)) {
        pb.authStore.loadFromCookie(storedToken);
        if (!(pb.authStore.isValid)) {
          navigate('/');
        }
      }
    }, [navigate]);
  

  // Cargar los datos del usuario autenticado al montar el componente
  useEffect(() => {
    const fetchUserProfile = async () => {
      try{
        const authUser = pb.authStore.model; // Se obtiene el usuario actual desde PocketBase
        if (authUser) {
          setUsername(authUser.username); // Se establece el nombre del usuario
          setEmail(authUser.email); // Se establece el correo del usuario
        }

      } catch(error) {
      console.error("Error al cargar el perfil del usuario:", error); // Manejo de error al cargar la información del usuario
      }
    }
    fetchUserProfile();
  }, [navigate]);

  // Funcion para verificar la contraseña actual
  const verifyCurrentPassword = async () => {
    try {
      await pb.collection('Usuarios').authWithPassword(email, currentPassword);
      return true;
    } catch (error) {
      swal("Error", "La contraseña actual es incorrecta.", "warning");
      return false;
    }
  };

  // Actualizar el perfil del usuario (contraseña )
  const handleSave = async (e) => {
    e.preventDefault();

    // Limpiar el mensaje de error al intentar guardar
  setPasswordError("");

  // Validar longitud de la nueva contraseña
  if (newPassword && (newPassword.length < 8 || newPassword.length > 32)) {
    setPasswordError("La contraseña debe tener entre 8 y 32 caracteres.");
    return;
  }

    // Validar contraseñas
    if (newPassword && newPassword !== confirmPassword) {
      swal("Error", "Las contraseñas no coinciden.", "warning");
      return;
    }

    // Verificar la contraseña actual si se intenta cambiar la contraseña
    if (newPassword) {
      const isCurrentPasswordValid = await verifyCurrentPassword();
      if (!isCurrentPasswordValid) return;

      try {

        const userId = pb.authStore.model?.id;
        const data = {
  
          "password": newPassword,
          "passwordConfirm": confirmPassword  ,
          "oldPassword": currentPassword
  
        };
  
        // Actualizar el perfil del usuario en PocketBase
        const record = await pb.collection('Usuarios').update(userId, data);
        if (record) {
        swal({
          title: "Perfil actualizado",
          text: "Los cambios se han guardado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
  
        // Redirigir al inicio de sesión después de la actualización 
        navigateRoomList();
      }
      } catch (error) { // manejo de errores al actualizar
        console.error("Error al actualizar el perfil", error);
        swal({
          title: "Error",
          text: "Ocurrió un error al actualizar el perfil.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }

    
  };


  // cerrar sesión, borrar el token del localStorage y redirigir al login
  const handleLogout = async () => {
    try {

      // Borrar el token del localStorage
      localStorage.removeItem('authToken');

      // Cerrar sesión con PocketBase
      await pb.authStore.clear(); // Limpiar el authStore
      swal({
        title: "Desconectado",
        text: "Se ha cerrado la sesión correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",

      })
  
      // Redirigir a la página de login
      navigateLoginRegister()
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      swal({
        title: "Error",
        text: "Ocurrió un error al cerrar la sesión.",
        icon: "error",
        confirmButtonText: "Aceptar",
      })
    }
  }
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Configuración del Perfil</h1>
      <Separator />
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Nombre de Usuario</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="current-password">Contraseña Actual</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">Nueva Contraseña</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {/* Mostrar el mensaje de error debajo del input de nueva contraseña */}
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}

        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center pt-4">
          <Button type="submit" className="w-32" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Guardar
          </Button>
          <Button type="button" variant="destructive" className="w-32" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
          </Button>
        </div>
      </form>
    </div>
  )
}


// Componente auxiliar para los botones
function Button({ children, onClick, type = "button", variant = "default", className = "" }) {
    const baseStyles = "px-4 py-2 rounded-md flex items-center justify-center transition-colors"
    const variantStyles = {
      default: "bg-blue-500 hover:bg-blue-600 text-white",
      destructive: "bg-red-500 hover:bg-red-600 text-white",
    }
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </button>
    )
  }
  
  // Componente auxiliar para los inputs
  function Input({ id, type = "text", value, onChange }) {
    return (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="border p-2 rounded-md w-full"
      />
    )
  }
  
  // Componente auxiliar para las etiquetas de los inputs
  function Label({ htmlFor, children }) {
    return (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {children}
      </label>
    )
  }
  
  // Componente auxiliar para los separadores
  function Separator() {
    return <hr className="border-gray-300 my-4" />
  }
  
  // Simulación de la función toast
  function toast({ title, description }) {
    alert(`${title}: ${description}`)
  }