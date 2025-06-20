'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import NewSidebar from '../components/NewSideBar/page';

export default function BulkImport() {
  const [companyName, setCompanyName] = useState('');
  const [excelData, setExcelData] = useState('');
  const [parsedProjects, setParsedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { bearerKey, user } = useAuth();
  const router = useRouter();

  const parseExcelData = () => {
    if (!excelData.trim() || !companyName.trim()) {
      toast.error('Lütfen şirket adını ve Excel verilerini girin');
      return;
    }

    try {
      // JSON formatını kontrol et
      if (excelData.trim().startsWith('[') && excelData.trim().endsWith(']')) {
        // JSON formatı
        const jsonProjects = JSON.parse(excelData);
        const projects = jsonProjects.map(project => ({
          ...project,
          userId: companyName // Şirket adını userId olarak kullan
        }));
        setParsedProjects(projects);
        toast.success(`${projects.length} proje JSON formatından başarıyla parse edildi`);
        return;
      }

      // Tire ile ayrılmış format (mevcut kod)
      const lines = excelData.trim().split('\n');
      const projects = [];

      // Her satırı işle (başlık satırı yok, direkt veri)
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Tire ile ayrılmış verileri parse et ve boşlukları temizle
        const columns = line.split('-').map(col => col.trim());
        
        if (columns.length >= 11) {
          // Tarihleri parse et
          const parseDate = (dateStr) => {
            if (!dateStr || dateStr.trim() === '') return '';
            try {
              const parts = dateStr.split('.');
              if (parts.length === 3) {
                // DD.MM.YYYY formatından YYYY-MM-DD formatına çevir
                return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
              }
              return dateStr;
            } catch (e) {
              return dateStr;
            }
          };

          // Ekip üyelerini parse et
          const parseTeam = (teamStr) => {
            if (!teamStr || teamStr.trim() === '') return [];
            return teamStr.split(' ').filter(name => name.trim() !== '');
          };

          // Bütçeyi parse et
          const parseBudget = (budgetStr) => {
            if (!budgetStr || budgetStr.trim() === '') return 0;
            return parseInt(budgetStr.replace(/[.,]/g, '').replace(/\D/g, '')) || 0;
          };

          // Proje durumunu parse et
          const parseStatus = (statusStr) => {
            if (!statusStr) return 'Devam Ediyor';
            return statusStr.toUpperCase().includes('TAMAMLAND') ? 'completed' : 'Devam Ediyor';
          };

          // Proje türünü mapping et
          const mapProjectType = (type) => {
            if (!type) return 'Diğer';
            const lowerType = type.toLowerCase();
            if (lowerType.includes('yazılım')) return 'Web Uygulaması';
            if (lowerType.includes('ar-ge') || lowerType.includes('arge')) return 'Ar-Ge';
            if (lowerType.includes('tübitak')) return 'TÜBİTAK';
            if (lowerType.includes('kosgeb')) return 'KOSGEB';
            if (lowerType.includes('teknopark')) return 'TEKNOPARK';
            return 'Diğer';
          };

          // Sektörü mapping et
          const mapSector = (sector) => {
            if (!sector) return 'Teknoloji';
            const lowerSector = sector.toLowerCase();
            if (lowerSector.includes('yazılım') || lowerSector.includes('teknoloji')) return 'Teknoloji';
            if (lowerSector.includes('eğitim')) return 'Eğitim';
            if (lowerSector.includes('sağlık')) return 'Sağlık';
            if (lowerSector.includes('finans')) return 'Finans';
            if (lowerSector.includes('e-ticaret')) return 'E-Ticaret';
            return 'Teknoloji';
          };

          const project = {
            projectName: columns[2] || '',
            stbCode: columns[1] || '',
            projectSummary: columns[4] || '',
            projectPurpose: columns[5] || '',
            projectType: mapProjectType(columns[6]),
            projectSector: mapSector(columns[7]),
            projectStatus: parseStatus(columns[3]),
            projectTeam: parseTeam(columns[9]),
            projectBudget: parseBudget(columns[8]),
            projectStartDate: parseDate(columns[10]),
            projectEndDate: parseDate(columns[11]),
            ekSureTarihi: parseDate(columns[12]) || null,
            userId: companyName, // Şirket adını userId olarak kullan
            // Durum alanları - tamamlanmış projeler için true set et
            personelGirisi: parseStatus(columns[3]) === 'completed',
            fazYapimAsamasi: parseStatus(columns[3]) === 'completed',
            bitirmeTalebi: parseStatus(columns[3]) === 'completed'
          };

          projects.push(project);
        }
      }

      setParsedProjects(projects);
      toast.success(`${projects.length} proje başarıyla parse edildi`);
    } catch (error) {
      console.error('Parse error:', error);
      toast.error('Veri parse edilirken hata oluştu');
    }
  };

  const createProjects = async () => {
    if (parsedProjects.length === 0) {
      toast.error('Önce verileri parse edin');
      return;
    }

    setIsLoading(true);
    let successCount = 0;
    let failCount = 0;

    for (const project of parsedProjects) {
      try {
        const response = await fetch('https://server.lunaproject.com.tr/projects', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        });

        if (response.ok) {
          successCount++;
        } else {
          failCount++;
          console.error(`Proje oluşturulamadı: ${project.projectName}`);
        }
      } catch (error) {
        failCount++;
        console.error(`API hatası: ${project.projectName}`, error);
      }
    }

    setIsLoading(false);
    
    if (successCount > 0) {
      toast.success(`${successCount} proje başarıyla eklendi`);
    }
    if (failCount > 0) {
      toast.error(`${failCount} proje eklenemedi`);
    }

    if (successCount > 0) {
      setTimeout(() => {
        router.push('/projects');
      }, 2000);
    }
  };

  return (
    <div className="p-6 pt-16 px-32 mx-auto bg-[#EDF7FA] min-h-screen">
      <Toaster position="top-right" />
      <NewSidebar />
      
      <div className="p-5 flex flex-col h-full">
        <h1 className="mb-5 text-[40px] font-bold text-[#0000cd]">
          Toplu Proje İçe Aktarma
        </h1>

        <div className="bg-white p-6 rounded shadow space-y-6">
          {/* Şirket Adı */}
          <div>
            <label className="block text-blue-900 font-semibold mb-2">
              Şirket Adı (User ID olarak kullanılacak)
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              placeholder="Örn: abdi_ibrahim"
              required
            />
          </div>

          {/* Excel Verisi */}
          <div>
            <label className="block text-blue-900 font-semibold mb-2">
              Excel Verilerini Buraya Yapıştırın
            </label>
                          <div className="mb-2 text-sm text-gray-600">
              Proje verilerini 2 farklı formatta yapıştırabilirsiniz:
              <br/><strong>1. JSON Format:</strong> {`[ {"projectName": "...", ...} ]`} şeklinde JSON array
              <br/><strong>2. Tire Format:</strong> Firma İsmi - STB Kodu - Proje Adı - Bitiş Durumu - Özeti - Amacı - Türü - Sektörü - Bütçesi - Ekibi - Başlangıç - Bitiş - Ek Süre Tarihi
              <br/><strong>Örnek tire format:</strong> ABDİ İBRAHİM TEKNOLOJİ - 95637 - Atlas SSO Uygulaması - TAMAMLANDI - ...
            </div>
                          <textarea
                value={excelData}
                onChange={(e) => setExcelData(e.target.value)}
                className="w-full h-40 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
                placeholder="Tire ile ayrılmış proje verilerini buraya yapıştırın..."
              />
          </div>

          {/* Parse Button */}
          <div className="flex space-x-4">
            <button
              onClick={parseExcelData}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
            >
              Verileri Parse Et
            </button>
          </div>

          {/* Parsed Projects Preview */}
          {parsedProjects.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Parse Edilen Projeler ({parsedProjects.length} adet)
              </h3>
              
              <div className="max-h-96 overflow-y-auto border border-gray-300 rounded">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b text-left text-black">Proje Adı</th>
                      <th className="py-2 px-4 border-b text-left text-black">STB Kodu</th>
                      <th className="py-2 px-4 border-b text-left text-black">Tür</th>
                      <th className="py-2 px-4 border-b text-left text-black">Bütçe</th>
                      <th className="py-2 px-4 border-b text-left text-black">Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedProjects.map((project, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b text-black">{project.projectName}</td>
                        <td className="py-2 px-4 border-b text-black">{project.stbCode}</td>
                        <td className="py-2 px-4 border-b text-black">{project.projectType}</td>
                        <td className="py-2 px-4 border-b text-black">{project.projectBudget?.toLocaleString()} ₺</td>
                        <td className="py-2 px-4 border-b text-black">
                          <span className={`px-2 py-1 rounded text-xs ${
                            project.projectStatus === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.projectStatus === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={createProjects}
                  disabled={isLoading}
                  className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition disabled:opacity-50"
                >
                  {isLoading ? 'Projeler Ekleniyor...' : 'Tüm Projeleri Ekle'}
                </button>
                
                <button
                  onClick={() => {
                    setParsedProjects([]);
                    setExcelData('');
                    setCompanyName('');
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition"
                >
                  Temizle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 