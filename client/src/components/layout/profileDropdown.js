import PropTypes from "prop-types";
import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: User, label: "View Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function ProfileDropdown({ isOpen }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data
    navigate("/"); // Redirect to home or login page
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
      {menuItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <item.icon size={16} className="mr-3" />
          {item.label}
        </a>
      ))}
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <LogOut size={16} className="mr-3" />
        Logout
      </button>
    </div>
  );
}

ProfileDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
