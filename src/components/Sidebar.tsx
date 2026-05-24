import {
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Upload,
  MessageSquare,
  Settings,
  Bot,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const mockConversations = [
  { id: "1", title: "RAG pipeline architecture" },
  { id: "2", title: "Chunking strategies for PDFs" },
  { id: "3", title: "ChromaDB vs Pinecone" },
  { id: "4", title: "Mistral 7B performance" },
];

export default function Sidebar({ open, onToggle }: SidebarProps) {
  return (
    <>
      {/* Sidebar panel */}
      <aside
        style={{ width: open ? "256px" : "0px" }}
        className="flex-shrink-0 h-screen overflow-hidden transition-all duration-200 bg-[#111111] border-r border-[#1f1f1f] flex flex-col"
      >
        <div className="flex flex-col h-full w-[256px]">
          {/* Logo + collapse */}
          <div className="flex items-center justify-between px-4 py-[18px] border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <span className="font-semibold text-sm text-white tracking-tight">
                ResearchOS
              </span>
            </div>
            <button
              onClick={onToggle}
              className="text-neutral-500 hover:text-neutral-100 transition-colors p-1 rounded-md hover:bg-[#1f1f1f]"
            >
              <PanelLeftClose size={15} />
            </button>
          </div>

          {/* Actions */}
          <div className="px-3 py-3 space-y-1 border-b border-[#1f1f1f]">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors">
              <Plus size={15} />
              New chat
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-[#1a1a1a] text-sm transition-colors">
              <Upload size={15} />
              Upload PDF
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <p className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest px-2 mb-2">
              Recent
            </p>
            <div className="space-y-0.5">
              {mockConversations.map((c, i) => (
                <button
                  key={c.id}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                    i === 0
                      ? "bg-[#1a1a1a] text-neutral-100"
                      : "text-neutral-500 hover:text-neutral-200 hover:bg-[#161616]"
                  }`}
                >
                  <MessageSquare size={13} className="flex-shrink-0" />
                  <span className="truncate">{c.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-3 py-3 border-t border-[#1f1f1f]">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-[#1a1a1a] text-sm transition-colors">
              <Settings size={14} />
              Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Floating toggle when sidebar is closed */}
      {!open && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#111111] border border-[#1f1f1f] text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          <PanelLeftOpen size={15} />
        </button>
      )}
    </>
  );
}