import { motion } from "framer-motion";
import { Key } from "react";
import { SyncLoader } from "react-spinners";

export default function Bubble({mode, content, key} : {mode: "user" | "bot" | "human", content?: string, key?: Key}) {
    const margin = mode === "user" ? "ml-10" : "mr-10";
    const backgroundColor = mode === "user" ? "bg-slate-50" : "bg-stone-800";
    const textColor = mode === "user" ? "text-stone-700" : "text-slate-50";

    return (
        <motion.h2 className={`${margin} ${backgroundColor} ${textColor} rounded-xl p-4 text-start text-lg`}
        initial={{ x: -50, y: 100 }}
        animate={{ x: 0, y: 0 }}
        layout key={key} transition={{ type: "spring", damping: 10, stiffness: 100 }}>
            {content == "..." ? <SyncLoader size={8} color="#FAFFFF" speedMultiplier={0.6}/> : content}
        </motion.h2>
    );
}