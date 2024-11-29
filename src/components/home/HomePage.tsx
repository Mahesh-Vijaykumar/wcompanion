import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Map, AlertTriangle, Users, Bell, Phone } from 'lucide-react';

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <Shield className="h-16 w-16 text-indigo-600 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-900">
          Geo-Smart Women Safety Companion
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your trusted companion for personal safety. Navigate confidently with real-time safety insights and community support.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/map"
          className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Map className="h-8 w-8 text-indigo-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Safety Map</h3>
            <p className="text-gray-600">View safety scores and incident reports in your area</p>
          </div>
        </Link>

        <Link
          to="/report"
          className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <AlertTriangle className="h-8 w-8 text-red-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Report Incident</h3>
            <p className="text-gray-600">Submit a safety concern or incident report</p>
          </div>
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Support</h3>
          <p className="text-gray-600">
            Join a network of users sharing real-time safety updates and supporting each other.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bell className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Alerts</h3>
          <p className="text-gray-600">
            Receive instant notifications about safety concerns in your vicinity.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Phone className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency SOS</h3>
          <p className="text-gray-600">
            Quick access to emergency contacts and services when you need them most.
          </p>
        </div>
      </div>

      {/* Emergency Button */}
      <div className="text-center">
        <button
          onClick={() => alert('Emergency contacts would be notified.')}
          className="px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg"
        >
          SOS Emergency
        </button>
      </div>
    </div>
  );
}