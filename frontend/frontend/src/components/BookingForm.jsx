import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TimeSlots from "./TimeSlots";
import { createBooking, getBookingsByDate } from "../services/api";

const SERVICES = [
    "Haircut", "Facial", "Massage", "Yoga Class",
    "Dental Checkup", "Consultation", "Personal Training", "Tutoring",
];

const BookingForm = () => {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", service: "", date: "", time: "",
    });
    const [bookedSlots, setBookedSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmed, setConfirmed] = useState(null); // holds booking details after success

    // Fetch already-booked slots whenever the date changes
    useEffect(() => {
        if (!form.date) return;
        getBookingsByDate(form.date)
            .then((res) => setBookedSlots(res.data.data.map((b) => b.time)))
            .catch(() => {});
    }, [form.date]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
            // Reset time whenever date changes
            ...(name === "date" ? { time: "" } : {}),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.time) {
            setError("Please select a time slot.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            await createBooking(form);
            // Show inline confirmation card instead of navigating away
            setConfirmed({ service: form.service, date: form.date, time: form.time });
        } catch (err) {
            setError(err.response?.data?.message || "Booking failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    // ── Inline confirmation card (Step 5) ────────────────────────────────────
    if (confirmed) {
        const displayDate = new Date(confirmed.date + "T00:00:00").toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric",
        });
        return (
            <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="text-3xl">✅</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h2>
                <p className="text-gray-500 mb-6">Your booking has been received. See you soon!</p>

                <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 text-left max-w-xs mx-auto space-y-3 mb-8">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Service</span>
                        <span className="text-gray-800 font-semibold">{confirmed.service}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Date</span>
                        <span className="text-gray-800 font-semibold">{displayDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Time</span>
                        <span className="text-gray-800 font-semibold">{confirmed.time}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => {
                            setConfirmed(null);
                            setForm({ name: "", email: "", phone: "", service: "", date: "", time: "" });
                        }}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Book Another
                    </button>
                    <Link
                        to="/"
                        className="border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        name="name" type="text" required value={form.name}
                        onChange={handleChange} placeholder="John Doe"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        name="email" type="email" required value={form.email}
                        onChange={handleChange} placeholder="john@example.com"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>
                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        name="phone" type="tel" required value={form.phone}
                        onChange={handleChange} placeholder="+1 234 567 8900"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>
                {/* Service */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                    <select
                        name="service" required value={form.service} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white"
                    >
                        <option value="">Select a service</option>
                        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                {/* Date */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        name="date" type="date" required value={form.date}
                        min={today} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>
            </div>

            {/* Time slots — only shown after a date is selected */}
            {form.date && (
                <TimeSlots
                    selectedTime={form.time}
                    onChange={(time) => setForm((prev) => ({ ...prev, time }))}
                    bookedSlots={bookedSlots}
                />
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
                {loading ? "Booking..." : "Confirm Appointment"}
            </button>
        </form>
    );
};

export default BookingForm;
