import { useState } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "../components/sidebar";
import Navbar from '../components/navbar';

import { ProductList } from '../components/productlist';
import CartList from '../components/cartlist';
import Profile from '../components/profile';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-full">
        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="flex overflow-y-hidden bg-slate-300 p-4 min-h-screen w-full justify-center">
          <Routes>
            <Route path="/" element={<ProductList />}/>
            <Route path='/cart' element={<CartList />}/>
            <Route path='/profile' element={<Profile />}/>
          </Routes>
        </div>
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}
