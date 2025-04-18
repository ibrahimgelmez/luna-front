'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import NewSidebar from '../components/NewSideBar/page';
import ProgressBar from '@ramonak/react-progress-bar';

export default function ProjectTracking() {
  const [projects, setProjects] = useState([]);
  const { bearerKey, user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        'https://server.lunaproject.com.tr:8081/projects',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      const filteredProjects = data._embedded.projects.filter(
        (project) =>
          project.projectStatus === 'completed' && project.userId === user
      );
      setProjects(filteredProjects);
    };

    fetchProjects();
  }, [bearerKey, user]);

  return (
    <div className=" p-4 pt-16 px-32 mx-auto bg-[#eff8fb] h-[100vh] ">
      <NewSidebar /> {/* Sidebar componentini ekleyin */}
      <h1 className="text-[38px] font-bold text-[#0000cd] mb-12 ">
        Proje Takip ve Talepler
      </h1>
      <div className="space-y-4 ">
        <div className="grid grid-cols-5 gap-4 font-bold border-b border-gray-400 pb-4 text-center items-center text-[18px] text-[#0000cd]">
          <span className="text-center">Proje Adı</span>
          <span className="text-center">Başlangıç Tarihi</span>
          <span className="text-center">Bitiş Tarihi</span>
          <span className="text-center">Proje Türü</span>
          <span className="text-center">Bitirme Talebi</span>
        </div>
        <div className="max-h-[600px] h-[75vh] overflow-y-auto">
          {projects.map((project) => (
            <div>
              <div
                key={project.projectId}
                className="grid grid-cols-5 gap-4 p-4 mt-6 border rounded-lg shadow-sm items-center text-center bg-[#0000cd] text-[#eff8fb] text-lg"
              >
                <span className="font-semibold text-center">
                  {project.projectName}
                </span>
                <span className="text-center">
                  {new Date(project.projectStartDate).toLocaleDateString()}
                </span>
                <span className="text-center">
                  {new Date(project.projectEndDate).toLocaleDateString()}
                </span>
                <span className="text-center">{project.projectType}</span>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#0000cd]  mx-auto"
                />
              </div>
              <div className="mt-1">
                <ProgressBar completed={80} bgColor="#FFC000" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
