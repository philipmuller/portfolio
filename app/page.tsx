"use client";

import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { Horse, Heart, Cube } from '@phosphor-icons/react';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between bg-[#5B5540]">
      <div className="w-full h-full p-8 flex flex-col gap-6">

        <div className="w-full h-[80vh] items-center justify-between font-mono text-sm bg-white bg-red-500 overflow-hidden rounded-2xl">
          <Spline scene="https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode"/> 
        </div>

        <div className='flex flex-col px-6 z-10 gap-1'>
          <h1 className='text-xl font-semibold tracking-widest uppercase'>Organon</h1>
          <p className='text-sm font-light opacity-80'>Write and learn formal logic like never before, designed for iPhone.</p>
        </div>

      </div>

      {/* <div className="fixed flex flex-row gap-8 justify-center content-center items-center px-6 z-10 rounded-full h-16 bg-stone-100/10 bottom-12 backdrop-blur drop-shadow-[0px_0px_10px_rgba(0,0,0,0.25)]">
        <Cube size={36}/>
        <Horse size={36}/>
        <Heart size={36}/> 
      </div> */}
    </main>
  )
}

