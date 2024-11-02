import React, { useState } from 'react';
import CreateProperty from './CreateProperty.jsx';
const Property = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true); // Show the form when "Create" button is clicked
  };

  return (
    <div>
      {!showForm ? (
        <button onClick={handleClick}>Create</button>
      ) : (
        <CreateProperty/>
      )}
    </div>
  );
};

export default Property;
