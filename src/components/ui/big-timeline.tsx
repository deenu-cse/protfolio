"use client";
import {
    useMotionValueEvent,
    useScroll,
    useTransform,
    motion,
    AnimatePresence
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import ImageModal from "./image-modal";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
    description?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [selectedImage, setSelectedImage] = useState<{ src: string, index: number, year: string } | null>(null);
    const [allImages, setAllImages] = useState<{ src: string, year: string }[]>([]);

    // Helper to extract images from item.content
    function extractImages(content: React.ReactNode): { src: string, year: string }[] {
        const images: { src: string, year: string }[] = [];
        if (React.isValidElement(content)) {
            const grid = React.Children.toArray(content.props.children).find(
                (child: any) => child?.props?.className?.includes("grid")
            );
            if (grid && React.isValidElement(grid)) {
                React.Children.forEach(grid.props.children, (img: any) => {
                    if (img?.props?.src) {
                        images.push({ src: img.props.src, year: "" }); // year will be set later
                    }
                });
            }
        }
        return images;
    }

    useEffect(() => {
        // Extract all images from data for the carousel
        const images: { src: string, year: string }[] = [];
        data.forEach(entry => {
            extractImages(entry.content).forEach(img => {
                images.push({ src: img.src, year: entry.title });
            });
        });
        setAllImages(images);
    }, [data]);

    const handleImageClick = (src: string, year: string) => {
        const index = allImages.findIndex(img => img.src === src);
        if (index !== -1) {
            setSelectedImage({ src, index, year });
        }
    };

    useEffect(() => {
        function updateHeight() {
            if (ref.current) {
                const entries = ref.current.querySelectorAll(".timeline-entry");
                if (entries.length > 0) {
                    const first = entries[0] as HTMLElement;
                    const last = entries[entries.length - 1] as HTMLElement;
                    const top = first.offsetTop;
                    const bottom = last.offsetTop + last.offsetHeight;
                    setHeight(bottom - top);
                } else {
                    setHeight(ref.current.scrollHeight);
                }
            }
        }
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, [data]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const handleImageClick2 = (e: React.MouseEvent, year: string) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG') {
            const img = target as HTMLImageElement;
            const src = img.getAttribute('src') || '';
            const index = allImages.findIndex(img => img.src === src);
            if (index !== -1) {
                setSelectedImage({ src, index, year });
            }
        }
    };

    return (
        <div
            className="w-full bg-gradient-to-br from-[#1A2428] to-[#0D1214] text-white dark:bg-neutral-950 font-sans md:px-10"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-semibold text-white mb-4 max-w-4xl leading-tight"
                >
                    Milestones of Service and Dedication
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-neutral-300 text-base md:text-lg max-w-2xl"
                >
                    A look back at my journey of volunteerism, public service, and humanitarian contributions through the Indian Red Cross Society and community action.
                </motion.p>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10 timeline-entry"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                                <motion.div
                                    className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2"
                                    whileHover={{ scale: 1.2 }}
                                />
                            </div>
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="text-neutral-300 mb-6 text-sm md:text-base">
                                    {item.description}
                                </p>
                            )}
                            <div className="transform hover:-translate-y-1 transition-transform duration-300">
                                {/* Render images with click handler */}
                                {React.isValidElement(item.content) ? (() => {
                                    const grid = React.Children.toArray(item.content.props.children).find(
                                        (child: any) => child?.props?.className?.includes("grid")
                                    );
                                    if (grid && React.isValidElement(grid)) {
                                        return (
                                            <div className={grid.props.className}>
                                                {React.Children.map(grid.props.children, (img: any) => {
                                                    if (img?.props?.src) {
                                                        return React.cloneElement(img, {
                                                            onClick: () => handleImageClick(img.props.src, item.title),
                                                            style: { cursor: "pointer" }
                                                        });
                                                    }
                                                    return img;
                                                })}
                                            </div>
                                        );
                                    }
                                    return item.content;
                                })() : item.content}
                            </div>
                        </div>
                    </motion.div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <ImageModal
                        images={allImages}
                        initialIndex={selectedImage.index}
                        onClose={() => setSelectedImage(null)}
                        year={selectedImage.year}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};