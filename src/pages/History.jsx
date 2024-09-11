import { useState } from "react"

// Datos de ejemplo
const activityData = [
  {
    id: 1,
    user: { name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
    action: "added",
    task: "Create wireframes for new project",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    user: { name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
    action: "completed",
    task: "Review client feedback",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    user: { name: "Charlie", avatar: "/placeholder.svg?height=32&width=32" },
    action: "modified",
    task: "Update project timeline",
    timestamp: "3 hours ago",
  },
  {
    id: 4,
    user: { name: "Diana", avatar: "/placeholder.svg?height=32&width=32" },
    action: "added",
    task: "Schedule team meeting",
    timestamp: "Yesterday",
  },
  {
    id: 5,
    user: { name: "Ethan", avatar: "/placeholder.svg?height=32&width=32" },
    action: "completed",
    task: "Prepare presentation slides",
    timestamp: "2 days ago",
  },
]

export default function History() {
  const [filter, setFilter] = useState("All activity")

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Activity History</h1>
        <DropdownMenu filter={filter} setFilter={setFilter} />
      </header>
      <ul className="space-y-4">
        {activityData.map((item) => (
          <li key={item.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-md transition-colors">
            <Avatar src={item.user.avatar} alt={item.user.name} fallback={item.user.name.charAt(0)} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {item.user.name}{" "}
                <span className="font-normal text-gray-500">{item.action} the task:</span>
              </p>
              <p className="text-sm text-gray-500 truncate">{item.task}</p>
            </div>
            <div className="flex items-center">
              {item.action === "added" && (
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )}
              {item.action === "completed" && (
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {item.action === "modified" && (
                <svg className="h-5 w-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v4h16V4m0 0l-8 8-8-8m16 16V8m0 0L12 12M4 8v12h16" />
                </svg>
              )}
              <span className="text-xs text-gray-400">{item.timestamp}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}



// Componentes auxiliares
function Avatar({ src, alt, fallback }) {
    return (
      <div className="relative h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {src ? (
          <img src={src} alt={alt} className="object-cover h-full w-full" />
        ) : (
          <span className="text-gray-500">{fallback}</span>
        )}
      </div>
    )
  }
  
  function DropdownMenu({ filter, setFilter }) {
    const [isOpen, setIsOpen] = useState(false)
  
    const toggleDropdown = () => setIsOpen(!isOpen)
  
    return (
      <div className="relative">
        <button
          className="border px-4 py-2 rounded-md flex items-center"
          onClick={toggleDropdown}
        >
          {filter}
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <ul className="absolute bg-white border mt-2 rounded-md shadow-lg w-48">
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setFilter("All activity")
                setIsOpen(false)
              }}
            >
              All activity
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setFilter("Added tasks")
                setIsOpen(false)
              }}
            >
              Added tasks
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setFilter("Completed tasks")
                setIsOpen(false)
              }}
            >
              Completed tasks
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setFilter("Modified tasks")
                setIsOpen(false)
              }}
            >
              Modified tasks
            </li>
          </ul>
        )}
      </div>
    )
  }