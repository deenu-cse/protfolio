'use client';

import { useState, useEffect, useRef } from 'react';

const VideoCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);
  const totalVideos = 6; // v1.mp4 to v6.mp4
  const autoplayDelay = 5000; // 5 seconds per video

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % totalVideos);
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, []);

  // Handle video ended event to go to next
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % totalVideos);
  };

  // Pause all videos except the current one
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentVideoIndex) {
        video.play().catch(e => console.log("Autoplay prevented:", e));
      } else {
        video.pause();
      }
    });
  }, [currentVideoIndex]);

  return (
    <div className="py-20 px-8 bg-linear-to-br from-[#0D1214] to-[#1A2428]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">In Service of Humanity</h2>
        
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10">
          {/* Videos container with smooth transition */}
          <div className="relative w-full h-full overflow-hidden">
            {Array.from({ length: totalVideos }).map((_, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="w-full h-full object-cover"
                  autoPlay={index === currentVideoIndex}
                  muted
                  playsInline
                  loop={false}
                  onEnded={handleVideoEnd}
                >
                  <source src={`/v${index + 1}.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {Array.from({ length: totalVideos }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentVideoIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentVideoIndex((prev) => (prev - 1 + totalVideos) % totalVideos)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 z-20 hover:bg-white/20 transition"
            aria-label="Previous video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentVideoIndex((prev) => (prev + 1) % totalVideos)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 z-20 hover:bg-white/20 transition"
            aria-label="Next video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;