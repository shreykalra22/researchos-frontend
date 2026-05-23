import { useState } from "react";

import {
  sendChatMessage,
} from "../api/chatApi";

export default function ChatPage() {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleAsk() {

    if (!question.trim()) return;

    try {

      setLoading(true);

      const response =
        await sendChatMessage({
          query: question,
          session_id: "frontend-demo",
        });

      setAnswer(
        response.data.answer
      );

    } catch (error) {

      console.error(error);

      setAnswer(
        "Failed to connect to backend."
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 px-6">

      <h1 className="text-4xl font-bold">
        ResearchOS AI Workspace
      </h1>

      <div className="w-full max-w-2xl flex gap-3">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Ask anything about your documents..."
          className="
            flex-1
            px-4
            py-3
            rounded-xl
            bg-secondary
            border
            border-border
            text-white
            outline-none
          "
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="
            px-6
            py-3
            rounded-xl
            bg-primary
            hover:opacity-90
            transition
          "
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

      </div>

      {answer && (
        <div
          className="
            w-full
            max-w-2xl
            p-6
            rounded-2xl
            bg-secondary
            border
            border-border
            text-gray-200
            leading-7
          "
        >
          {answer}
        </div>
      )}

    </div>
  );
}