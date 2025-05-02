'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa6';
import { MdLock } from 'react-icons/md';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

import Logo from '../../public/lunaLogo.png';
import Image from 'next/image';

export default function Login() {
  const { user, bearerKey, login, setBearerKey } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://server.lunaproject.com.tr/login',
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      const token = response.data;
      login(username, token, rememberMe);
      router.push('/homepage');
    } catch (error) {
      console.error('Login failed', error);
      alert('Şifre yanlış veya kullanıcı adı hatalı!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0000cd]">
      <div className="p-8 rounded-2xl shadow-xl w-[700px] h-[560px] bg-[#eff8fb]">
        <div className="justify-center items-center flex">
          <Image
            src={Logo}
            width={140}
            height={48}
            alt="Şirket Logosu"
            className=" mb-8 "
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-[#001a78] mb-6">
          Şirket Girişi
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 relative">
            <label className="block bg-transparent text-gray-600 text-sm font-medium mb-2">
              Kullanıcı Adı
            </label>
            <div className="flex items-center border  rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
              <FaRegUser color="black" className="ml-4 mr-4" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-black p-3  rounded-r-lg focus:outline-none "
                placeholder="Şirket kullanıcı adınızı girin"
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Şifre
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
              <MdLock color="black" size={22} className="ml-4 mr-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black p-3 pr-10 rounded-r-lg focus:outline-none"
                placeholder="Şifrenizi girin"
              />
              <button
                type="button"
                className="absolute right-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2 accent-[#0000cd] "
              id="rememberMeCheckbox"
            />
            <label
              htmlFor="rememberMeCheckbox"
              className="text-gray-600 text-sm ml-2 cursor-pointer"
            >
              Beni Hatırla
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#0000cd] text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
