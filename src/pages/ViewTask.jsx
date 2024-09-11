import { useState } from 'react'
import { Pencil, Link, MoreHorizontal, X } from 'lucide-react'

export default function ViewTask() {
  const [open, setOpen] = useState(true)

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'} bg-gray-900 bg-opacity-50`}>
      <div className="relative mx-auto mt-20 max-w-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        {/* Dialog Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Bug with context menu in script editor in different browsers #1043
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
              <Pencil className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
              <Link className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Main Content */}
          <div className="flex-grow p-6 overflow-y-auto">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-300">JD</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Jonh32</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">opened 3 weeks ago</span>
                </div>
                <p className="mt-2">
                  Bug with context menu in script editor in different browsers.
                  <br /><br />
                  In firefox browser does not work correctly
                  <br /><br />
                  Script editor:
                </p>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-mono">2024-08-22.13-12-52.mp4</div>
              <div className="bg-gray-900 h-80 flex items-center justify-center">
                <span className="text-gray-400">Video preview placeholder</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Assignees</h3>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-300">BC</span>
                </div>
                <span className="text-sm">BenjaminCorona</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Labels</h3>
              <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 py-1 px-2 rounded-full text-xs">bug</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Projects</h3>
              <div className="flex items-center space-x-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
                <span className="text-sm">Workflow</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Status</h3>
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-800">
                <option value="in-progress">In Progress</option>
                <option value="todo">To Do</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Target date', value: 'No date' },
                { label: 'Start date', value: 'No date' },
                { label: 'Review week', value: 'Choose an iteration' },
                { label: 'Finish date', value: 'No date' },
                { label: 'Start week', value: 'Choose an iteration' },
                { label: 'QA Reviewer', value: 'Filter options' },
                { label: 'Detection day', value: 'No date' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
