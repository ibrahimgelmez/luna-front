'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import NewSidebar from '../components/NewSideBar/page';
import ProgressBar from '@ramonak/react-progress-bar';

export default function ProjectTracking() {
  const [projects, setProjects] = useState([]);
  const { bearerKey, user } = useAuth();
  // Her proje için expand ve checkbox state'i tut
  const [expanded, setExpanded] = useState({});
  const [projectStates, setProjectStates] = useState({});

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
      const filteredProjects = data._embedded.projects.filter(
        (project) =>
          project.projectStatus === 'completed' && project.userId === user
      );
      setProjects(filteredProjects);
      // Proje state'lerini başlat
      const initialStates = {};
      filteredProjects.forEach((project) => {
        initialStates[project.projectId] = {
          personnel: false,
          phase: false,
          finish: false,
        };
      });
      setProjectStates(initialStates);
    };

    if (bearerKey && user) {
      fetchProjects();
    }
    if (bearerKey && user) {
      fetchProjects();
    }
  }, [bearerKey, user]);

  // Proje satırına tıklama
  const handleExpand = (projectId) => {
    setExpanded((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  // Checkbox değişimi
  const handleCheckboxChange = async (projectId, field) => {
    // Yeni state'i hazırla
    setProjectStates((prev) => {
      const newValue = !prev[projectId][field];
      const updated = {
        ...prev,
        [projectId]: {
          ...prev[projectId],
          [field]: newValue,
        },
      };
      return updated;
    });

    // Backend field mapping
    const fieldMap = {
      personnel: 'personelGirisi',
      phase: 'fazYapimAsamasi',
      finish: 'bitirmeTalebi',
    };
    const backendField = fieldMap[field];
    if (!backendField) return;

    // PATCH isteği gönder
    try {
      const res = await fetch(`https://server.lunaproject.com.tr/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${bearerKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [backendField]: projectStates[projectId] ? !projectStates[projectId][field] : true }),
      });
      if (!res.ok) {
        throw new Error('Sunucuya kaydedilemedi.');
      }
    } catch (err) {
      alert('Değişiklik kaydedilemedi: ' + err.message);
    }
  };

  // Progress hesaplama
  const getProgress = (state) => {
    if (state.personnel && !state.phase && !state.finish) return 25;
    if (state.personnel && state.phase && !state.finish) return 75;
    if (state.personnel && state.phase && state.finish) return 100;
    return 0;
  };

  return (
    <div className=" p-4 pt-16 px-32 mx-auto bg-[#EDF7FA] h-[100vh] ">
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
          {projects.map((project) => {
            const state = projectStates[project.projectId] || {};
            return (
              <div key={project.projectId}>
                <div
                  className="grid grid-cols-5 gap-4 p-4 mt-6 border rounded-lg shadow-sm items-center text-center bg-[#0000cd] text-[#eff8fb] text-lg cursor-pointer"
                  onClick={() => handleExpand(project.projectId)}
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
                    checked={!!state.finish}
                    onChange={e => {
                      e.stopPropagation();
                      handleCheckboxChange(project.projectId, 'finish');
                    }}
                    onClick={e => e.stopPropagation()}
                  />
                </div>
                {/* Expand alanı */}
                {expanded[project.projectId] && (
                  <div className="bg-white border border-t-0 rounded-b-lg px-8 py-4 flex flex-col gap-4 animate-fade-in">
                    <label className="flex items-center gap-2 text-[#0000cd] text-lg">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-[#0000cd]"
                        checked={!!state.personnel}
                        onChange={e => handleCheckboxChange(project.projectId, 'personnel')}
                      />
                      Personel Girişi
                    </label>
                    <label className="flex items-center gap-2 text-[#0000cd] text-lg">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-[#0000cd]"
                        checked={!!state.phase}
                        onChange={e => handleCheckboxChange(project.projectId, 'phase')}
                      />
                      Faz Yapım Aşaması
                    </label>
                  </div>
                )}
                <div className="mt-1">
                  <ProgressBar completed={getProgress(state)} bgColor="#FFC000" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
