'use client';
import React, { useState, useEffect } from 'react';
import NewSidebar from '../components/NewSideBar/page';
import { FaBell } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const Card = ({ title, projects, todos, onDeleteTodo }) => {
  return (
    <div className="bg-white h-[300px] p-5 rounded shadow overflow-auto">
      <h4 className="text-xl font-semibold text-[#0000cd] mb-3">{title}</h4>
      {projects &&
        projects.map((project, index) => (
          <a
            key={index}
            href="#"
            className="block text-blue-600 font-semibold hover:underline mb-2"
          >
            {project.projectName} - {project.stbCode}
          </a>
        ))}
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
  const { bearerKey } = useAuth();

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
        const ongoingProjects = data._embedded.projects.filter(
          (project) => project.projectStatus === 'Devam Ediyor'
        );
        setProjects(ongoingProjects);
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
    <div className="flex h-full w-full bg-gray-100">
      <div className="w-[5%] h-full">
        <NewSidebar />
      </div>
      <div className="flex-1 p-6 pt-8 px-32 mx-auto bg-gray-100 h-full">
        <div className="flex h-full">
          <div className="w-full p-5 flex flex-col">
            <div className="flex justify-between items-center relative">
              <h1 className="mb-5 text-[40px] font-bold text-[#0000cd]">
                Hoşgeldiniz!
              </h1>
              <div className="absolute top-4 right-4">
                <FaBell className="text-3xl text-[#0000cd] cursor-pointer hover:text-[#0000cd]" />
              </div>
            </div>
            <hr className="my-4 border-gray-100" />
            <div className="grid grid-cols-1 gap-4">
              <Card title="Devam Eden Projeler" projects={projects} />
              <Card
                title="Yapılması Gerekenler"
                todos={todos}
                onDeleteTodo={handleDeleteTodo}
              />
              <Card
                title="Tamamlanan Projeler"
                projects={['Proje 1', 'Proje 2', 'Proje 3']}
              />
            </div>
            <footer className="mt-auto py-5 text-center border-t border-blue-900">
              <div className="flex justify-center items-center space-x-3">
                <img src="logo.png" alt="Şirket Logosu" className="w-12 h-12" />
                <h3 className="text-lg font-semibold text-blue-900">
                  Şirket Adı
                </h3>
              </div>
              <p className="text-blue-900 text-sm mt-2">
                Şirket Tanıtım Yazısı
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
