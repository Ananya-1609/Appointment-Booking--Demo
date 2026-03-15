const bookingModel = require("../models/bookingModel");

// @desc    Create a booking (with double-booking prevention)
// @route   POST /api/bookings
const createBooking = async (req, res) => {
    try {
        const { name, email, phone, service, date, time } = req.body;

        if (!name || !email || !phone || !service || !date || !time) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const isBooked = await bookingModel.checkSlotExists(date, time);
        if (isBooked) {
            return res.status(409).json({ error: "Time slot already booked" });
        }

        const bookingId = await bookingModel.createBooking({
            name,
            email,
            phone,
            service,
            date,
            time,
        });

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: { id: bookingId },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error.message,
        });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.getBookings();
        return res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
            error: error.message,
        });
    }
};

// @desc    Delete booking by ID
// @route   DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await bookingModel.deleteBooking(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete booking",
            error: error.message,
        });
    }
};

module.exports = {
    createBooking,
    getBookings,
    deleteBooking,
};
