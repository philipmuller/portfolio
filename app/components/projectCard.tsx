"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import { ProjectInfo } from "../model/project-info";
import { Breakpoint } from "../hooks/useBreakpoints";

export default function ProjectCard({
  projectInfo,
  breakpoint,
  peek,
  scrollOffset,
  onClick,
  className,
}: {
  projectInfo: ProjectInfo;
  breakpoint: Breakpoint;
  peek?: number;
  scrollOffset?: number;
  onClick?: (id: string) => void;
  className?: string;
}) {
  const isMobile = breakpoint <= Breakpoint.md;

  const [renderIsVisible, setRenderIsVisible] = useState(false);

  const color = !isMobile ? "#20202000" : projectInfo.color ?? "#202020";

  //console.log("Title: " + projectInfo.title + " breakpoint: " + breakpoint + " color: " + color);

  const peekOffset = () => {
    if (
      peek != undefined &&
      scrollOffset != undefined &&
      scrollOffset <= peek
    ) {
      return -peek + scrollOffset;
    }

    return 0;
  };

  return (
    <motion.section
      className={`relative flex h-[100svh] w-[28rem] snap-mandatory snap-center snap-always flex-col gap-6 px-8 pb-8 pt-16 lg:h-[80svh] lg:rounded-xl ${className ?? ""}`}
      layout
      animate={{ backgroundColor: color }}
      layoutId={projectInfo.title}
      onHoverStart={
        isMobile
          ? undefined
          : () => {
              setRenderIsVisible(() => true);
            }
      }
      onHoverEnd={isMobile ? undefined : () => setRenderIsVisible(() => false)}
    >
      <motion.div
        onViewportEnter={() => {
          if (isMobile) {
            setRenderIsVisible(() => true);
          }
        }}
        layout
        layoutId={projectInfo.title + "cover"}
        animate={{ y: peekOffset() }}
        className={`relative h-[72%] w-full items-center justify-between overflow-hidden rounded-2xl font-mono text-sm`}
      >
        <div className="absolute h-full w-full" />
        <Image
          src={projectInfo.coverUrl ?? ""}
          fill={true}
          objectFit="cover"
          alt=""
          className={`absolute h-full w-full ${renderIsVisible ? "animate-pulse" : ""}`}
        />
        {renderIsVisible && projectInfo.sceneUrl != undefined && (
          <Spline scene={projectInfo.sceneUrl ?? ""} className="relative" />
        )}
      </motion.div>

      <div className="z-10 flex basis-1/6 animate-none flex-col gap-1 px-6 transition-none">
        <motion.h1
          layout
          layoutId={projectInfo.title + "title"}
          onViewportEnter={() => {
            const metaThemeColor = document.querySelector(
              "meta[name=theme-color]",
            );
            //console.log(metaThemeColor);
            metaThemeColor?.setAttribute("content", color);
          }}
          className="text-lg font-medium uppercase tracking-widest"
        >
          {projectInfo.title}
        </motion.h1>
        <p className="text-sm font-light opacity-80">
          {projectInfo.description}
        </p>
        <button
          onClick={() => {
            if (onClick != undefined) {
              onClick(projectInfo.title);
            }
          }}
          className="-ml-1.5 mt-4 w-fit rounded-full bg-white p-2 px-4 text-sm font-normal text-stone-800 underline-offset-4 lg:ml-0 lg:bg-transparent lg:p-0 lg:px-0 lg:text-stone-50 lg:underline"
        >
          Learn more
        </button>
      </div>
    </motion.section>
  );
}
