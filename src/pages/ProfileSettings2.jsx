import { useState } from 'react'
import { LucideSettings, LucideLogOut } from 'lucide-react'

export default function GoogleStyleProfileSettings() {
    const [username, setUsername] = useState('Usuario Google')
    const [email, setEmail] = useState('usuario@gmail.com')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [notifications, setNotifications] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [language, setLanguage] = useState('es')

    const handleSave = () => {
        console.log('Guardando cambios...')
    }

    const handleLogout = () => {
        console.log('Cerrando sesión...')
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Barra lateral */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <img src="/placeholder.svg?height=40&width=120" alt="RoomList Logo" className="mb-8" />
                    <nav>
                        {['Mi cuenta', 'Seguridad', 'Personas y compartir', 'Pagos y suscripciones', 'Privacidad'].map((item) => (
                            <button
                                key={item}
                                className="w-full justify-start text-gray-700 hover:bg-gray-100 mb-2 px-4 py-2 flex items-center"
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Configuración de la cuenta</h1>
                    <div className="relative h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {username.charAt(0)}
                    </div>
                </header>

                <div className="w-full max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md">
                    <div className="mb-6">
                        <h2 className="text-xl font-medium text-gray-800">Información personal y de contacto</h2>
                        <p className="text-gray-500">Administra tu información básica de contacto</p>
                    </div>

                    {/* Información básica */}
                    <div className="space-y-6">
                        <div className="border-b pb-4">
                            <h3 className="font-medium text-gray-700 mb-2">Información básica</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="mt-1 block w-full h-8 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full h-8 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contraseña y seguridad */}
                        <div className="border-b pb-4">
                            <h3 className="font-medium text-gray-700 mb-2">Contraseña y seguridad</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña anterior</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full h-8 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
                                    <input
                                        id="password2"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full h-8 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="mt-1 block w-full h-8 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preferencias */}
                        <div className="border-b pb-4">
                            <h3 className="font-medium text-gray-700 mb-2">Preferencias</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="notifications" className="block text-sm font-medium text-gray-700">Notificaciones</label>
                                    <input
                                        type="checkbox"
                                        id="notifications"
                                        checked={notifications}
                                        onChange={() => setNotifications(!notifications)}
                                        className="h-6 w-6 text-blue-500 rounded"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="darkMode" className="block text-sm font-medium text-gray-700">Modo oscuro</label>
                                    <input
                                        type="checkbox"
                                        id="darkMode"
                                        checked={darkMode}
                                        onChange={() => setDarkMode(!darkMode)}
                                        className="h-6 w-6 text-blue-500 rounded"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">Idioma</label>
                                    <select
                                        id="language"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="es">Español</option>
                                        <option value="en">English</option>
                                        <option value="fr">Français</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                        <button onClick={handleSave} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                            Guardar cambios
                        </button>
                        <button onClick={handleLogout} className="text-gray-700 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                            <LucideLogOut className="inline-block mr-2" /> Cerrar sesión
                        </button>
                    </div>
                </div>

                <footer className="mt-12 text-center text-sm text-gray-500">
                    <p>© 2024 RoomList</p>
                    <div className="mt-2">
                        <a href="#" className="text-blue-500 hover:underline mr-4">Privacidad</a>
                        <a href="#" className="text-blue-500 hover:underline mr-4">Términos</a>
                        <a href="#" className="text-blue-500 hover:underline">Ayuda</a>
                    </div>
                </footer>
            </div>
        </div>
    )
}
