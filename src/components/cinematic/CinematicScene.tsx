import type { CinematicScene as CinematicSceneType } from "../../types/cinematic";
import HeroStatement from "./HeroStatement";
import ChapterGate from "./ChapterGate";
import StickySequence from "./StickySequence";
import FullBleedStat from "./FullBleedStat";
import SideBySide from "./SideBySide";
import BridgeScene from "./BridgeScene";
import ClimaxScene from "./ClimaxScene";
import EpilogueScene from "./EpilogueScene";

interface Props {
  scene: CinematicSceneType;
}

export default function CinematicScene({ scene }: Props) {
  switch (scene.type) {
    case "hero-statement":
      return <HeroStatement scene={scene} />;
    case "chapter-gate":
      return <ChapterGate scene={scene} />;
    case "sticky-sequence":
      return <StickySequence scene={scene} />;
    case "full-bleed-stat":
      return <FullBleedStat scene={scene} />;
    case "side-by-side":
      return <SideBySide scene={scene} />;
    case "bridge":
      return <BridgeScene scene={scene} />;
    case "climax":
      return <ClimaxScene scene={scene} />;
    case "epilogue":
      return <EpilogueScene scene={scene} />;
    default:
      return null;
  }
}
