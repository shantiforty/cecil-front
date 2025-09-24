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

// components/Navbar.tsx
// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// interface NavbarProps {
//   onClearLogs?: () => void;
//   onShowAllLogs?: () => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ onClearLogs, onShowAllLogs }) => {
//   const router = useRouter();
//   return (
//     <header className="navbar">
//       <div className="cont-nav flex justify-between items-center p-4 bg-gray-100 shadow">
//         <div className="bar flex items-center gap-2">
//           <Image
//             src="/filscap.jpg"
//             alt="FILSCAP Logo"
//             width={50}
//             height={50}
//           />
//           <div className="directory font-bold">Member Directory</div>
//         </div>

//         <div className="flex gap-2">
//           {/* ✅ Logs control buttons */}
//           {onClearLogs && (
//             <button
//               type="button"
//               onClick={onClearLogs}
//               className="px-3 py-1 bg-red-600 text-white rounded"
//             >
//               Clear Today’s Logs
//             </button>
//           )}
//           {onShowAllLogs && (
//             <button
//               type="button"
//               onClick={onShowAllLogs}
//               className="px-3 py-1 bg-blue-600 text-white rounded"
//             >
//               Show All Logs
//             </button>
//           )}

//           {/* ✅ Return button */}
//           <button
//             type="button"
//             onClick={() => router.push("/membersList")}
//             className="px-3 py-1 bg-gray-600 text-white rounded"
//           >
//             Return
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
