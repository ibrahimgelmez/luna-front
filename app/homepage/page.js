'use client';
import React, { useState, useEffect } from 'react';
import NewSidebar from '../components/NewSideBar/page';
import { FaBell } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const Card = ({ title, projects, todos, onToggleTodo }) => {
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
      {todos &&
        todos.map((todo, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => onToggleTodo(index, todo.id)}
              className="mr-2 h-4 w-4 text-[#0000cd] border-gray-300 rounded focus:ring-[#0000cd]"
            />
            <span
              className={`text-black ${
                todo.checked ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.todo} - {todo.date}
            </span>
          </div>
        ))}
    </div>
  );
};

const Homepage = () => {
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState([]);
  const { bearerKey } = useAuth();

  useEffect(() => {
    // Todo verilerini çek
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://217.195.207.244:8081/calendars', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Todo verileri alınamadı');
        const data = await response.json();
        setTodos(data._embedded.calendars);
      } catch (error) {
        console.error('Todo verileri alınırken hata oluştu:', error);
      }
    };

    // Proje verilerini çek
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://217.195.207.244:8081/projects', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Proje verileri alınamadı');
        const data = await response.json();
        // Sadece devam eden projeleri filtrele
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

  const handleToggleTodo = async (index, id) => {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;
    setTodos(updatedTodos);

    // API'ye checked durumunu güncelle
    try {
      const response = await fetch(
        `http://217.195.207.244:8081/calendars/${id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            checked: updatedTodos[index].checked,
          }),
        }
      );
      if (!response.ok) throw new Error('Todo güncellenemedi');
      console.log('Todo başarıyla güncellendi');
    } catch (error) {
      console.error('Todo güncellenirken hata oluştu:', error);
      // Hata durumunda eski duruma geri dön
      updatedTodos[index].checked = !updatedTodos[index].checked;
      setTodos([...updatedTodos]);
    }
  };

  return (
    <div className="flex h-full w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-[5%] h-full">
        <NewSidebar />
      </div>

      {/* Ana İçerik */}
      <div className="flex-1 p-6 pt-8 px-32 mx-auto bg-gray-100 h-full">
        <div className="flex h-full">
          <div className="w-full p-5 flex flex-col">
            <div className="flex justify-between items-center relative">
              <h1 className="mb-5 text-[40px] font-bold text-[#0000cd]">
                Hoşgeldiniz!
              </h1>
              {/* Bildirim ikonu sağ üst köşeye sabitlenmiş şekilde */}
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
                onToggleTodo={handleToggleTodo}
              />
              <Card
                title="Tamamlanan Projeler"
                projects={['Proje 1', 'Proje 2', 'Proje 3']} // Bu kısım da dinamik olabilir, gerekirse API'den çekilir
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
