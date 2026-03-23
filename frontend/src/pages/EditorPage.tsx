import React from "react";
import { Editor } from "../components/Editor";
import { Navbar } from "../components/Navbar";

export const EditorPage: React.FC = () => {
  return (
    <div className="h-screen w-full bg-[#1e1e1e] text-[#d4d4d4] flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-[800px] mx-auto w-full px-6 md:px-12 h-full">
          <Editor />
        </div>
      </main>
    </div>
  );
};
