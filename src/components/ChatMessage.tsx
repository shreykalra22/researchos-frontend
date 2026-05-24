import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { motion } from "framer-motion";

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

    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        flex
        w-full
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >

      <div
        className={`
          max-w-3xl
          px-5
          py-4
          rounded-3xl
          shadow-lg
          border
          backdrop-blur-xl
          transition-all

          ${
            isUser
              ? `
                bg-blue-600
                border-blue-500
                text-white
              `
              : `
                bg-[#0f172a]
                border-slate-800
                text-slate-100
              `
          }
        `}
      >

        <div
          className="
            prose
            prose-invert
            max-w-none
            prose-p:leading-relaxed
            prose-pre:bg-black/40
            prose-pre:border
            prose-pre:border-slate-700
            prose-code:text-blue-300
          "
        >

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>

        </div>

      </div>

    </motion.div>
  );
}