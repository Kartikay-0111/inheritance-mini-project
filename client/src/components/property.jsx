import React, { useState,useEffect } from 'react';
import CreateProperty from './CreateProperty.jsx';
import PropertyCard from './propertyCard.jsx';

import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
const Property = () => {
  const [showForm, setShowForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [error,setError] = useState("");
  const [searchQuery,setSearchQuery] = useState("");
  const {isLoading,getAccessTokenSilently} = useAuth0();
  const [loading,setLoading] = useState("true");

  const fetchProperties = async() => {
    try{
      const token = await getAccessTokenSilently({
        audience: 'http://localhost',
        scope: 'openid profile email',
      })
      const response = await axios.get('http://localhost:3000/api/v1/properties', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // console.log(response.data);
    setProperties(response.data);
    }
    catch(err){
      setError(err.message);
    } finally{
        setLoading(false);
    }
  }

  useEffect(()=>{      //fetching the proprties when cmpnnt mounts
    fetchProperties();
  }, []);

  const handleClick = () => {
    setShowForm(!showForm);   //form display
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
   
  }

  const handleCreateProperty = () =>{
    fetchProperties();
  }
  const filteredProperties = searchQuery
    ? properties.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : properties;
  
  return (
    <div className='w-full'>
      <p>{error}</p>
      <div className="flex flex-col md:flex-row items-center mb-4 mt-4">
                <button
                    className="bg-blue-600 text-white ml-4 px-4 py-2 rounded hover:bg-blue-700 focus:outline-none transition duration-200"
                    onClick={handleClick}
                >
                    {showForm ? 'Close Form' : 'Create'}
                </button>

                <input
                    type="text"
                    placeholder="Search by title or location"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="mt-2 md:mt-0 md:ml-4 px-4 py-2 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <button className="bg-blue-600 ml-4 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none transition duration-200">Sort</button>
      </div>
            {/* Show form conditionally */}
            {showForm ? (
                <div className="mb-4">
                    <CreateProperty/>
                </div>
            ):(
             <div className="flex flex-wrap gap-4">
                {filteredProperties.length === 0 ? (
                    <p className="text-gray-500">No properties found.</p>
                ) : (
                    filteredProperties.map(property => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            description={property.description}
                            type={property.propertyType}
                            price={property.price}
                            location={property.location}
                            image={property.photo} 
                        />
                        
                    ))
                )}
            </div>
            )}
          {/* {isLoading && <p className="text-red-600">Loading...</p>} */}
    </div>
  );
};

export default Property;
