import {
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import {
  Frame,
  Heading,
  Heroine,
  MusicNotes,
  CaptionTrack,
  Stamp,
} from "./Shared";
import { OfficeBackground, GuardPortrait } from "./World";
import captions from "./captions.json";

export const IntercomScene = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const singing = f >= 4 * fps && f < 16.3 * fps;
  const shouting = f >= 17.2 * fps && f < 20.2 * fps;
  const accepted = f >= 24 * fps;
  return (
    <Frame>
      <OfficeBackground />
      <Heading
        eyebrow="08:15 · בכניסה לעבודה"
        color={accepted ? "#267c7b" : "#9c5a57"}
      >
        {accepted
          ? "כנסי, חמודה."
          : shouting
            ? "מה הסיסמה?!"
            : "כניסה למורשים בלבד"}
      </Heading>
      <Heroine top={495} left={40} width={680} walking={singing} />
      <div
        style={{
          position: "absolute",
          left: 695,
          top: 440,
          width: 270,
          height: 300,
          background: shouting ? "#f46976" : "#fff4df",
          border: "7px solid #2f243a",
          borderRadius: 40,
          boxShadow: "10px 12px 0 #2f243a",
          rotate: shouting ? `${Math.sin(f * 3) * 3}deg` : "3deg",
        }}
      >
        <GuardPortrait shouting={shouting} />
        <div
          dir="rtl"
          style={{
            position: "absolute",
            bottom: 8,
            left: 12,
            right: 12,
            fontSize: 30,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          אבטחה
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 823,
          top: 810,
          width: 173,
          height: 335,
          border: "6px solid #2f243a",
          borderRadius: 24,
          background: "#d4d5cc",
          boxShadow: "6px 8px 0 #2f243a55",
        }}
      >
        <div
          style={{
            margin: 16,
            height: 95,
            borderRadius: 10,
            background: accepted ? "#b6e2ae" : "#2f3643",
            color: accepted ? "#267c7b" : "#fff4df",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: accepted ? 66 : 34,
            fontWeight: 700,
          }}
        >
          {accepted ? "✓" : "• • •"}
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{ height: 5, background: "#707478", margin: "10px 28px" }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            bottom: 22,
            left: 58,
            width: 49,
            height: 49,
            borderRadius: 30,
            border: "4px solid #2f243a",
            background: accepted ? "#8bd18c" : "#f46976",
          }}
        />
      </div>
      {singing ? (
        <>
          <MusicNotes left={50} top={410} />
          <div
            style={{
              position: "absolute",
              left: 720,
              top: 1220,
              width: 225,
              height: 210,
              border: "5px solid #2f243a",
              borderRadius: 28,
              background: "#fff4df",
              textAlign: "center",
              paddingTop: 20,
            }}
          >
            <div dir="rtl" style={{ fontSize: 27 }}>
              מספר החזרות
            </div>
            <div style={{ fontSize: 99, fontWeight: 700, color: "#f46976" }}>
              {Math.min(6, Math.floor((f / fps - 4) / 2.05) + 1)}
            </div>
          </div>
        </>
      ) : null}
      {f >= 21 * fps && f < 23.5 * fps ? (
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "11px solid #f46976",
            borderRadius: 38,
            pointerEvents: "none",
          }}
        />
      ) : null}
      {accepted ? (
        <Sequence from={24 * fps} premountFor={fps} name="Access granted">
          <Stamp text="הסיסמה התקבלה ✓" top={355} />
        </Sequence>
      ) : null}
      {shouting ? (
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "9px solid #e55d6c",
            opacity: interpolate(
              f % (fps / 2),
              [0, fps / 4, fps / 2],
              [0.2, 0.75, 0.2],
            ),
            borderRadius: 38,
          }}
        />
      ) : null}
      <Sequence
        from={1.1 * fps}
        durationInFrames={2 * fps}
        premountFor={fps}
        name="Guard asks"
      >
        <Audio src={staticFile("audio/05-guard1.wav")} premountFor={fps} />
      </Sequence>
      <Sequence
        from={4 * fps}
        durationInFrames={12.3 * fps}
        premountFor={fps}
        name="Six sung answers"
      >
        <Audio src={staticFile("audio/06-song6.wav")} premountFor={fps} />
      </Sequence>
      <Sequence
        from={17.5 * fps}
        durationInFrames={2.6 * fps}
        premountFor={fps}
        name="Guard shouts"
      >
        <Audio src={staticFile("audio/07-guard2.wav")} premountFor={fps} />
      </Sequence>
      <Sequence
        from={21 * fps}
        durationInFrames={2.1 * fps}
        premountFor={fps}
        name="Russian password unchanged"
      >
        <Audio src={staticFile("audio/08-password.wav")} premountFor={fps} />
      </Sequence>
      <Sequence
        from={24 * fps}
        durationInFrames={3.8 * fps}
        premountFor={fps}
        name="Password accepted"
      >
        <Audio src={staticFile("audio/09-accepted.wav")} premountFor={fps} />
      </Sequence>
      <CaptionTrack captions={captions.intercom} />
    </Frame>
  );
};
