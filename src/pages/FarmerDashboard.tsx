import React from 'react';
export default function FarmerDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">किसान डैशबोर्ड</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold">कुल पक्षी</h3>
          <p className="text-2xl font-bold text-blue-600">250</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold">आज का खाना</h3>
          <p className="text-2xl font-bold text-green-600">50kg</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-bold">स्वास्थ्य सूचकांक</h3>
          <p className="text-2xl font-bold text-yellow-600">95%</p>
        </div>
      </div>
    </div>
  );
}
