import { useState, useEffect } from 'react';
import { useProductContext } from '../contexts/ProductContext';
import ProductItem from './productitem';
import { fetchProducts } from '../services/api';

export const ProductList = () => {

    const { products, setProducts } = useProductContext();

    useEffect(() => {
        fetchProducts().then((products) => {
            setProducts(products);
        });
    },[])

    return (
        <div className='p-4 bg-slate-300 h-[100%]'>
            <ul className='grid grid-cols-5 gap-4'>
            {
                products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))
            }
            </ul>
        </div>
    )

}
