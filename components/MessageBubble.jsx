import React from "react";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-lg p-3 max-w-[70%] wrap-break-word ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {message.content}
        <div className="text-xs text-gray-500 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
