export default interface Message {
    from: "user" | "bot" | "human";
    content: string;
}