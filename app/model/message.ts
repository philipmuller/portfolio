export default interface Message {
    from: "user" | "assistant" | "human" | "function";
    content: string;
}