"use client";
import { useState } from "react";
import Message from "../model/message";
import PixelDisplay from "./pixelDisplay";
import Chat from "./chat";
import { send } from "@/engine/server-actions";

export default function Cover() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadID, setThreadID] = useState<string | undefined>(undefined);

  function handleChatSend(message: Message) {
    setLoading(true);

    setMessages((oldMessages) => [
      { from: "assistant", content: "..." },
      message,
      ...oldMessages,
    ]);

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
      setMessages([...(responseMessages ?? []), ...newMessages]);
      setLoading(false);
    });
  }

  return (
    <section
      className={`relative flex h-[100svh] w-full snap-mandatory snap-center snap-always flex-col items-center justify-start overflow-hidden lg:col-span-2 lg:flex-row xl:col-span-3 2xl:col-span-4`}
    >
      <PixelDisplay loading={loading} />

      <div className="flex h-full w-full basis-3/5 flex-col justify-center px-64 py-20">
        <Chat messages={messages} onSubmit={handleChatSend} loading={loading} />
      </div>
    </section>
  );
}
