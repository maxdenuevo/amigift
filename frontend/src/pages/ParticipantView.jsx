import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useParticipant } from '../hooks/useParticipant';
import { Gift, AlertCircle, Send, Plus, X, DollarSign, Calendar } from 'lucide-react';
import { Alert, AlertDescription } from "../components/ui/alert";

export default function ParticipantView() {
  const { participantId } = useParams();
  const { t } = useTranslation();
  const { 
    participant, 
    loading, 
    error, 
    fetchParticipant,
    updateParticipantData 
  } = useParticipant(participantId);

  const [wishlistItem, setWishlistItem] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (participantId) {
      fetchParticipant(participantId);
    }
  }, [participantId, fetchParticipant]);

  const handleAddWishlistItem = async () => {
    if (!wishlistItem.trim()) return;

    try {
      const updatedWishlist = [...(participant.wishlist || []), wishlistItem.trim()];
      await updateParticipantData(participantId, { wishlist: updatedWishlist });
      setWishlistItem('');
    } catch (err) {
      console.error('Error adding wishlist item:', err);
    }
  };

  const handleRemoveWishlistItem = async (index) => {
    try {
      const updatedWishlist = participant.wishlist.filter((_, i) => i !== index);
      await updateParticipantData(participantId, { wishlist: updatedWishlist });
    } catch (err) {
      console.error('Error removing wishlist item:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(t('common.locale'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat(t('common.locale'), {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

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
          <h2 className="text-xl font-semibold mb-2">{t('participantView.error.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!participant) return null;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header with Match Info */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <Gift className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="text-2xl font-bold">{t('participantView.yourMatch')}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('participantView.buyingGiftFor')}
              </p>
            </div>
          </div>
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {participant.assignedTo.name}
            </h2>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">{t('participantView.eventDetails')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('participantView.eventDate')}
                </p>
                <p className="font-medium">{formatDate(participant.group.eventDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('participantView.priceRange')}
                </p>
                <p className="font-medium">
                  {formatCurrency(participant.group.priceRange.min, participant.group.priceRange.currency)} - 
                  {formatCurrency(participant.group.priceRange.max, participant.group.priceRange.currency)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Match's Wishlist */}
        {participant.assignedTo.wishlist?.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              {t('participantView.matchWishlist')}
            </h3>
            <ul className="space-y-2">
              {participant.assignedTo.wishlist.map((item, index) => (
                <li 
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center"
                >
                  <Gift className="w-4 h-4 text-purple-500 mr-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Your Wishlist */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">{t('participantView.yourWishlist')}</h3>
          
          {/* Add Wishlist Item */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={wishlistItem}
              onChange={(e) => setWishlistItem(e.target.value)}
              placeholder={t('participantView.wishlistPlaceholder')}
              className="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              onKeyPress={(e) => e.key === 'Enter' && handleAddWishlistItem()}
            />
            <button
              onClick={handleAddWishlistItem}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t('participantView.addItem')}
            </button>
          </div>

          {/* Wishlist Items */}
          {participant.wishlist?.length > 0 ? (
            <ul className="space-y-2">
              {participant.wishlist.map((item, index) => (
                <li 
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveWishlistItem(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <Alert>
              <AlertDescription>
                {t('participantView.emptyWishlist')}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}