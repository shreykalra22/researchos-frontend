import {
  Plus,
  Upload,
  FileText,
  Settings,
} from "lucide-react";

import { uploadPDF } from "../services/uploadApi";

export default function Sidebar() {

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    try {

      alert(
        "Uploading PDF..."
      );

      const result =
        await uploadPDF(file);

      console.log(result);

      alert(
        "PDF uploaded successfully!"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Upload failed."
      );

    }

  };

  return (

    <aside
      className="
        w-[260px]
        border-r
        border-white/10
        bg-black/30
        backdrop-blur-xl
        flex
        flex-col
        justify-between
      "
    >

      {/* TOP */}

      <div>

        {/* LOGO */}

        <div
          className="
            px-6
            py-6
            border-b
            border-white/10
          "
        >

          <h1
            className="
              text-xl
              font-bold
              text-white
            "
          >
            ResearchOS
          </h1>

          <p
            className="
              text-xs
              text-gray-400
              mt-1
            "
          >
            Enterprise AI Workspace
          </p>

        </div>

        {/* ACTIONS */}

        <div className="p-4 space-y-3">

          <button
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-500
              transition-all
            "
          >

            <Plus size={18} />

            New Chat

          </button>

          {/* UPLOAD */}

          <label
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              border
              border-white/10
              hover:bg-white/5
              transition-all
              cursor-pointer
            "
          >

            <Upload size={18} />

            Upload PDF

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleUpload}
            />

          </label>

        </div>

        {/* RECENT */}

        <div className="px-4 mt-6">

          <p
            className="
              text-xs
              uppercase
              text-gray-500
              mb-3
            "
          >
            Recent
          </p>

          <div className="space-y-2">

            {[
              "RAG pipeline architecture",
              "Chunking strategies for PDFs",
              "ChromaDB vs Pinecone",
              "Mistral 7B performance",
            ].map((item) => (

              <button
                key={item}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-white/5
                  text-sm
                  text-gray-300
                  transition-all
                "
              >

                <FileText size={15} />

                <span className="truncate">
                  {item}
                </span>

              </button>

            ))}

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div
        className="
          p-4
          border-t
          border-white/10
        "
      >

        <button
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            hover:bg-white/5
            transition-all
            text-gray-300
          "
        >

          <Settings size={18} />

          Settings

        </button>

      </div>

    </aside>
  );
}