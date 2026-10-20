import React from "react";
import {
  AbsoluteFill,
  CanvasImage,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Interactive,
} from "remotion";
import type { Caption } from "@remotion/captions";
import { Keychain } from "./Keychain";

export const Frame = ({ children }: { children: React.ReactNode }) => (
  <AbsoluteFill
    style={{
      background: "#fff4df",
      color: "#2f243a",
      fontFamily: "Noto Sans Hebrew, DejaVu Sans, sans-serif",
      overflow: "hidden",
    }}
  >
    <style>{`@font-face{font-family:'Noto Sans Hebrew';src:url('${staticFile("fonts/NotoSansHebrew-Regular.ttf")}')}@font-face{font-family:'Noto Sans Hebrew';font-weight:700;src:url('${staticFile("fonts/NotoSansHebrew-Bold.ttf")}')}`}</style>
    {children}
    <div
      style={{
        position: "absolute",
        inset: 24,
        border: "3px solid #2f243a25",
        borderRadius: 35,
        pointerEvents: "none",
      }}
    />
  </AbsoluteFill>
);

export const Heading = ({
  eyebrow,
  children,
  color = "#267c7b",
}: {
  eyebrow: string;
  children: React.ReactNode;
  color?: string;
}) => (
  <div
    dir="rtl"
    style={{
      position: "absolute",
      top: 95,
      left: 80,
      right: 80,
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontSize: 29,
        letterSpacing: 3,
        color,
        fontWeight: 700,
        marginBottom: 18,
      }}
    >
      {eyebrow}
    </div>
    <Interactive.Div
      name="Scene title"
      style={{
        fontSize: 96,
        lineHeight: 1.15,
        fontWeight: 700,
        color: "#2f243a",
      }}
    >
      {children}
    </Interactive.Div>
  </div>
);

export const Heroine = ({
  left = 210,
  top = 440,
  width = 650,
  walking = false,
  keys = true,
}: {
  left?: number;
  top?: number;
  width?: number;
  walking?: boolean;
  keys?: boolean;
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height: width * 1.5,
        translate: walking ? `0px ${Math.sin((f / fps) * 9) * 9}px` : "none",
        rotate: walking ? `${Math.sin((f / fps) * 4.5) * 1.1}deg` : "0deg",
      }}
    >
      <CanvasImage
        src={staticFile("images/heroine.png")}
        style={{ width: "100%", height: "100%" }}
      />
      {keys ? (
        <div
          style={{
            position: "absolute",
            left: "27%",
            top: "36%",
            width: "29%",
            height: "58%",
          }}
        >
          <Keychain />
        </div>
      ) : null}
    </div>
  );
};

export const Portrait = ({
  mood = 0,
  left = 260,
  top = 370,
  width = 560,
}: {
  mood?: number;
  left?: number;
  top?: number;
  width?: number;
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height: width * 1.18,
        overflow: "hidden",
        translate: `0px ${Math.sin((f / fps) * 6) * 4}px`,
      }}
    >
      <CanvasImage
        src={staticFile("images/expressions.png")}
        style={{
          position: "absolute",
          width: "300%",
          maxWidth: "none",
          height: "auto",
          left: `${-100 * mood}%`,
        }}
      />
    </div>
  );
};

export const MusicNotes = ({
  left = 110,
  top = 480,
}: {
  left?: number;
  top?: number;
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 850,
        height: 650,
        pointerEvents: "none",
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: i % 2 ? 650 : 30,
            top: 100 + i * 100 - (((f / fps) * 45 + i * 51) % 130),
            fontSize: 76,
            color: i % 2 ? "#f46976" : "#267c7b",
            rotate: `${i % 2 ? 15 : -15}deg`,
            opacity: 0.75,
          }}
        >
          {i % 2 ? "♪" : "♫"}
        </div>
      ))}
    </div>
  );
};

export const CaptionTrack = ({ captions }: { captions: Caption[] }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (f / fps) * 1000;
  const item = captions.find((c) => ms >= c.startMs && ms < c.endMs);
  if (!item) return null;
  const isRussian = /[а-яё]/i.test(item.text);
  const local = ((ms - item.startMs) / 1000) * fps;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 130,
        left: 75,
        right: 75,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        dir={isRussian ? "ltr" : "rtl"}
        style={{
          fontSize: isRussian ? 69 : 62,
          lineHeight: 1.35,
          fontWeight: 700,
          textAlign: "center",
          whiteSpace: "pre-line",
          background: "#fffdf4",
          border: "5px solid #2f243a",
          borderRadius: 28,
          padding: "23px 34px",
          boxShadow: "0px 11px 0px #2f243a",
          scale: interpolate(local, [0, 5, 9], [0.94, 1.025, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {item.text}
      </div>
    </div>
  );
};

export const Stamp = ({
  text,
  color = "#267c7b",
  top = 360,
}: {
  text: string;
  color?: string;
  top?: number;
}) => {
  const f = useCurrentFrame();
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top,
        left: 170,
        right: 170,
        rotate: "-6deg",
        fontSize: 69,
        fontWeight: 700,
        color,
        background: "#fffdf4",
        border: `7px solid ${color}`,
        borderRadius: 16,
        padding: "12px 20px",
        textAlign: "center",
        scale: interpolate(f, [0, 6, 12], [1.5, 0.95, 1], {
          extrapolateRight: "clamp",
        }),
      }}
    >
      {text}
    </div>
  );
};
