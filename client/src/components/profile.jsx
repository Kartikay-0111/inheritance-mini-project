import React from "react";
import { useAuth } from "../context/authContext";

const Profile = () => {
  const token = localStorage.getItem("token");
  const {user} = useAuth();
  console.log(user)
  async function fetchProtectedData(token) {
    try {
      const response = await fetch("http://localhost:5000/protected", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch protected data");
      }

      const data = await response.json();
      console.log("Protected data:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    user && (
      <div className="w-full flex justify-center">
        <div className="h-70 w-48 bg-gray-200 rounded-xl flex flex-col m-auto">
          <img className="w-2/3 h-1/2 m-auto" src={user.picture} alt={user.name} />
          <h2 className="p-2 font-bold text-2xl">{user.name}</h2>
          <p className="p-2">{user.email}</p>
          <button
            onClick={() => fetchProtectedData(token)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Call Protected Route
          </button>
        </div>
      </div>
    )
  );
};

export default Profile;
