import {
  useEffect,
  useRef,
  useState,
} from "react";

import { askQuestion } from "../services/chatApi";

import SourceList from "../components/SourceList";

interface Source {
  page_number: number;
  source: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: Source[];
}

export default function ChatPage() {

  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  // ====================================================
  // AUTO SCROLL
  // ====================================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  // ====================================================
  // SEND MESSAGE
  // ====================================================

  const handleSend = async () => {

    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
    ]);

    const currentInput = input;

    setInput("");

    setLoading(true);

    try {

      const response = await askQuestion({
        query: currentInput,
        session_id: "research-session",
      });

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources || [],
      };

      setMessages((prev) => [
        ...prev,
        assistantMsg,
      ]);

    } catch (error) {

      console.error(error);

      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Failed to connect to backend.",
        timestamp: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        errorMsg,
      ]);

    } finally {

      setLoading(false);

    }

  };

  // ====================================================
  // UI
  // ====================================================

  return (

    <div
      className="
        flex
        flex-col
        h-screen
        bg-black
        text-white
      "
    >

      {/* CHAT AREA */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-6
          py-10
        "
      >

        <div
          className="
            max-w-4xl
            mx-auto
            space-y-8
          "
        >

          {messages.map((message) => (

            <div
              key={message.id}
              className={`
                flex
                ${message.role === "user"
                  ? "justify-end"
                  : "justify-start"}
              `}
            >

              <div
                className={`
                  max-w-2xl
                  rounded-2xl
                  px-5
                  py-4
                  text-sm
                  leading-7
                  border
                  whitespace-pre-wrap

                  ${message.role === "user"
                    ? `
                      bg-purple-600
                      border-purple-500
                      text-white
                    `
                    : `
                      bg-zinc-900
                      border-zinc-800
                      text-zinc-200
                    `
                  }
                `}
              >

                {message.content}

                {message.role === "assistant" &&
                 message.sources && (
                  <SourceList
                    sources={message.sources}
                  />
                )}

              </div>

            </div>

          ))}

          {loading && (

            <div className="flex justify-start">

              <div
                className="
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-2xl
                  px-5
                  py-4
                  text-zinc-400
                  text-sm
                "
              >
                Thinking...
              </div>

            </div>

          )}

          {/* AUTO SCROLL TARGET */}

          <div ref={messagesEndRef} />

        </div>

      </div>

      {/* INPUT */}

      <div
        className="
          border-t
          border-zinc-900
          p-4
          bg-black
        "
      >

        <div
          className="
            max-w-4xl
            mx-auto
            flex
            gap-3
          "
        >

          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask anything about your documents..."
            className="
              flex-1
              bg-zinc-900
              border
              border-zinc-800
              rounded-xl
              px-4
              py-3
              outline-none
              text-white
              placeholder:text-zinc-500
            "
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="
              px-6
              rounded-xl
              bg-purple-600
              hover:bg-purple-500
              transition
              text-white
              disabled:opacity-50
            "
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}