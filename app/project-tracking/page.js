'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import NewSidebar from '../components/NewSideBar/page';
import ProgressBar from '@ramonak/react-progress-bar';
import axios from 'axios';

export default function ProjectTracking() {
  const [projects, setProjects] = useState([]);
  const { bearerKey, user } = useAuth();
  const [expanded, setExpanded] = useState({});
  const [projectStates, setProjectStates] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://server.lunaproject.com.tr/projects', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Proje verileri alınamadı: ${response.status}`);
        }

        const data = await response.json();
        console.log('Backend verisi:', data);
        const filteredProjects = data._embedded.projects.filter(
          (project) => project.projectStatus === 'completed' && project.userId === user
        );
        setProjects(filteredProjects);

        const initialStates = {};
        filteredProjects.forEach((project) => {
          initialStates[project.projectId] = {
            personnel: project.personelGirisi || false,
            phase: project.fazYapimAsamasi || false,
            finish: project.bitirmeTalebi || false,
          };
        });
        setProjectStates(initialStates);
      } catch (error) {
        console.error('Proje verileri alınamadı:', error);
        alert('Proje verileri yüklenemedi: ' + error.message);
      }
    };

    if (bearerKey && user) {
      fetchProjects();
    }
  }, [bearerKey, user]);

  const handleExpand = (projectId) => {
    setExpanded((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const handleCheckboxChange = async (projectId, field) => {
    const newValue = !projectStates[projectId]?.[field];
    setProjectStates((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [field]: newValue,
      },
    }));

    const project = projects.find((p) => p.projectId === projectId);
    if (!project) return;

    const fieldMap = {
      personnel: 'personelGirisi',
      phase: 'fazYapimAsamasi',
      finish: 'bitirmeTalebi',
    };
    const backendField = fieldMap[field];
    if (!backendField) return;

    // Prepare a simplified project object with only necessary fields
    const updatedProject = {
      projectName: project.projectName,
      projectSummary: project.projectSummary,
      projectType: project.projectType,
      projectTeam: project.projectTeam,
      stbCode: project.stbCode,
      projectPurpose: project.projectPurpose,
      projectSector: project.projectSector,
      projectBudget: project.projectBudget,
      userId: project.userId,
      projectStatus: project.projectStatus,
      projectStartDate: project.projectStartDate ? new Date(project.projectStartDate).toISOString().split('T')[0] : null,
      projectEndDate: project.projectEndDate ? new Date(project.projectEndDate).toISOString().split('T')[0] : null,
      personelGirisi: field === 'personnel' ? newValue : projectStates[projectId]?.personnel ?? false,
      fazYapimAsamasi: field === 'phase' ? newValue : projectStates[projectId]?.phase ?? false,
      bitirmeTalebi: field === 'finish' ? newValue : projectStates[projectId]?.finish ?? false,
      ekSureTarihi: project.ekSureTarihi ? new Date(project.ekSureTarihi).toISOString().split('T')[0] : null,
    };

    try {
      // Sending the PUT request with correct data
      const res = await axios.put(
        `https://server.lunaproject.com.tr/projects/${projectId}`,
        updatedProject,
        {
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.status < 200 || res.status >= 300) {
        throw new Error(`Sunucuya kaydedilemedi: ${res.status}`);
      }

      // Updating the local project state after success
      setProjects((prev) =>
        prev.map((p) =>
          p.projectId === projectId ? { ...p, ...updatedProject } : p
        )
      );

      setProjectStates((prev) => ({
        ...prev,
        [projectId]: {
          personnel: updatedProject.personelGirisi || false,
          phase: updatedProject.fazYapimAsamasi || false,
          finish: updatedProject.bitirmeTalebi || false,
        },
      }));
    } catch (err) {
      console.error('Değişiklik kaydedilemedi:', err);
      alert('Değişiklik kaydedilemedi: ' + err.message);
    }
  };

  const getProgress = (state) => {
    if (state.personnel && !state.phase && !state.finish) return 25;
    if (state.personnel && state.phase && !state.finish) return 75;
    if (state.personnel && state.phase && state.finish) return 100;
    return 0;
  };

  return (
    <div className="p-4 pt-16 px-32 mx-auto bg-[#eff8fb] h-[100vh]">
      <NewSidebar />
      <h1 className="text-[38px] font-bold text-[#0000cd] mb-12">
        Proje Takip ve Talepler
      </h1>
      <div className="space-y-4">
        <div className="grid grid-cols-6 gap-4 font-bold border-b border-gray-400 pb-4 text-center items-center text-[18px] text-[#0000cd]">
          <span className="text-center">Proje Adı</span>
          <span className="text-center">Başlangıç Tarihi</span>
          <span className="text-center">Bitiş Tarihi</span>
          <span className="text-center">Ek Süre Tarihi</span>
          <span className="text-center">Proje Türü</span>
          <span className="text-center">Bitirme Talebi</span>
        </div>
        <div className="max-h-[600px] h-[75vh] overflow-y-auto">
          {projects.map((project) => {
            const state = projectStates[project.projectId] || {};
            return (
              <div key={project.projectId}>
                <div
                  className="grid grid-cols-6 gap-4 p-4 mt-6 border rounded-lg shadow-sm items-center text-center bg-[#0000cd] text-[#eff8fb] text-lg cursor-pointer"
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
                  <span className="text-center">
                    {project.ekSureTarihi 
                      ? new Date(project.ekSureTarihi).toLocaleDateString() 
                      : "Belirlenmedi"}
                  </span>
                  <span className="text-center">{project.projectType}</span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#0000cd] mx-auto"
                    checked={!!state.finish}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(project.projectId, 'finish');
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                {expanded[project.projectId] && (
                  <div className="bg-white border border-t-0 rounded-b-lg px-8 py-4 flex flex-col gap-4 animate-fade-in">
                    <label className="flex items-center gap-2 text-[#0000cd] text-lg">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-[#0000cd]"
                        checked={!!state.personnel}
                        onChange={() => handleCheckboxChange(project.projectId, 'personnel')}
                      />
                      Personel Girişi
                    </label>
                    <label className="flex items-center gap-2 text-[#0000cd] text-lg">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-[#0000cd]"
                        checked={!!state.phase}
                        onChange={() => handleCheckboxChange(project.projectId, 'phase')}
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
