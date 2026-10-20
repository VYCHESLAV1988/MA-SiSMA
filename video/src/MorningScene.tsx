import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";
import { Frame, Heading, Heroine, MusicNotes, CaptionTrack } from "./Shared";
import { CityBackground, Car } from "./World";
import captions from "./captions.json";
import { Keychain } from "./Keychain";

export const MorningScene = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const searching = f >= 8 * fps;
  return (
    <Frame>
      <CityBackground moving={!searching} />
      <Heading eyebrow="07:45 · בדרך לעבודה">
        {searching ? "איפה המפתחות?!" : "אני חמודה"}
      </Heading>
      <div
        style={{
          position: "absolute",
          left: searching ? 280 : 650,
          top: 1160,
          width: 850,
          opacity: interpolate(f, [6 * fps, 8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Car />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          translate: interpolate(
            f,
            [0, 2 * fps, 8 * fps],
            ["-180px 0px", "0px 0px", "0px 0px"],
            { extrapolateRight: "clamp" },
          ),
        }}
      >
        <Heroine walking={!searching} left={135} top={435} width={720} />
      </div>
      {!searching ? <MusicNotes /> : null}
      {searching ? (
        <>
          <div
            style={{
              position: "absolute",
              top: 440,
              right: 90,
              width: 345,
              height: 850,
              background: "#fffdf4eb",
              border: "6px solid #2f243a",
              borderRadius: 180,
              boxShadow: "10px 12px 0 #2f243a",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 40,
                left: 25,
                right: 25,
                height: 690,
              }}
            >
              <Keychain large />
            </div>
            <div
              dir="rtl"
              style={{
                position: "absolute",
                bottom: 30,
                width: "100%",
                textAlign: "center",
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              ממש. כאן.
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 140,
              top: 400,
              fontSize: 140,
              color: "#f46976",
              rotate: "-15deg",
            }}
          >
            ?!
          </div>
        </>
      ) : null}
      <Sequence
        from={1 * fps}
        durationInFrames={6.2 * fps}
        premountFor={fps}
        name="Opening song"
      >
        <Audio src={staticFile("audio/01-song.wav")} premountFor={fps} />
      </Sequence>
      <Sequence
        from={8.4 * fps}
        durationInFrames={3.6 * fps}
        premountFor={fps}
        name="Where are my keys"
      >
        <Audio src={staticFile("audio/02-keys.wav")} premountFor={fps} />
      </Sequence>
      <CaptionTrack captions={captions.morning} />
    </Frame>
  );
};
