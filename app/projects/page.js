'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import NewSidebar from '../components/NewSideBar/page';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const { bearerKey, user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
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

        // Filter projects to only include those with matching userId
        const userProjects = data._embedded.projects.filter(
          (project) => project.userId === user
        );

        setProjects(userProjects);
      } catch (error) {
        console.error('Projeler yüklenirken hata oluştu:', error);
      }
    };

    fetchProjects();
  }, [bearerKey, user]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const getProjectProgress = (project) => {
    if (project.personelGirisi && project.fazYapimAsamasi && project.bitirmeTalebi) return 100;
    if (project.personelGirisi && project.fazYapimAsamasi) return 75;
    if (project.personelGirisi) return 25;
    return 0;
  };

  const getSortedProjects = () => {
    if (!sortOption) return projects;

    return [...projects].sort((a, b) => {
      if (sortOption === 'date') {
        // Bitiş tarihine göre sıralama (yakın tarihe göre)
        return new Date(a.projectEndDate) - new Date(b.projectEndDate);
      } else if (sortOption === 'progress') {
        // Bitme yüzdesine göre sıralama (yüksekten düşüğe)
        return getProjectProgress(b) - getProjectProgress(a);
      }
      return 0;
    });
  };

  return (
    <div className="p-4 pt-16 bg-[#eff8fb] px-32 h-[100vh] relative">
      <NewSidebar />
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-[40px] font-bold text-[#0000cd]">Projelerim</h1>
        <select 
          className="p-2 border-2 rounded text-black bg-[#eff8fb] border-[#0000cd]"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="" disabled hidden>
            Sırala
          </option>
          <option value="date" className="text-black">Yakın Tarihe Göre Sırala</option>
          <option value="progress" className="text-black">Bitme Yüzdesine Göre Sırala</option>
        </select>
      </div>
      <div className="space-y-4">
        {/* Başlıklar */}
        <div className="grid grid-cols-5 gap-4 font-bold border-b border-gray-400 pb-4 text-[#0000cd] text-[18px] text-center">
          <span>Proje Adı</span>
          <span>Başlangıç Tarihi</span>
          <span>Bitiş Tarihi</span>
          <span>Proje Türü</span>
          <span></span>
        </div>
        <div className="max-h-[600px] h-[75vh] overflow-y-auto">
          {/* Kartlar */}
          {getSortedProjects().map((project) => (
            <Link
              href={`/project-detail/${project._links.self.href
                .split('/')
                .pop()}`}
              key={project._links.self.href}
            >
              <div className="grid grid-cols-5 mt-4 gap-4 p-4 border rounded-lg shadow-sm items-center bg-[#0000cd] text-[white] text-center cursor-pointer hover:bg-[#0000cd] transition">
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
                <span className="flex justify-end">
                  <RiArrowRightDoubleFill color="#fff" size={30} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
