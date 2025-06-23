// src/services/positionsService.ts
import api from '../index';
import { Position } from '../../types';

type PositionPayload = {
  title: string;
  salary: number;
};

export const positionsService = {
  getAll: async (): Promise<Position[]> => {
    const response = await api.get('/positions');
    return response.data.positions;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/positions/${id}`);
  },

  update: async (id: string, data: PositionPayload): Promise<Position> => {
    const response = await api.put(`/positions/${id}`, data);
    return response.data;
  },

  create: async (data: PositionPayload): Promise<Position> => {
    const response = await api.post('/positions', data);
    return response.data;
  }
};
