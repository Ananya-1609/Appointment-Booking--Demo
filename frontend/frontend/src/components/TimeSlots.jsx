const SLOTS = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

const TimeSlots = ({ selectedTime, onChange, bookedSlots = [] }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time Slot
            </label>
            <div className="grid grid-cols-3 gap-2">
                {SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedTime === slot;
                    return (
                        <button
                            key={slot}
                            type="button"
                            disabled={isBooked}
                            onClick={() => !isBooked && onChange(slot)}
                            className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-all
                                ${isBooked
                                    ? "bg-red-50 text-red-400 border-red-200 cursor-not-allowed line-through"
                                    : isSelected
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                    : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 cursor-pointer"
                                }`}
                        >
                            {slot}
                        </button>
                    );
                })}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-green-100 border border-green-300"></span> Available</span>
                <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-red-100 border border-red-300"></span> Booked</span>
                <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-indigo-600"></span> Selected</span>
            </div>
        </div>
    );
};

export default TimeSlots;
