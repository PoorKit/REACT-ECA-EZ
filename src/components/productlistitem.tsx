import { Product } from '../interfaces/ProductInterface';
import { useState, useRef, useEffect } from 'react';
import ProductModal from './productmodal';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState<number | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      const height = parseFloat(getComputedStyle(descriptionRef.current).height);
      setDescriptionHeight(height);
    }
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleLess = () => {
    setExpanded(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <li className="product-item bg-white rounded p-4 flex-grow flex flex-col">
      <img src={product.image} alt={product.title} className="aspect-square object-contain" />
      <h2 className='text-xl font-bold'>{product.title}</h2>
      <p
        ref={descriptionRef}
        className={`description ${expanded || (descriptionHeight && descriptionHeight < 80) ? '' : 'line-clamp-4'} text-slate-500`}
      >
        {product.description}
      </p>
      {descriptionHeight && descriptionHeight >= 80 && !expanded && (
        <button className="text-indigo-600" onClick={toggleExpand}>
          See More
        </button>
      )}
      {expanded && (
        <button className="text-indigo-600" onClick={toggleLess}>
          See Less
        </button>
      )}
      <div className="flex-grow"></div>
      <div className="product-details mt-4 flex justify-between items-center">
        <span className="price font-bold text-lg">${product.price}</span>
        <button className="bg-indigo-400 text-white px-2 py-1 rounded" onClick={openModal}>
        Add to Cart
      </button>
      <ProductModal product={product} showModal={showModal} closeModal={closeModal} />
      </div>
    </li>
  );
};

export default ProductItem;
