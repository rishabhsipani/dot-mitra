import { useEffect, useRef, useState, useCallback } from 'react';
import { FRAME_COUNT, getFrameSrc } from '../../utils/constants';

const CRITICAL_FRAMES = 30;
const BATCH_SIZE = 10;

export default function useFrameSequence() {
  const images = useRef([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [criticalLoaded, setCriticalLoaded] = useState(false);
  const loadedCount = useRef(0);

  const loadImage = useCallback((index) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        images.current[index] = img;
        loadedCount.current++;
        setLoadingProgress(Math.floor((loadedCount.current / FRAME_COUNT) * 100));
        resolve(img);
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = getFrameSrc(index);
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    images.current = new Array(FRAME_COUNT);

    async function loadCriticalFrames() {
      const promises = [];
      for (let i = 0; i < CRITICAL_FRAMES; i++) {
        promises.push(loadImage(i));
      }
      await Promise.all(promises);
      if (!cancelled) {
        setCriticalLoaded(true);
      }
    }

    async function loadRemainingFrames() {
      for (let i = CRITICAL_FRAMES; i < FRAME_COUNT; i += BATCH_SIZE) {
        if (cancelled) break;
        const batch = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, FRAME_COUNT); j++) {
          batch.push(loadImage(j));
        }
        await Promise.all(batch);
      }
    }

    loadCriticalFrames().then(() => {
      if (!cancelled) {
        loadRemainingFrames();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [loadImage]);

  const getFrame = useCallback((index) => {
    const clampedIndex = Math.max(0, Math.min(index, FRAME_COUNT - 1));
    return images.current[clampedIndex] || null;
  }, []);

  return {
    getFrame,
    loadingProgress,
    criticalLoaded,
    totalFrames: FRAME_COUNT,
  };
}
