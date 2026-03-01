import { motion, type MotionValue } from "framer-motion";

interface Props {
  src: string;
  imageY?: MotionValue<string>;
  imageScale?: MotionValue<number>;
  /** Optional scroll-linked opacity for reveal effect */
  imageOpacity?: MotionValue<number>;
  /** Optional scroll-linked clip-path for cinematic reveal */
  clipPath?: MotionValue<string>;
}

export default function SceneImage({
  src,
  imageY,
  imageScale,
  imageOpacity,
  clipPath,
}: Props) {
  const divStyle: Record<string, unknown> = {};
  if (imageOpacity) divStyle.opacity = imageOpacity;
  if (clipPath) divStyle.clipPath = clipPath;

  return (
    <motion.div
      className="scene-image"
      style={Object.keys(divStyle).length > 0 ? divStyle : undefined}
    >
      <motion.img
        src={src}
        alt=""
        draggable={false}
        loading="lazy"
        className="scene-image__img"
        style={{
          ...(imageY && { y: imageY }),
          ...(imageScale && { scale: imageScale }),
        }}
      />
      <div className="scene-image__overlay" />
    </motion.div>
  );
}
