import React from "react";
import { Timeline } from "@/components/ui/big-timeline";
import data from "@/components/constant/dataconstant";
import Navbar from "../../components/page-ui/nav/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards & Achievements – Certificates, Honors & Recognitions",
  description:
    "Complete timeline of Dr. Naresh Kumar Chaudhary's awards and achievements from 2002 to 2025 — President APJ Abdul Kalam Thanks Batch (2007), Prime Minister Appreciation (2022), Red Cross honors, COVID-19 warrior certificates, Kedarnath flood relief recognition, Kumbh Mela service awards, Kawar Yatra medical camp honors, and environmental conservation recognitions from Uttarakhand Government.",
  alternates: {
    canonical: "https://drnaresh.in/achievements",
  },
  openGraph: {
    title:
      "Awards & Achievements — Dr. Naresh Kumar Chaudhary",
    description:
      "Complete collection of 25+ national and state-level honors: President Kalam award, PM appreciation, Red Cross certificates, flood relief and COVID warrior recognitions.",
    url: "https://drnaresh.in/achievements",
    images: [
      {
        url: "/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/1.jpeg",
        width: 1200,
        height: 630,
        alt: "Dr. Naresh Kumar Chaudhary receiving Thanks Batch from President APJ Abdul Kalam at Rashtrapati Bhavan 2007",
      },
    ],
  },
};

export default function FullAchievements() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Timeline data={data} />
    </div>
  );
}
