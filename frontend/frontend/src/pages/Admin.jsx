import { useEffect, useState } from "react";
import BookingTable from "../components/BookingTable";

const Admin = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "https://appointment-booking-demo.onrender.com"}/api/bookings`);
            const data = await res.json();
            setBookings(data.data || []);
        } catch {
            alert("Failed to load bookings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBookings(); }, []);

    const filtered = bookings.filter(
        (b) =>
            b.name.toLowerCase().includes(search.toLowerCase()) ||
            b.email.toLowerCase().includes(search.toLowerCase()) ||
            b.service.toLowerCase().includes(search.toLowerCase())
    );

    const confirmed = bookings.filter((b) => b.status === "confirmed").length;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-1">
                            {confirmed} confirmed · {bookings.length} total
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Search by name, email, service..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                        />
                        <button
                            onClick={fetchBookings}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Bookings", value: bookings.length, color: "text-indigo-600" },
                        { label: "Confirmed", value: confirmed, color: "text-green-600" },
                        { label: "Showing", value: filtered.length, color: "text-blue-600" },
                    ].map((s) => (
                        <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
                            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-lg">Loading bookings...</p>
                    </div>
                ) : (
                    <BookingTable bookings={filtered} onRefresh={fetchBookings} />
                )}
            </div>
        </div>
    );
};

export default Admin;
