import { TopMenu } from '@/components';

export const metadata = {
  title: 'Teslo | Shop',
  description: 'Una tienda virtual de productos',
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen'>
      <TopMenu />

      <div className='px-0 sm:px-10'>{children}</div>
    </main>
  );
}
