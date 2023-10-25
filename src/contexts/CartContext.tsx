import { createContext, useContext, useState, ReactNode } from 'react';
import { CartProduct, Cart } from '../interfaces/CartInterface';
import { Product } from '../interfaces/ProductInterface';

import { useUserContext } from './UserContext';

type CartContextValue = {
    cart: Cart;
    setCart: (cart: Cart) => void;
    addToCart: (product: Product, quantity: number) => boolean;
    removeFromCart: (productId: number) => boolean;
    clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartContext Provider');
    }
    return context;
};

type CartContextProviderProps = {
    children: ReactNode;
};

export const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {
    const { user } = useUserContext();
    const [cart, setCart] = useState<Cart>({
        userId: user.id,
        date: new Date(),
        products: [],
    });

    function addToCart(product: Product, quantity: number) {
        // Check if the product is already in the cart
        const existingProductIndex = cart.products.findIndex((cartProduct) => cartProduct.productId === product.id);

        if (existingProductIndex !== -1) {
            // Product is already in the cart, update the quantity
            const updatedProducts = [...cart.products];
            updatedProducts[existingProductIndex].quantity += quantity;
            setCart({ ...cart, products: updatedProducts });
        } else {
            // Product is not in the cart, add it as a new CartProduct
            const cartProduct: CartProduct = {
                productId: product.id,
                quantity: quantity,
            };

            // Create a copy of the existing cart's products array and add the new CartProduct
            const updatedProducts = [...cart.products];
            updatedProducts.push(cartProduct);

            // Update the cart state with the updated products array
            setCart({ ...cart, products: updatedProducts });
        }
        return true;
    }

    function removeFromCart(productId: number) {
        // Find the index of the product to be removed
        const productIndex = cart.products.findIndex((cartProduct) => cartProduct.productId === productId);

        if (productIndex !== -1) {
            // Product found, remove it from the cart
            const updatedProducts = [...cart.products];
            updatedProducts.splice(productIndex, 1);
            setCart({ ...cart, products: updatedProducts });
            return true;
        }

        return false; // Product not found in the cart
    }

    function clearCart(){
        setCart({...cart, products: []})
    }

    const contextValue = { cart, setCart, addToCart, removeFromCart, clearCart };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
