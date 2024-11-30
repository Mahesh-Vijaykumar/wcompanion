import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuthStore();

  return (
    <header
      style={{ backgroundColor: '#3F51B5', color: '#FFFFFF' }} // Indigo background, white text
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8" style={{ color: '#FFFFFF' }} />
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>SafetyCompanion</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              style={{ color: '#FFFFFF' }}
              className="hover:underline"
            >
              Home
            </Link>
            <Link
              to="/map"
              style={{ color: '#FFFFFF' }}
              className="hover:underline"
            >
              Safety Map
            </Link>
            <Link
              to="/report"
              style={{ color: '#FFFFFF' }}
              className="hover:underline"
            >
              Report Incident
            </Link>
            {user ? (
              <Link
                to="/profile"
                style={{ color: '#FFFFFF' }}
                className="hover:underline"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                style={{ color: '#FFFFFF' }}
                className="hover:underline"
              >
                Login
              </Link>
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" style={{ color: '#FFFFFF' }} />
            ) : (
              <Menu className="h-6 w-6" style={{ color: '#FFFFFF' }} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div
            style={{
              backgroundColor: '#3F51B5', // Indigo
              color: '#FFFFFF', // White
            }}
            className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
          >
            <Link
              to="/"
              className="block px-3 py-2 rounded-md"
              style={{
                backgroundColor: '#3F51B5',
                hoverBackgroundColor: '#5C6BC0', // Lighter Indigo
              }}
            >
              Home
            </Link>
            <Link
              to="/map"
              className="block px-3 py-2 rounded-md"
              style={{
                backgroundColor: '#3F51B5',
                hoverBackgroundColor: '#5C6BC0',
              }}
            >
              Safety Map
            </Link>
            <Link
              to="/report"
              className="block px-3 py-2 rounded-md"
              style={{
                backgroundColor: '#3F51B5',
                hoverBackgroundColor: '#5C6BC0',
              }}
            >
              Report Incident
            </Link>
            {user ? (
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md"
                style={{
                  backgroundColor: '#3F51B5',
                  hoverBackgroundColor: '#5C6BC0',
                }}
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md"
                style={{
                  backgroundColor: '#3F51B5',
                  hoverBackgroundColor: '#5C6BC0',
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
