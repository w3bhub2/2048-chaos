import { AnimatePresence } from "framer-motion";
import { memo, type RefObject } from "react";
import type { Tile as TileType } from "@/types";
import { GRID_SIZE } from "@/constants";
import { Tile } from "./Tile";

interface BoardProps {
  tiles: TileType[];
  boardRef: RefObject<HTMLDivElement | null>;
}

function BoardComponent({ tiles, boardRef }: BoardProps) {
  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE });

  return (
    <div
      ref={boardRef}
      role="group"
      aria-label="2048 game board"
      className="relative aspect-square w-full touch-none select-none rounded-2xl border border-gold/15 bg-white/[0.02] p-3 shadow-[0_0_50px_rgba(0,0,0,0.55)]"
    >
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-3 p-3">
        {cells.map((_, index) => (
          <div key={index} className="rounded-xl border border-gold/10 bg-white/[0.025]" />
        ))}
      </div>

      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-3 p-3">
        <AnimatePresence mode="popLayout">
          {tiles.map((tile) => (
            <Tile key={tile.id} tile={tile} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const Board = memo(BoardComponent);
