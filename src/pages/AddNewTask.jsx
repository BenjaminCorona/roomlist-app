import { useState } from 'react'
import { Lock, Bell, Folder, Hash, Target, CheckCircle2, Trash2, X } from 'lucide-react'

export default function AddNewTask() {
  const [open, setOpen] = useState(true)
  const [subtasks, setSubtasks] = useState([
    { id: 1, text: 'Identify key findings from the report', completed: false },
    { id: 2, text: 'Analyze the implications of those findings', completed: false },
    { id: 3, text: 'Develop action plans based on the findings', completed: false },
  ])

  const addSubtask = () => {
    const newSubtask = { id: subtasks.length + 1, text: 'Add a new subtask', completed: false }
    setSubtasks([...subtasks, newSubtask])
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${open ? 'visible' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Lock className="h-4 w-4 mr-2" />
            My lists &gt; Personal
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => {}} className="p-1">
              <Target className="h-4 w-4" />
            </button>
            <button onClick={() => {}} className="p-1">
              <CheckCircle2 className="h-4 w-4" />
            </button>
            <button onClick={() => {}} className="p-1">
              <Trash2 className="h-4 w-4" />
            </button>
            <button onClick={() => setOpen(false)} className="p-1">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <input 
          type="text" 
          placeholder="Make next steps based on important report" 
          className="w-full p-2 mb-4 border border-gray-300 rounded text-lg font-bold"
        />

        <div className="flex space-x-2 mb-4">
          <button className="flex items-center justify-center p-2 border border-red-500 text-red-500 rounded">
            <Bell className="h-4 w-4 mr-2" />
            Remind me
          </button>
          <button className="flex items-center justify-center p-2 border border-yellow-500 text-yellow-500 rounded">
            <Folder className="h-4 w-4 mr-2" />
            Personal
          </button>
          <button className="flex items-center justify-center p-2 border border-blue-500 text-blue-500 rounded">
            <Hash className="h-4 w-4 mr-2" />
            Tags
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">NOTES</h3>
          <textarea placeholder="Insert your notes here" className="w-full p-2 border border-gray-300 rounded min-h-[100px]"></textarea>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">SUBTASKS</h3>
            <button onClick={addSubtask} className="px-2 py-1 border border-gray-300 rounded text-sm">
              + Suggest
            </button>
          </div>
          <ul className="space-y-2">
            {subtasks.map((subtask) => (
              <li key={subtask.id} className="flex items-center space-x-2">
                <input type="checkbox" id={`subtask-${subtask.id}`} />
                <label htmlFor={`subtask-${subtask.id}`} className="text-sm">
                  {subtask.text}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">ATTACHMENTS</h3>
          <div className="border-2 border-dashed rounded-md p-4 text-center text-gray-500">
            Click to add / drop your files here
          </div>
        </div>
      </div>
    </div>
  )
}
