"use client";
import { MouseEvent, useRef, useState } from 'react';
import Logo from './logo';
import { EventInfo, TargetAndTransition, motion, useMotionValue, useTransform, useSpring, useAnimate} from 'framer-motion';
import Message from '../model/message';
import Bubble from './bubble';
import PixelDisplay from './pixelDisplay';
import Chat from './chat';
import { on } from 'events';

export default function Cover() {

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    function handleChatSend(message: Message) {
        setLoading(true);
        setMessages([...messages, message, {from: "assistant", content: "..."}]);
    }

    return (
        <section className={`w-full h-[100svh] flex flex-col lg:flex-row items-center justify-start overflow-hidden relative snap-center snap-always snap-mandatory lg:col-span-2 xl:col-span-3 2xl:col-span-4`}>

            <PixelDisplay loading={loading}/>

            <div className='basis-3/5 flex flex-col w-full h-full px-64 py-20 justify-center'>
                <Chat messages={messages} onSubmit={handleChatSend} loading={loading}/>
            </div>

        </section>
    );
}