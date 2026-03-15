import { Link } from "react-router-dom";

const Success = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">✅</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-3">Appointment Confirmed!</h1>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Your appointment has been booked successfully.<br />We&apos;ll see you soon!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/booking"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Book Another
                    </Link>
                    <Link
                        to="/"
                        className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
