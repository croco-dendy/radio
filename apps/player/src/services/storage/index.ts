export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  setToken: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },

  clearToken: (): void => {
    localStorage.removeItem('auth_token');
  },
};
