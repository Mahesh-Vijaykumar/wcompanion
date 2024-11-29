import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuthStore();

  return (
    <header className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <span className="font-bold text-xl">SafetyCompanion</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-indigo-200">Home</Link>
            <Link to="/map" className="hover:text-indigo-200">Safety Map</Link>
            <Link to="/report" className="hover:text-indigo-200">Report Incident</Link>
            {user ? (
              <Link to="/profile" className="hover:text-indigo-200">Profile</Link>
            ) : (
              <Link to="/login" className="hover:text-indigo-200">Login</Link>
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 hover:bg-indigo-500 rounded-md">Home</Link>
            <Link to="/map" className="block px-3 py-2 hover:bg-indigo-500 rounded-md">Safety Map</Link>
            <Link to="/report" className="block px-3 py-2 hover:bg-indigo-500 rounded-md">Report Incident</Link>
            {user ? (
              <Link to="/profile" className="block px-3 py-2 hover:bg-indigo-500 rounded-md">Profile</Link>
            ) : (
              <Link to="/login" className="block px-3 py-2 hover:bg-indigo-500 rounded-md">Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}