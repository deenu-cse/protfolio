import PortfolioPage from '../components/page-ui/hero/hero'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Dr. Naresh Kumar Chaudhary – Padma Shri Nominee | Humanitarian & Social Worker, Haridwar, Uttarakhand",
  description:
    "Official portfolio of Dr. Naresh Kumar Chaudhary — Padma Shri Award Nominee, President APJ Abdul Kalam Thanks Batch recipient (2007), Indian Red Cross Society leader. 38+ years of humanitarian service: Kedarnath flood relief, COVID-19 response, Kumbh Mela medical camps, Ganga conservation, afforestation in Haridwar, Uttarakhand.",
  alternates: {
    canonical: "https://drnaresh.in",
  },
  openGraph: {
    title:
      "Dr. Naresh Kumar Chaudhary – Padma Shri Nominee | Humanitarian Leader",
    description:
      "Padma Shri Nominee. President APJ Abdul Kalam awardee. 38+ years of Red Cross leadership, disaster relief, public health & environmental conservation in Uttarakhand.",
    url: "https://drnaresh.in",
    images: [
      {
        url: "/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/1.jpeg",
        width: 1200,
        height: 630,
        alt: "Dr. Naresh Kumar Chaudhary — Padma Shri Award Nominee from Haridwar, Uttarakhand",
      },
    ],
  },
};

export default function Home() {
  return (
    <div>
      <PortfolioPage/>
    </div>
  );
}
