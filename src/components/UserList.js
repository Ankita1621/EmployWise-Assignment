// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserList.css'; 


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${editingUser}`, formData);
      setUsers(users.map((user) => user.id === editingUser ? { ...user, ...formData } : user));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User List</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>
      </div>

      {editingUser ? (
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white p-2 rounded">Update</button>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full mb-2" />
            <h3 className="font-semibold">{user.first_name} {user.last_name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white p-1 mr-2 rounded">Edit</button>
            <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-gray-200 rounded mr-2">Prev</button>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-200 rounded">Next</button>
      </div>
    </div>
  );
};

export default UserList;
