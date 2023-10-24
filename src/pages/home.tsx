import { useState } from 'react';
import Sidebar from "../components/sidebar";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen = {isOpen} toggleSidebar = {toggleSidebar}/>
      <div className="main-content p-4">
        <button
          className="navbar-button bg-blue-500 text-white px-2 py-1 rounded-md"
          onClick={toggleSidebar}
        >
           { isOpen ? "⏴" : "☰" }
        </button>
        <div>
          <h2 className="text-2xl font-semibold mb-4">HELLO!</h2>
        </div>
      </div>
    </div>
  );
}
