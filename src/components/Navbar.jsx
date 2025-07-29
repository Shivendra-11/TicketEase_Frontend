import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

function Navbar({ isAuthenticated, setIsAuthenticated, darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/api/v1/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1234/1234569.png"
              alt="Ticket Booking Icon"
              className="h-8 w-8"
            />
            <span className="text-2xl font-bold text-primary-600">TicketEase</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-primary-600 transition-colors">About</Link>
            <Link to="/tickets" className="hover:text-primary-600 transition-colors">View Tickets</Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 hover:text-primary-600 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <UserCircleIcon className="h-8 w-8" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/create-ticket"
                          className={`${
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block px-4 py-2 text-sm`}
                        >
                          Create Ticket
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/my-tickets"
                          className={`${
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block px-4 py-2 text-sm`}
                        >
                          My Tickets
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`${
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block px-4 py-2 text-sm`}
                        >
                          Profile Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary bg-gray-600 hover:bg-gray-700">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
