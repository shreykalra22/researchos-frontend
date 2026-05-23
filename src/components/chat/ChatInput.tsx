import {
  Send,
} from "lucide-react";

interface Props {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  loading: boolean;
}

export default function ChatInput({
  input,
  setInput,
  onSend,
  loading,
}: Props) {

  return (

    <div
      className="
        sticky
        bottom-0
        bg-primary/80
        backdrop-blur-xl
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

        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !loading
            ) {
              onSend();
            }
          }}
          placeholder="Ask anything about your documents..."
          className="
            flex-1
            h-14
            rounded-2xl
            border
            border-border
            bg-secondary/50
            px-5
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        <button
          onClick={onSend}
          disabled={loading}
          className="
            h-14
            px-7
            rounded-2xl
            bg-blue-500
            hover:bg-blue-600
            transition
            disabled:opacity-50
            flex
            items-center
            gap-2
            font-medium
          "
        >

          <Send size={18} />

          Send

        </button>

      </div>

    </div>
  );
}