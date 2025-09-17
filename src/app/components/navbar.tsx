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
    <header className="navbar">
      <div className="cont-nav">
        <div className="bar">
          <Image
            src="/filscap.jpg"
            alt="FILSCAP Logo"
            width={50} 
            height={50} 
          />
          <div className="directory">
            Member Directory
          </div>
        </div>

          {/* Search Input */}
          <div className="search">
            <input
              type="text"
              placeholder="Search by name, number, etc."
              onChange={(e) => onSearch(e.target.value)}
              className="search-cont"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.push('/home')}
              className="return-btn"
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => router.push('/logs')}
              className="return-btn"
            >
              Logs
            </button>
          </div>
        </div>
    </header >
  );
};

export default Navbar;

