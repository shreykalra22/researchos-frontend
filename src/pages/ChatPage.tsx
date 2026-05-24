import { useState, useRef, useEffect } from "react";
import EmptyState from "../components/EmptyState";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Simulate response — replace with real API call
    setTimeout(() => {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "I found relevant information in your documents. Based on the retrieved context, here is a grounded answer with citations from the indexed PDFs. This demonstrates the full-width layout working correctly across the entire viewport.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full h-full min-w-0 overflow-hidden">
      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto min-h-0 w-full">
        {messages.length === 0 ? (
          <EmptyState onPromptClick={(p) => { setInput(p); }} />
        ) : (
          <ChatWindow messages={messages} loading={loading} />
        )}
      </div>

      {/* Pinned input */}
      <div className="flex-shrink-0 w-full border-t border-[#1a1a1a] bg-[#0a0a0a]">
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}