import { Component } from "@/components/ui/fullgallery";



const folder = encodeURIComponent("Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary");

const data = Array.from({ length: 70 }, (_, i) => ({
    id: i + 1,
    image: `/${folder}/${i + 1}.jpeg`,
    height: '400'
  }));

const Gallery = () => {
    return (
        <div className="flex w-full h-screen justify-center items-center p-4 bg-gray-50 dark:bg-gray-950">
            <div className="w-full max-w-screen-xl mx-auto h-[80vh] overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-900 p-4">
                <Component data={data} />
            </div>
        </div>
    );
};

export default Gallery;