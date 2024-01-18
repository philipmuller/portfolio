"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
    const [viewingAboutMe, setViewingAboutMe] = useState(true);

    return (
        <div className="h-14 flex justify-center pointer-events-none items-center fixed z-50 start-0 end-0 lg:bottom-10">
            <nav className="flex relative flex-col pointer-events-auto backdrop-blur-md p-2 px-6 rounded-full shadow-none lg:bg-stone-700/50 lg:shadow-[0_0px_18px_10px_rgba(0,0,0,0.3)]">
                <div className="flex flex-row gap-16 text-white">
                    <button className={viewingAboutMe ? "lg:text-stone-800" : "lg:text-stone-20"} onClick={() => setViewingAboutMe(true)}>About me</button>
                    <button className={!viewingAboutMe ? "lg:text-stone-800" : "lg:text-stone-20"} onClick={() => setViewingAboutMe(false)}>Projects</button>
                </div>
                <motion.div className={`h-px lg:h-8 rounded lg:rounded-full bg-white absolute bottom-2 bottom-1 lg:bottom-1 start-4 lg:start-1.5 -z-10 ${viewingAboutMe ? "w-[6rem] lg:w-[7rem]" : "w-[5rem] lg:w-[6.2rem]" }`}
                animate={{
                    x: viewingAboutMe ? -1 : 136,
                }} />
            </nav>
        </div>
    )
}