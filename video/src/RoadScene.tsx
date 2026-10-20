import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { Frame, Heading, Portrait, MusicNotes, CaptionTrack } from "./Shared";
import { CityBackground, Car } from "./World";
import captions from "./captions.json";

export const RoadScene = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const angry = f >= 4 * fps && f < 10 * fps;
  return (
    <Frame>
      <CityBackground moving />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: angry ? "#f4697630" : "#fff4df20",
        }}
      />
      <Heading eyebrow="08:02 · על הכביש" color={angry ? "#c8465d" : "#267c7b"}>
        {angry
          ? "ברכה מהלב."
          : f < 4 * fps
            ? "בוקר על הכביש."
            : "חזרה לאווירה טובה."}
      </Heading>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 440,
          height: 640,
          borderRadius: 320,
          background: angry ? "#f9b4a2" : "#fbe0b8",
          border: "5px solid #2f243a",
        }}
      />
      <Portrait mood={angry ? 1 : 0} left={240} top={400} width={600} />
      {angry ? (
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 480,
            fontSize: 120,
            color: "#bc314b",
            rotate: "-15deg",
          }}
        >
          !!
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1120,
          height: 390,
          background: "#636875",
          borderTop: "14px solid #e6dbc4",
          borderBottom: "14px solid #e6dbc4",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 190,
            width: 1800,
            height: 10,
            background:
              "repeating-linear-gradient(90deg,#fff4df 0 100px,transparent 100px 200px)",
            translate: `${-(f * 20) % 200}px 0px`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 1080,
          width: 850,
          translate: `0px ${Math.sin((f / fps) * 16) * 2}px`,
        }}
      >
        <Car driver />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1120,
          width: 740,
          translate: interpolate(
            f,
            [0, 1.6 * fps, 2.5 * fps, 3.7 * fps],
            ["-850px -110px", "-80px -110px", "240px 20px", "1200px 20px"],
            { extrapolateRight: "clamp" },
          ),
        }}
      >
        <Car color="#4da3b1" driver />
      </div>
      {f >= fps && f < 3.5 * fps ? (
        <div
          dir="rtl"
          style={{
            position: "absolute",
            top: 1025,
            left: 110,
            background: "#fffdf4",
            border: "4px solid #2f243a",
            borderRadius: 16,
            padding: "12px 24px",
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          עוקף משמאל ←
        </div>
      ) : null}
      {f >= 5.4 * fps && f < 9 * fps ? (
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 990,
            width: 170,
            height: 170,
            borderRadius: 85,
            background: "#fffdf4",
            border: "5px solid #2f243a",
            rotate: "12deg",
            fontSize: 105,
            textAlign: "center",
          }}
        >
          🧻
        </div>
      ) : null}
      {!angry && f >= 10 * fps ? <MusicNotes left={100} top={430} /> : null}
      <Sequence
        from={4.2 * fps}
        durationInFrames={4.3 * fps}
        premountFor={fps}
        name="Toilet paper wish"
      >
        <Audio src={staticFile("audio/03-traffic.wav")} premountFor={fps} />
      </Sequence>
      <Sequence
        from={11.2 * fps}
        durationInFrames={7.8 * fps}
        premountFor={fps}
        name="Song resumes"
      >
        <Audio src={staticFile("audio/04-song-lala.wav")} premountFor={fps} />
      </Sequence>
      <CaptionTrack captions={captions.road} />
    </Frame>
  );
};
