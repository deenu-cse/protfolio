"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageData {
    src: string;
    year: string;
}

const ImageModal = ({
    images,
    initialIndex,
    onClose,
    year
}: {
    images: ImageData[];
    initialIndex: number;
    onClose: () => void;
    year: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [direction, setDirection] = useState(0);

    // Reset currentIndex when initialIndex changes
    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, onClose]);

    const goToNext = () => {
        if (images.length === 0) return;
        setDirection(1);
        setCurrentIndex(prev => (prev + 1) % images.length);
    };

    const goToPrev = () => {
        if (images.length === 0) return;
        setDirection(-1);
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    if (images.length === 0) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col overflow-y-auto">
                <div className="flex justify-between items-center p-4 bg-black/50 text-white">
                    <h3 className="text-xl font-semibold">{images[currentIndex]?.year || year}</h3>
                    <button
                        onClick={onClose}
                        className="text-2xl hover:text-blue-400 transition-colors"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>

                <div className="relative flex-grow overflow-y-auto">
                    <AnimatePresence custom={direction} initial={false}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            {images[currentIndex] && (
                                <Image
                                    src={images[currentIndex].src}
                                    alt={`Achievement from ${images[currentIndex].year}`}
                                    width={800}
                                    height={600}
                                    className="object-cover h-full p-4"
                                    priority
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-between items-center p-4 bg-black/50 text-white">
                    <span className="text-sm">
                        {images.length > 0 ? `${currentIndex + 1} / ${images.length}` : '0/0'}
                    </span>
                    <div className="flex gap-4">
                        <button
                            onClick={goToPrev}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Previous image"
                            disabled={images.length === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={goToNext}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Next image"
                            disabled={images.length === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ImageModal;