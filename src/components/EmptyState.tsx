import { Bot, Zap, FileSearch, BrainCircuit, BookOpen } from "lucide-react";

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

const suggestions = [
  {
    icon: FileSearch,
    label: "Summarize document",
    prompt: "Summarize the key findings from the uploaded document.",
  },
  {
    icon: BrainCircuit,
    label: "Extract insights",
    prompt: "What are the main insights and conclusions from these papers?",
  },
  {
    icon: BookOpen,
    label: "Explain concepts",
    prompt: "Explain the core methodology described in the document.",
  },
  {
    icon: Zap,
    label: "Compare sources",
    prompt: "Compare and contrast the approaches discussed across documents.",
  },
];

export default function EmptyState({ onPromptClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[calc(100vh-120px)] px-6 py-12">
      {/* Hero */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#222222] flex items-center justify-center mb-5 shadow-lg">
          <Bot size={28} className="text-violet-400" />
        </div>
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">
          ResearchOS
        </h1>
        <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
          Upload a PDF and ask questions. Every answer is grounded in your
          documents with source citations.
        </p>
      </div>

      {/* Suggestion cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xl">
        {suggestions.map((s) => (
          <button
            key={s.label}
            onClick={() => onPromptClick(s.prompt)}
            className="group flex flex-col gap-2 p-4 rounded-xl bg-[#111111] border border-[#1f1f1f] hover:border-violet-500/30 hover:bg-[#141414] text-left transition-all duration-150"
          >
            <s.icon
              size={16}
              className="text-neutral-500 group-hover:text-violet-400 transition-colors"
            />
            <div>
              <p className="text-xs font-medium text-neutral-300 mb-0.5">
                {s.label}
              </p>
              <p className="text-[11px] text-neutral-600 leading-relaxed line-clamp-2">
                {s.prompt}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}