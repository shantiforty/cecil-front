// src/app/edit/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/formsNavbar";

interface Member {
  Member_No: string;
  Member_Status: string | null;
  Last_Name: string | null;
  First_Name: string | null;
  Middle_Name: string | null;
  Suffix: string | null;
  Name: string | null;
  Sex: string | null;
  Prefix: string | null;
  CAE_No: string | null;
  Membership_ID: string;
  IPI_Name_Number: string | null;   // hidden
  IPI_Base_Number: string | null;   // hidden
  Band_Name: string | null;
  Pseudonym: string | null;
  Address: string | null;
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
  Date_of_Membership: string | null;
  Date_of_Birth: string | null;
  Date_of_Death: string | null;
  Date_of_Membership_Termination_Resignation: string | null;
  Remarks: string | null;
  Type_of_Business_Entity: string | null;
  Remarks2: string | null;
  Related_files: string | null;
  Date_Registred_National_Library: string | null;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

export default function EditMemberPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const memberId = searchParams.get("memberId");

  const [formData, setFormData] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  // Fetch member data
  useEffect(() => {
    if (!memberId) return;
    const fetchMember = async () => {
      try {
        const res = await fetch(`${API_BASE}/members/${memberId}`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        if (!res.ok) throw new Error("Failed to fetch member");
        const data: Member = await res.json();
        setFormData(data);
      } catch (err) {
        console.error("Error fetching member:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [memberId, token]);

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData ? { ...prevData, [name]: value === "" ? null : value } : prevData
    );
  };

  // Submit form → use /membership/:id (update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !formData.Membership_ID) return;

    try {
      const res = await fetch(
        `${API_BASE}/membership/${formData.Membership_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        let errorMsg = `Request failed with status ${res.status}`;
        try {
          const errorData = await res.json();
          errorMsg = errorData.error || errorData.message || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      alert("Member updated successfully!");
      router.push("/membersList");
    } catch (err: any) {
      console.error("Error updating member:", err);
      alert(err.message || "Failed to update member.");
    }
  };

  if (loading) return <p>Loading member details...</p>;
  if (!formData) return <p>No member found.</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Edit Member: {formData?.Name ?? ""}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => {
            const value = formData[key as keyof Member];
            const formattedKey = key.replace(/_/g, " ");

            // 🚫 Hide IPI fields
            if (key === "IPI_Name_Number" || key === "IPI_Base_Number") {
              return null;
            }

            // Always show Member_No (read-only)
            if (key === "Member_No") {
              return (
                <div key={key} className="flex flex-col">
                  <label className="font-semibold">{formattedKey}:</label>
                  <input
                    type="text"
                    value={String(value)}
                    disabled
                    className="p-2 border rounded bg-gray-100 text-gray-500"
                  />
                </div>
              );
            }

            // Always show Membership_ID (read-only)
            if (key === "Membership_ID") {
              return (
                <div key={key} className="flex flex-col">
                  <label className="font-semibold">{formattedKey}:</label>
                  <input
                    type="text"
                    value={String(value)}
                    disabled
                    className="p-2 border rounded bg-gray-100 text-gray-500"
                  />
                </div>
              );
            }

            // Editable fields
            return (
              <div key={key} className="flex flex-col">
                <label className="font-semibold">{formattedKey}:</label>
                <input
                  type="text"
                  name={key}
                  value={String(value || "")}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              </div>
            );
          })}
          <div className="flex justify-between mt-4">
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}