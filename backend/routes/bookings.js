const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Booking = require('../models/Booking');

// Utility to get week number of the year to determine Week 1 or Week 2
// For this assessment, let's assume even weeks are "Week 1" and odd weeks are "Week 2"
function getWeekType(dateString) {
    const date = new Date(dateString);
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);
    return weekNumber % 2 === 0 ? 'week1' : 'week2';
}


router.post('/', auth, async (req, res) => {
    const { date, seatNumber } = req.body;
    const batch = req.user.batch;

    try {
        const bookingDate = new Date(date);
        const dayOfWeek = bookingDate.getDay(); 

        
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return res.status(400).json({ msg: 'Cannot book on weekends' });
        }

        const weekType = getWeekType(date);
        let isAllowed = false;

        if (batch === 1) {
            
            if (weekType === 'week1' && dayOfWeek >= 1 && dayOfWeek <= 3) isAllowed = true;
            if (weekType === 'week2' && dayOfWeek >= 2 && dayOfWeek <= 5) isAllowed = true;

            if (seatNumber < 1 || seatNumber > 10) {
                return res.status(400).json({ msg: 'Batch 1 can only book seats 1-10' });
            }
        } else if (batch === 2) {
           
            if (weekType === 'week1' && dayOfWeek >= 2 && dayOfWeek <= 5) isAllowed = true;
            if (weekType === 'week2' && dayOfWeek >= 1 && dayOfWeek <= 3) isAllowed = true;

            if (seatNumber < 11 || seatNumber > 50) {
                return res.status(400).json({ msg: 'Batch 2 can only book seats 11-50' });
            }
        }

        if (!isAllowed) {
            return res.status(400).json({ msg: `Batch ${batch} is not allowed to book on this date (${weekType}, Day: ${dayOfWeek})` });
        }

        
        const existingUserBooking = await Booking.findOne({ date, user: req.user.id });
        if (existingUserBooking) {
            return res.status(400).json({ msg: 'You have already booked a seat for this date' });
        }

        const existingSeatBooking = await Booking.findOne({ date, seatNumber });
        if (existingSeatBooking) {
            return res.status(400).json({ msg: 'Seat is already taken for this date' });
        }

        const newBooking = new Booking({
            user: req.user.id,
            date,
            seatNumber,
            batch
        });

        const booking = await newBooking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/:date', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ date: req.params.date }).populate('user', ['name', 'squad', 'batch']);
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/user/my', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id });
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
