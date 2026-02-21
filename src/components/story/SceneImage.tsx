import { motion, type MotionValue } from 'framer-motion';

interface Props {
  src: string;
  imageY: MotionValue<string>;
  imageScale: MotionValue<number>;
}

export default function SceneImage({ src, imageY, imageScale }: Props) {
  return (
    <div className="scene-image">
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
    </div>
  );
}
