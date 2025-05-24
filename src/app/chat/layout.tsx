'use client';

import React from "react";
import { SideBar } from "./sidebar"
import { TopBar } from "./navbar";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return <>
        <div className="flex w-screen h-screen">
            <SideBar />
            <div className="">

            </div>
            <div className="flex flex-col flex-grow">
            <TopBar />
            {children}
            </div>
            
        </div>
    </>;
}