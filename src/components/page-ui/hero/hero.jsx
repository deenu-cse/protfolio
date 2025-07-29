import { Scene } from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, HeartHandshake, ShieldPlus, Trees, Ambulance, BookOpen, Award } from "lucide-react";
import Image from "next/image";
import InfiniteSliderimg from '../hero/imgbackground'
import SpecialMovement from '../special/special'
import VideoCarousel from '../videosection/video'
import Link from "next/link";

const features = [
    {
        icon: HeartHandshake,
        title: "Humanitarian Work",
        description: "Life-saving efforts during Kedarnath floods & COVID-19 pandemic",
    },
    {
        icon: ShieldPlus,
        title: "Public Health",
        description: "Organized 1000+ medical camps serving millions of pilgrims",
    },
    {
        icon: Trees,
        title: "Environmental",
        description: "Large-scale afforestation & Ganga conservation initiatives",
    },
    {
        icon: Ambulance,
        title: "Disaster Relief",
        description: "Leading Red Cross operations in Uttarakhand for 20+ years",
    },
    {
        icon: BookOpen,
        title: "Education",
        description: "Supporting children's education for underprivileged students",
    },
    {
        icon: Award,
        title: "Recognitions",
        description: "Honored by President, PM, and multiple Chief Ministers",
    },
];

const HeroSection = () => {
    return (
        <div className="min-h-svh w-screen bg-linear-to-br from-[#000] to-[#1A2428] text-white flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-6xl space-y-12 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <Badge variant="secondary" className="backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 px-4 py-2 rounded-full text-black
                    ">
                        ✨ Social Work Luminary
                    </Badge>

                    <div className="space-y-6 flex items-center justify-center flex-col">
                        <h1 className="text-3xl text-amber-500 md:text-6xl font-semibold tracking-tight max-w-3xl">
                            Dr. Naresh Kumar Chaudhary
                        </h1>
                        <p className="text-lg text-amber-500 max-w-2xl backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 px-4 py-2 rounded-full">
                            Four decades of transformative service in humanitarian aid, public health, environmental conservation, and cultural preservation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <Link href={'/gallery'}>
                                <Button className="text-sm px-8 py-3 rounded-xl bg-white text-black border border-white/10 shadow-none hover:bg-white/90 transition-none cursor-pointer">
                                    View Achievements
                                </Button>
                            </Link>
                            {/* <Button className="text-sm px-8 py-3 rounded-xl bg-transparent text-white border border-white/20 shadow-none hover:bg-white/10 transition-none">
                                Watch Documentary
                            </Button> */}
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div >
                    <SpecialMovement />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-2 md:p-3 h-40 md:h-48 flex flex-col justify-start items-start space-y-2 md:space-y-3"
                        >
                            <h3 className="text-sm md:text-base font-medium">{feature.title}</h3>
                            <p className="text-xs md:text-sm text-neutral-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='absolute inset-0'>
                <InfiniteSliderimg />
            </div>
        </div>
    );
};

const ProfileDetails = () => {
    return (
        <div className="w-full py-20 px-8 bg-linear-to-br from-[#1A2428] to-[#0D1214] text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Personal Details */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold border-b border-white/20 pb-2">Personal Details</h2>
                        <div className="space-y-2">
                            <p><span className="text-neutral-400">Full Name:</span> Dr. Naresh Kumar Chaudhary</p>
                            <p><span className="text-neutral-400">Date of Birth:</span> 03/06/1961</p>
                            <p><span className="text-neutral-400">Nationality:</span> Indian</p>
                            <p><span className="text-neutral-400">Religion:</span> Hindu</p>
                            <p><span className="text-neutral-400">Category:</span> OBC</p>
                            <p><span className="text-neutral-400">Father's Name:</span> Shri Bhopal Singh</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold border-b border-white/20 pb-2">Contact</h2>
                        <div className="space-y-2">
                            <p><span className="text-neutral-400">Address:</span> Near Sevasamiti Bhawan Sharavan Nath Nagar Haridwar, Uttarakhand-249401</p>
                            <p><span className="text-neutral-400">Email:</span> drnaresh2266@gmail.com</p>
                            <p><span className="text-neutral-400">Phone:</span> +91 98373 52202</p>
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="space-y-8 md:col-span-2">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold border-b border-white/20 pb-2">Notable Achievements</h2>
                        <ul className="space-y-4 list-disc pl-5">
                            <li>Organized medical camps serving millions during Kumbh Mela and other religious gatherings</li>
                            <li>Led rescue and rehabilitation efforts during 2013 Kedarnath floods</li>
                            <li>Pioneered COVID-19 relief operations in Uttarakhand</li>
                            <li>Conducted massive afforestation drives in Haridwar region</li>
                            <li>Established numerous health camps in remote areas</li>
                            <li>Promoted cultural heritage through festivals and workshops</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold border-b border-white/20 pb-2">Awards & Honors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h3 className="font-medium">Thanks Batch</h3>
                                <p className="text-sm text-neutral-400">Awarded by President Dr. A.P.J. Abdul Kalam (2007)</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h3 className="font-medium">PM Appreciation</h3>
                                <p className="text-sm text-neutral-400">Honored by Prime Minister (2022)</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h3 className="font-medium">State Honors</h3>
                                <p className="text-sm text-neutral-400">Recognized by multiple Uttarakhand CMs</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h3 className="font-medium">International Award</h3>
                                <p className="text-sm text-neutral-400">2021 Agriculture Minister Recognition</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PortfolioPage = () => {
    return (
        <div className="bg-black text-white">
            <HeroSection />
            <ProfileDetails />

            {/* Video Testimonial Section */}
            <div className="py-2 px-8 bg-linear-to-br from-[#0D1214] to-[#1A2428]">
                <VideoCarousel />
            </div>
        </div>
    );
};

export default PortfolioPage;