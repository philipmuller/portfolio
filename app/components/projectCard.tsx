"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function ProjectCard({ sceneLink, bgColor, title, span } : { sceneLink: string, bgColor: string, title: string, span?: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [renderIsVisible, setRenderIsVisible] = useState(false);

    const containerVariants = {
        compact: {
            backgroundColor: bgColor,
            zIndex: 1,
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: "4rem",
            paddingBottom: "2rem",
            position: "relative",
            gridColumn: `span ${span ?? 1}`,
            //width: "25vw",
        },
        expanded: {
            backgroundColor: bgColor,
            zIndex: 200,
            paddingLeft: ["38vw", "0rem"],
            paddingRight: ["38vw", "0rem"],
            paddingTop: "0rem",
            paddingBottom: "0rem",
            position: "absolute",
            gridColumn: `span ${span ?? 1}`,
            //width: "100vw",
        },
    };
    
    const cardVariants = {
        compact: {
            borderRadius: "2rem",
            //position: "relative",
            height: "72%",
        },
        expanded: {
            borderRadius: "0rem",
            //position: "fixed",
            height: "100%",
        }
    };
    
    const onClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <motion.section className={`w-full h-[100svh] lg:h-[80svh] flex flex-col gap-6 snap-center snap-always snap-mandatory`}
        layout
        layoutId={title}
        // @ts-ignore for some reason putting position into variants throws an error, even if it works
        variants={containerVariants}
        transition={{ ease: "easeOut", duration: 0.5 }}
        animate={isExpanded ? "expanded" : "compact"}>

            <motion.div
            onViewportEnter={() => {
                setRenderIsVisible(true);
            }}
            onViewportLeave={() => {
                /*
                the below makes for great performance, since there are never more than like 4 scenes rendered at the same time,
                but it also makes for a bad experience, since the scene has to reload every time you scroll back to it.
                If the amount of projects is reasonable (in the <10 range), leaving it off is probably the best option.

                If more projects get added, it might be worthwhile to implement a scroll window that keeps scenes rendered
                up to a certain amount of projects away from the current one, and then starts to unload projects at the start
                */
                //setRenderIsVisible(false);
            }}
            className={`w-full items-center justify-between font-mono text-sm overflow-hidden rounded-2xl relative`}
            layout
            variants={cardVariants}
            initial="compact"
            animate={isExpanded ? "expanded" : "compact"}>
                <div className='w-full h-full bg-stone-600 animate-pulse absolute -z-10' />
                {renderIsVisible && <Spline scene={sceneLink} />}
            </motion.div>

            <div className='flex flex-col basis-1/6 px-6 z-10 gap-1'>
                <motion.h1
                onViewportEnter={() => {
                    const metaThemeColor = document.querySelector("meta[name=theme-color]");
                    console.log(metaThemeColor);
                    metaThemeColor?.setAttribute("content", bgColor);
                }}
                className='text-lg font-medium tracking-widest uppercase'>{title}</motion.h1>
                <p className='text-sm font-light opacity-80'>Write and learn formal logic like never before, designed for iPhone.</p>
                <button onClick={onClick} className='text-sm w-fit font-normal p-2 px-4 rounded-full -ml-1.5 lg:ml-0 mt-4 underline-offset-4 bg-white text-stone-800 lg:bg-transparent lg:p-0 lg:px-0 lg:text-stone-50 lg:underline'>Learn more</button>
            </div>

        </motion.section>
    );
}