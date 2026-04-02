import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Check, Loader2, Save } from "lucide-react";

export const Editor: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteId, setNoteId] = useState<string | null>(null);
  const [isAutoSave, setIsAutoSave] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const saveNote = useCallback(async () => {
    if (!title && !content) return;
    setSaveStatus("saving");
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
      console.error("Failed to save note", error);
      setSaveStatus("idle");
    }
  }, [title, content, noteId]);

  useEffect(() => {
    if (!isAutoSave) return;
    if (!title && !content) return;

    setSaveStatus("saving");
    const timer = setTimeout(() => {
      saveNote();
    }, 1500);

    return () => clearTimeout(timer);
  }, [title, content, isAutoSave, saveNote]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-transparent flex flex-col pt-8 pb-16 relative">
      <div className="absolute top-2 right-2 text-xs text-vibe-muted flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isAutoSave}
            onChange={(e) => setIsAutoSave(e.target.checked)}
            className="w-3 h-3 accent-vibe-accent"
          />
          <span className="select-none text-white/50 hover:text-white/80 transition-colors">Auto-save</span>
        </label>
        
        {!isAutoSave && (
          <button
            onClick={saveNote}
            disabled={saveStatus === "saving"}
            className="flex items-center gap-1 bg-vibe-accent/20 hover:bg-vibe-accent/40 text-vibe-accent px-2 py-1 rounded transition-colors disabled:opacity-50"
          >
            <Save size={12} />
            <span>Save</span>
          </button>
        )}

        <div className="flex items-center gap-1 min-w-[60px] justify-end">
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
