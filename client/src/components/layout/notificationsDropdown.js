import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function NotificationsDropdown({ isOpen }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const rollno = localStorage.getItem("rollno");
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/protected/get-suggestion/${rollno}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (index) => {
    const notification = notifications[index];

    try {
      await fetch(`http://localhost:8080/protected/update-suggestion`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reading_status: "1", roll_no: rollno }),
      });

      const updatedNotifications = [...notifications];
      updatedNotifications[index].reading_status = "1";
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50">
      <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-semibold">Notifications</h3>
        {/* Show Red Dot if there's any unread notification */}
        {notifications.some((n) => n.reading_status === "0") && (
          <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex justify-between items-start"
          >
            <div className="flex items-center gap-2">
              {/* Red Dot for Unread Notifications */}
              {notification.reading_status === "0" && (
                <span className="h-2.5 w-2.5 bg-red-500 rounded-full"></span>
              )}
              <div>
                <p className="text-sm text-gray-800">{notification.comments}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.reading_status === "1" ? "Read" : "Unread"}
                </p>
              </div>
            </div>
            {notification.reading_status === "0" && (
              <button
                onClick={() => markAsRead(index)}
                className="text-blue-500 text-xs font-semibold"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

NotificationsDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
