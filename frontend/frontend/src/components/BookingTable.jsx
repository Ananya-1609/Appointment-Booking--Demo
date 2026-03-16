const BookingTable = ({ bookings, onRefresh }) => {
    const cancelBooking = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "https://appointment-booking-demo.onrender.com"}/api/bookings/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                alert("Booking cancelled successfully");
                onRefresh();
            } else {
                alert("Cancel failed");
            }
        } catch (error) {
            alert("Failed to cancel booking. Please try again.");
        }
    };

    if (bookings.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400">
                <p className="text-5xl mb-4">📋</p>
                <p className="text-lg font-medium">No bookings found.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                    <tr>
                        {["Name", "Email", "Phone", "Service", "Date", "Time", "Status", "Action"].map((h) => (
                            <th
                                key={h}
                                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                    {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-indigo-50/30 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{b.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{b.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{b.phone}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{b.service}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{b.date}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{b.time}</td>
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                                        ${b.status === "confirmed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"}`}
                                >
                                    {b.status}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => cancelBooking(b.id)}
                                    className="text-xs bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingTable;
