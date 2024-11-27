import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Define navigation items
  const navigationItems = [
    { path: '/', label: 'nav.home' },
    { path: '/create', label: 'nav.createGroup' },
    { path: '/how-it-works', label: 'nav.howItWorks' },
    { path: '/faq', label: 'nav.faq' }
  ];

  // Check if a path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium
                  ${isActivePath(path)
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'}
                `}
              >
                {t(label)}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${isActivePath(path)
                    ? 'text-purple-600 dark:text-purple-400 bg-gray-50 dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'}
                `}
                onClick={() => setIsOpen(false)}
              >
                {t(label)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;