import { useAnimate, motion, stagger } from "framer-motion";
import { MotionLogo } from "./logo";
import { useEffect } from "react";

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

  const logoContainerVariants = {
    idle: {},
    hover: {},
  };

  const logoVariants = {
    idle: {
      fill: "#262626",
    },
    hover: {
      fill: "#FFFFFF",
    },
  };

  const logoShadowVariants = {
    idle: {
      opacity: 0.0,
    },
    hover: {
      opacity: 1.0,
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

  let fillSequence = params?.fillSequence ?? ["#262626", "#FFFFFF", "#262626"]; //"rgb(248 113 113)"
  const titleFillSequence = ["#262626", "#FFFFFF", "#262626"];
  const areaFillSequence = ["#262626", "#999999", "#262626"];
  const glowOpacitySequence = params?.glowOpacitySequence ?? [0, 0.6, 0];
  const areaGlowOpacitySequence = [0, 0.2, 0];
  const loadingNextAt = params?.nextAt ?? "-0.26";
  const idleNextAt = params?.nextAt ?? "0.0";

  const loadingAnimationSequence = [
    ["svg.ring0", { fill: fillSequence }],
    ["svg.ring0-glow", { opacity: glowOpacitySequence }, { at: "<" }],
    ["svg.ring1", { fill: fillSequence }, { at: loadingNextAt }],
    ["svg.ring1-glow", { opacity: glowOpacitySequence }, { at: "<" }],
    ["svg.ring2", { fill: fillSequence }, { at: loadingNextAt }],
    ["svg.ring2-glow", { opacity: glowOpacitySequence }, { at: "<" }],
    ["svg.ring3", { fill: fillSequence }, { at: loadingNextAt }],
    ["svg.ring3-glow", { opacity: glowOpacitySequence }, { at: "<" }],
    ["svg.ring4", { fill: fillSequence }, { at: loadingNextAt }],
    ["svg.ring4-glow", { opacity: glowOpacitySequence }, { at: "<" }],
    ["svg.ring5", { fill: fillSequence }, { at: loadingNextAt }],
    ["svg.ring5-glow", { opacity: glowOpacitySequence }, { at: "<" }],
    ["svg.ring6", { fill: fillSequence }, { at: loadingNextAt }],
    ["svg.ring6-glow", { opacity: glowOpacitySequence }, { at: "<" }],
    ["svg.ring7", { fill: fillSequence }, { at: loadingNextAt }],
    ["svg.ring7-glow", { opacity: glowOpacitySequence }, { at: "<" }],
    ["svg.ring8", { fill: fillSequence }, { at: loadingNextAt }],
    ["svg.ring8-glow", { opacity: glowOpacitySequence }, { at: "<" }],
  ];

  function idleAreaSequenceBuilder(areaIDs: string[]) {
    const mainLogoSelector = "svg." + areaIDs[0];
    const mainLogoGlowSelector = mainLogoSelector + "-glow";
    const associatedSkillsSelector = "svg." + areaIDs[1];
    const associatedSkillsGlowSelector = associatedSkillsSelector + "-glow";
    //prettier-ignore
    return [
      [mainLogoSelector, { fill: ["#262626", "#FFFFFF"] }],
      [mainLogoGlowSelector, { opacity: [0, 0.6] }, { at: "<" }],
      [associatedSkillsSelector, { fill: ["#262626", "#999999"] }, { delay: stagger(0.02, { from: "center" }) }],
      [associatedSkillsGlowSelector, { opacity: [0, 0.1] }, { at: "<", delay: stagger(0.02, { from: "center" }) }],
      [associatedSkillsSelector, { fill: ["#999999", "#262626"] }],
      [associatedSkillsGlowSelector, { opacity: [0.1, 0.0] }, { at: "<" }],
      [mainLogoSelector, { fill: ["#FFFFFF", "#262626"] }, { at: "-0.2" }],
      [mainLogoGlowSelector, { opacity: [0.6, 0] }, { at: "<" }],
    ]
  }

  //prettier-ignore
  const idleAnimationSequence = [
    ...idleAreaSequenceBuilder(["area0", "area1"]),
    ...idleAreaSequenceBuilder(["area2", "area3"]),
    ...idleAreaSequenceBuilder(["area4", "area5"]),
    ...idleAreaSequenceBuilder(["area6", "area7"]),
    ...idleAreaSequenceBuilder(["area8", "area9"]),
    ...idleAreaSequenceBuilder(["area10", "area11"]),
    ...idleAreaSequenceBuilder(["area12", "area13"]),
    ...idleAreaSequenceBuilder(["area14", "area15"]),
    ...idleAreaSequenceBuilder(["area16", "area17"]),
  ];
  useEffect(() => {
    if (loading) {
      //@ts-ignore
      animate(loadingAnimationSequence, {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    } else {
      //@ts-ignore
      animate(idleAnimationSequence, {
        duration: 40.0,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }
  }, [loading]);

  return (
    <div
      ref={scope}
      className="grid basis-2/5 grid-cols-8 gap-6 fill-neutral-800 p-20"
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
        idleAnimationAreas.forEach((area, areaIndex) => {
          if (
            area.find((value, _) => x == value[0] && y == value[1]) != undefined
          ) {
            labelsArray.push(`area${areaIndex}`);
          }
        });

        const secondCustomClassLabel = labelsArray.join(" ");
        const areaGlowCustomLabel = labelsArray.join("-glow ") + "-glow";

        return (
          <motion.div
            variants={logoContainerVariants}
            initial="idle"
            whileHover={loading ? "" : "hover"}
            key={index}
            className={`relative h-full w-full p-1`}
          >
            <MotionLogo
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
    </div>
  );
}
