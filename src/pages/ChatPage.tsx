import Sidebar from "../components/layout/Sidebar";

import { useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import MessageBubble from "../components/chat/MessageBubble";

import { sendChatMessage } from "../api/chatApi";

import type { ChatMessage } from "../types/chat";

export default function ChatPage() {

  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const bottomRef =
    useRef<HTMLDivElement | null>(null);

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  async function handleAsk() {

    if (!question.trim()) return;

    if (loading) return;

    const currentQuestion =
      question.trim();

    // USER MESSAGE

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: currentQuestion,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setQuestion("");

    try {

      setLoading(true);

      const response =
        await sendChatMessage({
          query: currentQuestion,
          session_id: "frontend-demo",
        });

      // ASSISTANT MESSAGE

      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content:
          response.data.answer,
        sources:
          response.data.sources,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

    } catch (error) {

      console.error(error);

      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content:
          "Failed to connect to backend.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);

    } finally {

      setLoading(false);
    }
  }

  // ==========================================
  // UI
  // ==========================================

  return (

    <div
      className="
        h-screen
        bg-background
        text-white
        flex
        overflow-hidden
      "
    >

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div
        className="
          flex-1
          flex
          flex-col
        "
      >

        {/* HEADER */}

        <header
          className="
            border-b
            border-border
            px-8
            py-5
            backdrop-blur-md
            bg-background/90
          "
        >

          <div
            className="
              max-w-4xl
              mx-auto
              w-full
            "
          >

            <h1
              className="
                text-2xl
                font-bold
              "
            >
              AI Research Chat
            </h1>

            <p
              className="
                text-gray-400
                mt-1
              "
            >
              Conversational Retrieval-Augmented Generation
            </p>

          </div>

        </header>

        {/* CHAT AREA */}

        <main
          className="
            flex-1
            overflow-y-auto
          "
        >

          <div
            className="
              max-w-4xl
              mx-auto
              px-6
              py-10
              space-y-8
            "
          >

            {/* EMPTY STATE */}

            {messages.length === 0 && (

              <div
                className="
                  text-center
                  mt-24
                "
              >

                <h2
                  className="
                    text-5xl
                    font-bold
                    mb-5
                    tracking-tight
                  "
                >
                  ResearchOS
                </h2>

                <p
                  className="
                    text-gray-400
                    text-lg
                  "
                >
                  Ask questions across your enterprise documents.
                </p>

              </div>

            )}

            {/* CHAT MESSAGES */}

            {messages.map((message) => (

              <MessageBubble
                key={message.id}
                message={message}
              />

            ))}

            {/* THINKING */}

            {loading && (

              <div className="flex justify-start">

                <div
                  className="
                    bg-secondary
                    border
                    border-border
                    px-5
                    py-4
                    rounded-2xl
                    animate-pulse
                  "
                >
                  Thinking...
                </div>

              </div>

            )}

            <div ref={bottomRef} />

          </div>

        </main>

        {/* INPUT */}

        <footer
          className="
            border-t
            border-border
            bg-background/90
            backdrop-blur-md
            px-6
            py-5
          "
        >

          <div
            className="
              max-w-4xl
              mx-auto
              flex
              gap-4
              items-end
            "
          >

            <textarea
              value={question}
              disabled={loading}
              rows={1}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !loading
                ) {

                  e.preventDefault();

                  handleAsk();
                }

              }}
              placeholder="Ask anything about your documents..."
              className="
                flex-1
                resize-none
                px-5
                py-4
                rounded-2xl
                bg-secondary
                border
                border-border
                outline-none
                focus:border-primary
                transition
                min-h-[60px]
              "
            />

            <button
              onClick={handleAsk}
              disabled={loading}
              className="
                px-7
                py-4
                rounded-2xl
                bg-primary
                hover:opacity-90
                transition
                font-medium
              "
            >
              {loading
                ? "Thinking..."
                : "Send"}
            </button>

          </div>

        </footer>

      </div>

    </div>
  );
}