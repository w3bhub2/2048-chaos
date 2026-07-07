import { motion } from "framer-motion";
import { memo } from "react";
import type { GameStatus } from "@/types";

interface OverlayProps {
  status: GameStatus;
  onKeepPlaying: () => void;
  onRestart: () => void;
}

const primaryButton =
  "rounded-xl border border-gold-soft bg-gold/15 px-5 py-2.5 text-sm font-semibold text-gold shadow-[0_0_18px_rgba(212,175,55,0.18)] transition hover:bg-gold/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50";

const secondaryButton =
  "rounded-xl border border-gold/25 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50";

function OverlayComponent({ status, onKeepPlaying, onRestart }: OverlayProps) {
  const won = status === "won";

  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 rounded-2xl border border-gold/20 bg-matte/85 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="alertdialog"
      aria-label={won ? "You won" : "Game over"}
    >
      <motion.h2
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.25 }}
        className="text-3xl font-bold text-gold"
      >
        {won ? "You win!" : "Game over"}
      </motion.h2>
      <p className="px-6 text-center text-sm text-slate-400">
        {won
          ? "You reached 2048. Keep going for an even higher score."
          : "No more moves are available."}
      </p>
      <div className="flex gap-3">
        {won && (
          <button type="button" onClick={onKeepPlaying} className={primaryButton}>
            Keep going
          </button>
        )}
        <button type="button" onClick={onRestart} className={secondaryButton}>
          {won ? "New game" : "Try again"}
        </button>
      </div>
    </motion.div>
  );
}

export const Overlay = memo(OverlayComponent);
