import { useEffect, useState } from "react";
import logo from "../../../assets/logo/logo.png";
import { FaCheck } from "react-icons/fa";
import CommonModal from "../../../components/Common/CommonModal";
import useNotification from "../../../components/hook/useNotification";

const Notifications = () => {
  const { notifications: fetchedNotifications, loading } = useNotification();
  const [notifications, setNotifications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(notifications);

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

  const handleClickNotification = (item) => {
    const updated = notifications.map((n) =>
      n._id === item._id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setSelected(item);
    setIsModalOpen(true);
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
          <div
            key={item._id}
            className={`flex gap-4 py-4 cursor-pointer hover:bg-blue-50 transform duration-200 border border-gray-200 px-5 rounded-lg ${
              item.read ? "text-gray-500" : "font-semibold"
            }`}
            onClick={() => handleClickNotification(item)}
          >
            <img src={item.image || logo} alt="logo" className="w-20" />
            <div className="flex-1">
              <p className="hover:text-blue-500">{item.title || item._id}</p>
              <div className="text-sm">{item.message}</div>
            </div>
            <div className="text-sm text-gray-400 whitespace-nowrap">
              {item.time || "Just now"}
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
            <p className="text-gray-500">{selected.time || "Recently"}</p>
            <p>{selected.message}</p>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default Notifications;
