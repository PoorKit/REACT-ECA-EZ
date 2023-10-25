import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-hot-toast';
import { useCartContext } from '../contexts/CartContext';

const ProductModal = ({ product, showModal, closeModal }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartContext();

    const handleAddToCart = () => {
        const success = addToCart(product, quantity);
        if (success) {
            handleSuccess();
        } else {
            handleFail();
        }
    };

    const handleSuccess = () => {
        toast.success('Added to Cart');
        closeModal();
    };

    const handleFail = () => {
        toast.error("Failed to add the product to the cart");
    };

    // Modal Limitations on Dynamic Sizing
    const customModalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '100%',
            height: '70%',
            maxHeight: '80%',
            border: 'none',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            overflowY: 'auto',
            background: 'white',
        },
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            style={customModalStyles}
            contentLabel="Example Modal"
        >
            <div className="flex justify-between min-h-fit">
                <div className="w-full sm:w-1/2 md:w-5/12 max-h-fit">
                    <img src={product.image} alt={product.title} className="aspect-square object-contain w-full" />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/2 p-4">
                    <h2 className="text-xl font-bold">{product.title}</h2>
                    <p className="text-slate-500">{product.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                        <span className="price font-bold text-lg">${product.price}</span>

                        <div className="flex items-center">
                            <label htmlFor="quantity" className="mr-2">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="w-16 text-center"
                            />
                        </div>

                        <button
                            onClick={() => handleAddToCart()}
                            className="bg-indigo-400 text-white px-2 py-1 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModal;
