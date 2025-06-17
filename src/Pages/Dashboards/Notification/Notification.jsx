import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import useNotification from "../../../components/hook/useNotification";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { notifications: fetchedNotifications, loading } = useNotification();
  const [notifications, setNotifications] = useState([]);

  console.log(notifications);

  // Update local state when fetchedNotifications changes
  useEffect(() => {
    if (fetchedNotifications?.length) {
      const updated = fetchedNotifications.map((item) => ({
        ...item,
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
            key={item?._id}
            to={`/ticket_details/${item?.ticketId}`}
            className={`flex gap-4 py-4 cursor-pointer hover:bg-blue-50 transform duration-200 border border-gray-200 px-5 rounded-lg ${
              item?.isRead ? "text-gray-500" : "font-semibold"
            }`}
            
          >
            <div className="flex-1">
              <p className="hover:text-blue-500 font-semibold">{item?.title || item?._id}</p>
              <div className="text-sm">{item?.description}</div>
            </div>
            <div className="text-sm text-gray-400 whitespace-nowrap">
              {item?.updatedAt ? formatDateTime(item?.updatedAt) : "Just now"}
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
