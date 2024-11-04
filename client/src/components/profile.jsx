import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import placeholderAvatar from "../assets/avatar.png";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserFromBackend = async () => {
    try {
      if (user) {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`http://localhost:3000/api/v1/users/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("User fetched from backend:", response.data);
        const { name, email, avatar } = response.data.user;
        setName(name);
        setEmail(email);
        setAvatar(avatar || placeholderAvatar);
        // console.log(avatar);
      }
    } catch (err) {
      console.error("Error fetching user from backend:", err);
      setError("Failed to load profile from server.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserFromBackend();
    }
  }, [user, getAccessTokenSilently]);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently();
      await axios.patch(`http://localhost:3000/api/v1/users/${user.sub}`, {
        name, email, avatar
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    isAuthenticated && (
      <div className="w-full flex flex-col items-center">
        <div className="h-max w-1/2 bg-gray-200 rounded-xl flex flex-col m-auto p-4">
        {isEditing ? (
            <>
              <input
                type="text"
                className="p-2 mb-2 rounded border"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
              <input
                type="email"
                className="p-2 mb-2 rounded border"
                value={email}
                readOnly
              />
              <input
                type="url"
                className="p-2 mb-2 rounded border"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Enter avatar URL"
              />
              <button onClick={handleSave} disabled={loading} className="btn btn-primary mb-2">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button onClick={toggleEdit} className="btn btn-secondary">
                Cancel
              </button>
            </>
          ) : (
            <>
              <img className="w-1/3 h-2/3 m-auto" src={placeholderAvatar} alt={name} onError={(e) => (e.target.src = {placeholderAvatar})} />
              <h2 className="p-2 font-bold text-2xl">{name}</h2>
              <p className="p-2">{email}</p>
              <button onClick={toggleEdit} className="btn btn-primary">
                Edit Profile
              </button>
            </>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    )
  );
};

export default Profile;
