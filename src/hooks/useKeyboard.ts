import { useEffect, useRef } from "react";
import type { Direction } from "@/types";

export type KeyAction = Direction | "undo" | "restart";

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
  W: "up",
  S: "down",
  A: "left",
  D: "right",
};

export function useKeyboard(onAction: (_action: KeyAction) => void): void {
  const onActionRef = useRef(onAction);

  // Update ref without causing effect re-run
  useEffect(() => {
    onActionRef.current = onAction;
  }, [onAction]);

  // Attach listener once; it uses stable ref to callback
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      const direction = KEY_MAP[event.key];
      if (direction) {
        event.preventDefault();
        onActionRef.current(direction);
        return;
      }
      if (event.key === "z" || event.key === "Z") {
        event.preventDefault();
        onActionRef.current("undo");
      } else if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        onActionRef.current("restart");
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []); // Empty deps: listener attached once, never re-attached
}
