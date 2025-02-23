// stores/api.ts
import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', {
  state: () => ({
    // For example, you might store an authentication token here
    token: sessionStorage.getItem('auth_token') || null,
  }),
  actions: {
    async apiFetch(method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', url: string, body: any = null): Promise<Response> {
      // Default URL and headers
      const fetchUrl = `${import.meta.env.VITE_API_URL}/${url}`;
      const defaultOptions: RequestInit = {
        method: method,  // Set the HTTP method (GET, POST, PATCH, etc.)
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Optionally include an auth header if a token is available
          ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
        },
      };

      // Add body content for POST, PATCH, and PUT methods
      if (body && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
        defaultOptions.body = JSON.stringify(body);
      }

      // Return the fetch call with merged options
      return fetch(fetchUrl, defaultOptions);
    },
  },
})
