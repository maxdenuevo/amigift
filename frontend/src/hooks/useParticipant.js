import { useState, useCallback } from 'react';
import { updateParticipant, getParticipant } from '../api/endpoints';

export const useParticipant = (initialParticipantId = null) => {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchParticipant = useCallback(async (participantId) => {
    try {
      setLoading(true);
      const data = await getParticipant(participantId);
      setParticipant(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateParticipantData = useCallback(async (participantId, updateData) => {
    try {
      setLoading(true);
      const data = await updateParticipant(participantId, updateData);
      setParticipant(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { participant, loading, error, fetchParticipant, updateParticipantData };
};
