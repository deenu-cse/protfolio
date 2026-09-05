import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://drnaresh.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Dr. Naresh Kumar Chaudhary – Padma Shri Nominee | Humanitarian & Social Worker, Haridwar, Uttarakhand",
    template: "%s | Dr. Naresh Kumar Chaudhary",
  },

  description:
    "Official portfolio of Dr. Naresh Kumar Chaudhary — Padma Shri Award Nominee, President APJ Abdul Kalam Thanks Batch recipient (2007), Indian Red Cross Society leader in Uttarakhand. Over 38 years of humanitarian service including Kedarnath flood relief (2013), COVID-19 pandemic response, Kumbh Mela medical camps, Ganga conservation, and afforestation drives in Haridwar.",

  keywords: [
    "Dr. Naresh Kumar Chaudhary",
    "Dr Naresh Chaudhary Haridwar",
    "Padma Shri Nominee Uttarakhand",
    "Padma Shri Award Nominee Dr Naresh Kumar Chaudhary",
    "APJ Abdul Kalam Thanks Batch award",
    "President Kalam award 2007",
    "Indian Red Cross Society Uttarakhand",
    "Red Cross Haridwar",
    "Kedarnath flood relief 2013",
    "Uttarakhand flood rescue volunteer",
    "COVID warrior Uttarakhand",
    "COVID-19 relief Haridwar",
    "Kumbh Mela medical camp Haridwar",
    "Haridwar Kumbh 2010 volunteer",
    "Kawar Yatra medical service",
    "Ganga conservation Haridwar",
    "afforestation Uttarakhand",
    "environmental activist Haridwar",
    "social worker Haridwar",
    "humanitarian Uttarakhand",
    "disaster relief Uttarakhand volunteer",
    "community leader Haridwar",
    "Uttarakhand social service",
    "drnaresh.in",
  ],

  authors: [
    { name: "Dr. Naresh Kumar Chaudhary", url: SITE_URL },
  ],
  creator: "Dr. Naresh Kumar Chaudhary",
  publisher: "Dr. Naresh Kumar Chaudhary",

  category: "Social Work & Humanitarian Service",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Dr. Naresh Kumar Chaudhary – Official Portfolio",
    title:
      "Dr. Naresh Kumar Chaudhary – Padma Shri Nominee | Humanitarian Leader, Uttarakhand",
    description:
      "Padma Shri Award Nominee. Awarded Thanks Batch by President APJ Abdul Kalam (2007). 38+ years of humanitarian service — Kedarnath flood relief, COVID-19 response, Kumbh Mela medical camps, Red Cross leadership in Uttarakhand.",
    images: [
      {
        url: "/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/1.jpeg",
        width: 1200,
        height: 630,
        alt: "Dr. Naresh Kumar Chaudhary — Padma Shri Award Nominee, Humanitarian Leader from Haridwar, Uttarakhand",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Dr. Naresh Kumar Chaudhary – Padma Shri Nominee | Humanitarian, Uttarakhand",
    description:
      "Official portfolio — Padma Shri Nominee, APJ Abdul Kalam awardee, Red Cross leader. 38+ years of disaster relief, public health & environmental conservation in Uttarakhand.",
    images: [
      "/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/1.jpeg",
    ],
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
      "hi-IN": SITE_URL,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Add your Google Search Console verification code here:
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="geo.region" content="IN-UK" />
        <meta name="geo.placename" content="Haridwar, Uttarakhand" />
        <meta name="geo.position" content="29.9457;78.1642" />
        <meta name="ICBM" content="29.9457, 78.1642" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
