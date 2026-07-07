import { useEffect, useRef, type RefObject } from "react";
import type { Direction } from "@/types";
import { SWIPE_THRESHOLD } from "@/constants";

export function useSwipe<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onSwipe: (_direction: Direction) => void,
  threshold = SWIPE_THRESHOLD,
): void {
  const onSwipeRef = useRef(onSwipe);

  // Update ref without causing effect re-run
  useEffect(() => {
    onSwipeRef.current = onSwipe;
  }, [onSwipe]);

  // Attach listeners once; they use stable ref to callback
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const handleStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      tracking = true;
    };

    const handleEnd = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (Math.max(absX, absY) < threshold) return;

      if (absX > absY) {
        onSwipeRef.current(deltaX > 0 ? "right" : "left");
      } else {
        onSwipeRef.current(deltaY > 0 ? "down" : "up");
      }
    };

    element.addEventListener("touchstart", handleStart, { passive: true });
    element.addEventListener("touchend", handleEnd, { passive: true });
    return () => {
      element.removeEventListener("touchstart", handleStart);
      element.removeEventListener("touchend", handleEnd);
    };
  }, [ref, threshold]); // Re-run only if ref or threshold changes, not onSwipe
}
