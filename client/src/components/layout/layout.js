import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header } from './header';
import { Sidebar } from './sidebar';

export function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 const userRole = localStorage.getItem("role");
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} userRole={userRole} />
      
      <div className="lg:pl-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};