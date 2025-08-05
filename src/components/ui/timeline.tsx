"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function updateHeight() {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
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

  return (
    <div
      className="w-full bg-linear-to-br from-[#1A2428] to-[#0D1214] text-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-3xl mx-auto mb-0 relative pt-10 px-6">
        <div className="absolute -left-6 top-4 text-7xl opacity-20 bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-purple-600">
          &quot;
        </div>

        <motion.blockquote
          className="text-2xl md:text-3xl italic text-center font-light leading-relaxed text-neutral-200 mb-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.2, 0.85, 0.45, 1]
          }}
        >
          <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
            True service is not measured by awards but by the lives we touch and uplift.
          </span>
          <br className="hidden md:block" />
          <span className="text-neutral-300">
            My mission has always been to bridge humanitarian action with sustainable
            community development, honoring both our cultural heritage and our environment.
          </span>
        </motion.blockquote>

        <div className="absolute -right-6 bottom-4 text-7xl opacity-20 bg-clip-text text-transparent bg-gradient-to-b from-blue-400 to-purple-600">
          &quot;
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
      <div className="text-center mt-8 pb-4">
        <Link href="/achievements" passHref>
          <Button asChild className="bg-blue-200/20 group cursor-pointer text-white backdrop-blur-md border border-blue-300/30 rounded-lg px-6 py-2 hover:bg-blue-300/20 transition duration-200 shadow-lg">
            <span className="inline-flex items-center">
              View More Achievements
              <span className="ml-2 transition-all group-hover:translate-x-2">
                <ChevronRight />
              </span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
