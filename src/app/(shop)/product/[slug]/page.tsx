export const revalidate = 604800; // 7 días

import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

import { titleFont } from '@/config/fonts';
import { Product } from '@/interfaces';
import { getProductBySlug } from '@/actions';
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from '@/components';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product: Product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // images: ['/some-specific-page-image.jpg', ...previousImages],
      images: [`/products/${product.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product: Product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
      {/* Slideshow */}
      <div className='col-span-1 md:col-span-2'>
        {/* Desktop Slideshow */}
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className='hidden md:block'
        />

        {/* Mobile Slideshow */}
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          className='block md:hidden'
        />
      </div>

      {/* Details */}
      <div className='col-span-1 px-5'>
        {/* InStock */}
        <StockLabel slug={product.slug} />

        {/* Title */}
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        {/* Price */}
        <p className='text-lg mb-5'>${product.price}</p>

        {/* Selector de tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={10} />

        {/* Button */}
        <button className='btn-primary my-5'>Agregar al carrito</button>

        {/* Description */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
