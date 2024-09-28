import { useState, useEffect } from 'react'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PocketBase from 'pocketbase';
import swal from 'sweetalert';

export default function AuthForm() {
  const pb = new PocketBase('https://roomlist.pockethost.io');
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // Comprobar si el token está en el localStorage al cargar la página
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      pb.authStore.loadFromCookie(storedToken);
      if (pb.authStore.isValid) {
        navigate('/create-join-room');
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailFormat.test(email)) {
        swal("Error", "Por favor ingresa un correo electrónico válido.", "warning");
        return;
      }
      // Autenticación con PocketBase usando email y contraseña
      const authData = await pb.collection('Usuarios').authWithPassword(email, password);
      console.log("Usuario autenticado:", authData);
      localStorage.setItem('authToken', pb.authStore.exportToCookie());
      navigate('/create-join-room');
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      swal("Error al iniciar sesión", "Verifica tus credenciales", "error");
    }
  };


  // Estado para los datos del formulario de registro
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Estado para manejar mensajes de éxito o error
  const [registerMessage, setRegisterMessage] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const navigateCreateJoinRoom = () => {
    navigate('/create-join-room');
  }

  // Manejador de cambios en el formulario de registro
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  // Función de validación para el nombre de usuario
  const validateUsername = (username) => {
    if (username.length < 6 || username.length > 32) {
      return "El nombre de usuario debe tener entre 6 y 32 caracteres.";
    }
    return "";
  };

  // Función de validación para el correo electrónico
  const validateEmail = (email) => {
    // Expresión regular para validar que el correo solo contiene letras, guiones bajos, guiones intermedios y el símbolo "@"
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Verificar longitud máxima y formato
    if (email.length > 255) {
      return "El correo electrónico no puede tener más de 255 caracteres.";
    } else if (!emailRegex.test(email)) {
      return "Correo electrónico Inválido. Unicamente puede contener caracteres de A-Z/a-z, 0-9, _ , - y debe contener @.";
    }
    return "";
  };

  // Función de validación para la contraseña
  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 32) {
      return "La contraseña debe tener entre 8 y 32 caracteres.";
    }
    return "";
  };

  // Función para verificar si el usuario o el correo ya existen en la base de datos
  const checkIfUserExists = async () => {
    try {
      // Verificar si ya existe el nombre de usuario
      const usernameExists = await pb.collection('Usuarios').getFirstListItem(`username="${registerData.name}"`);
      
      if (usernameExists) {
        return "El nombre de usuario ya está en uso.";
      }
      
      // Verificar si ya existe el correo electrónico
      const emailExists = await pb.collection('Usuarios').getFirstListItem(`email="${registerData.email}"`);
      
      if (emailExists) {
        return "El correo electrónico ya está registrado.";
      }

      return "";
    } catch (error) {
      console.error("Error al verificar usuario o correo:", error);
      return "";
    }
  };

  // Manejador de envío del formulario de registro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Validar el nombre de usuario
    const usernameError = validateUsername(registerData.name);
    if (usernameError) {
      setRegisterMessage(usernameError);
      return; // No continuar con el registro si hay un error
    }

    // Validar el correo electrónico
    const emailError = validateEmail(registerData.email);
    if (emailError) {
      setRegisterMessage(emailError);
      return; // No continuar con el registro si hay un error
    }

    // Validar la contraseña
    const passwordError = validatePassword(registerData.password);
    if (passwordError) {
      setRegisterMessage(passwordError);
      return; // No continuar con el registro si hay un error
    }

    // Verificar si el nombre de usuario o el correo electrónico ya existen
    const userExistsError = await checkIfUserExists();
    if (userExistsError) {
      setRegisterMessage(userExistsError);
      return; // No continuar si ya existe el usuario o correo
    }

    const data = {
      "username": registerData.name,
      "email": registerData.email,
      "emailVisibility": true,
      "password": registerData.password,
      "passwordConfirm": registerData.password,
    };
    
    try {
      // Mover la llamada de creación dentro del bloque try
      const record = await pb.collection('Usuarios').create(data);

      // Si el registro fue exitoso, mostramos un mensaje de éxito
      if (record) {
        setRegisterMessage("Usuario registrado exitosamente.");
        console.log("Usuario registrado exitosamente:", record);
        

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      // Si ocurre un error, mostramos el mensaje de error
      setRegisterMessage("Error al registrar el usuario. El correo electronico ya está en uso.");
      console.error("Error al registrar el usuario:", error);
    }
    
    console.log(registerData.email);
    console.log(registerData.name);
    console.log(registerData.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-center">Bienvenido</h1>
          <p className="text-center">Inicia sesión o crea una cuenta para continuar</p>
        </div>
        <div className="p-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`w-1/2 py-2 text-center ${activeTab === "login" ? "border-b-2 border-[#4b5563]" : ""}`}
              onClick={() => setActiveTab("login")}>
              Iniciar Sesión
            </button>
            <button
              className={`w-1/2 py-2 text-center ${activeTab === "register" ? "border-b-2 border-[#4b5563]" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Registrarse
            </button>
          </div>
          {activeTab === "login" && (
            <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div className="space-y-2">
                <br />
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>

                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                      id="email"
                      type="text"
                      value={email}
                      maxLength={100}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="usuario@ejemplo.com"
                      className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>

                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      maxLength={100}
                      placeholder="••••••••"
                      className="pl-10 pr-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                      type="button"
                      className="pr-1 absolute right-1 top-1/2 transform -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
                onClick={handleLogin}
                className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg"
            >
              Iniciar Sesión
            </button>
          </form>
          )}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit}>
              <div className="space-y-4">
                <br />
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre de Usuario (sin espacios)</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />

                    <input 
                      id="name" 
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      placeholder="JuanRamirez" 
                      className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />

                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email-register" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />

                    <input 
                      id="email-register" 
                      name="email"
                      type="email" 
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      placeholder="usuario@ejemplo.com" 
                      className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />

                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password-register" className="block text-sm font-medium text-gray-700">Contraseña (mínimo 8 dígitos)</label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      id="password-register"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      placeholder="••••••••"
                      className="pl-10 pr-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4b5563]"
                    />
                    <button
                      type="button"
                      className="pr-1 absolute right-1 top-1/2 transform -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-[#4b5563] text-white py-2 rounded-lg">Registrarse</button>
            </form>
          )}

          {/* Mostrar mensaje de éxito o error */}
          {registerMessage && (
            <div className={`mt-4 p-4 text-center ${registerMessage.includes("exitosamente") ? "bg-green-500" : "bg-red-500"} text-white rounded-lg`}>
              {registerMessage}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}