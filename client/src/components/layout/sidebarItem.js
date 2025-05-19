import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom"; 

export function SidebarItem({ icon: Icon, label, items, route }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = items && items.length > 0;

  return (
    <div>
      {/* Handle top-level items */}
      {!hasSubItems ? (
        <Link
          to={route} // Link to the route for top-level items
          className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-[#708194] rounded-lg transition-colors"
        >
          <div className="flex items-center">
            <Icon className="mr-3" size={20} />
            <span>{label}</span>
          </div>
        </Link>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:text-white hover:bg-[#708194] rounded-lg transition-colors group"
        >
          <div className="flex items-center">
            <Icon className="mr-3" size={20} />
            <span>{label}</span>
          </div>
          <ChevronDown
            size={16}
            className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {/* Handle sub-items */}
      {hasSubItems && isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.route} // Use "to" instead of "href"
              className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#708194] rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired, // Ensure route is passed
    })
  ),
  route: PropTypes.string, // Add route for top-level items
};
