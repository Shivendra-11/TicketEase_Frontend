import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024-01-01',
    ticketsSold: 5,
    ticketsBought: 3,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

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
              src={userData.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
            <p className="text-sm text-gray-500 mt-2">
              Member since {new Date(userData.joinDate).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <button className="btn-primary w-full">Edit Profile</button>
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
              Change Password
            </button>
          </div>
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
                  <span className="text-2xl font-bold text-green-600">{userData.ticketsSold}</span>
                </div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Tickets Bought</h4>
                  <span className="text-2xl font-bold text-blue-600">{userData.ticketsBought}</span>
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