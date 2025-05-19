import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { SidebarSection } from './sidebarSection';
import { SidebarItem } from './sidebarItem';
import { sidebarData } from '../data/sidebarData';
import { Link } from 'react-router-dom'; // Import Link here if it's used in Sidebar.js

export function Sidebar({ isOpen, onClose, userRole }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <aside
        className={`fixed inset-y-0 left-0 bg-[#293541] w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-[#293541]">
          <h1 className="text-white text-xl font-bold">Achievements Tracking</h1>
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 py-4 space-y-4">
          {sidebarData.map((section, index) => {
            const filteredItems = section.items.filter(
              (item) => item.roles?.includes(userRole)
            );

            if (filteredItems.length === 0) return null; // Hide section if no items are visible

            return (
              <div key={index}>
                <SidebarSection title={section.section} />
                <div className="mt-2 space-y-1">
                  {filteredItems.map((item, itemIndex) => (
                    <SidebarItem
                      key={itemIndex}
                      icon={item.icon}
                      label={item.label}
                      items={item.items?.filter((subItem) =>
                        subItem.roles?.includes(userRole)
                      )} // Filter sub-items
                      route={item.route}
                      userRole={userRole} // Pass user role
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired, // Add userRole validation
};

