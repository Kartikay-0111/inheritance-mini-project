import React from 'react';

const PropertyCard = ({ title, description, type, price, location, image }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 m-4 w-full md:w-1/3 lg:w-1/4">
            {image && (
                <img
                    src={URL.createObjectURL(image)}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            )}
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
                <p className="text-sm text-gray-600 mb-2">{description}</p>
                <p className="text-gray-800 font-semibold">Type: {type}</p>
                <p className="text-gray-800 font-semibold">Price: ₹{price}</p>
                <p className="text-gray-600">Location: {location}</p>
            </div>
        </div>
    );
};

export default PropertyCard;
