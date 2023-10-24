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
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto">
          <ProductList />
        </div>
      </div>


    </div>
  );
}
