'use client';

import { generatePagination } from '@/utils';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get('page') ?? 1;
  const currentPage = isNaN(Number(pageString)) ? 1 : Number(pageString);

  if (currentPage < 1 || isNaN(Number(pageString))) {
    redirect(pathname);
  }

  const allPages = generatePagination(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`;
    }

    if (Number(pageNumber) <= 0) {
      return `${pathname}`;
    }

    if (Number(pageNumber) > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex text-center justify-center mt-10 mb-32'>
      <nav aria-label='Page navigation example'>
        <ul className='flex list-style-none items-center gap-1'>
          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={24} />
            </Link>
          </li>

          {allPages.map((page, index) => (
            <li className='page-item' key={page + '-' + index}>
              <Link
                className={`page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300   focus:shadow-none ${
                  page == currentPage
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:text-white'
                    : 'bg-transparent hover:bg-gray-200 text-gray-800 hover:text-gray-800'
                }`}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={24} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
