"use client";

import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { Horse, Heart, Cube, List } from '@phosphor-icons/react';
import { motion, spring } from 'framer-motion';
import { useState } from 'react';
import ProjectCard from './components/projectCard';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  function onScroll() {
    //console.log('onScroll');
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

  return (
    <main className="flex flex-col items-center gap-0 h-screen snap-y snap-mandatory overflow-y-scroll">

      <ProjectCard sceneLink="https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode" bgColor='#5B5540' />
      <ProjectCard sceneLink="https://prod.spline.design/DjNz7uPVy3j74tvx/scene.splinecode" bgColor="#3F1C2E" />
      <ProjectCard sceneLink="https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode" bgColor='#5B5540' />

    </main>
  )
}

