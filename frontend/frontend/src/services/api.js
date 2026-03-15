import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const createBooking    = (data) => API.post("/bookings", data);
export const getBookings      = ()     => API.get("/bookings");
export const getBookingsByDate = (date) => API.get(`/bookings/${date}`);
export const deleteBooking    = (id)   => API.delete(`/bookings/${id}`);
