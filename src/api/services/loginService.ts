import api from '../index';

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export const loginService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    
    const response = await api.post('/sessions', payload);
    
    return response.data;
  },
};
