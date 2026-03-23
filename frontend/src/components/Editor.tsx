import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check, Loader2 } from "lucide-react";

export const Editor: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteId, setNoteId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  useEffect(() => {
    if (!title && !content) return;

    setSaveStatus("saving");
    const timer = setTimeout(async () => {
      try {
        const payload = {
          _id: noteId || undefined,
          title,
          content,
        };
        const token = localStorage.getItem("token");
        const response = await axios.post("/api/notes/save", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success && response.data.note) {
          if (!noteId) {
            setNoteId(response.data.note._id);
          }
          setSaveStatus("saved");
        }
      } catch (error) {
        console.error("Failed to auto-save note", error);
        setSaveStatus("idle");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [title, content, noteId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-transparent flex flex-col pt-8 pb-16 relative">
      <div className="absolute top-2 right-2 text-xs text-vibe-muted flex items-center gap-1">
        {saveStatus === "saving" && (
          <>
            <Loader2 size={12} className="animate-spin" />
            <span>Saving...</span>
          </>
        )}
        {saveStatus === "saved" && (
          <>
            <Check size={12} className="text-vibe-accent" />
            <span>Saved</span>
          </>
        )}
      </div>
      <input
        type="text"
        className="w-full bg-transparent text-vibe-text placeholder-vibe-muted/40 border-none outline-none text-4xl font-extrabold mb-8 font-sans tracking-tight"
        placeholder="Untitled Note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="flex-1 w-full bg-transparent text-vibe-text placeholder-vibe-muted/40 resize-none outline-none border-none text-lg overflow-y-auto font-sans leading-relaxed"
        placeholder="Start writing..."
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};
