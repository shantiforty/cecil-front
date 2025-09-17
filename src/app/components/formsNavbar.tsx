// components/Navbar.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {
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

        <button
          type="button"
          onClick={() => router.push('/membersList')}
          className="return-btn"
        >
          Return
        </button>
      </div>
    </header >
  );
};

export default Navbar;