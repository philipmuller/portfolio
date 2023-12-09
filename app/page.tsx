"use client";

import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { Horse, Heart, Cube, List } from '@phosphor-icons/react';
import { motion, spring } from 'framer-motion';
import { UIEventHandler, use, useEffect, useState } from 'react';
import ProjectCard from './components/projectCard';
import useScroll from './hooks/useScroll';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  //const { x, y } = useScroll();

  useEffect(() => {
    onScrollE();
    window.addEventListener('scroll', onScrollE);
    return () => window.removeEventListener('scroll', onScrollE);
  }, []);

  function stringify(obj: any) {
    let cache: any[] = [];
    let str = JSON.stringify(obj, function(key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = []; // reset the cache
    return str;
  }
  function onScrollE() {
    console.log(window.scrollY);
  }

  function onScroll(e: any) {
    //e === null ? console.log('null') : console.log(e);
  }

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

  const colors = [
    '#5B5540',
    '#3F1C2E',
    '#5B5540',
  ];

  

  return (
    <body className={`bg-[${(window.scrollY < 100) ? colors[0] : colors[1]}`}>

      <main className='flex flex-col items-center gap-0 h-screen snap-y snap-mandatory overflow-y-scroll' onScroll={onScroll}>
        <ProjectCard sceneLink="https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode" bgColor={colors[0]} title='Organon'/>
        <ProjectCard sceneLink="https://prod.spline.design/DjNz7uPVy3j74tvx/scene.splinecode" bgColor={colors[1]} title='Test 2'/>
        <ProjectCard sceneLink="https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode" bgColor={colors[2]} title='Test 3'/>
      </main>

    </body>
  )
}

