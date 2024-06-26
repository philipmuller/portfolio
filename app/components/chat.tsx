import { motion } from "framer-motion";
import Message from "../model/message";
import { useState } from "react";
import Bubble from "./bubble";
import { MoonLoader } from "react-spinners";
import { ArrowUp, Square } from "@phosphor-icons/react";
import Image from "next/image";

export default function Chat({ messages, onSubmit, loading, placeholderText } : { messages: Message[], onSubmit: (message: Message) => void, loading: boolean, placeholderText?: string }) {

    const defaultPlaceholderText = "What is your design philosophy?";
    const layoutTransition = {type: "spring", damping: 18, stiffness: 150};
    const debugLayoutTransition = {type: "spring", damping: 60, stiffness: 50, duration: 5.0};

    function handleFormSubmit() {
        onSubmit({from: "user", content: "How can you help Apple as a software designer in the Shortcuts team?"});
    }

    return (

        <motion.div layout className='flex flex-row gap-10 items-center'>
            <motion.div layout className='w-72 h-72 relative rounded-full overflow-hidden shrink-0'>
                <Image src={"/profile.png"} alt={"Picture of the designer"} fill={true} objectFit="cover"/>
            </motion.div>
            
            <motion.div className='flex flex-col gap-2 w-full justify-end'
            initial={{ height: "fit-content" }}
            whileInView={{ height: (messages.length > 0) ? "100%" : "fit-content" }}
            transition={layoutTransition}>

                <motion.div layout className='flex flex-col-reverse gap-2 w-full justify-start overflow-x-hidden overflow-y-hidden'>
                    { messages.map((message, index) => <Bubble key={messages.length - index - 1} message={message}/>) }

                    <InitialTextDisplayMessage title="Hi! I'm Philip"
                    content="I'm a product designer and developer working at the intersection of design and technology."
                    compact={messages.length > 0}/>

                </motion.div>

                <Chatbox onSubmit={onSubmit} loading={loading} placeholder={placeholderText ?? defaultPlaceholderText} horizontal={messages.length > 0}/>

            </motion.div>
        </motion.div>    
    )
}

function Chatbox({ onSubmit, loading, placeholder, horizontal } : { onSubmit: (message: Message) => void, loading: boolean, placeholder?: string, horizontal?: boolean }) {

    const [textAreaValue, setTextAreaValue] = useState("");

    const flexDirection = horizontal ? "flex-row" : "flex-row";
    const alignment = horizontal ? "items-end" : "items-start";

    function handleFormSubmit() {
        let message = (textAreaValue == "" && !horizontal) ? placeholder ?? "" : textAreaValue; //this is horrible
        onSubmit({from: "user", content: message});
        setTextAreaValue("");
    }

    function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        console.log(event.target.value);
        setTextAreaValue(event.target.value);
    }

    return (
        <form className={`flex ${flexDirection} ${alignment} gap-5 mt-6 relative`}>

                    <motion.textarea layout className='text-stone-200 relative placeholder-stone-500 font-light rounded-xl p-4 bg-neutral-900 resize-none w-full h-14'
                    name="question" id="qs" value={textAreaValue} onChange={handleTextareaChange}
                    placeholder={placeholder} />

                    <AskButton loading={loading} compact={horizontal ?? false} onClick={handleFormSubmit}/>

        </form>
    )
}

function AskButton({ loading, compact, onClick } : { loading: boolean, compact: boolean, onClick: () => void}) {

    const buttonVariants = {
        initial: {
            height: "3.5rem",
            borderRadius: "0.75rem",
            width: "3.5rem",
        },
        default: {
            borderRadius: compact ? "500rem" : "0.75rem",
            height: compact ? "2.5rem" : "3.5rem",
            width: compact ? "2.5rem" : "5rem",
        }
    }
    const animation = "";//loading ? "animate-ping" : "";

    return (
        <motion.button layout className={`bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 min-w-10 flex items-center justify-center relative text-stone-300 font-bold shadow-neutral-800 shadow-[0_5px_0px_0px_rgba(0,0,0,0.3)] ${animation}`}
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
    const titleTextSize = compact ? "1.125rem" : "2.8rem";
    const contentTextSize = compact ? "1.125rem" : "1.5rem";

    const titleLineHeight = compact ? "1.75rem" : "2.5rem";
    const contentLineHeight = compact ? "1.75rem" : "2.0rem";

    return (
        <motion.div layout className='flex flex-col rounded-xl text-lg'
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        initial={{ gap: "0.7rem", marginRight: "0.0rem"}}
        whileInView={{
            gap: (compact) ? "0.1rem" : "0.7rem",
            backgroundColor: (compact) ? "#292524" : "#29252400",
            padding: (compact) ? "1rem" : "0rem",
            marginRight: (compact) ? "3.0rem" : "0.0rem",
        }}>

            <motion.h1 className={`${titleTextSize} text-white font-semibold tracking-wide text-center lg:text-start`}
            initial={{ fontSize: titleTextSize, lineHeight: titleLineHeight }}
            whileInView={{ fontSize: titleTextSize, lineHeight: titleLineHeight }}
            onViewportEnter={() => {
                const metaThemeColor = document.querySelector("meta[name=theme-color]");
                console.log(metaThemeColor);
                metaThemeColor?.setAttribute("content", "#1c1917");
            }}>

                {title}

            </motion.h1>

            <motion.p className={`${contentTextSize} text-neutral-300 font-normal text-center lg:text-start`}
            initial={{ fontSize: contentTextSize, lineHeight: contentLineHeight }}
            whileInView={{ fontSize: contentTextSize, lineHeight: contentLineHeight }}>

                {content}

            </motion.p>

        </motion.div>
    )
}
