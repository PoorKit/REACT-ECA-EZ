import toast from 'react-hot-toast';
import { useCartContext } from '../contexts/CartContext';
import { useProductContext } from '../contexts/ProductContext';
import { sendCart } from '../services/api';
import CartListItem from './cartlistitem'; // Make sure to import the correct component
import ActivityIndicator from './activityloader';
import { useState } from 'react';

interface CartProps { }

const CartList: React.FC<CartProps> = () => {
    const { cart, clearCart } = useCartContext();
    const { products } = useProductContext();
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    // Create a function to retrieve product details by ID
    const getProductById = (productId: number) => {
        return products.find((product) => product.id === productId);
    };

    // Function to calculate the total cost
    const calculateTotal = () => {
        let total = 0;
        cart.products.forEach((cartProduct) => {
            const product = getProductById(cartProduct.productId);
            if (product) {
                total += product.price * cartProduct.quantity;
            }
        });
        return total;
    };

    // Function to handle the checkout
    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const success = await sendCart(cart);
            if (success) {
                handleSuccess();
                clearCart();
            } else {
                handleFail();
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    };

    const handleSuccess = () => {
        toast.success('Checked Out');
    };

    const handleFail = () => {
        toast.error("Failed Server Communication");
    };

    return (
        <div className="p-4 w-full items-center flex flex-col h-screen bg-stone-300 rounded-2xl">
            <h1 className="text-2xl font-semibold mb-4">My Cart</h1>
            {cart.products.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <ul className='w-full'>
                    {cart.products.map((cartProduct) => {
                        const product = getProductById(cartProduct.productId);
                        if (product) {
                            return (
                                <CartListItem key={cartProduct.productId} cartProduct={cartProduct} product={product} />
                            );
                        }
                        return null;
                    })}
                </ul>
            )}
            <div className="flex flex-col ml-auto">
                <div className="grid grid-cols-2 gap-2">
                    <div className="text-left font-bold">Total Cost:</div>
                    <div className="text-xl font-semibold text-right">${calculateTotal()}</div>
                </div>
                <button
                    onClick={handleCheckout}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-64"
                >
                    {isLoading ? <ActivityIndicator isLoading={isLoading} text={"Loading..."} /> : "Checkout"}
                </button>
            </div>
        </div>
    );
};

export default CartList;
