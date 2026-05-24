interface Source {
  page_number: number;
  source: string;
}

interface Props {
  sources: Source[];
}

export default function SourceList({
  sources,
}: Props) {

  if (!sources.length) return null;

  return (

    <div className="mt-4 space-y-2">

      <p
        className="
          text-xs
          uppercase
          tracking-wider
          text-zinc-500
        "
      >
        Sources
      </p>

      <div className="flex flex-wrap gap-2">

        {sources.map((source, index) => (

          <div
            key={index}
            className="
              px-3
              py-2
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              text-xs
              text-zinc-300
            "
          >

            📄 {source.source}

            <span className="text-zinc-500">
              {" "}
              — Page {source.page_number}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}