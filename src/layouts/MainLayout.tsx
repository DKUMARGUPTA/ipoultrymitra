import React from 'react';
export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-900 text-white p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8">PoultryMitra</h2>
        <ul className="space-y-4">
          <li><a href="/dashboard" className="hover:text-blue-400 transition">Dashboard</a></li>
          <li><a href="/inventory" className="hover:text-blue-400 transition">Inventory</a></li>
          <li><a href="/reports" className="hover:text-blue-400 transition">Reports</a></li>
          <li><a href="/farmer" className="hover:text-blue-400 transition">Farmer</a></li>
          <li><a href="/dealer" className="hover:text-blue-400 transition">Dealer</a></li>
          <li><a href="/settings" className="hover:text-blue-400 transition">Settings</a></li>
        </ul>
      </nav>
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">Main Content</div>
      </main>
    </div>
  );
}
