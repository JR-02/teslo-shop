// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link';
import Image from 'next/image';
// import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { currencyFormat } from '@/utils';
import { Title, Pagination, ProductImage } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  // if (!ok) {
  //   redirect('/auth/login');
  // }

  return (
    <>
      <Title title='Mantenimientos de productos' />

      <div className='flex justify-end mb-5'>
        <Link href={`/admin/product/new`} className='btn-primary'>
          Nuevo producto
        </Link>
      </div>

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Imagen
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Título
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Precio
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Género
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Inventario
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      alt={product.title}
                      width={80}
                      height={80}
                      className='w-20 h-20 object-cover rounded'
                    />
                  </Link>
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className='hover:underline'
                  >
                    {product.title}
                  </Link>
                </td>
                <td className=' text-sm text-gray-900 font-medium px-6'>
                  {currencyFormat(product.price)}
                </td>
                <td className='text-sm text-gray-900 font-light px-6'>
                  {product.gender}
                </td>
                <td className='text-sm text-gray-900 font-light px-6'>
                  {product.inStock}
                </td>
                <td className='text-sm text-gray-900 font-medium px-6'>
                  {product.sizes.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
