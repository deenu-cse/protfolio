import Gallery from "../../components/page-ui/gallery/gallery";
import Navbar from "../../components/page-ui/nav/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery – Humanitarian Work, Awards & Service Moments",
  description:
    "Browse 90+ photos documenting Dr. Naresh Kumar Chaudhary's decades of humanitarian work — Padma Shri Award Nominee moments, Kedarnath flood rescue operations (2013), COVID-19 relief drives, Kumbh Mela medical camps, Ganga conservation projects, afforestation in Haridwar, Red Cross service in Uttarakhand, and paper cutting art collection.",
  alternates: {
    canonical: "https://drnaresh.in/gallery",
  },
  openGraph: {
    title:
      "Photo Gallery — Dr. Naresh Kumar Chaudhary's Humanitarian Journey",
    description:
      "90+ photos of four decades of service: disaster relief, health camps, environmental work, and national honors in Uttarakhand.",
    url: "https://drnaresh.in/gallery",
    images: [
      {
        url: "/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/2.jpeg",
        width: 1200,
        height: 630,
        alt: "Dr. Naresh Kumar Chaudhary humanitarian service photo gallery",
      },
    ],
  },
};

const FullGallery = () => {
  return (
    <div>
      <Navbar />
      <Gallery />
    </div>
  );
};

export default FullGallery;
