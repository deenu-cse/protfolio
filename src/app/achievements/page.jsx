"use client";

import React from "react";
import { Timeline } from "@/components/ui/big-timeline";
import data from "@/components/constant/dataconstant";
import Navbar from "../../components/page-ui/nav/navbar";


export default function FullAchievements() {
    return (
        <div className="min-h-screen w-full">
            <Navbar/>
            <Timeline data={data} />
        </div>
    );
}
