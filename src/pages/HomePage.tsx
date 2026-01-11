import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">PoultryMitra</h1>
          <p className="text-xl text-gray-600 mb-8">आपके पोल्ट्री व्यवसार का डिजिटल साथी</p>
          <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            शुरू करें
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">इन्वेंटरी प्रबंधन</h3>
            <p className="text-gray-600">अपने पोल्ट्री इन्वेंटरी को आसानी से ट्रैक करें</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">बाजार विश्लेषण</h3>
            <p className="text-gray-600">रीयल-टाइम बाजार डेटा और कीमतें देखें</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">विशेषज्ञ सलाह</h3>
            <p className="text-gray-600">पशु चिकित्सकों से सलाह प्राप्त करें</p>
          </div>
        </div>
      </div>
    </div>
  );
}
