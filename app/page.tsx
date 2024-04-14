"use client";

import { AnimatePresence, motion, spring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Breakpoint, useBreakpoints } from "./hooks/useBreakpoints";
import dynamic from "next/dynamic";
import Cover from "./components/cover";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import { ProjectInfo } from "./model/project-info";
import { title } from "process";
import { projects } from "./data";
import Article from "./components/article";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ProjectCard = dynamic(() => import("./components/projectCard"));

export default function Home() {
  const breakpoint = useBreakpoints();
  const [expandedProjectInfo, setexpandedProjectInfo] = useState<
    ProjectInfo | undefined
  >(undefined);

  const [scrollOffset, setScrollOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((ev: WheelEvent) => {
    //ev.preventDefault();

    const target = ref.current;

    if (!target) {
      return;
    }

    console.log("Wheel scroll detected");
    console.log(target.scrollLeft + ev.deltaY);

    target.scrollBy({top: 0, left: (ev.deltaY < 0 ? -100 : 100)*5 , behavior: "smooth"});
  }, []);

  const handleScroll = useCallback((ev: Event) => {
    ev.preventDefault();

    const target = ev.target as HTMLDivElement;
    setScrollOffset((prev) => target.scrollLeft);
  }, []);

  useEffect(() => {
    const scrollableDiv = ref.current;
    scrollableDiv?.addEventListener("scroll", handleScroll);
    scrollableDiv?.addEventListener("wheel", handleWheel);

    return () =>  {
      scrollableDiv?.removeEventListener("scroll", handleScroll);
      scrollableDiv?.removeEventListener("wheel", handleWheel);
    }
  });

  //console.log(breakpoint);

  const peekValuesMobile = [120];
  const peekValuesDesktop = [230, 350, 190, 320];
  const peekValues =
    breakpoint <= Breakpoint.md ? peekValuesMobile : peekValuesDesktop;

  return (
    <main
      className="flex h-[100svh] flex-row overflow-y-hidden overflow-x-scroll bg-[#101010]"
      ref={ref}
    >
      <motion.section
        className="aboutMeContainer h-[100svh] min-w-[100svw] snap-y snap-mandatory items-center overflow-hidden lg:snap-none"
        layout
      >
        <Cover />
      </motion.section>

      <section className="projectsContainer height-full relative flex min-w-fit flex-row items-center gap-5">
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: -scrollOffset / 2 }}
          transition={{ type: "tween" }}
          className="absolute -top-96 left-[80rem] text-[38rem] font-semibold text-stone-800 "
        >
          Projects
        </motion.h1>
        {projects.map((data, index) => (
          <ProjectCard
            key={index}
            projectInfo={data}
            breakpoint={breakpoint}
            scrollOffset={scrollOffset}
            onClick={(id) => setexpandedProjectInfo(() => data)}
          />
        ))}
      </section>

      <AnimatePresence>
        {" "}
        {expandedProjectInfo && (
          <div
            onClick={() => {
              setexpandedProjectInfo(() => undefined);
            }}
            className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-screen justify-center overflow-y-scroll bg-stone-900/90 px-0 backdrop-blur lg:px-[10%] lg:py-10"
          >
            <Article
              projectInfo={expandedProjectInfo}
              onDismiss={() => setexpandedProjectInfo(undefined)}
            />
          </div>
        )}{" "}
      </AnimatePresence>
    </main>
  );
}
