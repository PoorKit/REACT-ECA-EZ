import { useState, useEffect } from 'react';
import { useProductContext } from '../contexts/ProductContext';
import ProductItem from './productlistitem';
import { fetchProducts } from '../services/api';
import { Product } from '../interfaces/ProductInterface';

export const ProductList = () => {
    const { products, setProducts, setCategories, searchString, selectedCategory } = useProductContext();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(null); // Initialize as null

    useEffect(() => {
        fetchProducts().then((products) => {
            setProducts(products);
            const uniqueCategoriesSet = new Set<string>();
            products.forEach((product) => {
                uniqueCategoriesSet.add(product.category);
            });
            const uniqueCategories = Array.from(uniqueCategoriesSet);
            setCategories(uniqueCategories);
        }).catch((error) => {
            console.error('Error fetching products:', error);
        });
    }, []);

    useEffect(() => {
        // Filter products based on searchString and selectedCategory
        let filtered = products;
        if (searchString) {
            const search = searchString.toLowerCase();
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search)
            );
        }
        if (selectedCategory) {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }
        setFilteredProducts(filtered);
    }, [products, searchString, selectedCategory]);

    return (
        <div className={`${!filteredProducts || filteredProducts.length === 0 ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
            {filteredProducts && filteredProducts.length > 0 ? (
                <ul className='grid grid-cols-5 gap-4 pb-12'>
                    {filteredProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </ul>
            ) : (
                <div className="bg-gray-200 rounded-md p-4 text-center">
                    <p>No products match your criteria.</p>
                </div>
            )}
        </div>
    );
};
