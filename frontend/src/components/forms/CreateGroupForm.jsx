import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { MatchingService } from '../utils/matching';
import { useGroupData } from '../hooks/useGroupData';
import { validateGroup } from '../utils/validation';

const CreateGroupForm = () => {
  const { createNewGroup, loading, error } = useGroupData();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create the group data object
    const groupData = {
      participants,
      restrictions,
      priceRange,
      deadline
    };

    // Validate the data
    const { isValid, errors } = validateGroup(groupData);
    
    if (!isValid) {
      // Handle validation errors
      const errorMessage = Object.values(errors).join('\n');
      alert(errorMessage);
      return;
    }

    try {
      // Generate matches using the MatchingService
      const matches = MatchingService.generateMatches(participants, restrictions);
      
      // Validate the matching
      if (!MatchingService.validateMatching(matches, participants, restrictions)) {
        throw new Error(t('createGroup.matchingError'));
      }

      // Add the matches to the group data
      const groupWithMatches = {
        ...groupData,
        matches: Array.from(matches.entries()).map(([giver, receiver]) => ({
          giver,
          receiver
        }))
      };

      // Create the group using the API
      const createdGroup = await createNewGroup(groupWithMatches);
      
      // Handle success (e.g., redirect to the group page)
      navigate(`/group/${createdGroup.id}`);
      
    } catch (err) {
      // Handle errors (already managed by the hook)
      console.error('Form submission error:', err);
      alert(error || t('createGroup.generalError'));
    }
  };

  // Add loading state handling
  if (loading) {
    return <div className="text-center">{t('common.loading')}</div>;
  }
;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Participants Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('createGroup.title')}
          </h1>
          <button
            type="button"
            onClick={addParticipant}
            className="flex items-center px-3 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            {t('createGroup.addParticipant')}
          </button>
        </div>

        <div className="space-y-4">
          {participants.map((participant) => (
            <div key={participant.id} className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={participant.name}
                  onChange={(e) => updateParticipant(participant.id, 'name', e.target.value)}
                  placeholder={t('createGroup.namePlaceholder')}
                  className="w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  value={participant.email}
                  onChange={(e) => updateParticipant(participant.id, 'email', e.target.value)}
                  placeholder={t('createGroup.emailPlaceholder')}
                  className="w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <button
                type="button"
                onClick={() => removeParticipant(participant.id)}
                className="p-2 text-gray-500 hover:text-red-500"
                aria-label={t('createGroup.removeParticipant')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('createGroup.minPrice')}
          </label>
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('createGroup.maxPrice')}
          </label>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('createGroup.currency')}
          </label>
          <select
            value={priceRange.currency}
            onChange={(e) => setPriceRange({ ...priceRange, currency: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CLP">CLP</option>
          </select>
        </div>
      </div>

      {/* Deadline Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('createGroup.deadline')}
        </label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="mt-1 w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Restrictions Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {t('createGroup.restrictions')}
          </h2>
          <button
            type="button"
            onClick={() => setShowRestrictionModal(true)}
            className="flex items-center px-3 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
          >
            <LinkIcon className="w-4 h-4 mr-1" />
            {t('createGroup.manageRestrictions')}
          </button>
        </div>

        {restrictions.length > 0 && (
          <div className="mt-4 space-y-2">
            {restrictions.map((restriction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {getParticipantName(restriction.participant1)}
                  <span className="mx-2">↔</span>
                  {getParticipantName(restriction.participant2)}
                </span>
                <button
                  type="button"
                  onClick={() => toggleRestriction(restriction.participant1, restriction.participant2)}
                  className="p-1 text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Restrictions Modal */}
        {showRestrictionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-2xl w-full m-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('createGroup.manageRestrictions')}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowRestrictionModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2"></th>
                      {participants.map(participant => (
                        <th key={participant.id} className="p-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {participant.name || t('createGroup.unnamedParticipant')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map(participant1 => (
                      <tr key={participant1.id}>
                        <td className="p-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {participant1.name || t('createGroup.unnamedParticipant')}
                        </td>
                        {participants.map(participant2 => (
                          <td key={participant2.id} className="p-2 text-center">
                            {participant1.id !== participant2.id && (
                              <button
                                type="button"
                                onClick={() => toggleRestriction(participant1.id, participant2.id)}
                                className={`w-6 h-6 rounded-full transition-colors ${
                                  hasRestriction(participant1.id, participant2.id)
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                                aria-label={
                                  hasRestriction(participant1.id, participant2.id)
                                    ? t('createGroup.removeRestriction')
                                    : t('createGroup.addRestriction')
                                }
                              />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowRestrictionModal(false)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  {t('common.done')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          {t('createGroup.createButton')}
        </button>
      </div>
    </form>
  );
};

export default CreateGroupForm;