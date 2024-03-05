'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

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
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className='mr-5 rounded w-[100px] h-[100px]'
          />

          <div>
            <span>
              <p className='line-clamp-1'>
                {product.size} - {product.title} ({product.quantity})
              </p>
            </span>

            <p className='font-bold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
