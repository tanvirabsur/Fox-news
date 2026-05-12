import Image from 'next/image';
import { Camera, LogOut, Mail, MapPin, Phone, ShieldCheck, User } from 'lucide-react';
import React from 'react';

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
        <p className="text-gray-500">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 rounded-full bg-linear-to-tr from-indigo-500 to-indigo-600 p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                  <Image
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arif"
                    alt="Profile"
                    width={128}
                    height={128}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-100 text-indigo-600 hover:bg-gray-50 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Arif Ahmed</h3>
            <p className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mt-2">Senior Editor</p>

            <div className="mt-8 flex justify-around border-t border-gray-50 pt-6">
              <div>
                <p className="text-lg font-bold text-gray-900">128</p>
                <p className="text-xs text-gray-500">Articles</p>
              </div>
              <div className="w-px bg-gray-100 h-10" />
              <div>
                <p className="text-lg font-bold text-gray-900">45K</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="w-px bg-gray-100 h-10" />
              <div>
                <p className="text-lg font-bold text-gray-900">8.2</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-50">
                <ShieldCheck size={18} className="mr-3 text-green-500" /> Two-Factor Auth: <span className="ml-auto font-semibold text-green-600">On</span>
              </button>
              <button className="w-full flex items-center p-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-50">
                <LogOut size={18} className="mr-3" /> Log out from all devices
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Forms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h4 className="font-bold text-gray-900">Personal Information</h4>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 flex items-center">
                  <User size={14} className="mr-2" /> Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Arif Ahmed"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 flex items-center">
                  <Mail size={14} className="mr-2" /> Email Address
                </label>
                <input
                  type="email"
                  defaultValue="arif.ahmed@newsportal.com"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 flex items-center">
                  <Phone size={14} className="mr-2" /> Phone Number
                </label>
                <input
                  type="text"
                  defaultValue="+880 1711-000000"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 flex items-center">
                  <MapPin size={14} className="mr-2" /> Location
                </label>
                <input
                  type="text"
                  defaultValue="Dhaka, Bangladesh"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-600">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Senior Journalist with 10+ years of experience in Political and Economic reporting. Passionate about technology and its impact on modern society."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none"
                />
              </div>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
              <button className="px-6 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
              <button className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-colors">Save Changes</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-900 mb-6 flex items-center">Security & Password</h4>
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="mb-4 md:mb-0">
                <p className="text-sm font-bold text-indigo-900">Change Password</p>
                <p className="text-xs text-indigo-700">Last changed 3 months ago</p>
              </div>
              <button className="px-4 py-2 bg-white text-indigo-600 text-sm font-bold rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors shadow-sm">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
