import { motion } from "framer-motion";
import Message from "../model/message";
import { useState } from "react";
import Bubble from "./bubble";
import { MoonLoader } from "react-spinners";
import { ArrowUp, Square } from "@phosphor-icons/react";

export default function Chat({ messages, onSubmit, loading, placeholderText } : { messages: Message[], onSubmit: (message: Message) => void, loading: boolean, placeholderText?: string }) {

    const defaultPlaceholderText = "How can you help Apple as a software designer in the Shortcuts team?";
    const layoutTransition = {type: "spring", damping: 18, stiffness: 150};

    function handleFormSubmit() {
        onSubmit({from: "user", content: "How can you help Apple as a software designer in the Shortcuts team?"});
    }
    
    return (
        <motion.div className='flex flex-col gap-2 w-full justify-end'
        initial={{ height: "fit-content" }}
        whileInView={{ height: (messages.length > 0) ? "100%" : "fit-content" }}
        transition={layoutTransition}>

            <InitialTextDisplayMessage title="Hi! I'm Philip" 
            content="I'm a product designer and developer working at the intersection of design and technology." 
            compact={messages.length > 0}/>
                
            { messages.map((message, index) => <Bubble key={index} mode={message.from} content={message.content}/>) }

            <Chatbox onSubmit={onSubmit} loading={loading} placeholder={placeholderText ?? defaultPlaceholderText} horizontal={messages.length > 0}/>

        </motion.div>
    )
}

function Chatbox({ onSubmit, loading, placeholder, horizontal } : { onSubmit: (message: Message) => void, loading: boolean, placeholder?: string, horizontal?: boolean }) {

    const flexDirection = horizontal ? "flex-row" : "flex-col";
    const alignment = horizontal ? "items-end" : "items-start";

    function handleFormSubmit() {
        onSubmit({from: "user", content: "How can you help Apple as a software designer in the Shortcuts team?"});
    }

    return (
        <form className={`flex ${flexDirection} ${alignment} gap-5 mt-6 relative`}>

                    <motion.textarea layout className='text-stone-200 relative placeholder-stone-500 font-light rounded-xl p-4 bg-neutral-800 resize-none w-full h-20'
                    name="question" id="qs" 
                    placeholder={placeholder} />

                    <AskButton loading={loading} compact={horizontal ?? false} onClick={handleFormSubmit}/>

        </form>
    )
}

function AskButton({ loading, compact, onClick } : { loading: boolean, compact: boolean, onClick: () => void}) {

    const buttonVariants = {
        initial: {
            height: "3rem",
            borderRadius: "0.75rem",
            width: "8rem",
        },
        default: {
            borderRadius: loading ? "500rem" : "0.75rem",
            height: loading ? "2.5rem" : "3rem",
            width: loading ? "2.5rem" : "8rem",
        }
    }
    const animation = "";//loading ? "animate-ping" : "";

    return (
        <motion.button layout className={`bg-stone-50 min-w-10 flex items-center justify-center relative text-stone-800 font-bold ${animation}`}
        variants={buttonVariants} initial="initial" animate="default"
        //transition={{ type: "spring", damping: 10, stiffness: 100 }}
        type="button" onClick={onClick}>

            { compact ?
            loading ? <Square size={20} weight="fill"/> : <ArrowUp size={22} weight="bold"/> :
            "Ask"}

        </motion.button>
    )
}

function InitialTextDisplayMessage({title, content, compact} : {title: string, content: string, compact: boolean}) {
    const titleTextSize = compact ? "1.125rem" : "2.25rem";
    const contentTextSize = compact ? "1.125rem" : "1.5rem";

    const titleLineHeight = compact ? "1.75rem" : "2.5rem";
    const contentLineHeight = compact ? "1.75rem" : "2.0rem";

    return (
        <motion.div layout className='flex flex-col rounded-xl text-lg'
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        initial={{ gap: "1.0rem", marginRight: "0.0rem"}}
        whileInView={{
            gap: (compact) ? "0.1rem" : "1.0rem",
            backgroundColor: (compact) ? "#292524" : "#29252400",
            padding: (compact) ? "1rem" : "0rem",
            marginRight: (compact) ? "3.0rem" : "0.0rem",
        }}>

            <motion.h1 className={`${titleTextSize} text-white font-semibold text-center lg:text-start`}
            initial={{ fontSize: titleTextSize, lineHeight: titleLineHeight }}
            whileInView={{ fontSize: titleTextSize, lineHeight: titleLineHeight }}
            onViewportEnter={() => {
                const metaThemeColor = document.querySelector("meta[name=theme-color]");
                console.log(metaThemeColor);
                metaThemeColor?.setAttribute("content", "#1c1917");
            }}>

                {title}

            </motion.h1>

            <motion.p className={`${contentTextSize} text-white font-extralight text-center lg:text-start`}
            initial={{ fontSize: contentTextSize, lineHeight: contentLineHeight }}
            whileInView={{ fontSize: contentTextSize, lineHeight: contentLineHeight }}>

                {content}

            </motion.p>

        </motion.div>
    )
}