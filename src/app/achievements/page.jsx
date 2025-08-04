"use client";

import React from "react";
import { Timeline } from "@/components/ui/big-timeline";
import data from "@/components/constant/dataconstant";


export default function FullAchievements() {
    return (
        <div className="min-h-screen w-full">
            <Timeline data={data} />
        </div>
    );
}
