import React, { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";

const Popup = ({ setShowSignInModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hobbies, setHobbies] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email ||  !phoneNumber || !hobbies) {

        message.error("please fill all the fields")
    }

    if (phoneNumber.length !== 10  ) {
        message.error('Please enter a valid 10-digit phone number');
        return;
    }

    const data = {
      name,
      email,
      phoneNumber,
      hobbies: hobbies.split(",").map((hobby) => hobby.trim()),
    };

    console.log(data);

    try {
      // Send data to the backend API endpoint
      const response = await axios.post("api/saveUser", data);

      console.log(response);

      if (response.status == 201) {
        // Reset form fields if submission is successful
        setName("");
        setEmail("");
        setPhoneNumber("");
        setHobbies("");
        message.success("User added successfully!");

        setTimeout(() => {
          setShowSignInModal(false);
        }, 2000);
      } else {
        message.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while adding user");
    }
  };


  const closeForm = ()=>{

    setShowSignInModal(false)
         
  }


  

  return (
    <div className="absolute top-[20%] left-[35vw] mx-auto w-[30%] z-[1000]">
      <form
        className="w-full max-w-sm mx-auto z-[100] bg-white p-8 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <button className="p-5">
          <CloseCircleOutlined    onClick={closeForm} />
          Cancel
        </button>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hobbies"
          >
            Hobbies
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="hobbies"
            name="hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            placeholder="Hobbies (comma-separated)"
            required
          />
        </div>
        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default Popup;
