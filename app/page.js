"use client";

import Image from "next/image";
import axios from "axios";
import { message, Modal } from "antd";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Popup from "@/components/popup";
import Updateform from "@/components/updateForm";



export default function Home() {
  const [allstudents, setStudents] = useState([]);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignInModalUpdate, setShowSignInModalUpdate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const getStudent = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const getstudents = await axios.get("/api/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(getstudents.data);

      console.log(allstudents);
    } catch (error) {
      console.log(error);
    }
  };



  const handleDeleteUser = async (userId) => {
    try {
      // Send request to backend to delete user
      await axios.delete(`/api/deleteUser/${userId}`);
      message.success("User deleted successfully");

      getStudent();

      // Optionally, update UI to reflect the user deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user. Please try again.");
    }
  };




  useEffect(() => {
    getStudent();
  }, [showSignInModal]);

  useEffect(() => {
    getStudent();
  }, [showSignInModal]);

  const handleToggleModal = () => {
    setShowSignInModal(!showSignInModal);
    console.log(showSignInModal);
  };

  const handleToggleModalUpdate = (userId) => {
    setSelectedUserId(userId);
    const userData = allstudents.find((student) => student._id === userId);
    console.log(userData);
    setSelectedUserData(userData);
    setShowSignInModalUpdate(!showSignInModalUpdate);
  };

  const handleCheckboxChange = (student) => {
    setSelectedRows((prev) => {
      if (prev.find((row) => row._id === student._id)) {
        return prev.filter((row) => row._id !== student._id);
      } else {
        return [...prev, student];
      }
    });
  };



  const sendData = async () => {
    console.log(selectedRows)

    try {
      const response = await axios.post("api/sendGmail", selectedRows);

      if (response.status == 200) {
        message.success("Email sent successfully");
      } else {
        message.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };




  useEffect(() => {
    getStudent();
  }, [showSignInModalUpdate]);

  // connectToDB();

  return (


    


    <main>

{/* <button onClick={send} >buttttton</button> */}




      <Navbar />
      <div className="text-end mt-6 mr-10">
        <button
          className="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100"
          onClick={handleToggleModal}
        >
          Add User
        </button>
      </div>

      {showSignInModal && <Popup setShowSignInModal={setShowSignInModal} />}
      {showSignInModalUpdate && (
        <Updateform
          setShowSignInModalUpdate={setShowSignInModalUpdate}
          userId={selectedUserId}
          selectedUserData={selectedUserData}
        />
      )}

      <div className="overflow-x-auto p-5">
        <table className="min-w-full bg-white font-[sans-serif]">
          <thead className="bg-gray-700 whitespace-nowrap">
            <tr>
              <th className="pl-6 w-8">
                <input id="checkbox" type="checkbox" className="hidden peer" />
                <label
                  for="checkbox"
                  className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full fill-white"
                    viewBox="0 0 520 520"
                  >
                    <path
                      d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                      data-name="7-Check"
                      data-original="#000000"
                    />
                  </svg>
                </label>
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                phone_number
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                hobbies
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {allstudents.map((value, index) => (
              <tr className="even:bg-blue-50">
                <td className="pl-6 w-8">
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    className="hidden peer"
                    onChange={() => handleCheckboxChange(value)}
                  />
                  <label
                    for={`checkbox-${index}`}
                    className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full fill-white"
                      viewBox="0 0 520 520"
                    >
                      <path
                        d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                        data-name="7-Check"
                        data-original="#000000"
                      />
                    </svg>
                  </label>
                </td>
                <td className="px-6 py-4 text-sm">{value.name}</td>
                <td className="px-6 py-4 text-sm">{value.phone_number}</td>
                <td className="px-6 py-4 text-sm">{value.email}</td>
                {value.hobbies.map((hobby, index) => (
                  <span key={index}>
                    {hobby}
                    <br />
                  </span>
                ))}

                <td className="px-6 py-4">
                  <button
                    className="mr-4"
                    title="Edit"
                    onClick={() => handleToggleModalUpdate(value._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 fill-blue-500 hover:fill-blue-700"
                      viewBox="0 0 348.882 348.882"
                    >
                      <path
                        d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                        data-original="#000000"
                      />
                      <path
                        d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>

                  <button
                    className="mr-4"
                    title="Delete"
                    onClick={() => handleDeleteUser(value._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 fill-red-500 hover:fill-red-700"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                        data-original="#000000"
                      />
                      <path
                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-row justify-center items-center w-full md:w-full mt-10">
          <button
            className="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100"
            onClick={sendData}
          >
            Send Data
          </button>
        </div>
      </div>
    </main>
  );
}
