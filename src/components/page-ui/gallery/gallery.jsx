'use client';

import { Component } from "@/components/ui/fullgallery";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { useState } from "react";

const folder = "Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary";

const Gallery = () => {
  const [paperCutMode, setPaperCutMode] = useState(false);

  const originalData = [
    ...Array.from({ length: 70 }, (_, i) => ({
      id: i + 1,
      image: `/${folder}/${i + 1}.jpeg`,
      height: 400,
      title: `Image ${i + 1}`,
    })),
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 71,
      image: `/${folder}/${i + 71}.jpg`,
      height: 400,
      title: `Image ${i + 71}`,
    })),
  ];

  const paperCutData = [
    ...Array.from({ length: 137 }, (_, i) => ({
      id: i + 1,
      image: `/paper/${i + 1}.jpg`,
      height: 400,
      title: `Image ${i + 1}`,
    })),
  ];

  const currentData = paperCutMode ? paperCutData : originalData;

  return (
    <div className="flex flex-col w-full min-h-screen justify-start items-center p-4 bg-gray-50 dark:bg-gray-950 gap-4">
      <div className="w-full flex justify-end">
        <Button
          variant={paperCutMode ? "default" : "outline"}
          onClick={() => setPaperCutMode(!paperCutMode)}
          className="flex items-center gap-2 transition-all duration-300"
        >
          <Scissors className="h-4 w-4" />
          {paperCutMode ? "Original View" : "Paper Cut View"}
        </Button>
      </div>

      <div className="w-full h-[90vh] overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-900 p-4">
        <Component data={currentData} />
      </div>
    </div>
  );
};

export default Gallery;