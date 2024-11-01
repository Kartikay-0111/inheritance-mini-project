import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated && (
      <div className=" h-60 w-48 bg-gray-200 rounded-xl flex flex-col m-auto">
        <img className="w-2/3 h-1/2 m-auto" src={user.picture} alt={user.name} />
        <h2 className="p-2 font-bold text-2xl">{user.name}</h2>
        <p className="p-2">{user.email}</p>
        {/* <div>
          <button onClick={callApi}  >Call api</button>
          <br />
          <button onClick={callProtectedApi} >Call protected api</button>
        </div> */}
      </div>
    )
  );
};

export default Profile;