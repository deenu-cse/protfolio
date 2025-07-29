import { InfiniteSlider } from "@/components/ui/imagebackground"
import Image from "next/image";

const images1 = Array.from({ length: 10 }, (_, i) => ({
    title: `Image ${i + 1}`,
    image: `/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/im1/${i + 1}.jpeg`,
}));
const images2 = Array.from({ length: 10 }, (_, i) => ({
    title: `Image ${i + 1}`,
    image: `/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/im2/${i + 1}.jpeg`,
}));
const images3 = Array.from({ length: 10 }, (_, i) => ({
    title: `Image ${i + 1}`,
    image: `/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/im3/${i + 1}.jpeg`,
}));


const InfiniteSliderimg = () => {
    return (
        <div className="h-[500px] flex flex-col justify-center gap-4">
            <div className="flex items-center space-x-4 mx-auto w-full max-w-max">
                <InfiniteSlider direction="horizontal">
                    {images1.map((image) => (
                        <div key={image.title} className="aspect-square w-[170px] rounded-[4px] pt-6">
                            <Image
                                key={image.title}
                                src={image.image}
                                alt={image.title}
                                width={1200}
                                height={1200}
                                className="object-cover h-full w-full rounded-[4px]"
                            />
                        </div>
                    ))}
                </InfiniteSlider>
            </div>
            <div className="flex items-center space-x-4 mx-auto w-full max-w-max">
                <InfiniteSlider direction="horizontal" reverse>
                    {images2.map((image) => (
                        <div key={image.title} className="aspect-square w-[170px] rounded-[4px]">
                            <Image
                                key={image.title}
                                src={image.image}
                                alt={image.title}
                                width={1800}
                                height={1800}
                                className="object-cover h-full w-full rounded-[4px]"
                            />
                        </div>
                    ))}
                </InfiniteSlider>
            </div>
            <div className="flex items-center space-x-4 mx-auto w-full max-w-max">
                <InfiniteSlider direction="horizontal">
                    {images3.map((image) => (
                        <div key={image.title} className="aspect-square w-[170px] rounded-[4px]">
                            <Image
                                key={image.title}
                                src={image.image}
                                alt={image.title}
                                width={1200}
                                height={1200}
                                className="object-cover h-full w-full rounded-[4px]"
                            />
                        </div>
                    ))}
                </InfiniteSlider>
            </div>
        </div>
    );
}

export default InfiniteSliderimg;