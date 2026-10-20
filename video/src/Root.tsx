import {
  Composition,
  Folder,
  Series,
  useVideoConfig,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { MorningScene } from "./MorningScene";
import { RoadScene } from "./RoadScene";
import { IntercomScene } from "./IntercomScene";
import { FinalScene } from "./FinalScene";

export const Hamuda = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Series>
        <Series.Sequence
          name="Morning and huge keychain"
          durationInFrames={13 * fps}
          premountFor={fps}
        >
          <MorningScene />
        </Series.Sequence>
        <Series.Sequence
          name="Overtaken on the left"
          durationInFrames={19 * fps}
          premountFor={fps}
        >
          <RoadScene />
        </Series.Sequence>
        <Series.Sequence
          name="What is the password"
          durationInFrames={29 * fps}
          premountFor={fps}
        >
          <IntercomScene />
        </Series.Sequence>
        <Series.Sequence
          name="Song with pauses and opening her office"
          durationInFrames={16 * fps}
          premountFor={fps}
        >
          <FinalScene />
        </Series.Sequence>
      </Series>
      <Audio
        name="Original music and sound effects"
        src={staticFile("audio/ambience.wav")}
        volume={1}
        premountFor={fps}
      />
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AniHamuda"
        component={Hamuda}
        durationInFrames={2310}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Scenes">
        <Composition
          id="Morning"
          component={MorningScene}
          durationInFrames={390}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Road"
          component={RoadScene}
          durationInFrames={570}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Intercom"
          component={IntercomScene}
          durationInFrames={870}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Final"
          component={FinalScene}
          durationInFrames={480}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
