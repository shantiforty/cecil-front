"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from "../components/formsNavbar";


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


const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

export default function EditMemberPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const memberId = searchParams.get('memberId');
    const [member, setMember] = useState<Member | null>(null);
    const [formData, setFormData] = useState<Member | null>(null);

    useEffect(() => {
        if (memberId) {
            const fetchMember = async () => {
                try {
                    const res = await fetch(`${API_BASE}/members/${memberId}`);
                    const data: Member = await res.json();
                    setMember(data);
                    setFormData(data);
                } catch (err) {
                    console.error("Error fetching member:", err);
                }
            };
            fetchMember();
        }
    }, [memberId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            if (!prevData) return null;
            return {
                ...prevData,
                [name]: value === "" ? null : value,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData || !memberId) return;

        try {
            const res = await fetch(`${API_BASE}/members/${memberId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update member");

            alert("Member updated successfully!");
            router.push('/membersList'); // Navigate back
        } catch (err) {
            console.error("Error updating member:", err);
            alert("Failed to update member.");
        }
    };

    if (!member || !formData) {
        return <p>Loading member details...</p>;
    }

    return (
        <>
            {/* Call the Navbar component here */}
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Edit Member: {member.Name}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(formData).map((key) => {
                        const value = formData[key as keyof Member];
                        const formattedKey = key.replace(/_/g, ' ');

                        if (key === "Member_No") {
                            return (
                                <div key={key} className="flex flex-col">
                                    <label className="font-semibold">{formattedKey}:</label>
                                    <input
                                        type="text"
                                        value={value as string}
                                        disabled
                                        className="edit-cursor"
                                    />
                                </div>
                            );
                        }
                        return (
                            <div key={key} className="flex flex-col">
                                <label className="font-semibold">{formattedKey}:</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={String(value || '')}
                                    onChange={handleChange}
                                    className="p-2 border rounded"
                                />
                            </div>
                        );
                    })}
                    <div className="flex justify-between mt-4">
                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
