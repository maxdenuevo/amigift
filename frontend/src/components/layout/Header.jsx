import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();  
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand name */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Amigift
            </span>
          </Link>

          {/* Navigation items */}
          <div className="flex items-center space-x-4">
          <button onClick={toggleTheme}>
           {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          
          <button onClick={toggleLanguage}>
            {language.toUpperCase()}
          </button>

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