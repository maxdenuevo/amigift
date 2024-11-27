import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('footer.about')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Heart className="w-4 h-4 text-red-500" />
              <span>{t('footer.madeWith')}</span>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('footer.links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/yourusername/secrete"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Github className="w-4 h-4" />
                  <span>{t('footer.sourceCode')}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@secrete.cl"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t('footer.contact')}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Language Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('footer.languages')}
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className="px-3 py-1 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                English
              </button>
              <button
                onClick={() => i18n.changeLanguage('es')}
                className="px-3 py-1 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Español
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} Secrete. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;