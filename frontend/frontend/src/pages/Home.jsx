import { Link } from "react-router-dom";

const FEATURES = [
    { icon: "📅", title: "Easy Scheduling", desc: "Pick your preferred date and time slot in seconds." },
    { icon: "✅", title: "Instant Confirmation", desc: "Receive immediate booking confirmation on screen." },
    { icon: "🔒", title: "No Double Bookings", desc: "Real-time slot locking prevents overlapping appointments." },
];

const BUSINESSES = ["Salons", "Clinics", "Gyms", "Tutors", "Restaurants", "Spas"];

const Home = () => {
    return (
        <div>
            {/* Hero */}
            <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
                        Professional Booking Platform
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Book Appointments<br />
                        <span className="text-indigo-200">Effortlessly</span>
                    </h1>
                    <p className="text-indigo-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        Designed for salons, clinics, gyms, tutors and restaurants.
                        Manage appointments with a clean, real-time booking system.
                    </p>
                    <Link
                        to="/booking"
                        className="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-lg"
                    >
                        Book an Appointment →
                    </Link>
                    {/* Business tags */}
                    <div className="flex flex-wrap justify-center gap-2 mt-10">
                        {BUSINESSES.map((b) => (
                            <span key={b} className="bg-white/10 text-white text-sm px-3 py-1 rounded-full">{b}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why choose SmartBook?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FEATURES.map((f) => (
                            <div key={f.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{f.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-white text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to get started?</h2>
                <p className="text-gray-500 mb-8">Join businesses already using SmartBook to manage their appointments.</p>
                <Link
                    to="/booking"
                    className="inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    Book Now — It&apos;s Free
                </Link>
            </section>
        </div>
    );
};

export default Home;