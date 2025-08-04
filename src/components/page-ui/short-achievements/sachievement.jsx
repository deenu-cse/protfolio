"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const data = [
    {
        title: "2023",
        content: (
            <div>
                <p className="text-neutral-300 text-[18px] md:text-[18px] mb-4 max-w-xl">
                    Honored by the District Administration of Haridwar and the Indian Red Cross Society for voluntary service during the COVID‑19 pandemic.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Image
                        src="/achievments/covid-1.jpg"
                        alt="District Administration Haridwar certificate"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                        src="/achievments/covid-6.jpg"
                        alt="Red Cross COVID warrior certificate"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                        src="/achievments/covid-2.jpg"
                        alt="Red Cross COVID warrior certificate"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                        src="/achievments/covid-3.jpg"
                        alt="Red Cross COVID warrior certificate"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                        src="/achievments/covid-4.jpg"
                        alt="Red Cross COVID warrior certificate"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                        src="/achievments/covid-5.jpg"
                        alt="Red Cross COVID warrior certificate"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "2013",
        content: (
            <div>
                <p className="text-neutral-300 text-[18px] md:text-[18px] mb-4 max-w-xl">
                    Participated in relief efforts and Red Cross service during the 2013 Uttarakhand flash floods. Recognized for resilience and community leadership.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Image
                        src="/achievments/flood-1.jpg"
                        alt="Disaster response certificate 2013"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                        src="/achievments/flood-2.jpg"
                        alt="Disaster response certificate 2013"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                        src="/achievments/flood-3.jpg"
                        alt="Disaster response certificate 2013"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                </div>
            </div>
        ),
    },
    {
        title: "2010",
        content: (
            <div>
                <p className="text-neutral-300 text-[18px] md:text-[18px] mb-4 max-w-xl">
                    Volunteered at the 2010 Haridwar Kumbh Mela, aiding Red Cross operations in health support, crowd management, and public safety.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Image
                        src="/achievments/kunbh-1.jpg"
                        alt="Kumbh Mela certificate 2010"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                        src="/achievments/kunbh-4.jpg"
                        alt="Kumbh Mela certificate 2010"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                        src="/achievments/kunbh-2.jpg"
                        alt="Kumbh Mela certificate 2010"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                    <Image
                        src="/achievments/kunbh-3.jpg"
                        alt="Kumbh Mela certificate 2010"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover shadow-md"
                    />
                </div>
            </div>
        ),
    },
];

export default function ShortAchievements() {
    return (
        <div className="min-h-screen w-full">
            <Timeline data={data} />
        </div>
    );
}
