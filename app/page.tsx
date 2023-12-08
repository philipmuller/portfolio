"use client";

import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { Horse, Heart, Cube } from '@phosphor-icons/react';
import { motion, spring } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  function onScroll() {
    //console.log('onScroll');
  }

  const containerVariants = {
    compact: {
      padding: "2rem"
    },
    expanded: {
      padding: 0
    },
  }

  const cardVariants = {
    compact: {
      borderRadius: "1rem",
    },
    expanded: {
      borderRadius: "0rem",
    },
  }

  const onClick = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <main className="flex flex-col items-center bg-[#5B5540] gap-10 h-screen snap-y overflow-y-scroll">

      <motion.section className="w-full h-[90vh] shrink-0 flex flex-col gap-6 snap-center snap-always snap-mandatory"
      layout
      variants={containerVariants}
      animate={isExpanded ? "expanded" : "compact"}
      transition={spring}>

        <motion.div
        className="w-full basis-5/6 items-center justify-between font-mono text-sm overflow-hidden rounded-2xl"
        layout
        variants={cardVariants}
        animate={isExpanded ? "expanded" : "compact"}
        transition={spring}>
          <Spline onScroll={onScroll} scene="https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode"/>
        </motion.div>

        <div className='flex flex-col basis-1/6 px-6 pb-10 z-10 gap-2'>
          <h1 className='text-lg font-medium tracking-widest uppercase'>Organon</h1>
          <p className='text-md font-light opacity-80'>Write and learn formal logic like never before, designed for iPhone.</p>
          <button onClick={onClick} className='text-md w-fit font-normal p-2 px-4 rounded-xl mt-4 tracking-widest underline-offset-4 bg-white text-stone-800'>{"Learn more"}</button>
        </div>

      </motion.section>


      <motion.section className="w-full h-[90vh] shrink-0 flex flex-col gap-6 snap-center snap-always snap-mandatory"
      layout
      variants={containerVariants}
      animate={isExpanded ? "expanded" : "compact"}
      transition={spring}>

        <motion.div
        className="w-full basis-5/6 items-center justify-between font-mono text-sm overflow-hidden rounded-2xl"
        layout
        variants={cardVariants}
        animate={isExpanded ? "expanded" : "compact"}
        transition={spring}>
          <Spline onScroll={onScroll} scene="https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode"/>
        </motion.div>

        <div className='flex flex-col basis-1/6 px-6 pb-10 z-10 gap-2'>
          <h1 className='text-lg font-medium tracking-widest uppercase'>Organon</h1>
          <p className='text-md font-light opacity-80'>Write and learn formal logic like never before, designed for iPhone.</p>
          <button onClick={onClick} className='text-md w-fit font-normal p-2 px-4 rounded-xl mt-4 tracking-widest underline-offset-4 bg-white text-stone-800'>{"Learn more"}</button>
        </div>

      </motion.section>

    </main>
  )
}

