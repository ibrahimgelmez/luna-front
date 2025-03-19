'use client';
import React, { useState, useEffect } from 'react';

export default function Ilanlarim() {
  const [ilanlar, setIlanlar] = useState([]);
  const [open, setOpen] = useState(false);
  const [newIlan, setNewIlan] = useState({
    kategori: '',
    baslik: '',
    aciklama: '',
    resim: '',
    // Emlak için ek alanlar
    odaSayisi: '',
    kat: '',
    musait: false,
    // Araç için ek alanlar
    modelYili: '',
    km: '',
    // Elektronik için ek alanlar
    marka: '',
    durum: '',
  });

  useEffect(() => {
    const storedIlanlar = JSON.parse(localStorage.getItem('ilanlar')) || [];
    setIlanlar(storedIlanlar);
  }, []);

  const handleSave = () => {
    const updatedIlanlar = [...ilanlar, newIlan];
    setIlanlar(updatedIlanlar);
    localStorage.setItem('ilanlar', JSON.stringify(updatedIlanlar));
    setNewIlan({
      kategori: '',
      baslik: '',
      aciklama: '',
      resim: '',
      odaSayisi: '',
      kat: '',
      musait: false,
      modelYili: '',
      km: '',
      marka: '',
      durum: '',
    });
    setOpen(false);
  };

  const renderCategoryFields = () => {
    switch (newIlan.kategori) {
      case 'Emlak':
        return (
          <>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                Oda Sayısı
              </label>
              <input
                type="text"
                value={newIlan.odaSayisi}
                onChange={(e) =>
                  setNewIlan({ ...newIlan, odaSayisi: e.target.value })
                }
                placeholder="Oda Sayısı"
                className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                Kat
              </label>
              <input
                type="text"
                value={newIlan.kat}
                onChange={(e) =>
                  setNewIlan({ ...newIlan, kat: e.target.value })
                }
                placeholder="Kat"
                className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                Müstakil
              </label>
              <input
                type="checkbox"
                checked={newIlan.musait}
                onChange={(e) =>
                  setNewIlan({ ...newIlan, musait: e.target.checked })
                }
                className="w-5 h-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </>
        );
      case 'Araç':
        return (
          <>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                Model Yılı
              </label>
              <input
                type="text"
                value={newIlan.modelYili}
                onChange={(e) =>
                  setNewIlan({ ...newIlan, modelYili: e.target.value })
                }
                placeholder="Model Yılı"
                className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                Kilometre
              </label>
              <input
                type="text"
                value={newIlan.km}
                onChange={(e) => setNewIlan({ ...newIlan, km: e.target.value })}
                placeholder="Kilometre"
                className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </>
        );
      case 'Elektronik':
        return (
          <>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                Marka
              </label>
              <input
                type="text"
                value={newIlan.marka}
                onChange={(e) =>
                  setNewIlan({ ...newIlan, marka: e.target.value })
                }
                placeholder="Marka"
                className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                Durum
              </label>
              <input
                type="text"
                value={newIlan.durum}
                onChange={(e) =>
                  setNewIlan({ ...newIlan, durum: e.target.value })
                }
                placeholder="Durum"
                className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 mx-auto bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">İlanlarım</h1>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        İlan Ekle
      </button>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {ilanlar.map((ilan, index) => (
          <div
            key={index}
            className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-bold text-gray-800">{ilan.baslik}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Kategori: {ilan.kategori}
            </p>
            <p className="mt-3 text-black">{ilan.aciklama}</p>
            {ilan.resim && (
              <img
                src={ilan.resim}
                alt="İlan Resmi"
                className="mt-4 w-full h-64 object-cover rounded-lg"
              />
            )}
            {ilan.kategori === 'Emlak' && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Oda Sayısı: {ilan.odaSayisi}
                </p>
                <p className="text-sm text-gray-600">Kat: {ilan.kat}</p>
                <p className="text-sm text-gray-600">
                  Müstakil: {ilan.musait ? 'Evet' : 'Hayır'}
                </p>
              </div>
            )}
            {ilan.kategori === 'Araç' && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Model Yılı: {ilan.modelYili}
                </p>
                <p className="text-sm text-gray-600">Kilometre: {ilan.km}</p>
              </div>
            )}
            {ilan.kategori === 'Elektronik' && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Marka: {ilan.marka}</p>
                <p className="text-sm text-gray-600">Durum: {ilan.durum}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-11/12 max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Yeni İlan Ekle
            </h2>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                Kategori
              </label>
              <select
                onChange={(e) =>
                  setNewIlan({ ...newIlan, kategori: e.target.value })
                }
                value={newIlan.kategori}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Kategori Seçin</option>
                <option value="Araç">Araç</option>
                <option value="Emlak">Emlak</option>
                <option value="Elektronik">Elektronik</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                İlan Başlığı
              </label>
              <input
                type="text"
                value={newIlan.baslik}
                onChange={(e) =>
                  setNewIlan({ ...newIlan, baslik: e.target.value })
                }
                placeholder="Başlık"
                className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                Açıklama
              </label>
              <textarea
                value={newIlan.aciklama}
                onChange={(e) =>
                  setNewIlan({ ...newIlan, aciklama: e.target.value })
                }
                placeholder="Açıklama"
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Resim URL
              </label>
              <input
                type="text"
                value={newIlan.resim}
                onChange={(e) =>
                  setNewIlan({ ...newIlan, resim: e.target.value })
                }
                placeholder="Resim URL"
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {renderCategoryFields()}

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                Kaydet
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-500 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
