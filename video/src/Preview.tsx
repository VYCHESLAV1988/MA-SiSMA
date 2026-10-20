import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player, type PlayerRef } from "@remotion/player";
import { Hamuda } from "./Root";

const Preview = () => {
  const player = useRef<PlayerRef>(null);
  useEffect(() => {
    // Expose the ordinary Player controls for local accessibility/preview checks.
    Object.assign(window, { __hamudaPlayer: player.current });
    return () => {
      Object.assign(window, { __hamudaPlayer: undefined });
    };
  }, []);
  return (
    <main className="preview">
      <header className="preview-heading" dir="rtl">
        <h1>אני חמודה</h1>
        <span>קומדיית בוקר · 77 שניות</span>
      </header>
      <div className="player-shell">
        <Player
          ref={player}
          component={Hamuda}
          durationInFrames={2310}
          compositionWidth={1080}
          compositionHeight={1920}
          fps={30}
          controls
          autoPlay={false}
          loop={false}
          showVolumeControls
          showPlaybackRateControl
          initiallyMuted={false}
          alwaysShowControls
          clickToPlay
          spaceKeyToPlayOrPause
          style={{ width: "100%", aspectRatio: "9 / 16" }}
          errorFallback={({ error }) => (
            <div className="preview-error" role="alert">
              Не удалось открыть предпросмотр: {error.message}
            </div>
          )}
        />
      </div>
      <p className="voice-note">
        Синтетические голоса и оригинальная мелодия. Голос девушки с фото не
        копировался.
      </p>
    </main>
  );
};

const root = document.getElementById("root");
if (!root) throw new Error("Preview root is missing");
createRoot(root).render(<Preview />);
