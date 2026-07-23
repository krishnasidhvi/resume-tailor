"use client";
import { useEffect, useState } from "react";

export function ScoreRing({ score }: { score: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setCurrent(Math.floor(ease * score));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrent(score);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (current / 100) * circumference;

  let colorStr = "var(--accent-red)";
  if (current >= 75) colorStr = "var(--accent-green)";
  else if (current >= 50) colorStr = "var(--accent-orange)";

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70" cy="70" r={radius}
          stroke="currentColor" strokeWidth="8" fill="transparent"
          style={{ color: 'var(--separator)' }}
        />
        <circle
          cx="70" cy="70" r={radius}
          stroke="currentColor" strokeWidth="8" fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-100 ease-out"
          style={{ color: colorStr }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="display-title" style={{ color: 'var(--label-primary)' }}>{current}</span>
        <span className="caption-text uppercase tracking-widest mt-1">Score</span>
      </div>
    </div>
  );
}
