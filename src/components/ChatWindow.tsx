import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";
import type { Message } from "../pages/ChatPage";

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
}

export default function ChatWindow({ messages, loading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="w-full px-4 py-6">
      <div className="w-full max-w-3xl mx-auto space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3 w-full">
            {/* Avatar */}
            <div className="flex-shrink-0 mt-0.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  msg.role === "user"
                    ? "bg-violet-600/20 border border-violet-500/20"
                    : "bg-[#1a1a1a] border border-[#2a2a2a]"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={14} className="text-violet-400" />
                ) : (
                  <Bot size={14} className="text-neutral-400" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-xs font-semibold text-neutral-500 mb-1.5">
                {msg.role === "user" ? "You" : "ResearchOS"}
              </p>
              <div className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap break-words">
                {msg.content}
              </div>
              <p className="text-[11px] text-neutral-700 mt-2">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Loading bubble */}
        {loading && (
          <div className="flex gap-3 w-full">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                <Bot size={14} className="text-neutral-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-xs font-semibold text-neutral-500 mb-1.5">ResearchOS</p>
              <div className="flex items-center gap-1.5 py-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-violet-500 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}