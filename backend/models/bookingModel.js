const { pool } = require("../config/db");

// Inserts a new booking row and returns the inserted booking id.
const createBooking = async ({ name, email, phone, service, date, time }) => {
    const sql = `
        INSERT INTO bookings (name, email, phone, service, date, time)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [name, email, phone, service, date, time]);
    return result.insertId;
};

// Returns all bookings (latest first for admin dashboard).
const getBookings = async () => {
    const sql = `
        SELECT id, name, email, phone, service, date, time, created_at
        FROM bookings
        ORDER BY created_at DESC
    `;

    const [rows] = await pool.execute(sql);
    return rows;
};

// Checks whether a specific date + time slot is already booked.
const checkSlotExists = async (date, time) => {
    const sql = `
        SELECT id
        FROM bookings
        WHERE date = ? AND time = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [date, time]);
    return rows.length > 0;
};

// Deletes one booking by id and returns true when a row was removed.
const deleteBooking = async (id) => {
    const sql = "DELETE FROM bookings WHERE id = ?";
    const [result] = await pool.execute(sql, [id]);
    return result.affectedRows > 0;
};

module.exports = {
    createBooking,
    getBookings,
    checkSlotExists,
    deleteBooking,
};
