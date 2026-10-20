import { useCurrentFrame, useVideoConfig } from "remotion";

// One intentionally repeated decorative group: the heroine's enormous key braid.
export const Keychain = ({ large = false }: { large?: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <svg
      viewBox="0 0 260 580"
      style={{
        width: "100%",
        height: "100%",
        overflow: "visible",
        rotate: `${Math.sin((frame / fps) * 5) * (large ? 7 : 4)}deg`,
        transformOrigin: "50% 4%",
      }}
    >
      <g
        stroke="#2f243a"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <ellipse cx="128" cy="37" rx="36" ry="31" fill="#e9d38b" />
        <ellipse cx="128" cy="37" rx="22" ry="18" fill="#fff4df" />
        <path
          d="M110 65C178 110 75 147 150 193S92 265 143 303"
          fill="none"
          stroke="#2f243a"
          strokeWidth="35"
        />
        <path
          d="M110 65C178 110 75 147 150 193S92 265 143 303"
          fill="none"
          stroke="#f46976"
          strokeWidth="24"
        />
        <path
          d="M144 65C77 110 179 147 107 193S164 265 123 303"
          fill="none"
          stroke="#2f243a"
          strokeWidth="30"
        />
        <path
          d="M144 65C77 110 179 147 107 193S164 265 123 303"
          fill="none"
          stroke="#62b5ad"
          strokeWidth="19"
        />
        <path
          d="M128 72C112 130 152 165 123 210S143 270 130 305"
          fill="none"
          stroke="#f4d770"
          strokeWidth="9"
        />
        <path
          d="M114 100L56 148M141 142L210 190M112 190L38 255M145 239L204 308M130 286L70 390M143 295L151 433"
          fill="none"
          stroke="#b7a7a4"
          strokeWidth="9"
        />
        {Array.from({ length: 9 }, (_, i) => (
          <g
            key={i}
            transform={`translate(${36 + (i % 3) * 75} ${270 + Math.floor(i / 3) * 72}) rotate(${((i % 3) - 1) * 22})`}
          >
            <circle r="16" fill={i % 2 ? "#e6bf6a" : "#dce1e7"} />
            <circle r="6" fill="#fff4df" strokeWidth="3" />
            <path
              d="M0 16V76H17V64H0M0 49H13"
              fill="none"
              stroke={i % 2 ? "#b7873f" : "#8b97ab"}
              strokeWidth="11"
            />
          </g>
        ))}
        <circle cx="43" cy="151" r="30" fill="#f7a9d0" />
        <path
          d="M26 134L22 127M53 127L60 121M72 146L78 147M22 164L16 173M51 174L55 182"
          stroke="#f46976"
        />
        <path
          d="M210 181L221 201L246 205L229 222L232 247L210 235L188 247L192 222L175 205L199 201Z"
          fill="#f5d257"
        />
        <circle cx="34" cy="253" r="25" fill="#69c7d8" />
        <ellipse cx="34" cy="253" rx="16" ry="12" fill="white" />
        <circle cx="34" cy="253" r="7" fill="#2f243a" />
        <path
          d="M193 293C169 268 144 307 193 339C241 308 216 269 193 293Z"
          fill="#f46976"
        />
        <rect x="169" y="363" width="48" height="72" rx="15" fill="#374354" />
        <circle cx="193" cy="382" r="8" fill="#f4d770" strokeWidth="3" />
        <path d="M181 408H204" stroke="#b9c7d1" />
        <path
          d="M126 457L112 434L107 463C84 483 94 528 129 532C165 528 172 485 151 465L147 435Z"
          fill="#f5bc7d"
        />
        <circle cx="114" cy="487" r="3" fill="#2f243a" />
        <circle cx="144" cy="487" r="3" fill="#2f243a" />
        <path
          d="M125 499L130 504L135 499M130 504V512"
          fill="none"
          strokeWidth="3"
        />
        <path
          d="M96 500L79 496M97 508L78 513M157 499L176 494M158 508L175 513"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
};
