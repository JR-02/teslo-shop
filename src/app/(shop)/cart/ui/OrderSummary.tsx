'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
      <h2 className='text-2xl mb-2'>Resumen de orden</h2>

      <div className='grid grid-cols-2'>
        {/* Number products */}
        <span>No. Productos</span>
        <span className='text-right'>
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>

        {/* Subtotal */}
        <span>Subtotal</span>
        <span className='text-right'>{currencyFormat(subTotal)}</span>

        {/* Impuestos */}
        <span>Impuestos (15%)</span>
        <span className='text-right'>{currencyFormat(tax)}</span>

        {/* Total */}
        <span className='mt-5 text-2xl'>Total:</span>
        <span className='mt-5 text-2xl text-right'>
          {currencyFormat(total)}
        </span>
      </div>

      <div className='mt-5 mb-2 w-full'>
        <Link
          className='flex btn-primary justify-center items-center'
          href={'/checkout/address'}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
