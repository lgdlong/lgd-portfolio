"use client";
import { useRef, useState } from "react";

interface MetallicShineTextProps {
  children: string;
  fontSize?: number;
}

export function MetallicShineText({
  children,
  fontSize = 72,
}: MetallicShineTextProps) {
  const WIDTH = 700;
  const HEIGHT = Math.round(fontSize * 1.5);
  const RADIUS = 90;

  // Khi chưa hover, spot nằm ngoài vùng chữ (vd. x = -RADIUS*2)
  const [pos, setPos] = useState<{ x: number; y: number; active: boolean }>({
    x: -RADIUS * 2,
    y: HEIGHT / 2,
    active: false,
  });
  const svgRef = useRef<SVGSVGElement>(null);

  function handleMove(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    const rect = svgRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * HEIGHT;
    setPos({ x, y, active: true });
  }

  function handleLeave() {
    // Khi rời chuột, di chuyển spot ra ngoài vùng chữ luôn
    setPos((p) => ({
      ...p,
      x: -RADIUS * 2,
      y: HEIGHT / 2,
      active: false,
    }));
  }

  return (
    <div className="relative mt-4 w-fit">
      <svg
        ref={svgRef}
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="block select-none cursor-pointer"
        style={{ display: "block" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <defs>
          <linearGradient id="metallic" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#eee" />
            <stop offset="60%" stopColor="#a0a0a0" />
            <stop offset="100%" stopColor="#e1e1e1" />
          </linearGradient>
          {/* Spot mask chỉ vẽ khi hover, còn không thì mask nằm ngoài vùng text */}
          <radialGradient
            id="reveal"
            gradientUnits="userSpaceOnUse"
            cx={pos.x}
            cy={pos.y}
            r={RADIUS}
          >
            <stop
              offset="0%"
              stopColor="#fff"
              stopOpacity={pos.active ? 1 : 0}
            />
            <stop offset="80%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="mask">
            <rect width="100%" height="100%" fill="black" />
            <rect width="100%" height="100%" fill="url(#reveal)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="oklch(0.141 0.005 285.823)" />
        <text
          x="0"
          y={HEIGHT / 2 + fontSize / 2.8}
          textAnchor="start"
          fontWeight="900"
          fontFamily="Geist, GeistMono, sans-serif"
          fontSize={fontSize}
          fill="url(#metallic)"
          mask="url(#mask)"
          style={{ letterSpacing: "1px", dominantBaseline: "middle" }}
        >
          {children}
        </text>
      </svg>
    </div>
  );
}
