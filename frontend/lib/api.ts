import axios from 'axios';
import { EventRequirementFormData } from '@/types';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : '');

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL must be set for production builds.');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createRequirement = async (data: EventRequirementFormData) => {
  const response = await api.post('/requirements', data);
  return response.data;
};

export const getRequirement = async (id: string) => {
  const response = await api.get(`/requirements/${id}`);
  return response.data;
};

export const getAllRequirements = async (params?: {
  category?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get('/requirements', { params });
  return response.data;
};
