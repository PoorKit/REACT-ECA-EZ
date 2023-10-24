import { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import Sidebar from "../components/sidebar";
import Navbar from '../components/navbar';
import { ProductList } from '../components/productlist';

export default function Home() {
  const { user } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-full">
        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="flex overflow-y-hidden">
          <ProductList />
        </div>
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}
