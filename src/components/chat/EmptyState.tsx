import {
  Sparkles,
  BrainCircuit,
  Database,
} from "lucide-react";

export default function EmptyState() {

  const features = [
    {
      icon: Sparkles,
      title: "Semantic Search",
      description:
        "Search across enterprise documents intelligently.",
    },
    {
      icon: BrainCircuit,
      title: "Conversational AI",
      description:
        "Ask contextual follow-up questions naturally.",
    },
    {
      icon: Database,
      title: "Knowledge Retrieval",
      description:
        "Grounded responses powered by vector search.",
    },
  ];

  return (

    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        h-full
        text-center
        px-6
      "
    >

      <div className="max-w-3xl">

        <h1
          className="
            text-5xl
            font-bold
            mb-5
          "
        >
          ResearchOS
        </h1>

        <p
          className="
            text-gray-400
            text-lg
            mb-12
          "
        >
          Enterprise Retrieval-Augmented Generation Workspace
        </p>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          {features.map((feature) => {

            const Icon = feature.icon;

            return (

              <div
                key={feature.title}
                className="
                  p-6
                  rounded-3xl
                  border
                  border-border
                  bg-secondary/40
                  text-left
                "
              >

                <Icon
                  className="
                    mb-4
                    text-blue-400
                  "
                  size={28}
                />

                <h3
                  className="
                    font-semibold
                    mb-2
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-400
                    leading-relaxed
                  "
                >
                  {feature.description}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
}