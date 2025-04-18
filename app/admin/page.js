'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showListPopup, setShowListPopup] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { bearerKey, user } = useAuth();

  const router = useRouter();

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0000cd] ">
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

      {showAddPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl text-black font-bold mb-4">Company List</h2>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border text-black p-2 w-full mb-2 rounded-md"
            />
            <ul>
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
                      className="text-gray-500 hover:text-red-500 cursor-pointer"
                    />
                  </li>
                ))}
            </ul>
            <button
              onClick={() => setShowListPopup(false)}
              className="mt-4 text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
