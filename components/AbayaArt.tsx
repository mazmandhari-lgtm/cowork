function darken(hex: string, amount: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `rgb(${r}, ${g}, ${b})`;
}

export function AbayaArt({
  hex,
  className,
}: {
  hex: string;
  className?: string;
}) {
  const shade = darken(hex, 40);
  const deepShade = darken(hex, 70);
  const highlight = darken(hex, -30);

  return (
    <svg
      viewBox="0 0 320 420"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="160" cy="404" rx="118" ry="14" fill="black" opacity="0.08" />
      <path
        d="M160 40c-14 0-24 10-24 22 0 8 4 15 10 19-30 10-58 26-70 52-16 34-20 150-20 220 0 10 8 18 18 18h172c10 0 18-8 18-18 0-70-4-186-20-220-12-26-40-42-70-52 6-4 10-11 10-19 0-12-10-22-24-22z"
        fill={hex}
      />
      <path
        d="M160 40c-14 0-24 10-24 22 0 8 4 15 10 19-30 10-58 26-70 52-8 17-13 62-16 112 22-58 44-96 100-96s78 38 100 96c-3-50-8-95-16-112-12-26-40-42-70-52 6-4 10-11 10-19 0-12-10-22-24-22z"
        fill={highlight}
        opacity="0.25"
      />
      <path
        d="M76 133c-16 34-20 150-20 220 0 10 8 18 18 18h20c-4-90-2-180 12-240-12 0-22 1-30 2z"
        fill={shade}
        opacity="0.55"
      />
      <path
        d="M244 133c16 34 20 150 20 220 0 10-8 18-18 18h-20c4-90 2-180-12-240 12 0 22 1 30 2z"
        fill={deepShade}
        opacity="0.45"
      />
      <path
        d="M136 81c-30 10-58 26-70 52-4 8-7 22-10 40 18-40 46-64 84-72-2-6-3-13-4-20z"
        fill={deepShade}
        opacity="0.3"
      />
      <path
        d="M110 150c-6 60-8 140-8 210M210 150c6 60 8 140 8 210"
        stroke={deepShade}
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M160 168c-4 70-4 160 0 224M140 172c-6 68-6 158 0 220M180 172c6 68 6 158 0 220"
        stroke={deepShade}
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="160" cy="61" r="20" fill="none" stroke={deepShade} strokeOpacity="0.3" strokeWidth="1.5" />
    </svg>
  );
}
