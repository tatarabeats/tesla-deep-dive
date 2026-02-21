import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { storyScenes } from '../../data/storyScenes';
import Scene from './Scene';
import ProgressBar from './ProgressBar';

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Star background */}
      <div className="cosmos-stars" aria-hidden>
        <div className="cosmos-stars__layer cosmos-stars__layer--1" />
        <div className="cosmos-stars__layer cosmos-stars__layer--2" />
      </div>

      <ProgressBar progress={progress} />

      <div ref={containerRef} className="scroll-story">
        {storyScenes.map((scene, i) => (
          <Scene key={scene.id} scene={scene} index={i} />
        ))}
      </div>
    </>
  );
}
