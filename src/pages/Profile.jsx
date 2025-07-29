import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL.replace(/\s+$/, '')}/api/v1/profile/get`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setUserData(data.data);
        } else {
          setError(data.message || 'Failed to fetch profile');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [successMsg]);

  // Handle edit button
  const handleEdit = () => {
    setEditData({
      name: userData.name || '',
      phone: userData.phone || '',
      gender: userData.gender || '',
      profileImage: userData.profileImage || '',
    });
    setEditMode(true);
    setSuccessMsg('');
    setError('');
  };

  // Handle edit form change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle edit form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL.replace(/\s+$/, '')}/api/v1/profile/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Profile updated successfully!');
        setEditMode(false);
        setUserData(data.data);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-8">Loading profile...</div>;
  if (error) return <div className="max-w-6xl mx-auto px-4 py-8 text-red-600">{error}</div>;
  if (!userData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="card">
          <div className="flex flex-col items-center">
            <img
              src={userData.profileImage && userData.profileImage.trim() !== '' ? userData.profileImage : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
            <p className="text-gray-600 dark:text-gray-400">Phone: {userData.phone || 'N/A'}</p>
            <p className="text-gray-600 dark:text-gray-400">Gender: {userData.gender || 'N/A'}</p>
            <p className="text-sm text-gray-500 mt-2">
              Member since {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>

          <div className="mt-6 space-y-2 w-full">
            <button className="btn-primary w-full" onClick={handleEdit}>Edit Profile</button>
          </div>

          {/* Edit Profile Modal */}
          {editMode && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-2 shadow-lg relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  onClick={() => setEditMode(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="input-field w-full"
                      value={editData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="input-field w-full"
                      value={editData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                      name="gender"
                      className="input-field w-full"
                      value={editData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Profile Photo URL</label>
                    <input
                      type="text"
                      name="profileImage"
                      className="input-field w-full"
                      value={editData.profileImage}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">Save Changes</button>
                  {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}
                  {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="md:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/create-ticket" className="card bg-primary-50 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 dark:bg-gray-600 rounded-lg">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Create Ticket</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">List a new ticket for sale</p>
                  </div>
                </div>
              </Link>

              <Link to="/my-tickets" className="card bg-primary-50 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 dark:bg-gray-600 rounded-lg">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">My Tickets</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View and manage your tickets</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Activity Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Tickets Sold</h4>
                  <span className="text-2xl font-bold text-green-600">{userData.ticketsSold || 0}</span>
                </div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Tickets Bought</h4>
                  <span className="text-2xl font-bold text-blue-600">{userData.ticketsBought || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;