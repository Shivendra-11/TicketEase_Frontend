import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/constant';


function CreateTicket() {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'male',
    age: '30',
    departure: '',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    price: '100',
    seat: 'A1',
    class: 'economy',
    ticketScreenshot: 'https://example.com/default-screenshot.jpg',
    whatappno: '9876543210',
    instalink: 'https://instagram.com/johndoe',
    facebooklink: 'https://facebook.com/johndoe',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Autofill user info
      fetch(`${BASE_URL.replace(/\s+$/, '')}/api/v1/profile/get`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setTicketData(prev => ({
              ...prev,
              name: data.data.name || prev.name,
              email: data.data.email || prev.email,
              phone: data.data.phone || prev.phone,
              gender: data.data.gender || prev.gender,
            }));
          }
        })
        .catch(() => {});
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/v1/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...ticketData,
          class: ticketData.class, // backend expects 'class'
        }),
      });
      const data = await res.json();
      if (res.status === 409) {
        toast.error(data.message || 'Duplicate ticket!');
        setLoading(false);
        return;
      }
      if (data.success) {
        toast.success('Ticket created successfully!');
        navigate('/tickets', { state: { refresh: true } });
      } else {
        toast.error(data.message || 'Failed to create ticket');
        setError(data.message || 'Failed to create ticket');
      }
    } catch (err) {
      toast.error('Network error');
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <ToastContainer />
      <div className="card">
        <h2 className="text-2xl font-bold text-center mb-6">Create New Ticket</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input type="text" id="name" className="input-field" value={ticketData.name} onChange={e => setTicketData({ ...ticketData, name: e.target.value })} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" className="input-field" value={ticketData.email} onChange={e => setTicketData({ ...ticketData, email: e.target.value })} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
              <input type="text" id="phone" className="input-field" value={ticketData.phone} onChange={e => setTicketData({ ...ticketData, phone: e.target.value })} />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-2">Gender</label>
              <input type="text" id="gender" className="input-field" value={ticketData.gender} onChange={e => setTicketData({ ...ticketData, gender: e.target.value })} />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-2">Age</label>
              <input type="text" id="age" className="input-field" value={ticketData.age} onChange={e => setTicketData({ ...ticketData, age: e.target.value })} />
            </div>
            <div>
              <label htmlFor="departure" className="block text-sm font-medium mb-2">Departure</label>
              <input type="text" id="departure" className="input-field" value={ticketData.departure} onChange={e => setTicketData({ ...ticketData, departure: e.target.value })} required />
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium mb-2">Destination</label>
              <input type="text" id="destination" className="input-field" value={ticketData.destination} onChange={e => setTicketData({ ...ticketData, destination: e.target.value })} required />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
              <input type="date" id="date" className="input-field" value={ticketData.date} onChange={e => setTicketData({ ...ticketData, date: e.target.value })} required />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
              <input type="time" id="time" className="input-field" value={ticketData.time} onChange={e => setTicketData({ ...ticketData, time: e.target.value })} required />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">Price ($)</label>
              <input type="number" id="price" className="input-field" value={ticketData.price} onChange={e => setTicketData({ ...ticketData, price: e.target.value })} min="0" step="0.01" required />
            </div>
            <div>
              <label htmlFor="seat" className="block text-sm font-medium mb-2">Seat</label>
              <input type="text" id="seat" className="input-field" value={ticketData.seat} onChange={e => setTicketData({ ...ticketData, seat: e.target.value })} required />
            </div>
            <div>
              <label htmlFor="class" className="block text-sm font-medium mb-2">Class</label>
              <select id="class" className="input-field" value={ticketData.class} onChange={e => setTicketData({ ...ticketData, class: e.target.value })} required>
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
            <div>
              <label htmlFor="ticketScreenshot" className="block text-sm font-medium mb-2">Ticket Screenshot URL</label>
              <input type="text" id="ticketScreenshot" className="input-field" value={ticketData.ticketScreenshot} onChange={e => setTicketData({ ...ticketData, ticketScreenshot: e.target.value })} />
            </div>
            <div>
              <label htmlFor="whatappno" className="block text-sm font-medium mb-2">WhatsApp No</label>
              <input type="text" id="whatappno" className="input-field" value={ticketData.whatappno} onChange={e => setTicketData({ ...ticketData, whatappno: e.target.value })} />
            </div>
            <div>
              <label htmlFor="instalink" className="block text-sm font-medium mb-2">Instagram Link</label>
              <input type="text" id="instalink" className="input-field" value={ticketData.instalink} onChange={e => setTicketData({ ...ticketData, instalink: e.target.value })} />
            </div>
            <div>
              <label htmlFor="facebooklink" className="block text-sm font-medium mb-2">Facebook Link</label>
              <input type="text" id="facebooklink" className="input-field" value={ticketData.facebooklink} onChange={e => setTicketData({ ...ticketData, facebooklink: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full mt-6" disabled={loading}>
            {loading ? 'Creating...' : 'Create Ticket'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default CreateTicket;