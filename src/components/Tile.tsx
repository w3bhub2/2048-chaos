import { motion } from "framer-motion";
import { memo } from "react";
import type { Tile as TileType } from "@/types";
import { getTileFontSize, getTileStyle } from "@/utils/tileStyles";

interface TileProps {
  tile: TileType;
}

function TileComponent({ tile }: TileProps) {
  const style = getTileStyle(tile.value);
  const zIndex = tile.isMerged || tile.isNew ? 20 : 10;

  return (
    <motion.div
      layout
      className={`flex items-center justify-center rounded-xl font-bold tabular-nums ${getTileFontSize(tile.value)}`}
      style={{
        gridColumn: tile.col + 1,
        gridRow: tile.row + 1,
        background: style.background,
        color: style.color,
        boxShadow: style.boxShadow,
        zIndex,
      }}
      initial={tile.isNew ? { scale: 0, opacity: 0 } : false}
      animate={tile.isMerged ? { scale: [1, 1.18, 1] } : { scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{
        layout: { duration: 0.12, ease: "easeOut" },
        scale: { duration: 0.16, ease: "easeOut" },
      }}
      aria-hidden="true"
    >
      {tile.value}
    </motion.div>
  );
}

export const Tile = memo(TileComponent);
