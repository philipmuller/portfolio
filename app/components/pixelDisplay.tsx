import { useAnimate } from "framer-motion";
import Logo from "./logo";
import { useEffect } from "react";

export default function PixelDisplay({loading, params} : {loading?: boolean, params?: { fillSequence?: string[], glowOpacitySequence?: number[], nextAt?: string | number }}) {
    const [scope, animate] = useAnimate();

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

    let fillSequence = params?.fillSequence ?? ["#404040", "rgb(255 255 255)", "#404040"]; //"rgb(248 113 113)"
    const glowOpacitySequence = params?.glowOpacitySequence ?? [0, 1, 0];
    const nextAt = params?.nextAt ?? "-0.26";

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

    useEffect(() => {
        //@ts-ignore
        const animationControls = animate(animationSequence, {duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 0});

        if (loading) {
            animationControls.play();
        } else {
            animationControls.stop();
        }
    }, [loading]);

    return (
        <div ref={scope} className='basis-2/5 grid grid-cols-8 gap-6 fill-neutral-700 p-20'>
                {
                    Array.from(Array(96)).map((_, index) => {
                        const x = index % 8;
                        const y = Math.floor(index / 8);

                        let customClassLabel = "";
                        animationRings.forEach((ring, ringIndex) => {
                            if (ring.find((value, _) => (x == value[0] && y == value[1])) != undefined) { customClassLabel = `ring${ringIndex}` }
                        });

                        return (
                            <div key={index} className={`relative something w-full h-full p-1 ${(x == 5 && y == 7) ? "fill-white" : ""}`}>
                                <Logo className={`${customClassLabel} peer w-full h-full hover:scale-125 hover:fill-white duration-200 transition-all`} style={{transform: `rotateZ(${(y+x)*30}deg)`}}/>
                                <Logo className={`${customClassLabel}-glow pointer-events-none w-full h-full absolute fill-white blur-lg p-1 top-0 left-0 ${(x == 5 && y == 7) ? "opacity-100" : "opacity-0"} peer-hover:opacity-100`} style={{transform: `rotateZ(${(y+x)*30}deg)`}}/>
                                <div className="pointer-events-none absolute flex flex-row overflow-visible content-center items-end justify-center w-1 h-1 text-sm bg-red-500 transition-all peer-hover:-translate-y-6 left-0 right-0 top-2 ml-auto mr-auto invisible peer-hover:visible z-10">
                                    <h2 className="w-fit min-w-fit text-sm p-3 bg-stone-800 rounded text-center z-10">Description of the skill</h2>
                                </div>
                                
                            </div>
                        );
                    })
                }  
            </div>
    );
}