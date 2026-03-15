import BookingForm from "../components/BookingForm";

const Booking = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Book an Appointment</h1>
                    <p className="text-gray-500 mt-2">Fill in the form below and choose your preferred time slot.</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <BookingForm />
                </div>
            </div>
        </div>
    );
};

export default Booking;
