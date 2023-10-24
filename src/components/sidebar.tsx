// Sidebar.js
import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useUserContext } from '../contexts/UserContext';

type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const { setIsAuthenticated, setToken } = useAuthContext();

    const handleLogout = () => {
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <div className={`sidebar ${isOpen ? 'w-64' : 'w-0'} bg-gray-900 transition-all duration-300 ease-in-out`}>
            { isOpen && <button className="toggle-button p-2 text-white" onClick={toggleSidebar}>
                ☰
            </button>}
            <ul className="sidebar-list">
                <li className="text-white p-2 hover:bg-gray-800">Link 1</li>
                <li className="text-white p-2 hover-bg-gray-800">Link 2</li>
            </ul>
            <div className="logout-button p-2 text-white hover:bg-gray-800">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
