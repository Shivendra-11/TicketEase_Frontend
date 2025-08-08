import { motion } from 'framer-motion';
import { fadeInUp, listContainer, listItem, scaleIn } from '../utils/motion';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BASE_URL } from '../utils/constant';

function Tickets() {
  const location = useLocation();
  const searchParams = location.state?.searchParams || {};
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    classType: 'all',
    time: 'all',
    gender: 'all',
  });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${BASE_URL}/api/v1/tickets/all`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.status === 401) {
          setRedirecting(true);
          setTimeout(() => navigate('/login'), 1500);
          return;
        }
        const data = await res.json();
        if (data.success) {
          setTickets(data.data);
        } else {
          setError(data.message || 'Failed to fetch tickets');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [location.state, navigate]);

  // Filtering logic (update as needed for your UI)
  let filteredTickets = tickets.filter(ticket => {
    const price = parseFloat(ticket.price);
    const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
    const matchesClass = filters.classType === 'all' || ticket.class === filters.classType;
    const matchesGender = filters.gender === 'all' || ticket.gender === filters.gender;
    // Time filter can be expanded as needed
    let matchesSearch = true;
    if (searchParams.from) {
      matchesSearch = matchesSearch && ticket.departure?.toLowerCase().includes(searchParams.from.toLowerCase());
    }
    if (searchParams.to) {
      matchesSearch = matchesSearch && ticket.destination?.toLowerCase().includes(searchParams.to.toLowerCase());
    }
    if (searchParams.date) {
      // Compare only the date part (ignore time)
      const ticketDate = new Date(ticket.date).toISOString().split('T')[0];
      matchesSearch = matchesSearch && ticketDate === searchParams.date;
    }
    return matchesPrice && matchesClass && matchesGender && matchesSearch;
  });

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setSelectedTicket(null);
  };

  const openDetails = (ticket) => {
    setSelectedTicket(ticket);
    setIsDetailsOpen(true);
  };

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {redirecting && (
        <div className="text-center text-lg text-primary-600 mb-4">Redirecting to login...</div>
      )}
      <div className="flex justify-end mb-4">
        {localStorage.getItem('token') && (
          <button
            className="btn-primary"
            onClick={() => navigate('/create-ticket')}
          >
            Create Ticket
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <div className="card sticky top-4">
            <h3 className="text-xl font-semibold mb-6">Filters</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: [0, parseInt(e.target.value)]
                  })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Class Type</h4>
                <select
                  value={filters.classType}
                  onChange={(e) => setFilters({
                    ...filters,
                    classType: e.target.value
                  })}
                  className="input-field"
                >
                  <option value="all">All Classes</option>
                  <option value="economy">Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium mb-2">Time</h4>
                <select
                  value={filters.time}
                  onChange={(e) => setFilters({
                    ...filters,
                    time: e.target.value
                  })}
                  className="input-field"
                >
                  <option value="all">Any Time</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium mb-2">Gender</h4>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters({
                    ...filters,
                    gender: e.target.value
                  })}
                  className="input-field"
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="md:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Available Tickets
              <span className="text-sm font-normal text-gray-600 ml-2">
                {loading ? 'Loading...' : `${filteredTickets.length} results found`}
              </span>
            </h2>
          </div>

          {error && (
            <div className="text-red-600 mb-4">
              {error === "Authentication failed. Login required"
                ? "Failed to load tickets. Please try again later."
                : error}
            </div>
          )}
          <motion.div variants={listContainer} initial="hidden" animate="show" className="space-y-4">
            {loading ? (
              <div>Loading tickets...</div>
            ) : filteredTickets.length === 0 ? (
              <div className="text-center space-y-4">
                <div>No tickets found for your search.</div>
                <button
                  className="btn-primary"
                  onClick={() => navigate('/tickets', { state: {} })}
                >
                  Explore All Tickets
                </button>
              </div>
            ) : filteredTickets.map((ticket) => (
              <motion.div
                key={ticket._id}
                variants={listItem}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">
                        {ticket.departure} → {ticket.destination}
                      </h3>
                      <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded">
                        {ticket.class}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(ticket.date).toLocaleDateString()} at {ticket.time}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Seller: {ticket.name}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      ${ticket.price}
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openDetails(ticket)}
                        className="px-4 py-2 text-sm border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Ticket Details Modal */}
      <Transition appear show={isDetailsOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeDetails}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6"
                    >
                      Ticket Details
                    </Dialog.Title>
                    <button
                      onClick={closeDetails}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {selectedTicket && (
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <img
                          src={selectedTicket.ticketScreenshot || 'https://via.placeholder.com/150'}
                          alt="Ticket Screenshot"
                          className="w-40 h-40 object-cover rounded-lg border"
                        />
                        <div className="flex-1 space-y-2">
                          <div><span className="font-semibold">Name:</span> {selectedTicket.name}</div>
                          <div><span className="font-semibold">Email:</span> {selectedTicket.email}</div>
                          <div><span className="font-semibold">Phone:</span> {selectedTicket.phone}</div>
                          <div><span className="font-semibold">Gender:</span> {selectedTicket.gender}</div>
                          <div><span className="font-semibold">Age:</span> {selectedTicket.age}</div>
                          <div><span className="font-semibold">Departure:</span> {selectedTicket.departure}</div>
                          <div><span className="font-semibold">Destination:</span> {selectedTicket.destination}</div>
                          <div><span className="font-semibold">Date:</span> {new Date(selectedTicket.date).toLocaleDateString()}</div>
                          <div><span className="font-semibold">Time:</span> {selectedTicket.time}</div>
                          <div><span className="font-semibold">Seat:</span> {selectedTicket.seat}</div>
                          <div><span className="font-semibold">Class:</span> {selectedTicket.class}</div>
                          <div><span className="font-semibold">Price:</span> ${selectedTicket.price}</div>
                          <div><span className="font-semibold">WhatsApp:</span> {selectedTicket.whatappno}</div>
                          <div><span className="font-semibold">Instagram:</span> <a href={selectedTicket.instalink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{selectedTicket.instalink}</a></div>
                          <div><span className="font-semibold">Facebook:</span> <a href={selectedTicket.facebooklink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{selectedTicket.facebooklink}</a></div>
                        </div>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </motion.div>
  );
}

export default Tickets;