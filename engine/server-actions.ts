"use server";

import { revalidatePath } from 'next/cache';
import { OpenAIEngine } from './ai-engine';
import { cookies } from 'next/headers';
import Message from '@/app/model/message';

export async function send(data: {reply: string, threadID?: string, toolData?: {runID: string, toolCallID: string}}[]): Promise<{ messages?: Message[], threadID: string, runID: string}  | undefined> {
    if (data.length == 0) return undefined;

    console.log(`About to request answer for text: ${data[0].reply}, toolData: ${JSON.stringify(data[0].toolData)}`);
    const ai = new OpenAIEngine();

    const response = await ai.generateFrom(data[0].reply, {threadID: data[0].threadID}); //very tentative, probably needs work for tool calling

    console.log(`AI response: ${JSON.stringify(response)}`);
    return response;
}

function convertToOriginalDate(date: Date) {
    console.log(`Converting date: ${date}`);
    var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const originalDate = new Date(date.getTime() - userTimezoneOffset);
    console.log(`Converted date: ${originalDate}`);
    return originalDate;
}

export async function clearConvo(threadID: string) {
    console.log(`About to clear convo`);

    const ai = new OpenAIEngine();
    await ai.deleteThread(threadID);

    revalidatePath('/'); // revalidate the index page to clear the cache
}