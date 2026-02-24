import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [bookings, setBookings] = useState([]);
    const [myBookings, setMyBookings] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (date) {
            fetchBookings();
            fetchMyBookings();
        }
    }, [date]);

    const fetchBookings = async () => {
        try {
            const res = await api.get(`/bookings/${date}`);
            setBookings(res.data);
            setError('');
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMyBookings = async () => {
        try {
            const res = await api.get('/bookings/user/my');
            setMyBookings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const requestBooking = async (seatNumber) => {
        try {
            await api.post('/bookings', { date, seatNumber });
            fetchBookings();
            fetchMyBookings();
            alert('Seat booked successfully!');
        } catch (err) {
            setError(err.response?.data?.msg || 'Error booking seat');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    // Determine seat range based on batch
    const seatRange = user?.batch === 1 ? [1, 10] : [11, 50];
    const seats = Array.from({ length: 50 }, (_, i) => i + 1);

    return (
        <div className="dashboard">
            <header>
                <h1>Seat Booking Dashboard</h1>
                <div>
                    <span>{user?.name} (Batch {user?.batch}, Squad {user?.squad})</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </header>

            <main>
                <div className="controls">
                    <label>Select Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    {error && <p className="error">{error}</p>}
                </div>

                <div className="seat-map-container">
                    <h3>Seat Map (Selected Date: {date})</h3>
                    <p className="info">You can only book seats {seatRange[0]} to {seatRange[1]}.</p>
                    <div className="seat-grid">
                        {seats.map(seat => {
                            const isBooked = bookings.find(b => b.seatNumber === seat);
                            const isMyBooking = myBookings.find(b => b.date === date && b.seatNumber === seat);
                            const isAllowed = seat >= seatRange[0] && seat <= seatRange[1];

                            let className = 'seat ';
                            if (isMyBooking) className += 'booked-by-me';
                            else if (isBooked) className += 'booked';
                            else if (!isAllowed) className += 'not-allowed';
                            else className += 'available';

                            return (
                                <button
                                    key={seat}
                                    className={className}
                                    disabled={!isAllowed || isBooked}
                                    onClick={() => requestBooking(seat)}
                                >
                                    {seat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="my-bookings">
                    <h3>My Bookings</h3>
                    <ul>
                        {myBookings.map(b => (
                            <li key={b._id}>Date: {b.date} | Seat: {b.seatNumber}</li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
