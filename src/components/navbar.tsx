import { useProductContext } from "../contexts/ProductContext";
import { useUserContext } from "../contexts/UserContext";
import { useCartContext } from "../contexts/CartContext";

function Navbar({ isOpen, toggleSidebar }) {
    const { cart } = useCartContext();
    const { user } = useUserContext();
    const { searchString, setSearchString, categories, selectedCategory, setSelectedCategory } = useProductContext();


    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="p-4 flex items-center w-full h-16 bg-slate-200 sticky top-0">
            <h2 className="text-2xl font-semibold mr-auto">
                ECA-EZ
            </h2>
            <div className="flex items-center bg-white rounded-md relative w-1/2 mr-auto ml-auto">
                <div className="relative flex w-full">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchString ? searchString : ""}
                        onChange={(e) => setSearchString(e.target.value)}
                        className="px-2 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 w-full mr-1"
                    />
                    <select
                        value={selectedCategory ? selectedCategory : ""}
                        onChange={handleCategoryChange}
                        className="text-blue-500 hover:text-blue-700 bg-white py-2 px-4 rounded-md"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex items-center ml-auto">
                <h2 className="text-lg font-semibold">
                    Welcome Back! {user.name.firstname.toUpperCase()}
                </h2>
                <button
                    className="navbar-button bg-blue-500 text-white px-2 py-1 rounded-md ml-4"
                    onClick={toggleSidebar}
                >
                    {isOpen ? "⏵" : "☰"}
                </button>
                {!isOpen && cart.products.length > 0 && (
                    <div className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.products.length}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
