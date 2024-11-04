import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const UserCreationForm = () => {
  const { user, getAccessTokenSilently, isLoading } = useAuth0();
  const navigate = useNavigate();

  // Initialize states after checking if user is defined
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(user ? user.picture : '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserFromBackend = async (user) => {
    const token = await getAccessTokenSilently({
      audience: 'http://localhost',
      scope: 'openid profile email',
    });
    const existUser = await axios.get(`http://localhost:3000/api/v1/users/${user.sub}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(existUser.data);
    if (existUser.data) {
      // alert("User already exists");
      navigate('/profile');
      return;
    }
  }
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      fetchUserFromBackend(user);
    }
  }, [user]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently({
        audience: 'http://localhost',
        scope: 'openid profile email',
      });

      const response = await axios.post(
        'http://localhost:3000/api/v1/users',
        { name, email, avatar },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('User created:', response.data);
      alert('User created successfully!');
      navigate('/');
    }
    catch (err) {
      console.error('Error creating user:', err.response ? err.response.data : err.message);
      setError('Error creating user. Please try again.');
    }
    finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    user && (
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Your Profile</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
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
                  value={email}
                  readOnly
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
    )
  );
};

export default UserCreationForm;
