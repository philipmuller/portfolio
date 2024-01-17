"use client";
import { MouseEvent, useRef, useState } from 'react';
import Logo from './logo';
import { EventInfo, TargetAndTransition, motion, useMotionValue, useTransform, useSpring, useAnimate, delay} from 'framer-motion';
import Message from '../model/message';
import Bubble from './bubble';
import PixelDisplay from './pixelDisplay';
import Chat from './chat';
import { send } from '@/engine/server-actions';

export default function Cover() {

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [threadID, setThreadID] = useState<string | undefined>(undefined);

    function handleChatSend(message: Message) {
        setLoading(true);

        setMessages((oldMessages) => [{from: "assistant", content: "..."}, message, ...oldMessages]);

        const newMessages: Message[] = [message, ...messages];

        //debug messages
        // setTimeout(() => {
        //     console.log(newMessages);
        //     const responseMessages: Message[] = [{from: "assistant", content: "This is a response message."}];
        //     setMessages([...responseMessages ?? [], ...newMessages]);
        //     setLoading(false);
        // }, 2000);
        let response = send([{ reply: message.content, threadID: threadID }]);

        response.then((response) => {
            //React asynchrounously changes the value of messages, so we need to use the newMessages array instead
            console.log(JSON.stringify(response));

            setThreadID(response?.threadID);

            console.log(newMessages);
            const responseMessages = response?.messages;
            setMessages([...responseMessages ?? [], ...newMessages]);
            setLoading(false);
        });
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