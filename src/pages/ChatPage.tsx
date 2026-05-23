import { useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import MessageBubble from "../components/chat/MessageBubble";

import { sendChatMessage } from "../api/chatApi";

import type {
  ChatMessage,
} from "../types/chat";

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

    // Prevent empty message
    if (!question.trim()) return;

    // Prevent request spam
    if (loading) return;

    const currentQuestion =
      question.trim();

    // ==========================================
    // USER MESSAGE
    // ==========================================

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

      // ==========================================
      // API REQUEST
      // ==========================================

      const response =
        await sendChatMessage({
          query: currentQuestion,
          session_id: "frontend-demo",
        });

      // ==========================================
      // ASSISTANT MESSAGE
      // ==========================================

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
        flex
        flex-col
        h-screen
        bg-background
        text-white
      "
    >

      {/* HEADER */}

      <div
        className="
          border-b
          border-border
          px-6
          py-4
          text-xl
          font-semibold
        "
      >
        ResearchOS AI Workspace
      </div>

      {/* CHAT AREA */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-6
          py-6
        "
      >

        <div
          className="
            max-w-4xl
            mx-auto
            space-y-6
          "
        >

          {/* CHAT MESSAGES */}

          {messages.map((message) => (

            <MessageBubble
              key={message.id}
              message={message}
            />

          ))}

          {/* LOADING MESSAGE */}

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

          {/* AUTO SCROLL TARGET */}

          <div ref={bottomRef} />

        </div>

      </div>

      {/* INPUT AREA */}

      <div
        className="
          border-t
          border-border
          p-6
        "
      >

        <div
          className="
            max-w-4xl
            mx-auto
            flex
            gap-4
          "
        >

          {/* INPUT */}

          <input
            value={question}
            disabled={loading}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !loading
              ) {
                handleAsk();
              }

            }}
            placeholder="Ask anything about your documents..."
            className="
              flex-1
              px-5
              py-4
              rounded-2xl
              bg-secondary
              border
              border-border
              outline-none
              disabled:opacity-50
            "
          />

          {/* BUTTON */}

          <button
            onClick={handleAsk}
            disabled={loading}
            className="
              px-6
              py-4
              rounded-2xl
              bg-primary
              hover:opacity-90
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Thinking..."
              : "Send"}
          </button>

        </div>

      </div>

    </div>
  );
}