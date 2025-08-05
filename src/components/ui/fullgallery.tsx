'use client';

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTransition, a } from "@react-spring/web";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string | number;
  height: number;
  image: string;
  title?: string;
  description?: string;
  year?: string;
}

interface GridItem extends GalleryItem {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MasonryProps {
  data: GalleryItem[];
}

function Masonry({ data }: MasonryProps) {
  // Responsive column management
  const [columns, setColumns] = useState(3);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Remove filter/search logic
  // Use data directly
  const galleryData = data.filter(item => !!item.image);

  // Handle window resize for responsive columns
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1536) { // 2xl
        setColumns(5);
      } else if (window.innerWidth >= 1280) { // xl
        setColumns(4);
      } else if (window.innerWidth >= 1024) { // lg
        setColumns(3);
      } else if (window.innerWidth >= 768) { // md
        setColumns(2);
      } else { // sm
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Update container width on resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate masonry layout
  const [columnHeights, gridItems] = useMemo(() => {
    const currentColumnHeights = new Array(columns).fill(0);
    const calculatedGridItems: GridItem[] = [];

    galleryData.forEach((item) => {
      const targetColumnIndex = currentColumnHeights.indexOf(
        Math.min(...currentColumnHeights)
      );

      const itemWidth = containerWidth / columns;
      const aspectRatio = 3/4; // Default aspect ratio
      const itemHeight = item.height ? item.height : itemWidth * aspectRatio;

      const x = itemWidth * targetColumnIndex;
      const y = currentColumnHeights[targetColumnIndex];

      currentColumnHeights[targetColumnIndex] += itemHeight + 15; // 15px for gap

      calculatedGridItems.push({
        ...item,
        x,
        y,
        width: itemWidth - 15, // Account for gap
        height: itemHeight,
      });
    });

    return [currentColumnHeights, calculatedGridItems];
  }, [columns, galleryData, containerWidth]);

  // Animation transitions
  const transitions = useTransition(gridItems, {
    keys: (item) => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  // Navigation functions for lightbox
  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;

    const currentIndex = galleryData.findIndex(item => item.id === selectedImage.id);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    // Wrap around
    if (newIndex < 0) newIndex = galleryData.length - 1;
    if (newIndex >= galleryData.length) newIndex = 0;

    setSelectedImage(galleryData[newIndex]);
    setSelectedIndex(newIndex);
  };

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="w-full mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Visual Journey of Dr. Naresh Kumar Chaudhary
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A photographic chronicle of humanitarian service, awards, and milestones
        </p>
      </div>
      
      <div className="w-full mx-auto">
        <div
          ref={containerRef}
          className={cn("relative w-full rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg")}
          style={{ height: Math.max(...columnHeights) || 0 }}
        >
          {transitions((style, item) => (
            <a.div
              key={item.id}
              style={style}
              className="absolute [will-change:transform,width,height,opacity] cursor-pointer hover:z-10"
              onClick={() => {
                setSelectedImage(item);
                setSelectedIndex(galleryData.findIndex(i => i.id === item.id));
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <Image
                  src={item.image}
                  alt={item.title || "Gallery image"}
                  fill
                  className="object-cover"
                  // sizes="(max-width: 880px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,..." 
                />
                {(item.title || item.year) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    {item.year && (
                      <span className="text-xs font-medium text-white/80">{item.year}</span>
                    )}
                    {item.title && (
                      <h3 className="text-sm font-semibold text-white line-clamp-1">{item.title}</h3>
                    )}
                  </div>
                )}
              </div>
            </a.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="w-full p-0 bg-transparent border-none shadow-none">
            <div className="relative w-full h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="flex flex-col md:flex-row h-full w-full">
                <div className="relative w-full h-96 md:h-[80vh] bg-black">
                  <Image
                    src={selectedImage.image}
                    alt={selectedImage.title || "Selected image"}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export const Component = Masonry;