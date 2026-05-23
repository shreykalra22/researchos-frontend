import {
  useState,
} from "react";

import { v4 as uuidv4 } from "uuid";

import Sidebar from "../components/layout/Sidebar";

import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import EmptyState from "../components/chat/EmptyState";
import TypingIndicator from "../components/chat/TypingIndicator";

import { askQuestion } from "../services/chatApi";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {

  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const sessionId = "frontend-demo";

  // ====================================================
  // SEND MESSAGE
  // ====================================================

  const handleSend = async () => {

    if (!input.trim() || loading) {
      return;
    }

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentInput = input;

    setInput("");

    setLoading(true);

    try {

      const response = await askQuestion({
        query: currentInput,
        session_id: sessionId,
      });

      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: response.answer,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

    } catch (error) {

      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content:
          "Failed to connect to backend.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);

      console.error(error);

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
        h-screen
        bg-[#020817]
        text-white
        overflow-hidden
      "
    >

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CHAT AREA */}

      <main
        className="
          flex-1
          flex
          flex-col
          overflow-hidden
        "
      >

        {/* HEADER */}

        <header
          className="
            border-b
            border-border
            px-10
            py-6
            bg-primary/80
            backdrop-blur-xl
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
              text-sm
              text-gray-400
              mt-1
            "
          >
            Conversational Retrieval-Augmented Generation
          </p>

        </header>

        {/* CHAT CONTENT */}

        {messages.length === 0 ? (

          <div className="flex-1">

            <EmptyState />

          </div>

        ) : (

          <ChatWindow>

            {messages.map((message) => (

              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
              />

            ))}

            {loading && (
              <TypingIndicator />
            )}

          </ChatWindow>

        )}

        {/* INPUT */}

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
          loading={loading}
        />

      </main>

    </div>
  );
}