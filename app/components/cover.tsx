"use client";
import { MouseEvent, useRef, useState } from 'react';
import Logo from './logo';
import { EventInfo, TargetAndTransition, motion, useMotionValue, useTransform, useSpring, useAnimate} from 'framer-motion';

export default function Cover() {

    const coreRotateZ = useMotionValue(315);
    const rotateZ = useSpring(coreRotateZ);
    const [scope, animate] = useAnimate();
    const [messages, setMessages] = useState<string[]>([]);

    //const rotateZ = useTransform(logoZRotation, [-180, 180], ["0deg", "360deg"]);

    const placeholderText = "How can you help Apple as a software designer in the Shortcuts team?"

    const animationRings = [
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

    const fillSequence = ["#292524", "rgb(255 255 255)", "#292524"]; //"rgb(248 113 113)"
    const glowOpacitySequence = [0, 1, 0];
    const nextAt = "-0.26";

    const animationSequence = [
        ["svg.ring0", {fill: fillSequence}],
        ["svg.ring0-glow", {opacity: glowOpacitySequence}, {at: "<"}],
        ["svg.ring1", {fill: fillSequence}, {at: nextAt}],
        ["svg.ring1-glow", {opacity: glowOpacitySequence}, {at: "<"}],
        ["svg.ring2", {fill: fillSequence}, {at: nextAt}],
        ["svg.ring2-glow", {opacity: glowOpacitySequence}, {at: "<"}],
        ["svg.ring3", {fill: fillSequence}, {at: nextAt}],
        ["svg.ring3-glow", {opacity: glowOpacitySequence}, {at: "<"}],
        ["svg.ring4", {fill: fillSequence}, {at: nextAt}],
        ["svg.ring4-glow", {opacity: glowOpacitySequence}, {at: "<"}],
        ["svg.ring5", {fill: fillSequence}, {at: nextAt}],
        ["svg.ring5-glow", {opacity: glowOpacitySequence}, {at: "<"}],
        ["svg.ring6", {fill: fillSequence}, {at: nextAt}],
        ["svg.ring6-glow", {opacity: glowOpacitySequence}, {at: "<"}],
        ["svg.ring7", {fill: fillSequence}, {at: nextAt}],
        ["svg.ring7-glow", {opacity: glowOpacitySequence}, {at: "<"}],
        ["svg.ring8", {fill: fillSequence}, {at: nextAt}],
        ["svg.ring8-glow", {opacity: glowOpacitySequence}, {at: "<"}],
    ];

    function startLoadingAnimation() {
        //@ts-ignore
        animate(animationSequence, {duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 0});
        //animate("svg.ring2-glow", {opacity: [0, 1, 0]});
    }

    function handleMessageSubmit() {
        startLoadingAnimation();
        setMessages((messages) => [...messages, "How can you help Apple as a software designer in the Shortcuts team?"]);
    }

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

        coreRotateZ.set(zRotation);
    }

    return (
        <section className={`w-full h-[100svh] flex flex-col lg:flex-row items-center justify-start overflow-hidden relative snap-center snap-always snap-mandatory lg:col-span-2 xl:col-span-3 2xl:col-span-4`}>

            <div ref={scope} className='basis-2/5 grid grid-cols-8 gap-6 fill-neutral-700 p-20'>
                {
                    Array.from(Array(96)).map((_, index) => {
                        const x = index % 8;
                        const y = Math.floor(index / 8);

                        let customClassLabel = "";
                        animationRings.forEach((ring, ringIndex) => {
                            if (ring.find((value, _) => (x == value[0] && y == value[1])) != undefined) { customClassLabel = `ring${ringIndex}` }
                        });

                        return <div key={index} className={`relative something w-full h-full p-1 ${(x == 5 && y == 7) ? "fill-white" : ""}`} style={{transform: `rotateZ(${(y+x)*30}deg)`}}>
                            <Logo className={`${customClassLabel}-glow w-full h-full absolute fill-white blur-lg p-1 top-0 left-0 -z-10 ${(x == 5 && y == 7) ? "opacity-100" : "opacity-0"}`}/>
                            <Logo className={`${customClassLabel} w-full h-full`}/>
                            </div>;
                    })
                }  
            </div>

            <div className='basis-3/5 flex flex-col w-full h-full px-64 justify-center'>
            <motion.div layout className='flex flex-col gap-2 w-full'
            initial={{
                justifyContent: "center",
            }}
            whileInView={{
                justifyContent: (messages.length > 0) ? "center" : "center",
            }}
            transition={{type: "spring"}}>
                <motion.div
                layout
                className='flex flex-col rounded-xl'
                initial={{
                    gap: "1.0rem",
                    marginRight: "0.0rem"
                }}
                whileInView={{
                    gap: (messages.length > 0) ? "0.1rem" : "1.0rem",
                    backgroundColor: (messages.length > 0) ? "#292524" : "#29252400",
                    padding: (messages.length > 0) ? "1rem" : "0rem",
                    marginRight: (messages.length > 0) ? "3.0rem" : "0.0rem",
                }}>
                    <motion.h1
                    layout
                    className='text-white font-semibold text-center lg:text-start'
                    initial={{
                        fontSize: "2.25rem",
                        lineHeight: "2.5rem",
                    }}
                    whileInView={{
                        fontSize: (messages.length > 0) ? "1.25rem" : "2.25rem",
                        lineHeight: (messages.length > 0) ? "1.75rem" : "2.5rem",
                    }}
                    onViewportEnter={() => {
                        const metaThemeColor = document.querySelector("meta[name=theme-color]");
                        console.log(metaThemeColor);
                        metaThemeColor?.setAttribute("content", "#1c1917");
                    }}>
                        {"Hi! I'm Philip"}
                    </motion.h1>
                    <motion.h2 
                    layout
                    className='text-white font-extralight text-center lg:text-start'
                    initial={{
                        fontSize: "1.5rem",
                        lineHeight: "2.0rem",
                    }}
                    whileInView={{
                        fontSize: (messages.length > 0) ? "1.25rem" : "1.5rem",
                        lineHeight: (messages.length > 0) ? "1.75rem" : "2.0rem",
                    }}
                    >{"I'm a product designer and developer working at the intersection of design and technology."}</motion.h2>
                </motion.div>
                {
                    messages.map((message, index) => 
                    <motion.div
                    key={index}
                    layout
                    className='flex flex-col rounded-xl'
                    initial={{
                        gap: "1.0rem",
                        marginRight: "0.0rem"
                    }}
                    whileInView={{
                        gap: (messages.length > 0) ? "0.1rem" : "1.0rem",
                        backgroundColor: (messages.length > 0) ? "#292524" : "#29252400",
                        padding: (messages.length > 0) ? "1rem" : "0rem",
                        marginRight: (messages.length > 0) ? "3.0rem" : "0.0rem",
                    }}>
                        <motion.h1
                        layout
                        className='text-white font-semibold text-center lg:text-start'
                        initial={{
                            fontSize: "2.25rem",
                            lineHeight: "2.5rem",
                        }}
                        whileInView={{
                            fontSize: (messages.length > 0) ? "1.25rem" : "2.25rem",
                            lineHeight: (messages.length > 0) ? "1.75rem" : "2.5rem",
                        }}
                        onViewportEnter={() => {
                            const metaThemeColor = document.querySelector("meta[name=theme-color]");
                            console.log(metaThemeColor);
                            metaThemeColor?.setAttribute("content", "#1c1917");
                        }}>
                            {"Hi! I'm Philip"}
                        </motion.h1>
                        <motion.h2 
                        layout
                        className='text-white font-extralight text-center lg:text-start'
                        initial={{
                            fontSize: "1.5rem",
                            lineHeight: "2.0rem",
                        }}
                        whileInView={{
                            fontSize: (messages.length > 0) ? "1.25rem" : "1.5rem",
                            lineHeight: (messages.length > 0) ? "1.75rem" : "2.0rem",
                        }}
                        >{"I'm a product designer and developer working at the intersection of design and technology."}</motion.h2>
                    </motion.div>
                    )
                }
                <motion.div whileInView={{ height: (messages.length > 0) ? "38rem" : "0%"}} transition={{type: "spring"}}/>
                <motion.form layout className='flex flex-col gap-5 mt-6'
                initial={{
                    flexDirection: "column",
                }}
                whileInView={{
                    flexDirection: (messages.length > 0) ? "row" : "column",
                }}>
                    <textarea name="question" id="qs" placeholder={placeholderText} className='text-stone-200 placeholder-stone-500 font-light rounded-xl p-4 bg-neutral-800 resize-none w-full h-20'></textarea>
                    <button type="button" className='bg-white rounded-xl p-3 text-stone-800 font-bold w-28' onClick={handleMessageSubmit}>Ask</button>
                </motion.form>
            </motion.div>

            </div>
            

        </section>
    );
}