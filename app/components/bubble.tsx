import { motion } from "framer-motion";
import { Key } from "react";
import { SyncLoader } from "react-spinners";
import Message from "../model/message";
import Markdown from "react-markdown";

export default function Bubble({message, key} : {message: Message, key?: Key}) {
    const margin = message.from === "user" ? "ml-10" : "mr-10";
    const backgroundColor = message.from === "user" ? "bg-slate-50" : "bg-stone-800";
    const textColor = message.from === "user" ? "text-stone-700" : "text-slate-50";

    const debugLayoutTransition = {type: "spring", damping: 60, stiffness: 50, duration: 5.0};
    const transition = { type: "spring", damping: 14, stiffness: 100 };

    return (
        <motion.h2 className={`${margin} ${backgroundColor} ${textColor} rounded-xl p-4 text-start text-base`}
        initial={{ x: -50, y: 100 }}
        animate={{ x: 0, y: 0 }}
        layout="position" key={key} transition={transition}>
            {message.content == "..." ? <SyncLoader size={8} color="#FAFFFF" speedMultiplier={0.6}/> : <Markdown className="text-pretty space-y-4">{message.content}</Markdown>}
        </motion.h2>
    );
}