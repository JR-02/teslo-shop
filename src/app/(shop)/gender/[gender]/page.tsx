export const revalidate = 60; // 60 segundos

import { Pagination, ProductGrid, Title } from '@/components';
import { getPaginatedProductsWithImages } from '@/actions';
import { Gender } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: 'hombres',
    women: 'mujeres',
    kid: 'niños',
    unisex: 'todos',
  };

  if (gender !== 'men' && gender !== 'women' && gender !== 'kid') {
    notFound();
  }

  return (
    <>
      <Title
        title={`Artículos para ${labels[gender]}`}
        subtitle='Todos los productos'
        className='mb-2'
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
