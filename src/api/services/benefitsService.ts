import api from '../index';
import { Benefit } from '../../types';

type BenefitPayload = {
  name: string;
  value: number;
};

export const benefitsService = {
  getAll: async (): Promise<Benefit[]> => {
    const response = await api.get('/benefits');
    return response.data.benefits; 
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/benefits/${id}`);
  },

  update: async (id: string, data: BenefitPayload): Promise<Benefit> => {
    const response = await api.put(`/benefits/${id}`, data);
    return response.data;
  },

  create: async (data: BenefitPayload): Promise<Benefit> => {
    const response = await api.post('/benefits', data);
    return response.data;
  }
};








