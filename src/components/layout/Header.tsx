import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuthStore();

  return (
    <header
      style={{ backgroundColor: '#da8581', color: '#FFFFFF' }} // Pink background, white text
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8" style={{ color: '#FFFFFF' }} />
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>SafetyCompanion</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <div className="nav-item-container hover:scale-110 hover:translateY-1 hover:rotate-3 hover:shadow-xl transform transition-all duration-500 ease-in-out">
              <Link
                to="/"
                style={{ color: '#FFFFFF' }}
                className="hover:text-indigo-300"
              >
                Home
              </Link>
            </div>
            <div className="nav-item-container hover:scale-110 hover:translateY-1 hover:rotate-3 hover:shadow-xl transform transition-all duration-500 ease-in-out">
              <Link
                to="/map"
                style={{ color: '#FFFFFF' }}
                className="hover:text-indigo-300"
              >
                Safety Map
              </Link>
            </div>
            <div className="nav-item-container hover:scale-110 hover:translateY-1 hover:rotate-3 hover:shadow-xl transform transition-all duration-500 ease-in-out">
              <Link
                to="/report"
                style={{ color: '#FFFFFF' }}
                className="hover:text-indigo-300"
              >
                Report Incident
              </Link>
            </div>
            {user ? (
              <div className="nav-item-container hover:scale-110 hover:translateY-1 hover:rotate-3 hover:shadow-xl transform transition-all duration-500 ease-in-out">
                <Link
                  to="/profile"
                  style={{ color: '#FFFFFF' }}
                  className="hover:text-indigo-300"
                >
                  Profile
                </Link>
              </div>
            ) : (
              <div className="nav-item-container hover:scale-110 hover:translateY-1 hover:rotate-3 hover:shadow-xl transform transition-all duration-500 ease-in-out">
                <Link
                  to="/login"
                  style={{ color: '#FFFFFF' }}
                  className="hover:text-indigo-300"
                >
                  Login
                </Link>
              </div>
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
              backgroundColor: '#c5bfda', // Pink
              color: '#FFFFFF', // White
            }}
            className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
          >
            <div className="nav-item-container hover:scale-110 hover:translateY-1 hover:rotate-3 hover:shadow-xl transform transition-all duration-500 ease-in-out">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md hover:text-indigo-300"
              >
                Home
              </Link>
            </div>
            <div className="nav-item-container hover:scale-110 hover:translateY-1 hover:rotate-3 hover:shadow-xl transform transition-all duration-500 ease-in-out">
              <Link
                to="/map"
                className="block px-3 py-2 rounded-md hover:text-indigo-300"
              >
                Safety Map
              </Link>
            </div>
            <div className="nav-item-container hover:scale-110 hover:translateY-1 hover:rotate-3 hover:shadow-xl transform transition-all duration-500 ease-in-out">
              <Link
                to="/report"
                className="block px-3 py-2 rounded-md hover:text-indigo-300"
              >
                Report Incident
              </Link>
            </div>
            {user ? (
              <div className="nav-item-container hover:scale-110 hover:translateY-1 hover:rotate-3 hover:shadow-xl transform transition-all duration-500 ease-in-out">
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md hover:text-indigo-300"
                >
                  Profile
                </Link>
              </div>
            ) : (
              <div className="nav-item-container hover:scale-110 hover:translateY-1 hover:rotate-3 hover:shadow-xl transform transition-all duration-500 ease-in-out">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md hover:text-indigo-300"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
