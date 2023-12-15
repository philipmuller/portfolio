"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import Image from 'next/image';
import { ProjectInfo } from '../model/project-info';
import { Breakpoint } from '../hooks/useBreakpoints';

export default function ProjectCard({ projectInfo, breakpoint, sceneUrl, coverUrl, bgColor, peek, scrollOffset, onClick, className } : { 
    projectInfo: ProjectInfo, 
    breakpoint: Breakpoint,
    sceneUrl?: string,
    coverUrl?: string,
    bgColor?: string,   
    peek?: number, 
    scrollOffset?: number, 
    onClick?: (id: string) => void ,
    className?: string,
}) {

    const isMobile = breakpoint <= Breakpoint.md;

    const [renderIsVisible, setRenderIsVisible] = useState(false);

    const color = !isMobile ? "#202020" : bgColor ?? "#202020";

    //console.log("Title: " + projectInfo.title + " breakpoint: " + breakpoint + " color: " + color);

    const peekOffset = () => {
        if (peek != undefined && scrollOffset != undefined && scrollOffset <= peek) {
            return -peek+scrollOffset;
        }

        return 0;
    };

    return (
        <motion.section className={`w-full h-[100svh] lg:h-[80svh] lg:rounded-xl flex flex-col gap-6 snap-center snap-always snap-mandatory px-8 pb-8 pt-16 relative ${className ?? ""}`}
        layout
        animate={{backgroundColor: color}}
        layoutId={projectInfo.title}
        onHoverStart={isMobile ? undefined : () => {setRenderIsVisible(() => true)}}
        onHoverEnd={isMobile ? undefined : () => setRenderIsVisible(() => false)}
        >

            <motion.div 
            onViewportEnter={() => { if(isMobile) { setRenderIsVisible(() => true)} } } 
            layout layoutId={projectInfo.title+"cover"} animate={{y: peekOffset()}} 
            className={`w-full h-[72%] items-center justify-between font-mono text-sm overflow-hidden rounded-2xl relative`}>
                <div className='w-full h-full absolute'/>
                <Image src={coverUrl ?? ""} fill={true} objectFit="cover" alt="" className={`w-full h-full absolute ${renderIsVisible ? "animate-pulse" : ""}`}/>
                {renderIsVisible && sceneUrl != undefined && 
                <Spline scene={sceneUrl ?? ""} className='relative'/>}
         
            </motion.div>

            <div className='flex flex-col basis-1/6 px-6 z-10 gap-1 animate-none transition-none'>
                <motion.h1
                onViewportEnter={() => {
                    const metaThemeColor = document.querySelector("meta[name=theme-color]");
                    //console.log(metaThemeColor);
                    metaThemeColor?.setAttribute("content", color);
                }}
                className='text-lg font-medium tracking-widest uppercase'>{projectInfo.title}</motion.h1>
                <p className='text-sm font-light opacity-80'>{projectInfo.description}</p>
                <button 
                onClick={() => { if (onClick != undefined) { onClick(projectInfo.title)} }}
                className='text-sm w-fit font-normal p-2 px-4 rounded-full -ml-1.5 lg:ml-0 mt-4 underline-offset-4 bg-white text-stone-800 lg:bg-transparent lg:p-0 lg:px-0 lg:text-stone-50 lg:underline'>Learn more</button>
            </div>

        </motion.section>
    );
}