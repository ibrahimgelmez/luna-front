'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // useParams ile dinamik parametreyi alıyoruz

import { useAuth } from '@/context/AuthContext';
import NewSidebar from '@/app/components/NewSideBar/page';

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const { bearerKey } = useAuth();
  const { id } = useParams(); // URL'den proje ID'sini al

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
        } catch (error) {
          console.error('Proje yüklenirken hata oluştu:', error);
        }
      };
      fetchProject();
    }
  }, [id, bearerKey]);

  if (!project) {
    return (
      <div className="p-4 pt-16 bg-[#eff8fb] px-32 h-[100vh] relative">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="p-4 pt-16 bg-[#eff8fb] px-32 h-[100vh] relative">
      <NewSidebar />
      <div className="mb-8 mt-6">
        <h1 className="text-[40px] font-bold text-[#0000cd] mb-4">
          Proje Detayı
        </h1>
        <hr className="border-[#0000cd] mb-6" />
      </div>
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
            <p className="text-[#0000cd]">{project.projectStatus}</p>
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
          </div>
        </div>

        {/* Geri Dön Butonu */}
        <div className="mt-8">
          <Link href="/projects">
            <button className="bg-[#0000cd] text-white px-4 py-2 rounded hover:bg-[#0000cd] transition">
              Geri Dön
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
