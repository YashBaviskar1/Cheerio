import React, { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to fetch bot response using streaming
// In fetchBotResponse function:
const fetchBotResponse = async (userMessage) => {
  try {
    const abortController = new AbortController();
    const response = await fetch("http://localhost:8000/api/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMessage }),
      signal: abortController.signal,
    });

    if (!response.ok) throw new Error("Failed to fetch response");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    // Add an empty bot message first
    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      
      // Process complete lines only
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim() === "") continue;
        
        try {
          const data = JSON.parse(line);
          if (data.response) {
            // FIX: Use functional update with previous state
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              return [
                ...prev.slice(0, -1),
                { 
                  ...lastMessage, 
                  text: lastMessage.text + data.response 
                }
              ];
            });
          }
        } catch (error) {
          console.error("Error parsing chunk:", error);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching bot response:", error);
    setMessages(prev => [...prev, { 
      sender: "bot", 
      text: "Sorry, an error occurred. Please try again." 
    }]);
  } finally {
    setIsLoading(false);
  }
};

  // Handle sending message
  const sendMessage = async () => {
    if (input.trim() === "" || isLoading) return;
    
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      await fetchBotResponse(input);
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setIsLoading(false);
    }
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
            <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${msg.sender === "user" ? "bg-blue-500" : "bg-slate-700"}`}>
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
          disabled={isLoading}
          className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none disabled:opacity-50"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send 🚀"}
        </button>
      </div>
    </div>
  );
}