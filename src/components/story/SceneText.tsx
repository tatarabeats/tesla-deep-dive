import { motion, type MotionValue } from 'framer-motion';

interface Props {
  text: string;
  subText?: string;
  textOpacity: MotionValue<number>;
  textY: MotionValue<string>;
  isThreat?: boolean;
}

export default function SceneText({ text, subText, textOpacity, textY, isThreat }: Props) {
  return (
    <motion.div
      className="scene-text"
      style={{ opacity: textOpacity, y: textY }}
    >
      <h2 className={`scene-text__main ${isThreat ? 'scene-text__main--threat' : ''}`}>
        {text}
      </h2>
      {subText && (
        <p className="scene-text__sub">{subText}</p>
      )}
    </motion.div>
  );
}
