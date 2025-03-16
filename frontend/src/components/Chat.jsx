import React, { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How are you feeling today?" },
    { sender: "user", text: "I'm feeling a bit anxious." },
    { sender: "bot", text: "I'm here for you. Would you like to try a deep breathing exercise?" },
  ]);
  
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending message
  const sendMessage = () => {
    if (input.trim() === "") return;
    
    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    // Simulate bot response after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "I understand. Let me know how I can help. 😊" },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      {/* Chat Header */}
      <div className="bg-slate-800 p-4 text-center text-lg font-semibold">
        Chat with Cheerio 💬
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500" : "bg-slate-700"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-slate-800 flex items-center">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition"
        >
          Send 🚀
        </button>
      </div>
    </div>
  );
}
