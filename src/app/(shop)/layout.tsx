import { Footer, Sidebar, TopMenu } from '@/components';

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
      <Sidebar />

      <div className='px-0 md:px-10'>{children}</div>

      <Footer />
    </main>
  );
}
