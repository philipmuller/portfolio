"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function ProjectCard({ sceneLink, bgColor } : { sceneLink: string, bgColor: string }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const containerVariants = {
        compact: {
            backgroundColor: bgColor,
            zIndex: 1,
            padding: "2rem",
            position: "relative",
        },
        expanded: {
            backgroundColor: bgColor,
            zIndex: 200,
            padding: 0,
            position: "absolute",
        },
    };
    
    const cardVariants = {
        compact: {
            borderRadius: "2rem",
            //position: "relative",
            height: "70vh",
        },
        expanded: {
            borderRadius: "0rem",
            //position: "fixed",
            height: "90vh",
        }
    };
    
    const onClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.section className={`w-full flex flex-col gap-6 snap-center snap-always snap-mandatory`}
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

            <div className='flex flex-col basis-1/6 px-6 pb-10 z-10 gap-2'>
                <h1 className='text-lg font-medium tracking-widest uppercase'>Organon</h1>
                <p className='text-md font-light opacity-80'>Write and learn formal logic like never before, designed for iPhone.</p>
                <button onClick={onClick} className='text-md w-fit font-normal p-2 px-4 rounded-xl mt-4 tracking-widest underline-offset-4 bg-white text-stone-800'>Learn more</button>
            </div>

        </motion.section>
    );
}