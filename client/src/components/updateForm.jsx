import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'; // Make sure Auth0 is set up in your project
import {useNavigate} from 'react-router-dom';


const UpdateProperty = ({ id , onClose}) => {    //takes property id, and a fn that closes the form 
    const [property, setProperty] = useState({
        title: '',
        description: '',
        price: '',
        propertyType: '',
        location: '',
        image: null,
    });
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { getAccessTokenSilently } = useAuth0();
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const token = await getAccessTokenSilently({
                    audience: 'http://localhost',
                    scope: 'openid profile email',
                });
                console.log(token)
                const response = await axios.get(`http://localhost:3000/api/v1/properties/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProperty(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id, getAccessTokenSilently]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setProperty((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', property.title);
        formData.append('description', property.description);
        formData.append('type', property.propertyType);
        formData.append('price', property.price);
        formData.append('location', property.location);
        if (property.image) {
            formData.append('image', property.image);
        }

        try {
            const token = await getAccessTokenSilently({
                audience: 'http://localhost',
                scope: 'openid profile email',
            });

            await axios.patch(`http://localhost:3000/api/v1/properties/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                 
                },
            });

            // Optionally call the onUpdate function to refresh the property list
            console.log("done updating");
            alert("Property updated");

            Navigate("/property",{replace:true})
            window.location.reload();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <form onSubmit={handleSubmit} className="bg-white p-4 w-3/4 rounded shadow-md">
            <h2 className="text-xl mb-4">Update Property</h2>
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={property.title}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={property.description}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="type">Type</label>
                <input
                    type="text"
                    name="propertyType"
                    value={property.propertyType}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    value={property.price}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="location">Location</label>
                <input
                    type="text"
                    name="location"
                    value={property.location}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700" htmlFor="image">Upload New Image (optional)</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Property</button>
            <button className="bg-blue-500 text-white p-2 rounded" onClick={onClose}>Close</button>
        </form>
        </div>
    );
};

export default UpdateProperty;
