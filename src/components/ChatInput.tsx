import { useRef, type KeyboardEvent } from "react";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  loading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !loading) onSubmit();
    }
  };

  const canSend = value.trim().length > 0 && !loading;

  return (
    <div className="w-full px-4 py-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex items-end gap-2 w-full bg-[#111111] border border-[#1f1f1f] rounded-2xl px-3 py-2 focus-within:border-violet-500/40 transition-colors">
          {/* Attach */}
          <button
            type="button"
            className="flex-shrink-0 p-2 text-neutral-600 hover:text-violet-400 transition-colors rounded-lg hover:bg-[#1a1a1a]"
            title="Upload PDF"
          >
            <Paperclip size={17} />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask anything about your documents..."
            rows={1}
            className="flex-1 min-w-0 bg-transparent resize-none py-2 text-sm text-neutral-100 placeholder:text-neutral-700 focus:outline-none disabled:opacity-50 leading-relaxed"
            style={{ maxHeight: "180px" }}
          />

          {/* Send */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSend}
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
              canSend
                ? "bg-violet-600 hover:bg-violet-500 text-white"
                : "bg-[#1a1a1a] text-neutral-700 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={14} />
            )}
          </button>
        </div>

        <p className="text-center text-[11px] text-neutral-700 mt-2">
          Enter to send · Shift+Enter for new line · answers grounded in your documents
        </p>
      </div>
    </div>
  );
}