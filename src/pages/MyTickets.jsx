import { motion } from 'framer-motion';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function MyTickets() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      from: 'New York',
      to: 'London',
      date: '2024-03-15',
      time: '10:00',
      classType: 'Economy',
      price: 299,
    },
    {
      id: 2,
      from: 'Paris',
      to: 'Tokyo',
      date: '2024-03-20',
      time: '14:30',
      classType: 'Business',
      price: 899,
    },
  ]);

  const [editingTicket, setEditingTicket] = useState(null);

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleDelete = (ticketId) => {
    setTickets(tickets.filter(ticket => ticket.id !== ticketId));
  };

  const handleSave = () => {
    setTickets(tickets.map(ticket => ticket.id === editingTicket.id ? editingTicket : ticket));
    setEditingTicket(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Tickets</h2>
        <button 
          onClick={() => window.location.href = '/create-ticket'} 
          className="btn-primary"
        >
          Create New Ticket
        </button>
      </div>
      
      {editingTicket ? (
        <div className="card p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Edit Ticket</h3>
          <input
            type="text"
            value={editingTicket.from}
            onChange={(e) => setEditingTicket({ ...editingTicket, from: e.target.value })}
            className="input-field mb-2"
          />
          <input
            type="text"
            value={editingTicket.to}
            onChange={(e) => setEditingTicket({ ...editingTicket, to: e.target.value })}
            className="input-field mb-2"
          />
          <input
            type="date"
            value={editingTicket.date}
            onChange={(e) => setEditingTicket({ ...editingTicket, date: e.target.value })}
            className="input-field mb-2"
          />
          <input
            type="time"
            value={editingTicket.time}
            onChange={(e) => setEditingTicket({ ...editingTicket, time: e.target.value })}
            className="input-field mb-2"
          />
          <input
            type="number"
            value={editingTicket.price}
            onChange={(e) => setEditingTicket({ ...editingTicket, price: parseFloat(e.target.value) })}
            className="input-field mb-2"
          />
          <button onClick={handleSave} className="btn-primary">Save</button>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card flex flex-col md:flex-row justify-between items-start md:items-center"
            >
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
                <p className="text-lg font-bold text-primary-600 mt-2 md:mt-0">
                  ${ticket.price}
                </p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleEdit(ticket)}
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default MyTickets;
