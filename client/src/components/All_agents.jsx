import React,{useEffect,useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import AgentCard from './AgentCard';
const Agents = () => {
    const {user,getAccessTokenSilently} = useAuth0();
    const [userData,setUserData] = useState([]);
    useEffect(() => {
        const fetchUsersFromBackend = async () => {
            try {
                if (user) {
                    const token = await getAccessTokenSilently();
                    const response = await axios.get("http://localhost:3000/api/v1/users", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    // console.log(response.data);
                    setUserData(response.data); 
                }
            } catch (err) {
                console.error("Error fetching users from backend:", err);
                setError("Failed to load profile from server.");
            }
        };

        fetchUsersFromBackend();
    }, [user, getAccessTokenSilently]);

    return (
        <div className="w-full h-max grid lg:grid-cols-4 md:grid-cols-2 gap-4 ">
            {userData.map((user) => (
                <AgentCard key={user.auth0Id} {...user} />
            ))}
        </div>
    )
}

export default Agents