import { ArrowLeft, Plus } from "lucide-react"


export default function CreateJoinRoom() {
  return (
    <div className="flex h-screen bg-[#616161] p-6">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl overflow-hidden flex">
        {/* Left side - Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <header className="flex items-center mb-8">
            <button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-500">3/4 Workspace</span>
          </header>

          {/* Main content */}
          <main>
            <h1 className="text-2xl font-bold mb-2">Join your company on Acme!</h1>
            <p className="text-gray-500 mb-6">These workspaces allow anyone from @onecol.co to join:</p>

            {/* Workspace options */}
            <div className="space-y-4">
              <WorkspaceOption
                name="One Collective GmbH"
                members={18}
                icon="O"
                iconBg="bg-gray-900"
              />
              <WorkspaceOption
                name="Personal Space"
                members={2}
                icon="PS"
                iconBg="bg-purple-200"
                iconColor="text-purple-600"
              />
              <button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create New Workspace
              </button>
            </div>
          </main>
        </div>

        {/* Right side - Testimonial */}
        <div className="w-1/3 bg-[#0c2a2a] p-8 flex flex-col justify-end text-white">
          <blockquote className="mb-4">
            "I used Acme because I knew they could deliver what I needed...someone who had a robust portfolio and someone who specialized in producing massive, open online education courses."
          </blockquote>
          <cite className="text-sm">Georgianna, PhD</cite>
        </div>
      </div>
    </div>
  )
}

function WorkspaceOption({ name, members, icon, iconBg, iconColor = "text-white" }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <div className={`w-10 h-10 ${iconBg} ${iconColor} rounded-md flex items-center justify-center font-bold mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{members} Members</p>
        </div>
      </div>
      <button variant="default" className="bg-[#0c2a2a] hover:bg-[#0a2424]">
        Join
      </button>
    </div>
  )
}