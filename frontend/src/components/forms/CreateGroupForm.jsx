import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus, AlertCircle } from 'lucide-react';

const CreateGroupForm = () => {
  const { t } = useTranslation();
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

  // Handle adding a new participant
  const addParticipant = () => {
    if (participants.length >= 20) {
      alert(t('createGroup.maxParticipantsReached'));
      return;
    }
    const newId = Math.max(...participants.map(p => p.id)) + 1;
    setParticipants([...participants, { id: newId, name: '', email: '' }]);
  };

  // Handle removing a participant
  const removeParticipant = (id) => {
    if (participants.length <= 2) {
      alert(t('createGroup.minTwoParticipants'));
      return;
    }
    setParticipants(participants.filter(p => p.id !== id));
    // Remove any restrictions involving this participant
    setRestrictions(restrictions.filter(r => 
      r.participant1 !== id && r.participant2 !== id
    ));
  };

  // Handle adding a restriction between participants
  const addRestriction = (participant1, participant2) => {
    if (participant1 === participant2) return;
    
    // Check if restriction already exists
    const exists = restrictions.some(r =>
      (r.participant1 === participant1 && r.participant2 === participant2) ||
      (r.participant1 === participant2 && r.participant2 === participant1)
    );

    if (!exists) {
      setRestrictions([...restrictions, { participant1, participant2 }]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const invalidParticipants = participants.filter(p => !p.name || !p.email);
    if (invalidParticipants.length > 0) {
      alert(t('createGroup.fillAllFields'));
      return;
    }

    // Create group data object
    const groupData = {
      participants: participants.map(({ name, email }) => ({ name, email })),
      restrictions,
      priceRange,
      deadline,
      language: i18n.language
    };

    // TODO: Send to API
    console.log('Group data:', groupData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('createGroup.title')}
        </h1>

        {/* Participants section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
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

          {/* Participant list */}
          <div className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    value={participant.name}
                    onChange={(e) => {
                      const updated = participants.map(p =>
                        p.id === participant.id
                          ? { ...p, name: e.target.value }
                          : p
                      );
                      setParticipants(updated);
                    }}
                    placeholder={t('createGroup.namePlaceholder')}
                    className="w-full px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    value={participant.email}
                    onChange={(e) => {
                      const updated = participants.map(p =>
                        p.id === participant.id
                          ? { ...p, email: e.target.value }
                          : p
                      );
                      setParticipants(updated);
                    }}
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

        {/* Price range section */}
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

        {/* Deadline section */}
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

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            {t('createGroup.createButton')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateGroupForm;