"use client";

import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    const aiMessageId = (Date.now() + 1).toString();

    const aiMessage = {
      id: aiMessageId,
      role: "ai",
      content: "",
      timestamp: Date.now(),
      streaming: true,
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);

        const lines = chunk.split("\n");

        for (let line of lines) {
          line = line.trim();
          if (!line) continue;

          if (line.startsWith("data:")) {
            const textPart = line.replace(/^data:\s*/, "");

            // Check for [DONE] here to avoid appending it
            if (textPart === "[DONE]") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMessageId ? { ...msg, streaming: false } : msg
                )
              );
              setIsLoading(false);
              return;
            }

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiMessageId
                  ? {
                      ...msg,
                      content:
                        msg.content + (msg.content ? " " : "") + textPart,
                    }
                  : msg
              )
            );
          }
        }
      }
    } catch (error) {
      console.error("Error while streaming AI response:", error);
      setIsLoading(false);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId ? { ...msg, streaming: false } : msg
        )
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const saved = localStorage.getItem("chat_messages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border rounded shadow-md bg-white">
      {/* Header */}
      <header className="p-4 border-b flex justify-between items-center bg-blue-600 text-white rounded-t">
        <p className="font-semibold text-lg">AI Chatbot</p>
        <button
          onClick={() => setMessages([])}
          className="text-sm text-white border border-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Clear Chat
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <MessageList messages={messages} />
      </div>
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
