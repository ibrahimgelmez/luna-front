'use client';

import { React, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Kullanıcı Adı:', username);
    console.log('Şifre:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-5">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-4xl">
        {/* Sol Taraf (Tanıtım) */}
        <div className="bg-indigo-100 p-8 flex flex-col justify-center items-center w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-indigo-600 text-center">
            Trakyadan.tr ile Aradığını Bul 🔍, İhtiyacın Olanı Al 🤝!
          </h2>
          <img
            src="./trakyadan-removebg.png"
            alt="Illustration"
            className="w-72 mt-4 rounded-lg"
          />
        </div>
        {/* Sağ Taraf (Kayıt Formu) */}
        <div className="p-8 flex flex-col justify-center w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Hesabını Oluştur
          </h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Kullanıcı Adı:
              </label>
              <input
                type="text"
                placeholder="Kullanıcı adınızı girin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Şifre:</label>
              <input
                type="password"
                placeholder="Şifrenizi girin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 text-black py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Kayıt Ol
            </button>
          </form>
          <div className="text-center text-black my-4">— Veya —</div>
          <button className="w-full flex items-center justify-center border py-2 rounded-lg text-black hover:bg-gray-100 transition">
            <FcGoogle size={22} className="mr-4" />
            Google ile Giriş Yap
          </button>
          <p className="text-center mt-4 text-black">
            Zaten bir hesabın var mı?{' '}
            <a href="#" className="text-blue-600 font-medium">
              Giriş Yap
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
