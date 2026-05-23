import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import type {
  ChatMessage,
} from "../../types/chat";

type Props = {
  message: ChatMessage;
};

export default function MessageBubble({
  message,
}: Props) {

  const isUser =
    message.role === "user";

  return (

    <div
      className={`
        flex
        ${isUser
          ? "justify-end"
          : "justify-start"}
      `}
    >

      <div
        className={`
          max-w-3xl
          px-5
          py-4
          rounded-2xl
          leading-7
          whitespace-pre-wrap
          shadow-md
          ${
            isUser
              ? "bg-primary text-white"
              : "bg-secondary border border-border text-gray-100"
          }
        `}
      >

        {/* MESSAGE CONTENT */}

        {isUser ? (

          <div>{message.content}</div>

        ) : (

          <div className="prose prose-invert max-w-none">

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >
              {message.content}
            </ReactMarkdown>

          </div>

        )}

        {/* SOURCES */}

        {!isUser &&
          message.sources &&
          message.sources.length > 0 && (

          <div className="mt-5 space-y-2">

            <div className="text-sm text-gray-400 font-medium">
              Sources
            </div>

            <div className="flex flex-wrap gap-2">

              {message.sources.map(
                (source, index) => (

                <div
                  key={index}
                  className="
                    text-xs
                    bg-background
                    border
                    border-border
                    px-3
                    py-2
                    rounded-lg
                  "
                >
                  {source.source}
                  {" "}
                  • Page {source.page_number}
                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}