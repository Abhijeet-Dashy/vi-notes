import React, { useEffect, useState } from "react";
import { User } from "lucide-react";

export const Navbar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <nav className="w-full h-14 border-b border-vibe-border/50 bg-vibe-bg flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-vibe-accent flex items-center justify-center font-bold text-white text-xs">
          V
        </div>
        <span className="font-semibold text-vibe-text tracking-wide">
          ViNotes
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-vibe-muted hover:text-vibe-text transition-colors cursor-default">
          <User size={16} />
          <span className="font-medium">{username || "Guest"}</span>
        </div>
      </div>
    </nav>
  );
};
