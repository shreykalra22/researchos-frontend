import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatPage from "./pages/ChatPage";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0a]">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        <ChatPage />
      </div>
    </div>
  );
}