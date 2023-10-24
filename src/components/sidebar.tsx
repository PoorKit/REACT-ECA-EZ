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
        <div className={`sidebar bg-gray-900 transition-all duration-300 ease-in-out h-full min-h-screen sticky top-0 right-0 overflow-y-hidden ${isOpen ? 'min-w-[180px]' : 'min-w-[0px] w-0 invisible'}`}>
            { isOpen && <button className="toggle-button p-2 py-5 text-white" onClick={toggleSidebar}>
                ⏵
            </button>}
            <ul className="sidebar-list">
                <li className="text-white p-2 hover:bg-gray-800">My Cart</li>
            </ul>
            <div className="logout-button p-2 text-white hover:bg-gray-800">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
