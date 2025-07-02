'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Admin() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showListPopup, setShowListPopup] = useState(false);
  const [showProjectsPopup, setShowProjectsPopup] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const { bearerKey, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not admin
    if (user !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        'https://server.lunaproject.com.tr/users',
        {
          headers: { Authorization: `Bearer ${bearerKey}` },
        }
      );
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies', error);
    }
  };

  const fetchAllProjects = async () => {
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
        throw new Error('Projects could not be loaded');
      }
      const data = await response.json();

      if (data._embedded && data._embedded.projects) {
        setProjects(data._embedded.projects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    }
  };

  const addCompany = async () => {
    try {
      await axios.post(
        'https://server.lunaproject.com.tr/register',
        { username, password },
        { headers: { Authorization: `Bearer ${bearerKey}` } }
      );
      setShowAddPopup(false);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error adding company', error);
    }
  };

  const deleteCompany = async (id) => {
    try {
      await axios.delete(`https://server.lunaproject.com.tr/delete/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company', error);
    }
  };

  const getProgress = (project) => {
    const personnel = project.personelGirisi || false;
    const phase = project.fazYapimAsamasi || false;
    const finish = project.bitirmeTalebi || false;
    
    if (personnel && !phase && !finish) return 25;
    if (personnel && phase && !finish) return 75;
    if (personnel && phase && finish) return 100;
    return 0;
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedProjects = () => {
    const projectsCopy = [...projects];
    if (!sortConfig.key) return projectsCopy;

    return projectsCopy.sort((a, b) => {
      if (sortConfig.key === 'userId') {
        if (a.userId < b.userId) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a.userId > b.userId) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }
      
      if (sortConfig.key === 'startDate' || sortConfig.key === 'endDate') {
        const dateA = a[sortConfig.key] || a[`project${sortConfig.key.charAt(0).toUpperCase() + sortConfig.key.slice(1)}`] || '';
        const dateB = b[sortConfig.key] || b[`project${sortConfig.key.charAt(0).toUpperCase() + sortConfig.key.slice(1)}`] || '';
        
        if (!dateA) return sortConfig.direction === 'ascending' ? 1 : -1;
        if (!dateB) return sortConfig.direction === 'ascending' ? -1 : 1;
        
        return sortConfig.direction === 'ascending' 
          ? new Date(dateA) - new Date(dateB)
          : new Date(dateB) - new Date(dateA);
      }
      
      if (sortConfig.key === 'status') {
        const statusA = a.projectStatus === 'completed' ? 1 : 0;
        const statusB = b.projectStatus === 'completed' ? 1 : 0;
        
        return sortConfig.direction === 'ascending' 
          ? statusA - statusB
          : statusB - statusA;
      }
      
      return 0;
    });
  };

  const getSortIcon = (name) => {
    if (sortConfig.key !== name) {
      return <FaSort className="inline ml-1" />;
    }
    return sortConfig.direction === 'ascending' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />;
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  if (user !== 'admin') {
    return null; // Don't render anything if not admin
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0000cd]">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setShowAddPopup(true)}
          className="bg-[#eaf1f7] text-[#00186e] text-3xl px-16 py-12 rounded-lg hover:bg-blue-600"
        >
          +
        </button>
        <button
          onClick={() => {
            fetchCompanies();
            setShowListPopup(true);
          }}
          className="bg-[#eaf1f7] text-[#00186e] text-3xl px-16 py-12 rounded-lg hover:bg-red-600"
        >
          -
          </button>
        </div>
        <button
          onClick={() => {
            fetchAllProjects();
            setShowProjectsPopup(true);
          }}
          className="bg-[#eaf1f7] text-[#00186e] px-8 py-4 rounded-lg hover:bg-green-600 text-xl font-bold w-full"
        >
          View All Projects
        </button>
      </div>

      {showAddPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl text-black font-bold mb-4">Add Company</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border text-black p-2 w-full mb-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border text-black p-2 w-full mb-2 rounded-md"
            />
            <button
              onClick={addCompany}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Add Company
            </button>
            <button
              onClick={() => setShowAddPopup(false)}
              className="ml-2 text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showListPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[36%] max-h-[90vh] flex flex-col">
            <h2 className="text-xl text-black font-bold mb-4">Company List</h2>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border text-black p-2 w-full mb-2 rounded-md"
            />
            <ul className="overflow-y-auto max-h-[50vh]">
              {companies
                .filter((c) => c.username.includes(search))
                .map((company) => (
                  <li
                    key={company.id}
                    className="flex justify-between text-black items-center p-2 border-b"
                  >
                    <span>{company.username}</span>
                    <FaTrash
                      onClick={() => deleteCompany(company.id)}
                      className="text-gray-500 hover:text-red-500 cursor-pointer mr-8"
                    />
                  </li>
                ))}
            </ul>
            <button
              onClick={() => setShowListPopup(false)}
              className="mt-4 text-red-500 border-2 border-red-500 rounded-lg px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showProjectsPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-h-[90vh] flex flex-col">
            <h2 className="text-xl text-black font-bold mb-4">All Projects</h2>
            <input
              type="text"
              placeholder="Search projects..."
              value={projectSearch}
              onChange={(e) => setProjectSearch(e.target.value)}
              className="border text-black p-2 w-full mb-2 rounded-md"
            />
            <div className="overflow-y-auto max-h-[60vh]">
              <table className="min-w-full bg-white text-black">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Proje Adı</th>
                    <th 
                      className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('userId')}
                    >
                      Kullanıcı {getSortIcon('userId')}
                    </th>
                    <th 
                      className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('startDate')}
                    >
                      Başlangıç Tarihi {getSortIcon('startDate')}
                    </th>
                    <th 
                      className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('endDate')}
                    >
                      Bitiş Tarihi {getSortIcon('endDate')}
                    </th>
                    <th 
                      className="py-2 px-4 border-b text-left cursor-pointer hover:bg-gray-200"
                      onClick={() => requestSort('status')}
                    >
                      Durum {getSortIcon('status')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedProjects()
                    .filter((project) => 
                      project.projectName?.toLowerCase().includes(projectSearch.toLowerCase()) ||
                      project.userId?.toLowerCase().includes(projectSearch.toLowerCase())
                    )
                    .map((project) => (
                      <tr 
                        key={project.id} 
                        className="hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleProjectSelect(project)}
                      >
                        <td className="py-2 px-4 border-b">{project.projectName}</td>
                        <td className="py-2 px-4 border-b">{project.userId}</td>
                        <td className="py-2 px-4 border-b">
                          {project.projectStartDate 
                            ? new Date(project.projectStartDate).toLocaleDateString('tr-TR') 
                            : project.startDate 
                              ? new Date(project.startDate).toLocaleDateString('tr-TR')
                              : '-'}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {project.projectEndDate 
                            ? new Date(project.projectEndDate).toLocaleDateString('tr-TR') 
                            : project.endDate
                              ? new Date(project.endDate).toLocaleDateString('tr-TR')
                              : '-'}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <span className={`px-2 py-1 rounded-full text-xs ${
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
            <button
              onClick={() => {
                setShowProjectsPopup(false);
                setSelectedProject(null);
              }}
              className="mt-4 text-red-500 border-2 border-red-500 rounded-lg px-4 py-2 self-end"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl text-black font-bold mb-4">
              Proje Detayı: {selectedProject.projectName}
            </h2>
            
            {/* Detay Görünümü */}
            <div className="bg-white rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                  {/* Sol sütun */}
                  <div>
                    <h2 className="text-lg font-semibold text-[#0000cd] mb-2">
                      Proje Adı
                    </h2>
                    <p className="text-black">{selectedProject.projectName}</p>

                    <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                      Kullanıcı
                    </h2>
                    <p className="text-black">{selectedProject.userId}</p>

                    <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                      Başlangıç Tarihi
                    </h2>
                    <p className="text-black">
                      {selectedProject.projectStartDate ? new Date(selectedProject.projectStartDate).toLocaleDateString('tr-TR') : 
                       selectedProject.startDate ? new Date(selectedProject.startDate).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
                    </p>

                    <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                      Bitiş Tarihi
                    </h2>
                    <p className="text-black">
                      {selectedProject.projectEndDate ? new Date(selectedProject.projectEndDate).toLocaleDateString('tr-TR') : 
                       selectedProject.endDate ? new Date(selectedProject.endDate).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
                    </p>

                    <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                      Proje Türü
                    </h2>
                    <p className="text-black">{selectedProject.projectType || 'Belirtilmemiş'}</p>

                    <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                      Proje Durumu
                    </h2>
                    <p className={`inline-block px-3 py-1 rounded-full ${
                      selectedProject.projectStatus === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedProject.projectStatus === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
                    </p>
                  </div>

                  {/* Sağ sütun */}
                  <div>
                    <h2 className="text-lg font-semibold text-[#0000cd] mb-2">
                      Proje Özeti
                    </h2>
                    <p className="text-black">{selectedProject.projectSummary || selectedProject.description || 'Belirtilmemiş'}</p>

                    <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                      Proje Amacı
                    </h2>
                    <p className="text-black">{selectedProject.projectPurpose || 'Belirtilmemiş'}</p>

                    <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                      Sektör
                    </h2>
                    <p className="text-black">{selectedProject.projectSector || 'Belirtilmemiş'}</p>

                    <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                      Proje Ekibi
                    </h2>
                    {selectedProject.projectTeam ? (
                      <ul className="list-disc list-inside text-black">
                        {Array.isArray(selectedProject.projectTeam) ? 
                          selectedProject.projectTeam.map((member, index) => (
                            <li key={index}>{member}</li>
                          )) : 
                          <li>{selectedProject.projectTeam}</li>
                        }
                      </ul>
                    ) : (
                      <p className="text-black">{selectedProject.team || 'Belirtilmemiş'}</p>
                    )}

                    <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                      Proje Bütçesi
                    </h2>
                    <p className="text-black">
                      {selectedProject.projectBudget 
                        ? `${Number(selectedProject.projectBudget).toLocaleString()} ₺` 
                        : 'Belirtilmemiş'}
                    </p>

                    <h2 className="text-lg font-semibold text-[#0000cd] mt-4 mb-2">
                      STB Kodu
                    </h2>
                    <p className="text-black">{selectedProject.stbCode || 'Belirtilmemiş'}</p>
                  </div>
                </div>

                {/* Durum Bilgileri */}
                <div className="mt-8 border-t pt-6 border-gray-200">
                  <h2 className="text-xl font-bold text-[#0000cd] mb-4">Proje Durumu</h2>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <h3 className="font-semibold text-[#0000cd]">Personel Girişi</h3>
                      <p className="text-black">{selectedProject.personelGirisi ? 'Evet' : 'Hayır'}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <h3 className="font-semibold text-[#0000cd]">Faz Yapım Aşaması</h3>
                      <p className="text-black">{selectedProject.fazYapimAsamasi ? 'Evet' : 'Hayır'}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <h3 className="font-semibold text-[#0000cd]">Bitirme Talebi</h3>
                      <p className="text-black">{selectedProject.bitirmeTalebi ? 'Evet' : 'Hayır'}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <h3 className="font-semibold text-[#0000cd]">Ek Süre Tarihi</h3>
                      <p className="text-black">
                        {selectedProject.ekSureTarihi 
                          ? new Date(selectedProject.ekSureTarihi).toLocaleDateString('tr-TR') 
                          : 'Belirlenmedi'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t pt-6 border-gray-200">
                  <h2 className="text-xl font-bold text-[#0000cd] mb-4">İlerleme Bilgisi</h2>
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div 
                      className="bg-[#0000cd] h-5 rounded-full" 
                      style={{ width: `${getProgress(selectedProject)}%` }}
                    ></div>
                  </div>
                  <p className="text-black mt-2 text-right font-bold">
                    {getProgress(selectedProject)}% Tamamlandı
                  </p>
                </div>
              </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowProjectsPopup(false);
                  setSelectedProject(null);
                }}
                className="text-red-500 border-2 border-red-500 rounded-lg px-4 py-2 hover:bg-red-50 transition"
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
