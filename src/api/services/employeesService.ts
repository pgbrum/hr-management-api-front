// src/services/employeesService.ts
import api from '../index';
import { Employee } from '../../types';

type EmployeePayload = {
  name: string;
  email: string;
  positionId: string | null; // vamos enviar só o id da posição para criação/atualização
  benefitIds: string[];       // array com ids ou nomes dos benefícios, conforme seu backend espera
};

export const employeesService = {
  getAll: async (): Promise<Employee[]> => {
    const response = await api.get('/employees');
    return response.data.employees;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },

  update: async (id: string, data: EmployeePayload): Promise<Employee> => {
    const response = await api.put(`/employees/${id}`, data);
    return response.data;
  },

  create: async (data: EmployeePayload): Promise<Employee> => {
    const response = await api.post('/employees', data);
    return response.data;
  }
};
