import { motion } from "framer-motion";
import { ProjectInfo } from "../model/project-info";
import Image from "next/image";

import OrganonBody from "./articles/organon";
import CardybeeBody from "./articles/cardybee";
import BixiBody from "./articles/bixi";
import ScreenTimeBody from "./articles/screen-time";
import CleanrBody from "./articles/cleanr";
import MenstruationWellbeingBody from "./articles/menstruation-wellbeing";
import BeyondTimeBubbleBody from "./articles/beyond-time-bubble";
import MoiraBody from "./articles/moira";

export default function Article({ projectInfo, onDismiss } : { projectInfo: ProjectInfo, onDismiss?: () => void }) {
    const modalTransition = {
        type: "spring", 
        mass: 0.4,
    };

    const articleBody = () => {
        switch(projectInfo.title) {
            case "Organon":
                return OrganonBody();
            case "Cardybee":
                return CardybeeBody();
            case "Bixi":
                return BixiBody();
            case "The Usability and Efficacy of iOS Screen Time":
                return ScreenTimeBody();
            case "Cleanr":
                return CleanrBody();
            case "Designing for Menstrual Well-Being on Campus":
                return MenstruationWellbeingBody();
            case "Beyond Time Bubble":
                return BeyondTimeBubbleBody();
            case "Moira":
                return MoiraBody();
            default:
                return <></>;
        }
    };

    return (
        <motion.section className={`relative flex flex-col gap-6 snap-center snap-always snap-mandatory w-full h-fit rounded-xl overflow-hidden pb-16 bg-stone-900`}
          layout
          layoutId={projectInfo.title}
          transition={modalTransition}>

            <motion.div
            className={`w-full h-[70vh] shrink-0 items-center justify-between font-mono text-sm overflow-hidden relative`}
            layout
            layoutId={projectInfo.title+"cover"}
            transition={modalTransition}>
              <Image src={projectInfo.coverUrl ?? ""} layout="fill" objectFit="cover" alt="" className={`w-full h-full absolute`}/>
              {/* <Spline scene={"https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode"} /> */}
            </motion.div>

            <div className='flex flex-col px-10 lg:px-36 pt-5 z-10 gap-5'>
                <motion.h1 layout layoutId={projectInfo.title+"title"} transition={modalTransition} className='text-5xl font-medium tracking-wide'>{projectInfo.title}</motion.h1>
                {articleBody()}
            </div>

        </motion.section>
    );
}