import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col space-y-3">
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        return (
          <div
            key={msg.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-lg p-3 max-w-[70%] wrap-break-word ${
                isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.content}
              <div
                className={`text-xs mt-1 text-right ${
                  isUser ? "text-white" : "text-gray-500"
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
