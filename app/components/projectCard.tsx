"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function ProjectCard({ sceneLink, bgColor, title } : { sceneLink: string, bgColor: string, title: string }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const containerVariants = {
        compact: {
            backgroundColor: bgColor,
            zIndex: 1,
            padding: "2rem",
            position: "relative",
            height: "100svh",
        },
        expanded: {
            backgroundColor: bgColor,
            zIndex: 200,
            padding: 0,
            position: "absolute",
            height: "auto",
        },
    };
    
    const cardVariants = {
        compact: {
            borderRadius: "2rem",
            //position: "relative",
            height: "70svh",
        },
        expanded: {
            borderRadius: "0rem",
            //position: "fixed",
            height: "100svh",
        }
    };
    
    const onClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.section className={`w-full min-h-[100svh] flex flex-col gap-6 snap-center snap-always snap-mandatory`}
        onViewportEnter={() => {
            const metaThemeColor = document.querySelector("meta[name=theme-color]");
            console.log(metaThemeColor);
            metaThemeColor?.setAttribute("content", bgColor);
        }}
        layout
        // @ts-ignore for some reason putting position into variants throws an error, even if it works
        variants={containerVariants}
        animate={isExpanded ? "expanded" : "compact"}>

            <motion.div
            className="w-full items-center justify-between font-mono text-sm overflow-hidden rounded-2xl"
            layout
            variants={cardVariants}
            initial="compact"
            animate={isExpanded ? "expanded" : "compact"}>
                <Spline scene={sceneLink} />
            </motion.div>

            <div className='flex flex-col basis-1/6 px-6 z-10 gap-1'>
                <h1 className='text-lg font-medium tracking-widest uppercase'>{title}</h1>
                <p className='text-sm font-light opacity-80'>Write and learn formal logic like never before, designed for iPhone.</p>
                <button onClick={onClick} className='text-sm w-fit font-normal p-2 px-4 rounded-xl mt-4 underline-offset-4 bg-white text-stone-800'>Learn more</button>
            </div>

        </motion.section>
    );
}