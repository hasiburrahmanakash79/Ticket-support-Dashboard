// import React from 'react';
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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

const droneImages = [
  {
    id: 1,
    url: "https://img.freepik.com/free-photo/quadcopter-flying-nature_231208-10459.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: 2,
    url: "https://navbharattimes.indiatimes.com/thumb/111484706/best-drone-camera-on-amazon-sale-2024-111484706.jpg?imgsize=55136&width=1600&height=900&resizemode=75",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/10084393/pexels-photo-10084393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    url: "https://st.depositphotos.com/37542498/56288/i/450/depositphotos_562880176-stock-photo-nurtingen-germany-june-2021-modern.jpg",
  },
  {
    id: 5,
    url: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/2147486350/images/LYkihHYRQ66whjpvNzbO_Flying_drone_14.jpg",
  },
  {
    id: 6,
    url: "https://www.dronegenuity.com/wp-content/uploads/2017/07/header-image-1.jpg",
  },
  {
    id: 7,
    url: "https://www.shutterstock.com/shutterstock/videos/1108091485/thumb/1.jpg?ip=x480",
  },
  {
    id: 8,
    url: "https://www.shutterstock.com/shutterstock/videos/9109109/thumb/1.jpg?ip=x480",
  },
  {
    id: 9,
    url: "https://www.shutterstock.com/shutterstock/videos/1100930983/thumb/8.jpg?ip=x480",
  },
  {
    id: 10,
    url: "https://images.pexels.com/videos/3173391/free-video-3173391.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
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

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center gap-3">
        <button className="text-2xl" onClick={() => navigate(-1)}>
          <RiArrowLeftLine />
        </button>
        <h1 className="text-2xl font-semibold ">Ticket Details </h1>
      </div>
      <div className="grid grid-cols-3 gap-10 my-10 ">
        <div className="space-y-4 text-sm col-span-1">
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
            <strong>Model Name:</strong> Dji M4ST0
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
        <div className="col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {droneImages.map((img) => (
              <div key={img.id} className="rounded overflow-hidden shadow-md">
                <img
                  src={img.url}
                  alt={`Drone ${img.id}`}
                  className="w-full h-32 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
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
