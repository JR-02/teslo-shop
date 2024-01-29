'use client';

import Link from 'next/link';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { useUIStore } from '@/store';
import clsx from 'clsx';

const firstMenuItems = [
  {
    title: 'Perfil',
    icon: <IoPersonOutline size={30} />,
    path: '/',
  },
  {
    title: 'Ordenes',
    icon: <IoTicketOutline size={30} />,
    path: '/',
  },
  {
    title: 'Ingresar',
    icon: <IoLogInOutline size={30} />,
    path: '/',
  },
  {
    title: 'Salir',
    icon: <IoLogOutOutline size={30} />,
    path: '/',
  },
];

const secondMenuItems = [
  {
    title: 'Productos',
    icon: <IoShirtOutline size={30} />,
    path: '/',
  },
  {
    title: 'Ordenes',
    icon: <IoTicketOutline size={30} />,
    path: '/',
  },
  {
    title: 'Usuarios',
    icon: <IoPeopleOutline size={30} />,
    path: '/',
  },
];

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
        />
      )}

      {/* Side menu */}
      <nav
        //TODO: Efecto de slide
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* Input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Buscar'
            className='w-full bg-gray-50 rounded px-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
          />
        </div>

        {/* Menu */}

        {firstMenuItems.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
          >
            {item.icon}
            <span className='ml-3 text-xl'>{item.title}</span>
          </Link>
        ))}

        {/* Line Separator */}
        <div className='w-full h-px bg-gray-200 my-10' />

        {secondMenuItems.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
          >
            {item.icon}
            <span className='ml-3 text-xl'>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
