import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
                    SmartBook
                </Link>
                <div className="flex gap-6 items-center">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `font-medium transition-colors ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/booking"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Book Now
                    </NavLink>
                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            `text-sm font-medium transition-colors ${isActive ? "text-indigo-600" : "text-gray-500 hover:text-indigo-600"}`
                        }
                    >
                        Admin
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
