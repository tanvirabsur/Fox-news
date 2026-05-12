"use client";
import React, { useState } from 'react';
import { Settings, Bell, Database, Key, Shield, FileText, Save, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [apiKey, setApiKey] = useState('sk-7x9k2m5p8q1r4t6w9y0z');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleExportData = (format: 'json' | 'csv' | 'pdf') => {
    alert(`Exporting data as ${format.toUpperCase()}...`);
    // Implementation would go here
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg text-white">
            <Settings size={24} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Settings & Preferences</h1>
        </div>
        <p className="text-gray-600">Manage your account settings, notifications, and advanced options</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-indigo-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive email updates about articles and system alerts</p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex items-center w-14 h-8 rounded-full transition-colors ${
                emailNotifications ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-6 h-6 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Get real-time notifications in your browser</p>
            </div>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`relative inline-flex items-center w-14 h-8 rounded-full transition-colors ${
                pushNotifications ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-6 h-6 transform rounded-full bg-white transition-transform ${
                  pushNotifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Auto Backup</p>
              <p className="text-sm text-gray-600">Automatically backup data daily at 2:00 AM</p>
            </div>
            <button
              onClick={() => setAutoBackup(!autoBackup)}
              className={`relative inline-flex items-center w-14 h-8 rounded-full transition-colors ${
                autoBackup ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block w-6 h-6 transform rounded-full bg-white transition-transform ${
                  autoBackup ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="text-indigo-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Export Data</h2>
        </div>

        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-2">
          <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
          <p className="text-sm text-blue-900">Download all your data in various formats. This may take a few minutes depending on data size.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleExportData('json')}
            className="p-6 border border-gray-300 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all text-center"
          >
            <FileText className="mx-auto text-indigo-600 mb-3" size={28} />
            <p className="font-semibold text-gray-900">JSON Format</p>
            <p className="text-xs text-gray-600 mt-1">Structured data format</p>
          </button>

          <button
            onClick={() => handleExportData('csv')}
            className="p-6 border border-gray-300 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all text-center"
          >
            <Database className="mx-auto text-indigo-600 mb-3" size={28} />
            <p className="font-semibold text-gray-900">CSV Format</p>
            <p className="text-xs text-gray-600 mt-1">Spreadsheet compatible</p>
          </button>

          <button
            onClick={() => handleExportData('pdf')}
            className="p-6 border border-gray-300 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all text-center"
          >
            <FileText className="mx-auto text-indigo-600 mb-3" size={28} />
            <p className="font-semibold text-gray-900">PDF Report</p>
            <p className="text-xs text-gray-600 mt-1">Professional document</p>
          </button>
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Key className="text-indigo-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">API Configuration</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">API Key</label>
            <div className="flex gap-2">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                readOnly
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
              >
                {showApiKey ? 'Hide' : 'Show'}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(apiKey);
                  alert('API key copied to clipboard!');
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">Use this key to authenticate API requests</p>
          </div>

          <div>
            <button className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-semibold">
              Regenerate API Key
            </button>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Available Endpoints</h3>
          <div className="space-y-2 text-sm font-mono bg-gray-900 text-gray-100 p-4 rounded-lg">
            <div><span className="text-green-400">GET</span> /api/articles</div>
            <div><span className="text-blue-400">POST</span> /api/articles/generate</div>
            <div><span className="text-yellow-400">PUT</span> /api/articles/{'{id}'}</div>
            <div><span className="text-red-400">DELETE</span> /api/articles/{'{id}'}</div>
            <div><span className="text-green-400">GET</span> /api/analytics/stats</div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-md border border-indigo-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-indigo-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">Security</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
            <p className="text-sm text-gray-600 mt-1">Enabled ✓</p>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold mt-2">Manage</button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900">Last Password Change</p>
            <p className="text-sm text-gray-600 mt-1">45 days ago</p>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold mt-2">Change Password</button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold text-gray-900">Active Sessions</p>
            <p className="text-sm text-gray-600 mt-1">2 active sessions</p>
            <button className="text-sm text-red-600 hover:text-red-700 font-semibold mt-2">Sign Out All</button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors">
          Cancel
        </button>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
