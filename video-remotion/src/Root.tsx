import { Composition } from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadIBMPlexMono } from "@remotion/google-fonts/IBMPlexMono";
import { Main } from "./Composition";

loadFraunces("normal", { weights: ["500", "600", "700", "800", "900"], subsets: ["latin"] });
loadIBMPlexMono("normal", { weights: ["400", "500"], subsets: ["latin"] });

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={Main}
      durationInFrames={1370}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
