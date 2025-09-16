"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

interface Member {
  Member_No: string;
  Member_Status: string;
  Last_Name: string;
  First_Name: string;
  Middle_Name: string;
  Suffix: string | null;
  Name: string;
  Sex: string;
  Prefix: string;
  CAE_No: string;
  Membership_ID: string;
  IPI_Name_Number: string;
  IPI_Base_Number: string;
  Band_Name: string | null;
  Pseudonym: string;
  Address: string;
  Contact_Number: string | null;
  Email_Address: string | null;
  Tin_Number: string | null;
  Primary_Contact_Number: string | null;
  Secondary_Contact_Number: string | null;
  Official_Representative: string | null;
  Office_Number: string | null;
  Office_Address: string | null;
  Landline: string | null;
  Signatory: string | null;
  Bank_Account_Info: string | null;
  Bank_Name: string | null;
  Contact_Person: string | null;
  Date_of_Membership: string;
  Date_of_Birth: string;
  Date_of_Death: string | null;
  Date_of_Membership_Termination_Resignation: string | null;
  Remarks: string;
  Type_of_Business_Entity: string | null;
  Remarks2: string | null;
  Related_files: string | null;
  Date_Registred_National_Library: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const router = useRouter();

  const membersPerPage = 10;

  // Fetch all members once
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API_BASE}/members`);
        if (!res.ok) throw new Error("Failed to fetch members");
        const data: Member[] = await res.json();
        setMembers(data || []);
        setFilteredMembers(data || []); // Initialize filtered list with all members
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, []);

  // search function
  const handleSearch = (query: string) => {
    setCurrentPage(1); // Reset page to 1 when a new search is performed
    const lowercasedQuery = query.toLowerCase();

    if (lowercasedQuery === "") {
      setFilteredMembers(members); // If query is empty, show all members
    } else {
      const filtered = members.filter(
        (member) =>
          String(member.Name).toLowerCase().includes(lowercasedQuery) ||
          String(member.Member_No).toLowerCase().includes(lowercasedQuery) ||
          String(member.Email_Address).toLowerCase().includes(lowercasedQuery) ||
          String(member.Contact_Number).toLowerCase().includes(lowercasedQuery)
      );
      setFilteredMembers(filtered);
    }
  };

  // Pagination now uses the filtered list
  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  // Fetch single member details
  const handleMemberClick = async (member: Member) => {
    try {
      const res = await fetch(`${API_BASE}/members/${member.Member_No}`);
      if (!res.ok) throw new Error("Failed to fetch member details");
      const data: Member = await res.json();
      setSelectedMember(data);
    } catch (err) {
      console.error("Error fetching member:", err);
    }
  };


  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="search-container">
        {/* LEFT: Members list & Pagination */}
        <div>
          <h1 className="header">Members List</h1>

          {currentMembers.length > 0 ? (
            <ul className="space-y-4">
              {currentMembers.map((member) => (
                <li
                  key={member.Member_No}
                  className="search-input"
                  onClick={() => handleMemberClick(member)}
                >

                  <div className="font-semibold">{member.Name}</div>
                  <div className="text-gray-500">{member.Member_Status}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No members found or data is still loading...</p>
          )}

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>

        {/* RIGHT: Member details */}
        <div>
          {selectedMember ? (
            <div className="member-details">
              <h2 className="text-2xl font-bold mb-4">
                {selectedMember.Name} ({selectedMember.Member_Status})
              </h2>
              {/* This is the new, dynamic section */}
              {Object.entries(selectedMember)
                .filter(([key]) => key !== 'Name' && key !== 'Member_Status')
                .map(([key, value]) => {
                  const formattedKey = key.replace(/_/g, ' ');
                  return (
                    <p key={key}>
                      <strong>{formattedKey}:</strong> {String(value) || "N/A"}
                    </p>
                  );
                })}
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    router.push(`/edit?memberId=${selectedMember.Member_No}`);
                    console.log("Edit button clicked for member:", selectedMember.Member_No);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Member
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              Select a member to see details
            </p>
          )}
        </div>
      </div>
    </>
  );
}