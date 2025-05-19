import { useState } from "react";
import logo from "../../../assets/logo/logo.png";
import { FaCheck } from "react-icons/fa";
import CommonModal from "../../../components/Common/CommonModal";

const initialNotifications = [
  {
    id: 1,
    title: "AI",
    message: "Linda Sanders have been collected and are ready for review.",
    time: "5h ago",
    image: logo,
    read: false,
  },
  {
    id: 2,
    title: "New Lead Assigned",
    message: "A new lead has been assigned to you: Robert Johnson.",
    time: "2h ago",
    image: logo,
    read: false,
  },
  {
    id: 3,
    title: "Reminder",
    message: "Follow up with Jessica Miller about her recent property inquiry.",
    time: "1d ago",
    image: logo,
    read: false,
  },
  {
    id: 4,
    title: "Meeting Scheduled",
    message: "Your meeting with Sarah Brown is confirmed for tomorrow at 3PM.",
    time: "3h ago",
    image: logo,
    read: false,
  },
  {
    id: 5,
    title: "New Message",
    message:
      "Client Alex Turner has sent a message regarding the 2BHK listing.",
    time: "10m ago",
    image: logo,
    read: false,
  },
  {
    id: 6,
    title: "Price Update",
    message: "The price of property ID #45213 has been updated.",
    time: "4h ago",
    image: logo,
    read: false,
  },
  {
    id: 7,
    title: "Client Feedback",
    message: "You received new feedback from Emily Watson.",
    time: "30m ago",
    image: logo,
    read: false,
  },
  {
    id: 8,
    title: "Call Scheduled",
    message: "Your call with Jason Lee is scheduled for 5 PM today.",
    time: "15m ago",
    image: logo,
    read: false,
  },
  {
    id: 9,
    title: "Offer Received",
    message: "An offer has been received for property ID #67890.",
    time: "45m ago",
    image: logo,
    read: false,
  },
  {
    id: 10,
    title: "Site Visit Confirmed",
    message: "The site visit for Mia Rodriguez is confirmed for Friday.",
    time: "6h ago",
    image: logo,
    read: false,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (item) => {
    setSelected(item);
    setIsModalOpen(true);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const handleClickNotification = (item) => {
    const updated = notifications.map((n) =>
      n.id === item.id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setSelected(item); // Set selected item
    setIsModalOpen(true); // Open modal properly
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <button
          onClick={markAllAsRead}
          className="text-blue-500 flex items-center gap-1"
        >
          <FaCheck className="text-sm" />
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`flex gap-4 py-4 cursor-pointer hover:bg-blue-50 transform duration-200 border border-gray-200 px-5 rounded-lg ${
              item.read ? "text-gray-500" : "font-semibold"
            }`}
            onClick={() => handleClickNotification(item)}
          >
            <img src={item.image} alt="logo" className="w-20" />
            <div className="flex-1">
              <button
                onClick={() => handleView(item)}
                className="hover:text-blue-500"
              >
                {item.title}
              </button>
              <div className="text-sm">{item.message}</div>
            </div>
            <div className="text-sm text-gray-400 whitespace-nowrap">
              {item.time}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-blue-600 cursor-pointer">
        View all notification
      </div>

      {/* ✅ Modal with selected data */}
      <CommonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Notification Details"
      >
        {selected && (
          <div className="space-y-3">
            <p className="text-lg font-bold">{selected.title}</p>
            <p className="text-gray-500">{selected.time}</p>
            <p>{selected.message}</p>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default Notifications;
