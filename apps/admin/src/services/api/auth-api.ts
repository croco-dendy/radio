import { waveApiClient } from './clients/http-client';

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
  account: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
};

type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await waveApiClient.post<ApiResponse<LoginResponse>>(
      '/api/accounts/login',
      credentials,
    );
    return response.data.data;
  },

  register: async (userData: RegisterRequest): Promise<{ message: string }> => {
    const response = await waveApiClient.post<ApiResponse<{ message: string }>>(
      '/api/accounts/register',
      userData,
    );
    return response.data.data;
  },

  getCurrentUser: async (): Promise<LoginResponse['account']> => {
    const response =
      await waveApiClient.get<ApiResponse<LoginResponse['account']>>(
        '/api/accounts/me',
      );
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    // For now, just clear local storage
    // In the future, you might want to call a logout endpoint
    localStorage.removeItem('wave_auth_token');
  },
};
