import { useEffect } from "react";

export function useClearShortcut(callback: () => void) {
  useEffect(() => {
    const handleLockEvent = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key == "Delete") {
        callback();
      }
    };

    window.addEventListener("keydown", handleLockEvent);
    return () => window.removeEventListener("keydown", handleLockEvent);
  }, []);
}
