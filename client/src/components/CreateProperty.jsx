import React, { useState } from 'react';
import { useAuth0} from '@auth0/auth0-react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
const CreateProperty = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'apartment',
        price: '',
        location: '',
        image: null,
    });
    const [isSubmitted,setIssubmitted] = useState(false)
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };
    const handleSubmit = async (e) =>{
    e.preventDefault();
    if (!user) {
        setError("You must login first")
        return
    }
    if (!formData.title || !formData.description || !formData.price || !formData.location) {
        alert("Please fill in all required fields.");
        return;
    }

    // Processing form data (e.g., logging or sending to a backend)
    console.log("Form Data:", formData);

    const data = new FormData();
    for (const key in formData) {
        data.append(key, formData[key]); // Append each form field to the FormData object
    }
    for (var pair of data.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    try {
        const token = await getAccessTokenSilently({
            audience: 'http://localhost',
            scope: 'openid profile email',
          });
          console.log(token);


       
        const response = await axios.post(
            'http://localhost:3000/api/v1/properties',
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const json = await response.data;
        console.log(json);
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setFormData({
                title: '',
                description: '',
                type: 'apartment',
                price: '',
                location: '',
                image: null,
            });
            setIssubmitted(true)
        }
    } catch (error) {
        setError(error.message);
    }
   
} 
if(isSubmitted){
    return <Navigate to="/property" />;
}
    return (
        <form className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Property Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter property title"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Property Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter property description"
                />
            </div>

            <div className="flex gap-4 mb-4">
                <div className="flex-1">
                    <label className="block text-gray-700 font-semibold mb-2">Property Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="farmhouse">Farmhouse</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="studio">Studio</option>
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block text-gray-700 font-semibold mb-2">Property Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter property price"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Property Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter property location"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Property Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <button type='submit' onClick={handleSubmit} className="w-full py-2 bg-blue-500 text-white rounded font-semibold">
                Submit
            </button>
        </form>
    );
};

export default CreateProperty;
