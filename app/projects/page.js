'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import NewSidebar from '../components/NewSideBar/page';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const { bearerKey, user } = useAuth();
  
  console.log('Projects sayfası yüklenirken user değeri:', user);
  console.log('Projects sayfası yüklenirken bearerKey değeri:', bearerKey ? 'Bearer var' : 'Bearer yok');

  // Debug için manuel filtreleme fonksiyonu
  const filterUserProjects = (allProjects, currentUser) => {
    console.log('Filtreleme fonksiyonu çağrıldı:', { 
      toplamProje: allProjects.length, 
      user: currentUser,
      userType: typeof currentUser
    });
    
    return allProjects.filter(project => {
      const isMatch = project.userId === currentUser;
      console.log(`Proje ID: ${project.projectId}, UserId: ${project.userId} (${typeof project.userId}), User: ${currentUser} (${typeof currentUser}), Eşleşiyor mu: ${isMatch}`);
      return isMatch;
    });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetch başladı, user değeri:', user);
        
        const response = await fetch(
          'https://server.lunaproject.com.tr/projects',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${bearerKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Projeler yüklenemedi');
        }
        const data = await response.json();
        console.log('Tüm API yanıtı:', data);
        
        if (data._embedded && data._embedded.projects) {
          const allProjects = data._embedded.projects;
          console.log(`API'den ${allProjects.length} proje alındı`);
          
          // Manuel filtreleme fonksiyonunu kullan
          const userProjects = filterUserProjects(allProjects, user);
          
          console.log(`Filtreleme sonrası ${userProjects.length} proje kaldı`);
          setProjects(userProjects);
        } else {
          console.error('Beklenmeyen API yanıtı:', data);
          setProjects([]);
        }
      } catch (error) {
        console.error('Projeler yüklenirken hata oluştu:', error);
        setProjects([]);
      }
    };

    if (bearerKey && user) {
      console.log('Fetch başlatılıyor...');
      fetchProjects();
    } else {
      console.log('Fetch atlandı çünkü:', { bearerVar: !!bearerKey, userVar: !!user });
      setProjects([]);
    }
  }, [bearerKey, user]);

  return (
    <div className="p-4 pt-16 bg-[#EDF7FA] px-32 min-h-screen">
      <NewSidebar />
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-[40px] font-bold text-[#0000cd]">Projelerim</h1>
        <select className="p-2 border-2 rounded text-black bg-[#EDF7FA] border-[#0000cd]">
          <option value="" disabled hidden selected>
            Sırala
          </option>
          <option className="text-[#cae1ff]">Yakın Tarihe Göre Sırala</option>
          <option className="text-[#cae1ff]">
            Bitme Yüzdesine Göre Sırala
          </option>
        </select>
      </div>
      <div className="space-y-4">
        {/* Başlıklar */}
        <div className="grid grid-cols-5 gap-4 font-bold border-b border-gray-400 pb-4 text-[#0000cd] text-[18px] text-center">
          <span>Proje Adı</span>
          <span>Başlangıç Tarihi</span>
          <span>Bitiş Tarihi</span>
          <span>Proje Türü</span>
          <span>Detay</span>
        </div>
        <div className="max-h-[600px] h-[75vh] overflow-y-auto">
          {/* Kartlar */}
          {projects.map((project) => {
            const projectId = project._links.self.href.split('/').pop();
            
            return (
              <div key={project._links.self.href} className="grid grid-cols-5 mt-4 gap-4 p-4 border rounded-lg shadow-sm items-center bg-[#0000cd] text-[white] text-center">
                <span className="text-lg font-semibold">
                  {project.projectName}
                </span>
                <span>
                  {new Date(project.projectStartDate).toLocaleDateString()}
                </span>
                <span>
                  {new Date(project.projectEndDate).toLocaleDateString()}
                </span>
                <span>{project.projectType}</span>
                <span className="flex justify-center">
                  <Link href={`/project-detail/${projectId}`}>
                    <RiArrowRightDoubleFill color="#fff" size={30} className="cursor-pointer hover:opacity-80" />
                  </Link>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
