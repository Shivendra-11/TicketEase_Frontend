import { motion } from 'framer-motion';
import { scaleIn, listContainer, listItem, fadeInUp } from '../utils/motion';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/constant';

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    const fetchMyTickets = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/api/v1/user/tickets`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setTickets(data.data);
        } else {
          setError(data.message || 'Failed to fetch your tickets');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchMyTickets();
  }, []);

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleDelete = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/v1/remove/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Ticket deleted successfully!');
        setTickets(tickets.filter(ticket => ticket._id !== ticketId));
      } else {
        toast.error(data.message || 'Failed to delete ticket');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/v1/update/tickets/${editingTicket._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingTicket),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Ticket updated successfully!');
        setTickets(tickets.map(ticket => ticket._id === editingTicket._id ? data.data : ticket));
        setEditingTicket(null);
      } else {
        toast.error(data.message || 'Failed to update ticket');
      }
    } catch (err) {
      toast.error('Network error');
    }
  };

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Tickets</h2>
        <button 
          onClick={() => window.location.href = '/create-ticket'} 
          className="btn-primary"
        >
          Create New Ticket
        </button>
      </div>
      
      {loading ? (
        <div>Loading your tickets...</div>
      ) : error ? (
        <div className="text-red-600 mb-4">{error}</div>
      ) : editingTicket ? (
        <motion.div variants={fadeInUp} initial="hidden" animate="show" className="card p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Edit Ticket</h3>
          <input
            type="text"
            value={editingTicket.departure}
            onChange={(e) => setEditingTicket({ ...editingTicket, departure: e.target.value })}
            className="input-field mb-2"
          />
          <input
            type="text"
            value={editingTicket.destination}
            onChange={(e) => setEditingTicket({ ...editingTicket, destination: e.target.value })}
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
        </motion.div>
      ) : (
        <motion.div variants={listContainer} initial="hidden" animate="show" className="space-y-4">
          {tickets.length === 0 ? (
            <div>No tickets found.</div>
          ) : (
            tickets.map((ticket) => (
              <motion.div
                key={ticket._id}
                variants={listItem}
                className="card flex flex-col md:flex-row justify-between items-start md:items-center"
              >
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
                    onClick={() => handleDelete(ticket._id)}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default MyTickets;
