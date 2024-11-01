import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

//   useEffect(() => {
//     const callProtectedApi = async() => {
//     try {
//       const token = await getAccessTokenSilently({
//         audience: 'http://localhost',
//         scope: "openid profile email",
//       });

//       console.log("Token : ")
//       console.log(token)
      
//       const response = await axios.get("http://localhost:3000/api/v1/users", 
//         {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log(response.data);
//     }
//     catch (error) {
//       console.error("Error calling protected API:", error.response ? error.response.data : error.message);
//     }
//   }
//   callProtectedApi();
// },[ getAccessTokenSilently]);

// if (isLoading) {
//     return <div>Loading ...</div>;
//   }
//   // function callApi() {
//   //   axios
//   //     .get("http://localhost:3000/not")
//   //     .then(response => console.log(response.data))
//   //     .catch(e => console.log(e))
//   // }
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
