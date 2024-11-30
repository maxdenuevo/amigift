import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, Plus, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { MatchingService } from '../../utils/matching';
import { useGroupData } from '../../hooks/useGroupData';
import { validateGroup } from '../../utils/validation';

const CreateGroupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createGroup, loading, error } = useGroupData();
  
  // Initialize state with two empty participants
  const [participants, setParticipants] = useState([
    { id: 1, name: '', email: '' },
    { id: 2, name: '', email: '' }
  ]);
  const [restrictions, setRestrictions] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min: '',
    max: '',
    currency: 'USD'
  });
  const [deadline, setDeadline] = useState('');
  const [showRestrictionModal, setShowRestrictionModal] = useState(false);

  // Add a new participant to the group
  const addParticipant = () => {
    if (participants.length >= 20) {
      alert(t('createGroup.maxParticipantsReached'));
      return;
    }
    const newId = Math.max(...participants.map(p => p.id)) + 1;
    setParticipants([...participants, { id: newId, name: '', email: '' }]);
  };

  // Remove a participant and their associated restrictions
  const removeParticipant = (id) => {
    if (participants.length <= 2) {
      alert(t('createGroup.minTwoParticipants'));
      return;
    }
    setParticipants(participants.filter(p => p.id !== id));
    setRestrictions(restrictions.filter(r => 
      r.participant1 !== id && r.participant2 !== id
    ));
  };

  // Update participant information
  const updateParticipant = (id, field, value) => {
    setParticipants(participants.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const groupData = {
        participants,
        restrictions,
        priceRange,
        deadline
      };

      const validation = validateGroup(groupData);
      if (!validation.isValid) {
        alert(validation.errors.join('\n'));
        return;
      }

      const matches = MatchingService.generateMatches(participants, restrictions);
      
      if (!MatchingService.validateMatching(matches, participants, restrictions)) {
        throw new Error(t('createGroup.matchingError'));
      }

      const result = await createGroup({
        ...groupData,
        matches: Array.from(matches.entries())
      });

      navigate(`/group/${result.id}`);
      
    } catch (err) {
      alert(err.message || t('createGroup.generalError'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      {/* Participants Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('createGroup.participants')}
          </h2>
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('createGroup.minPrice')}
          </label>
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('createGroup.maxPrice')}
          </label>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('createGroup.currency')}
          </label>
          <select
            value={priceRange.currency}
            onChange={(e) => setPriceRange({ ...priceRange, currency: e.target.value })}
            className="w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CLP">CLP</option>
          </select>
        </div>
      </div>

      {/* Deadline Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('createGroup.deadline')}
        </label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? t('common.loading') : t('createGroup.createButton')}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateGroupForm;