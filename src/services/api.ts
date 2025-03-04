const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async search(query: string) {
    return this.get(`/api/search?q=${encodeURIComponent(query)}`);
  },

  async getInitiatives() {
    return this.get('/api/initiatives');
  },

  // ... other API methods
};
