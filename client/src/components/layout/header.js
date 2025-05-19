import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Bell, Search, Menu } from 'lucide-react';
import { useClickAway } from '../../hooks/useClickAway';
import { NotificationsDropdown } from './notificationsDropdown';
import { ProfileDropdown } from './profileDropdown';

export function Header({ onMenuClick }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const role = localStorage.getItem("role");
  useClickAway(notificationsRef, () => setIsNotificationsOpen(false));
  useClickAway(profileRef, () => setIsProfileOpen(false));
  
  return (
    <header className="bg-white shadow-sm">
      <div className="h-16 px-4 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 -mt-2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border bg-slate-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div ref={notificationsRef} className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <Bell size={20} />
            </button>
            <NotificationsDropdown isOpen={isNotificationsOpen} />
          </div>

          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </button>
            <ProfileDropdown isOpen={isProfileOpen} />
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired
};