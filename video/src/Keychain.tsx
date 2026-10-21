import {
  CanvasImage,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// The reference's actual lanyard, metal rings, keys, tags and pink snap hook.
export const Keychain = ({ large = false }: { large?: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
        rotate: `${Math.sin((frame / fps) * 5) * (large ? 7 : 4)}deg`,
        transformOrigin: "50% 0%",
      }}
    >
      <CanvasImage
        src={staticFile("images/keychain-reference.png")}
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          height: "100%",
          width: "auto",
          maxWidth: "none",
          aspectRatio: "768 / 2048",
          translate: "-50% 0px",
          objectFit: "contain",
          objectPosition: "50% 0%",
        }}
      />
    </div>
  );
};
