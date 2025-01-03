import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Gift, Users, Lock, Globe } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Feature cards data structure to make maintenance easier
  const features = [
    {
      icon: <Gift className="w-8 h-8 text-purple-500" />,
      title: t('home.features.secret.title'),
      description: t('home.features.secret.description')
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: t('home.features.groups.title'),
      description: t('home.features.groups.description')
    },
    {
      icon: <Lock className="w-8 h-8 text-pink-500" />,
      title: t('home.features.restrictions.title'),
      description: t('home.features.restrictions.description')
    },
    {
      icon: <Globe className="w-8 h-8 text-green-500" />,
      title: t('home.features.bilingual.title'),
      description: t('home.features.bilingual.description')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Amigift</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <button
            onClick={() => navigate('/create')}
            className="px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            {t('home.hero.createButton')}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('home.features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('home.howItWorks.title')}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex-1 max-w-md">
              <ol className="space-y-6">
                {[1, 2, 3].map((step) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center font-semibold">
                      {step}
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {t(`home.howItWorks.step${step}.title`)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t(`home.howItWorks.step${step}.description`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}