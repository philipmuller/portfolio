"use client";

import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { Horse, Heart, Cube } from '@phosphor-icons/react';

export default function Home() {

  function onScroll() {
    //console.log('onScroll');
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-between bg-[#5B5540]">
      <div className="w-full min-h-screen h-screen p-8 flex flex-col gap-6">

        <div className="w-full basis-5/6 items-center justify-between font-mono text-sm overflow-hidden rounded-2xl">
          <Spline onScroll={onScroll} scene="https://prod.spline.design/vOTSy200mmfodOdw/scene.splinecode"/>
          <p className="text-white">Hello World</p>
        </div>

        <div className='flex flex-col basis-1/6 px-6 pb-10 z-10 gap-1'>
          <h1 className='text-lg font-medium tracking-widest uppercase'>Organon</h1>
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

