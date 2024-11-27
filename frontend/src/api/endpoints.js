// endpoints.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Group endpoints
export const createGroup = async (groupData) => {
  const response = await api.post('/groups', groupData);
  return response.data;
};

export const getGroup = async (groupId) => {
  const response = await api.get(`/groups/${groupId}`);
  return response.data;
};

export const updateGroup = async (groupId, updateData) => {
  const response = await api.put(`/groups/${groupId}`, updateData);
  return response.data;
};

// Participant endpoints
export const getParticipant = async (participantId) => {
  const response = await api.get(`/participants/${participantId}`);
  return response.data;
};

export const updateParticipant = async (participantId, updateData) => {
  const response = await api.put(`/participants/${participantId}`, updateData);
  return response.data;
};
