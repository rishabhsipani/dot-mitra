import { useEffect, useRef, useCallback } from 'react';

export default function HeroCanvas({ getFrame, frameIndex }) {
  const canvasRef = useRef(null);
  const lastFrameIndex = useRef(-1);

  const drawFrame = useCallback((ctx, canvas, image) => {
    const logicalW = canvas.clientWidth;
    const logicalH = canvas.clientHeight;
    
    if (!logicalW || !logicalH) return;

    const canvasRatio = logicalW / logicalH;
    const imageRatio = 1920 / 1080;
    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imageRatio) {
      drawW = logicalW;
      drawH = logicalW / imageRatio;
      drawX = 0;
      drawY = (logicalH - drawH) / 2;
    } else {
      drawH = logicalH;
      drawW = logicalH * imageRatio;
      drawX = (logicalW - drawW) / 2;
      drawY = 0;
    }

    ctx.clearRect(0, 0, logicalW, logicalH);
    ctx.drawImage(image, drawX, drawY, drawW, drawH);
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Redraw current frame after resize
    const img = getFrame(lastFrameIndex.current >= 0 ? lastFrameIndex.current : 0);
    if (img) {
      drawFrame(ctx, canvas, img);
    }
  }, [getFrame, drawFrame]);

  useEffect(() => {
    setupCanvas();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupCanvas, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [setupCanvas]);

  useEffect(() => {
    if (frameIndex === lastFrameIndex.current) return;
    lastFrameIndex.current = frameIndex;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const image = getFrame(frameIndex);
    if (image) {
      drawFrame(ctx, canvas, image);
    }
  }, [frameIndex, getFrame, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      role="img"
      aria-label="DoT Mitra AI assistant — animated robot character on a futuristic platform"
    />
  );
}
