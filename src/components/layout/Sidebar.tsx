import {
  MessageSquare,
  Database,
  FileText,
  Settings,
} from "lucide-react";

export default function Sidebar() {

  const menuItems = [
    {
      icon: MessageSquare,
      label: "Chat Workspace",
    },
    {
      icon: Database,
      label: "Knowledge Base",
    },
    {
      icon: FileText,
      label: "Documents",
    },
    {
      icon: Settings,
      label: "Settings",
    },
  ];

  return (

    <aside
      className="
        hidden
        lg:flex
        w-72
        border-r
        border-border
        bg-[#081225]
        flex-col
        p-6
      "
    >

      {/* LOGO */}

      <div className="mb-10">

        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
          "
        >
          ResearchOS
        </h1>

        <p
          className="
            text-sm
            text-gray-400
            mt-2
          "
        >
          Enterprise AI Research Workspace
        </p>

      </div>

      {/* NAVIGATION */}

      <nav className="space-y-3">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.label}
              className="
                w-full
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-2xl
                bg-secondary/40
                hover:bg-secondary
                transition
                text-left
              "
            >

              <Icon size={20} />

              <span
                className="
                  text-sm
                  font-medium
                "
              >
                {item.label}
              </span>

            </button>

          );

        })}

      </nav>

      {/* BOTTOM PANEL */}

      <div className="mt-auto">

        <div
          className="
            rounded-3xl
            border
            border-border
            bg-secondary/40
            p-5
          "
        >

          <h3
            className="
              font-semibold
              mb-2
            "
          >
            AI Workspace
          </h3>

          <p
            className="
              text-sm
              text-gray-400
              leading-relaxed
            "
          >
            Production-grade Retrieval
            Augmented Generation platform.
          </p>

        </div>

      </div>

    </aside>
  );
}