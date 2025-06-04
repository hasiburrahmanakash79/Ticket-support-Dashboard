// import React from 'react';
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import useTicket from "../../../components/hook/useTicket";
import useConversation from "../../../components/hook/useConversation";
import apiClient from "../../../lib/api-client";

const Conversation = () => {
  // chat/6836b2caba0ee0418258ead6

  const [newMessage, setNewMessage] = useState("");
  const { id } = useParams(); // get ticketId from route
  const { tickets, loading } = useTicket([]);
  const { chat, loading: chatLoading  } = useConversation(id); // pass id to hook
  console.log(chat.data, "Chat Data"); //here showing chat data

  const navigate = useNavigate();

  const ticket = tickets.find((ticket) => ticket._id === id);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      sender: "admin",
      messages: newMessage,
    };

    try {
      await apiClient.post(`/chat/${id}`, newMsg);

      // Optional: locally show the message without refetching
      const localMsg = {
        ...newMsg,
        name: "Support Admin",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        text: newMessage,
      };

      setNewMessage((prev) => [...prev, localMsg]);
      // setNewMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (chatLoading) return <div>Conversation Loading...</div>;


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
            <strong>Ticket ID:</strong> {ticket?._id}
          </p>
          <p>
            <strong>Name:</strong> {ticket?.userProfile?.fullName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {ticket?.userProfile?.user?.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {ticket?.userProfile?.phone || "N/A"}
          </p>
          <p>
            <strong>User Type:</strong> {ticket?.userType || "N/A"}
          </p>
          <p>
            <strong>Issue Type:</strong>{" "}
            {Array.isArray(ticket.issue)
              ? ticket.issue
                  .map((issue, index) => `${index + 1}. ${issue}`)
                  .join(", ")
              : ticket.issue}
          </p>
          <p>
            <strong>Issue Date:</strong>{" "}
            {new Date(ticket?.createdAt).toLocaleDateString() || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {ticket?.status || "N/A"}
          </p>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ticket?.images.map((img, index) => (
              <div key={img.id} className="rounded overflow-hidden shadow-md">
                <img
                  src={`http://192.168.10.18:5001${img}`}
                  alt={`Ticket image ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-3">Recent Conversation</h2>
      <div className="p-4 bg-white rounded-xl border border-gray-200">
        {/* <div className="space-y-4">
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
        </div> */}

        <div className="space-y-4">
          {chat?.data?.map((msg, idx) =>
            msg.sender === "admin" ? (
              // Right side for admin
              <div key={`admin-${idx}`} className="flex justify-end gap-3">
                <div className="bg-gray-200 text-gray-800 rounded-xl px-4 py-2 max-w-lg text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-right font-semibold">You</p>
                    <span className="text-xs text-gray-400 block text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div>{msg.messages}</div>
                </div>
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="Admin"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            ) : (
              // Left side for user
              <div key={`user-${idx}`} className="flex gap-3">
                <img
                  src={
                    ticket?.userProfile?.avatar ||
                    "https://randomuser.me/api/portraits/men/75.jpg"
                  }
                  alt={ticket?.userProfile?.fullName}
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-blue-100 text-gray-800 rounded-xl px-4 py-2 max-w-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">
                      {ticket?.userProfile?.fullName}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div>{msg.messages}</div>
                </div>
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
