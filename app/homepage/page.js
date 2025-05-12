'use client';
import React, { useState, useEffect } from 'react';
import NewSidebar from '../components/NewSideBar/page';
import { FaBell } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Card = ({ title, projects, todos, onDeleteTodo }) => {
  return (
    <div className="bg-white h-[700px] p-5 rounded shadow overflow-auto">
      <h4 className="text-xl font-semibold text-[#0000cd] mb-3">{title}</h4>
      {projects &&
        projects.map((project, index) => {
          const projectId = project._links?.self?.href?.split('/').pop();
          return (
            <Link
              key={index}
              href={projectId ? `/project-detail/${projectId}` : '#'}
              className="block text-blue-600 font-semibold hover:underline mb-2"
            >
              {project.projectName} {project.stbCode && `- ${project.stbCode}`}
            </Link>
          );
        })}
      {todos && todos.length > 0 ? (
        todos.map((todo, index) => (
          <div
            key={index}
            className="flex items-center mb-2 cursor-pointer"
            onClick={() => onDeleteTodo(index, todo.id)}
          >
            <input
              type="checkbox"
              checked={todo.checked}
              readOnly
              className="mr-2 h-4 w-4 text-[#0000cd] border-gray-300 rounded"
            />
            <span
              className={`text-black ${
                todo.checked ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.todo} - {todo.date}
            </span>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

const Homepage = () => {
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const { bearerKey, user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    const fetchTodos = async () => {
      try {
        const response = await fetch(
          'https://server.lunaproject.com.tr/calendars',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${bearerKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) throw new Error('Todo verileri alınamadı');
        const data = await response.json();
        const todayTodos = data._embedded.calendars.filter(
          (todo) => todo.date === today
        );
        setTodos(todayTodos);
      } catch (error) {
        console.error('Todo verileri alınırken hata oluştu:', error);
      }
    };

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
        if (!response.ok) throw new Error('Proje verileri alınamadı');
        const data = await response.json();
        
        console.log('Tüm projeler:', data._embedded.projects);
        console.log('Mevcut kullanıcı:', user);
        
        // Sadece kullanıcıya ait devam eden projeleri filtreleme
        const ongoingProjects = data._embedded.projects.filter(
          (project) => project.projectStatus === 'Devam Ediyor' && project.userId === user
        );
        
        // Tamamlanmış projeleri filtreleme
        const userCompletedProjects = data._embedded.projects.filter(
          (project) => project.projectStatus === 'completed' && project.userId === user
        );
        
        console.log('Devam eden projeler:', ongoingProjects);
        console.log('Tamamlanan projeler:', userCompletedProjects);
        
        // Tüm projeleri göster, herhangi bir limit olmadan
        setProjects(ongoingProjects);
        setCompletedProjects(userCompletedProjects);
      } catch (error) {
        console.error('Proje verileri alınırken hata oluştu:', error);
      }
    };

    if (bearerKey) {
      fetchTodos();
      fetchProjects();
    }
  }, [bearerKey]);

  const handleDeleteTodo = async (index, id) => {
    const confirmDelete = window.confirm(
      "Bu todo'yu silmek istediğinize emin misiniz?"
    );
    if (!confirmDelete) return;

    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);

    try {
      const response = await fetch(
        `https://server.lunaproject.com.tr/calendars/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) throw new Error('Todo silinirken hata oluştu');
      console.log('Todo başarıyla silindi');
    } catch (error) {
      console.error('Todo silinirken hata oluştu:', error);
      setTodos(todos); // Hata olursa geri yükle
    }
  };

  return (
    <div className="flex h-full w-full bg-[#EDF7FA]">
      <div className="w-[5%] h-full">
        <NewSidebar />
      </div>
      <div className="flex-1 p-6 pt-8 px-32 mx-auto bg-[#EDF7FA] h-full">
        <div className="flex h-full">
          <div className="w-full p-5 flex flex-col">
            <div className="flex justify-between items-center relative">
              <h1 className="mb-5 text-[40px] font-bold text-[#0000cd]">
                Hoşgeldiniz!
              </h1>
              <div className="absolute top-4 right-4">
                <div className="relative">
                  <FaBell 
                    className="text-3xl text-[#0000cd] cursor-pointer hover:text-[#0000cd]" 
                    onClick={() => setShowNotifications(!showNotifications)}
                  />
                  {todos.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {todos.length}
                    </span>
                  )}
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 overflow-hidden">
                      <div className="py-2 px-3 bg-[#0000cd] text-white font-semibold">
                        Bugünkü İşleriniz
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {todos.length > 0 ? (
                          todos.map((todo, index) => (
                            <div key={index} className="border-b border-gray-100 py-2 px-3 hover:bg-gray-50">
                              <div className="flex items-center">
                                <span className={`${todo.checked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                  {todo.todo} - {todo.date}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-3 px-3 text-gray-500 text-center">
                            Bugün için planlanmış bir iş yok
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <hr className="my-4 border-gray-100" />
            <div className="grid grid-cols-3 gap-4">
              <Card title="Devam Eden Projeler" projects={projects} />
              <Card
                title="Yapılması Gerekenler"
                todos={todos}
                onDeleteTodo={handleDeleteTodo}
              />
              <Card
                title="Tamamlanan Projeler"
                projects={completedProjects}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
