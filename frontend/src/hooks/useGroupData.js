import { useState, useCallback } from 'react';
import { createGroup, updateGroup, getGroup } from '../api/endpoints';

export const useGroupData = (initialGroupId = null) => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGroup = useCallback(async (groupId) => {
    try {
      setLoading(true);
      const data = await getGroup(groupId);
      setGroup(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewGroup = useCallback(async (groupData) => {
    try {
      setLoading(true);
      const data = await createGroup(groupData);
      setGroup(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { group, loading, error, fetchGroup, createNewGroup };
};

