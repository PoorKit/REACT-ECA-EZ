import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchProducts } from '../services/api';
import { Product } from '../interfaces/ProductInterface';

type ProductContextValue = {
    products: Product[];
    setProducts: (products: Product[]) => void;
    // page: number;
    // limit: number;
    // changePage: (newPage: number) => void;
};

// Create the ProductContext
const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductContext Provider');
    }
    return context;
};

type ProductContextProviderProps = {
    children: ReactNode;
};

// Create the ProductContextProvider
export const ProductContextProvider: React.FC<ProductContextProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const contextValue = { products, setProducts };

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
};