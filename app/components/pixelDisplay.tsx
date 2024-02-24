import { useAnimate, motion, stagger } from "framer-motion";
import { MotionLogo } from "./logo";
import { useEffect, useState } from "react";

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
  const [hoveringSkill, setIsHoveringSkill] = useState<string | undefined>(
    undefined,
  );
  const [hoveringAreaIdx, setHoveringAreaIdx] = useState<number | undefined>(
    undefined,
  );
  const [hoveringDisplayArea, setHoveringDisplayArea] = useState(false);
  const [prevHoveringAreaIdx, setPrevHoveringAreaIdx] = useState<
    number | undefined
  >(undefined);

  const logoContainerVariants = {
    idle: {},
    hover: {},
  };

  const logoVariants = {
    idle: (areaIdx: number) => ({
      //fill: "#262626",
      scale: 1.0,
    }),
    hover: {
      //fill: "#FFFFFF",
      scale: 1.1,
    },
  };

  const logoShadowVariants = {
    idle: {
      //opacity: 0.0,
    },
    hover: {
      //opacity: 1.0,
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

  //prettier-ignore
  const skills =
    ["Davinci Resolve", "SQL", "Supabase", "NextJS", "MVC", "OOP", "Git", "Github",
    "Rive", "Adobe After Effects", "C++", "React", "Typescript", "Javascript", "Development", "Testing",
    "Motion Design", "Blender", "Adobe InDesign", "OpenAI API", "Java", "Objective-C", "XCode", "VSCode",
    "Branding", "Logo Design", "Gestalt Principles", "Webflow", "Dart", "Swift", "UIKit", "Linear",
    "Layout Design", "Visual Design", "Conceptual Minimalism", "Framer", "Flutter", "SwiftUI", "Project Management", "Collaboration",
    "Affinity Designer", "Adobe Photoshop", "Adobe Illustrator", "Origami Studio", "Play", "Figma", "Diary Studies", "Field Studies",
    "Affinity Photo", "Affinity Publisher", "Tea", "Hobbies", "Protopie", "UI/UX Design", "Human-Centered Design", "Interviews",
    "CAD Drawing", "Spline", "Rhinoceros", "Magic", "Market Analysis", "Product Design", "HCI", "Descriptive Statistics",
    "NURBS Modeling", "Industrial Design", "Design History", "Reading", "Storytelling", "Design Thinking", "Academic Research", "Affinity Diagramming",
    "Polygon Modeling", "Rapid Iterative Prototyping", "3D Printing", "Philosophy", "Field Recording", "Usability Studies", "Focus Groups", "Survey Studies",
    "Raspberry Pi", "Electronics", "D&D", "Mixing", "Sound Design", "German", "Google Forms", "Typeform",
    "Soldering", "Arduino", "Board Games", "Reaper", "English", "Italian", "Slovenian", "Languages"];

  //prettier-ignore
  const loadingAnimationRings = [
    [[5, 7]],
    [[5, 6], [5, 8], [4, 6], [4, 8], [6, 6], [6, 8], [4, 7], [6, 7]],
    [[4, 5], [5, 5], [6, 5], [7, 6], [7, 7], [7, 8], [6, 9], [5, 9], [4, 9], [3, 8], [3, 7], [3, 6]],
    [[4, 4], [5, 4], [6, 4], [7, 5], [7, 10], [6, 10], [5, 10], [4, 10], [3, 10], [3, 9], [2, 8], [2, 7], [2, 6], [3, 5]],
    [[3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [7, 11], [6, 11], [5, 11], [4, 11], [3, 11], [2, 10], [1, 9], [1, 8], [1, 7], [1, 6], [1, 5], [2, 4]],
    [[3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [1, 11], [0, 10], [0, 9], [0, 8], [0, 7], [0, 6], [0, 5], [1, 4], [2, 3]],
    [[3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [0, 11], [0, 3], [1, 2], [2, 2]],
    [[3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [0, 2], [1, 1], [2, 1]],
    [[1, 0], [0, 1]]
  ];

  //prettier-ignore
  const idleAnimationAreas = [
    [[5, 7]], //0
    [[5, 6], [5, 8], [4, 6], [4, 8], [6, 6], [6, 8], [4, 7], [6, 7], [4, 5], [5, 5], [6, 5], [7, 6], [7, 7], [7, 8], [6, 9], [5, 9], [3, 5], [4, 4], [5, 4], [6, 4], [7, 5], [7, 10], [6, 10], [7, 9], [7, 4], [3, 4], [2, 6], [3, 3], [7, 3], [1, 7], [2, 5], [0, 5], [0, 1]],
    [[0, 2]], //2
    [[0, 1], [1, 1], [1, 2], [0, 0], [2, 3], [0, 5], [2, 5]], //3
    [[1, 8]], //4
    [[0, 7], [1, 7], [2, 7], [2, 8], [2, 9], [1, 9], [0, 9], [0, 8]], //5
    [[4, 10]], //6
    [[4, 9], [3, 10], [3, 11]], //7
    [[6, 1]], //8
    [[5, 1], [5, 0], [6, 0], [7, 0], [7, 1], [7, 2], [6, 2], [5, 2], [7, 3], [6, 3], [5, 3], [4, 3], [4, 2], [4, 1], [4, 0], [5, 4], [4, 4], [3, 2], [3, 1], [3, 0], [2, 1], [2, 0], [1, 0]],
    [[3, 6]], //10
    [[2, 6], [3, 7], [3, 8], [3, 9], [2, 9], [2, 10], [2, 11]], //11
    [[1, 10]], //12
    [[1, 9], [2, 9], [0, 10], [0, 11], [1, 11]], //13
    [[1, 4]], //14
    [[1, 2], [2, 2], [0, 3], [1, 3], [2, 3], [0, 4], [2, 4], [0, 5], [1, 5], [2, 5], [3, 5], [5, 5], [0, 6], [1, 6], [1, 7], [2, 8]], //15
    [[7, 11]], //16
    [[6, 11], [5, 11], [4, 11], [5, 10]] //17
    ];

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
    areaIDs: number[],
    style: "presentation" | "hover" = "presentation",
  ) {
    const mainLogoSelector = "svg.area" + areaIDs[0];
    const mainLogoGlowSelector = mainLogoSelector + "-glow";
    const associatedSkillsSelector = "svg.area" + areaIDs[1];
    const associatedSkillsGlowSelector = associatedSkillsSelector + "-glow";

    const fromColor = baseColor;
    const toColorMain = mainGlowColor;
    const toColorAssociated = associatedGlowColor;
    const fromOpacity = 0;
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
      const isEven = areaIDs[0] % 2 == 0;
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
  for (let i = 0; i < 18; i++) {
    resetAnimationSequence.push([
      `svg.area${i}`,
      { fill: baseColor },
      { at: "<" },
    ]);
    resetAnimationSequence.push([
      `svg.area${i}-glow`,
      { opacity: 0 },
      { at: "<" },
    ]);
  }

  let idleAnimationSequence: {}[] = [];
  for (let i = 0; i < 18; i++) {
    if (i % 2 == 0) {
      idleAnimationSequence.push(...areaGlowSequenceBuilder([i, i + 1]));
    }
  }

  function startLoadingAnimation() {
    console.log("startLoadingAnimation");
    startResetAnimation();
    //@ts-ignore
    animate(loadingAnimationSequence, {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });
  }

  function startIdleAnimation() {
    console.log("startIdleAnimation");
    startResetAnimation();
    //@ts-ignore
    animate(idleAnimationSequence, {
      duration: 40.0,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });
  }

  function startHoverAnimation(areaIdx: number) {
    console.log("startHoverAnimation");
    startResetAnimation();

    const isEven = areaIdx % 2 == 0;

    const associatedAreaIdx = isEven ? areaIdx + 1 : areaIdx - 1;

    const first = isEven ? areaIdx : associatedAreaIdx;
    const second = isEven ? associatedAreaIdx : areaIdx;

    animate([...areaGlowSequenceBuilder([first, second], "hover")], {
      duration: 1.0,
      ease: "easeInOut",
    });
  }

  function startResetAnimation() {
    //@ts-ignore
    animate(resetAnimationSequence, {
      duration: 0.02,
      ease: "easeInOut",
    });
  }

  //this useEffect is used to switch between loading and idle animations
  useEffect(() => {
    if (loading) {
      startLoadingAnimation();
    } else {
      startIdleAnimation();
    }
  }, [loading]);

  return (
    <motion.div
      ref={scope}
      className="grid basis-2/5 grid-cols-8 gap-5 fill-neutral-800 p-20"
      onHoverStart={() => {
        setHoveringDisplayArea(true);
      }}
      onHoverEnd={() => {
        setHoveringDisplayArea(false);
        setPrevHoveringAreaIdx(undefined);
        startIdleAnimation();
      }}
    >
      {skills.map((skill, index) => {
        const x = index % 8;
        const y = Math.floor(index / 8);

        let customClassLabel = "";
        loadingAnimationRings.forEach((ring, ringIndex) => {
          if (
            ring.find((value, _) => x == value[0] && y == value[1]) != undefined
          ) {
            customClassLabel = `ring${ringIndex}`;
          }
        });

        var labelsArray: string[] = [];
        var areaIdx: number | undefined = undefined;
        idleAnimationAreas.forEach((area, areaIndex) => {
          if (
            area.find((value, _) => x == value[0] && y == value[1]) != undefined
          ) {
            labelsArray.push(`area${areaIndex}`);
            areaIdx = areaIndex;
          }
        });

        const secondCustomClassLabel = labelsArray.join(" ");
        const areaGlowCustomLabel = labelsArray.join("-glow ") + "-glow";

        return (
          <motion.div
            variants={logoContainerVariants}
            initial="idle"
            onHoverStart={() => {
              setIsHoveringSkill(skill);
              setHoveringAreaIdx(areaIdx);
              if (areaIdx != prevHoveringAreaIdx) {
                startHoverAnimation(areaIdx!);
              }
              console.log("hovering area idx", areaIdx);
            }}
            onHoverEnd={() => {
              setIsHoveringSkill(undefined);
              setHoveringAreaIdx(undefined);
              setPrevHoveringAreaIdx(areaIdx);
              console.log("Stopped hovering");
            }}
            whileHover={loading ? "" : "hover"}
            key={index}
            className={`relative h-full w-full p-1`}
          >
            <MotionLogo
              custom={5}
              className={`${customClassLabel} ${secondCustomClassLabel} h-full w-full`}
              variants={logoVariants}
              style={{ rotateZ: (y + x) * 30 }}
            />
            <MotionLogo
              className={`${customClassLabel}-glow ${areaGlowCustomLabel} absolute left-0 top-0 h-full w-full fill-white p-1 blur-lg`}
              variants={logoShadowVariants}
              style={{ rotateZ: (y + x) * 30 }}
            />
            <motion.div
              className="pointer-events-none absolute left-0 right-0 top-2 z-10 ml-auto mr-auto flex h-1 w-1 flex-row content-center items-end justify-center overflow-visible text-sm"
              variants={descriptionVariants}
            >
              <h2 className="z-10 w-fit min-w-fit rounded bg-stone-800 p-3 text-center text-sm">
                {skill}
              </h2>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
