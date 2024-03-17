import { useAnimate, motion, stagger } from "framer-motion";
import { MotionLogo } from "./logo";
import { useEffect, useState } from "react";
import { PixelCategories, PixelCategory, pixels } from "../model/pixelModel";
import {Canvas, useFrame } from '@react-three/fiber';

export default function ThreePixelDisplay({
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
  

  return (
    <Canvas className="basis-2/5 p-20">
        <ambientLight intensity={0.5}/>
        <CircleGrid/>
    </Canvas>
  );
}


const Circle = ({ position }: {position: any}) => {
    const [nodeColor, setNodeColor] = useState('hotpink');

    const handlepointerOver = (event: any) => {
        setNodeColor('red');
    }

    return (
      <mesh position={position} onPointerOver={handlepointerOver}>
        <circleGeometry args={[0.04, 10]} />
        <meshBasicMaterial color={nodeColor} />
      </mesh>
    );
  };

  const CircleGrid = () => {
    const grid = [];
  
    // Create positions for each circle in the grid
    for (let x = 0; x < 80; x++) {
      for (let y = 0; y < 100; y++) {
        // Calculate position based on grid coordinates
        // Adjust the spacing and offset as needed
        const position = [x/5 - 10, y/5 - 10, 0];
        grid.push(<Circle key={`${x}-${y}`} position={position} />);
      }
    }
  
    return <>{grid}</>;
  };