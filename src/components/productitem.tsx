import { Product } from '../interfaces/ProductInterface';
import { useState, useRef, useEffect } from 'react';

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState<number | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      // Get the computed height of the description element
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

  return (
    <li className="product-item bg-white rounded p-4 flex-grow flex flex-col">
      <img src={product.image} alt={product.title} className="aspect-square object-contain" />
      <h2>{product.title}</h2>
      <p
        ref={descriptionRef}
        className={`description ${expanded || (descriptionHeight && descriptionHeight < 80) ? '' : 'line-clamp-4'}`}
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
        <button className="bg-indigo-400 text-white px-2 py-1 rounded">Add to Cart</button>
      </div>
    </li>
  );
};

export default ProductItem;
