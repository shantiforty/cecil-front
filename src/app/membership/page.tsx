// src/app/membership/page.tsx

"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
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

const initialFormData: Member = {
    // Initialize all properties with default empty values
    Member_No: '',
    Member_Status: '',
    Last_Name: '',
    First_Name: '',
    Middle_Name: '',
    Suffix: null,
    Name: '',
    Sex: '',
    Prefix: '',
    CAE_No: '',
    Membership_ID: '',
    IPI_Name_Number: '',
    IPI_Base_Number: '',
    Band_Name: null,
    Pseudonym: '',
    Address: '',
    Contact_Number: null,
    Email_Address: null,
    Tin_Number: null,
    Primary_Contact_Number: null,
    Secondary_Contact_Number: null,
    Official_Representative: null,
    Office_Number: null,
    Office_Address: null,
    Landline: null,
    Signatory: null,
    Bank_Account_Info: null,
    Bank_Name: null,
    Contact_Person: null,
    Date_of_Membership: '',
    Date_of_Birth: '',
    Date_of_Death: null,
    Date_of_Membership_Termination_Resignation: null,
    Remarks: '',
    Type_of_Business_Entity: null,
    Remarks2: null,
    Related_files: null,
    Date_Registred_National_Library: '',
};

export default function AddMemberPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<Member>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value === "" ? null : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE}/membership`, {
                method: "POST", // Use POST for creating a new resource
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to add new member");

            alert("New member added successfully!");
            router.push('/membersList'); // Navigate back to the member list
        } catch (err) {
            console.error("Error adding member:", err);
            alert("Failed to add new member.");
        }
    };

    return (
        <>
            {/* Call the Navbar component here */}
            <Navbar />
            <div className="container mx-auto p-6">

                <h1 className="text-3xl font-bold mb-6">Add Member</h1>
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
                                        className="p-2 border rounded bg-gray-200 cursor-not-allowed"
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
