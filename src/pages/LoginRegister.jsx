import { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';
import swal from 'sweetalert';

const pb = new PocketBase('https://roomlist.pockethost.io');

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Mostrar/ocultar contraseña
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
                  className={`w-1/2 py-2 text-center ${activeTab === "login" ? "border-b-2 border-blue-500" : ""}`}
                  onClick={() => setActiveTab("login")}
              >
                Iniciar Sesión
              </button>
              <button
                  className={`w-1/2 py-2 text-center ${activeTab === "register" ? "border-b-2 border-blue-500" : ""}`}
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
          </div>
        </div>
      </div>
  );
}
