import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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

  // Sample tickets data - replace with actual data
  const tickets = [
    {
      id: 1,
      from: 'New York',
      to: 'London',
      date: '2024-03-15',
      time: '10:00',
      classType: 'Economy',
      price: 299,
      seller: 'Jane Smith',
      rating: 4.5,
      description: 'Direct flight with complimentary meals',
      amenities: ['Wi-Fi', 'Meal Service', 'Entertainment System'],
      refundable: true,
      availableSeats: 3,
      terminalInfo: 'Terminal 4',
      gateNumber: 'G7',
    },
    // Add more sample tickets...
  ];

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
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
                {tickets.length} results found
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {tickets.filter(ticket => filters.gender === 'all' || ticket.gender === filters.gender).map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">
                        {ticket.from} → {ticket.to}
                      </h3>
                      <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded">
                        {ticket.classType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(ticket.date).toLocaleDateString()} at {ticket.time}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Seller: {ticket.seller}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-yellow-500">★</span>
                        <span className="text-sm text-gray-600 ml-1">{ticket.rating}</span>
                      </div>
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
                      <button className="btn-primary">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-500">Route</h4>
                          <p className="text-lg font-semibold">{selectedTicket.from} → {selectedTicket.to}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Date & Time</h4>
                          <p className="text-lg">{new Date(selectedTicket.date).toLocaleDateString()} at {selectedTicket.time}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Class</h4>
                          <p className="text-lg">{selectedTicket.classType}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Price</h4>
                          <p className="text-lg font-bold text-primary-600">${selectedTicket.price}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-500 mb-2">Description</h4>
                        <p>{selectedTicket.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-500 mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTicket.amenities.map((amenity, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-500">Terminal</h4>
                          <p>{selectedTicket.terminalInfo}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Gate</h4>
                          <p>{selectedTicket.gateNumber}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Available Seats</h4>
                          <p>{selectedTicket.availableSeats}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-500">Refundable</h4>
                          <p>{selectedTicket.refundable ? 'Yes' : 'No'}</p>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <button className="btn-primary">
                          Book Now
                        </button>
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