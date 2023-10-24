import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchProducts } from '../services/api';
import { Product } from '../interfaces/ProductInterface';

type ProductContextValue = {
    products: Product[];
    setProducts: (products: Product[]) => void;
    categories: string[];
    setCategories: (categories: string[]) => void;
    selectedCategory: string | null;
    setSelectedCategory: (selectedCategory: string | null) => void;
    searchString: string | null;
    setSearchString: (searchString: string | null) => void;
};

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

export const ProductContextProvider: React.FC<ProductContextProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchString, setSearchString] = useState<string | null>(null);


    const contextValue = { products, setProducts, categories, setCategories, searchString, setSearchString, selectedCategory, setSelectedCategory };

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
};