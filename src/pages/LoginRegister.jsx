import { useState, useEffect } from 'react'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PocketBase from 'pocketbase';
import swal from 'sweetalert';

export default function AuthForm() {
  const pb = new PocketBase('https://roomlist.pockethost.io');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
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

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [registerMessage, setRegisterMessage] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const validateUsername = (username) => {
    if (username.length < 6 || username.length > 32) {
      return "El nombre de usuario debe tener entre 6 y 32 caracteres.";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length > 255) {
      return "El correo electrónico no puede tener más de 255 caracteres.";
    } else if (!emailRegex.test(email)) {
      return "Correo electrónico inválido. Unicamente puede contener caracteres de A-Z/a-z, 0-9, _ , - y debe contener @ y un dominio (.com, .org, .es, etc).";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 32) {
      return "La contraseña debe tener entre 8 y 32 caracteres.";
    }
    return "";
  };

  const checkIfUserExists = async () => {
    try {
      const usernameExists = await pb.collection('Usuarios').getFirstListItem(`username="${registerData.name}"`);
      if (usernameExists) {
        return "El nombre de usuario ya está en uso.";
      }
    } catch (error) {
      if (error.status !== 404) {
        console.error("Error al verificar el nombre de usuario:", error);
        return "Error al verificar el nombre de usuario.";
      }
    }

    try {
      const emailExists = await pb.collection('Usuarios').getFirstListItem(`email="${registerData.email}"`);
      if (emailExists) {
        return "El correo electrónico ya está registrado.";
      }
    } catch (error) {
      if (error.status !== 404) {
        console.error("Error al verificar el correo electrónico:", error);
        return "Error al verificar el correo electrónico.";
      }
    }

    return ""; // No hubo errores, puede proceder al registro
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(registerData.name);
    if (usernameError) {
      setRegisterMessage(usernameError);
      return;
    }

    const emailError = validateEmail(registerData.email);
    if (emailError) {
      setRegisterMessage(emailError);
      return;
    }

    const passwordError = validatePassword(registerData.password);
    if (passwordError) {
      setRegisterMessage(passwordError);
      return;
    }

    const userExistsError = await checkIfUserExists();
    if (userExistsError) {
      setRegisterMessage(userExistsError);
      return;
    }

    const data = {
      "username": registerData.name,
      "email": registerData.email,
      "emailVisibility": true,
      "password": registerData.password,
      "passwordConfirm": registerData.password,
    };
    
    try {
      const record = await pb.collection('Usuarios').create(data);
      if (record) {
        setRegisterMessage("Usuario registrado exitosamente.");
        console.log("Usuario registrado exitosamente:", record);
        
        



        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setRegisterMessage("Error al registrar el usuario. El nombre de usuario no es válido.");
      console.error("Error al registrar el usuario:", error);
    }
  };

  //Estado para la imagen de fondo
  const [backgroundImage, setBackgroundImage] = useState("");

  //Generar background aleatorio
  useEffect(() => {
    // Generar un número aleatorio entre 1 y 4
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    // Actualizar el estado con la ruta de la imagen aleatoria
    setBackgroundImage(`/bg-login/bg${randomNumber}.png`);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} // Fondo dinámico
    >
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
              <button
                  onClick={handleLogin}
                  className="w-full py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-lg"
              >
                Iniciar Sesión
              </button>
            </div>
            </form>
          )}

          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-2">
                <br />
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    maxLength={32}
                    placeholder="Tu nombre de usuario"
                    className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    id="register-email"
                    type="text"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    maxLength={255}
                    placeholder="usuario@ejemplo.com"
                    className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">Contraseña (Mínimo 8 caracteres)</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    maxLength={32}
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

              <button type="submit" className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg">Registrarse</button>

            </form>
          )}

          {activeTab === "register" && registerMessage && (
            <div className={`mt-4 p-4 text-center ${registerMessage.includes("exitosamente") ? "bg-green-500" : "bg-red-500"} text-white rounded-lg`}>
              {registerMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
