// import React from 'react';
import { useState } from "react";
import { FiSend } from "react-icons/fi";

const initialMessages = [
  {
    sender: "user",
    name: "John Max",
    time: "12:00 AM",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "The battery drains very quickly, even after a full charge. It barely lasts 10 minutes in flight, and sometimes the drone shuts off mid-air.",
  },
  {
    sender: "admin",
    name: "Support Admin",
    time: "12:05 AM",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "It sounds like there may be a problem with the battery health or power distribution. Please ensure you're using an original battery and avoid overcharging. We recommend replacing the battery if it’s been in use for a long time. Our technical team will review your ticket and get back to you shortly.",
  },
];

const Conversation = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      sender: "admin",
      name: "Support Admin",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      text: newMessage,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold ">Ticket Details </h1>
      <div className="space-y-4 text-sm my-10">
        <p>
          <strong>Ticket ID:</strong> TCKT007
        </p>
        <p>
          <strong>Name:</strong> Grace Lee
        </p>
        <p>
          <strong>Email:</strong> grace@example.com
        </p>
        <p>
          <strong>Issue Type:</strong> Sync Issue
        </p>
        <p>
          <strong>Issue Date:</strong> 2025-05-07
        </p>
        <p>
          <strong>Status:</strong> In Progress
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-3">Recent Conversation</h2>
      <div className="p-4 bg-white rounded-xl border border-gray-200">
        <div className="space-y-4">
          {messages.map((msg, idx) =>
            msg.sender === "user" ? (
              <div key={idx} className="flex gap-3">
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-blue-100 text-gray-800 rounded-xl px-4 py-2 max-w-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{msg.name}</p>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <div>{msg.text}</div>
                </div>
              </div>
            ) : (
              <div key={idx} className="flex justify-end gap-3">
                <div className="bg-gray-200 text-gray-800 rounded-xl px-4 py-2 max-w-lg text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-right font-semibold">You</p>
                    <span className="text-xs text-gray-400 block text-right">
                      {msg.time}
                    </span>
                  </div>
                  <div>{msg.text}</div>
                </div>
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            )
          )}
        </div>

        {/* Input */}
        <div className="mt-10 relative w-full">
          <input
            type="text"
            placeholder="message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-500 text-xl"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
