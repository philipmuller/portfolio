"use client";

import { AnimatePresence, motion, spring } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Breakpoint, useBreakpoints } from './hooks/useBreakpoints';
import dynamic from 'next/dynamic';
import Cover from './components/cover';
import Spline from '@splinetool/react-spline';
import Image from 'next/image';
import { ProjectInfo } from './model/project-info';
import { title } from 'process';
import { projects } from './data'
import Article from './components/article';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ProjectCard = dynamic(() => import('./components/projectCard'));

export default function Home() {
  const breakpoint = useBreakpoints();
  const [expandedProjectInfo, setexpandedProjectInfo] = useState<ProjectInfo | undefined>(undefined);

  const [scrollOffset, setScrollOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback( (ev: Event) => {
    const target = ev.target as HTMLDivElement;
    setScrollOffset(() => target.scrollTop)
  }, []);

  useEffect(() => {
    const scrollableDiv = ref.current;
    scrollableDiv?.addEventListener("scroll", handleScroll);
    return () => scrollableDiv?.removeEventListener("scroll", handleScroll);
  });

  //console.log(breakpoint);

  const peekValuesMobile = [120];
  const peekValuesDesktop = [230, 350, 190, 320];
  const peekValues = breakpoint <= Breakpoint.md ? peekValuesMobile : peekValuesDesktop;

  return (
    <main className='overflow-y-scroll overflow-y-visible'>
      <motion.section 
      className='grid bg-stone-900 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center gap-0 lg:gap-4 h-[100svh] p-0 lg:p-2 snap-y snap-mandatory lg:snap-none overflow-y-scroll overflow-y-visible' 
      layout
      ref={ref}>

        <Cover/>
        {
          projects.map((data, index) => 
            <ProjectCard 
            key={index} 
            projectInfo={data} 
            breakpoint={breakpoint}
            scrollOffset={scrollOffset} 
            onClick={(id) => setexpandedProjectInfo(() => data)} />
          )
        }

      </motion.section>

      <AnimatePresence> {
        expandedProjectInfo &&
        <div onClick={() => {setexpandedProjectInfo(() => undefined)}} className='absolute h-screen top-0 z-10 bottom-0 left-0 right-0 bg-stone-900/90 flex px-0 lg:px-[10%] lg:py-10 justify-center backdrop-blur overflow-y-scroll'>
          <Article projectInfo={expandedProjectInfo} onDismiss={() => setexpandedProjectInfo(undefined)}/>
        </div>
        

      } </AnimatePresence>
      
    
    </main>
    
  )
}

