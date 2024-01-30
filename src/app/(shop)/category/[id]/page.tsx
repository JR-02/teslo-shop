import { ProductGrid, Title } from '@/components';
import { Product } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import { Category } from '@/interfaces';

interface Props {
  params: {
    id: Category;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  const products = initialData.products.filter(
    (product: Product) => product.gender === id
  );

  const labels: Record<Category, string> = {
    men: 'hombres',
    women: 'mujeres',
    kid: 'niños',
    unisex: 'todos',
  };

  if (id !== 'men' && id !== 'women' && id !== 'kid') {
    notFound();
  }

  return (
    <>
      <Title
        title={`Artículos para ${labels[id]}`}
        subtitle='Todos los productos'
        className='mb-2'
      />
      <ProductGrid products={products} />
    </>
  );
}
