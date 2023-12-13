"use client";
import { MouseEvent, useRef } from 'react';
import Logo from './logo';
import { EventInfo, TargetAndTransition, motion, useMotionValue, useTransform, useSpring} from 'framer-motion';

export default function Cover() {

    const logoZRotation = useMotionValue(0);

    const rotateZ = useTransform(logoZRotation, [-180, 180], ["0deg", "360deg"]);

    function handleMouseMove(event: MouseEvent) {
        const rect = event.currentTarget.getBoundingClientRect();

        const itemWidth = rect.width;
        const itemHeight = rect.height;

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const xPercent = x / itemWidth - 0.5;
        const yPercent = y / itemHeight - 0.5;

        const zRotationRad = Math.atan2(yPercent, xPercent);
        const zRotation = (zRotationRad * 180 / Math.PI) + 180;

        logoZRotation.set(zRotation);

        console.log("Z rotation:" + zRotation);
        //console.log(x, y);
        //console.log(xPercent, yPercent);
    }

    return (
        <section className={`w-[100svw] fill-white h-[100svh] pb-40 lg:pb-64 flex flex-col p-20 lg:flex-row gap-12 lg:gap-28 items-center justify-center overflow-hidden relative snap-center snap-always snap-mandatory lg:col-span-2 xl:col-span-3 2xl:col-span-4`}>

            <motion.div
            onMouseMove={handleMouseMove}
            whileHover={{
                rotateZ: rotateZ.get(),
                
            }}
            transition={{
                duration: 2,
            }}
            onHoverEnd={() => {
                logoZRotation.set(135);
            }}>
                <Logo className="w-36 h-36 lg:w-60 lg:h-60"/>
            </motion.div>
            
            <div className='flex flex-col gap-4 lg:gap-8 md:max-w-md lg:max-w-lg'>
                <h1 className='text-white text-3xl lg:text-7xl font-bold text-center lg:text-start'>{"Hi! I'm Philip"}</h1>
                <h2 className='text-white text-base lg:text-2xl font-light text-center lg:text-start'>{"I'm a product designer and developer working at the intersection of design and technology."}</h2>
            </div>

        </section>
    );
}