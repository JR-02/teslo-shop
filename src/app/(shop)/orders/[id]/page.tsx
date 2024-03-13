import Image from 'next/image';
import { redirect } from 'next/navigation';

import clsx from 'clsx';
import { OrderStatus, PayPalButton, Title } from '@/components';
import { IoCardOutline } from 'react-icons/io5';
import { getOrderById } from '@/actions';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersIdPage({ params }: Props) {
  const { id } = params;

  //TODO: verificar

  const { order, ok } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  const address = order!.OrderAddress;

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        {/* Title */}
        <Title title={`Orden #${id}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <OrderStatus isPaid={order!.isPaid} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div
                key={`${item.product.slug} - ${item.size}`}
                className='flex mb-5'
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  className='mr-5 rounded w-[100px] h-[100px]'
                />

                <div>
                  <p className='line-clamp-1'>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className='font-bold'>
                    Subtotal: {currencyFormat(item.price * item.quantity)}{' '}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            {/* Address info */}
            <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>
                {address?.firstName} {address?.lastName}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.postalCode}</p>
              <p>
                {address?.city}, {address?.countryId}
              </p>
              <p>{address?.phone}</p>
            </div>

            {/* Divider */}
            <hr className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            {/* Order resumen */}
            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              {/* Number products */}
              <span>No. Productos</span>
              <span className='text-right'>
                {order?.itemsInOrder === 1
                  ? '1 artículo'
                  : `${order?.itemsInOrder} artículos`}
              </span>

              {/* Subtotal */}
              <span>Subtotal</span>
              <span className='text-right'>
                {currencyFormat(order!.subTotal)}
              </span>

              {/* Impuestos */}
              <span>Impuestos (15%)</span>
              <span className='text-right'>{currencyFormat(order!.tax)}</span>

              {/* Total */}
              <span className='mt-5 text-2xl'>Total:</span>
              <span className='mt-5 text-2xl text-right'>
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              {order?.isPaid ? (
                <OrderStatus isPaid={order!.isPaid} />
              ) : (
                <PayPalButton orderId={order!.id} amount={order!.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
