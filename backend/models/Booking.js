const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, 
    seatNumber: { type: Number, required: true },
    batch: { type: Number, required: true }
});


bookingSchema.index({ date: 1, seatNumber: 1 }, { unique: true });
bookingSchema.index({ date: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
