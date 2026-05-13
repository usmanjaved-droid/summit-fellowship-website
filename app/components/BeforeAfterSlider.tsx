'use client';

import { useState, useRef } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto h-96 cursor-col-resize rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      role="img"
      aria-label="Before and after fellowship transformation comparison"
    >
      {/* Before Side */}
      <div className="absolute inset-0 bg-forest-shadow flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl font-bold mb-4">BEFORE</p>
          <p className="text-lg mb-4">Struggling with scale</p>
          <div className="space-y-2 text-sm opacity-75">
            <p>📊 Limited reach</p>
            <p>🤔 Unclear strategy</p>
            <p>⚙️ Inefficient operations</p>
          </div>
        </div>
      </div>

      {/* After Side (revealed) */}
      <div
        className="absolute inset-0 bg-alpine-lake flex items-center justify-center"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="text-center text-white">
          <p className="text-xl font-bold mb-4">AFTER</p>
          <p className="text-lg mb-4">Scale-ready organization</p>
          <div className="space-y-2 text-sm opacity-75">
            <p>📈 Proven model</p>
            <p>🎯 Clear strategy</p>
            <p>⚡ Efficient systems</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-terra-red cursor-col-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12
                        bg-terra-red rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">↔️</span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-4 left-4 text-white font-bold text-sm bg-black/30 px-3 py-1 rounded">
        Drag to reveal
      </span>
    </div>
  );
}
