'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ProductImage, QuantitySelector } from '@/components';
import { useCartStore } from '@/store';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className='flex mb-5'>
          <ProductImage
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            className='mr-5 rounded w-[100px] h-[100px]'
          />

          <div>
            <Link
              href={`/product/${product.slug}`}
              className='hover:underline cursor-pointer'
            >
              <p className='line-clamp-1'>
                {product.size} - {product.title}
              </p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              onClick={() => removeProduct(product)}
              className='underline mt-3'
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
