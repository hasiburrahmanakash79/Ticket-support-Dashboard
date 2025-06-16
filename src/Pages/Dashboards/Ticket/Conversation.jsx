// import { useState } from "react";
// import { FiSend, FiLock } from "react-icons/fi";
// import { RiArrowLeftLine } from "react-icons/ri";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import useTicket from "../../../components/hook/useTicket";
// import useConversation from "../../../components/hook/useConversation";
// import apiClient from "../../../lib/api-client";
// import useAdmin from "../../../components/hook/useAdmin";

// const Conversation = () => {
//   const [newMessage, setNewMessage] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const { id } = useParams(); // get ticketId from route
//   const { tickets, loading } = useTicket([]);
//   const { chat, loading: chatLoading, refetch } = useConversation(id);
//   const { admin } = useAdmin();


//   const navigate = useNavigate();
//   const ticket = tickets.find((ticket) => ticket._id === id);

//   // Check if ticket is closed/resolved
//   const isTicketClosed =
//     ticket?.status === "Resolved" || ticket?.status === "Closed";

//   // Function to check if message is from admin
//   const isAdminMessage = (msg) => {
//     return (
//       msg.sender === "admin" ||
//       msg.sender === admin?._id ||
//       msg.senderType === "admin" ||
//       msg.userType === "admin"
//     );
//   };

//   const handleSend = async () => {
//     if (newMessage.trim() === "" || isSending) return;

//     // Check if ticket is closed before sending
//     if (isTicketClosed) {
//       toast.error("Cannot send message. This ticket is already resolved.", {
//         duration: 4000,
//         position: "top-right",
//       });
//       return;
//     }

//     setIsSending(true);

//     const newMsg = {
//       messages: newMessage,
//     };

//     try {
//       const response = await apiClient.post(`/chat/${id}`, newMsg);
//       console.log("Message sent successfully:", response?.data);

//       setNewMessage("");

//       if (refetch) {
//         await refetch();
//       }

//       toast.success("Message sent!", {
//         duration: 2000,
//         position: "top-right",
//       });
//     } catch (err) {
//       console.error("Failed to send message:", err);

//       let errorMessage = "Failed to send message. Please try again.";

//       if (err?.response?.data?.message) {
//         const backendMessage = err?.response?.data?.message;

//         if (backendMessage.includes("ticket is closed")) {
//           errorMessage =
//             "Cannot send message. This ticket is already resolved.";
//         } else if (backendMessage.includes("not found")) {
//           errorMessage = "Ticket not found. Please refresh the page.";
//         } else {
//           errorMessage = backendMessage;
//         }
//       }

//       // Show error toast
//       toast.error(errorMessage, {
//         duration: 4000,
//         position: "top-right",
//       });
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Open":
//         return "text-red-500 bg-red-50 border-red-200";
//       case "InProgress":
//         return "text-yellow-600 bg-yellow-50 border-yellow-200";
//       case "Resolved":
//         return "text-green-600 bg-green-50 border-green-200";
//       default:
//         return "text-gray-500 bg-gray-50 border-gray-200";
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (chatLoading) return <div>Conversation Loading...</div>;

//   return (
//     <div>
//       <div className="flex items-center gap-3">
//         <button className="text-2xl" onClick={() => navigate(-1)}>
//           <RiArrowLeftLine />
//         </button>
//         <h1 className="text-2xl font-semibold">Ticket Details</h1>

//         {/* Status Badge */}
//         {ticket?.status && (
//           <span
//             className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
//               ticket?.status
//             )}`}
//           >
//             {ticket?.status}
//           </span>
//         )}
//       </div>

//       <div className="grid grid-cols-3 gap-10 my-10">
//         <div className="space-y-4 text-sm col-span-1">
//           <p>
//             <strong>Ticket ID:</strong> {ticket?._id}
//           </p>
//           <p>
//             <strong>Name:</strong> {ticket?.userProfile?.fullName || "N/A"}
//           </p>
//           <p>
//             <strong>Email:</strong> {ticket?.userProfile?.user?.email || "N/A"}
//           </p>
//           <p>
//             <strong>Phone:</strong> {ticket?.userProfile?.phone || "N/A"}
//           </p>
//           <p>
//             <strong>User Type:</strong> {ticket?.userType || "N/A"}
//           </p>
//           <p>
//             <strong>Issue Type:</strong>{" "}
//             {Array.isArray(ticket?.issue)
//               ? ticket.issue
//                   .map((issue, index) => `${index + 1}. ${issue}`)
//                   .join(", ")
//               : ticket?.issue}
//           </p>
//           <p>
//             <strong>Issue Date:</strong>{" "}
//             {ticket?.createdAt
//               ? new Date(ticket.createdAt).toLocaleDateString()
//               : "N/A"}
//           </p>
//           <p>
//             <strong>Status:</strong>
//             <span
//               className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(
//                 ticket?.status
//               )}`}
//             >
//               {ticket?.status || "N/A"}
//             </span>
//           </p>
//         </div>

//         <div className="col-span-2">
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {ticket?.images?.map((img, index) => (
//               <div key={index} className="rounded overflow-hidden shadow-md">
//                 <img
//                   src={`http://192.168.10.18:5001${img}`}
//                   alt={`Ticket image ${index + 1}`}
//                   className="w-full h-32 object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <h2 className="text-xl font-semibold mb-3">Recent Conversation</h2>

//       <div className="p-4 bg-white rounded-xl border border-gray-200">
//         {/* Closed Ticket Warning */}
//         {isTicketClosed && (
//           <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
//             <FiLock className="text-yellow-600" />
//             <span className="text-yellow-700 text-sm font-medium">
//               This ticket is resolved. No new messages can be sent.
//             </span>
//           </div>
//         )}

//         {/* Chat Messages */}
//         <div className="space-y-4 max-h-96 overflow-y-auto" id="chat-container">
//           {chat?.data?.length > 0 ? (
//             chat.data.map((msg, idx) =>
//               isAdminMessage(msg) ? (
//                 // 🟢 RIGHT SIDE - ADMIN MESSAGES
//                 <div
//                   key={`admin-${idx}-${msg._id || idx}`}
//                   className="flex justify-end gap-3"
//                 >
//                   <div className="bg-green-100 text-gray-800 rounded-xl px-4 py-2 max-w-lg text-left border-l-4 border-green-500 shadow-sm">
//                     <div className="flex items-center justify-between mb-1">
//                       <p className="font-semibold text-green-700 text-sm">
//                         {admin?.name || "Support Admin"}
//                       </p>
//                       <span className="text-xs text-gray-500">
//                         {new Date(msg.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                     <div className="text-gray-800">{msg.messages}</div>
//                   </div>
//                   <img
//                     src={
//                       admin?.avatar ||
//                       "https://randomuser.me/api/portraits/women/65.jpg"
//                     }
//                     alt="Admin"
//                     className="w-10 h-10 rounded-full border-2 border-green-500 flex-shrink-0"
//                   />
//                 </div>
//               ) : (
//                 // 🔵 LEFT SIDE - USER MESSAGES
//                 <div
//                   key={`user-${idx}-${msg._id || idx}`}
//                   className="flex gap-3"
//                 >
//                   <img
//                     src={
//                       ticket?.userProfile?.avatar ||
//                       "https://randomuser.me/api/portraits/men/75.jpg"
//                     }
//                     alt={ticket?.userProfile?.fullName || "User"}
//                     className="w-10 h-10 rounded-full border-2 border-blue-500 flex-shrink-0"
//                   />
//                   <div className="bg-blue-100 text-gray-800 rounded-xl px-4 py-2 max-w-lg border-l-4 border-blue-500 shadow-sm">
//                     <div className="flex items-center justify-between mb-1">
//                       <p className="font-semibold text-blue-700 text-sm">
//                         {ticket?.userProfile?.fullName || "Customer"}
//                       </p>
//                       <span className="text-xs text-gray-500">
//                         {new Date(msg.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                     <div className="text-gray-800">{msg.messages}</div>
//                   </div>
//                 </div>
//               )
//             )
//           ) : (
//             <div className="text-center text-gray-500 py-8">
//               <p>No messages yet. Start the conversation!</p>
//             </div>
//           )}
//         </div>

//         {/* Input Section */}
//         <div className="mt-6 relative w-full">
//           <input
//             type="text"
//             placeholder={
//               isTicketClosed
//                 ? "Cannot reply - ticket is resolved"
//                 : isSending
//                 ? "Sending..."
//                 : "Type your reply..."
//             }
//             className={`w-full border rounded-lg px-4 py-3 pr-12 outline-none transition-all ${
//               isTicketClosed
//                 ? "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
//                 : "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//             } disabled:opacity-50 disabled:cursor-not-allowed`}
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             disabled={isSending || isTicketClosed}
//             maxLength={500}
//           />
//           <button
//             onClick={handleSend}
//             disabled={isSending || newMessage.trim() === "" || isTicketClosed}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-500 text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {isTicketClosed ? (
//               <FiLock />
//             ) : isSending ? (
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
//             ) : (
//               <FiSend />
//             )}
//           </button>
//         </div>

//         {/* Character count - only show if ticket is not closed */}
//         {!isTicketClosed && (
//           <div className="text-right text-xs text-gray-400 mt-1">
//             {newMessage.length}/500
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Conversation;


import { useState, useEffect } from "react";
import { FiSend, FiLock } from "react-icons/fi";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useTicket from "../../../components/hook/useTicket";
import useConversation from "../../../components/hook/useConversation";
import apiClient from "../../../lib/api-client";
import useAdmin from "../../../components/hook/useAdmin";
import userImage from '../../../assets/images/user.png'

const Conversation = () => {
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { id } = useParams();
  const { tickets, loading } = useTicket([]);
  const { chat, loading: chatLoading, refetch } = useConversation(id);
  const { admin } = useAdmin();
  const navigate = useNavigate();
  const ticket = tickets.find((t) => t._id === id);

  const isTicketClosed =
    ticket?.status === "Resolved" || ticket?.status === "Closed";

  const isAdminMessage = (msg) => {
    return (
      msg.sender === "admin" ||
      msg.sender === admin?._id ||
      msg.senderType === "admin" ||
      msg.userType === "admin"
    );
  };

  const scrollToBottom = () => {
    const container = document.getElementById("chat-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const handleSend = async () => {
    if (newMessage.trim() === "" || isSending || isTicketClosed) return;

    setIsSending(true);

    try {
      const res = await apiClient.post(`/chat/${id}`, {
        messages: newMessage,
      });

      setNewMessage("");
      await refetch();
      scrollToBottom();

      if(res.status === 200) {
        toast.success("Message sent!");
      }

    } catch (err) {
      console.error(err);
      let msg = "Failed to send message.";
      if (err?.response?.data?.message?.includes("ticket is closed")) {
        msg = "Cannot send message. Ticket is closed.";
      }
      toast.error(msg);
    } finally {
      setIsSending(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "text-red-500 bg-red-50 border-red-200";
      case "InProgress":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Resolved":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  useEffect(() => {
    if (!chatLoading) {
      scrollToBottom();
    }
  }, [chatLoading, chat]);

  if (loading || chatLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3">
        <button className="text-2xl" onClick={() => navigate(-1)}>
          <RiArrowLeftLine />
        </button>
        <h1 className="text-2xl font-semibold">Ticket Details</h1>
        {ticket?.status && (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
              ticket?.status
            )}`}
          >
            {ticket.status}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-10 my-10">
        <div className="space-y-3 col-span-1 text-sm">
          <p><strong>Ticket ID:</strong> {ticket?._id}</p>
          <p><strong>Name:</strong> {ticket?.userProfile?.fullName || "N/A"}</p>
          <p><strong>Email:</strong> {ticket?.userProfile?.user?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {ticket?.userProfile?.phone || "N/A"}</p>
          <p><strong>User Type:</strong> {ticket?.userType || "N/A"}</p>
          <p><strong>Issue Type:</strong> {ticket?.issue?.join(", ")}</p>
          <p><strong>Issue Date:</strong> {new Date(ticket?.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {ticket?.images?.map((img, idx) => (
            <img
              key={idx}
              src={`http://192.168.10.18:5001${img}`}
              alt="Ticket Img"
              crossOrigin="anonymous"
              className="h-32 object-cover rounded shadow"
            />
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Recent Conversation</h2>

      <div className="p-4 bg-white rounded-xl border border-gray-200">
        {isTicketClosed && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
            <FiLock className="text-yellow-600" />
            <span className="text-yellow-700 text-sm font-medium">
              This ticket is resolved. No new messages can be sent.
            </span>
          </div>
        )}

        <div className="space-y-4 max-h-96 overflow-y-auto" id="chat-container">
          {chat?.data?.length > 0 ? (
            chat.data.map((msg, idx) =>
              isAdminMessage(msg) ? (
                <div
                  key={idx}
                  className="flex justify-end items-start gap-2"
                >
                  <div className="bg-green-100 border-l-4 border-green-500 rounded-xl p-3 shadow max-w-lg text-sm">
                    <div className="font-semibold text-green-700">
                      {admin?.name || "Admin"}
                    </div>
                    <div className="text-gray-800">{msg.messages}</div>
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <img
                    src={`http://192.168.10.18:5001/${admin.userProfile.image}`}
                    className="w-8 h-8 rounded-full border border-green-500"
                    crossOrigin="anonymous"
                  />
                </div>
              ) : (
                <div
                  key={idx}
                  className="flex items-start gap-2"
                >
                  <img
                    src={ticket?.userProfile?.avatar || userImage}
                    className="w-8 h-8 rounded-full border border-blue-500"
                  />
                  <div className="bg-blue-100 border-l-4 border-blue-500 rounded-xl p-3 shadow max-w-lg text-sm">
                    <div className="font-semibold text-blue-700">
                      {ticket?.userProfile?.fullName || "User"}
                    </div>
                    <div className="text-gray-800">{msg.messages}</div>
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-center text-gray-500">No messages yet.</p>
          )}
        </div>

        <div className="mt-6 relative">
          <input
            type="text"
            value={newMessage}
            disabled={isTicketClosed || isSending}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              isTicketClosed
                ? "Ticket is resolved"
                : isSending
                ? "Sending..."
                : "Type your reply..."
            }
            className="w-full border px-4 py-3 rounded-lg pr-12 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={newMessage.trim() === "" || isSending || isTicketClosed}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-blue-600 disabled:text-gray-400"
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
            ) : (
              <FiSend />
            )}
          </button>
        </div>
        {!isTicketClosed && (
          <div className="text-right text-xs text-gray-400 mt-1">
            {newMessage.length}/500
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversation;


// import { useState } from "react";
// import { FiSend, FiLock } from "react-icons/fi";
// import { RiArrowLeftLine } from "react-icons/ri";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import useTicket from "../../../components/hook/useTicket";
// import useConversation from "../../../components/hook/useConversation";
// import apiClient from "../../../lib/api-client";
// import useAdmin from "../../../components/hook/useAdmin";

// const Conversation = () => {
//   const [newMessage, setNewMessage] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const { id } = useParams();
//   const { tickets, loading } = useTicket([]);
//   const { chat, loading: chatLoading, refetch } = useConversation(id);
//   const { admin } = useAdmin();
//   const navigate = useNavigate();

//   const ticket = tickets.find((ticket) => ticket._id === id);
//   const isTicketClosed =
//     ticket?.status === "Resolved" || ticket?.status === "Closed";

//   const isAdminMessage = (msg) => {
//     return (
//       msg.sender === "admin" ||
//       msg.sender === admin?._id ||
//       msg.senderType === "admin" ||
//       msg.userType === "admin"
//     );
//   };

//   const handleSend = async () => {
//     if (newMessage.trim() === "" || isSending) return;

//     if (isTicketClosed) {
//       toast.error("Cannot send message. This ticket is already resolved.");
//       return;
//     }

//     setIsSending(true);
//     try {
//       await apiClient.post(`/chat/${id}`, { messages: newMessage });
//       setNewMessage("");
//       if (refetch) await refetch();
//       toast.success("Message sent!");
//     } catch (err) {
//       let errorMessage = "Failed to send message.";
//       if (err?.response?.data?.message) {
//         const msg = err.response.data.message;
//         if (msg.includes("ticket is closed")) {
//           errorMessage = "Cannot send message. Ticket is resolved.";
//         } else if (msg.includes("not found")) {
//           errorMessage = "Ticket not found. Refresh the page.";
//         } else {
//           errorMessage = msg;
//         }
//       }
//       toast.error(errorMessage);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleStatusChange = async (newStatus) => {
//     try {
//       await apiClient.patch(`/ticket/${id}`, { status: newStatus });
//       toast.success(`Status updated to ${newStatus}`);
//       if (refetch) await refetch();
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Open":
//         return "text-red-500 bg-red-50 border-red-200";
//       case "InProgress":
//         return "text-yellow-600 bg-yellow-50 border-yellow-200";
//       case "Resolved":
//         return "text-green-600 bg-green-50 border-green-200";
//       case "Closed":
//         return "text-gray-500 bg-gray-50 border-gray-300";
//       default:
//         return "text-gray-600 bg-gray-100 border-gray-200";
//     }
//   };

//   if (loading || chatLoading) return <div>Loading...</div>;

//   return (
//     <div>
//       <div className="flex items-center gap-3">
//         <button className="text-2xl" onClick={() => navigate(-1)}>
//           <RiArrowLeftLine />
//         </button>
//         <h1 className="text-2xl font-semibold">Ticket Details</h1>

//         {ticket?.status && (
//           <select
//             value={ticket.status}
//             onChange={(e) => handleStatusChange(e.target.value)}
//             className={`ml-4 px-3 py-1 rounded-full text-sm font-medium border outline-none ${getStatusColor(
//               ticket.status
//             )}`}
//             disabled={isTicketClosed}
//           >
//             <option value="Open">Open</option>
//             <option value="InProgress">InProgress</option>
//             <option value="Resolved">Resolved</option>
//             <option value="Closed">Closed</option>
//           </select>
//         )}
//       </div>

//       <div className="grid grid-cols-3 gap-10 my-10">
//         <div className="space-y-4 text-sm col-span-1">
//           <p><strong>Ticket ID:</strong> {ticket?._id}</p>
//           <p><strong>Name:</strong> {ticket?.userProfile?.fullName || "N/A"}</p>
//           <p><strong>Email:</strong> {ticket?.userProfile?.user?.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {ticket?.userProfile?.phone || "N/A"}</p>
//           <p><strong>User Type:</strong> {ticket?.userType || "N/A"}</p>
//           <p>
//             <strong>Issue Type:</strong>{" "}
//             {Array.isArray(ticket?.issue)
//               ? ticket.issue.map((issue, index) => `${index + 1}. ${issue}`).join(", ")
//               : ticket?.issue}
//           </p>
//           <p>
//             <strong>Issue Date:</strong>{" "}
//             {ticket?.createdAt
//               ? new Date(ticket.createdAt).toLocaleDateString()
//               : "N/A"}
//           </p>
//         </div>

//         <div className="col-span-2">
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {ticket?.images?.map((img, index) => (
//               <div key={index} className="rounded overflow-hidden shadow-md">
//                 <img
//                   src={`http://192.168.10.18:5001${img}`}
//                   alt={`Ticket image ${index + 1}`}
//                   className="w-full h-32 object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <h2 className="text-xl font-semibold mb-3">Recent Conversation</h2>

//       <div className="p-4 bg-white rounded-xl border border-gray-200">
//         {isTicketClosed && (
//           <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
//             <FiLock className="text-yellow-600" />
//             <span className="text-yellow-700 text-sm font-medium">
//               This ticket is resolved. No new messages can be sent.
//             </span>
//           </div>
//         )}

//         <div className="space-y-4 max-h-96 overflow-y-auto" id="chat-container">
//           {chat?.data?.length > 0 ? (
//             chat.data.map((msg, idx) =>
//               isAdminMessage(msg) ? (
//                 <div
//                   key={`admin-${idx}`}
//                   className="flex justify-end gap-3"
//                 >
//                   <div className="bg-green-100 text-gray-800 rounded-xl px-4 py-2 max-w-lg text-left border-l-4 border-green-500 shadow-sm">
//                     <div className="flex items-center justify-between mb-1">
//                       <p className="font-semibold text-green-700 text-sm">
//                         {admin?.name || "Support Admin"}
//                       </p>
//                       <span className="text-xs text-gray-500">
//                         {new Date(msg.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                     <div>{msg.messages}</div>
//                   </div>
//                   <img
//                     src={
//                       admin?.avatar ||
//                       "https://randomuser.me/api/portraits/women/65.jpg"
//                     }
//                     alt="Admin"
//                     className="w-10 h-10 rounded-full border-2 border-green-500"
//                   />
//                 </div>
//               ) : (
//                 <div key={`user-${idx}`} className="flex gap-3">
//                   <img
//                     src={
//                       ticket?.userProfile?.avatar ||
//                       "https://randomuser.me/api/portraits/men/75.jpg"
//                     }
//                     alt={ticket?.userProfile?.fullName || "User"}
//                     className="w-10 h-10 rounded-full border-2 border-blue-500"
//                   />
//                   <div className="bg-blue-100 text-gray-800 rounded-xl px-4 py-2 max-w-lg border-l-4 border-blue-500 shadow-sm">
//                     <div className="flex items-center justify-between mb-1">
//                       <p className="font-semibold text-blue-700 text-sm">
//                         {ticket?.userProfile?.fullName || "Customer"}
//                       </p>
//                       <span className="text-xs text-gray-500">
//                         {new Date(msg.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                     <div>{msg.messages}</div>
//                   </div>
//                 </div>
//               )
//             )
//           ) : (
//             <div className="text-center text-gray-500 py-8">
//               <p>No messages yet. Start the conversation!</p>
//             </div>
//           )}
//         </div>

//         <div className="mt-6 relative w-full">
//           <input
//             type="text"
//             placeholder={
//               isTicketClosed
//                 ? "Cannot reply - ticket is resolved"
//                 : isSending
//                 ? "Sending..."
//                 : "Type your reply..."
//             }
//             className={`w-full border rounded-lg px-4 py-3 pr-12 outline-none transition-all ${
//               isTicketClosed
//                 ? "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
//                 : "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//             }`}
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//             disabled={isSending || isTicketClosed}
//             maxLength={500}
//           />
//           <button
//             onClick={handleSend}
//             disabled={isSending || newMessage.trim() === "" || isTicketClosed}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-500 text-xl"
//           >
//             {isTicketClosed ? (
//               <FiLock />
//             ) : isSending ? (
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
//             ) : (
//               <FiSend />
//             )}
//           </button>
//         </div>

//         {!isTicketClosed && (
//           <div className="text-right text-xs text-gray-400 mt-1">
//             {newMessage.length}/500
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Conversation;
