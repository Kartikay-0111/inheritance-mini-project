import React,{useState} from 'react';
import { FaEdit,FaTrash } from 'react-icons/fa';
import UpdateProperty from './updateForm';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PropertyCard = ({id ,title, description, type, price, location, image}) => {
    const [isEditing, setIsEditing] = useState(false); // State to manage visibility of UpdateProperty
    const [isDeleting,setIsDeleting] = useState(false);
    const {getAccessTokenSilently} = useAuth0();
    const Navigate =useNavigate();
    const handleEditClick = () => {
        setIsEditing(!isEditing); // Toggle editing state
    };

    const handleDeleteClick=async()=>{
        setIsDeleting(true); // Set the deleting state to true

        try {
            const token = await getAccessTokenSilently({
                audience: 'http://localhost',
                scope: 'openid profile email',
            });
            await axios.delete(`http://localhost:3000/api/v1/properties/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Optionally, you can add a callback to refresh the property list or remove the property from state
            alert("Property deleted successfully!");

            Navigate("/property", {replace:true});
            window.location.reload();

        } catch (error) {
            console.error("Error deleting property:", error);
            alert("Failed to delete property.");
        } finally {
            setIsDeleting(false); // Reset the deleting state
        }
    }

    return (
    <>
        {isEditing ? (
            <UpdateProperty id={id} onClose={() => setIsEditing(false)} />
        ) : (
        <div className="bg-white rounded-lg shadow-md p-4 m-4 w-56">
       
            
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-48 h-48 object-cover rounded-t-lg"
                />
            )}
            <div className="p-4 ">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
                <p className="text-sm text-gray-600">{description}</p>
                <p className="text-gray-800 font-semibold">{location}</p>
                <p className="text-gray-800 font-semibold">Type: {type}</p>
                <p className="text-gray-800 font-semibold inline-block">Price: {price}</p>
                <div className="flex mt-2 items-center justify-between">
                <button onClick={handleEditClick}><FaEdit  className="cursor-pointer"/></button>
                <button onClick={handleDeleteClick}><FaTrash className="cursor-pointer"/></button>
                </div>
               {isDeleting && <p className="text-red-600">Deleting...</p>}
            </div>
            
           
            </div>
             )}
    </>
        
    );
};

export default PropertyCard;
