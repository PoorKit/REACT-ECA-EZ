import { useUserContext } from "../contexts/UserContext";

function Navbar({ isOpen, toggleSidebar }) {
    const { user } = useUserContext();
    return (
        <div className="p-4 flex items-center w-full h-16 bg-slate-200 sticky top-0">
            <button
                className="navbar-button bg-blue-500 text-white px-2 py-1 rounded-md"
                onClick={toggleSidebar}
            >
                {isOpen ? "⏴" : "☰"}
            </button>
            <div className="ml-4">
                <h2 className="text-2xl font-semibold">
                    Welcome Back! {user.name.firstname.toUpperCase()}
                </h2>
            </div>
        </div>
    );
}

export default Navbar;
