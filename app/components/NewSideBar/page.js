'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { RiArrowRightDoubleFill } from 'react-icons/ri'; // Yeni ikon import edildi
import Image from 'next/image';
import Logo from './lightWhiteLogo.png';
import { useAuth } from '@/context/AuthContext';

export default function NewSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  console.log('USERRRR', user);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full w-[21.5%] bg-[#0000cd] text-[#ffffff] z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 mt-16">
          <Image
            src={Logo}
            width={100}
            height={48}
            alt="Şirket Logosu"
            className="mb-6"
          />

          <h1 className="pb-8 text-lg mb-16">
            Şirket Adı : <span className="font-bold">{user}</span>{' '}
          </h1>

          <nav className="mt-6">
            <ul>
              <li className="mb-12 flex items-center justify-between">
                <Link href="/homepage" className="hover:text-gray-400 text-lg">
                  Anasayfa
                </Link>
                <RiArrowRightDoubleFill color="#ffffff" size={26} />
              </li>
              <li className="mb-12 flex items-center justify-between">
                <Link
                  href="/add-project"
                  className="hover:text-gray-400 text-lg"
                >
                  Proje Ekle
                </Link>
                <RiArrowRightDoubleFill color="#ffffff" size={26} />
              </li>
              <li className="mb-12 flex items-center justify-between">
                <Link href="/projects" className="hover:text-gray-400 text-lg">
                  Projelerim
                </Link>
                <RiArrowRightDoubleFill color="#ffffff" size={26} />
              </li>

              <li className="mb-12 flex items-center justify-between">
                <Link href="/takvim" className="hover:text-gray-400 text-lg">
                  Takvim
                </Link>
                <RiArrowRightDoubleFill color="#ffffff" size={26} />
              </li>
              <li className="mb-12 flex items-center justify-between">
                <Link
                  href="/project-tracking"
                  className="hover:text-gray-400 text-lg"
                >
                  Proje Takip ve Talepler
                </Link>
                <RiArrowRightDoubleFill color="#ffffff" size={26} />
              </li>
            </ul>
          </nav>
          <Link
            href="/login"
            className="flex items-center justify-center bg-red-600 p-3 rounded hover:bg-red-700"
          >
            <button onClick={logout}>Çıkış Yap</button>
          </Link>
        </div>
      </div>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-[#0000cd] text-[#eaf1f7] rounded-lg"
      >
        {isOpen ? '✕' : <HiOutlineMenuAlt2 size={32} />}
      </button>
    </>
  );
}
