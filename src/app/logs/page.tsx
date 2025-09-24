// // src/app/logs/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "../components/logsNav";

// interface Log {
//   Log_ID: number;
//   Membership_ID: string;
//   Action: string;
//   Changed_By: string;
//   Changed_At: string;
//   Details?: string;
// }

// export default function LogsPage() {
//   const [logs, setLogs] = useState<Log[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await fetch("http://localhost:3001/logs");
//         if (!res.ok) {
//           throw new Error("Failed to fetch logs");
//         }
//         const data = await res.json();
//         console.log("Fetched logs:", data); // debug
//         setLogs(data);
//       } catch (err: any) {
//         console.error("Error fetching logs:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLogs();
//   }, []);

//   if (loading) return <p className="p-4">Loading logs...</p>;
//   if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">Member Activity Logs</h1>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-2">Log ID</th>
//                 <th className="border p-2">Membership ID</th>
//                 <th className="border p-2">Action</th>
//                 <th className="border p-2">Changed By</th>
//                 <th className="border p-2">Changed At</th>
//                 <th className="border p-2">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {logs.length > 0 ? (
//                 logs.map((log) => (
//                   <tr key={log.Log_ID}>
//                     <td className="border p-2">{log.Log_ID}</td>
//                     <td className="border p-2">{log.Membership_ID}</td>
//                     <td className="border p-2">{log.Action}</td>
//                     <td className="border p-2">{log.Changed_By}</td>
//                     <td className="border p-2">
//                       {new Date(log.Changed_At).toLocaleString()}
//                     </td>
//                     <td className="border p-2">{log.Details || "-"}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="border p-2 text-center" colSpan={6}>
//                     No logs found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// src/app/logs/page.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/logsNav";

interface Log {
  Log_ID: number;
  Membership_ID: string;
  Action: string;
  Changed_By: string;
  Changed_At: string;
  Details?: string;
}

export default function LogsPage() {
  const [allLogs, setAllLogs] = useState<Log[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:3001/logs");
        if (!res.ok) throw new Error("Failed to fetch logs");
        const data: Log[] = await res.json();

        setAllLogs(data);

        // ✅ Filter today's logs
        const today = new Date().toISOString().split("T")[0];
        const todaysLogs = data.filter(
          (log) => log.Changed_At.split("T")[0] === today
        );
        setLogs(todaysLogs);
      } catch (err: any) {
        console.error("Error fetching logs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const clearLogs = () => setLogs([]); // clears UI only
  const showAllLogs = () => setLogs(allLogs); // restores all logs

  if (loading) return <p className="p-4">Loading logs...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <>
      <Navbar/>
                                   {/* <Navbar onClearLogs={clearLogs} onShowAllLogs={showAllLogs} /> */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Member Activity Logs</h1>

        {/* Controls */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={clearLogs}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Clear Today’s Logs (UI Only)
          </button>
          <button
            onClick={showAllLogs}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Show All Logs
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Log ID</th>
                <th className="border p-2">Membership ID</th>
                <th className="border p-2">Action</th>
                <th className="border p-2">Changed By</th>
                <th className="border p-2">Changed At</th>
                <th className="border p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.Log_ID}>
                    <td className="border p-2">{log.Log_ID}</td>
                    <td className="border p-2">{log.Membership_ID}</td>
                    <td className="border p-2">{log.Action}</td>
                    <td className="border p-2">{log.Changed_By}</td>
                    <td className="border p-2">
                      {new Date(log.Changed_At).toLocaleString()}
                    </td>
                    <td className="border p-2">{log.Details || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border p-2 text-center" colSpan={6}>
                    No logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

