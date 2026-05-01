"use client";
import Image from 'next/image';
import { Ban, MoreVertical, Search, Trash, UserCheck, UserPlus } from 'lucide-react';
import React, { useMemo, useState } from 'react';

// User Interface for Management
interface PortalUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Author' | 'Artist';
  status: 'Active' | 'Blocked';
  joinedDate: string;
  avatar: string;
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<'All' | PortalUser['role']>('All');

  // Mock User Management Data
  const [users, setUsers] = useState<PortalUser[]>([
    { id: '1', name: 'Arif Ahmed', email: 'arif@news.com', role: 'Admin', status: 'Active', joinedDate: '2023-01-15', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arif' },
    { id: '2', name: 'Sakib Khan', email: 'sakib@sports.com', role: 'Author', status: 'Active', joinedDate: '2023-03-20', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sakib' },
    { id: '3', name: 'Nadia Islam', email: 'nadia@tech.com', role: 'Editor', status: 'Active', joinedDate: '2023-02-10', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia' },
    { id: '4', name: 'Tanvir Hossain', email: 'tanvir@artist.com', role: 'Artist', status: 'Active', joinedDate: '2023-05-05', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvir' },
    { id: '5', name: 'Mitu Akter', email: 'mitu@news.com', role: 'Author', status: 'Blocked', joinedDate: '2023-04-12', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mitu' },
  ]);

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
  };

  const deleteUser = (userId: string) => {
    if (confirm('Ei user-ti ki delete korte chan?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const updateRole = (userId: string, newRole: PortalUser['role']) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = [user.name, user.email].some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesRole = selectedRole === 'All' || user.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [searchTerm, selectedRole, users]);

  return (
    <div className="w-[80vw] max-w-screen-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-500">Manage portal roles, permissions, and account status.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/10">
          <UserPlus size={18} className="mr-2" /> Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">Total Users</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">Active Users</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">{users.filter((user) => user.status === 'Active').length}</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">Blocked Users</p>
          <p className="mt-2 text-3xl font-bold text-red-600">{users.filter((user) => user.status === 'Blocked').length}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as 'All' | PortalUser['role'])}
          className="w-full lg:w-56 p-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Author">Author</option>
          <option value="Artist">Artist</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.avatar}
                          alt={`Avatar of ${user.name}`}
                          width={44}
                          height={44}
                          unoptimized
                          className="rounded-full border border-gray-100"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-600">
                        <select
                          value={user.role}
                          onChange={(e) => updateRole(user.id, e.target.value as PortalUser['role'])}
                          className="appearance-none bg-transparent text-blue-600 font-semibold focus:outline-none"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Editor">Editor</option>
                          <option value="Author">Author</option>
                          <option value="Artist">Artist</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.joinedDate}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`p-2 rounded-2xl transition-colors ${user.status === 'Active' ? 'text-orange-500 hover:bg-orange-50' : 'text-green-500 hover:bg-green-50'}`}
                          title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                        >
                          {user.status === 'Active' ? <Ban size={18} /> : <UserCheck size={18} />}
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 rounded-2xl text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete User"
                        >
                          <Trash size={18} />
                        </button>
                        <button className="p-2 rounded-2xl text-gray-400 hover:bg-gray-100 transition-colors" title="More options">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                    No users found. Try a different search term or role.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
