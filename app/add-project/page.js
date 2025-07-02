'use client';

import { useState } from 'react';
import NewSidebar from '../components/NewSideBar/page';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
//z
export default function AddProject() {
  const [formData, setFormData] = useState({
    projectName: '',
    stbCode: '',
    summary: '',
    purpose: '',
    type: '',
    sector: '',
    budget: '',
    team: '',
    startDate: '',
    endDate: '',
    completionStatus: 'in_progress',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { bearerKey, user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Tarih girişi için otomatik formatlamayı yöneten fonksiyon
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Sadece rakam ve slash karakterlerine izin ver
    formattedValue = formattedValue.replace(/[^\d/]/g, '');

    // Otomatik slash ekleme
    if (formattedValue.length === 2 && !formattedValue.includes('/')) {
      formattedValue += '/';
    } else if (formattedValue.length === 5 && formattedValue.split('/').length === 2) {
      formattedValue += '/';
    }

    // Maksimum uzunluk kontrolü (DD/MM/YYYY = 10 karakter)
    if (formattedValue.length <= 10) {
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    }
  };

  // Tarih formatını DD/MM/YYYY'den YYYY-MM-DD'ye çeviren fonksiyon
  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateString;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const teamArray = formData.team
      ? formData.team.split(',').map((member) => member.trim())
      : [];

    const projectData = {
      projectName: formData.projectName,
      stbCode: formData.stbCode, // API'nin beklediği şekilde eklendi
      projectSummary: formData.summary,
      projectType: formData.type,
      projectPurpose: formData.purpose,
      projectSector: formData.sector,
      projectStatus: formData.completionStatus === 'completed' ? 'completed' : 'in_progress',
      projectTeam: teamArray,
      projectBudget: formData.budget ? parseInt(formData.budget) : 0,
      projectStartDate: formatDateForAPI(formData.startDate),
      projectEndDate: formData.endDate ? formatDateForAPI(formData.endDate) : '',
      userId: user, // Kullanıcı adını projeye atayalım
    };

    console.log('Gönderilen Veri:', JSON.stringify(projectData));

    try {
      const response = await fetch(
        'https://server.lunaproject.com.tr/projects',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Proje eklenirken hata oluştu');
      }

      const result = await response.json();
      setSuccess('Proje başarıyla eklendi!');
      toast.success('Proje başarıyla eklendi!');
      console.log('Proje Eklendi:', result);

      setFormData({
        projectName: '',
        stbCode: '',
        summary: '',
        purpose: '',
        type: '',
        sector: '',
        budget: '',
        team: '',
        startDate: '',
        endDate: '',
        completionStatus: 'in_progress',
      });

      setTimeout(() => {
        router.push('/projects');
      }, 3000);
    } catch (err) {
      setError(err.message);
      toast.error('Proje eklenirken bir hata oluştu: ' + err.message);
      console.error('Hata Detayı:', err);
    }
  };

  return (
    <div className="p-6 pt-16 px-32 mx-auto bg-[#EDF7FA]">
      <Toaster position="top-right" reverseOrder={false} />
      <NewSidebar />
      <div className="p-5 flex flex-col h-full">
        <h1 className="mb-5 text-[40px] font-bold text-[#0000cd]">
          Proje Ekle
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-6"
        >
          {/* Proje Adı */}
          <div>
            <label
              htmlFor="projectName"
              className="block text-blue-900 font-semibold mb-2"
            >
              Proje Adı
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              required
            />
          </div>

          {/* STB Kodu */}
          <div>
            <label
              htmlFor="stbCode"
              className="block text-blue-900 font-semibold mb-2"
            >
              STB Kodu (Opsiyonel)
            </label>
            <input
              type="text"
              id="stbCode"
              name="stbCode"
              value={formData.stbCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
            />
          </div>

          {/* Proje Özeti */}
          <div>
            <label
              htmlFor="summary"
              className="block text-blue-900 font-semibold mb-2"
            >
              Proje Özeti
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              rows="4"
              required
            />
          </div>

          {/* Proje Amacı */}
          <div>
            <label
              htmlFor="purpose"
              className="block text-blue-900 font-semibold mb-2"
            >
              Proje Amacı
            </label>
            <textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              rows="4"
              required
            />
          </div>

          {/* Türü */}
          <div>
            <label
              htmlFor="type"
              className="block text-blue-900 font-semibold mb-2"
            >
              Proje Türü
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              required
            >
              <option value="">Seçiniz</option>
              <option value="Ar-Ge">Ar-Ge</option>
              <option value="Yazılım">YAZILIM</option>
              <option value="TÜBİTAK">TÜBİTAK</option>
              <option value="KOSGEB">KOSGEB</option>
              <option value="TEKNOPARK">TEKNOPARK</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>

          {/* Sektörü */}
          <div>
            <label
              htmlFor="sector"
              className="block text-blue-900 font-semibold mb-2"
            >
              Sektör
            </label>
            <select
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              required
            >
              <option value="">Seçiniz</option>
              <option value="Teknoloji">Teknoloji</option>
              <option value="Yazılım">Yazılım</option>
              <option value="Tekstil">Tekstil</option>
              <option value="Eğitim">Eğitim</option>
              <option value="Sağlık">Sağlık</option>
              <option value="Finans">Finans</option>
              <option value="E-Ticaret">E-Ticaret</option>
              <option value="Pazarlama ve Reklamcılık">
                Pazarlama ve Reklamcılık
              </option>
              <option value="Medya">Medya</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>

          {/* Bütçesi */}
          <div>
            <label
              htmlFor="budget"
              className="block text-blue-900 font-semibold mb-2"
            >
              Bütçe (TL)
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              min="0"
              required
            />
          </div>

          {/* Ekibi */}
          <div>
            <label
              htmlFor="team"
              className="block text-blue-900 font-semibold mb-2"
            >
              Proje Ekibi (Virgülle ayırın)
            </label>
            <input
              type="text"
              id="team"
              name="team"
              value={formData.team}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              placeholder="Örn: Ahmet, Mehmet, Ayşe"
              required
            />
          </div>

          {/* Başlangıç Tarihi */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-blue-900 font-semibold mb-2"
            >
              Başlangıç Tarihi
            </label>
            <input
              type="text"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleDateChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              placeholder="GG/AA/YYYY"
              pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$"
              title="Lütfen GG/AA/YYYY formatında tarih girin (örn: 15/03/2024)"
              maxLength="10"
              required
            />
          </div>

          {/* Bitiş Tarihi */}
          <div>
            <label
              htmlFor="endDate"
              className="block text-blue-900 font-semibold mb-2"
            >
              Bitiş Tarihi (Opsiyonel)
            </label>
            <input
              type="text"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleDateChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              placeholder="GG/AA/YYYY"
              pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$"
              title="Lütfen GG/AA/YYYY formatında tarih girin (örn: 15/03/2024)"
              maxLength="10"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0000cd] text-white p-3 rounded hover:bg-[#0000cd] transition-colors"
          >
            Projeyi Kaydet
          </button>
        </form>
      </div>
    </div>
  );
}
