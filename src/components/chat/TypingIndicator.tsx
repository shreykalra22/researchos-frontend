export default function TypingIndicator() {

  return (

    <div
      className="
        flex
        items-center
        gap-2
        px-5
        py-4
        rounded-3xl
        bg-secondary/50
        border
        border-border
        w-fit
      "
    >

      <div className="flex gap-1">

        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-100" />
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-200" />

      </div>

      <span className="text-sm text-gray-300">
        ResearchOS is thinking...
      </span>

    </div>
  );
}