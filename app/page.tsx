"use client";

import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { Horse, Heart, Cube, List } from '@phosphor-icons/react';
import { AnimatePresence, LayoutGroup, motion, spring, useMotionValue } from 'framer-motion';
import { MouseEvent, UIEvent, UIEventHandler, use, useCallback, useEffect, useRef, useState } from 'react';
//import ProjectCard from './components/projectCard';
import useScroll from './hooks/useScroll';
import { Breakpoint, useBreakpoints } from './hooks/useBreakpoints';
import dynamic from 'next/dynamic';
import useOnScreen from './hooks/useOnScreen';
import Navbar from './components/navbar';
import Logo from './components/logo';
import Cover from './components/cover';

const ProjectCard = dynamic(() => import('./components/projectCard'));

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const breakpoint = useBreakpoints();
  const [modalId, setModalId] = useState<number | undefined>(undefined);

  const [scrollOffset, setScrollOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback( (ev: Event) => {
    const target = ev.target as HTMLDivElement;
    console.log(target.scrollTop);
    setScrollOffset(() => target.scrollTop)
  }, []);

  useEffect(() => {
    const scrollableDiv = ref.current;
    scrollableDiv?.addEventListener("scroll", handleScroll);
    return () => scrollableDiv?.removeEventListener("scroll", handleScroll);
  });

  const containerVariants = {
    compact: {
      zIndex: 1,
      padding: "2rem",
      position: "relative",
    },
    expanded: {
      zIndex: 200,
      padding: 0,
      position: "absolute",
    },
  };

  const cardVariants = {
    compact: {
      borderRadius: "1rem",
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

  const mobileColors = [
    '#5B5540',
    '#3F1C2E',
    '#1C3B3F',
    '#553663',
  ];

  const desktopColors = [
    '#202020',
    '#202020',
    '#202020',
    '#202020',
  ];

  console.log(breakpoint);

  const colors = (breakpoint > Breakpoint.md) ? desktopColors : mobileColors;

  return (
    <main className='overflow-y-scroll overflow-y-visible'>
      <motion.section 
      className='grid bg-stone-900 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center gap-0 lg:gap-2 h-[100svh] p-0 lg:p-2 snap-y snap-mandatory lg:snap-none overflow-y-scroll overflow-y-visible' 
      layout
      ref={ref}>

        <Cover/>
        <ProjectCard sceneLink="https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode" bgColor={colors[0]} title='Organon' span={1} peek={230} scrollOffset={scrollOffset}/>
        <ProjectCard sceneLink="https://prod.spline.design/DjNz7uPVy3j74tvx/scene.splinecode" bgColor={colors[1]} title='Test 2' peek={350} scrollOffset={scrollOffset}/>
        <ProjectCard sceneLink="https://prod.spline.design/aG9rfs8G5GCCXmGw/scene.splinecode" bgColor={colors[2]} title='Test 3' peek={190} scrollOffset={scrollOffset}/>
        <ProjectCard sceneLink="https://prod.spline.design/DjNz7uPVy3j74tvx/scene.splinecode" bgColor={colors[1]} title='Test 9' peek={320} scrollOffset={scrollOffset}/> 
        <ProjectCard sceneLink="https://prod.spline.design/WZF9cCrorhf6cci9/scene.splinecode" bgColor={colors[3]} title='Test 4' span={1}/>
        <ProjectCard sceneLink="https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode" bgColor={colors[0]} title='Test 5' />
        <ProjectCard sceneLink="https://prod.spline.design/aG9rfs8G5GCCXmGw/scene.splinecode" bgColor={colors[2]} title='Test 6'/>
        <ProjectCard sceneLink="https://prod.spline.design/WZF9cCrorhf6cci9/scene.splinecode" bgColor={colors[3]} title='Test 7' span={1}/>

      </motion.section>
    
    </main>
    
  )
}

