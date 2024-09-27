import { useState } from 'react'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const navigate = useNavigate();

  const navigateCreateJoinRoom = () => {
    navigate('/create-join-room');
  }
  
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
                    <input id="email" type="email" placeholder="usuario@ejemplo.com" className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4b5563]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input  
                      id="password"
                      type={showPassword ? "text" : "password"}
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
              <button onClick={navigateCreateJoinRoom} className="w-full mt-6 bg-[#4b5563] text-white py-2 rounded-lg">Iniciar Sesión</button>
            </form>
          )}
          {activeTab === "register" && (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <br />
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input id="name" placeholder="Juan Ramírez" className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4b5563]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email-register" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input id="email-register" type="email" placeholder="usuario@ejemplo.com" className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4b5563]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password-register" className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      id="password-register"
                      type={showPassword ? "text" : "password"}
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
