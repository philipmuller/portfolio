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

const ProjectCard = dynamic(() => import('./components/projectCard'));

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const breakpoint = useBreakpoints();
  const [modalId, setModalId] = useState<string | undefined>(undefined);

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

  const modalTransition = {
    type: "spring", 
    mass: 0.4,
  }

  return (
    <main className='overflow-y-scroll overflow-y-visible'>
      <motion.section 
      className='grid bg-stone-900 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center gap-0 lg:gap-2 h-[100svh] p-0 lg:p-2 snap-y snap-mandatory lg:snap-none overflow-y-scroll overflow-y-visible' 
      layout
      ref={ref}>

        <Cover/>
        {
          projects.map((data, index) => 
            <ProjectCard 
            key={index} 
            projectInfo={data.info} 
            breakpoint={breakpoint}
            sceneUrl={data.sceneUrl}
            coverUrl={data.coverUrl}
            bgColor={data.color}
            peek={peekValues.at(index)} 
            scrollOffset={scrollOffset} 
            onClick={(id) => setModalId(() => id)} />
          )
        }

      </motion.section>

      <AnimatePresence> {
        modalId &&
        <div onClick={() => {setModalId(() => undefined)}} className='absolute top-0 z-10 bottom-0 left-0 right-0 bg-stone-900/80 flex px-0 lg:px-[15vw] justify-center backdrop-blur'>

          <motion.section className={`relative flex flex-col gap-6 snap-center snap-always snap-mandatory w-full bg-stone-900`}
          layout
          layoutId={modalId}
          transition={modalTransition}>

            <motion.div
            className={`w-full h-[70vh] items-center justify-between font-mono text-sm overflow-hidden relative`}
            layout
            layoutId={modalId+"cover"}
            transition={modalTransition}>
              <Image src={"/organon-cover.png"} layout="fill" objectFit="cover" alt="" className={`w-full h-full absolute`}/>
              {/* <Spline scene={"https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode"} /> */}
            </motion.div>

            <div className='flex flex-col basis-1/6 px-6 z-10 gap-1'>
                <motion.h1
                className='text-lg font-medium tracking-widest uppercase'>{modalId}</motion.h1>
                <p className='text-sm font-light opacity-80'>Write and learn formal logic like never before, designed for iPhone.</p>
                <button onClick={() => setModalId(undefined)} className='text-sm w-fit font-normal p-2 px-4 rounded-full -ml-1.5 lg:ml-0 mt-4 underline-offset-4 bg-white text-stone-800 lg:bg-transparent lg:p-0 lg:px-0 lg:text-stone-50 lg:underline'>Close</button>
            </div>

        </motion.section>
        </div>
        

      } </AnimatePresence>
      
    
    </main>
    
  )
}

