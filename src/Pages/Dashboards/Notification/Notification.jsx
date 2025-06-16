import { useEffect, useState } from "react";
import logo from "../../../assets/logo/logo.png";
import { FaCheck } from "react-icons/fa";
import useNotification from "../../../components/hook/useNotification";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { notifications: fetchedNotifications, loading } = useNotification();
  const [notifications, setNotifications] = useState([]);

  // Update local state when fetchedNotifications changes
  useEffect(() => {
    if (fetchedNotifications?.length) {
      const updated = fetchedNotifications.map((item) => ({
        ...item,
        read: item.read || false,
        image: logo,
      }));
      setNotifications(updated);
    }
  }, [fetchedNotifications]);

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    return `Date: ${day}-${month}-${year}, Time: ${hours}:${minutes}${ampm}`;
  };

  if (loading) return <p>Loading notifications...</p>;

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
          <Link
            key={item._id}
            to={`/ticket_details/${item.ticketId}`}
            className={`flex gap-4 py-4 cursor-pointer hover:bg-blue-50 transform duration-200 border border-gray-200 px-5 rounded-lg ${
              item.read ? "text-gray-500" : "font-semibold"
            }`}
            
          >
            <img src={item.image || logo} alt="logo" className="w-20" />
            <div className="flex-1">
              <p className="hover:text-blue-500">{item.title || item._id}</p>
              <div className="text-sm">{item.message}</div>
            </div>
            <div className="text-sm text-gray-400 whitespace-nowrap">
              {item.updatedAt ? formatDateTime(item.updatedAt) : "Just now"}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-blue-600 cursor-pointer">
        View all notification
      </div>

      
    </div>
  );
};

export default Notifications;
