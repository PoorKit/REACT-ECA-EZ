// CartListItem.tsx
import { CartProduct } from '../interfaces/CartInterface';
import { Product } from '../interfaces/ProductInterface';
import { useCartContext } from '../contexts/CartContext';

interface CartListItemProps {
    cartProduct: CartProduct;
    product: Product;
}

const CartListItem: React.FC<CartListItemProps> = ({ cartProduct, product }) => {
    const { removeFromCart } = useCartContext();

    const handleRemoveFromCart = () => {
        removeFromCart(cartProduct.productId);
    };

    const totalCost = product.price * cartProduct.quantity;

    return (
        <li key={cartProduct.productId} className="mb-2 flex items-start bg-stone-100 rounded-lg p-4 border-2 border-black w-full">
            <div className="mr-4">
                <img src={product.image} alt={product.title} className="w-32 h-32 aspect-square" />
            </div>
            <div className='flex flex-col w-full'>
                <div className="flex flex-grow justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                    </div>
                    <div>
                        <button
                            onClick={handleRemoveFromCart}
                            className="text-white hover:bg-red-300 w-8 h-8 bg-red-600 rounded-full"
                        >
                            X
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <p>{product.description}</p>
                        <div className='lg:w-1/3 md:2/3 s:w-1/2 ml-auto'>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-left font-bold">Quantity:</p>
                                <p className="text-left font-bold">Price per item:</p>
                                <p className="text-left font-bold">Total Cost:</p>
                            </div>
                            <div>
                                <p className="text-right">{cartProduct.quantity}</p>
                                <p className="text-right">${product.price}</p>
                                <p className="text-right">${totalCost}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartListItem;
