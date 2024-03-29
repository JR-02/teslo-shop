'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
    }

    clearCart();

    router.replace(`/orders/${resp.order!.id}`);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
      {/* Address info */}
      <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
      <div className='mb-10'>
        <p className='text-xl'>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <hr className='w-full h-0.5 rounded bg-gray-200 mb-10' />

      {/* Order resumen */}
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
        {/* Disclaimer */}
        <p className='mb-5'>
          <span className='text-xs'>
            Al hacer clic en &quot;Colocar orden&quot;,aceptas nuestros{' '}
            <a href={'/'} className='underline'>
              términos y condiciones
            </a>{' '}
            y{' '}
            <a href={'/'} className='underline'>
              política de privacidad
            </a>
          </span>
        </p>

        <p className='text-red-500 mb-5'>{errorMessage}</p>

        <button
          className={clsx({
            'flex btn-primary justify-center items-center': !isPlacingOrder,
            'flex btn-disabled justify-center items-center': isPlacingOrder,
          })}
          disabled={isPlacingOrder}
          onClick={onPlaceOrder}
          // href={'/orders/123'}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
