import { useAnimate, motion, stagger, AnimationPlaybackControls } from "framer-motion";
import { MotionLogo } from "./logo";
import { useEffect, useState } from "react";
import { PixelCategories, PixelCategory, pixels } from "../model/pixelModel";

export default function PixelDisplay({
  loading,
  params,
}: {
  loading?: boolean;
  params?: {
    fillSequence?: string[];
    glowOpacitySequence?: number[];
    nextAt?: string | number;
  };
}) {
  const [scope, animate] = useAnimate();
  const [hoveringAreas, setHoveringAreas] = useState<PixelCategory[]>(
    [],
  );

  const [prevHoveringAreas, setPrevHoveringAreas] = useState<PixelCategory[]>(
    [],
  );

  //this is needed so that children can inherit and sync hover and idle states, even if the container itself is not changed
  const logoContainerVariants = {
    idle: {},
    hover: {},
  };

  const logoVariants = {
    idle: (areaIdx: number) => ({
      scale: 1.0,
    }),
    hover: {
      scale: 1.1,
    },
  };

  const descriptionVariants = {
    idle: {
      opacity: 0.0,
      y: 0,
    },
    hover: {
      opacity: 1.0,
      y: -20,
    },
  };

  const baseColor = "#262626";
  const mainGlowColor = "#FFFFFF";
  const associatedGlowColor = "#999999";

  const loadingFillSequence = params?.fillSequence ?? [
    baseColor,
    mainGlowColor,
    baseColor,
  ]; //"rgb(248 113 113)"
  const loadingGlowOpacitySequence = params?.glowOpacitySequence ?? [0, 0.6, 0];
  const loadingNextAt = params?.nextAt ?? "-0.26";

  function areArraysEqual<T>(array1: T[], array2: T[]): boolean {
    const sortedArray1 = [...array1].sort();
    const sortedArray2 = [...array2].sort();

    if (sortedArray1.length !== sortedArray2.length) {
      return false;
    }

    for (let i = 0; i < sortedArray1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) {
        return false;
      }
    }

    return true;
  }

  //this useEffect is used to switch between loading and idle animations
  useEffect(() => {

    let loadingAnimationSequence: {}[] = [];
  for (let i = 0; i < 9; i++) {
    loadingAnimationSequence.push([
      `svg.ring${i}`,
      { fill: loadingFillSequence },
      { at: i === 0 ? 0 : loadingNextAt },
    ]);
    loadingAnimationSequence.push([
      `svg.ring${i}-glow`,
      { opacity: loadingGlowOpacitySequence },
      { at: "<" },
    ]);
  }

  function areaGlowSequenceBuilder(
    areas: PixelCategory[],
    style: "presentation" | "hover" = "presentation",
  ) {
    let tags: string[] = [];

    areas.forEach((area, _) => {
      tags.push(area.replace(/\s+/g, ""));
    });

    let mainLogoSelector = "";
    let mainLogoGlowSelector = "";
    let associatedSkillsSelector = "";
    let associatedSkillsGlowSelector = "";

    tags.forEach((tag, index) => {
      if (index > 0) {
        mainLogoSelector += ", ";
        mainLogoGlowSelector += ", ";
        associatedSkillsSelector += ", ";
        associatedSkillsGlowSelector += ", ";
      }

      mainLogoSelector += `.${tag}.areaTitle`;
      mainLogoGlowSelector += `.${tag}-glow.areaTitle-glow`;
      associatedSkillsSelector += `.${tag}:not(.areaTitle)`;
      associatedSkillsGlowSelector += `.${tag}-glow:not(.areaTitle-glow)`;
    });

    const fromColor = baseColor;
    const toColorMain = mainGlowColor;
    const toColorAssociated = associatedGlowColor;
    const fromOpacity = 0.0;
    const toOpacityMain = 0.6;
    const toOpacityAssociated = 0.1;
    const staggerDelay = 0.02;

    function presentationStyleSequence() {
      //prettier-ignore
      return [
        [mainLogoSelector, { fill: [fromColor, toColorMain] }],
        [mainLogoGlowSelector, { opacity: [fromOpacity, toOpacityMain] }, { at: "<" }],
        [associatedSkillsSelector, { fill: [fromColor, toColorAssociated] }, { delay: stagger(staggerDelay, { from: "center" }) }],
        [associatedSkillsGlowSelector, { opacity: [fromOpacity, toOpacityAssociated] }, { at: "<", delay: stagger(staggerDelay, { from: "center" }) }],
        [associatedSkillsSelector, { fill: [toColorAssociated, fromColor] }],
        [associatedSkillsGlowSelector, { opacity: [toOpacityAssociated, fromOpacity] }, { at: "<" }],
        [mainLogoSelector, { fill: [toColorMain, fromColor] }, { at: "-0.2" }],
        [mainLogoGlowSelector, { opacity: [toOpacityMain, fromOpacity] }, { at: "<" }],
      ];
    }

    function hoverStyleSequence() {
      //prettier-ignore
      return [
        [mainLogoSelector, { fill: [fromColor, toColorMain] }],
        [mainLogoGlowSelector, { opacity: [fromOpacity, toOpacityMain] }, { at: "<" }],
        [associatedSkillsSelector, { fill: [fromColor, toColorAssociated] }, { at: "<" }],
        [associatedSkillsGlowSelector, { opacity: [fromOpacity, toOpacityAssociated] }, { at: "<" }],
      ];
    }

    return style == "presentation"
      ? presentationStyleSequence()
      : hoverStyleSequence();
  }

    let resetAnimationSequence: {}[] = [];
    PixelCategories.forEach((area, _) => {
      const tag = area.replace(/\s+/g, "");
      resetAnimationSequence.push([`.${tag}`, { fill: baseColor }, { at: "<" }]);
      resetAnimationSequence.push([`.${tag}-glow`, { opacity: 0 }, { at: "<" }]);
    });

    let idleAnimationSequence: {}[] = [];
    PixelCategories.forEach((area, _) => {
      idleAnimationSequence.push(...areaGlowSequenceBuilder([area]));
    });

    function startLoadingAnimation(): AnimationPlaybackControls {
      console.log("startLoadingAnimation");
      startResetAnimation();
      //@ts-ignore
      const controls = animate(loadingAnimationSequence, {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });

      return controls;
    }
  
    function startIdleAnimation(): AnimationPlaybackControls {
      console.log("startIdleAnimation");
      startResetAnimation();
      //@ts-ignore
      const controls = animate(idleAnimationSequence, {
        duration: 40.0,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });

      return controls;
    }
  
    function startHoverAnimation(areas: PixelCategory[]): AnimationPlaybackControls {
      console.log("startHoverAnimation");
      startResetAnimation();
  
      const controls = animate([...areaGlowSequenceBuilder(areas, "hover")], {
        duration: 1.0,
        ease: "easeInOut",
      });

      return controls;
    }
  
    function startResetAnimation(): AnimationPlaybackControls {
      //@ts-ignore
      const controls = animate(resetAnimationSequence, {
        duration: 0.02,
        ease: "easeInOut",
      });

      return controls;
    }

    var animationControls: AnimationPlaybackControls;

    if (loading) {
      animationControls = startLoadingAnimation();
    } else {

      if (hoveringAreas.length > 0) {
        animationControls = startHoverAnimation(hoveringAreas);
      } else {
        animationControls = startIdleAnimation();
      }
      
    }

    return () => {
      animationControls.stop();
    };

  }, [loading, hoveringAreas]);

  return (
    <div className="basis-2/5 p-28">
      <motion.div
        ref={scope}
        className="grid grid-cols-8 gap-5 fill-neutral-800"
        onHoverEnd={() => {
          console.log("Display Hover Ended");
          setPrevHoveringAreas([]);
          setHoveringAreas([]);
        }}
      >
        {pixels.map((pixel, index) => {
          const x = index % 8;
          const y = Math.floor(index / 8);

          let areaTags = "";
          let glowAreaTags = "";

          pixel.areas.forEach((area, _) => {
            areaTags += `${area.replace(/\s+/g, "")} `;
            glowAreaTags += `${area.replace(/\s+/g, "")}-glow `;
            if (area == pixel.name) {
              areaTags += `areaTitle `;
              glowAreaTags += `areaTitle-glow `;
            }
          });

          const ringTag = `ring${pixel.loadingRing}`;
          const glowRingTag = `ring${pixel.loadingRing}-glow`;

          return (
            <motion.div
              variants={logoContainerVariants}
              initial="idle"
              onHoverStart={() => {
                console.log("hovering areaa", pixel.areas);
                if (!areArraysEqual(prevHoveringAreas, pixel.areas)) {
                  setHoveringAreas(pixel.areas);
                }
              }}
              onHoverEnd={() => {
                setPrevHoveringAreas(pixel.areas);
                console.log("Stopped hovering");
              }}
              whileHover={loading ? "" : "hover"}
              key={index}
              className={`relative h-full w-full p-1`}
            >
              <MotionLogo
                custom={5}
                className={`${ringTag} ${areaTags}h-full w-full`}
                variants={logoVariants}
                style={{ rotateZ: (y + x) * 30 }}
              />
              <MotionLogo
                className={`${glowRingTag} ${glowAreaTags}absolute left-0 top-0 h-full w-full fill-white p-1 blur-lg`}
                style={{ rotateZ: (y + x) * 30 }}
              />
              <motion.div
                className="pointer-events-none absolute left-0 right-0 top-2 z-10 ml-auto mr-auto flex h-1 w-1 flex-row content-center items-end justify-center overflow-visible text-sm"
                variants={descriptionVariants}
              >
                <h2 className="z-10 w-fit min-w-fit rounded bg-stone-800 p-3 text-center text-sm">
                  {pixel.name}
                </h2>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
