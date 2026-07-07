export interface TileStyle {
  background: string;
  color: string;
  boxShadow: string;
}

const STYLES: Record<number, TileStyle> = {
  2: {
    background: "rgba(212,175,55,0.05)",
    color: "#E9DCB0",
    boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.22)",
  },
  4: {
    background: "rgba(212,175,55,0.09)",
    color: "#EEDF9E",
    boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.28)",
  },
  8: {
    background: "rgba(212,175,55,0.14)",
    color: "#F2E6B8",
    boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.36)",
  },
  16: {
    background: "rgba(212,175,55,0.18)",
    color: "#F6ECC6",
    boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.44)",
  },
  32: {
    background: "rgba(212,175,55,0.22)",
    color: "#F8EFD2",
    boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.50)",
  },
  64: {
    background: "rgba(201,162,39,0.28)",
    color: "#FBF3DE",
    boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.58)",
  },
  128: {
    background: "rgba(201,162,39,0.34)",
    color: "#FFF6E6",
    boxShadow: "0 0 18px rgba(212,175,55,0.18), inset 0 0 0 1px rgba(212,175,55,0.66)",
  },
  256: {
    background: "rgba(201,162,39,0.40)",
    color: "#FFF8EC",
    boxShadow: "0 0 20px rgba(212,175,55,0.22), inset 0 0 0 1px rgba(212,175,55,0.72)",
  },
  512: {
    background: "rgba(201,162,39,0.46)",
    color: "#FFFBF2",
    boxShadow: "0 0 22px rgba(212,175,55,0.26), inset 0 0 0 1px rgba(212,175,55,0.80)",
  },
  1024: {
    background: "rgba(201,162,39,0.52)",
    color: "#FFFBF2",
    boxShadow: "0 0 24px rgba(212,175,55,0.30), inset 0 0 0 1px rgba(233,205,128,0.85)",
  },
  2048: {
    background: "linear-gradient(135deg, rgba(212,175,55,0.65), rgba(201,162,39,0.50))",
    color: "#1A1407",
    boxShadow: "0 0 30px rgba(212,175,55,0.38), inset 0 0 0 1px rgba(245,228,170,0.90)",
  },
};

const FALLBACK: TileStyle = {
  background: "linear-gradient(135deg, rgba(212,175,55,0.72), rgba(201,162,39,0.55))",
  color: "#1A1407",
  boxShadow: "0 0 34px rgba(212,175,55,0.42), inset 0 0 0 1px rgba(245,228,170,0.92)",
};

export function getTileStyle(value: number): TileStyle {
  return STYLES[value] ?? FALLBACK;
}

export function getTileFontSize(value: number): string {
  const digits = value.toString().length;
  if (digits <= 2) return "text-3xl sm:text-4xl";
  if (digits === 3) return "text-2xl sm:text-3xl";
  return "text-xl sm:text-2xl";
}
