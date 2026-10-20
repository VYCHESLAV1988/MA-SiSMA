import {
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { Frame, Heading, Heroine, MusicNotes, CaptionTrack } from "./Shared";
import captions from "./captions.json";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const FinalScene = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const entering = t >= 11;
  const shouting = t >= 12.6 && t < 15.3;
  const walking = t < 6.5 || (t >= 11 && t < 12.5);
  const doorAngle = interpolate(f, [8.5 * fps, 11 * fps], [0, -78], clamp);
  const shake = shouting ? Math.sin((t - 12.6) * 37) * 1.5 : 0;

  return (
    <Frame>
      <svg
        viewBox="0 0 1080 1920"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
        aria-label="Her own private office at the end of the hallway"
      >
        <rect width="1080" height="1920" fill="#fff4df" />
        <path d="M0 403H1080V1440H0Z" fill="#f0e5cf" />
        <path d="M0 403H1080" stroke="#e0d1b5" strokeWidth="6" />
        <path d="M0 1270H1080V1435H0Z" fill="#d9e0c9" />
        <path d="M0 1267H1080M0 1413H1080" stroke="#b3c2a7" strokeWidth="5" />
        <path d="M0 1437H1080V1920H0Z" fill="#dfc4a5" />
        <path d="M0 1437H1080" stroke="#2f243a" strokeWidth="7" />
        <g stroke="#c9aa8d" strokeWidth="4">
          <path d="M0 1600H1080M0 1775H1080" />
          <path d="M170 1437L-40 1920M467 1437L435 1920M762 1437L942 1920" />
        </g>
        <g stroke="#2f243a" strokeWidth="6" strokeLinejoin="round">
          <rect
            x="79"
            y="509"
            width="361"
            height="364"
            rx="17"
            fill="#fff9ed"
          />
          <rect
            x="101"
            y="531"
            width="317"
            height="321"
            rx="5"
            fill="#b9d8c8"
          />
          <circle cx="340" cy="604" r="40" fill="#f8d880" stroke="none" />
          <path
            d="M103 799L205 680L270 737L332 656L418 769V851H103Z"
            fill="#7e9a7e"
            stroke="none"
          />
          <path
            d="M103 822L218 752L316 804L418 741V851H103Z"
            fill="#267c7b"
            stroke="none"
          />
          <circle cx="255" cy="1036" r="66" fill="#fff9ed" />
          <path
            d="M255 986V1036L280 1054"
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="255" cy="1036" r="6" fill="#f46976" stroke="none" />
          <rect
            x="631"
            y="432"
            width="385"
            height="1007"
            rx="17"
            fill="#7c927a"
          />
          <rect
            x="649"
            y="450"
            width="349"
            height="974"
            rx="7"
            fill="#355856"
          />
        </g>
        {/* A private office beyond the building's security entrance. */}
        <svg x="652" y="453" width="343" height="969" viewBox="0 0 343 969">
          <rect width="343" height="969" fill="#dce8d9" />
          <rect
            x="33"
            y="71"
            width="274"
            height="327"
            rx="7"
            fill="#93bdb6"
            stroke="#2f243a"
            strokeWidth="5"
          />
          <path
            d="M169 73V396M36 232H304"
            fill="none"
            stroke="#fff4df"
            strokeWidth="12"
          />
          <path
            d="M44 83L87 83L44 215M230 84H267L185 386H151Z"
            fill="#f4fff2"
            opacity="0.38"
          />
          <path d="M0 704H343V969H0Z" fill="#bdc4a7" />
          <path d="M0 704H343" stroke="#728d79" strokeWidth="4" />
          <g stroke="#2f243a" strokeWidth="5" strokeLinejoin="round">
            <path d="M29 610H323V645H29Z" fill="#c49c79" />
            <path d="M47 646V817M305 646V817" fill="none" strokeWidth="11" />
            <rect
              x="117"
              y="484"
              width="142"
              height="100"
              rx="9"
              fill="#2f243a"
            />
            <rect
              x="127"
              y="494"
              width="122"
              height="76"
              rx="3"
              fill="#8fc6bd"
              stroke="none"
            />
            <path d="M189 584V609M165 610H213" fill="none" strokeWidth="7" />
            <rect x="52" y="582" width="38" height="27" rx="3" fill="#f46976" />
            <path d="M62 582V547M78 582V554" fill="none" strokeWidth="5" />
          </g>
          <path
            d="M278 677H331L320 749H290Z"
            fill="#edac89"
            stroke="#2f243a"
            strokeWidth="4"
          />
          <path
            d="M306 678Q273 620 280 584Q315 594 306 678M307 677Q315 614 340 615Q344 649 307 677Z"
            fill="#267c7b"
            stroke="#2f243a"
            strokeWidth="4"
          />
          <path d="M0 960H343" stroke="#728d79" strokeWidth="7" />
        </svg>
      </svg>

      <Heading eyebrow="08:16 · אחרי האבטחה">אל המשרד שלי</Heading>

      <div
        style={{
          position: "absolute",
          left: 651,
          top: 451,
          width: 345,
          height: 974,
          perspective: 1500,
          perspectiveOrigin: "0% 50%",
        }}
      >
        <svg
          viewBox="0 0 345 974"
          width="100%"
          height="100%"
          style={{
            rotate: `0 1 0 ${doorAngle + shake}deg`,
            transformOrigin: "0% 50%",
            backfaceVisibility: "hidden",
            filter: "drop-shadow(10px 5px 0px #2f243a30)",
          }}
        >
          <g stroke="#2f243a" strokeWidth="6" strokeLinejoin="round">
            <rect x="3" y="3" width="339" height="968" rx="5" fill="#f46976" />
            <rect
              x="25"
              y="27"
              width="295"
              height="555"
              rx="12"
              fill="#fca18f"
            />
            <rect
              x="25"
              y="652"
              width="295"
              height="287"
              rx="12"
              fill="#ee7e80"
            />
            <path d="M40 51H306M40 677H304" stroke="#ffd8b7" strokeWidth="5" />
            <rect
              x="39"
              y="131"
              width="266"
              height="112"
              rx="16"
              fill="#fff4df"
            />
            <rect
              x="281"
              y="538"
              width="37"
              height="132"
              rx="14"
              fill="#f1d384"
            />
            <path
              d="M299 557H253"
              stroke="#2f243a"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M299 557H253"
              stroke="#f1d384"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="299" cy="622" r="8" fill="#2f243a" />
            <path
              d="M12 158V215M12 759V816"
              stroke="#ecc575"
              strokeWidth="15"
            />
          </g>
          <text
            x="172"
            y="201"
            textAnchor="middle"
            direction="rtl"
            fill="#2f243a"
            fontSize="39"
            fontWeight="700"
            fontFamily="Noto Sans Hebrew, Arial, sans-serif"
          >
            המשרד שלי
          </text>
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: 50,
          top: 645,
          width: 520,
          height: 780,
          transformOrigin: "50% 100%",
          translate: `${interpolate(f, [0, 6.5 * fps, 11 * fps, 12.5 * fps], [-60, 300, 300, 460], clamp)}px ${interpolate(f, [11 * fps, 12.5 * fps], [0, -66], clamp)}px`,
          scale: interpolate(f, [11 * fps, 12.5 * fps], [1, 0.58], clamp),
          rotate: t >= 4.3 && t < 6.5 ? "-2deg" : "0deg",
          opacity: interpolate(f, [12 * fps, 12.5 * fps], [1, 0], clamp),
        }}
      >
        <Heroine left={0} top={0} width={520} walking={walking} />
      </div>

      {t < 6.5 ? (
        <div
          style={{
            opacity: interpolate(f, [5.8 * fps, 6.5 * fps], [1, 0], clamp),
          }}
        >
          <MusicNotes left={-80} top={620} />
        </div>
      ) : null}

      {/* A single key comes from her enormous braid and turns in the lock. */}
      {t >= 6.5 && t < 8.9 ? (
        <div
          style={{
            position: "absolute",
            left: interpolate(f, [6.5 * fps, 8.35 * fps], [483, 831], clamp),
            top: interpolate(f, [6.5 * fps, 8.35 * fps], [1036, 1047], clamp),
            width: 140,
            height: 70,
            opacity: interpolate(
              f,
              [6.5 * fps, 6.7 * fps, 8.6 * fps, 8.9 * fps],
              [0, 1, 1, 0],
              clamp,
            ),
            rotate: `${interpolate(f, [8.2 * fps, 8.55 * fps], [-20, 25], clamp)}deg`,
          }}
        >
          <svg viewBox="0 0 160 80" width="100%" height="100%">
            <g
              fill="#f4d77b"
              stroke="#2f243a"
              strokeWidth="5"
              strokeLinejoin="round"
            >
              <path d="M58 31H147V46H134V58H119V46H106V58H91V46H58Z" />
              <circle cx="34" cy="39" r="29" />
              <circle cx="34" cy="39" r="13" fill="#fff4df" />
              <path d="M70 36H145" stroke="#fff0ae" strokeWidth="3" />
            </g>
          </svg>
        </div>
      ) : null}

      {shouting ? (
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          aria-label="Her shout comes from inside the office"
        >
          <g
            fill="none"
            stroke="#f46976"
            strokeWidth="15"
            strokeLinecap="round"
            opacity={0.7 + Math.sin((t - 12.6) * 20) * 0.25}
          >
            <path d="M831 645Q896 690 831 735" />
            <path d="M875 610Q984 690 875 770" />
            <path d="M923 573Q1065 690 923 807" />
          </g>
        </svg>
      ) : null}

      {entering ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#fff4df",
            opacity: interpolate(f, [15.5 * fps, 16 * fps], [0, 1], clamp),
            pointerEvents: "none",
          }}
        />
      ) : null}

      <Sequence
        from={0.2 * fps}
        durationInFrames={6.5 * fps}
        premountFor={fps}
        name="Two cute refrains, then tired — with pauses"
      >
        <Audio src={staticFile("audio/10-final.wav")} premountFor={fps} />
      </Sequence>
      <Sequence
        from={12.6 * fps}
        durationInFrames={2.6 * fps}
        premountFor={fps}
        name="Shouting from inside her office"
      >
        <Audio
          src={staticFile("audio/11-office-shout.wav")}
          premountFor={fps}
        />
      </Sequence>
      <CaptionTrack captions={captions.final} />
    </Frame>
  );
};
