"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "./button";
import ImageModal from "./image-modal";
import Image from "next/image";

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
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const entryRefs = useRef<Map<string, HTMLElement>>(new Map());

    // Career highlights data
    const highlights = [
        {
            title: "Pioneering Research",
            description: "Led groundbreaking research that changed industry standards",
            icon: "🔬"
        },
        {
            title: "Academic Leadership",
            description: "Served as Head of Department for 8 years, transforming curriculum",
            icon: "🎓"
        },
        {
            title: "Community Service",
            description: "Organized 15+ humanitarian missions with Red Cross Society",
            icon: "❤️"
        }
    ];

    // Decades overview data
    const decades = [
        { year: "2000s", count: 42, color: "from-purple-500 to-blue-500" },
        { year: "2010s", count: 58, color: "from-blue-500 to-emerald-500" },
        { year: "2020s", count: 27, color: "from-emerald-500 to-amber-500" }
    ];

    // Extract unique years from data
    const years = Array.from(new Set(data.map(item => item.title))).sort((a, b) => {
        const getMaxYear = (str: string) => Math.max(...str.split(/\s*-\s*/).map(Number));
        return getMaxYear(b) - getMaxYear(a);
    });

    function extractImages(content: React.ReactNode): { src: string, year: string }[] {
        const images: { src: string, year: string }[] = [];

        if (React.isValidElement<{ children?: React.ReactNode }>(content)) {
            const children = React.Children.toArray(content.props.children);

            const grid = children.find((child) => {
                if (React.isValidElement<{ className?: string }>(child)) {
                    return child.props.className?.includes("grid");
                }
                return false;
            });

            if (React.isValidElement<{ children?: React.ReactNode }>(grid)) {
                React.Children.forEach(grid.props.children, (img) => {
                    if (React.isValidElement<{ src?: string }>(img) && img.props.src) {
                        images.push({ src: img.props.src, year: "" });
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

    const filteredData = selectedYear
        ? data.filter(item => item.title === selectedYear)
        : data;

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
    }, [filteredData]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const handleYearFilter = (year: string) => {
        setSelectedYear(year === selectedYear ? null : year);

        setTimeout(() => {
            const element = entryRefs.current.get(year);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }, 100);
    };

    return (
        <div
            className="w-full bg-gradient-to-br from-[#1A2428] to-[#0D1214] text-white dark:bg-neutral-950 font-sans md:px-10"
            ref={containerRef}
        >
            {/* 1. Professional Summary Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 mb-16"
                >
                    <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Distinguished Journey of Service
                    </h2>
                    <p className="text-lg text-neutral-300 mb-6">
                        With over {new Date().getFullYear() - 1986} years of dedicated social service,
                        Dr. Naresh Kumar Chaudhary has established himself as a leading humanitarian
                        and community leader in Uttarakhand. This timeline showcases his remarkable
                        achievements in disaster relief, public health, environmental conservation,
                        and cultural preservation through the Indian Red Cross Society and community initiatives.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400">38+</div>
                            <div className="text-sm text-neutral-400">Years of Service</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400">50+</div>
                            <div className="text-sm text-neutral-400">Major Relief Operations</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400">100K+</div>
                            <div className="text-sm text-neutral-400">Lives Impacted</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400">25+</div>
                            <div className="text-sm text-neutral-400">National Honors</div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. Career Highlights */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Humanitarian Milestones
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Disaster Relief",
                                description: "Led rescue & rehabilitation during 2013 Kedarnath floods, saving hundreds",
                                icon: "🚑"
                            },
                            {
                                title: "Pandemic Response",
                                description: "Distributed lakhs of food packets and oxygen cylinders during COVID-19",
                                icon: "🩺"
                            },
                            {
                                title: "Religious Gatherings",
                                description: "Organized medical camps for millions during Kumbh Mela and Kawar Yatra",
                                icon: "🕉️"
                            }
                        ].map((highlight, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-6 rounded-xl"
                            >
                                <div className="text-4xl mb-4">{highlight.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                                <p className="text-neutral-300">{highlight.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src="/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/1.jpeg"
                            alt="Presidential Award"
                            width={600}
                            height={400}
                            className="rounded-xl shadow-2xl border-2 border-white/20"
                        />
                    </motion.div>
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="text-sm font-semibold text-blue-400 mb-2 inline-block">Pinnacle Achievement</span>
                        <h2 className="text-3xl font-bold mb-4">Thanks Batch from President Kalam</h2>
                        <p className="text-neutral-300 mb-6">
                            Awarded in 2007 at Rashtrapati Bhavan for exemplary leadership during the
                            15th International Scout Guide Jamboree. This prestigious national honor
                            recognizes Dr. Chaudhary&apos;s exceptional contributions to humanitarian service.
                        </p>
                        {/* <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10">
                            View Citation
                        </Button> */}
                    </motion.div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Decades of Impact
                    </h2>
                    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                        {[
                            { year: "2000s", count: 42, color: "from-purple-500 to-blue-500", label: "Kumbh Mela & Disaster Relief" },
                            { year: "2010s", count: 58, color: "from-blue-500 to-emerald-500", label: "Kedarnath Floods & Health Camps" },
                            { year: "2020s", count: 27, color: "from-emerald-500 to-amber-500", label: "COVID Response & Red Cross Leadership" }
                        ].map((decade, index) => (
                            <motion.div
                                key={index}
                                className="group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium">{decade.year}</span>
                                    <span className="text-sm text-neutral-400">{decade.count} initiatives</span>
                                </div>
                                <div className="text-xs text-neutral-500 mb-1">{decade.label}</div>
                                <div
                                    className={`h-3 rounded-full bg-gradient-to-r ${decade.color} transition-all duration-500 group-hover:h-4`}
                                    style={{ width: `${(decade.count / 100) * 100}%` }}
                                ></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

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
                    className="text-neutral-300 text-base md:text-lg max-w-2xl mb-8"
                >
                    A look back at my journey of volunteerism, public service, and humanitarian contributions through the Indian Red Cross Society and community action.
                </motion.p>

                <div className="flex flex-wrap gap-2 mt-8 mb-12">
                    <Button
                        variant={!selectedYear ? "default" : "outline"}
                        onClick={() => handleYearFilter("")}
                        className="rounded-full cursor-pointer text-blue-500"
                    >
                        All Years
                    </Button>
                    {years.map(year => (
                        <Button
                            key={year}
                            variant={selectedYear === year ? "default" : "outline"}
                            onClick={() => handleYearFilter(year)}
                            className="rounded-full cursor-pointer text-blue-500"
                        >
                            {year}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Timeline Section */}
            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {filteredData.map((item, index) => {
                    const setEntryRef = (el: HTMLElement | null) => {
                        if (el) {
                            entryRefs.current.set(item.title, el);
                        }
                    };

                    return (
                        <motion.div
                            key={index}
                            ref={setEntryRef}
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
                                    {React.isValidElement<{ children?: React.ReactNode }>(item.content) ? (() => {
                                        const children = React.Children.toArray(item.content.props.children);
                                        const grid = children.find((child) => {
                                            if (React.isValidElement<{ className?: string }>(child)) {
                                                return child.props.className?.includes("grid");
                                            }
                                            return false;
                                        });

                                        if (React.isValidElement<{ children?: React.ReactNode; className?: string }>(grid)) {
                                            return (
                                                <div className={grid.props.className}>
                                                    {React.Children.map(grid.props.children, (img) => {
                                                        if (
                                                            React.isValidElement<{ src?: string }>(img) &&
                                                            img.props.src &&
                                                            (img.type === "img" || img.type === Image)
                                                        ) {
                                                            return React.cloneElement(img, {
                                                                onClick: () => handleImageClick(img.props.src!, item.title),
                                                                style: { cursor: "pointer" }
                                                            } as React.HTMLProps<HTMLImageElement>);
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
                    );
                })}
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