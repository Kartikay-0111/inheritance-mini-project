import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const UserCreationForm = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || ''); // Default to empty string if email is not available
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get the access token
      const token = await getAccessTokenSilently({
        audience: 'http://localhost',
        scope: 'openid profile email',
      });
      console.log(token);
      // Send user data to your backend API
      const response = await axios.post(
        'http://localhost:3000/api/v1/users',
        {
          name,
          email, // Get email from Auth0 user object
          avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('User created:', response.data);
      alert('User created successfully!'); // Optionally alert the user
      navigate('/');
    } catch (err) {
      console.error('Error creating user:', err.response ? err.response.data : err.message);
      setError('Error creating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
    <div className =" bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Your Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Email:
            <input
              type="email"
              value={email} // Display email from Auth0
              readOnly // Make it read-only as it's fetched from Auth0
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Avatar URL:
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
              placeholder="Enter avatar URL"
            />
          </label>
        </div>
        <button type="submit" disabled={loading} className="w-full p-2 bg-secondary text-white rounded focus:outline">
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default UserCreationForm;
