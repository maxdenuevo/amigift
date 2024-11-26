import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';
import { Sun, Moon, Globe } from 'lucide-react';

// Custom hook for theme management
const useTheme = () => {
  const [theme, setTheme] = React.useState(() => {
    // Check if theme is stored in localStorage, default to dark
    return localStorage.getItem('theme') || 'dark';
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme];
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useTheme();

  // Handle language change
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand name */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Secrete
            </span>
          </Link>

          {/* Navigation items */}
          <div className="flex items-center space-x-4">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={t('header.toggleLanguage')}
            >
              <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="ml-1 text-sm font-medium">
                {i18n.language.toUpperCase()}
              </span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={t('header.toggleTheme')}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Create group button */}
            <Link
              to="/create"
              className="ml-4 px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              {t('header.createGroup')}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;