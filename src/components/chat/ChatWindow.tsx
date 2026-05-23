import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ChatWindow({
  children,
}: Props) {

  const bottomRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [children]);

  return (

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

        {children}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}