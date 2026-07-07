import { motion } from "framer-motion";
import { memo } from "react";

interface ScorePanelProps {
  label: string;
  value: number;
}

function ScorePanelComponent({ label, value }: ScorePanelProps) {
  return (
    <div className="flex min-w-[92px] flex-1 flex-col items-center rounded-xl border border-gold/15 bg-gold/[0.04] px-4 py-2.5 backdrop-blur-md">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/70">
        {label}
      </span>
      <motion.span
        key={value}
        initial={{ scale: 1.18, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="text-2xl font-bold tabular-nums text-white"
      >
        {value}
      </motion.span>
    </div>
  );
}

export const ScorePanel = memo(ScorePanelComponent);
