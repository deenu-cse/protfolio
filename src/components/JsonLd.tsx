export default function JsonLd() {
  const SITE_URL = "https://drnaresh.in";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Naresh Kumar Chaudhary",
    alternateName: [
      "Dr Naresh Chaudhary",
      "Dr. Naresh Kumar Chaudhary Haridwar",
      "डॉ. नरेश कुमार चौधरी",
    ],
    jobTitle: "Humanitarian & Social Worker",
    description:
      "Padma Shri Award Nominee, Indian Red Cross Society leader in Uttarakhand with over 38 years of humanitarian service in disaster relief, public health, environmental conservation, and cultural preservation.",
    url: SITE_URL,
    image:
      `${SITE_URL}/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/1.jpeg`,
    email: "drnaresh2266@gmail.com",
    telephone: "+91-98373-52202",
    birthDate: "1961-06-03",
    nationality: {
      "@type": "Country",
      name: "India",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Sevasamiti Bhawan, Sharavan Nath Nagar",
      addressLocality: "Haridwar",
      addressRegion: "Uttarakhand",
      postalCode: "249401",
      addressCountry: "IN",
    },
    memberOf: [
      {
        "@type": "Organization",
        name: "Indian Red Cross Society, Uttarakhand",
        url: "https://www.indianredcross.org/",
      },
    ],
    award: [
      "Padma Shri Award Nominee — Government of India",
      "Thanks Batch — Awarded by President Dr. APJ Abdul Kalam at Rashtrapati Bhavan (2007) for exemplary leadership during 15th International Scout Guide Jamboree",
      "Prime Minister Appreciation Award (2022)",
      "State Honor — Recognized by multiple Chief Ministers of Uttarakhand for outstanding social service",
      "Agriculture Minister Recognition (2021)",
      "District Administration Haridwar — COVID-19 Pandemic Voluntary Service Honor (2023)",
      "Indian Red Cross Society — COVID Warrior Recognition",
      "Red Cross Uttarakhand — Kedarnath Flood Relief Service Recognition (2013)",
      "Uttarakhand Flood Relief Certificate (2024)",
      "Red Cross Uttarakhand Flood Recognition (2024)",
      "Kumbh Mela Volunteer Service Award — Haridwar Kumbh (2010)",
      "Kawar Yatra Medical Camp Service Recognition (2014)",
      "Afforestation & Ganga Conservation Achievement Awards — Haridwar",
    ],
    knowsAbout: [
      "Humanitarian Aid",
      "Disaster Relief",
      "Public Health",
      "Environmental Conservation",
      "Ganga Conservation",
      "Afforestation",
      "Red Cross Operations",
      "Medical Camp Organization",
      "Community Leadership",
      "Cultural Preservation",
    ],
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dr. Naresh Kumar Chaudhary — Official Portfolio",
    alternateName: "DrNaresh.in",
    url: SITE_URL,
    description:
      "Official portfolio of Dr. Naresh Kumar Chaudhary, Padma Shri Award Nominee, humanitarian and social worker from Haridwar, Uttarakhand.",
    publisher: {
      "@type": "Person",
      name: "Dr. Naresh Kumar Chaudhary",
    },
    inLanguage: ["en", "hi"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Achievements & Awards",
        item: `${SITE_URL}/achievements`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Photo Gallery",
        item: `${SITE_URL}/gallery`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
