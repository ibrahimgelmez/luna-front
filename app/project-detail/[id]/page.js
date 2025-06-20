'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import NewSidebar from '@/app/components/NewSideBar/page';
import toast, { Toaster } from 'react-hot-toast';

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { bearerKey } = useAuth();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const response = await fetch(
            `https://server.lunaproject.com.tr/projects/${id}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${bearerKey}`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (!response.ok) {
            throw new Error('Proje yüklenemedi');
          }
          const data = await response.json();
          setProject(data);
          setFormData(data); // Formda kullanılacak veriyi ayarla
        } catch (error) {
          console.error('Proje yüklenirken hata oluştu:', error);
          toast.error('Proje yüklenirken hata oluştu');
        }
      };
      fetchProject();
    }
  }, [id, bearerKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (e) => {
    // Ekip üyelerini virgülle ayrılmış string olarak alıp array'e çeviriyoruz
    const teamMembers = e.target.value.split(',').map(member => member.trim());
    setFormData(prev => ({ ...prev, projectTeam: teamMembers }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    
    // Özel durum: projectStatus checkbox'ı için
    if (name === 'projectStatusCheckbox') {
      setFormData(prev => ({ 
        ...prev, 
        projectStatus: checked ? 'completed' : 'Devam Ediyor' 
      }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // userId'yi koruyarak form verisini hazırla
      const updateData = {
        ...formData,
        userId: project.userId // Orijinal userId'yi koru
      };

      const response = await fetch(
        `https://server.lunaproject.com.tr/projects/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error('Proje güncellenirken hata oluştu');
      }

      const updatedProject = await response.json();
      setProject(updatedProject);
      setFormData(updatedProject);
      setEditMode(false);
      toast.success('Proje başarıyla güncellendi');
    } catch (error) {
      console.error('Proje güncellenirken hata oluştu:', error);
      toast.error(`Proje güncellenirken hata oluştu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(project); // Form verilerini orijinal proje verileriyle sıfırla
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://server.lunaproject.com.tr/projects/${id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${bearerKey}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Proje silinirken hata oluştu');
        }

        toast.success('Proje başarıyla silindi');
        // Projeler sayfasına yönlendir
        setTimeout(() => {
          router.push('/projects');
        }, 1000);
      } catch (error) {
        console.error('Proje silinirken hata oluştu:', error);
        toast.error(`Proje silinirken hata oluştu: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!project || !formData) {
    return (
      <div className="p-4 pt-16 bg-[#EDF7FA] px-32 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0000cd]"></div>
        <span className="ml-3 text-[#0000cd] font-semibold">Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="p-4 pt-16 bg-[#EDF7FA] px-32 min-h-screen">
      <Toaster position="top-right" />
      <NewSidebar />
      <div className="mb-8 mt-6">
        <h1 className="text-[40px] font-bold text-[#0000cd] mb-4">
          {editMode ? 'Proje Düzenle' : 'Proje Detayı'}
        </h1>
        <hr className="border-[#0000cd] mb-6" />
      </div>

      {editMode ? (
        // Düzenleme Formu
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              {/* Sol sütun */}
              <div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    Proje Adı
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    Başlangıç Tarihi
                  </label>
                  <input
                    type="date"
                    name="projectStartDate"
                    value={formData.projectStartDate ? formData.projectStartDate.split('T')[0] : ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    name="projectEndDate"
                    value={formData.projectEndDate ? formData.projectEndDate.split('T')[0] : ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    Proje Türü
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    required
                  >
                    <option value="Ar-Ge">Ar-Ge</option>
                    <option value="TÜBİTAK">TÜBİTAK</option>
                    <option value="KOSGEB">KOSGEB</option>
                    <option value="TEKNOPARK">TEKNOPARK</option>
                    <option value="Web Uygulaması">Web Uygulaması</option>
                    <option value="Mobil Uygulama">Mobil Uygulama</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    Proje Durumu
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="projectStatusCheckbox"
                      checked={formData.projectStatus === 'completed'}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4"
                      id="projectStatusCheckbox"
                    />
                    <label htmlFor="projectStatusCheckbox" className="text-black">
                      Proje tamamlandı olarak işaretle
                    </label>
                  </div>
                  <input 
                    type="hidden" 
                    name="projectStatus" 
                    value={formData.projectStatus} 
                  />
                </div>
              </div>

              {/* Sağ sütun */}
              <div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    Proje Özeti
                  </label>
                  <textarea
                    name="projectSummary"
                    value={formData.projectSummary}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    Proje Amacı
                  </label>
                  <textarea
                    name="projectPurpose"
                    value={formData.projectPurpose}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    Sektör
                  </label>
                  <select
                    name="projectSector"
                    value={formData.projectSector}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    required
                  >
                    <option value="Teknoloji">Teknoloji</option>
                    <option value="Eğitim">Eğitim</option>
                    <option value="Sağlık">Sağlık</option>
                    <option value="Finans">Finans</option>
                    <option value="E-Ticaret">E-Ticaret</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    Proje Ekibi (Virgülle ayırın)
                  </label>
                  <input
                    type="text"
                    value={formData.projectTeam.join(', ')}
                    onChange={handleTeamChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    Proje Bütçesi (₺)
                  </label>
                  <input
                    type="number"
                    name="projectBudget"
                    value={formData.projectBudget}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold text-[#0000cd] mb-2">
                    STB Kodu
                  </label>
                  <input
                    type="text"
                    name="stbCode"
                    value={formData.stbCode || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                  />
                </div>
              </div>
            </div>

            {/* Durum Bilgileri */}
            <div className="mt-6 border-t pt-6 border-gray-200">
              <h2 className="text-xl font-bold text-[#0000cd] mb-4">Proje Durumu</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-3 rounded-lg">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="personelGirisi"
                      checked={formData.personelGirisi || false}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="font-semibold text-[#0000cd]">Personel Girişi</span>
                  </label>
                </div>
                <div className="p-3 rounded-lg">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="fazYapimAsamasi"
                      checked={formData.fazYapimAsamasi || false}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="font-semibold text-[#0000cd]">Faz Yapım Aşaması</span>
                  </label>
                </div>
                <div className="p-3 rounded-lg">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="bitirmeTalebi"
                      checked={formData.bitirmeTalebi || false}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="font-semibold text-[#0000cd]">Bitirme Talebi</span>
                  </label>
                </div>
                <div className="p-3 rounded-lg">
                  <label className="block font-semibold text-[#0000cd] mb-2">
                    Ek Süre Tarihi
                  </label>
                  <input
                    type="date"
                    name="ekSureTarihi"
                    value={formData.ekSureTarihi ? formData.ekSureTarihi.split('T')[0] : ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                  />
                </div>
              </div>
            </div>

            {/* Butonlar */}
            <div className="mt-8 flex space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                disabled={loading}
              >
                İptal
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Kaydediliyor...
                  </>
                ) : (
                  'Kaydet'
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Detay Görünümü
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-6">
            {/* Sol sütun */}
            <div>
              <h2 className="text-lg font-semibold text-[#0000cd] mb-2">
                Proje Adı
              </h2>
              <p className="text-[#0000cd]">{project.projectName}</p>

              <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                Başlangıç Tarihi
              </h2>
              <p className="text-[#0000cd]">
                {new Date(project.projectStartDate).toLocaleDateString()}
              </p>

              <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                Bitiş Tarihi
              </h2>
              <p className="text-[#0000cd]">
                {new Date(project.projectEndDate).toLocaleDateString()}
              </p>

              <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                Proje Türü
              </h2>
              <p className="text-[#0000cd]">{project.projectType}</p>

              <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                Proje Durumu
              </h2>
              <p className={`inline-block px-3 py-1 rounded-full ${
                project.projectStatus === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {project.projectStatus === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
              </p>
            </div>

            {/* Sağ sütun */}
            <div>
              <h2 className="text-lg font-semibold text-[#0000cd] mb-2">
                Proje Özeti
              </h2>
              <p className="text-[#0000cd]">{project.projectSummary}</p>

              <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                Proje Amacı
              </h2>
              <p className="text-[#0000cd]">{project.projectPurpose}</p>

              <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                Sektör
              </h2>
              <p className="text-[#0000cd]">{project.projectSector}</p>

              <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                Proje Ekibi
              </h2>
              <ul className="list-disc list-inside text-[#0000cd]">
                {project.projectTeam.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>

              <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                Proje Bütçesi
              </h2>
              <p className="text-[#0000cd]">
                {project.projectBudget.toLocaleString()} ₺
              </p>

              {project.stbCode && (
                <>
                  <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                    STB Kodu
                  </h2>
                  <p className="text-[#0000cd]">{project.stbCode}</p>
                </>
              )}
            </div>
          </div>

          {/* Durum Bilgileri */}
          <div className="mt-8 border-t pt-6 border-gray-200">
            <h2 className="text-xl font-bold text-[#0000cd] mb-4">Proje Durumu</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="font-semibold text-[#0000cd]">Personel Girişi</h3>
                <p className="text-[#0000cd]">{project.personelGirisi ? 'Evet' : 'Hayır'}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="font-semibold text-[#0000cd]">Faz Yapım Aşaması</h3>
                <p className="text-[#0000cd]">{project.fazYapimAsamasi ? 'Evet' : 'Hayır'}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="font-semibold text-[#0000cd]">Bitirme Talebi</h3>
                <p className="text-[#0000cd]">{project.bitirmeTalebi ? 'Evet' : 'Hayır'}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="font-semibold text-[#0000cd]">Ek Süre Tarihi</h3>
                <p className="text-[#0000cd]">
                  {project.ekSureTarihi 
                    ? new Date(project.ekSureTarihi).toLocaleDateString() 
                    : 'Belirlenmedi'}
                </p>
              </div>
            </div>
          </div>

          {/* Butonlar */}
          <div className="mt-8 flex space-x-4">
            <Link href="/projects">
              <button className="bg-[#0000cd] text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Geri Dön
              </button>
            </Link>
            <button 
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Düzenle
            </button>
            <button 
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Siliniyor...
                </>
              ) : (
                'Sil'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
