import { motion, type MotionValue } from "framer-motion";

interface Props {
  src: string;
  imageY: MotionValue<string>;
  imageScale: MotionValue<number>;
  /** Optional scroll-linked clip-path for cinematic reveal */
  clipPath?: MotionValue<string>;
}

export default function SceneImage({
  src,
  imageY,
  imageScale,
  clipPath,
}: Props) {
  return (
    <motion.div
      className="scene-image"
      style={clipPath ? { clipPath } : undefined}
    >
      <motion.img
        src={src}
        alt=""
        draggable={false}
        loading="lazy"
        className="scene-image__img"
        style={{
          y: imageY,
          scale: imageScale,
        }}
      />
      <div className="scene-image__overlay" />
    </motion.div>
  );
}
