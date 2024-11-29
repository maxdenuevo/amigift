import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGroupData } from '../hooks/useGroupData';
import { PriceRangePieChart } from '../components/charts/PriceRangePieChart';
import { Calendar, Users, Clock, AlertCircle } from 'lucide-react';

export default function GroupDashboard() {
  const { groupId } = useParams();
  const { t } = useTranslation();
  const { group, loading, error, fetchGroup } = useGroupData();

  useEffect(() => {
    if (groupId) {
      fetchGroup(groupId);
    }
  }, [groupId, fetchGroup]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">{t('groupDashboard.error.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!group) return null;

  // Calculate time remaining until the event
  const timeRemaining = new Date(group.deadline) - new Date();
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('groupDashboard.title')}</h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              <span>{group.participants.length} {t('groupDashboard.participants')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>{new Date(group.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-pink-500" />
              <span>{daysRemaining} {t('groupDashboard.daysRemaining')}</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Price Range Voting */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t('groupDashboard.priceRange.title')}</h2>
            <PriceRangePieChart votes={group.priceRangeVotes} />
          </div>

          {/* Participants List */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t('groupDashboard.participants')}</h2>
            <div className="space-y-3">
              {group.participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <span>{participant.name}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    participant.hasSubmittedWishlist
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                  }`}>
                    {participant.hasSubmittedWishlist
                      ? t('groupDashboard.wishlistSubmitted')
                      : t('groupDashboard.wishlistPending')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Event Details */}
          <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t('groupDashboard.eventDetails.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">{t('groupDashboard.eventDetails.when')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(group.deadline).toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">{t('groupDashboard.eventDetails.priceRange')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {group.priceRange.min} - {group.priceRange.max} {group.priceRange.currency}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}