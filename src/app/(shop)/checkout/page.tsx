import Image from 'next/image';
import Link from 'next/link';

import { Title } from '@/components';
import { initialData } from '@/seed/seed';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        {/* Title */}
        <Title title='Verificar orden' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Ajustar elementos</span>
            <Link href={'/cart'} className='underline mb-5'>
              Editar carrito
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className='flex mb-5'>
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className='mr-5 rounded w-[100px] h-[100px]'
                />

                <div>
                  <p className='line-clamp-1'>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className='font-bold'>Subtotal: ${product.price * 3} </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            {/* Address info */}
            <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>José Rojas</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldía Cuauhtémoc</p>
              <p>Ciudad de México</p>
              <p>CP 123123</p>
              <p>123.123.123</p>
            </div>

            {/* Divider */}
            <hr className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            {/* Order resumen */}
            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              {/* Number products */}
              <span>No. Productos</span>
              <span className='text-right'>3 artículos</span>

              {/* Subtotal */}
              <span>Subtotal</span>
              <span className='text-right'>$100</span>

              {/* Impuestos */}
              <span>Impuestos (15%)</span>
              <span className='text-right'>$100</span>

              {/* Total */}
              <span className='mt-5 text-2xl'>Total:</span>
              <span className='mt-5 text-2xl text-right'>$100</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              {/* Disclaimer */}
              <p className='mb-5'>
                <span className='text-xs'>
                  Al hacer clic en &quot;Colocar orden&quot;,aceptas nuestros{' '}
                  <Link href={'/'} className='underline'>
                    términos y condiciones
                  </Link>{' '}
                  y{' '}
                  <Link href={'/'} className='underline'>
                    política de privacidad
                  </Link>
                </span>
              </p>

              <Link
                className='flex btn-primary justify-center items-center'
                href={'/orders/123'}
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
