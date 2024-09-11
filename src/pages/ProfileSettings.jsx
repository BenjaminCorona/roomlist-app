import { useState } from "react"
import { LogOut, Save } from "lucide-react"



export default function ProfileSettings() {
  const [username, setUsername] = useState("johndoe")
  const [email, setEmail] = useState("johndoe@example.com")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSave = (e) => {
    e.preventDefault()
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Profile Configuration</h1>
      <Separator />
      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Separator />
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center pt-4">
          <Button type="submit" className="w-32">
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button type="button" variant="destructive" className="w-32" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
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