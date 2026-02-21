import { useRef, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { storyScenes } from '../../data/storyScenes';
import Scene from './Scene';
import ProgressBar from './ProgressBar';
import { playSound } from '../../utils/sound';

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSceneRef = useRef<number>(-1);

  const { scrollYProgress } = useScroll({ container: containerRef });

  // Map 0..1 → 0..1 for progress bar
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Play sound when entering new scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sceneHeight = window.innerHeight;
      const currentScene = Math.round(scrollTop / sceneHeight);

      if (currentScene !== lastSceneRef.current && currentScene >= 0) {
        lastSceneRef.current = currentScene;
        const scene = storyScenes[currentScene];
        if (scene) {
          if (scene.type === 'threat') {
            playSound('collapse', 0);
          } else if (scene.type === 'solution' || scene.type === 'root') {
            playSound('expand', scene.chapter ?? 0);
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

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
