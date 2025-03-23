import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function CreateTicket() {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    classType: 'economy',
    price: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle ticket creation logic here
    console.log('Creating ticket:', ticketData);
    navigate('/my-tickets');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="card">
        <h2 className="text-2xl font-bold text-center mb-6">Create New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium mb-2">From</label>
              <input
                type="text"
                id="from"
                className="input-field"
                value={ticketData.from}
                onChange={(e) => setTicketData({ ...ticketData, from: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="to" className="block text-sm font-medium mb-2">To</label>
              <input
                type="text"
                id="to"
                className="input-field"
                value={ticketData.to}
                onChange={(e) => setTicketData({ ...ticketData, to: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                id="date"
                className="input-field"
                value={ticketData.date}
                onChange={(e) => setTicketData({ ...ticketData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
              <input
                type="time"
                id="time"
                className="input-field"
                value={ticketData.time}
                onChange={(e) => setTicketData({ ...ticketData, time: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="classType" className="block text-sm font-medium mb-2">Class Type</label>
              <select
                id="classType"
                className="input-field"
                value={ticketData.classType}
                onChange={(e) => setTicketData({ ...ticketData, classType: e.target.value })}
                required
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                id="price"
                className="input-field"
                value={ticketData.price}
                onChange={(e) => setTicketData({ ...ticketData, price: e.target.value })}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full mt-6">
            Create Ticket
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default CreateTicket;