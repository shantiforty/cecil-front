// components/Navbar.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// ✅ Remove the onSearch prop from the interface
interface NavbarProps {
  // onSearch: (query: string) => void;
}

// ✅ Remove the onSearch prop from the function signature
const Navbar: React.FC<NavbarProps> = () => {
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

        <button
          type="button"
          onClick={() => router.push('/membersList')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Return
        </button>
      </div>
    </header >
  );
};

export default Navbar;