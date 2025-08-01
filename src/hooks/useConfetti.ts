import { useCallback } from 'react';

interface ConfettiOptions {
  count?: number;
  duration?: number;
  colors?: string[];
  startDelay?: number;
}

export const useConfetti = () => {
  const fireConfetti = useCallback((options: ConfettiOptions = {}) => {
    const {
      count = 30,
      colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
      startDelay = 0
    } = options;

    setTimeout(() => {
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti-piece';
          confetti.style.position = 'fixed';
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.top = '-10px';
          confetti.style.width = '8px';
          confetti.style.height = '8px';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.zIndex = '1000';
          confetti.style.pointerEvents = 'none';
          confetti.style.borderRadius = '2px';
          
          // Add random rotation and animation
          const rotation = Math.random() * 360;
          const fallDuration = 2000 + Math.random() * 1000;
          
          confetti.style.animation = `confetti-fall ${fallDuration}ms linear forwards`;
          confetti.style.transform = `rotate(${rotation}deg)`;
          
          document.body.appendChild(confetti);
          
          setTimeout(() => {
            if (confetti.parentNode) {
              confetti.parentNode.removeChild(confetti);
            }
          }, fallDuration);
        }, i * 50);
      }
    }, startDelay);
  }, []);

  const celebrateSuccess = useCallback(() => {
    fireConfetti({
      count: 50,
      colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
    });
  }, [fireConfetti]);

  const celebrateProgress = useCallback(() => {
    fireConfetti({
      count: 20,
      colors: ['#3b82f6', '#60a5fa', '#93c5fd'],
    });
  }, [fireConfetti]);

  const celebrateAchievement = useCallback(() => {
    fireConfetti({
      count: 40,
      colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a'],
    });
  }, [fireConfetti]);

  return {
    fireConfetti,
    celebrateSuccess,
    celebrateProgress,
    celebrateAchievement,
  };
};

export default useConfetti;