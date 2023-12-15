import { useState, useEffect } from "react";

interface ScrollPosition {
    x: number;
    y: number;
}

const useScroll = (): ScrollPosition => {
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
    });

    const handleScroll = () => {
        setScrollPosition({
            x: window.scrollX,
            y: window.scrollY,
        });
    };

    useEffect(() => {
        window.addEventListener("pageYOffset", handleScroll);
        return () => {
            window.removeEventListener("pageYOffset", handleScroll);
        };
    }, []);

    return scrollPosition;
};

export default useScroll;