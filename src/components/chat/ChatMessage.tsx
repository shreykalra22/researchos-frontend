import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({
  role,
  content,
}: Props) {

  const isUser = role === "user";

  return (

    <div
      className={`
        flex
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >

      <div
        className={`
          max-w-3xl
          px-6
          py-5
          rounded-3xl
          border
          shadow-sm
          ${
            isUser
              ? "bg-blue-500 border-blue-400 text-white"
              : "bg-secondary/50 border-border"
          }
        `}
      >

        <div
          className="
            text-sm
            leading-8
            prose
            prose-invert
            max-w-none
          "
        >

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>

        </div>

      </div>

    </div>
  );
}