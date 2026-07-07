import { memo } from "react";

interface HeaderProps {
  canUndo: boolean;
  onUndo: () => void;
  onRestart: () => void;
}

const iconButton =
  "flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 text-gold/90 transition-colors hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gold/5 disabled:hover:text-gold/90";

function HeaderComponent({ canUndo, onUndo, onRestart }: HeaderProps) {
  return (
    <header className="flex items-end justify-between gap-4">
      <div>
        <h1 className="bg-gradient-to-br from-gold to-gold-soft bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          2048
        </h1>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold/70">
          Chaos Edition
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Undo last move"
          className={iconButton}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h11a5 5 0 0 1 0 10h-1" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onRestart}
          aria-label="Start a new game"
          className={iconButton}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
