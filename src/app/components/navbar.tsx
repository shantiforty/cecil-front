// components/Navbar.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const router = useRouter();
  return (
    <header className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          <Image
            src="/filscap.jpg" // Path to the image in the public directory
            alt="FILSCAP Logo"
            width={50} // Set the desired width
            height={50} // Set the desired height
          />
          <div className="text-white text-2xl font-bold">
            Member Directory
          </div>
        </div>

          {/* Search Input */}
          <div className="w-full md:w-auto md:flex-grow md:max-w-md">
            <input
              type="text"
              placeholder="Search by name, number, etc."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.push('/home')}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => router.push('/logs')}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Logs
            </button>
          </div>
        </div>
    </header >
  );
};

export default Navbar;

