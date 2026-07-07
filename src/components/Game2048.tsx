import { useCallback, useRef, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { useGame2048 } from "@/hooks/useGame2048";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useSwipe } from "@/hooks/useSwipe";
import { Board } from "./Board";
import { Header } from "./Header";
import { ScorePanel } from "./ScorePanel";
import { Overlay } from "./Overlay";
import type { Direction } from "@/types";

type Action = Direction | "undo" | "restart";

export function Game2048() {
  const { tiles, score, best, status, canUndo, move, undo, restart, keepPlaying } = useGame2048();
  const boardRef = useRef<HTMLDivElement>(null);

  const handleAction = useCallback(
    (action: Action) => {
      if (action === "undo") undo();
      else if (action === "restart") restart();
      else move(action);
    },
    [undo, restart, move],
  );

  useKeyboard(handleAction);
  useSwipe(boardRef, move);

  const liveMessage =
    status === "won"
      ? "You reached 2048 and won the game."
      : status === "lost"
        ? "Game over. No more moves are available."
        : `Score: ${score}`;

  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-5 p-4 sm:p-6">
      <Header canUndo={canUndo} onUndo={undo} onRestart={restart} />

      <div className="flex gap-3">
        <ScorePanel label="Score" value={score} />
        <ScorePanel label="Best" value={best} />
      </div>

      <div className="relative">
        <Board tiles={tiles} boardRef={boardRef} />
        <AnimatePresence>
          {status !== "playing" && (
            <Overlay status={status} onKeepPlaying={keepPlaying} onRestart={restart} />
          )}
        </AnimatePresence>
      </div>

      <section
        aria-label="How to play"
        className="rounded-xl border border-gold/10 bg-white/[0.02] p-4 text-sm text-slate-400"
      >
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold/70">
          How to play
        </h2>
        <p className="leading-relaxed">
          Use <Kbd>Arrow keys</Kbd> or <Kbd>W A S D</Kbd> to move every tile. On touch devices,
          swipe to shift the board. Merge matching numbers to reach{" "}
          <span className="font-semibold text-gold">2048</span>.
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <Kbd>Z</Kbd> Undo
          <Kbd>R</Kbd> Restart
        </div>
      </section>

      <p className="sr-only" role="status" aria-live="polite">
        {liveMessage}
      </p>
    </main>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex items-center rounded-md border border-gold/25 bg-gold/[0.06] px-1.5 py-0.5 font-sans text-[11px] font-medium text-gold">
      {children}
    </kbd>
  );
}
