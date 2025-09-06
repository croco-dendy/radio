// Global test setup for Wave backend tests

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.DATA_DIR = './test-data';
process.env.PORT = '0'; // Use random port for tests

// Global test utilities
export const testUtils = {
  // Helper to create mock request context
  createMockContext: (path: string, method = 'GET') => ({
    req: {
      url: path,
      method,
      param: (key: string) => {
        const url = new URL(path, 'http://localhost');
        return url.searchParams.get(key);
      },
    },
    json: (data: unknown, status?: number) => ({
      status: status || 200,
      json: () => Promise.resolve(data),
    }),
  }),

  // Helper to wait for async operations
  wait: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Helper to generate test timestamps
  generateTestTimestamp: () =>
    new Date('2024-01-15T10:30:00.000Z').toISOString(),
};
